(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.pancake=({b,tier,rnd,info,fin})=>{
  const n=4+(tier>>2);let s;do{s=C.sh(Array.from({length:n},(_,i)=>i+1),rnd)}while(s.every((v,i)=>v===i+1));
  const goal=Array.from({length:n},(_,i)=>i+1).join(),flip=(a,k)=>a.slice(0,k+1).reverse().concat(a.slice(k+1));
  const dist=new Map([[goal,0]]),q=[goal.split(',').map(Number)];
  for(let h=0;h<q.length;h++){const a=q[h],d=dist.get(a.join());for(let k=1;k<n;k++){const b2=flip(a,k),key=b2.join();if(!dist.has(key)){dist.set(key,d+1);q.push(b2)}}}
  const par=dist.get(s.join());let moves=0,done=false;b.className='board pan';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="stack">'+s.map((v,i)=>'<button class="pk2" data-k="'+i+'" data-v="'+v+'" style="width:'+(30+v*(70/n))+'%" aria-label="Pancake '+v+'">'+v+'</button>').join('')+'</div><p class="mu" style="text-align:center">Tap a pancake to flip it and everything above it</p>';info('Flips '+moves+' · Par '+par+' · Smallest on top')};
  b.onclick=e=>{const c=e.target.closest('.pk2');if(!c||done)return;const k=+c.dataset.k;if(k===0)return;s=flip(s,k);moves++;draw();if(s.join()===goal){done=true;fin(moves<=par?3:moves<=par+2?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
