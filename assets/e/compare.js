(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.compare=({b,tier,rnd,info,fin,alive})=>{
  const need=6+tier,R=m=>1+(rnd()*m|0),lim=Math.max(2200,6000-tier*320);let ok=0,lives=3,A,B,tm;
  const ex=()=>{if(tier<3){const v=R(99);return{t:''+v,v}}if(tier<6){const x=R(40),y=R(40);return{t:x+' + '+y,v:x+y}}if(rnd()<.5){const x=R(12),y=R(12);return{t:x+' × '+y,v:x*y}}const x=R(60),y=R(60);return{t:x+' + '+y,v:x+y}};
  b.className='board math';b.style.removeProperty('--n');
  const miss=()=>{lives--;if(!lives)return fin(0);next()};
  const next=()=>{do{A=ex();B=ex()}while(A.v===B.v);
    b.innerHTML='<div class="opts"><button class="opt" data-k="A" style="min-height:96px;font-size:30px">'+A.t+'</button><button class="opt" data-k="B" style="min-height:96px;font-size:30px">'+B.t+'</button></div><div class="prog" style="margin-top:16px"><i id="tb" style="width:100%;transition:width '+lim+'ms linear"></i></div>';
    info('Correct '+ok+'/'+need+' · Lives '+'♥'.repeat(lives));const tb=b.querySelector('#tb');setTimeout(()=>{if(tb)tb.style.width='0%'},30);
    clearTimeout(tm);tm=setTimeout(()=>{if(alive())miss()},lim)};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;clearTimeout(tm);if(o.dataset.k===(A.v>B.v?'A':'B')){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1);next()}else miss()};
  next()};
if(window.GK.boot)window.GK.boot();
})();
