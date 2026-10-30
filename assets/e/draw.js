(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.draw=({b,tier,rnd,info,fin,alive})=>{
  const rounds=5,limit=Math.max(260,700-tier*40);let ok=0,lives=3,state='idle',t0=0,tm;
  b.className='board drawb';b.style.removeProperty('--n');
  b.innerHTML='<button class="drawpad"></button>';const p=b.firstChild;
  const upd=()=>info('Round '+(ok+1)+'/'+rounds+' · Lives '+'♥'.repeat(lives)+' · Limit '+limit+' ms');
  const arm=()=>{if(!alive())return;state='wait';p.className='drawpad wait';p.textContent='Wait…';upd();tm=setTimeout(()=>{if(!alive())return;state='go';p.className='drawpad go';p.textContent='TAP!';t0=performance.now()},1000+rnd()*2200)};
  const lose=m=>{lives--;p.textContent=m;p.className='drawpad bad';if(!lives)return fin(0);state='idle';setTimeout(arm,1200)};
  p.onclick=()=>{if(state==='wait'){clearTimeout(tm);state='idle';lose('Too early')}else if(state==='go'){const rt=Math.round(performance.now()-t0);if(rt>limit){state='idle';return lose(rt+' ms · too slow')}
    ok++;p.textContent=rt+' ms';p.className='drawpad ok';state='idle';if(ok>=rounds)return fin(lives===3?3:lives===2?2:1);setTimeout(arm,1100)}};
  arm()};
if(window.GK.boot)window.GK.boot();
})();
