(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.kite=({b,tier,rnd,info,fin,alive})=>{
  const zw=Math.max(14,34-tier*1.6),sp=70+tier*14,rmax=100+tier*10;let m=0,dir=1,zc=zw/2+rnd()*(100-zw),me=100,rv=rmax;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="lane"><small>Rival kite string</small><div class="prog"><i id="rv" style="width:100%"></i></div></div><div class="lane"><small>Your kite string</small><div class="prog"><i id="me" style="width:100%"></i></div></div><div class="ktrack"><i class="kz" id="kz"></i><i class="km" id="km"></i></div><button class="tapbig" id="cut" style="aspect-ratio:3/1;margin-top:16px;font-size:30px">CUT</button>';
  const g=q=>b.querySelector(q),kz=g('#kz'),km=g('#km'),rvb=g('#rv'),meb=g('#me');
  const zone=()=>{kz.style.left=(zc-zw/2)+'%';kz.style.width=zw+'%'};
  const show=()=>{rvb.style.width=Math.max(0,rv/rmax*100)+'%';meb.style.width=Math.max(0,me)+'%'};
  g('#cut').onclick=()=>{if(!alive())return;
    if(Math.abs(m-zc)<=zw/2){rv-=34;info('Clean cut!');if(rv<=0){show();return fin(me>=75?3:me>=50?2:1)}}
    else{me-=25;info('Missed. Your string frays');if(me<=0){show();return fin(0)}}
    zc=zw/2+rnd()*(100-zw);zone();show()};
  loop(alive,dt=>{m+=dir*sp*dt;if(m>100){m=100;dir=-1}if(m<0){m=0;dir=1}km.style.left=m+'%'});
  info('Press Cut when the marker is in the gold zone');zone();show()};
if(window.GK.boot)window.GK.boot();
})();
