(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.lane=({b,tier,rnd,info,fin,alive})=>{
  const R=4,Cn=8,total=8+tier*3,hp0=3+(tier>>2),spd=.35+tier*.03,gap=Math.max(1.6,3.2-tier*.14),cost=20;
  let coins=60,lives=3,spawned=0,killed=0,cd=1.5;const df=Array(R*Cn).fill(null),en=[];
  b.className='board laned';b.style.removeProperty('--n');
  b.innerHTML='<div class="lg" style="--n:'+Cn+'">'+Array.from({length:R*Cn},(_,i)=>'<button class="cell lc" data-i="'+i+'" aria-label="Lane '+((i/Cn|0)+1)+' column '+(i%Cn+1)+'"></button>').join('')+'</div><p class="mu" style="text-align:center;margin:10px 0 0">Tap a square to place a defender (cost '+cost+')</p>';
  const cells=[...b.querySelectorAll('.lc')];
  const draw=()=>{cells.forEach((c,i)=>{const l=i/Cn|0,e=en.filter(z=>z.l===l&&Math.floor(z.x)===i%Cn);c.className='cell lc'+(df[i]?' df':'')+(e.length?' en':'');c.textContent=(df[i]?'♜':'')+(e.length?'●'+e.map(z=>z.hp).join(','):'')});
    info('Coins '+Math.floor(coins)+' · Lives '+'♥'.repeat(lives)+' · Defeated '+killed+'/'+total)};
  b.onclick=e=>{const c=e.target.closest('.lc');if(!c)return;const i=+c.dataset.i;if(!df[i]&&coins>=cost){coins-=cost;df[i]={cd:0,hp:3}}};
  loop(alive,dt=>{coins+=5*dt;cd-=dt;
    if(cd<=0&&spawned<total){en.push({l:rnd()*R|0,x:Cn-.01,hp:hp0});spawned++;cd=gap*(.7+rnd()*.6)}
    df.forEach((d,i)=>{if(!d)return;const l=i/Cn|0,c=i%Cn;d.cd-=dt;if(d.cd>0)return;let t=null;for(const z of en)if(z.l===l&&z.x>=c&&(!t||z.x<t.x))t=z;if(t){t.hp--;d.cd=.9;if(t.hp<=0){en.splice(en.indexOf(t),1);killed++}}});
    for(let k=en.length-1;k>=0;k--){const z=en[k],i=z.l*Cn+Math.floor(z.x),d=df[i];
      if(d){d.hp-=dt;if(d.hp<=0)df[i]=null}else z.x-=spd*dt;
      if(z.x<=0){en.splice(k,1);lives--;if(!lives)return fin(0)}}
    draw();if(killed>=total)fin(lives===3?3:lives===2?2:1)})};
if(window.GK.boot)window.GK.boot();
})();
