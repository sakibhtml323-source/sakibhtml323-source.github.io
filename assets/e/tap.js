(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.tap=({b,tier,rnd,info,fin,alive})=>{
  const goal=18+tier*5,T=10;let n=0,t0=0,iv;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<button class="tapbig">TAP</button><div class="prog" style="margin-top:16px;height:10px"><i id="tb" style="width:100%"></i></div>';
  const tb=b.querySelector('#tb'),btn=b.querySelector('.tapbig');
  const upd=()=>info('Taps '+n+'/'+goal+(t0?' · '+Math.max(0,T-(performance.now()-t0)/1000).toFixed(1)+'s':' · Tap to start'));upd();
  btn.onclick=()=>{if(!alive())return;
    if(!t0){t0=performance.now();iv=setInterval(()=>{if(!alive()){clearInterval(iv);return}const left=T-(performance.now()-t0)/1000;tb.style.width=Math.max(0,left/T*100)+'%';upd();if(left<=0){clearInterval(iv);fin(0)}},80)}
    n++;upd();if(n>=goal){clearInterval(iv);const left=T-(performance.now()-t0)/1000;fin(left>=T*.35?3:left>=T*.15?2:1)}}};
if(window.GK.boot)window.GK.boot();
})();
