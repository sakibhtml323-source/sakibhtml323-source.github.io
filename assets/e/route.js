(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.route=({b,tier,rnd,info,fin})=>{
  const n=6+(tier>5),pts=Array.from({length:n},()=>[8+rnd()*84,8+rnd()*84]);
  const d=(a,c)=>Math.hypot(pts[a][0]-pts[c][0],pts[a][1]-pts[c][1]),len=o=>o.reduce((s,v,i)=>s+d(v,o[(i+1)%o.length]),0);
  let best=1e9;const perm=(a,r)=>{if(!r.length){best=Math.min(best,len(a));return}for(let i=0;i<r.length;i++)perm(a.concat(r[i]),r.slice(0,i).concat(r.slice(i+1)))};perm([0],[...Array(n).keys()].slice(1));
  const lim=best*(1.3-Math.min(.28,tier*.025));let route=[0],lives=3,msg='';b.className='board math';b.style.removeProperty('--n');
  const pl=()=>{let s=0;for(let i=1;i<route.length;i++)s+=d(route[i-1],route[i]);if(route.length===n)s+=d(route[n-1],0);return s};
  const draw=()=>{const pts2=route.map(i=>pts[i][0]+','+pts[i][1]).join(' ')+(route.length===n?' '+pts[0][0]+','+pts[0][1]:'');
    b.innerHTML='<div class="map"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="'+pts2+'" fill="none" stroke="#D4AF37" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>'+pts.map((p,i)=>'<button class="cty'+(i===0?' home':'')+(route.includes(i)?' vis':'')+'" data-i="'+i+'" style="left:'+p[0]+'%;top:'+p[1]+'%" aria-label="Town '+(i+1)+(i===0?', home':'')+'">'+(i===0?'H':i+1)+'</button>').join('')+'</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn sec" data-u="1">Undo</button></div>';
    info('Route '+pl().toFixed(0)+' · Limit '+lim.toFixed(0)+' · Lives '+'♥'.repeat(lives)+(msg?' · '+msg:''))};
  b.onclick=e=>{if(e.target.closest('[data-u]')){if(route.length>1)route.pop();msg='';return draw()}const c=e.target.closest('.cty');if(!c)return;const i=+c.dataset.i;if(route.includes(i))return;route.push(i);msg='';
    if(route.length===n){const t=pl();if(t<=lim){draw();return fin(t<=best*1.02?3:t<=best*1.12?2:1)}lives--;if(!lives)return fin(0);msg='Too long';draw();route=[0];return}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
