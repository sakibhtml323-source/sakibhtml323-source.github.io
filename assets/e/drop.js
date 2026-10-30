(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.drop=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,goal=10+tier*3,sp=150+tier*14,gap=Math.max(.35,.9-tier*.05),bw=64,badp=.25+Math.min(.2,tier*.02);let px=W/2,got=0,lives=3,miss=0,cd=.4,t=0;const it=[];
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  ptrx(cv,W,v=>{px=Math.max(bw/2,Math.min(W-bw/2,v))});
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft'){e.preventDefault();px=Math.max(bw/2,px-30)}else if(e.key==='ArrowRight'){e.preventDefault();px=Math.min(W-bw/2,px+30)}});
  const upd=()=>info('Caught '+got+'/'+goal+' · Lives '+'♥'.repeat(lives)+' · Missed '+miss+'/6');upd();
  loop(alive,dt=>{t+=dt;cd-=dt;
    if(cd<=0){cd=gap;it.push({x:14+rnd()*(W-28),y:-14,bad:rnd()<badp})}
    for(let i=it.length-1;i>=0;i--){const o=it[i];o.y+=(sp+t*3)*dt;
      if(o.y>H-44&&o.y<H-20&&Math.abs(o.x-px)<bw/2+8){it.splice(i,1);if(o.bad){lives--;upd();if(!lives)return fin(0)}else{got++;upd();if(got>=goal)return fin(lives===3&&miss<=1?3:lives>=2&&miss<=3?2:1)}}
      else if(o.y>H+20){it.splice(i,1);if(!o.bad){miss++;upd();if(miss>=6)return fin(0)}}}
    cv.dataset.i=JSON.stringify({px:Math.round(px),i:it.map(o=>[Math.round(o.x),Math.round(o.y),o.bad?1:0])});x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);
    it.forEach(o=>{x.fillStyle=o.bad?'#7a3a30':'#F3E2A9';x.beginPath();x.arc(o.x,o.y,o.bad?11:9,0,7);x.fill();if(o.bad){x.strokeStyle='#d98a7a';x.lineWidth=2;x.stroke()}});
    x.fillStyle='#D4AF37';x.fillRect(px-bw/2,H-34,bw,14);x.fillRect(px-bw/2-3,H-40,6,20);x.fillRect(px+bw/2-3,H-40,6,20)})};
if(window.GK.boot)window.GK.boot();
})();
