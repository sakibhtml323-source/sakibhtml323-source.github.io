(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.lock=({b,tier,rnd,info,fin,alive})=>{
  const need=4+(tier>>1),zw=Math.max(18,60-tier*3.5),sp=180+tier*22;let a=0,dir=1,za=rnd()*360,ok=0,lives=3,last=performance.now();
  b.className='board lockb';b.style.removeProperty('--n');
  b.innerHTML='<button class="dial" aria-label="Pick the lock"><i class="ptr"></i></button>';
  const dial=b.querySelector('.dial'),ptr=b.querySelector('.ptr');
  const zone=()=>{dial.style.background='conic-gradient(from '+(za-zw/2)+'deg,#D4AF37 0deg '+zw+'deg,#241d12 '+zw+'deg 360deg)'};
  const upd=()=>info('Pins '+ok+'/'+need+' · Lives '+'♥'.repeat(lives));
  dial.onclick=()=>{const d=((a-za+540)%360)-180;if(Math.abs(d)<=zw/2){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1);za=rnd()*360;if(tier>=4)dir=-dir;zone()}else{lives--;if(!lives)return fin(0)}upd()};
  const tick=now=>{if(!alive())return;const dt=Math.min(.05,(now-last)/1000);last=now;a=(a+dir*(sp+ok*8)*dt+360)%360;ptr.style.transform='rotate('+a+'deg)';requestAnimationFrame(tick)};
  zone();upd();requestAnimationFrame(tick)};
if(window.GK.boot)window.GK.boot();
})();
