(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.weave=({b,tier,rnd,info,fin,alive})=>{
  const T=14+tier*2,sp0=28+tier*3,gap=Math.max(.5,1.1-tier*.05);let lane=1,lives=3,t=0,cd=.5,inv=0;const cars=[];
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="hwy" id="hw"><i class="me" id="me" data-l="1"></i></div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn sec" data-m="-1" aria-label="Move up">▲ Up</button><button class="btn sec" data-m="1" aria-label="Move down">▼ Down</button></div>';
  const hw=b.querySelector('#hw'),me=b.querySelector('#me'),mv=d=>{if(alive()){lane=Math.max(0,Math.min(3,lane+d));me.style.top=(lane*25+3)+'%';me.dataset.l=lane}};
  b.onclick=e=>{const m=e.target.closest('[data-m]');if(m)mv(+m.dataset.m)};
  addEventListener('keydown',e=>{if(e.key==='ArrowUp'){e.preventDefault();mv(-1)}else if(e.key==='ArrowDown'){e.preventDefault();mv(1)}});
  me.style.top='28%';
  loop(alive,dt=>{t+=dt;cd-=dt;inv-=dt;
    if(cd<=0){cd=gap;const l=rnd()*4|0,e=document.createElement('i');e.className='car';e.dataset.l=l;e.style.top=(l*25+3)+'%';hw.appendChild(e);cars.push({l,x:100,v:sp0*(.8+rnd()*.7),e})}
    for(let i=cars.length-1;i>=0;i--){const c=cars[i];c.x-=c.v*dt;c.e.style.left=c.x+'%';
      if(inv<=0&&c.l===lane&&c.x<22&&c.x>6){lives--;inv=1.2;c.e.remove();cars.splice(i,1);if(!lives)return fin(0);continue}
      if(c.x<-15){c.e.remove();cars.splice(i,1)}}
    info('Survive '+Math.max(0,Math.ceil(T-t))+'s · Lives '+'♥'.repeat(lives));if(t>=T)fin(lives===3?3:lives===2?2:1)})};
if(window.GK.boot)window.GK.boot();
})();
