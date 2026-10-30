(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.estimate=({b,tier,rnd,info,fin,alive})=>{
  const need=5+(tier>>1),show=Math.max(500,1500-tier*80);let ok=0,lives=3,ans,opts;
  b.className='board math';b.style.removeProperty('--n');
  const round=()=>{if(!alive())return;ans=8+tier*4+(rnd()*8|0);const step=Math.max(3,Math.ceil(ans*(.36-tier*.02)));
    const set=new Set([ans,ans+step,ans-step,ans+2*step*(rnd()>.5?1:-1)]);while(set.size<4)set.add(ans+step*(set.size+2));opts=C.sh([...set].filter(v=>v>0),rnd);
    const cells=C.sh(Array.from({length:96},(_,i)=>i),rnd).slice(0,ans);
    b.innerHTML='<div class="edbox">'+cells.map(c=>'<i class="ed" style="left:'+((((c%12)+.5+(rnd()-.5)*.6)/12)*100).toFixed(1)+'%;top:'+((((c/12|0)+.5+(rnd()-.5)*.6)/8)*100).toFixed(1)+'%"></i>').join('')+'</div>';info('Memorise the dots…');
    setTimeout(()=>{if(!alive())return;b.innerHTML='<div class="q" style="font-size:30px">How many dots?</div><div class="opts">'+opts.map(v=>'<button class="opt" data-v="'+v+'">'+v+'</button>').join('')+'</div>';info('Correct '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))},show)};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;if(+o.dataset.v===ans){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1)}else{lives--;if(!lives)return fin(0)}round()};
  round()};
if(window.GK.boot)window.GK.boot();
})();
