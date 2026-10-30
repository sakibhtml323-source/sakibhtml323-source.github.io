(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.lights=({b,tier,rnd,info,fin})=>{
  const n=Math.min(6,3+Math.floor((tier-1)/3));let g=Array(n*n).fill(0),moves=0,done=false;
  const tog=i=>{const x=i%n,y=i/n|0;for(const[dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X>=0&&X<n&&Y>=0&&Y<n)g[Y*n+X]^=1}};
  const k=2+tier*2;for(let i=0;i<k;i++)tog(rnd()*n*n|0);if(!g.some(Boolean))tog(0);
  b.className='board lights';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=g.map((v,i)=>'<button class="cell'+(v?' on':'')+'" data-i="'+i+'" aria-label="Cell '+(i+1)+(v?' on':' off')+'"></button>').join('');info('Moves: '+moves)};
  b.onclick=e=>{const c=e.target.closest('.cell');if(!c||done)return;tog(+c.dataset.i);moves++;draw();if(!g.some(Boolean)){done=true;fin(moves<=k?3:moves<=k+6?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
