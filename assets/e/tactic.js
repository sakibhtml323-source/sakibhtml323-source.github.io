(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.tactic=({b,tier,rnd,info,fin,alive})=>{
  const R=6,K=7,depth=2+Math.min(4,tier>>1),order=[3,2,4,1,5,0,6];let g=Array(42).fill(0),moves=0,busy=false,done=false;
  const W=[];for(let r=0;r<R;r++)for(let c=0;c<K;c++)for(const[dr,dc]of[[0,1],[1,0],[1,1],[1,-1]]){const w=[];for(let i=0;i<4;i++){const rr=r+dr*i,cc=c+dc*i;if(rr<0||rr>=R||cc<0||cc>=K)break;w.push(rr*K+cc)}if(w.length===4)W.push(w)}
  const drop=(a,c,p)=>{for(let r=R-1;r>=0;r--)if(!a[r*K+c]){const n=a.slice();n[r*K+c]=p;return n}return null};
  const won=(a,p)=>W.some(w=>w.every(i=>a[i]===p));
  const ev=a=>{let s=0;for(const w of W){let x=0,y=0;for(const i of w){if(a[i]===2)x++;else if(a[i]===1)y++}if(x&&y)continue;if(x)s+=[0,1,6,60,0][x];if(y)s-=[0,1,6,70,0][y]}for(let r=0;r<R;r++)if(a[r*K+3]===2)s+=3;return s};
  const mm=(a,d,al,be,max)=>{if(won(a,2))return 100000+d;if(won(a,1))return -100000-d;if(d===0||a.every(Boolean))return ev(a);
    if(max){let v=-1e9;for(const c of order){const n=drop(a,c,2);if(!n)continue;v=Math.max(v,mm(n,d-1,al,be,false));al=Math.max(al,v);if(al>=be)break}return v}
    let v=1e9;for(const c of order){const n=drop(a,c,1);if(!n)continue;v=Math.min(v,mm(n,d-1,al,be,true));be=Math.min(be,v);if(al>=be)break}return v};
  const aiMove=()=>{let best=-1e9,bc=3;for(const c of order){const n=drop(g,c,2);if(!n)continue;const v=mm(n,depth-1,-1e9,1e9,false)+rnd()*.5;if(v>best){best=v;bc=c}}g=drop(g,bc,2)};
  b.className='board c4';b.style.setProperty('--n',K);
  const draw=()=>{b.innerHTML=g.map((v,i)=>'<button class="cell p'+v+'" data-c="'+(i%K)+'" aria-label="Column '+(i%K+1)+'"></button>').join('');info('Your moves '+moves+' · Rival looks '+depth+' ahead')};
  b.onclick=e=>{const c=e.target.closest('.cell');if(!c||busy||done)return;const n=drop(g,+c.dataset.c,1);if(!n)return;g=n;moves++;draw();
    if(won(g,1)){done=true;return fin(moves<=10?3:moves<=14?2:1)}if(g.every(Boolean)){done=true;return fin(1)}
    busy=true;setTimeout(()=>{if(!alive())return;aiMove();busy=false;draw();if(won(g,2)){done=true;fin(0)}else if(g.every(Boolean)){done=true;fin(1)}},350)};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
