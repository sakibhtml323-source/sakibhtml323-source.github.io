(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.balance=({b,tier,rnd,info,fin,alive})=>{
  const T=10+tier*1.5,A=.5+tier*.1;let p=0,v=0,wind=0,tw=0,t=0,dir=0,sum=0,cnt=0;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="btrack"><i class="bz"></i><i class="bm" id="bm"></i></div><div class="oars"><button class="oar" data-s="-1">◀ Hold left</button><button class="oar" data-s="1">Hold right ▶</button></div>';
  const bm=b.querySelector('#bm');
  b.onpointerdown=e=>{const o=e.target.closest('.oar');if(o)dir=+o.dataset.s};
  b.onpointerup=b.onpointercancel=b.onpointerleave=()=>{dir=0};
  addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();dir=-1}else if(e.key==='ArrowRight'){e.preventDefault();dir=1}});
  addEventListener('keyup',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')dir=0});
  loop(alive,dt=>{t+=dt;tw-=dt;if(tw<=0){tw=.6+rnd()*.5;wind=(rnd()*2-1)*A}
    v+=(wind+dir*3.2-v*.8)*dt;p+=v*dt;sum+=Math.abs(p);cnt++;bm.style.left=(50+p*50)+'%';
    info('Hold steady · '+Math.max(0,Math.ceil(T-t))+'s left');
    if(Math.abs(p)>1)return fin(0);if(t>=T){const a=sum/cnt;fin(a<.35?3:a<.55?2:1)}})};
if(window.GK.boot)window.GK.boot();
})();
