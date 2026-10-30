(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.runner=({b,tier,rnd,info,fin,alive})=>{
  const W=360,H=200,G=160,need=8+tier*2,sp0=200+tier*16;let y=0,vy=0,lives=3,passed=0,spawned=0,inv=0,t=0,next=.8;const obs=[];
  b.className='board arcade';b.style.removeProperty('--n');
  const[cv,x]=cvs(b,W,H,'<div class="row" style="justify-content:center;margin-top:12px"><button class="btn pri" data-j>Jump</button></div>');
  const jump=()=>{if(y===0&&alive())vy=-470};
  cv.onpointerdown=jump;b.onclick=e=>{if(e.target.closest('[data-j]'))jump()};
  addEventListener('keydown',e=>{if((e.code==='Space'||e.key==='ArrowUp')&&alive()){e.preventDefault();jump()}});
  const upd=()=>info('Obstacles '+passed+'/'+need+' · Lives '+'♥'.repeat(lives));upd();
  loop(alive,dt=>{t+=dt;inv-=dt;const sp=sp0+t*4;vy+=1500*dt;y=Math.min(0,y+vy*dt);if(y===0)vy=0;
    next-=dt;if(next<=0&&spawned<need){obs.push({x:W+10,w:16+rnd()*10,h:20+rnd()*26,p:0});spawned++;next=.75+rnd()*.7}
    for(const o of obs){o.x-=sp*dt;if(!o.p&&o.x+o.w<56){o.p=1;passed++;upd();if(passed>=need)return fin(lives===3?3:lives===2?2:1)}
      if(inv<=0&&o.x<76&&o.x+o.w>56&&-y<o.h){lives--;inv=1.2;upd();if(!lives)return fin(0)}}
    while(obs.length&&obs[0].x<-40)obs.shift();
    cv.dataset.o=JSON.stringify({y,sp,o:obs.map(o=>[Math.round(o.x),Math.round(o.w),Math.round(o.h)])});x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#2a2330';x.fillRect(0,G,W,H-G);x.fillStyle='#D4AF37';x.fillRect(0,G,W,2);
    obs.forEach(o=>{x.fillStyle='#8a7fa0';x.fillRect(o.x,G-o.h,o.w,o.h)});
    x.fillStyle=inv>0&&Math.floor(t*12)%2?'#665a2a':'#F3E2A9';x.fillRect(56,G-24+y,20,24)})};
if(window.GK.boot)window.GK.boot();
})();
