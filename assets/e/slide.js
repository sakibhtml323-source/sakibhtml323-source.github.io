(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.slide=({b,tier,rnd,info,fin})=>{
  const n=tier>5?4:3,N=n*n;let t=Array.from({length:N},(_,i)=>i+1);t[N-1]=0;let e=N-1,moves=0,done=false,prev=-1;
  const nb=i=>[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>{const x=i%n+dx,y=(i/n|0)+dy;return x>=0&&x<n&&y>=0&&y<n?y*n+x:-1}).filter(v=>v>=0);
  const steps=20+tier*12;for(let s=0;s<steps;s++){const o=nb(e).filter(v=>v!==prev),m=o[rnd()*o.length|0];t[e]=t[m];t[m]=0;prev=e;e=m}
  const solved=()=>t.every((v,i)=>v===(i===N-1?0:i+1));
  b.className='board slide';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=t.map((v,i)=>v?'<button class="cell tile" data-i="'+i+'">'+v+'</button>':'<span class="cell gap"></span>').join('');info('Moves: '+moves)};
  b.onclick=ev=>{const c=ev.target.closest('.tile');if(!c||done)return;const i=+c.dataset.i;if(nb(i).includes(e)){t[e]=t[i];t[i]=0;e=i;moves++;draw();if(solved()){done=true;fin(moves<=steps?3:moves<=steps*2?2:1)}}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
