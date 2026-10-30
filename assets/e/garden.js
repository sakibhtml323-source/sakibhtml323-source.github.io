(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.garden=({b,tier,rnd,info,fin,alive})=>{
  const goal=12+tier*3,life=Math.max(1400,3200-tier*140),gap=Math.max(450,1100-tier*50),maxDry=2+(tier>5);let done=0,wither=0;const dry=new Map(),grow=Array(9).fill(0);
  b.className='board mole';b.style.setProperty('--n',3);
  b.innerHTML=Array.from({length:9},(_,i)=>'<button class="cell plot" data-i="'+i+'" aria-label="Plot '+(i+1)+'"></button>').join('');
  const upd=()=>info('Watered '+done+'/'+goal+' · Withered '+wither+'/4');
  const show=i=>{const c=b.children[i];if(!c)return;c.className='cell plot'+(dry.has(i)?' dry':'');c.textContent=dry.has(i)?'~':'•'.repeat(grow[i]%4)};
  const spawn=()=>{if(!alive())return;if(dry.size<maxDry){const f=[0,1,2,3,4,5,6,7,8].filter(i=>!dry.has(i)),i=f[rnd()*f.length|0];
      dry.set(i,setTimeout(()=>{if(!alive())return;dry.delete(i);wither++;grow[i]=0;show(i);upd();if(wither>=4)fin(0)},life));show(i)}setTimeout(spawn,gap)};
  b.onclick=e=>{const c=e.target.closest('.plot');if(!c)return;const i=+c.dataset.i;if(!dry.has(i))return;clearTimeout(dry.get(i));dry.delete(i);done++;grow[i]++;show(i);upd();if(done>=goal)fin(wither===0?3:wither<=1?2:1)};
  upd();spawn()};
if(window.GK.boot)window.GK.boot();
})();
