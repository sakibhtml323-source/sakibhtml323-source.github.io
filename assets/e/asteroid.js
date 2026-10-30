(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.asteroid=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,goal=8+tier*2,sp=60+tier*8,gap=Math.max(.5,1.1-tier*.05),hp0=1+(tier>>2);let sx=W/2,kills=0,lives=3,cd=.6,fc=0,inv=0;const ast=[],bl=[];
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  ptrx(cv,W,v=>{sx=Math.max(14,Math.min(W-14,v))});
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft'){e.preventDefault();sx=Math.max(14,sx-28)}else if(e.key==='ArrowRight'){e.preventDefault();sx=Math.min(W-14,sx+28)}});
  const upd=()=>info('Destroyed '+kills+'/'+goal+' · Lives '+'♥'.repeat(lives));upd();
  loop(alive,dt=>{cd-=dt;fc-=dt;inv-=dt;
    if(cd<=0){cd=gap;const r=14+rnd()*9;ast.push({x:r+rnd()*(W-2*r),y:-r,r,hp:hp0,vx:(rnd()-.5)*30})}
    if(fc<=0){fc=.25;bl.push({x:sx,y:H-50})}
    for(let i=bl.length-1;i>=0;i--){const q=bl[i];q.y-=420*dt;if(q.y<-10){bl.splice(i,1);continue}for(const a of ast){if(Math.hypot(a.x-q.x,a.y-q.y)<a.r+3){a.hp--;bl.splice(i,1);break}}}
    for(let i=ast.length-1;i>=0;i--){const a=ast[i];a.y+=sp*dt;a.x+=a.vx*dt;
      if(a.hp<=0){ast.splice(i,1);kills++;upd();if(kills>=goal)return fin(lives===3?3:lives===2?2:1);continue}
      if(a.y>H+20){ast.splice(i,1);lives--;upd();if(!lives)return fin(0);continue}
      if(inv<=0&&Math.hypot(a.x-sx,a.y-(H-36))<a.r+10){ast.splice(i,1);lives--;inv=1.1;upd();if(!lives)return fin(0)}}
    x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#8a7fa0';ast.forEach(a=>{x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fill()});x.fillStyle='#F3E2A9';bl.forEach(q=>x.fillRect(q.x-1.5,q.y,3,10));
    x.fillStyle=inv>0&&Math.floor(performance.now()/90)%2?'#665a2a':'#D4AF37';x.beginPath();x.moveTo(sx,H-52);x.lineTo(sx-12,H-26);x.lineTo(sx+12,H-26);x.fill();
    cv.dataset.a=JSON.stringify(ast.slice().sort((p,q)=>q.y-p.y).slice(0,3).map(a=>Math.round(a.x)))})};
if(window.GK.boot)window.GK.boot();
})();
