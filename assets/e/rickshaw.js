(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.rickshaw=({b,tier,rnd,info,fin,alive})=>{
  const W=300,H=420,LW=100,T=14+tier*2,sp0=170+tier*20,gap=Math.max(.38,.95-tier*.05);let lane=1,lives=3,t=0,cd=.6,inv=0;const obs=[];
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  const mv=d=>{if(alive())lane=Math.max(0,Math.min(2,lane+d))};
  cv.onpointerdown=e=>{const r=cv.getBoundingClientRect();mv((e.clientX-r.left)/r.width<.5?-1:1)};
  addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();mv(-1)}else if(e.key==='ArrowRight'){e.preventDefault();mv(1)}});
  const cols=['#8a7fa0','#b5543c','#4c8dff','#4cc27a'];
  loop(alive,dt=>{t+=dt;cd-=dt;inv-=dt;const sp=sp0+t*4;
    if(cd<=0){cd=gap;const free=rnd()*3|0,oth=[0,1,2].filter(l=>l!==free),bl=tier>4&&rnd()<.4?oth:[oth[rnd()*2|0]];bl.forEach(l=>obs.push({l,y:-50,c:cols[rnd()*4|0]}))}
    for(let i=obs.length-1;i>=0;i--){const o=obs[i];o.y+=sp*dt;
      if(inv<=0&&o.l===lane&&o.y>H-110&&o.y<H-40){lives--;inv=1.2;obs.splice(i,1);if(!lives)return fin(0)}else if(o.y>H+60)obs.splice(i,1)}
    cv.dataset.s=JSON.stringify({lane,obs:obs.map(o=>[o.l,Math.round(o.y)])});x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#2a2330';x.fillRect(LW-1,0,2,H);x.fillRect(2*LW-1,0,2,H);
    obs.forEach(o=>{x.fillStyle=o.c;x.fillRect(o.l*LW+14,o.y,LW-28,48)});
    if(!(inv>0&&Math.floor(t*12)%2)){const cx=lane*LW+LW/2;x.fillStyle='#F3E2A9';x.fillRect(cx-16,H-100,32,50);x.fillStyle='#9C7A1A';x.fillRect(cx-16,H-100,32,10);x.fillStyle='#fff';x.beginPath();x.arc(cx-16,H-48,7,0,7);x.arc(cx+16,H-48,7,0,7);x.fill()}
    info('Survive '+Math.max(0,Math.ceil(T-t))+'s · Lives '+'♥'.repeat(lives));if(t>=T)fin(lives===3?3:lives===2?2:1)})};
if(window.GK.boot)window.GK.boot();
})();
