(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.cafe=({b,tier,rnd,info,fin,alive})=>{
  const IT=['Tea','Milk','Cake','Bun','Fish','Jam'],K=5+(tier>5),m0=3+(tier>>2),need=4+(tier>>2),per=Math.max(450,850-tier*35);let ok=0,lives=3,seq=[],pos=0,phase='show';
  b.className='board math';b.style.removeProperty('--n');
  const render=()=>{b.innerHTML='<div class="order">'+(phase==='show'?seq.map(i=>'<span class="chipo">'+IT[i]+'</span>').join(''):'<span class="mu">Repeat the order ('+pos+'/'+seq.length+')</span>')+'</div><div class="pal" style="margin-top:14px">'+IT.slice(0,K).map((n,i)=>'<button class="itm" data-i="'+i+'"'+(phase==='show'?' disabled':'')+'>'+n+'</button>').join('')+'</div>';info('Orders '+ok+'/'+need+' · Lives '+'♥'.repeat(lives)+(phase==='show'?' · Memorise the order':''))};
  const start=()=>{if(!alive())return;seq=Array.from({length:m0},()=>rnd()*K|0);pos=0;phase='show';render();setTimeout(()=>{if(!alive())return;phase='play';render()},seq.length*per+500)};
  b.onclick=e=>{const t=e.target.closest('.itm');if(!t||phase!=='play')return;const i=+t.dataset.i;
    if(i===seq[pos]){pos++;if(pos>=seq.length){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1);return start()}render()}
    else{lives--;if(!lives)return fin(0);start()}};
  start()};
if(window.GK.boot)window.GK.boot();
})();
