(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.dots=({b,tier,rnd,info,fin,alive})=>{
  const L=Array(24).fill(0),B=Array(9).fill(0),H=(r,c)=>r*3+c,Vl=(r,c)=>12+r*4+c;let busy=false,done=false;
  const sides=k=>{const r=k/3|0,c=k%3;return[H(r,c),H(r+1,c),Vl(r,c),Vl(r,c+1)]},cnt=k=>sides(k).filter(i=>L[i]).length;
  const apply=(i,p)=>{L[i]=p;let got=0;for(let k=0;k<9;k++)if(!B[k]&&cnt(k)===4){B[k]=p;got++}return got},sc=p=>B.filter(v=>v===p).length;
  const gives=i=>{for(let k=0;k<9;k++)if(sides(k).includes(i)&&cnt(k)===2)return true;return false};
  b.className='board dab';b.style.removeProperty('--n');
  const draw=()=>{let h='';for(let r=0;r<7;r++)for(let c=0;c<7;c++){
      if(r%2===0&&c%2===0)h+='<i class="dt"></i>';
      else if(r%2===0){const id=H(r/2,(c-1)/2);h+='<button class="dl hz'+(L[id]?' on o'+L[id]:'')+'" data-i="'+id+'" aria-label="Wall"'+(L[id]?' disabled':'')+'></button>'}
      else if(c%2===0){const id=Vl((r-1)/2,c/2);h+='<button class="dl vt'+(L[id]?' on o'+L[id]:'')+'" data-i="'+id+'" aria-label="Wall"'+(L[id]?' disabled':'')+'></button>'}
      else{const k=((r-1)/2)*3+(c-1)/2;h+='<i class="bx2'+(B[k]?' o'+B[k]:'')+'"></i>'}}
    b.innerHTML=h;info('You '+sc(1)+' – '+sc(2)+' Rival · '+(busy?'Rival thinking…':'Your turn'))};
  const over=()=>{if(B.every(Boolean)){done=true;draw();const m=sc(1),a=sc(2);fin(m>a?(m-a>=5?3:m-a>=3?2:1):0);return true}return false};
  const ai=()=>{busy=true;draw();setTimeout(()=>{if(!alive())return;const free=L.map((v,i)=>v?-1:i).filter(i=>i>=0);
      const comp=free.filter(i=>{for(let k=0;k<9;k++)if(sides(k).includes(i)&&cnt(k)===3)return true;return false});let pick;
      if(comp.length&&(tier>=2||rnd()<.5))pick=comp[rnd()*comp.length|0];else{const safe=free.filter(i=>!gives(i));pick=(tier>=4&&safe.length)?safe[rnd()*safe.length|0]:free[rnd()*free.length|0]}
      const got=apply(pick,2);draw();if(over())return;if(got)ai();else{busy=false;draw()}},450)};
  b.onclick=e=>{const l=e.target.closest('.dl');if(!l||busy||done)return;const got=apply(+l.dataset.i,1);draw();if(over())return;if(!got)ai()};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
