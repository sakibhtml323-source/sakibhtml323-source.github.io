(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.glide=({b,tier,rnd,info,fin,alive})=>{
  const W=320,H=420,need=5+tier,gap=Math.max(112,170-tier*4),sp=130+tier*9,pw=52,bx=90;let y=H/2,vy=0,started=false,lives=3,inv=0,t=0,passed=0,spawned=0;const ps=[];
  b.className='board arcade';b.style.removeProperty('--n');const[cv,x]=cvs(b,W,H);
  const flap=()=>{if(!alive())return;started=true;vy=-330};
  cv.onpointerdown=flap;addEventListener('keydown',e=>{if((e.code==='Space'||e.key==='ArrowUp')&&alive()){e.preventDefault();flap()}});
  const upd=()=>info('Gates '+passed+'/'+need+' · Lives '+'♥'.repeat(lives)+(started?'':' · Tap to flap'));upd();
  loop(alive,dt=>{t+=dt;inv-=dt;
    if(started){vy+=1000*dt;y+=vy*dt;
      const last=ps[ps.length-1];if(spawned<need&&(!last||last.x<W-190)){ps.push({x:W+10,c:gap/2+40+rnd()*(H-gap-80),p:0});spawned++}
      for(const q of ps){q.x-=sp*dt;if(!q.p&&q.x+pw<bx-10){q.p=1;passed++;upd();if(passed>=need)return fin(lives===3?3:lives===2?2:1)}}
      while(ps.length&&ps[0].x<-pw-20)ps.shift();
      const hit=y>H-12||y<12||ps.some(q=>bx+10>q.x&&bx-10<q.x+pw&&(y-10<q.c-gap/2||y+10>q.c+gap/2));
      if(hit&&inv<=0){lives--;inv=1.2;upd();if(!lives)return fin(0);const nx=ps.find(q=>q.x+pw>bx-10);y=nx?nx.c:H/2;vy=0}}
    else y=H/2+Math.sin(t*4)*8;
    cv.dataset.g=JSON.stringify({y:Math.round(y),vy:Math.round(vy),p:ps.map(q=>[Math.round(q.x),Math.round(q.c)]),gap});x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#8a7fa0';ps.forEach(q=>{x.fillRect(q.x,0,pw,q.c-gap/2);x.fillRect(q.x,q.c+gap/2,pw,H-q.c-gap/2)});
    x.fillStyle=inv>0&&Math.floor(t*12)%2?'#665a2a':'#F3E2A9';x.beginPath();x.arc(bx,y,10,0,7);x.fill()})};
if(window.GK.boot)window.GK.boot();
})();
