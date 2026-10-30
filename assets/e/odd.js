(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.odd=({b,tier,rnd,info,fin})=>{
  const n=Math.min(7,3+(tier>>1)),rounds=4+Math.ceil(tier/2),delta=Math.max(4,30-tier*2.2);let r=0,lives=3,odd;
  b.className='board odd';b.style.setProperty('--n',n);
  const draw=()=>{const h=rnd()*360|0,l=40+(rnd()*20|0);odd=rnd()*n*n|0;
    b.innerHTML=Array.from({length:n*n},(_,i)=>'<button class="cell" data-i="'+i+'" style="background:hsl('+h+',62%,'+(i===odd?l+delta:l)+'%)" aria-label="Tile '+(i+1)+'"></button>').join('');info('Round '+(r+1)+'/'+rounds+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const c=e.target.closest('.cell');if(!c)return;if(+c.dataset.i===odd){r++;if(r>=rounds)return fin(lives===3?3:lives===2?2:1)}else{lives--;if(!lives)return fin(0)}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
