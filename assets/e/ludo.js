(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.ludo=({b,tier,rnd,info,fin,alive})=>{
  const L=16,OFF=[0,8];const P=[[0,0],[0,0]];let die=0,msg='Press Roll to start.',busy=false,done=false;
  const cell=(w,p)=>(OFF[w]+p)%L,movable=w=>[0,1].filter(k=>P[w][k]<L&&P[w][k]+die<=L);
  const move=(w,k)=>{P[w][k]+=die;if(P[w][k]<L){const c=cell(w,P[w][k]),o=1-w;if(c!==0&&c!==8)P[o].forEach((q,j)=>{if(q>0&&q<L&&cell(o,q)===c){P[o][j]=0;msg=(w?'The rival':'You')+' captured a token!'}})}};
  b.className='board ludo';b.style.removeProperty('--n');
  const draw=()=>{const occ=Array.from({length:L},()=>[]);[0,1].forEach(w=>P[w].forEach(p=>{if(p<L)occ[cell(w,p)].push(w)}));const mv=die&&!busy?movable(0):[];
    b.innerHTML='<div class="track">'+occ.map((o,i)=>'<span class="tc'+(i===0||i===8?' sf':'')+'">'+o.map(w=>'<i class="tk tk'+w+'"></i>').join('')+'</span>').join('')+'</div><div class="die">'+(die?'⚀⚁⚂⚃⚄⚅'[die-1]:'⚀')+'</div><p class="tn">'+msg+'</p><div class="row" style="justify-content:center"><button class="btn pri" data-a="roll"'+(die||busy||done?' disabled':'')+'>Roll</button>'
      +(mv.length>1?mv.map(k=>'<button class="btn sec" data-k="'+k+'">Move token '+(k?'B':'A')+' ('+P[0][k]+' → '+(P[0][k]+die)+')</button>').join(''):'')+'</div>';
    info('Your tokens '+P[0].join(' / ')+' · Rival '+P[1].join(' / ')+' · Goal '+L)};
  const winner=()=>P[0].every(p=>p===L)?0:P[1].every(p=>p===L)?1:-1;
  const endCheck=()=>{const w=winner();if(w<0)return false;done=true;draw();const a=P[1][0]+P[1][1];fin(w===0?(a<=10?3:a<=22?2:1):0);return true};
  const aiTurn=()=>{busy=true;draw();setTimeout(()=>{if(!alive())return;die=1+(rnd()*6|0);const d6=die,m=movable(1);
    if(!m.length){msg='The rival rolled '+d6+' and cannot move.';die=0;busy=false;draw();return}
    let k;if(tier>=4){const cap=m.find(q=>{const p=P[1][q]+die;return p<L&&cell(1,p)!==0&&cell(1,p)!==8&&P[0].some(z=>z>0&&z<L&&cell(0,z)===cell(1,p))}),fn=m.find(q=>P[1][q]+die===L);k=cap!==undefined?cap:fn!==undefined?fn:m.slice().sort((x,y)=>P[1][y]-P[1][x])[0]}else k=m[rnd()*m.length|0];
    msg='The rival rolled '+d6+'.';move(1,k);die=0;if(endCheck())return;if(d6===6){aiTurn();return}busy=false;draw()},300)};
  const doMove=k=>{const d6=die;move(0,k);die=0;if(endCheck())return;if(d6===6){msg+=' A six! Roll again.';draw();return}draw();setTimeout(()=>{if(alive())aiTurn()},200)};
  b.onclick=e=>{if(busy||done)return;const r=e.target.closest('[data-a="roll"]'),t=e.target.closest('[data-k]');
    if(r&&!die){die=1+(rnd()*6|0);const m=movable(0);msg='You rolled '+die+'.';
      if(!m.length){msg+=' No legal move.';die=0;draw();setTimeout(()=>{if(alive())aiTurn()},300);return}
      if(m.length===1)return doMove(m[0]);draw();return}
    if(t&&die&&movable(0).includes(+t.dataset.k))doMove(+t.dataset.k)};
  draw()};
if(window.GK.boot)window.GK.boot();
})();
