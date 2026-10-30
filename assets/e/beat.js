(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.beat=({b,tier,rnd,info,fin,alive})=>{
  const goal=8+tier*2,sp=45+tier*4,gap=Math.max(.45,.95-tier*.04);let hits=0,miss=0,cd=.5;const notes=[];
  b.className='board beat';b.style.removeProperty('--n');
  b.innerHTML='<div class="track"><i class="hl"></i></div><div class="lanes"><button class="lb" data-l="0" aria-label="Left lane">◀</button><button class="lb" data-l="1" aria-label="Middle lane">●</button><button class="lb" data-l="2" aria-label="Right lane">▶</button></div>';
  const tr=b.querySelector('.track'),upd=()=>info('Hits '+hits+'/'+goal+' · Misses '+miss+'/5');
  const mk=l=>{const e=document.createElement('i');e.className='nt';e.style.left=(l*33.33+4)+'%';tr.appendChild(e);return e};
  b.onclick=e=>{const lb=e.target.closest('.lb');if(!lb||!alive())return;const l=+lb.dataset.l;let best=null;
    for(const n of notes)if(n.l===l&&Math.abs(n.y-86)<=12&&(!best||Math.abs(n.y-86)<Math.abs(best.y-86)))best=n;
    if(best){notes.splice(notes.indexOf(best),1);best.e.remove();hits++;upd();if(hits>=goal)fin(miss===0?3:miss<=2?2:1)}else{miss++;upd();if(miss>=5)fin(0)}};
  upd();
  loop(alive,dt=>{cd-=dt;if(cd<=0){cd=gap;const l=rnd()*3|0;notes.push({l,y:-8,e:mk(l)})}
    for(let i=notes.length-1;i>=0;i--){const n=notes[i];n.y+=sp*dt;n.e.style.top=n.y+'%';if(n.y>104){n.e.remove();notes.splice(i,1);miss++;upd();if(miss>=5)return fin(0)}}})};
if(window.GK.boot)window.GK.boot();
})();
