(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.pulse=({b,tier,rnd,info,fin,alive})=>{
  const goal=8+tier*2,life=Math.max(520,1500-tier*100);let hit=0,miss=0,t;
  b.className='board arena';b.style.removeProperty('--n');b.innerHTML='';
  const upd=()=>info('Hits '+hit+'/'+goal+' · Misses '+miss+'/3');
  const spawn=()=>{if(!alive())return;b.innerHTML='';const d=document.createElement('button');d.className='orb';d.setAttribute('aria-label','Tap');
    d.style.left=(10+rnd()*80)+'%';d.style.top=(10+rnd()*80)+'%';
    d.onclick=()=>{clearTimeout(t);hit++;upd();if(hit>=goal)return fin(miss===0?3:miss<=1?2:1);spawn()};
    b.appendChild(d);t=setTimeout(()=>{if(!alive())return;miss++;upd();if(miss>=3)return fin(0);spawn()},life)};
  upd();spawn()};
if(window.GK.boot)window.GK.boot();
})();
