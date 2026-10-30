(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.snake=({b,tier,rnd,info,fin,alive})=>{
  const n=tier<6?10:12,S=Math.floor(320/n),goal=6+tier*2,ms=Math.max(90,230-tier*14),D=[[-1,0],[1,0],[0,-1],[0,1]];
  let sn=[[2,n>>1],[1,n>>1],[0,n>>1]],dir=1,nd=1,apples=0,steps=0;const walls=[];
  const at=(l,p)=>l.some(s=>s[0]===p[0]&&s[1]===p[1]);
  for(let i=0;i<Math.min(12,Math.max(0,(tier-3)*2));i++){let p;do{p=[3+(rnd()*(n-3)|0),rnd()*n|0]}while((p[1]===n>>1&&p[0]<7)||at(walls,p));walls.push(p)}
  const free=()=>{let p;do{p=[rnd()*n|0,rnd()*n|0]}while(at(sn,p)||at(walls,p));return p};let ap=free();
  b.className='board snake';b.style.removeProperty('--n');
  b.innerHTML='<canvas width="'+n*S+'" height="'+n*S+'" aria-label="Snake board"></canvas>'+dpad();
  const cvn=b.querySelector('canvas'),x=cvn.getContext('2d');
  const draw=()=>{cvn.dataset.s=JSON.stringify({sn,ap,dir,walls,n});x.fillStyle='#0d0b10';x.fillRect(0,0,n*S,n*S);x.fillStyle='#5a5360';walls.forEach(w=>x.fillRect(w[0]*S+1,w[1]*S+1,S-2,S-2));
    x.fillStyle='#F3E2A9';x.beginPath();x.arc(ap[0]*S+S/2,ap[1]*S+S/2,S/2.6,0,7);x.fill();sn.forEach((s,i)=>{x.fillStyle=i?'#D4AF37':'#fff3c4';x.fillRect(s[0]*S+1,s[1]*S+1,S-2,S-2)});info('Apples '+apples+'/'+goal)};
  const tick=()=>{if(!alive()){clearInterval(iv);return}dir=nd;const h=[sn[0][0]+D[dir][0],sn[0][1]+D[dir][1]];
    if(h[0]<0||h[1]<0||h[0]>=n||h[1]>=n||at(sn,h)||at(walls,h)){clearInterval(iv);return fin(0)}
    sn.unshift(h);steps++;
    if(h[0]===ap[0]&&h[1]===ap[1]){apples++;if(apples>=goal){draw();clearInterval(iv);return fin(steps<=goal*8?3:steps<=goal*12?2:1)}ap=free()}else sn.pop();draw()};
  ctl(b,alive,d=>{if((d^1)!==dir)nd=d});
  draw();const iv=setInterval(tick,ms)};
if(window.GK.boot)window.GK.boot();
})();
