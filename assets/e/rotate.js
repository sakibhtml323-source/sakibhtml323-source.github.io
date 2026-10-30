(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.rotate=({b,tier,rnd,info,fin})=>{
  const n=3+Math.min(2,tier>>2),N=n*n,cross=tier>=3;let r=Array(N).fill(0),moves=0,done=false;const cnt=Array(N).fill(0);
  const press=i=>{const x=i%n,y=i/n|0;for(const[dx,dy]of(cross?[[0,0],[1,0],[-1,0],[0,1],[0,-1]]:[[0,0]])){const X=x+dx,Y=y+dy;if(X>=0&&X<n&&Y>=0&&Y<n)r[Y*n+X]=(r[Y*n+X]+1)%4}};
  for(let s=0;s<3+tier*2;s++){const i=rnd()*N|0;press(i);cnt[i]++}
  if(r.every(v=>!v)){press(0);cnt[0]++}
  const par=cnt.reduce((a,c)=>a+(4-c%4)%4,0);
  b.className='board rot';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=r.map((v,i)=>'<button class="cell" data-i="'+i+'" aria-label="Tile '+(i+1)+', rotated '+v*90+' degrees"><span style="display:inline-block;transform:rotate('+v*90+'deg)">↑</span></button>').join('');info('Taps: '+moves+' · Par '+par)};
  b.onclick=e=>{const c=e.target.closest('.cell');if(!c||done)return;press(+c.dataset.i);moves++;draw();if(r.every(v=>!v)){done=true;fin(moves<=par?3:moves<=par+4?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
