(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.flow=({b,tier,rnd,info,fin})=>{
  const n=3+(tier>5),N=n*n,k=3+tier;let g=Array(N).fill(0),moves=0,done=false;
  const press=i=>{const x=i%n,y=i/n|0;for(const[dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X>=0&&X<n&&Y>=0&&Y<n)g[Y*n+X]=(g[Y*n+X]+1)%3}};
  for(let s=0;s<k;s++)press(rnd()*N|0);if(g.every(v=>v===g[0]))press(0);
  b.className='board flowc';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=g.map((v,i)=>'<button class="cell fl c'+v+'" data-i="'+i+'" aria-label="Tile '+(i+1)+', colour '+(v+1)+'"></button>').join('');info('Taps '+moves+' · Make every tile one colour')};
  b.onclick=e=>{const c=e.target.closest('.fl');if(!c||done)return;press(+c.dataset.i);moves++;draw();if(g.every(v=>v===g[0])){done=true;fin(moves<=k?3:moves<=k+4?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
