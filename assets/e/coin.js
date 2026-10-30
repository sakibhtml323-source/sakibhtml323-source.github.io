(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.coin=({b,tier,rnd,info,fin,alive})=>{
  const n=tier<6?7:9,N=n*n,need=5+(tier>>1),slow=tier<3,walls=new Set(),D=[[-1,0],[1,0],[0,-1],[0,1]];let lives=3,got=0,mvs=0,done=false;
  const nbs=i=>D.map(([dx,dy])=>{const x=i%n+dx,y=(i/n|0)+dy;return x>=0&&y>=0&&x<n&&y<n?y*n+x:-1}).filter(j=>j>=0&&!walls.has(j));
  const bfs=s=>{const d=Array(N).fill(-1);d[s]=0;const q=[s];for(let h=0;h<q.length;h++){const i=q[h];nbs(i).forEach(j=>{if(d[j]<0){d[j]=d[i]+1;q.push(j)}})}return d};
  const home=[N-1,n*(n-1)],start=0;let pl=start;const chs=[home[0]];if(tier>=5)chs.push(home[1]);
  for(let t=0;t<60;t++){walls.clear();const wc=Math.min(10,tier>>1);while(walls.size<wc){const c=rnd()*N|0;if(c!==pl&&!home.includes(c))walls.add(c)}
    const d=bfs(pl);if(d.every((v,i)=>v>=0||walls.has(i)))break;if(t===59)walls.clear()}
  const coins=new Set(C.sh([...Array(N).keys()].filter(i=>i!==pl&&!home.includes(i)&&!walls.has(i)),rnd).slice(0,need));
  b.className='board gravity';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="gg" style="--n:'+n+'">'+Array.from({length:N},(_,i)=>'<div class="gc'+(walls.has(i)?' ob':'')+(coins.has(i)?' cn':'')+(i===pl?' bl':'')+(chs.includes(i)?' en':'')+'"></div>').join('')+'</div>'+dpad();info('Coins '+got+'/'+need+' · Lives '+'♥'.repeat(lives))};
  const caught=()=>{lives--;if(!lives){done=true;draw();fin(0);return}pl=start;chs.forEach((_,k)=>{chs[k]=home[k]})};
  ctl(b,alive,m=>{if(done)return;const x=pl%n+D[m][0],y=(pl/n|0)+D[m][1];if(x<0||y<0||x>=n||y>=n||walls.has(y*n+x))return;pl=y*n+x;mvs++;
    if(coins.delete(pl)){got++;if(got>=need){done=true;draw();return fin(lives===3?3:lives===2?2:1)}}
    if(chs.includes(pl)){caught();draw();return}
    if(!slow||mvs%2===0){const d=bfs(pl);for(let k=0;k<chs.length;k++){const c=chs[k],o=nbs(c).filter(j=>d[j]>=0).sort((p,q)=>d[p]-d[q]);if(o.length&&d[o[0]]<d[c])chs[k]=o[0]}
      if(chs.includes(pl)){caught();draw();return}}
    draw()});
  draw()};
if(window.GK.boot)window.GK.boot();
})();
