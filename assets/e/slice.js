(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.slice=({b,tier,rnd,info,fin,alive})=>{
  const goal=10+tier*3,gap=Math.max(.5,1-tier*.04),bp=.12+Math.min(.2,tier*.015);let hits=0,lives=3,missed=0,cd=.4;const it=[];
  b.className='board arena';b.style.removeProperty('--n');b.innerHTML='';
  const upd=()=>info('Sliced '+hits+'/'+goal+' · Lives '+'♥'.repeat(lives)+' · Missed '+missed+'/6');
  const mk=()=>{const bomb=rnd()<bp,e=document.createElement('button');e.className=bomb?'fr2 bomb':'fr2';e.setAttribute('aria-label',bomb?'Bomb':'Fruit');
    if(!bomb)e.style.background='radial-gradient(circle at 35% 30%,rgba(255,255,255,.6),hsl('+(rnd()*360|0)+',75%,55%))';b.appendChild(e);
    return{e,bomb,x:12+rnd()*76,y:108,vx:(rnd()-.5)*16,vy:-(88+rnd()*20+tier*1.5)}};
  b.onclick=e=>{const el=e.target.closest('.fr2');if(!el||!alive())return;const k=it.findIndex(o=>o.e===el);if(k<0)return;const o=it[k];it.splice(k,1);el.remove();
    if(o.bomb){lives--;upd();if(!lives)fin(0)}else{hits++;upd();if(hits>=goal)fin(lives===3&&missed<=2?3:lives>=2&&missed<=4?2:1)}};
  upd();
  loop(alive,dt=>{cd-=dt;if(cd<=0){cd=gap;it.push(mk())}
    for(let i=it.length-1;i>=0;i--){const o=it[i];o.vy+=120*dt;o.y+=o.vy*dt;o.x+=o.vx*dt;o.e.style.left=o.x+'%';o.e.style.top=o.y+'%';
      if(o.vy>0&&o.y>110){it.splice(i,1);o.e.remove();if(!o.bomb){missed++;upd();if(missed>=6)return fin(0)}}}})};
if(window.GK.boot)window.GK.boot();
})();
