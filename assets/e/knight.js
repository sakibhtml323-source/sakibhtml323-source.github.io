(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.knight=({b,tier,rnd,info,fin})=>{
  const n=8,N=64,KM=[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]],blocked=new Set();let st,tg,par=-1;
  const moves=i=>KM.map(([dx,dy])=>[i%n+dx,(i/n|0)+dy]).filter(([x,y])=>x>=0&&y>=0&&x<n&&y<n).map(([x,y])=>y*n+x).filter(j=>!blocked.has(j));
  const bfs=()=>{const d=new Map([[st,0]]),q=[st];for(let h=0;h<q.length;h++){const p=q[h];if(p===tg)return d.get(p);for(const j of moves(p))if(!d.has(j)){d.set(j,d.get(p)+1);q.push(j)}}return -1};
  const want=Math.min(6,3+(tier>>1));
  for(let t=0;t<300;t++){blocked.clear();const cells=C.sh([...Array(N).keys()],rnd);st=cells[0];tg=cells[1];cells.slice(2,8+tier).forEach(c=>blocked.add(c));const p=bfs();if(p>=want){par=p;break}}
  if(par<0){blocked.clear();st=0;tg=63;par=bfs()}
  let pos=st,used=0,done=false;const limit=par+2;b.className='board knight';b.style.setProperty('--n',n);
  const draw=()=>{const mv=new Set(moves(pos));b.innerHTML=Array.from({length:N},(_,i)=>'<button class="cell kn'+(((i%n)+(i/n|0))%2?' dk':'')+(blocked.has(i)?' bl':'')+(i===tg?' tgt2':'')+(i===pos?' me':'')+(mv.has(i)?' mv':'')+'" data-i="'+i+'" aria-label="Square '+(i+1)+'"></button>').join('');info('Moves '+used+'/'+limit+' · Shortest '+par)};
  b.onclick=e=>{const c=e.target.closest('.kn');if(!c||done)return;const i=+c.dataset.i;if(!moves(pos).includes(i))return;pos=i;used++;draw();
    if(pos===tg){done=true;return fin(used<=par?3:used<=par+1?2:1)}if(used>=limit){done=true;fin(0)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
