(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.ghost=({b,tier,rnd,info,fin,alive})=>{
  const n=7,gc=Math.min(5,3+(tier>>2)),ys=C.sh([1,2,3,4,5],rnd).slice(0,gc);let gh=ys.map(y=>({x:rnd()*n|0,y,d:rnd()<.5?1:-1})),px=3,py=6,lives=3,done=false,turns=0;
  b.className='board chase';b.style.removeProperty('--n');
  const hit=()=>gh.some(g=>g.x===px&&g.y===py);
  const draw=()=>{b.innerHTML='<div class="gg" style="--n:7">'+Array.from({length:49},(_,i)=>{const x=i%n,y=i/n|0,g=gh.find(q=>q.x===x&&q.y===y);return'<div class="gc'+(y===0?' ex':'')+(g?' gh':'')+(x===px&&y===py?' bl':'')+'"'+(g?' data-d="'+g.d+'"':'')+'></div>'}).join('')+'</div>'+dpad()+'<div class="row" style="justify-content:center;margin-top:8px"><button class="btn sec" data-w="1">Wait</button></div>';info('Reach the glowing top row · Lives '+'♥'.repeat(lives)+' · Turns '+turns)};
  const lose=()=>{lives--;if(!lives){done=true;draw();return fin(0)}px=3;py=6;draw()};
  const after=()=>{turns++;if(hit())return lose();gh.forEach(g=>{g.x+=g.d;if(g.x<0||g.x>=n){g.d=-g.d;g.x+=2*g.d}});if(hit())return lose();draw()};
  ctl(b,alive,m=>{if(done)return;const nx=px+[-1,1,0,0][m],ny=py+[0,0,-1,1][m];if(nx<0||nx>=n||ny<0||ny>=n)return;px=nx;py=ny;if(py===0){done=true;draw();return fin(lives===3?3:lives===2?2:1)}after()});
  b.addEventListener('click',e=>{if(!done&&e.target.closest&&e.target.closest('[data-w]'))after()});
  draw()};
if(window.GK.boot)window.GK.boot();
})();
