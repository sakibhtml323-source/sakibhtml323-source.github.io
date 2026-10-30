(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.city=({b,tier,rnd,info,fin})=>{
  const n=5,N=25,TY=['H','P','M','F'],PL=10;
  const nb=i=>{const x=i%n,y=i/n|0,r=[];if(x>0)r.push(i-1);if(x<n-1)r.push(i+1);if(y>0)r.push(i-n);if(y<n-1)r.push(i+n);return r};
  const score=g=>{let s=0;g.forEach((t,i)=>{if(t==='H'){s+=4;nb(i).forEach(j=>{if(g[j]==='P')s+=3;else if(g[j]==='M')s+=2;else if(g[j]==='F')s-=3})}else if(t==='P')s+=1;else if(t==='M')s+=2;else if(t==='F')s+=6});return s};
  const climb=r=>{let best=-1e9;for(let rs=0;rs<4;rs++){let g=Array(N).fill('');C.sh([...Array(N).keys()],r).slice(0,PL).forEach(i=>{g[i]=TY[r()*4|0]});let cur=score(g);
      for(let it=0;it<2500;it++){const i=r()*N|0,j=r()*N|0,h=g.slice();if(r()<.5){if(!h[i])continue;h[i]=TY[r()*4|0]}else{if(!h[i]||h[j])continue;h[j]=h[i];h[i]=''}const s=score(h);if(s>=cur){g=h;cur=s}}best=Math.max(best,cur)}return best};
  const best=climb(rnd),T=Math.round(best*(.55+Math.min(.4,tier*.035)));
  let g=Array(N).fill(''),sel='H',left=PL,done=false;b.className='board city';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=g.map((t,i)=>'<button class="cell cb'+(t?' b'+t:'')+'" data-i="'+i+'" aria-label="Plot '+(i+1)+(t?', '+t:'')+'">'+t+'</button>').join('')+'<div class="pal" style="grid-column:1/-1;margin-top:10px">'+TY.map(t=>'<button class="pc num tp2'+(t===sel?' on':'')+'" data-t="'+t+'" aria-label="'+{H:'House',P:'Park',M:'Market',F:'Factory'}[t]+'">'+t+'</button>').join('')+'</div><p class="mu" style="grid-column:1/-1;text-align:center;margin:8px 0 0">H house · P park · M market · F factory</p>';info('Score '+score(g)+' / '+T+' · Buildings left '+left)};
  b.onclick=e=>{if(done)return;const p=e.target.closest('.tp2'),c=e.target.closest('.cb');if(p){sel=p.dataset.t;return draw()}
    if(c){const i=+c.dataset.i;if(g[i]){g[i]='';left++}else if(left>0){g[i]=sel;left--}draw();if(left===0&&score(g)>=T){done=true;const s=score(g);fin(s>=T*1.25?3:s>=T*1.1?2:1)}}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
