(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.shadow=({b,tier,rnd,info,fin})=>{
  const need=5+(tier>>1),K=Math.min(9,5+(tier>>1)),rot=a=>{const o=Array(16).fill(0);for(let y=0;y<4;y++)for(let x=0;x<4;x++)o[x*4+(3-y)]=a[y*4+x];return o};
  const canon=a=>{let r=a,best=null;for(let i=0;i<4;i++){const s=r.join('');if(best===null||s<best)best=s;r=rot(r)}return best};
  let ok=0,lives=3,tgt,opts,ans;
  const mk=()=>{const a=Array(16).fill(0);C.sh([...Array(16).keys()],rnd).slice(0,K).forEach(i=>{a[i]=1});return a};
  const grid=a=>'<span class="mg">'+a.map(v=>'<i'+(v?' class="f"':'')+'></i>').join('')+'</span>';
  const draw=()=>{b.innerHTML='<p class="mu" style="text-align:center;margin:0 0 8px">Which pattern is the same shape, only rotated?</p><div style="display:flex;justify-content:center;margin-bottom:14px">'+grid(tgt).replace('class="mg"','class="mg big"')+'</div><div class="opts">'+opts.map((o,k)=>'<button class="opt" data-k="'+k+'" aria-label="Option '+(k+1)+'">'+grid(o)+'</button>').join('')+'</div>';info('Solved '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))};
  const round=()=>{tgt=mk();const set=new Set([canon(tgt)]);let right=tgt;for(let i=0,r=1+(rnd()*3|0);i<r;i++)right=rot(right);const list=[right];
    while(list.length<4){const d=mk();if(!set.has(canon(d))){set.add(canon(d));list.push(d)}}
    const order=C.sh([0,1,2,3],rnd);opts=order.map(i=>list[i]);ans=order.indexOf(0);draw()};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;if(+o.dataset.k===ans){ok++;if(ok>=need)return fin(lives===3?3:lives===2?2:1)}else{lives--;if(!lives)return fin(0)}round()};
  b.className='board math';b.style.removeProperty('--n');round()};
if(window.GK.boot)window.GK.boot();
})();
