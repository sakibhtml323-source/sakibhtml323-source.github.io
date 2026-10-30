(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.cups=({b,tier,rnd,info,fin,alive})=>{
  const K=3+(tier>5),swaps=4+tier*2,sp=Math.max(190,560-tier*32),need=3;let ok=0,lives=3,ball=0,busy=true;const slot=Array.from({length:K},(_,i)=>i);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  b.className='board cups';b.style.removeProperty('--n');b.style.setProperty('--k',K);
  b.innerHTML=Array.from({length:K},(_,i)=>'<button class="cup" data-i="'+i+'" aria-label="Cup '+(i+1)+'"><i></i></button>').join('');
  const cu=[...b.children],place=()=>cu.forEach((c,i)=>{c.style.left=(slot[i]*100/K)+'%'});
  const round=async()=>{if(!alive())return;busy=true;place();cu.forEach(c=>c.classList.remove('up','has'));ball=rnd()*K|0;cu[ball].classList.add('has','up');info('Watch the ball…');
    await wait(1000);if(!alive())return;cu[ball].classList.remove('up');await wait(400);
    for(let s=0;s<swaps;s++){if(!alive())return;const a=rnd()*K|0;let c=rnd()*K|0;if(a===c)c=(c+1)%K;[slot[a],slot[c]]=[slot[c],slot[a]];place();await wait(sp)}
    if(!alive())return;busy=false;info('Where is the ball? · Lives '+'♥'.repeat(lives)+' · Found '+ok+'/'+need)};
  b.onclick=async e=>{const c=e.target.closest('.cup');if(!c||busy)return;busy=true;const i=+c.dataset.i;cu.forEach(x=>x.classList.add('up'));
    if(i===ball){ok++;info('Correct!');if(ok>=need){await wait(800);if(alive())fin(lives===3?3:lives===2?2:1);return}}
    else{lives--;info('Missed it');if(!lives){await wait(800);if(alive())fin(0);return}}
    await wait(1200);round()};
  round()};
if(window.GK.boot)window.GK.boot();
})();
