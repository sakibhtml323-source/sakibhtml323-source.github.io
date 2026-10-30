(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.merge=({b,tier,rnd,info,fin,alive})=>{
  const T=2**(6+Math.min(tier,5));let g=Array(16).fill(0),moves=0,done=false;
  const add=()=>{const e=[];g.forEach((v,i)=>{if(!v)e.push(i)});if(e.length)g[e[rnd()*e.length|0]]=rnd()<.9?2:4};
  const line=a=>{const v=a.filter(Boolean),o=[];for(let i=0;i<v.length;i++){if(v[i]===v[i+1]){o.push(v[i]*2);i++}else o.push(v[i])}while(o.length<4)o.push(0);return o};
  const can=()=>g.includes(0)||g.some((v,i)=>(i%4<3&&v===g[i+1])||(i<12&&v===g[i+4]));
  b.className='board m2048';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="g4">'+g.map(v=>'<div class="t t'+v+'" style="--k:'+(v?Math.log2(v):0)+'">'+(v||'')+'</div>').join('')+'</div><div class="dpad">'+['←','→','↑','↓'].map((s,i)=>'<button data-d="'+i+'" aria-label="Move '+['left','right','up','down'][i]+'">'+s+'</button>').join('')+'</div>';info('Target '+T+' · Best '+Math.max(...g)+' · Moves '+moves)};
  const move=d=>{if(done||!alive())return;const n=g.slice();
    for(let k=0;k<4;k++){const idx=[0,1,2,3].map(j=>d<2?k*4+j:j*4+k),a=idx.map(i=>g[i]),r=d%2?line(a.reverse()).reverse():line(a);idx.forEach((i,j)=>n[i]=r[j])}
    if(n.every((v,i)=>v===g[i]))return;g=n;moves++;add();draw();
    if(Math.max(...g)>=T){done=true;fin(moves<=T*.6?3:moves<=T*.9?2:1)}else if(!can()){done=true;fin(0)}};
  b.onclick=e=>{const d=e.target.closest('[data-d]');if(d)move(+d.dataset.d)};
  let sx=0,sy=0;b.ontouchstart=e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY};
  b.ontouchend=e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;move(Math.abs(dx)>Math.abs(dy)?(dx<0?0:1):(dy<0?2:3))};
  addEventListener('keydown',e=>{const m={ArrowLeft:0,ArrowRight:1,ArrowUp:2,ArrowDown:3}[e.key];if(m===undefined||!alive())return;e.preventDefault();move(m)});
  add();add();draw()};
if(window.GK.boot)window.GK.boot();
})();
