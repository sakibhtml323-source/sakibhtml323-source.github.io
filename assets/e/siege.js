(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.siege=({b,tier,rnd,info,fin,alive})=>{
  const U=['Archers','Cavalry','Spearmen'],beats=(a,c)=>(a===2&&c===1)||(a===1&&c===0)||(a===0&&c===2);
  const me=[3,3,3],ai=[3,3,3],used=[0,0,0];let w=0,l=0,r=0,msg='Choose a unit type.',done=false;b.className='board math';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="sc"><div><small>You</small><b>'+w+'</b></div><div><small>Round '+Math.min(r+1,9)+'/9</small><b class="gold" style="font-size:22px">'+(done?'Done':'Fight')+'</b></div><div><small>Rival</small><b>'+l+'</b></div></div><p class="tn">'+msg+'</p><div class="opts" style="grid-template-columns:repeat(3,1fr)">'+U.map((n,i)=>'<button class="opt uni" data-u="'+i+'"'+(me[i]?'':' disabled')+' style="font-size:15px;min-height:76px">'+n+'<br><small>'+me[i]+' left</small></button>').join('')+'</div>';info('Archers beat spearmen · Spearmen beat cavalry · Cavalry beat archers')};
  b.onclick=e=>{const u=e.target.closest('.uni');if(!u||u.disabled||done)return;const a=+u.dataset.u;
    let av=[0,1,2].filter(i=>ai[i]);let c;if(tier>=4&&rnd()<.7){const pm=used.indexOf(Math.max(...used)),ctr=[0,1,2].find(i=>beats(i,pm));c=av.includes(ctr)?ctr:av[rnd()*av.length|0]}else c=av[rnd()*av.length|0];
    me[a]--;ai[c]--;used[a]++;r++;
    if(beats(a,c)){w++;msg=U[a]+' beat '+U[c]+'.'}else if(beats(c,a)){l++;msg=U[c]+' beat your '+U[a]+'.'}else msg='Both sent '+U[a]+': a draw.';
    if(r>=9){done=true;draw();return fin(w>l?(w-l>=3?3:w-l>=2?2:1):0)}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
