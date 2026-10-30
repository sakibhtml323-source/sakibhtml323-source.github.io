(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.carrom=({b,tier,rnd,info,fin})=>{
  const need=3+(tier>>2);let pk=0,left=need+3,cx=50,cy=50,busy=false;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<div class="carrom"><i class="pkt" style="left:0;top:0"></i><i class="pkt" style="left:100%;top:0"></i><i class="pkt" style="left:0;top:100%"></i><i class="pkt" style="left:100%;top:100%"></i><svg viewBox="0 0 100 100" preserveAspectRatio="none"><line id="al" stroke="rgba(255,255,255,.4)" stroke-dasharray="2 2" stroke-width=".6"/></svg><i class="ccoin" id="cc"></i><i class="stk" id="sk"></i></div><label class="mu">Striker position<input type="range" id="sx" min="0" max="100" value="50"></label><label class="mu">Power<input type="range" id="pw" min="10" max="100" value="60"></label><button class="btn pri" id="fl" style="margin-top:12px">Flick</button>';
  const g=q=>b.querySelector(q),cc=g('#cc'),sk=g('#sk'),al=g('#al'),sx=g('#sx'),pw=g('#pw');
  const place=()=>{cc.style.left=cx+'%';cc.style.top=cy+'%';const s=+sx.value;sk.style.left=s+'%';al.setAttribute('x1',s);al.setAttribute('y1',88);al.setAttribute('x2',cx+(cx-s)*3);al.setAttribute('y2',cy+(cy-88)*3);info('Pocketed '+pk+'/'+need+' · Attempts left '+left)};
  const newCoin=()=>{cx=40+rnd()*20;cy=46+rnd()*12;busy=false;place()};
  sx.oninput=place;
  g('#fl').onclick=()=>{if(busy)return;busy=true;left--;const s=+sx.value,p=+pw.value;let dx=cx-s,dy=cy-88;const L=Math.hypot(dx,dy);dx/=L;dy/=L;let x=cx,y=cy,pocket=false;
    for(let st=0;st<p*1.2;st+=.5){x+=dx*.5;y+=dy*.5;if(x<=0||x>=100||y<=0||y>=100)break}
    x=Math.max(0,Math.min(100,x));y=Math.max(0,Math.min(100,y));const X=x<50?0:100,Y=y<50?0:100;if((x<=0||x>=100||y<=0||y>=100)&&Math.hypot(x-X,y-Y)<=11)pocket=true;
    cc.style.left=x+'%';cc.style.top=y+'%';
    if(pocket){pk++;info('Pocketed! '+pk+'/'+need+' · Attempts left '+left)}else info('Missed. Attempts left '+left);
    setTimeout(()=>{if(pk>=need)return fin(left>=3?3:left>=1?2:1);if(left<=0)return fin(0);newCoin()},700)};
  newCoin()};
if(window.GK.boot)window.GK.boot();
})();
