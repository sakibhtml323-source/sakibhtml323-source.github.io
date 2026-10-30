(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.domino=({b,tier,rnd,info,fin})=>{
  const V=3+(tier>3)+(tier>7),P=5+(tier>>2);let v=rnd()*V|0;const ps=[];for(let i=0;i<P;i++){const w=rnd()*V|0;ps.push([v,w]);v=w}
  const tray=C.sh(ps.map(p=>rnd()<.5?p:[p[1],p[0]]),rnd).map((p,i)=>({p,i}));let chain=[],mist=0,done=false;
  b.className='board math';b.style.removeProperty('--n');
  const Lv=()=>chain.length?chain[0].q[0]:null,Rv=()=>chain.length?chain[chain.length-1].q[1]:null;
  const piece=(q,cls,att)=>'<button class="dom '+cls+'" '+att+'><i>'+q[0]+'</i><i>'+q[1]+'</i></button>';
  const draw=()=>{const used=new Set(chain.map(c=>c.i));b.innerHTML='<div class="chainrow">'+(chain.length?chain.map(c=>piece(c.q,'ch','disabled')).join(''):'<span class="mu">Build your chain here</span>')+'</div><div class="row" style="justify-content:center;margin:12px 0">'+tray.filter(t=>!used.has(t.i)).map(t=>piece(t.p,'tp','data-i="'+t.i+'" data-a="'+t.p[0]+'" data-b="'+t.p[1]+'"')).join('')+'</div><div class="row" style="justify-content:center"><button class="btn sec" data-u="1">Undo last</button></div>';info('Placed '+chain.length+'/'+P+' · Mistakes '+mist)};
  b.onclick=e=>{if(done)return;if(e.target.closest('[data-u]')){chain.pop();return draw()}
    const t=e.target.closest('.tp');if(!t)return;const i=+t.dataset.i,p=tray.find(x=>x.i===i).p;
    if(!chain.length)chain.push({i,q:p});
    else if(p[0]===Rv())chain.push({i,q:p});else if(p[1]===Rv())chain.push({i,q:[p[1],p[0]]});
    else if(p[1]===Lv())chain.unshift({i,q:p});else if(p[0]===Lv())chain.unshift({i,q:[p[1],p[0]]});
    else{mist++;return draw()}
    draw();if(chain.length===P){done=true;fin(mist===0?3:mist<=2?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
