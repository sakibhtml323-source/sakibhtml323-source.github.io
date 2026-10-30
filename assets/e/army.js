(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.army=({b,tier,rnd,info,fin})=>{
  const M=8,us=Array.from({length:M},()=>{const c=2+(rnd()*8|0);return{c,p:Math.round(c*(1+rnd()*1.4)*3)}}),tot=us.reduce((a,u)=>a+u.c,0),B=Math.round(tot*.4);
  const dp=Array(B+1).fill(0);us.forEach(u=>{for(let w=B;w>=u.c;w--)dp[w]=Math.max(dp[w],dp[w-u.c]+u.p)});const opt=dp[B],T=Math.min(opt,Math.ceil(opt*(.78+Math.min(.22,tier*.018))));
  let sel=new Set(),lives=3;b.className='board math';b.style.removeProperty('--n');const sum=k=>[...sel].reduce((a,i)=>a+us[i][k],0);
  const draw=()=>{b.innerHTML='<div class="gapbar"><span>Budget <b class="gold">'+sum('c')+'/'+B+'</b></span><span>Power <b>'+sum('p')+'/'+T+'</b></span></div><div class="units">'+us.map((u,i)=>'<button class="unit'+(sel.has(i)?' on':'')+'" data-i="'+i+'" data-c="'+u.c+'" data-p="'+u.p+'"><b>'+u.p+'</b><small>power</small><span>cost '+u.c+'</span></button>').join('')+'</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn pri" data-go="1">Deploy army</button></div>';info('Spend up to '+B+' to reach '+T+' power · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const u=e.target.closest('.unit'),g=e.target.closest('[data-go]');if(u){const i=+u.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);return draw()}
    if(g){if(sum('c')<=B&&sum('p')>=T)return fin(lives===3?3:lives===2?2:1);lives--;if(!lives)return fin(0);info('Not enough power or over budget · Lives '+'♥'.repeat(lives))}};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
