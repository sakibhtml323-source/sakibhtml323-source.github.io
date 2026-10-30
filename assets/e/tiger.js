(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.tiger=({b,tier,rnd,info,fin})=>{
  const n=7,N=49,D=[[0,-1],[1,0],[0,1],[-1,0]],edge=i=>{const x=i%n,y=i/n|0;return x===0||y===0||x===n-1||y===n-1};
  const nbr=i=>D.map(([dx,dy])=>[i%n+dx,(i/n|0)+dy]).filter(([x,y])=>x>=0&&y>=0&&x<n&&y<n).map(([x,y])=>y*n+x);
  const field=bl=>{const d=Array(N).fill(1e9),q=[];for(let i=0;i<N;i++)if(edge(i)&&!bl.has(i)){d[i]=0;q.push(i)}for(let h=0;h<q.length;h++)for(const j of nbr(q[h]))if(!bl.has(j)&&d[j]>d[q[h]]+1){d[j]=d[q[h]]+1;q.push(j)}return d};
  const tmove=(t,bl)=>{const d=field(bl);let best=-1,bd=1e9;for(const j of nbr(t))if(!bl.has(j)&&d[j]<bd){bd=d[j];best=j}return best};
  const sim=(bl0,t0)=>{const bl=new Set(bl0);let t=t0,turns=0;while(turns<40){const nx=tmove(t,bl);if(nx<0)return turns;bl.add(nx);turns++;const m=tmove(t,bl);if(m<0)return turns;t=m;if(edge(t))return -1}return -1};
  let bl=new Set(),par=-1,k=Math.max(8,18-tier);
  for(let a=0;a<400&&par<=0;a++){if(a%100===99)k+=2;const cells=C.sh([...Array(N).keys()].filter(i=>i!==24),rnd);bl=new Set(cells.slice(0,k));par=sim(bl,24)}
  let t=24,turns=0,done=false;b.className='board tgrid';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=Array.from({length:N},(_,i)=>'<button class="cell tgc'+(bl.has(i)?' bl':'')+(i===t?' tg':'')+(edge(i)?' ed':'')+'" data-i="'+i+'" aria-label="Square '+(i+1)+'"></button>').join('');info('Blockers placed '+turns+' · Trap the tiger before it reaches the edge')};
  b.onclick=e=>{const c=e.target.closest('.tgc');if(!c||done)return;const i=+c.dataset.i;if(bl.has(i)||i===t)return;bl.add(i);turns++;
    const m=tmove(t,bl);if(m<0){done=true;draw();return fin(turns<=par?3:turns<=par+3?2:1)}
    t=m;if(edge(t)){done=true;draw();return fin(0)}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
