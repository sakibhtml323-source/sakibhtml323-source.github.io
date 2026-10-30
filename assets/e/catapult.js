(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.catapult=({b,tier,rnd,info,fin})=>{
  const need=3+(tier>>2),K=.0095,tol=Math.max(3,8-tier*.4);let hit=0,shots=need+3,D=50,busy=false;
  b.className='board math';b.style.removeProperty('--n');
  b.innerHTML='<svg class="cat" viewBox="0 0 100 50"><line x1="0" y1="45" x2="100" y2="45" stroke="#5a3d14" stroke-width="1"/><path id="tp" d="" fill="none" stroke="#F3E2A9" stroke-width=".5" stroke-dasharray="1.5 1"/><circle cx="5" cy="45" r="2" fill="#D4AF37"/><rect id="tg" x="0" y="43" width="4" height="3" fill="#e0525c"/></svg><label class="mu">Angle <b id="av">45</b>°<input type="range" id="an" min="15" max="80" value="45"></label><label class="mu">Power <b id="pv">60</b><input type="range" id="pw2" min="20" max="100" value="60"></label><button class="btn pri" id="fire" style="margin-top:12px">Fire</button>';
  const g=q=>b.querySelector(q),an=g('#an'),pw=g('#pw2'),tg=g('#tg'),tp=g('#tp');
  const range=()=>K*(+pw.value)**2*Math.sin(2*(+an.value)*Math.PI/180);
  const prev=()=>{const R=range(),th=(+an.value)*Math.PI/180;g('#av').textContent=an.value;g('#pv').textContent=pw.value;tp.setAttribute('d','M5 45 Q'+(5+R/2)+' '+(45-R*Math.tan(th)/2)+' '+(5+R)+' 45')};
  const newT=()=>{D=25+rnd()*58;tg.setAttribute('x',5+D-tol);tg.setAttribute('width',2*tol);tg.dataset.d=D.toFixed(2);busy=false;prev();info('Hit '+hit+'/'+need+' · Shots left '+shots)};
  an.oninput=pw.oninput=prev;
  g('#fire').onclick=()=>{if(busy)return;busy=true;shots--;prev();const R=range();
    if(Math.abs(R-D)<=tol){hit++;info('Direct hit! '+hit+'/'+need+' · Shots left '+shots)}else info((R<D?'Too short':'Too long')+' · Shots left '+shots);
    setTimeout(()=>{if(hit>=need)return fin(shots>=3?3:shots>=1?2:1);if(shots<=0)return fin(0);newT()},800)};
  newT()};
if(window.GK.boot)window.GK.boot();
})();
