(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.island=({b,tier,rnd,info,fin})=>{
  const n=5,N=25,K=3+(tier>>2),v=Array.from({length:N},()=>1+(rnd()*9|0));
  const nb=i=>{const x=i%n,y=i/n|0,r=[];if(x>0)r.push(i-1);if(x<n-1)r.push(i+1);if(y>0)r.push(i-n);if(y<n-1)r.push(i+n);return r};
  let best=0;const go=(st,cnt,sum,ch)=>{if(cnt===K){best=Math.max(best,sum);return}for(let i=st;i<N;i++){if(ch.some(j=>nb(i).includes(j)))continue;ch.push(i);go(i+1,cnt+1,sum+v[i],ch);ch.pop()}};go(0,0,0,[]);
  const T=Math.min(best,Math.ceil(best*(.8+Math.min(.2,tier*.017))));let sel=[];b.className='board isl';b.style.setProperty('--n',n);
  const sum=()=>sel.reduce((a,i)=>a+v[i],0);
  const draw=()=>{b.innerHTML=v.map((x,i)=>'<button class="cell il'+(sel.includes(i)?' on':'')+'" data-i="'+i+'" data-v="'+x+'" aria-label="Tile '+(i+1)+', value '+x+'">'+x+'</button>').join('');info('Settlements '+sel.length+'/'+K+' · Score '+sum()+' / '+T+' · No two may touch')};
  b.onclick=e=>{const c=e.target.closest('.il');if(!c)return;const i=+c.dataset.i;
    if(sel.includes(i))sel=sel.filter(x=>x!==i);else if(sel.length<K&&!sel.some(j=>nb(i).includes(j)))sel.push(i);
    draw();if(sel.length===K&&sum()>=T)fin(sum()>=best?3:sum()>=best*.9?2:1)};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
