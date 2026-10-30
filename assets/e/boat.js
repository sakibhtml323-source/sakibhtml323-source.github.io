(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.boat=({b,tier,rnd,info,fin,alive})=>{
  const rate=4+tier*.45;let my=0,riv=0,last=-1,t0=0;
  b.className='board boat';b.style.removeProperty('--n');
  b.innerHTML='<div class="lane"><small>You</small><div class="prog"><i id="my" style="width:0"></i></div></div><div class="lane"><small>Rival</small><div class="prog"><i id="rv" style="width:0"></i></div></div><div class="oars"><button class="oar" data-s="0">Left</button><button class="oar" data-s="1">Right</button></div>';
  const mi=b.querySelector('#my'),ri=b.querySelector('#rv');
  const show=()=>{mi.style.width=Math.min(100,my)+'%';ri.style.width=Math.min(100,riv)+'%'};
  const row=s=>{if(!alive())return;if(s!==last){my+=1.7;info('In rhythm!')}else{my=Math.max(0,my-1.2);info('Out of rhythm: alternate sides')}last=s;show();
    if(my>=100)fin(riv<=60?3:riv<=85?2:1)};
  b.onclick=e=>{const o=e.target.closest('.oar');if(o)row(+o.dataset.s)};
  addEventListener('keydown',e=>{if(!alive())return;if(e.key==='ArrowLeft')row(0);else if(e.key==='ArrowRight')row(1)});
  const iv=setInterval(()=>{if(!alive()){clearInterval(iv);return}riv+=rate*.1;show();if(riv>=100){clearInterval(iv);fin(0)}},100);
  info('Alternate Left and Right to row')};
if(window.GK.boot)window.GK.boot();
})();
