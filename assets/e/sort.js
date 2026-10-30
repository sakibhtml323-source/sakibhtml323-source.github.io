(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.sort=({b,tier,rnd,info,fin})=>{
  const K=3+Math.min(4,tier>>1),cap=4,tubes=Array.from({length:K+2},()=>[]);let sel=-1,moves=0,done=false;
  C.sh(Array.from({length:K*cap},(_,i)=>i%K),rnd).forEach((c,i)=>tubes[i%K].push(c));
  b.className='board sort';b.style.removeProperty('--n');
  const solved=()=>tubes.every(t=>!t.length||(t.length===cap&&t.every(c=>c===t[0])));
  const draw=()=>{b.innerHTML=tubes.map((t,i)=>'<button class="tube'+(i===sel?' sel':'')+'" data-i="'+i+'" aria-label="Tube '+(i+1)+'">'+t.map(c=>'<i style="background:'+hue(c)+'"></i>').join('')+'</button>').join('');info('Moves: '+moves)};
  b.onclick=e=>{const t=e.target.closest('.tube');if(!t||done)return;const i=+t.dataset.i;
    if(sel<0){if(tubes[i].length)sel=i}else if(sel===i)sel=-1;
    else{const src=tubes[sel],dst=tubes[i],top=src[src.length-1];
      if(dst.length<cap&&(!dst.length||dst[dst.length-1]===top)){while(src.length&&src[src.length-1]===top&&dst.length<cap)dst.push(src.pop());moves++;sel=-1}
      else sel=tubes[i].length?i:-1}
    draw();if(solved()){done=true;fin(moves<=K*4?3:moves<=K*7?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
