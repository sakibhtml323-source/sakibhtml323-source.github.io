(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.rail=({b,tier,rnd,info,fin,alive})=>{
  const need=6+tier*2,v=28+tier*3,gap=Math.max(1.1,2.3-tier*.1);let ok=0,lives=3,cd=.6,route='A';const tr=[];
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="rails"><i class="trk mn"></i><i class="trk hl2"></i><i class="trk hr2"></i><i class="trk vl2"></i><i class="trk vr2"></i><i class="stn2 sa">A</i><i class="stn2 sb">B</i><i class="swh" id="swh" data-s="A"></i></div><button class="btn pri" id="sw" style="margin-top:12px;width:100%">Switch track</button>';
  const rl=b.querySelector('.rails'),swh=b.querySelector('#swh'),upd=()=>info('Delivered '+ok+'/'+need+' · Lives '+'♥'.repeat(lives)+' · Gold trains to A, purple to B');
  const setR=r=>{route=r;swh.dataset.s=r;swh.className='swh '+(r==='A'?'ra':'rb')};
  b.querySelector('#sw').onclick=()=>{if(alive())setR(route==='A'?'B':'A')};
  setR('A');upd();
  loop(alive,dt=>{cd-=dt;if(cd<=0){cd=gap;const c=rnd()<.5?'A':'B',e=document.createElement('i');e.className='trn t'+c;e.dataset.c=c;rl.appendChild(e);tr.push({c,y:-6,br:null,e})}
    for(let i=tr.length-1;i>=0;i--){const t=tr[i];t.y+=v*dt;if(t.br===null&&t.y>=50)t.br=route;
      t.e.style.top=t.y+'%';t.e.style.left=(t.br===null?50:t.br==='A'?22:78)+'%';
      if(t.y>=92){t.e.remove();tr.splice(i,1);if(t.br===t.c){ok++;upd();if(ok>=need)return fin(lives===3?3:lives===2?2:1)}else{lives--;upd();if(!lives)return fin(0)}}}})};
if(window.GK.boot)window.GK.boot();
})();
