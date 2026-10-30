(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.picross=({b,tier,rnd,info,fin})=>{
  const n=tier<6?5:6,N=n*n,pic=Array.from({length:N},()=>rnd()<.55?1:0);if(!pic.some(v=>v))pic[0]=1;
  const runs=a=>{const r=[];let c=0;for(const v of a){if(v)c++;else if(c){r.push(c);c=0}}if(c)r.push(c);return r.length?r:[0]};
  const rowC=Array.from({length:n},(_,y)=>runs(pic.slice(y*n,y*n+n))),colC=Array.from({length:n},(_,x)=>runs(Array.from({length:n},(_,y)=>pic[y*n+x])));
  let g=Array(N).fill(0),moves=0,done=false;b.className='board pic';b.style.setProperty('--n',n+1);
  const ok=()=>rowC.every((c,y)=>runs(g.slice(y*n,y*n+n)).join()===c.join())&&colC.every((c,x)=>runs(Array.from({length:n},(_,y)=>g[y*n+x])).join()===c.join());
  const filled=pic.filter(Boolean).length;
  const draw=()=>{let h='<div class="clue"></div>'+colC.map(c=>'<div class="clue cc">'+c.join('<br>')+'</div>').join('');for(let y=0;y<n;y++){h+='<div class="clue rc">'+rowC[y].join(' ')+'</div>';for(let x=0;x<n;x++)h+='<button class="cell pxc'+(g[y*n+x]?' on':'')+'" data-i="'+(y*n+x)+'" aria-label="Square '+(y+1)+','+(x+1)+'"></button>'}b.innerHTML=h;info('Moves '+moves+' · Match every clue')};
  b.onclick=e=>{const c=e.target.closest('.pxc');if(!c||done)return;g[+c.dataset.i]^=1;moves++;draw();if(ok()){done=true;fin(moves<=filled+4?3:moves<=filled+12?2:1)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
