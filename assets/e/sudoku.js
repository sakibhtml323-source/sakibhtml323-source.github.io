(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.sudoku=({b,tier,rnd,info,fin})=>{
  const base=[[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],dg=C.sh([1,2,3,4],rnd),pr=()=>C.sh([0,1],rnd),rows=[],cols=[];
  C.sh([0,1],rnd).forEach(bd=>pr().forEach(r=>rows.push(bd*2+r)));C.sh([0,1],rnd).forEach(bd=>pr().forEach(c=>cols.push(bd*2+c)));
  const g=rows.flatMap(r=>cols.map(c=>dg[base[r][c]-1])),given=Array(16).fill(true);
  C.sh(Array.from({length:16},(_,i)=>i),rnd).slice(0,Math.min(12,5+tier)).forEach(i=>{g[i]=0;given[i]=false});
  let sel=-1,err=0,done=false;
  b.className='board sudoku';b.style.setProperty('--n',4);
  const bad=i=>{const v=g[i];if(!v)return false;const x=i%4,y=i>>2;return g.some((w,j)=>j!==i&&w===v&&(j%4===x||(j>>2)===y||((j%4>>1)===(x>>1)&&((j>>2)>>1)===(y>>1))))};
  const draw=()=>{b.innerHTML=g.map((v,i)=>'<button class="cell sd'+(given[i]?' gv':'')+(i===sel?' sel':'')+(bad(i)?' bad':'')+'" data-i="'+i+'" aria-label="Row '+((i>>2)+1)+' column '+(i%4+1)+'">'+(v||'')+'</button>').join('')+'<div class="pal" style="grid-column:1/-1;margin-top:10px">'+[1,2,3,4].map(n=>'<button class="pc num" data-n="'+n+'">'+n+'</button>').join('')+'<button class="pc num" data-n="0" aria-label="Erase">×</button></div>';info('Mistakes: '+err)};
  b.onclick=e=>{if(done)return;const c=e.target.closest('.sd'),n=e.target.closest('[data-n]');
    if(c){const i=+c.dataset.i;if(!given[i])sel=i}
    else if(n&&sel>=0&&!given[sel]){const v=+n.dataset.n;g[sel]=v;if(v&&bad(sel))err++;
      if(g.every(x=>x)&&g.every((_,i)=>!bad(i))){draw();done=true;return fin(err===0?3:err<=2?2:1)}}
    draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
