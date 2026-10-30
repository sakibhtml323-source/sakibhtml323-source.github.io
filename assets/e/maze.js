(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.maze=({b,tier,rnd,info,fin,alive})=>{
  const n=Math.min(13,5+tier),N=n*n,open=Array.from({length:N},()=>[0,0,0,0]),D=[[0,-1,0,2],[1,0,1,3],[0,1,2,0],[-1,0,3,1]],st=[0],vis=new Set([0]);
  while(st.length){const i=st[st.length-1],x=i%n,y=i/n|0,nb=D.filter(([dx,dy])=>{const X=x+dx,Y=y+dy;return X>=0&&X<n&&Y>=0&&Y<n&&!vis.has(Y*n+X)});
    if(!nb.length){st.pop();continue}const[dx,dy,d,o]=nb[rnd()*nb.length|0],j=(y+dy)*n+x+dx;open[i][d]=1;open[j][o]=1;vis.add(j);st.push(j)}
  const dist=Array(N).fill(-1),q=[0];dist[0]=0;
  for(let h=0;h<q.length;h++){const i=q[h],x=i%n,y=i/n|0;D.forEach(([dx,dy,d])=>{if(open[i][d]){const j=(y+dy)*n+x+dx;if(dist[j]<0){dist[j]=dist[i]+1;q.push(j)}}})}
  const par=dist[N-1],seen=new Set([0]);let pos=0,moves=0,done=false;
  b.className='board maze';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="mz" style="--n:'+n+'">'+open.map((o,i)=>'<div class="mc'+(o[0]?'':' wn')+(o[1]?'':' we')+(o[2]?'':' ws')+(o[3]?'':' ww')+(i===pos?' me':'')+(i===N-1?' mx':'')+(seen.has(i)&&i!==pos?' vs':'')+'"></div>').join('')+'</div>'+dpad();info('Moves '+moves+' · Shortest '+par)};
  ctl(b,alive,m=>{if(done)return;const d=[3,1,0,2][m];if(!open[pos][d])return;pos=((pos/n|0)+D[d][1])*n+pos%n+D[d][0];seen.add(pos);moves++;draw();
    if(pos===N-1){done=true;fin(moves<=par*1.3?3:moves<=par*1.8?2:1)}});
  draw()};
if(window.GK.boot)window.GK.boot();
})();
