(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.fusion=({b,tier,rnd,info,fin})=>{
  const W6='garden silver planet forest bridge island winter summer spring golden candle flower'.split(' '),W8='mountain treasure sunshine sunlight daylight building elephant notebook'.split(' ');
  const pool=tier<6?W6:W8,need=4+(tier>>2);let ok=0,lives=3,w,fr,used=[];
  const make=()=>{w=pool[rnd()*pool.length|0];const f=w.match(/../g);do{fr=C.sh(f.slice(),rnd)}while(fr.join('')===w);used=[]};
  b.className='board math';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="hrow" style="margin-bottom:16px;font-size:26px;letter-spacing:2px;min-height:46px">'+(used.length?used.map(i=>fr[i].toUpperCase()).join(' '):'<span class="mu" style="font-size:16px">Tap the pieces in order</span>')+'</div><div class="pal">'+fr.map((f,i)=>'<button class="frag" data-i="'+i+'"'+(used.includes(i)?' disabled':'')+'>'+f.toUpperCase()+'</button>').join('')+'</div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn sec" data-a="clr">Clear</button></div>';info('Words '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const f=e.target.closest('.frag'),a=e.target.closest('[data-a]');if(a){used=[];return draw()}
    if(f&&!f.disabled){used.push(+f.dataset.i);if(used.length===fr.length){if(used.map(i=>fr[i]).join('')===w){ok++;if(ok>=need){draw();return fin(lives===3?3:lives===2?2:1)}make()}else{lives--;if(!lives)return fin(0);used=[]}}draw()}};
  make();draw()};
if(window.GK.boot)window.GK.boot();
})();
