(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.spot=({b,tier,rnd,info,fin})=>{
  const n=4+Math.min(2,tier>>2),N=n*n,D=Math.min(Math.floor(N/3),3+(tier>>1)),GL='●■▲◆★♥';let lives=3;const found=new Set();
  const A=Array.from({length:N},()=>[rnd()*6|0,rnd()*6|0]),Bg=A.map(v=>v.slice()),diff=new Set(C.sh([...Array(N).keys()],rnd).slice(0,D));
  diff.forEach(i=>{const t=rnd()<.5?0:1;Bg[i][t]=(Bg[i][t]+1+(rnd()*5|0))%6});
  b.className='board spot';b.style.setProperty('--n',2);
  const cell=(v,i,k,cls)=>'<button class="cell sc2'+cls+'" data-i="'+i+'" data-k="'+k+'" style="color:hsl('+(v[1]*60+20)+',70%,60%)">'+GL[v[0]]+'</button>';
  const draw=()=>{b.innerHTML='<div class="sp2" style="--n:'+n+'">'+A.map((v,i)=>cell(v,i,'a','')).join('')+'</div><div class="sp2" style="--n:'+n+'">'+Bg.map((v,i)=>cell(v,i,'b',found.has(i)?' ok':'')).join('')+'</div>';info('Found '+found.size+'/'+D+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const c=e.target.closest('.sc2');if(!c||c.dataset.k!=='b')return;const i=+c.dataset.i;if(found.has(i))return;
    if(diff.has(i)){found.add(i);draw();if(found.size>=D)fin(lives===3?3:lives===2?2:1)}else{lives--;draw();if(!lives)fin(0)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
