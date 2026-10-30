(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.jumper=({b,tier,rnd,info,fin,alive})=>{
  const W=360,H=200,G=150,need=8+tier*2,sp=150+tier*10,gw=48+tier*3,px=80;let h=0,vy=0,jumps=0,lives=3,passed=0,inv=0,t=0;const segs=[{x:0,w:320,c:1}];
  b.className='board arcade';b.style.removeProperty('--n');
  const[cv,x]=cvs(b,W,H,'<div class="row" style="justify-content:center;margin-top:12px"><button class="btn pri" data-j>Jump</button></div>');
  const jump=()=>{if(alive()&&jumps<2){vy=430;jumps++}};cv.onpointerdown=jump;b.onclick=e=>{if(e.target.closest('[data-j]'))jump()};
  addEventListener('keydown',e=>{if((e.code==='Space'||e.key==='ArrowUp')&&alive()){e.preventDefault();jump()}});
  const sup=()=>segs.some(s=>px>=s.x&&px<=s.x+s.w),upd=()=>info('Gaps '+passed+'/'+need+' · Lives '+'♥'.repeat(lives)+' · Double jump allowed');upd();
  loop(alive,dt=>{t+=dt;inv-=dt;const v=sp+t*3;segs.forEach(s=>{s.x-=v*dt});
    const last=segs[segs.length-1];if(last.x+last.w<W+80)segs.push({x:last.x+last.w+gw*(.85+rnd()*.3),w:140+rnd()*140,c:0});
    for(const s of segs)if(!s.c&&!s.p&&s.x<px-12){s.p=1;passed++;upd();if(passed>=need)return fin(lives===3?3:lives===2?2:1)}
    while(segs.length>2&&segs[0].x+segs[0].w<-20)segs.shift();
    if(h>0||!sup()||vy>0){vy-=1400*dt;h+=vy*dt;if(h<=0&&sup()&&h>-8){h=0;vy=0;jumps=0}}
    if(h<-110){lives--;upd();if(!lives)return fin(0);const nx=segs.find(s=>s.x>px),dx=(nx?nx.x:px+40)-(px-14);segs.forEach(s=>{s.x-=dx});h=0;vy=0;jumps=0;inv=1}
    const cur=segs.find(s=>px>=s.x&&px<=s.x+s.w);cv.dataset.ge=cur?(cur.x+cur.w-px).toFixed(1):'999';
    x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);x.fillStyle='#2a2330';segs.forEach(s=>x.fillRect(s.x,G,s.w,H-G));x.fillStyle='#D4AF37';segs.forEach(s=>x.fillRect(s.x,G,s.w,2));
    if(!(inv>0&&Math.floor(t*12)%2)){x.fillStyle='#F3E2A9';x.fillRect(px-8,G-h-24,16,24)}})};
if(window.GK.boot)window.GK.boot();
})();
