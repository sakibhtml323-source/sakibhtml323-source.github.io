(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.rgrid=({b,tier,rnd,info,fin,alive})=>{
  const goal=10+tier*2,life=Math.max(550,1100-tier*40),gap=Math.max(450,950-tier*40);let hit=0,lives=3,miss=0;const up=new Map();
  b.className='board mole';b.style.setProperty('--n',3);
  b.innerHTML=Array.from({length:9},(_,i)=>'<button class="cell hole rg" data-i="'+i+'" aria-label="Square '+(i+1)+'"></button>').join('');
  const upd=()=>info('Hits '+hit+'/'+goal+' · Lives '+'♥'.repeat(lives)+' · Missed '+miss+'/4');
  const spawn=()=>{if(!alive())return;if(up.size<1+(tier>6)){const f=[0,1,2,3,4,5,6,7,8].filter(i=>!up.has(i)),i=f[rnd()*f.length|0],go=rnd()<.7;b.children[i].classList.add(go?'go':'no');
      up.set(i,{go,t:setTimeout(()=>{if(!alive())return;up.delete(i);b.children[i].classList.remove('go','no');if(go){miss++;upd();if(miss>=4)fin(0)}},life)})}
    setTimeout(spawn,gap)};
  b.onclick=e=>{const c=e.target.closest('.rg');if(!c)return;const i=+c.dataset.i,u=up.get(i);if(!u)return;clearTimeout(u.t);up.delete(i);c.classList.remove('go','no');
    if(u.go){hit++;upd();if(hit>=goal)fin(lives===3&&miss<=1?3:lives>=2&&miss<=2?2:1)}else{lives--;upd();if(!lives)fin(0)}};
  upd();spawn()};
if(window.GK.boot)window.GK.boot();
})();
