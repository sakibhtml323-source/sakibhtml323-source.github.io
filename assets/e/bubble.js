(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.bubble=({b,tier,rnd,info,fin,alive})=>{
  const goal=10+tier*3,life=Math.max(2200,5200-tier*230),gap=Math.max(380,950-tier*45);let pops=0,esc=0;
  b.className='board arena tall';b.style.removeProperty('--n');b.innerHTML='';
  const upd=()=>info('Popped '+pops+'/'+goal+' · Escaped '+esc+'/5');
  const spawn=()=>{if(!alive())return;const d=document.createElement('button');d.className='bub';d.setAttribute('aria-label','Bubble');
    d.style.left=(6+rnd()*78)+'%';d.style.animationDuration=life+'ms';d.style.background='radial-gradient(circle at 32% 28%,rgba(255,255,255,.8),hsl('+(rnd()*360|0)+',70%,60%))';b.appendChild(d);setTimeout(spawn,gap)};
  b.onclick=e=>{const d=e.target.closest('.bub');if(!d)return;d.remove();pops++;upd();if(pops>=goal)fin(esc===0?3:esc<=2?2:1)};
  b.onanimationend=e=>{if(!alive())return;const d=e.target.closest?e.target.closest('.bub'):null;if(!d||!d.isConnected)return;d.remove();esc++;upd();if(esc>=5)fin(0)};
  upd();spawn()};
if(window.GK.boot)window.GK.boot();
})();
