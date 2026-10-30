(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.pong=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,pw=64,goal=3+(tier>5),ais=90+tier*17;let px=W/2,ax=W/2,me=0,ai=0,bx=W/2,by=H/2,vx=0,vy=0,spd=200+tier*12,wait=.8;
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  ptrx(cv,W,v=>{px=Math.max(pw/2,Math.min(W-pw/2,v))});
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft'){e.preventDefault();px=Math.max(pw/2,px-30)}else if(e.key==='ArrowRight'){e.preventDefault();px=Math.min(W-pw/2,px+30)}});
  const serve=d=>{bx=W/2;by=H/2;spd=200+tier*12;const a=(rnd()*60-30)*Math.PI/180;vx=spd*Math.sin(a);vy=d*spd*Math.cos(a);wait=.8};
  const upd=()=>info('You '+me+' – '+ai+' Rival · First to '+goal);serve(-1);upd();
  loop(alive,dt=>{
    ax+=Math.max(-ais*dt,Math.min(ais*dt,bx-ax));ax=Math.max(pw/2,Math.min(W-pw/2,ax));
    if(wait>0)wait-=dt;else{bx+=vx*dt;by+=vy*dt;
      if(bx<6){bx=6;vx=Math.abs(vx)}if(bx>W-6){bx=W-6;vx=-Math.abs(vx)}
      if(vy>0&&by>=H-36&&by<=H-22&&Math.abs(bx-px)<=pw/2+6){const rel=(bx-px)/(pw/2);spd*=1.04;vx=rel*spd*.8;vy=-Math.sqrt(Math.max(spd*spd-vx*vx,spd*spd*.2));by=H-37}
      if(vy<0&&by<=36&&by>=22&&Math.abs(bx-ax)<=pw/2+6){const rel=(bx-ax)/(pw/2);spd*=1.04;vx=rel*spd*.8;vy=Math.sqrt(Math.max(spd*spd-vx*vx,spd*spd*.2));by=37}
      if(by<-10){me++;upd();if(me>=goal)return fin(ai===0?3:ai===1?2:1);serve(1)}
      if(by>H+10){ai++;upd();if(ai>=goal)return fin(0);serve(-1)}}
    cv.dataset.b=bx.toFixed(0);x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#2a2330';x.fillRect(0,H/2-1,W,2);
    x.fillStyle='#8a7fa0';x.fillRect(ax-pw/2,24,pw,8);x.fillStyle='#F3E2A9';x.fillRect(px-pw/2,H-30,pw,8);x.beginPath();x.arc(bx,by,6,0,7);x.fill()})};
if(window.GK.boot)window.GK.boot();
})();
