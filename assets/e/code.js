(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.code=({b,tier,rnd,info,fin})=>{
  const K=tier<5?5:6,L=4,max=tier<4?10:tier<8?9:8,secret=Array.from({length:L},()=>rnd()*K|0);let cur=[],hist=[];
  b.className='board code';b.style.removeProperty('--n');
  const col=i=>'hsl('+(i*57+10)+',62%,52%)';
  const peg=g=>{let bl=0,wh=0;const s=secret.slice(),h=[];g.forEach((v,i)=>{if(v===s[i]){bl++;s[i]=-1}else h.push(v)});h.forEach(v=>{const j=s.indexOf(v);if(j>=0){wh++;s[j]=-1}});return[bl,wh]};
  const dot=i=>'<i class="dot" style="background:'+col(i)+'">'+(i+1)+'</i>';
  const draw=()=>{b.innerHTML='<div class="hist">'+hist.map(([g,p])=>'<div class="hrow">'+g.map(dot).join('')+'<span class="pegs">'+'<i class="pg b"></i>'.repeat(p[0])+'<i class="pg w"></i>'.repeat(p[1])+'</span></div>').join('')+'</div><div class="hrow">'+Array.from({length:L},(_,i)=>cur[i]!==undefined?dot(cur[i]):'<i class="dot empty"></i>').join('')+'</div><div class="pal" style="margin-top:12px">'+Array.from({length:K},(_,i)=>'<button class="pc" data-c="'+i+'" aria-label="Colour '+(i+1)+'" style="background:'+col(i)+'">'+(i+1)+'</button>').join('')+'</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn sec" data-a="del">Undo</button><button class="btn pri" data-a="ok"'+(cur.length<L?' disabled':'')+'>Check</button></div>';info('Guess '+(hist.length+1)+'/'+max)};
  b.onclick=e=>{const c=e.target.closest('[data-c]'),a=e.target.closest('[data-a]');
    if(c&&cur.length<L)cur.push(+c.dataset.c);else if(a&&a.dataset.a==='del')cur.pop();
    else if(a&&a.dataset.a==='ok'&&cur.length===L){const p=peg(cur);hist.push([cur,p]);cur=[];if(p[0]===L){draw();return fin(hist.length<=5?3:hist.length<=7?2:1)}if(hist.length>=max)return fin(0)}
    draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
