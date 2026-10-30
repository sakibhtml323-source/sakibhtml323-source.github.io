(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.magnet=({b,tier,rnd,info,fin,alive})=>{
  const n=5+(tier>5),N=n*n,D=[[-1,0],[1,0],[0,-1],[0,1]],cnt=Math.round(N*(.12+tier*.01)),minPar=Math.min(7,2+(tier>>1));let ob,st,tg,par=-1,best=null;
  const slide=(a,d)=>{const p=a.slice();let moved=true;while(moved){moved=false;for(let k=0;k<p.length;k++){const x=p[k]%n+D[d][0],y=(p[k]/n|0)+D[d][1];if(x<0||y<0||x>=n||y>=n)continue;const q=y*n+x;if(ob.has(q)||p.includes(q))continue;p[k]=q;moved=true}}return p};
  const key=a=>a.slice().sort((x,y)=>x-y).join(),isWin=a=>key(a)===key(tg);
  const bfs=()=>{const dist=new Map([[key(st),0]]),q=[st];for(let h=0;h<q.length;h++){const a=q[h];if(isWin(a))return dist.get(key(a));for(let d=0;d<4;d++){const r=slide(a,d),k=key(r);if(!dist.has(k)){dist.set(k,dist.get(key(a))+1);q.push(r)}}}return -1};
  for(let t=0;t<300;t++){ob=new Set();const cells=C.sh([...Array(N).keys()],rnd);st=cells.slice(0,2);tg=cells.slice(2,4);cells.slice(4,4+cnt).forEach(c=>ob.add(c));
    if(isWin(st))continue;const p=bfs();if(p>=minPar){par=p;break}if(p>(best?best.p:0))best={p,st,tg,ob:new Set(ob)}}
  if(par<0){if(best){st=best.st;tg=best.tg;ob=best.ob;par=best.p}else{ob=new Set();st=[0,1];tg=[N-1,N-2];par=bfs()}}
  let pos=st,moves=0,done=false;b.className='board gravity';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="gg" style="--n:'+n+'">'+Array.from({length:N},(_,i)=>'<div class="gc'+(ob.has(i)?' ob':'')+(tg.includes(i)?' gl':'')+(pos.includes(i)?' bl':'')+'"></div>').join('')+'</div>'+dpad();info('Tilts '+moves+' · Best '+par)};
  ctl(b,alive,m=>{if(done)return;const r=slide(pos,m);if(key(r)===key(pos))return;pos=r;moves++;draw();if(isWin(pos)){done=true;fin(moves<=par?3:moves<=par+2?2:1)}});
  draw()};
if(window.GK.boot)window.GK.boot();
})();
