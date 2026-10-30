(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.hanoi=({b,tier,info,fin})=>{
  const D=3+Math.min(3,tier>>1);let pegs=[Array.from({length:D},(_,i)=>D-i),[],[]],sel=-1,moves=0,done=false;
  b.className='board hanoi';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML=pegs.map((p,k)=>'<button class="peg'+(k===sel?' sel':'')+'" data-p="'+k+'" aria-label="Peg '+(k+1)+'">'+p.slice().reverse().map(d=>'<i style="width:'+(26+d*(64/D))+'%" data-d="'+d+'"></i>').join('')+'</button>').join('');info('Moves '+moves+' · Par '+(2**D-1))};
  b.onclick=e=>{const c=e.target.closest('.peg');if(!c||done)return;const k=+c.dataset.p;
    if(sel<0){if(pegs[k].length)sel=k}else if(sel===k)sel=-1;
    else{const f=pegs[sel],t=pegs[k];if(!t.length||t[t.length-1]>f[f.length-1]){t.push(f.pop());moves++}sel=-1}
    draw();if(pegs[2].length===D){done=true;fin(moves<=2**D-1?3:moves<=Math.ceil((2**D-1)*1.3)?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
