(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.mole=({b,tier,rnd,info,fin,alive})=>{
  const goal=8+tier*2,life=Math.max(600,1300-tier*55),gap=Math.max(400,900-tier*40),maxUp=1+(tier>3)+(tier>7);let hit=0,miss=0;const up=new Map();
  b.className='board mole';b.style.setProperty('--n',3);
  b.innerHTML=Array.from({length:9},(_,i)=>'<button class="cell hole" data-i="'+i+'" aria-label="Hole '+(i+1)+'"></button>').join('');
  const upd=()=>info('Hits '+hit+'/'+goal+' · Escaped '+miss+'/3');
  const spawn=()=>{if(!alive())return;if(up.size<maxUp){const f=[0,1,2,3,4,5,6,7,8].filter(i=>!up.has(i)),i=f[rnd()*f.length|0];b.children[i].classList.add('up');
      up.set(i,setTimeout(()=>{if(!alive())return;up.delete(i);b.children[i].classList.remove('up');miss++;upd();if(miss>=3)fin(0)},life))}
    setTimeout(spawn,gap)};
  b.onclick=e=>{const c=e.target.closest('.hole');if(!c)return;const i=+c.dataset.i;if(!up.has(i))return;clearTimeout(up.get(i));up.delete(i);c.classList.remove('up');hit++;upd();if(hit>=goal)fin(miss===0?3:miss<=1?2:1)};
  upd();spawn()};
if(window.GK.boot)window.GK.boot();
})();
