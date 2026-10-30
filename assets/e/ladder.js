(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.ladder=({b,tier,rnd,info,fin})=>{
  const WD='cold cord card care core more mare male mile mild mind wind wine wire fire fine line lane land sand said sail tail tall ball bell belt bolt boat coat coal goal gold bold hold hole pole pale pile tile time tide ride rise rose nose note vote mole mold hill hall hail rail rain main mail nail pain paid pair hair hard herd head heal real read road load lead lend bend band bank tank talk walk wall will wild wide wise wish fish dish disk desk dusk duck dock rock sock sick pick pack back bark dark dare date gate game came cane cone bone bore bare barn burn turn torn born corn';
  const words=[...new Set(WD.split(' '))],adj=new Map(words.map(w=>[w,words.filter(x=>x!==w&&[...w].filter((c,i)=>c!==x[i]).length===1)]));
  const pick=()=>{let best=null;const want=Math.min(7,3+(tier>>1));
    for(let t=0;t<60;t++){const T=words[rnd()*words.length|0];if(adj.get(T).length<2)continue;const dist=new Map([[T,0]]),q=[T];for(let h=0;h<q.length;h++)for(const x of adj.get(q[h]))if(!dist.has(x)){dist.set(x,dist.get(q[h])+1);q.push(x)}
      const c=[...dist].filter(([w,d])=>d===want).map(a=>a[0]);if(c.length)return{T,dist,s:c[rnd()*c.length|0]};
      const m=Math.max(...dist.values());if(!best||m>best.m)best={T,dist,m,s:[...dist].find(a=>a[1]===m)[0]}}return best};
  const tg=pick(),T=tg.T,dist=tg.dist;let cur=tg.s,lives=3,opts,correct;
  b.className='board math';b.style.removeProperty('--n');
  const next=()=>{const nbrs=adj.get(cur),good=nbrs.filter(w=>dist.get(w)===dist.get(cur)-1);correct=good[rnd()*good.length|0];
    const bad=C.sh([...nbrs.filter(w=>!good.includes(w)),...C.sh(words.filter(w=>w!==cur&&!nbrs.includes(w)),rnd).slice(0,6)],rnd).slice(0,3);opts=C.sh([correct,...bad],rnd)};
  const draw=()=>{b.innerHTML='<div class="sc"><div><small>Now</small><b>'+cur.toUpperCase()+'</b></div><div class="die" style="font-size:36px">→</div><div><small>Goal</small><b class="gold">'+T.toUpperCase()+'</b></div></div><p class="tn">Change one letter to make a real word that gets closer.</p><div class="opts">'+opts.map((w,k)=>'<button class="opt" data-k="'+k+'" style="font-size:22px">'+w.toUpperCase()+'</button>').join('')+'</div>';info('Steps left '+dist.get(cur)+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;if(opts[+o.dataset.k]===correct){cur=correct;if(cur===T){draw();return fin(lives===3?3:lives===2?2:1)}next()}else{lives--;if(!lives)return fin(0)}draw()};
  next();draw()};
if(window.GK.boot)window.GK.boot();
})();
