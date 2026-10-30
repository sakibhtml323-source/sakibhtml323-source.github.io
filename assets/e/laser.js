(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.laser=({b,tier,rnd,info,fin,alive})=>{
  const T=12+tier*2,warn=Math.max(.45,1-tier*.05),fire=.5;let t=0,lane=1,lives=3,inv=0,cd=1,ev=null,state=['','',''];
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="lzr"><i class="lzl" data-l="0"></i><i class="lzl" data-l="1"></i><i class="lzl" data-l="2"></i></div><div class="lanes"><button class="lb" data-l="0" aria-label="Left lane">◀</button><button class="lb" data-l="1" aria-label="Middle lane">●</button><button class="lb" data-l="2" aria-label="Right lane">▶</button></div>';
  const els=[...b.querySelectorAll('.lzl')];
  b.onclick=e=>{const l=e.target.closest('.lb');if(l&&alive())lane=+l.dataset.l};
  loop(alive,dt=>{t+=dt;inv-=dt;cd-=dt;
    if(cd<=0&&!ev){const k=1+(tier>4&&rnd()<.5?1:0);ev={ls:C.sh([0,1,2],rnd).slice(0,k),t:0};cd=warn+fire+.35}
    if(ev){ev.t+=dt;const ph=ev.t<warn?'warn':ev.t<warn+fire?'fire':'';state=state.map((_,i)=>ev.ls.includes(i)?ph:'');
      if(ph==='fire'&&ev.ls.includes(lane)&&inv<=0){lives--;inv=1;if(!lives)return fin(0)}if(ev.t>=warn+fire){ev=null;state=['','','']}}
    els.forEach((e,i)=>{const cls='lzl'+(state[i]?' '+state[i]:'')+(i===lane?' me':'');if(e.className!==cls)e.className=cls});
    info('Survive '+Math.max(0,Math.ceil(T-t))+'s · Lives '+'♥'.repeat(lives));if(t>=T)fin(lives===3?3:lives===2?2:1)})};
if(window.GK.boot)window.GK.boot();
})();
