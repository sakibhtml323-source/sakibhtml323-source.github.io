(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.prism=({b,tier,rnd,info,fin})=>{
  const n=5+Math.min(2,tier>>2),N=n*n,T=2+(tier>>1),DX=[0,1,0,-1],DY=[-1,0,1,0],refl=(o,d)=>o===0?[1,0,3,2][d]:[3,2,1,0][d];
  const idx=(x,y)=>y*n+x,inb=(x,y)=>x>=0&&y>=0&&x<n&&y<n;let s=0,mirr=new Map(),recv=0,vis=new Set();
  for(let tries=0;tries<80;tries++){s=rnd()*n|0;let x=0,y=s,d=1;vis=new Set([idx(x,y)]);mirr=new Map();
    for(let t=0;t<T;t++){const steps=1+(rnd()*(n-2)|0);for(let k=0;k<steps;k++){const nx=x+DX[d],ny=y+DY[d];if(!inb(nx,ny)||vis.has(idx(nx,ny)))break;x=nx;y=ny;vis.add(idx(x,y))}
      const opts=[(d+1)%4,(d+3)%4].filter(nd=>{const nx=x+DX[nd],ny=y+DY[nd];return inb(nx,ny)&&!vis.has(idx(nx,ny))});if(!opts.length)break;
      const nd=opts[rnd()*opts.length|0];mirr.set(idx(x,y),[0,1].find(o=>refl(o,d)===nd));d=nd}
    let k=0;for(;k<n;k++){const nx=x+DX[d],ny=y+DY[d];if(!inb(nx,ny)||vis.has(idx(nx,ny)))break;x=nx;y=ny;vis.add(idx(x,y))}
    recv=idx(x,y);if(k>0&&mirr.size>=2&&recv!==idx(0,s))break}
  const pm=[...mirr.keys()];let par=0;pm.forEach(i=>{if(rnd()<.7){mirr.set(i,mirr.get(i)^1);par++}});if(!par&&pm.length){mirr.set(pm[0],mirr.get(pm[0])^1);par=1}
  C.sh([...Array(N).keys()].filter(i=>!vis.has(i)),rnd).slice(0,Math.floor(N*.1)+(tier>>2)).forEach(i=>mirr.set(i,rnd()*2|0));
  let moves=0,done=false;b.className='board prism';b.style.setProperty('--n',n);
  const trace=()=>{const lit=new Set();let x=0,y=s,d=1,hit=false;for(let st=0;st<6*N;st++){const i=idx(x,y);lit.add(i);if(i===recv){hit=true;break}if(mirr.has(i))d=refl(mirr.get(i),d);x+=DX[d];y+=DY[d];if(!inb(x,y))break}return{lit,hit}};
  const draw=()=>{const lit=trace().lit;b.innerHTML=Array.from({length:N},(_,i)=>'<button class="cell pr'+(lit.has(i)?' lit':'')+(i===recv?' rv':'')+(i===idx(0,s)?' src':'')+'" data-i="'+i+'" aria-label="Square '+(i+1)+'">'+(mirr.has(i)?(mirr.get(i)?'╲':'╱'):(i===recv?'◎':''))+'</button>').join('');info('Flips '+moves+' · Par '+par)};
  b.onclick=e=>{const c=e.target.closest('.pr');if(!c||done)return;const i=+c.dataset.i;if(!mirr.has(i))return;mirr.set(i,mirr.get(i)^1);moves++;draw();if(trace().hit){done=true;fin(moves<=par?3:moves<=par+2?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
