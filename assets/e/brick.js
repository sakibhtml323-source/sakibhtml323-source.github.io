(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.brick=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,rows=2+Math.min(5,tier>>1),bw=40,bh=16,pw=Math.max(46,86-tier*3),sp=230+tier*14,py=H-30;
  let px=W/2-pw/2,lives=3,bx=0,by=0,vx=0,vy=0,wait=0;const br=[];
  for(let r=0;r<rows;r++)for(let c=0;c<8;c++)br.push({x:c*bw+2,y:44+r*(bh+4),on:1,r});
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  const upd=()=>info('Bricks '+br.filter(k=>k.on).length+' · Lives '+'♥'.repeat(lives));
  const serve=()=>{bx=px+pw/2;by=py-8;const a=(rnd()*50-25)*Math.PI/180;vx=sp*Math.sin(a);vy=-sp*Math.cos(a);wait=.8};
  ptrx(cv,W,v=>{px=Math.max(0,Math.min(W-pw,v-pw/2))});
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft'){e.preventDefault();px=Math.max(0,px-26)}else if(e.key==='ArrowRight'){e.preventDefault();px=Math.min(W-pw,px+26)}});
  serve();upd();
  loop(alive,dt=>{
    if(wait>0){wait-=dt;bx=px+pw/2;by=py-8}else{bx+=vx*dt;by+=vy*dt;
      if(bx<6){bx=6;vx=Math.abs(vx)}if(bx>W-6){bx=W-6;vx=-Math.abs(vx)}if(by<6){by=6;vy=Math.abs(vy)}
      if(vy>0&&by>=py-6&&by<=py+6&&bx>=px-4&&bx<=px+pw+4){const rel=Math.max(-.85,Math.min(.85,(bx-(px+pw/2))/(pw/2)));vx=rel*sp;vy=-Math.sqrt(sp*sp-vx*vx);by=py-6}
      if(by>H+10){lives--;upd();if(!lives)return fin(0);serve()}
      for(const k of br){if(!k.on)continue;if(bx+6>k.x&&bx-6<k.x+bw-4&&by+6>k.y&&by-6<k.y+bh){k.on=0;upd();const ox=Math.min(bx+6-k.x,k.x+bw-4-(bx-6)),oy=Math.min(by+6-k.y,k.y+bh-(by-6));if(ox<oy)vx=-vx;else vy=-vy;break}}
      if(!br.some(k=>k.on))return fin(lives===3?3:lives===2?2:1)}
    cv.dataset.b=bx.toFixed(0);cv.dataset.k=JSON.stringify(br.filter(k=>k.on).map(k=>[Math.round(k.x+bw/2-2),Math.round(k.y+bh/2)]));cv.dataset.w=pw;x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);br.forEach(k=>{if(k.on){x.fillStyle='hsl(42,'+(60-k.r*5)+'%,'+(60-k.r*5)+'%)';x.fillRect(k.x,k.y,bw-4,bh)}});
    x.fillStyle='#F3E2A9';x.fillRect(px,py,pw,10);x.beginPath();x.arc(bx,by,6,0,7);x.fill()})};
if(window.GK.boot)window.GK.boot();
})();
