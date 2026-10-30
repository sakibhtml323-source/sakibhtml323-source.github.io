(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.hopper=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,goal=250+tier*70;let px=W/2,tx=W/2,py=30,vy=520,cam=0,lives=3,top=20;const pls=[{x:W/2-30,y:20}];
  const gen=()=>{while(top<cam+H+200){top+=55+rnd()*40;pls.push({x:rnd()*(W-60),y:top})}};
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  ptrx(cv,W,v=>{tx=Math.max(10,Math.min(W-10,v))});
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft'){e.preventDefault();tx=Math.max(10,tx-40)}else if(e.key==='ArrowRight'){e.preventDefault();tx=Math.min(W-10,tx+40)}});
  const upd=()=>info('Height '+Math.max(0,Math.round(py))+'/'+goal+' · Lives '+'♥'.repeat(lives));gen();
  loop(alive,dt=>{px+=Math.max(-300*dt,Math.min(300*dt,tx-px));const oy=py;vy-=1100*dt;py+=vy*dt;
    if(vy<0)for(const p of pls)if(oy>=p.y&&py<=p.y&&px>=p.x-6&&px<=p.x+66){vy=520;py=p.y}
    cam=Math.max(cam,py-220);gen();while(pls.length&&pls[0].y<cam-60)pls.shift();
    if(py<cam-10){lives--;if(!lives)return fin(0);const p=pls.find(q=>q.y>cam+30)||pls[0];px=p.x+30;tx=px;py=p.y;vy=520;cam=Math.max(cam,py-220)}
    if(py>=goal)return fin(lives===3?3:lives===2?2:1);
    x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#8a7fa0';pls.forEach(p=>x.fillRect(p.x,H-(p.y-cam),60,6));x.fillStyle='#F3E2A9';x.beginPath();x.arc(px,H-(py-cam)-8,8,0,7);x.fill();
    cv.dataset.s=JSON.stringify({px:Math.round(px),py:Math.round(py),vy:Math.round(vy),pl:pls.filter(p=>p.y>py-160&&p.y<py+260).map(p=>[Math.round(p.x+30),Math.round(p.y)])});upd()})};
if(window.GK.boot)window.GK.boot();
})();
