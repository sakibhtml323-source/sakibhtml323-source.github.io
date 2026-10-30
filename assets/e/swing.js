(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.swing=({b,tier,rnd,info,fin,alive})=>{
  const need=5+(tier>>1),w=1.7+tier*.13,tol=Math.max(6,18-tier),A=62;let t=rnd()*3,ok=0,lives=3;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="pend"><i class="pv"></i><i class="zone"></i><div class="rope" id="rp"><i class="bob"></i></div></div><button class="tapbig" id="rel" style="aspect-ratio:3/1;margin-top:14px;font-size:28px">RELEASE</button>';
  const rp=b.querySelector('#rp'),upd=()=>info('Hits '+ok+'/'+need+' · Lives '+'♥'.repeat(lives)+' · Release when the rope is straight down');
  b.querySelector('#rel').onclick=()=>{if(!alive())return;const a=A*Math.sin(w*t);
    if(Math.abs(a)<=tol){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1)}else{lives--;if(!lives)return fin(0)}upd()};
  upd();loop(alive,dt=>{t+=dt;const a=A*Math.sin(w*t);rp.style.transform='rotate('+a.toFixed(2)+'deg)';rp.dataset.a=a.toFixed(2)})};
if(window.GK.boot)window.GK.boot();
})();
