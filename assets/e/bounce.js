(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.bounce=({b,tier,info,fin,alive})=>{
  const goal=10+tier*3,g=110+tier*9;let y=30,vy=0,n=0,lives=3;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="bcourt"><i class="ball" id="bl"></i><i class="floor"></i></div><button class="tapbig" id="bn" style="aspect-ratio:3/1;margin-top:14px;font-size:28px">BOUNCE</button>';
  const bl=b.querySelector('#bl'),upd=()=>info('Bounces '+n+'/'+goal+' · Lives '+'♥'.repeat(lives)+' · Tap when the ball is low');
  const lose=()=>{lives--;if(!lives)return fin(0);y=30;vy=0;upd()};
  b.querySelector('#bn').onclick=()=>{if(!alive())return;if(y>=45){vy=-80;n++;upd();if(n>=goal)fin(lives===3?3:lives===2?2:1)}else lose()};
  upd();loop(alive,dt=>{vy+=g*dt;y+=vy*dt;if(y<0){y=0;vy=Math.abs(vy)*.3}if(y>=100){lose();return}bl.style.top=y+'%';bl.dataset.y=y.toFixed(1)})};
if(window.GK.boot)window.GK.boot();
})();
