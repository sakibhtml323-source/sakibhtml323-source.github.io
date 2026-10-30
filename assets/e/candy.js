(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.candy=({b,tier,rnd,info,fin,alive})=>{
  const K=tier<6?3:4,H=[350,48,200,130],SY=['●','■','▲','◆'],need=8+tier,lim=Math.max(1200,3000-tier*150);let ok=0,lives=3,cur,tm;
  b.className='board math';b.style.removeProperty('--n');
  const col=k=>'hsl('+H[k]+',70%,55%)',miss=()=>{lives--;if(!lives)return fin(0);next()};
  const next=()=>{cur=rnd()*K|0;b.innerHTML='<div class="candy" style="background:'+col(cur)+'" data-k="'+cur+'">'+SY[cur]+'</div><div class="jars">'+Array.from({length:K},(_,k)=>'<button class="jar" data-k="'+k+'" style="border-color:'+col(k)+';color:'+col(k)+'" aria-label="Jar '+(k+1)+'">'+SY[k]+'</button>').join('')+'</div><div class="prog" style="margin-top:16px"><i id="tb" style="width:100%;transition:width '+lim+'ms linear"></i></div>';
    info('Sorted '+ok+'/'+need+' · Lives '+'♥'.repeat(lives));const tb=b.querySelector('#tb');setTimeout(()=>{if(tb)tb.style.width='0%'},30);clearTimeout(tm);tm=setTimeout(()=>{if(alive())miss()},lim)};
  b.onclick=e=>{const j=e.target.closest('.jar');if(!j)return;clearTimeout(tm);if(+j.dataset.k===cur){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1);next()}else miss()};
  next()};
if(window.GK.boot)window.GK.boot();
})();
