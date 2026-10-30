(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.nim=({b,tier,rnd,info,fin,alive})=>{
  const P=3+(tier>5);let piles;do{piles=Array.from({length:P},()=>2+(rnd()*(4+(tier>>1))|0))}while(piles.reduce((a,v)=>a^v,0)===0);
  let moves=0,busy=false,done=false,msg='Tap a stone to remove it and every stone above it.';b.className='board nim';b.style.setProperty('--n',P);
  const draw=()=>{b.innerHTML=piles.map((p,i)=>'<div class="pile">'+Array.from({length:p},(_,k)=>'<button class="stn" data-p="'+i+'" data-k="'+k+'" aria-label="Pile '+(i+1)+', stone '+(k+1)+'"></button>').join('')+'</div>').join('')+'<p class="tn" style="grid-column:1/-1">'+msg+'</p>';info('Whoever takes the last stone wins')};
  const aiMove=()=>{busy=true;msg='Rival is thinking…';draw();setTimeout(()=>{if(!alive())return;const x=piles.reduce((a,v)=>a^v,0),opt=tier>=9||(tier>=4&&rnd()<.6);let i,k;
      if(opt&&x){i=piles.findIndex(p=>(p^x)<p);k=piles[i]^x}else{const ne=piles.map((p,j)=>p?j:-1).filter(j=>j>=0);i=ne[rnd()*ne.length|0];k=rnd()*piles[i]|0}
      piles[i]=k;msg='Rival left '+k+' in pile '+(i+1)+'.';if(piles.every(p=>!p)){done=true;draw();return fin(0)}busy=false;draw()},500)};
  b.onclick=e=>{const s=e.target.closest('.stn');if(!s||busy||done)return;piles[+s.dataset.p]=+s.dataset.k;moves++;
    if(piles.every(p=>!p)){done=true;msg='You took the last stone!';draw();return fin(moves<=4?3:moves<=6?2:1)}aiMove()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
