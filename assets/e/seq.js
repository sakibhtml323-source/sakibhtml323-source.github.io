(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.seq=({b,tier,rnd,info,fin})=>{
  const need=4+(tier>>1),R=m=>1+(rnd()*m|0);let ok=0,lives=3,q;
  const gen=()=>{const t=rnd()*(tier<3?2:tier<6?4:6)|0,a=R(9),d=R(3+tier),I=[0,1,2,3,4,5];let s;
    if(t===0)s=I.map(i=>a+d*i);else if(t===1){const m=2+(rnd()*2|0);s=I.map(i=>a*m**i)}
    else if(t===2)s=I.map(i=>(a+i)**2);
    else if(t===3){s=[R(5),R(5)];while(s.length<6)s.push(s[s.length-1]+s[s.length-2])}
    else if(t===4){const e=R(4);s=[a];for(let i=1;i<6;i++)s.push(s[i-1]+(i%2?d:e))}
    else s=I.map(i=>a+d*i+i*i);
    const ans=s[5],opts=new Set([ans]);while(opts.size<4){const v=ans+R(6)*(rnd()>.5?1:-1);if(v>0)opts.add(v)}
    return{t:s.slice(0,5).join(', ')+', ?',ans,opts:C.sh([...opts],rnd)}};
  b.className='board math';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="q" style="font-size:34px">'+q.t+'</div><div class="opts">'+q.opts.map(v=>'<button class="opt" data-v="'+v+'">'+v+'</button>').join('')+'</div>';info('Solved '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))};
  b.onclick=e=>{const o=e.target.closest('.opt');if(!o)return;if(+o.dataset.v===q.ans)ok++;else lives--;
    if(!lives)return fin(0);if(ok>=need)return fin(lives===3?3:lives===2?2:1);q=gen();draw()};
  q=gen();draw()};
if(window.GK.boot)window.GK.boot();
})();
