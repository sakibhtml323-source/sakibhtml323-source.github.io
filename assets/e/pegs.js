(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.pegs=({b,tier,rnd,info,fin})=>{
  const L=9+(tier>5),R=3+Math.min(6,tier>>1)+(tier>5),h=Array(L).fill(0);h[rnd()*L|0]=1;
  for(let r=0,t=0;r<R&&t<600;t++){const c=rnd()*L|0;if(!h[c])continue;const dir=rnd()<.5?-1:1,m=c+dir,a=c+2*dir;if(a<0||a>=L||h[m]||h[a])continue;h[c]=0;h[m]=1;h[a]=1;r++}
  let sel=-1,mist=0,done=false;b.className='board pegs';b.style.removeProperty('--n');
  const cnt=()=>h.filter(Boolean).length,can=()=>h.some((v,i)=>v&&[-1,1].some(d=>h[i+d]&&i+2*d>=0&&i+2*d<L&&!h[i+2*d]));
  const draw=()=>{b.innerHTML='<div class="pegsrow">'+h.map((v,i)=>'<button class="ph'+(v?' pg':'')+(i===sel?' sel':'')+'" data-i="'+i+'" aria-label="Hole '+(i+1)+(v?', peg':', empty')+'"></button>').join('')+'</div>';info('Pegs left '+cnt()+' · Mistakes '+mist)};
  b.onclick=e=>{const c=e.target.closest('.ph');if(!c||done)return;const i=+c.dataset.i;
    if(h[i]){sel=i;return draw()}
    if(sel>=0&&Math.abs(i-sel)===2&&h[(i+sel)/2]){h[sel]=0;h[(i+sel)/2]=0;h[i]=1;sel=-1;draw();
      if(cnt()===1){done=true;return fin(mist===0?3:mist<=3?2:1)}if(!can()){done=true;fin(0)}return}
    mist++;sel=-1;draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
