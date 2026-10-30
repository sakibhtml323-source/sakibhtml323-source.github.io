(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.dodger=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,T=12+tier*2,sp=140+tier*18,gap=Math.max(.22,.7-tier*.04);let sx=W/2,lives=3,t=0,cd=0,inv=0;const rocks=[];
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  ptrx(cv,W,v=>{sx=Math.max(14,Math.min(W-14,v))});
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft'){e.preventDefault();sx=Math.max(14,sx-28)}else if(e.key==='ArrowRight'){e.preventDefault();sx=Math.min(W-14,sx+28)}});
  loop(alive,dt=>{t+=dt;cd-=dt;inv-=dt;
    if(cd<=0){cd=gap;const r=10+rnd()*9;rocks.push({x:r+rnd()*(W-2*r),y:-r,r,vx:(rnd()-.5)*50})}
    for(const k of rocks){k.y+=(sp+t*3)*dt;k.x+=k.vx*dt;if(inv<=0&&Math.hypot(k.x-sx,k.y-(H-36))<k.r+9){lives--;inv=1.1;k.y=H+99;if(!lives)return fin(0)}}
    for(let i=rocks.length-1;i>=0;i--)if(rocks[i].y>H+40)rocks.splice(i,1);
    cv.dataset.r=JSON.stringify({sx:Math.round(sx),r:rocks.map(k=>[Math.round(k.x),Math.round(k.y),Math.round(k.r)])});x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#6b6272';rocks.forEach(k=>{x.beginPath();x.arc(k.x,k.y,k.r,0,7);x.fill()});
    x.fillStyle=inv>0&&Math.floor(t*10)%2?'#665a2a':'#F3E2A9';x.beginPath();x.moveTo(sx,H-52);x.lineTo(sx-12,H-26);x.lineTo(sx+12,H-26);x.fill();
    info('Survive '+Math.max(0,Math.ceil(T-t))+'s · Lives '+'♥'.repeat(lives));if(t>=T)fin(lives===3?3:lives===2?2:1)})};
if(window.GK.boot)window.GK.boot();
})();
