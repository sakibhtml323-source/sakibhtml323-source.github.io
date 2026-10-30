(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.swap=({b,tier,rnd,info,fin})=>{
  const n=3+Math.min(2,tier>>2),N=n*n;let t,sel=-1,moves=0,done=false;
  do{t=C.sh(Array.from({length:N},(_,i)=>i+1),rnd)}while(t.every((v,i)=>v===i+1));
  const seen=Array(N).fill(0);let cyc=0;for(let i=0;i<N;i++){if(!seen[i]){cyc++;let j=i;while(!seen[j]){seen[j]=1;j=t[j]-1}}}const par=N-cyc;
  b.className='board swap';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=t.map((v,i)=>'<button class="cell tile'+(i===sel?' sel':'')+(v===i+1?' fixed':'')+'" data-i="'+i+'">'+v+'</button>').join('');info('Swaps: '+moves+' · Par '+par)};
  b.onclick=e=>{const c=e.target.closest('.tile');if(!c||done)return;const i=+c.dataset.i;if(sel<0){sel=i;return draw()}if(sel===i){sel=-1;return draw()}
    [t[sel],t[i]]=[t[i],t[sel]];sel=-1;moves++;draw();if(t.every((v,k)=>v===k+1)){done=true;fin(moves<=par?3:moves<=Math.ceil(par*1.5)?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
