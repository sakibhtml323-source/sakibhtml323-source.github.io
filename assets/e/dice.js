(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.dice=({b,tier,rnd,info,fin,alive})=>{
  const T=30+Math.min(tier,10)*5,hold=tier<4?12:tier<8?16:20,F='⚀⚁⚂⚃⚄⚅';let me=0,ai=0,turn=0,busy=false,msg='Your turn: roll the die.',face=0;
  b.className='board dice';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="sc"><div><small>You</small><b>'+me+'</b></div><div class="die">'+F[face?face-1:0]+'</div><div><small>Rival</small><b>'+ai+'</b></div></div><p class="tn">'+msg+'</p><div class="row" style="justify-content:center"><button class="btn pri" data-a="roll"'+(busy?' disabled':'')+'>Roll</button><button class="btn sec" data-a="hold"'+(busy||!turn?' disabled':'')+'>Hold +'+turn+'</button></div>';info('First to '+T+' wins')};
  const end=()=>{if(me>=T){fin(ai<=T*.5?3:ai<=T*.8?2:1);return true}if(ai>=T){fin(0);return true}return false};
  const rival=()=>{busy=true;turn=0;let t=0;msg='Rival is rolling…';draw();
    const step=()=>{if(!alive())return;const d=1+(rnd()*6|0);face=d;
      if(d===1){msg='Rival rolled a 1 and lost the turn.';busy=false;draw();return}
      t+=d;if(t>=hold||ai+t>=T){ai+=t;msg='Rival held '+t+' points.';busy=false;draw();end();return}
      msg='Rival rolled '+d+' (turn total '+t+')';draw();setTimeout(step,700)};
    setTimeout(step,700)};
  b.onclick=e=>{const a=e.target.closest('[data-a]');if(!a||busy)return;
    if(a.dataset.a==='roll'){const d=1+(rnd()*6|0);face=d;
      if(d===1){turn=0;msg='You rolled a 1. Turn lost.';draw();busy=true;setTimeout(()=>{if(alive())rival()},900);return}
      turn+=d;msg='You rolled '+d+'. Roll again or hold.';draw();if(me+turn>=T){me+=turn;turn=0;draw();end()}}
    else if(turn){me+=turn;turn=0;msg='You banked your points.';draw();if(!end()){busy=true;setTimeout(()=>{if(alive())rival()},800)}}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
