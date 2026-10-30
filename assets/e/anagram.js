(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.anagram=({b,tier,rnd,info,fin})=>{
  const WORDS={4:'gold moon star wind rain leaf fire lake rock sand tree wave'.split(' '),5:'river cloud flame stone pearl tiger green music dance light night storm'.split(' '),6:'garden silver planet forest bridge island winter summer spring golden candle flower'.split(' '),7:'mystery diamond journey rainbow thunder whisper harvest monsoon kingdom sunrise'.split(' '),8:'mountain treasure sunshine sunlight daylight building elephant notebook'.split(' ')};
  const len=4+Math.min(4,(tier-1)>>1),need=4+(tier>>2);let ok=0,lives=3,w,L,used=[];
  b.className='board math';b.style.removeProperty('--n');
  const make=()=>{const l=WORDS[len];w=l[rnd()*l.length|0];do{L=C.sh(w.split(''),rnd)}while(L.join('')===w);used=[]};
  const draw=()=>{b.innerHTML='<div class="hrow" style="margin-bottom:16px">'+Array.from({length:len},(_,i)=>used[i]!==undefined?'<i class="dot" style="background:#3a3120;color:#F3E2A9;font-size:20px">'+L[used[i]].toUpperCase()+'</i>':'<i class="dot empty"></i>').join('')+'</div><div class="pal">'+L.map((c,i)=>'<button class="pc num" data-i="'+i+'"'+(used.includes(i)?' disabled style="opacity:.25"':'')+'>'+c.toUpperCase()+'</button>').join('')+'</div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn sec" data-a="clr">Clear</button></div>';info('Words '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const p=e.target.closest('.pc'),a=e.target.closest('[data-a]');
    if(a){used=[];return draw()}
    if(p&&!p.disabled){used.push(+p.dataset.i);
      if(used.length===len){if(used.map(i=>L[i]).join('')===w){ok++;if(ok>=need){draw();return fin(lives===3?3:lives===2?2:1)}make()}else{lives--;if(!lives)return fin(0);used=[]}}
      draw()}};
  make();draw()};
if(window.GK.boot)window.GK.boot();
})();
