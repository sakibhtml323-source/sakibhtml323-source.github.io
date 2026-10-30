(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.hidato=({b,tier,rnd,info,fin})=>{
  const n=4+(tier>5),N=n*n,nb=i=>{const x=i%n,y=i/n|0,r=[];if(x>0)r.push(i-1);if(x<n-1)r.push(i+1);if(y>0)r.push(i-n);if(y<n-1)r.push(i+n);return r};
  let sol=null;
  const ham=(p,seen)=>{if(p.length===N)return p.slice();const h=p[p.length-1],o=nb(h).filter(c=>!seen.has(c)).sort((a,c)=>nb(a).filter(z=>!seen.has(z)).length-nb(c).filter(z=>!seen.has(z)).length||rnd()-.5);
    for(const c of o){seen.add(c);p.push(c);const r=ham(p,seen);if(r)return r;p.pop();seen.delete(c)}return null};
  while(!sol){const s=rnd()*N|0;sol=ham([s],new Set([s]))}
  const step=3+(tier>>2),giv=new Map();sol.forEach((c,k)=>{if(k===0||k===N-1||k%step===0)giv.set(c,k+1)});
  const reserved=new Set(giv.values());let path=[sol[0]],undo=0,done=false;
  b.className='board hid';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=Array.from({length:N},(_,i)=>{const pi=path.indexOf(i);return'<button class="cell np'+(giv.has(i)?' gv':'')+(pi>=0?' on':'')+(i===path[path.length-1]?' hd':'')+'" data-i="'+i+'" aria-label="Square '+(i+1)+'">'+(pi>=0?pi+1:giv.has(i)?giv.get(i):'')+'</button>'}).join('');info('Filled '+path.length+'/'+N+' · Undos '+undo)};
  b.onclick=e=>{const c=e.target.closest('.np');if(!c||done)return;const i=+c.dataset.i,h=path[path.length-1];
    if(i===h){if(path.length>1){path.pop();undo++;draw()}return}
    if(!nb(h).includes(i)||path.includes(i))return;const k=path.length+1;
    if(giv.has(i)){if(giv.get(i)!==k)return}else if(reserved.has(k))return;
    path.push(i);draw();if(path.length===N){done=true;fin(undo===0?3:undo<=3?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
