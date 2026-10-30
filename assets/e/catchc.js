(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.catchc=({b,tier,rnd,info,fin,alive})=>{
  const N=[['RED','#e0525c'],['BLUE','#4c8dff'],['GREEN','#4cc27a'],['GOLD','#D4AF37'],['PURPLE','#9b6bff']].slice(0,tier<6?4:5);
  const need=6+tier,lim=Math.max(1800,4500-tier*200);let ok=0,lives=3,ink,tm;
  b.className='board math';b.style.removeProperty('--n');
  const miss=()=>{lives--;if(!lives)return fin(0);next()};
  const next=()=>{const w=rnd()*N.length|0;let i=rnd()*N.length|0;if(i===w)i=(i+1)%N.length;ink=i;
    b.innerHTML='<div class="q" style="color:'+N[i][1]+'">'+N[w][0]+'</div><div class="opts" style="grid-template-columns:repeat('+(N.length>4?3:2)+',1fr)">'+N.map((n,k)=>'<button class="opt" data-k="'+k+'">'+n[0]+'</button>').join('')+'</div><div class="prog" style="margin-top:16px"><i id="tb" style="width:100%;transition:width '+lim+'ms linear"></i></div>';
    info('Correct '+ok+'/'+need+' · Lives '+'♥'.repeat(lives));const tb=b.querySelector('#tb');setTimeout(()=>{if(tb)tb.style.width='0%'},30);
    clearTimeout(tm);tm=setTimeout(()=>{if(alive())miss()},lim)};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;clearTimeout(tm);if(+o.dataset.k===ink){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1);next()}else miss()};
  next()};
if(window.GK.boot)window.GK.boot();
})();
