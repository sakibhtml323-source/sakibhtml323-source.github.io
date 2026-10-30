(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.flood=({b,tier,rnd,info,fin})=>{
  const n=5+Math.min(4,tier>>1),K=4+(tier>4)+(tier>8);let g=Array.from({length:n*n},()=>rnd()*K|0),moves=0,done=false;
  const nbs=i=>{const x=i%n,y=i/n|0,r=[];if(x>0)r.push(i-1);if(x<n-1)r.push(i+1);if(y>0)r.push(i-n);if(y<n-1)r.push(i+n);return r};
  const comp=a=>{const c=a[0],s=new Set([0]),st=[0];while(st.length){const i=st.pop();nbs(i).forEach(j=>{if(!s.has(j)&&a[j]===c){s.add(j);st.push(j)}})}return s};
  const fill=(a,c)=>{const s=comp(a),o=a.slice();s.forEach(i=>{o[i]=c});return o};
  let t=g.slice(),par=0;while(!t.every(v=>v===t[0])&&par<200){let best=-1,bc=0;for(let c=0;c<K;c++){if(c===t[0])continue;const z=comp(fill(t,c)).size;if(z>best){best=z;bc=c}}t=fill(t,bc);par++}
  const limit=par+2;b.className='board flood';b.style.setProperty('--n',n);
  const draw=()=>{b.innerHTML=g.map(v=>'<div class="fc" style="background:'+hue(v)+'"></div>').join('')+'<div class="pal" style="grid-column:1/-1;margin-top:10px">'+Array.from({length:K},(_,i)=>'<button class="pc" data-c="'+i+'" aria-label="Colour '+(i+1)+'" style="background:'+hue(i)+'">'+(i+1)+'</button>').join('')+'</div>';info('Moves '+moves+'/'+limit)};
  b.onclick=e=>{const c=e.target.closest('[data-c]');if(!c||done)return;const v=+c.dataset.c;if(v===g[0])return;g=fill(g,v);moves++;draw();
    if(g.every(x=>x===g[0])){done=true;fin(moves<=par?3:moves<=par+1?2:1)}else if(moves>=limit){done=true;fin(0)}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
