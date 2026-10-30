(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.cards=({b,tier,rnd,info,fin})=>{
  const R=5,pool=()=>C.sh(Array.from({length:12},(_,i)=>i+1),rnd).slice(0,R),hand=pool(),aih=pool(),prize=C.sh([1,2,3,4,5],rnd);
  let r=0,me=0,ai=0,msg='Pick a card for the current prize.',done=false;const used=Array(R).fill(false),aiu=Array(R).fill(false);
  b.className='board math';b.style.removeProperty('--n');
  const aiPick=p=>{const av=aih.map((v,i)=>[v,i]).filter(([,i])=>!aiu[i]).sort((x,y)=>x[0]-y[0]);if(tier<4||rnd()<.15)return av[rnd()*av.length|0][1];
    const k=Math.round((p-1)/4*(av.length-1))+(rnd()<.3?(rnd()<.5?-1:1):0);return av[Math.max(0,Math.min(av.length-1,k))][1]};
  const draw=()=>{b.innerHTML='<div class="prizes">'+prize.map((p,i)=>'<span class="pz'+(i===r?' now':'')+(i<r?' past':'')+'">'+p+'</span>').join('')+'</div><p class="tn">'+msg+'</p><div class="pal">'+hand.map((v,i)=>'<button class="pc num cd" data-i="'+i+'"'+(used[i]||done?' disabled style="opacity:.25"':'')+'>'+v+'</button>').join('')+'</div>';info('Round '+Math.min(r+1,R)+'/'+R+' · You '+me+' – '+ai+' Rival')};
  b.onclick=e=>{const c=e.target.closest('.cd');if(!c||done||c.disabled)return;const i=+c.dataset.i,p=prize[r],j=aiPick(p),a=hand[i],z=aih[j];used[i]=true;aiu[j]=true;
    if(a>z){me+=p;msg='Your '+a+' beats '+z+': +'+p+' for you.'}else if(a<z){ai+=p;msg='Rival '+z+' beats your '+a+': +'+p+' for the rival.'}else msg='Both played '+a+': a tie, no points.';
    r++;if(r>=R){done=true;draw();return fin(me>ai?(me-ai>=7?3:me-ai>=3?2:1):0)}draw()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
