(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.sokoban=({b,tier,rnd,info,fin,alive})=>{
  const n=6+(tier>3),N=n*n,k=1+(tier>>2),D=[[-1,0],[1,0],[0,-1],[0,1]],S=15+tier*10;let walls,goals,boxes,pl,tries=0,moves=0,done=false;
  const mvTo=(i,d)=>{const x=i%n+D[d][0],y=(i/n|0)+D[d][1];return x>=0&&y>=0&&x<n&&y<n?y*n+x:-1};
  do{walls=new Set();const wc=3+(tier>>1);while(walls.size<wc)walls.add(rnd()*N|0);
    const cells=C.sh([...Array(N).keys()].filter(i=>!walls.has(i)),rnd);goals=cells.slice(0,k);boxes=goals.slice();pl=cells[k];
    for(let s=0;s<S;s++){const d=rnd()*4|0,back=mvTo(pl,d^1),front=mvTo(pl,d);if(back<0||walls.has(back)||boxes.includes(back))continue;const bi=front>=0?boxes.indexOf(front):-1;if(bi>=0)boxes[bi]=pl;pl=back}
    tries++}while(boxes.every(x=>goals.includes(x))&&tries<200);
  b.className='board gravity';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="gg" style="--n:'+n+'">'+Array.from({length:N},(_,i)=>'<div class="gc'+(walls.has(i)?' sw':'')+(goals.includes(i)?' sg':'')+(boxes.includes(i)?' sb':'')+(i===pl?' sp':'')+'"></div>').join('')+'</div>'+dpad();info('Moves '+moves+' · Boxes home '+boxes.filter(x=>goals.includes(x)).length+'/'+k)};
  ctl(b,alive,m=>{if(done)return;const t=mvTo(pl,m);if(t<0||walls.has(t))return;const bi=boxes.indexOf(t);
    if(bi>=0){const nt=mvTo(t,m);if(nt<0||walls.has(nt)||boxes.includes(nt))return;boxes[bi]=nt}
    pl=t;moves++;draw();if(boxes.every(x=>goals.includes(x))){done=true;fin(moves<=S?3:moves<=S*1.6?2:1)}});
  draw()};
if(window.GK.boot)window.GK.boot();
})();
