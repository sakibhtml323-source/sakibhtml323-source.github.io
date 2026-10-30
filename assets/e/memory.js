(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.memory=({b,tier,rnd,info,fin})=>{
  const pairs=Math.min(12,3+tier),sy=C.sh('♠♥♦♣★☾☀✿♪⚑❖✦☂♞⚓☘'.split(''),rnd).slice(0,pairs);
  const deck=C.sh([...sy,...sy],rnd),cols=Math.ceil(Math.sqrt(pairs*2));let open=[],lock=false,found=0,miss=0;
  b.className='board memory';b.style.setProperty('--n',cols);
  const draw=()=>{b.innerHTML=deck.map((s,i)=>{const o=open.includes(i),d=deck[i]===null;return'<button class="cell'+(o?' open':'')+(d?' done':'')+'" data-i="'+i+'" aria-label="Card '+(i+1)+'">'+(o||d?sol[i]:'?')+'</button>'}).join('');info('Pairs '+found+'/'+pairs+' · Mistakes '+miss)};
  const sol=deck.slice();
  b.onclick=e=>{const c=e.target.closest('.cell');if(!c||lock)return;const i=+c.dataset.i;if(open.includes(i)||deck[i]===null)return;open.push(i);
    if(open.length<2)return draw();
    const[a,d]=open;if(sol[a]===sol[d]){deck[a]=deck[d]=null;found++;open=[];draw();if(found===pairs)fin(miss<=pairs/2?3:miss<=pairs?2:1)}
    else{miss++;lock=true;draw();setTimeout(()=>{open=[];lock=false;draw()},750)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
