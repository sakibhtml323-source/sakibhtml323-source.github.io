(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.balloon=({b,tier,rnd,info,fin})=>{
  const N=Math.min(20,5+tier),cells=C.sh(Array.from({length:30},(_,i)=>i),rnd).slice(0,N),nums=C.sh(Array.from({length:N},(_,i)=>i+1),rnd);let next=1,lives=3;
  b.className='board arena tall';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML=nums.map((v,k)=>{if(v<next)return'';const c=cells[k];return'<button class="bln" data-v="'+v+'" style="left:'+((c%5)*20+10)+'%;top:'+((c/5|0)*16.6+8.3)+'%;background:hsl('+((v*47)%360)+',60%,52%)" aria-label="Balloon '+v+'">'+v+'</button>'}).join('');info('Next: '+next+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const c=e.target.closest('.bln');if(!c)return;if(+c.dataset.v===next){next++;if(next>N)return fin(lives===3?3:lives===2?2:1)}else{lives--;if(!lives)return fin(0)}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
