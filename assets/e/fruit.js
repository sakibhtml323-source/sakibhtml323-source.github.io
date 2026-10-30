(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.fruit=({b,tier,rnd,info,fin})=>{
  const n=6,K=4+(tier>4)+(tier>8),moves0=18+tier*2,goal=350+tier*110,GL=['🍎','🍋','🍇','🍒','🍐','🍊'];let g,score=0,moves=moves0,sel=-1,done=false;
  const run=a=>{const m=new Set();for(let y=0;y<n;y++)for(let x=0;x<n;x++){const v=a[y*n+x];if(v<0)continue;
    if(x<n-2&&a[y*n+x+1]===v&&a[y*n+x+2]===v){m.add(y*n+x);m.add(y*n+x+1);m.add(y*n+x+2)}
    if(y<n-2&&a[(y+1)*n+x]===v&&a[(y+2)*n+x]===v){m.add(y*n+x);m.add((y+1)*n+x);m.add((y+2)*n+x)}}return m};
  const hasMove=a=>{for(let i=0;i<n*n;i++)for(const j of[i+1,i+n]){if(j>=n*n||(j===i+1&&i%n===n-1))continue;const c=a.slice();[c[i],c[j]]=[c[j],c[i]];if(run(c).size)return true}return false};
  const resolve=()=>{let combo=0;for(;;){const m=run(g);if(!m.size)break;combo++;score+=m.size*10*combo;m.forEach(i=>{g[i]=-1});
    for(let x=0;x<n;x++){const col=[];for(let y=n-1;y>=0;y--)if(g[y*n+x]>=0)col.push(g[y*n+x]);while(col.length<n)col.push(rnd()*K|0);for(let y=n-1,k=0;y>=0;y--,k++)g[y*n+x]=col[k]}}};
  do{g=Array.from({length:n*n},()=>rnd()*K|0)}while(run(g).size||!hasMove(g));
  b.className='board fruit';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="fg" style="--n:'+n+'">'+g.map((v,i)=>'<button class="cell fc2'+(i===sel?' sel':'')+'" data-i="'+i+'" data-t="'+v+'" aria-label="Fruit '+(v+1)+'">'+GL[v]+'</button>').join('')+'</div>';info('Score '+score+'/'+goal+' · Moves '+moves)};
  b.onclick=e=>{const c=e.target.closest('.fc2');if(!c||done)return;const i=+c.dataset.i;if(sel<0){sel=i;return draw()}
    const x1=sel%n,y1=sel/n|0,x2=i%n,y2=i/n|0;if(sel===i||Math.abs(x1-x2)+Math.abs(y1-y2)!==1){sel=i;return draw()}
    [g[sel],g[i]]=[g[i],g[sel]];
    if(run(g).size){moves--;sel=-1;resolve();let t=0;while(!hasMove(g)&&t++<50){g=C.sh(g,rnd);if(run(g).size)resolve()}draw();
      if(score>=goal){done=true;return fin(moves>=moves0*.4?3:moves>=moves0*.15?2:1)}if(moves<=0){done=true;fin(0)}}
    else{[g[sel],g[i]]=[g[i],g[sel]];sel=-1;draw()}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
