(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.stack=({b,tier,rnd,info,fin,alive})=>{
  const W=300,H=400,bh=24,goal=8+tier*2,w0=150;let bl=[{x:75,w:w0}],cur={x:0,w:w0,d:1},fl=0,last=performance.now();
  b.className='board stack';b.style.removeProperty('--n');
  b.innerHTML='<canvas width="'+W+'" height="'+H+'" aria-label="Tower"></canvas><p class="mu" style="text-align:center;margin:8px 0 0">Tap the tower or press Space to drop</p>';
  const cv=b.querySelector('canvas'),x=cv.getContext('2d');
  const draw=()=>{cv.dataset.s=JSON.stringify({cx:cur.x,cw:cur.w,px:bl[bl.length-1].x,pw:bl[bl.length-1].w});x.fillStyle='#0d0b10';x.fillRect(0,0,W,H);const sc=Math.max(0,bl.length-12);
    bl.forEach((k,i)=>{x.fillStyle='hsl(42,60%,'+(32+(i%10)*3)+'%)';x.fillRect(k.x,H-(i+1-sc)*bh,k.w,bh-2)});
    x.fillStyle='#fff3c4';x.fillRect(cur.x,H-(bl.length+1-sc)*bh,cur.w,bh-2)};
  const drop=()=>{const p=bl[bl.length-1],l=Math.max(cur.x,p.x),r=Math.min(cur.x+cur.w,p.x+p.w),ov=r-l;if(ov<=2)return fin(0);
    if(Math.abs(cur.x-p.x)<5)bl.push({x:p.x,w:p.w});else bl.push({x:l,w:ov});fl++;const nw=bl[bl.length-1].w;
    if(fl>=goal){draw();return fin(nw>=w0*.7?3:nw>=w0*.4?2:1)}cur={x:0,w:nw,d:1};info('Floors '+fl+'/'+goal)};
  const tick=now=>{if(!alive())return;const dt=Math.min(.05,(now-last)/1000);last=now;cur.x+=cur.d*(110+tier*13+fl*5)*dt;
    if(cur.x<0){cur.x=0;cur.d=1}if(cur.x+cur.w>W){cur.x=W-cur.w;cur.d=-1}draw();requestAnimationFrame(tick)};
  cv.onpointerdown=drop;addEventListener('keydown',e=>{if(e.code==='Space'&&alive()){e.preventDefault();drop()}});
  info('Floors 0/'+goal);requestAnimationFrame(tick)};
if(window.GK.boot)window.GK.boot();
})();
