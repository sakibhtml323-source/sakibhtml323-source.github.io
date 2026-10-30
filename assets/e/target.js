(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.target=({b,tier,rnd,info,fin,alive})=>{
  const goal=10+tier*3,life=Math.max(1100,2200-tier*80),gap=Math.max(350,800-tier*35);let hits=0,miss=0,live=0;
  b.className='board arena';b.style.removeProperty('--n');b.innerHTML='';
  const upd=()=>info('Hits '+hits+'/'+goal+' · Missed '+miss+'/5');
  const spawn=()=>{if(!alive())return;if(live<4){live++;const d=document.createElement('button');d.className='tgt';d.setAttribute('aria-label','Target');d.style.left=(10+rnd()*80)+'%';d.style.top=(10+rnd()*80)+'%';d.style.animationDuration=life+'ms';b.appendChild(d)}setTimeout(spawn,gap)};
  b.onclick=e=>{const d=e.target.closest('.tgt');if(!d)return;d.remove();live--;hits++;upd();if(hits>=goal)fin(miss===0?3:miss<=2?2:1)};
  b.onanimationend=e=>{if(!alive())return;const d=e.target.closest?e.target.closest('.tgt'):null;if(!d||!d.isConnected)return;d.remove();live--;miss++;upd();if(miss>=5)fin(0)};
  upd();spawn()};
if(window.GK.boot)window.GK.boot();
})();
