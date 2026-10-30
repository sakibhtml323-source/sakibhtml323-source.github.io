(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.math=({b,tier,rnd,info,fin})=>{
  const need=6+tier;let ok=0,bad=0,lives=3,q;const R=m=>1+(rnd()*m|0);
  const make=()=>{const m=6+tier*4,ops=tier<3?['+','-']:tier<6?['+','-','×']:['+','-','×','÷'],o=ops[rnd()*ops.length|0];let a=R(m),c=R(m),ans;
    if(o==='+')ans=a+c;else if(o==='-'){if(c>a)[a,c]=[c,a];ans=a-c}else if(o==='×'){a=R(3+tier);c=R(3+tier);ans=a*c}else{c=R(2+tier);ans=R(5+tier);a=c*ans}
    const opts=new Set([ans]);while(opts.size<4){const v=ans+R(5)*(rnd()>.5?1:-1);if(v>=0)opts.add(v)}
    return{t:a+' '+o+' '+c,ans,opts:C.sh([...opts],rnd)}};
  b.className='board math';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="q">'+q.t+' = ?</div><div class="opts">'+q.opts.map(v=>'<button class="opt" data-v="'+v+'">'+v+'</button>').join('')+'</div>';info('Solved '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;if(+o.dataset.v===q.ans)ok++;else{bad++;lives--}
    if(!lives)return fin(0);if(ok>=need)return fin(bad===0?3:bad===1?2:1);q=make();draw()};
  q=make();draw()};
if(window.GK.boot)window.GK.boot();
})();
