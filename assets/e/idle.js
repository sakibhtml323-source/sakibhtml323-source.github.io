(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.idle=({b,tier,info,fin,alive})=>{
  const T=40,goal=300+tier*95;let coins=0,p=1,auto=0,t0=0,iv,earned=0;const n={a:0,h:0,f:0};
  const U=[['a','Stronger tap','+1 per tap',()=>Math.ceil(10*1.5**n.a),()=>{p++}],['h','Helper','+2 per second',()=>Math.ceil(25*1.6**n.h),()=>{auto+=2}],['f','Workshop','+16 per second',()=>Math.ceil(200*1.8**n.f),()=>{auto+=16}]];
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<button class="tapbig" id="tp">TAP</button><div class="prog" style="margin:14px 0;height:10px"><i id="tb" style="width:100%"></i></div><div class="opts" style="grid-template-columns:1fr">'+U.map(u=>'<button class="opt up" data-u="'+u[0]+'" style="min-height:64px;font-size:16px"></button>').join('')+'</div>';
  const left=()=>Math.max(0,T-(performance.now()-t0)/1000);
  const ref=()=>{b.querySelector('#tp').textContent='TAP +'+p;[...b.querySelectorAll('.up')].forEach((el,i)=>{const c=U[i][3]();el.textContent=U[i][1]+' · '+U[i][2]+' · cost '+c;el.disabled=coins<c});
    info('Earned '+Math.floor(earned)+'/'+goal+' · Coins '+Math.floor(coins)+(t0?' · '+left().toFixed(0)+'s':' · tap to start'))};
  const win=()=>{clearInterval(iv);const l=left();fin(l>=T*.4?3:l>=T*.15?2:1)};
  const start=()=>{if(t0)return;t0=performance.now();iv=setInterval(()=>{if(!alive()){clearInterval(iv);return}const g=auto*.1;coins+=g;earned+=g;b.querySelector('#tb').style.width=left()/T*100+'%';ref();
    if(earned>=goal)win();else if(left()<=0){clearInterval(iv);fin(0)}},100)};
  b.onclick=e=>{if(!alive())return;
    if(e.target.closest('#tp')){start();coins+=p;earned+=p;ref();if(earned>=goal)win();return}
    const o=e.target.closest('.up');if(o&&!o.disabled){start();const u=U.find(x=>x[0]===o.dataset.u),c=u[3]();if(coins>=c){coins-=c;n[u[0]]++;u[4]();ref()}}};
  ref()};
if(window.GK.boot)window.GK.boot();
})();
