(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.reversi=({b,tier,rnd,info,fin,alive})=>{
  const n=tier<5?6:8,N=n*n,depth=1+Math.min(3,tier>>2),DR=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
  let g=Array(N).fill(0),busy=false,done=false;const h=n/2;g[(h-1)*n+h-1]=2;g[(h-1)*n+h]=1;g[h*n+h-1]=1;g[h*n+h]=2;
  const fl=(a,i,p)=>{if(a[i])return[];const x=i%n,y=i/n|0,out=[];for(const[dx,dy]of DR){const t=[];let X=x+dx,Y=y+dy;while(X>=0&&Y>=0&&X<n&&Y<n&&a[Y*n+X]===3-p){t.push(Y*n+X);X+=dx;Y+=dy}if(t.length&&X>=0&&Y>=0&&X<n&&Y<n&&a[Y*n+X]===p)out.push(...t)}return out};
  const mv=(a,p)=>{const r=[];for(let i=0;i<N;i++)if(!a[i]&&fl(a,i,p).length)r.push(i);return r};
  const app=(a,i,p)=>{const o=a.slice();fl(a,i,p).forEach(j=>{o[j]=p});o[i]=p;return o};
  const W=Array.from({length:N},(_,i)=>{const x=i%n,y=i/n|0,ex=x===0||x===n-1,ey=y===0||y===n-1,nx=x===1||x===n-2,ny=y===1||y===n-2;if(ex&&ey)return 25;if((nx&&ey)||(ny&&ex))return -6;if(nx&&ny)return -8;if(ex||ey)return 4;return 1});
  const ev=a=>{let s=0;for(let i=0;i<N;i++)s+=a[i]===2?W[i]:a[i]===1?-W[i]:0;return s+2*(mv(a,2).length-mv(a,1).length)};
  const mm=(a,d,al,be,p)=>{if(d===0)return ev(a);const ms=mv(a,p);if(!ms.length){if(!mv(a,3-p).length)return ev(a);return mm(a,d-1,al,be,3-p)}
    if(p===2){let v=-1e9;for(const m of ms){v=Math.max(v,mm(app(a,m,2),d-1,al,be,1));al=Math.max(al,v);if(al>=be)break}return v}
    let v=1e9;for(const m of ms){v=Math.min(v,mm(app(a,m,1),d-1,al,be,2));be=Math.min(be,v);if(al>=be)break}return v};
  const best=()=>{let bv=-1e9,bm=-1;for(const m of mv(g,2)){const v=mm(app(g,m,2),depth-1,-1e9,1e9,1)+rnd()*.5;if(v>bv){bv=v;bm=m}}return bm};
  b.className='board reversi';b.style.setProperty('--n',n);
  const cnt=p=>g.filter(v=>v===p).length;
  const draw=()=>{const hint=busy||done?[]:mv(g,1);b.innerHTML=g.map((v,i)=>'<button class="cell rc'+(hint.includes(i)?' hint':'')+'" data-i="'+i+'" aria-label="Square '+(i+1)+'">'+(v?'<i class="d'+v+'"></i>':'')+'</button>').join('');info('You '+cnt(1)+' – '+cnt(2)+' Rival · Rival looks '+depth+' ahead')};
  const end=()=>{if(mv(g,1).length||mv(g,2).length)return false;done=true;draw();const m=cnt(1),a=cnt(2);fin(m>a?(m-a>=N/4?3:m-a>=N/10?2:1):0);return true};
  const aiTurn=()=>{busy=true;draw();setTimeout(()=>{if(!alive())return;if(mv(g,2).length)g=app(g,best(),2);if(end())return;if(mv(g,1).length){busy=false;draw()}else aiTurn()},420)};
  b.onclick=e=>{const c=e.target.closest('.rc');if(!c||busy||done)return;const i=+c.dataset.i;if(!fl(g,i,1).length)return;g=app(g,i,1);if(end())return;aiTurn()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
