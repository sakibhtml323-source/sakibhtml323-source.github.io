(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.gates=({b,tier,rnd,info,fin,alive})=>{
  const N=5+(tier>>1),fr=.6+tier*.05;let t=0,cur=0,lives=3;const ph=Array.from({length:N},()=>rnd()),f=Array.from({length:N},()=>fr*(.8+rnd()*.5));
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="gates">'+Array.from({length:N},(_,i)=>'<i class="gt" data-i="'+i+'"></i>').join('')+'</div><button class="tapbig" id="dash" style="aspect-ratio:3/1;margin-top:16px;font-size:28px">DASH</button>';
  const els=[...b.querySelectorAll('.gt')],isOpen=i=>((t*f[i]+ph[i])%1)<.5,upd=()=>info('Gates '+cur+'/'+N+' · Lives '+'♥'.repeat(lives));
  const refresh=()=>els.forEach((e,i)=>{const cls='gt'+(isOpen(i)?' open':'')+(i<cur?' past':'')+(i===cur?' now':'');if(e.className!==cls)e.className=cls});
  b.querySelector('#dash').onclick=()=>{if(!alive())return;if(isOpen(cur)){cur++;if(cur>=N)return fin(lives===3?3:lives===2?2:1)}else{lives--;if(!lives)return fin(0)}upd();refresh()};
  upd();loop(alive,dt=>{t+=dt;refresh()})};
if(window.GK.boot)window.GK.boot();
})();
