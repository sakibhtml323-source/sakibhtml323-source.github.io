(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.blocks=({b,tier,rnd,info,fin})=>{
  const n=6,N=36,L=3+(tier>>1),SH=[[[0,0]],[[0,0],[1,0]],[[0,0],[0,1]],[[0,0],[1,0],[2,0]],[[0,0],[0,1],[0,2]],[[0,0],[1,0],[0,1],[1,1]],[[0,0],[1,0],[0,1]]];
  let g=Array(N).fill(0),tray=[],sel=-1,lines=0,placed=0,done=false;
  const newTray=()=>{tray=[0,1,2].map(()=>rnd()*SH.length|0);sel=-1};
  const fits=(s,p)=>{const x0=p%n,y0=p/n|0;return SH[s].every(([dx,dy])=>{const x=x0+dx,y=y0+dy;return x<n&&y<n&&!g[y*n+x]})};
  const any=()=>tray.some(s=>s>=0&&[...Array(N).keys()].some(p=>fits(s,p)));
  const shape=s=>{const w=Math.max(...SH[s].map(p=>p[0]))+1,h=Math.max(...SH[s].map(p=>p[1]))+1;let o='<span class="ms" style="grid-template-columns:repeat('+w+',10px)">';for(let y=0;y<h;y++)for(let x=0;x<w;x++)o+='<i'+(SH[s].some(p=>p[0]===x&&p[1]===y)?' class="f"':'')+'></i>';return o+'</span>'};
  newTray();b.className='board blk';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=g.map((v,i)=>'<button class="cell bf'+(v?' on':'')+'" data-i="'+i+'" aria-label="Square '+(i+1)+'"></button>').join('')+'<div class="tray" style="grid-column:1/-1">'+tray.map((s,k)=>s<0?'<span class="pcs"></span>':'<button class="pcs'+(k===sel?' sel':'')+'" data-k="'+k+'" aria-label="Piece '+(k+1)+'">'+shape(s)+'</button>').join('')+'</div>';info('Lines '+lines+'/'+L+' · Tap a piece, then a square')};
  b.onclick=e=>{if(done)return;const pk=e.target.closest('.pcs[data-k]'),c=e.target.closest('.bf');
    if(pk){sel=+pk.dataset.k;return draw()}
    if(c&&sel>=0){const p=+c.dataset.i,s=tray[sel];if(!fits(s,p))return;const x0=p%n,y0=p/n|0;SH[s].forEach(([dx,dy])=>{g[(y0+dy)*n+x0+dx]=1});tray[sel]=-1;sel=-1;placed++;
      let cl=0;const full=[];for(let y=0;y<n;y++)if([...Array(n).keys()].every(x=>g[y*n+x])){full.push(...[...Array(n).keys()].map(x=>y*n+x));cl++}
      for(let x=0;x<n;x++)if([...Array(n).keys()].every(y=>g[y*n+x])){full.push(...[...Array(n).keys()].map(y=>y*n+x));cl++}
      full.forEach(i=>{g[i]=0});lines+=cl;
      if(lines>=L){done=true;draw();return fin(placed<=L*4?3:placed<=L*6?2:1)}
      if(tray.every(v=>v<0))newTray();if(!any()){done=true;draw();return fin(0)}draw()}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
