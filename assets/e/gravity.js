(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.gravity=({b,tier,rnd,info,fin,alive})=>{
  const n=5+Math.min(3,tier>>2),N=n*n,D=[[-1,0],[1,0],[0,-1],[0,1]],minPar=Math.min(8,2+(tier>>1)),cnt=Math.round(N*(.18+tier*.012));
  let ob,st,gl,par=-1,best=null;
  const slide=(p,d)=>{let x=p%n,y=p/n|0;for(;;){const X=x+D[d][0],Y=y+D[d][1];if(X<0||Y<0||X>=n||Y>=n||ob.has(Y*n+X))break;x=X;y=Y;if(y*n+x===gl)break}return y*n+x};
  const bfs=()=>{const dist=new Map([[st,0]]),q=[st];for(let h=0;h<q.length;h++){const p=q[h];if(p===gl)return dist.get(p);for(let d=0;d<4;d++){const r=slide(p,d);if(!dist.has(r)){dist.set(r,dist.get(p)+1);q.push(r)}}}return -1};
  for(let a=0;a<300;a++){st=rnd()*N|0;do{gl=rnd()*N|0}while(gl===st);ob=new Set();while(ob.size<cnt){const c=rnd()*N|0;if(c!==st&&c!==gl)ob.add(c)}
    const p=bfs();if(p>=minPar){par=p;break}if(p>(best?best.p:0))best={p,st,gl,ob:new Set(ob)}}
  if(par<0){if(best){st=best.st;gl=best.gl;ob=best.ob;par=best.p}else{st=0;gl=N-1;ob=new Set();par=bfs()}}
  let pos=st,moves=0,done=false;b.className='board gravity';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="gg" style="--n:'+n+'">'+Array.from({length:N},(_,i)=>'<div class="gc'+(ob.has(i)?' ob':'')+(i===gl?' gl':'')+(i===pos?' bl':'')+'"></div>').join('')+'</div>'+dpad();info('Flips '+moves+' · Best '+par)};
  ctl(b,alive,m=>{if(done)return;const r=slide(pos,m);if(r===pos)return;pos=r;moves++;draw();if(pos===gl){done=true;fin(moves<=par?3:moves<=par+2?2:1)}});
  draw()};
if(window.GK.boot)window.GK.boot();
})();
