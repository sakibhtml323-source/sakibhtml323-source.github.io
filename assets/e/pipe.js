(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.pipe=({b,tier,rnd,info,fin})=>{
  const n=4+Math.min(3,tier>>2),N=n*n,G=' ╹╺┗╻┃┏┣╸┛━┻┓┫┳╋',V=[[0,-1],[1,0],[0,1],[-1,0]];let path;
  for(let tries=0;tries<80&&!path;tries++){const r0=rnd()*n|0,p=[r0*n],seen=new Set(p);let x=0,y=r0;
    while(x<n-1){const o=[[1,0],[1,0],[0,-1],[0,1]].filter(([dx,dy])=>{const X=x+dx,Y=y+dy;return Y>=0&&Y<n&&!seen.has(Y*n+X)});if(!o.length)break;const[dx,dy]=o[rnd()*o.length|0];x+=dx;y+=dy;p.push(y*n+x);seen.add(y*n+x)}
    if(x===n-1)path=p}
  if(!path)path=Array.from({length:n},(_,i)=>i);
  const bit=(a,c)=>{const dx=c%n-a%n,dy=(c/n|0)-(a/n|0);return dx===1?2:dx===-1?8:dy===1?4:1};
  const tgt=Array(N).fill(0);path.forEach((c,k)=>{tgt[c]=(k?bit(c,path[k-1]):8)|(k<path.length-1?bit(c,path[k+1]):2)});
  const rot=m=>((m<<1)|(m>>3))&15,rotk=(m,k)=>{for(let i=0;i<k;i++)m=rot(m);return m};
  const g=Array.from({length:N},(_,i)=>tgt[i]||[5,10,3,6,12,9][rnd()*6|0]);
  g.forEach((m,i)=>{g[i]=rotk(m,rnd()*4|0)});
  const calc=()=>{let p=0;path.forEach(c=>{for(let k=0;k<4;k++)if(rotk(g[c],k)===tgt[c]){p+=k;break}});return p};
  if(calc()===0)g[path[0]]=rot(g[path[0]]);
  const par=calc();let moves=0,done=false;
  const trace=()=>{const wet=[];let c=path[0],came=8,ok=false;
    for(let s=0;s<=N;s++){if(!(g[c]&came))break;wet.push(c);const out=g[c]&~came&15;if(!out||(out&(out-1)))break;
      const k=out===1?0:out===2?1:out===4?2:3,x=c%n+V[k][0],y=(c/n|0)+V[k][1];if(x>=n){ok=out===2;break}if(x<0||y<0||y>=n)break;c=y*n+x;came=[4,8,1,2][k]}
    return{wet,ok}};
  b.className='board pipe';b.style.setProperty('--n',n);
  const draw=()=>{const w=new Set(trace().wet);b.innerHTML=g.map((m,i)=>'<button class="cell pp'+(w.has(i)?' wet':'')+(i===path[0]?' st':'')+'" data-i="'+i+'" aria-label="Pipe '+(i+1)+'">'+G[m]+'</button>').join('');info('Rotations '+moves+' · Par '+par)};
  b.onclick=e=>{const c=e.target.closest('.pp');if(!c||done)return;const i=+c.dataset.i;g[i]=rot(g[i]);moves++;draw();if(trace().ok){done=true;fin(moves<=par?3:moves<=par+3?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
