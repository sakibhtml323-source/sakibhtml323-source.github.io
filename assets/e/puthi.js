(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.puthi=({b,tier,rnd,info,fin})=>{
  const WL='river lotus hilsa boat paddy jute mango tiger delta kite rice folk song drum sweet'.split(' '),n=tier<5?7:8,N=n*n,K=4+(tier>>2);let g,words;
  for(let tries=0;tries<300;tries++){g=Array(N).fill('');words=C.sh(WL.slice(),rnd).slice(0,K);let ok=true;
    for(const w of words){let placed=false;for(let t=0;t<80&&!placed;t++){const h=rnd()<.5,x=rnd()*(n-(h?w.length-1:0))|0,y=rnd()*(n-(h?0:w.length-1))|0,cells=[...w].map((_,i)=>h?y*n+x+i:(y+i)*n+x);
        if(cells.every((c,i)=>!g[c]||g[c]===w[i])){cells.forEach((c,i)=>{g[c]=w[i]});placed=true}}if(!placed){ok=false;break}}
    if(ok)break}
  const AB='abcdefghijklmnopqrstuvwxyz';g=g.map(c=>c||AB[rnd()*26|0]);
  const found=new Set(),fcells=new Set();let sel=-1,wrong=0;b.className='board puth';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=g.map((c,i)=>'<button class="cell wsx'+(i===sel?' sel':'')+(fcells.has(i)?' fd':'')+'" data-i="'+i+'" aria-label="Letter '+c+'">'+c.toUpperCase()+'</button>').join('')+'<div class="words" style="grid-column:1/-1">'+words.map(w=>'<span class="wd'+(found.has(w)?' fd':'')+'">'+w+'</span>').join('')+'</div>';info('Found '+found.size+'/'+K+' · Wrong tries '+wrong)};
  b.onclick=e=>{const c=e.target.closest('.wsx');if(!c)return;const i=+c.dataset.i;if(sel<0){sel=i;return draw()}
    const a=sel;sel=-1;const ax=a%n,ay=a/n|0,bx=i%n,by=i/n|0;let ok=false;
    if(a!==i&&(ax===bx||ay===by)){const len=Math.max(Math.abs(ax-bx),Math.abs(ay-by))+1,sx=Math.sign(bx-ax),sy=Math.sign(by-ay),cells=Array.from({length:len},(_,k)=>(ay+sy*k)*n+ax+sx*k),s=cells.map(q=>g[q]).join(''),r=[...s].reverse().join('');
      const w=words.find(x=>!found.has(x)&&(x===s||x===r));if(w){found.add(w);cells.forEach(q=>fcells.add(q));ok=true}}
    if(!ok)wrong++;draw();if(found.size>=K)fin(wrong===0?3:wrong<=3?2:1)};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
