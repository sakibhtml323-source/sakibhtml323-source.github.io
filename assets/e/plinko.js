(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.plinko=({b,tier,rnd,info,fin})=>{
  const V=[60,10,5,2,5,10,60],T=100+tier*10;let coins=8,score=0,msg='Choose a column to drop your coin.',done=false,last=-1;
  b.className='board cards';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="sc"><div><small>Score</small><b class="gold">'+score+'</b></div><div><small>Target</small><b>'+T+'</b></div><div><small>Coins</small><b>'+coins+'</b></div></div><p class="tn">'+msg+'</p><div class="drops">'+V.map((v,i)=>'<button class="drop" data-c="'+i+'" aria-label="Drop in column '+(i+1)+'">▼</button>').join('')+'</div><div class="pegbd">'+Array.from({length:6},()=>'<div class="pgr">'+Array.from({length:7},()=>'<i></i>').join('')+'</div>').join('')+'</div><div class="vals">'+V.map((v,i)=>'<div class="vl'+(i===last?' hit':'')+'">'+v+'</div>').join('')+'</div>';info('Edge columns keep the coin near the high-value slots')};
  b.onclick=e=>{const c=e.target.closest('.drop');if(!c||done)return;let p=+c.dataset.c;for(let r=0;r<6;r++)p=Math.max(0,Math.min(6,p+(rnd()<.5?-1:1)));
    score+=V[p];coins--;last=p;msg='Landed in slot '+(p+1)+': +'+V[p];
    if(coins<=0){done=true;draw();return fin(score>=T*1.4?3:score>=T*1.15?2:score>=T?1:0)}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
