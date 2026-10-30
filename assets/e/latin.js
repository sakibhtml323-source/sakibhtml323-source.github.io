(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.latin=({b,tier,rnd,info,fin})=>{
  const n=5,N=25,dg=C.sh([1,2,3,4,5],rnd),rs=C.sh([0,1,2,3,4],rnd),cs=C.sh([0,1,2,3,4],rnd),g=[];
  rs.forEach(r=>cs.forEach(c=>g.push(dg[(r+c)%5])));const given=Array(N).fill(true);
  C.sh([...Array(N).keys()],rnd).slice(0,Math.min(16,8+tier)).forEach(i=>{g[i]=0;given[i]=false});
  let sel=-1,err=0,done=false;b.className='board latin';b.style.setProperty('--n',n);
  const bad=i=>{const v=g[i];if(!v)return false;const x=i%n,y=i/n|0;return g.some((w,j)=>j!==i&&w===v&&(j%n===x||(j/n|0)===y))};
  const draw=()=>{b.innerHTML=g.map((v,i)=>'<button class="cell sd'+(given[i]?' gv':'')+(i===sel?' sel':'')+(bad(i)?' bad':'')+'" data-i="'+i+'" aria-label="Row '+((i/n|0)+1)+' column '+(i%n+1)+'">'+(v||'')+'</button>').join('')+'<div class="pal" style="grid-column:1/-1;margin-top:10px">'+[1,2,3,4,5].map(k=>'<button class="pc num" data-n="'+k+'">'+k+'</button>').join('')+'<button class="pc num" data-n="0" aria-label="Erase">×</button></div>';info('Mistakes: '+err)};
  b.onclick=e=>{if(done)return;const c=e.target.closest('.sd'),k=e.target.closest('[data-n]');
    if(c){const i=+c.dataset.i;if(!given[i])sel=i}else if(k&&sel>=0&&!given[sel]){const v=+k.dataset.n;g[sel]=v;if(v&&bad(sel))err++;
      if(g.every(x=>x)&&g.every((_,i)=>!bad(i))){draw();done=true;return fin(err===0?3:err<=2?2:1)}}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
