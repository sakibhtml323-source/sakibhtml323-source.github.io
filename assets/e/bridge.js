(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.bridge=({b,tier,rnd,info,fin})=>{
  const M=5+(tier>>2),pl=Array.from({length:M},()=>2+(rnd()*(7+(tier>>1))|0)),idx=C.sh([...pl.keys()],rnd).slice(0,2+(tier>>2)),G=idx.reduce((a,i)=>a+pl[i],0);let sel=new Set(),lives=3;
  b.className='board math';b.style.removeProperty('--n');
  const sum=()=>[...sel].reduce((a,i)=>a+pl[i],0);
  const draw=()=>{b.innerHTML='<div class="gapbar"><span>Gap: <b class="gold">'+G+'</b></span><span>Bridge: <b>'+sum()+'</b></span></div><div class="row" style="justify-content:center;margin:14px 0">'+pl.map((v,i)=>'<button class="plk'+(sel.has(i)?' on':'')+'" data-i="'+i+'" data-v="'+v+'" style="width:'+(28+v*8)+'px">'+v+'</button>').join('')+'</div><div class="row" style="justify-content:center"><button class="btn pri" data-t="1">Test bridge</button></div>';info('Planks must add up to exactly '+G+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const p=e.target.closest('.plk'),t=e.target.closest('[data-t]');if(p){const i=+p.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);return draw()}
    if(t){if(sum()===G)return fin(lives===3?3:lives===2?2:1);lives--;if(!lives)return fin(0);info('The bridge collapsed! Lives '+'♥'.repeat(lives))}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
