(()=>{'use strict';
const C=window.Core,root=document.getElementById('game');if(!C||!root)return;
const slug=root.dataset.slug,engine=root.dataset.engine,sym=root.dataset.sym==='1';const nf=root.dataset.nf==='1';
const $=q=>root.querySelector(q);
/* ---- lifecycle tracker: every timer, animation frame and window listener created while a game runs is recorded
   so that restart / leaving the game can remove them all. This is what stops input being handled twice after a restart. ---- */
const bd=n=>typeof window[n]==='function'?window[n].bind(window):()=>0;
const _st=bd('setTimeout'),_ct=bd('clearTimeout'),_si=bd('setInterval'),_ci=bd('clearInterval'),_raf=bd('requestAnimationFrame'),_caf=bd('cancelAnimationFrame'),_ael=bd('addEventListener'),_rel=bd('removeEventListener');
const TR={to:new Set(),iv:new Set(),raf:new Set(),ls:[]};
/* these shadow the global names ONLY inside game code (core + engine files); page globals are never touched, so ad scripts are unaffected */
const setTimeout=(f,ms,...a)=>{if(typeof f!=='function')return _st(f,ms);const id=_st((...x)=>{TR.to.delete(id);f(...x)},ms,...a);TR.to.add(id);return id};
const clearTimeout=id=>{TR.to.delete(id);_ct(id)};
const setInterval=(f,ms,...a)=>{const id=_si(f,ms,...a);TR.iv.add(id);return id};
const clearInterval=id=>{TR.iv.delete(id);_ci(id)};
const requestAnimationFrame=f=>{const id=_raf(t=>{TR.raf.delete(id);f(t)});TR.raf.add(id);return id};
const cancelAnimationFrame=id=>{TR.raf.delete(id);_caf(id)};
const addEventListener=(t,f,o)=>{TR.ls.push([t,f,o]);_ael(t,f,o)};
const cleanup=()=>{TR.to.forEach(_ct);TR.iv.forEach(_ci);TR.raf.forEach(_caf);TR.ls.forEach(([t,f,o])=>_rel(t,f,o));TR.to.clear();TR.iv.clear();TR.raf.clear();TR.ls.length=0};
const E={};
const ctl=(b,alive,act)=>{b.style.touchAction='none';b.onclick=e=>{const d=e.target.closest('[data-d]');if(d)act(+d.dataset.d)};let sx=0,sy=0;
  b.ontouchstart=e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY};
  b.ontouchend=e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;act(Math.abs(dx)>Math.abs(dy)?(dx<0?0:1):(dy<0?2:3))};
  addEventListener('keydown',e=>{const m={ArrowLeft:0,ArrowRight:1,ArrowUp:2,ArrowDown:3}[e.key];if(m===undefined||!alive())return;e.preventDefault();act(m)})};
const dpad=()=>'<div class="dpad">'+['←','→','↑','↓'].map((s,i)=>'<button data-d="'+i+'" aria-label="Move '+['left','right','up','down'][i]+'">'+s+'</button>').join('')+'</div>';
const hue=i=>'hsl('+(i*57+10)+',62%,52%)';
const cvs=(b,W,H,extra)=>{b.innerHTML='<canvas width="'+W+'" height="'+H+'" aria-label="Game board"></canvas>'+(extra||'');const cv=b.querySelector('canvas');return[cv,cv.getContext('2d')]};
const loop=(alive,fn)=>{let l=performance.now();const t=n=>{if(!alive())return;const dt=Math.min(.05,(n-l)/1000);l=n;fn(dt);if(alive())requestAnimationFrame(t)};requestAnimationFrame(t)};
const ptrx=(cv,W,fn)=>{cv.onpointermove=cv.onpointerdown=e=>{const r=cv.getBoundingClientRect();fn((e.clientX-r.left)*W/r.width)}};
window.GK={C,ctl,dpad,hue,cvs,loop,ptrx,E,TR,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener};
const boot=()=>{
if(!E[engine]){root.textContent="This game failed to load. Please refresh the page.";return}
/* ------------ runner ------------ */
if(root.dataset.booted==='1')return;root.dataset.booted='1';   /* never start a second instance in the same page */
let n=C.prog(slug).level,tok=0,lv,destroyed=false;
root.innerHTML='<div class="gshell" id="shell"><div class="ghead"><button class="nbtn" id="prev" aria-label="Previous level">‹</button><div class="gtitle"><b>Level <span id="lv"></span></b><small id="rm"></small></div><button class="nbtn" id="next" aria-label="Next level">›</button></div><div class="ginfo" id="info" role="status" aria-live="polite"></div><div class="gstage" id="stage" tabindex="-1"><div class="gfit" id="gfit"><div class="gscale" id="gscale"><div id="board" class="board"></div></div></div></div><div class="grow"><button class="btn sec" id="restart" type="button">Restart level</button><button class="btn sec" id="fs" type="button" aria-pressed="false">Fullscreen</button></div><div class="gres" id="res" hidden></div></div>';
const shell=$('#shell'),stage=$('#stage'),res=$('#res'),fsBtn=$('#fs');let board=$('#board');
const info=t=>{$('#info').textContent=t};
function nav(){const u=C.prog(slug).level;$('#prev').disabled=n<=1;$('#next').disabled=n>=u}
function fail(err){tok++;cleanup();if(err)console.error('[aurum] '+slug+':',err);
  res.textContent='';const big=document.createElement('div');big.className='big';big.textContent='Game could not be loaded.';
  const row=document.createElement('div');row.className='row';const again=document.createElement('button');again.className='btn pri';again.type='button';again.textContent='Try Again';again.onclick=start;
  const back=document.createElement('a');back.className='btn sec';back.href='/games';back.textContent='Back to Games';row.append(again,back);res.append(big,row);res.hidden=false}
function start(){tok++;const my=tok;cleanup();res.hidden=true;lv=C.Levels.get(n,slug);
  const tier=Math.min(12,1+Math.floor((lv.base-1)/15)+Math.min(lv.boost,4));
  $('#lv').textContent=n;$('#rm').textContent=lv.remix?'Endless · remix of level '+lv.base:'';nav();
  const nb=document.createElement('div');nb.id='board';nb.className='board';board.replaceWith(nb);board=nb;   /* fresh element: no old listeners can survive */
  board.style.filter=lv.hue&&!nf?'hue-rotate('+lv.hue+'deg)':'';board.style.transform=sym&&lv.remix?'rotate('+lv.rot+'deg) scaleX('+(lv.mirror?-1:1)+')':'';
  try{E[engine]({b:board,tier,rnd:C.mul(C.hash(slug)+n*977),info,fin:s=>finish(s,my),alive:()=>tok===my&&!destroyed})}catch(err){fail(err);return}
  fit()}
function finish(stars,my){if(my!==tok||destroyed)return;tok++;cleanup();
  const mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
  res.textContent='';
  if(!stars){const row=mk('div','row');const ag=mk('button','btn pri','Try again');ag.type='button';ag.onclick=start;row.append(ag);
    res.append(mk('div','big','Not this time'),mk('p','mu','You ran out of lives. Give it another go.'),row);res.hidden=false;ag.focus({preventScroll:true});return}
  const p=C.prog(slug),xp=15+stars*10+lv.boost*2;p.stars[n]=Math.max(p.stars[n]||0,stars);if(n===p.level)p.level++;C.S.wins++;C.addXp(xp);C.save();
  const st=mk('div','st');st.setAttribute('aria-label',stars+' of 3 stars');st.append('★'.repeat(stars));const dim=mk('span',null,'★'.repeat(3-stars));dim.style.opacity='.25';st.append(dim);
  const row=mk('div','row');const nx=mk('button','btn pri','Next level'),rp=mk('button','btn sec','Replay');nx.type=rp.type='button';nx.onclick=()=>{n++;start()};rp.onclick=start;row.append(nx,rp);
  res.append(mk('div','big gold','Level '+n+' complete'),st,mk('p','mu','+'+xp+' XP'),row);res.hidden=false;nx.focus({preventScroll:true})}

/* ---- fullscreen: the game shell (never ads, footer or page text) goes fullscreen through the real Fullscreen API.
        Where the browser has no element fullscreen (e.g. iPhone Safari) the shell expands to the whole viewport instead. ---- */
const D=document,fsEl=()=>D.fullscreenElement||D.webkitFullscreenElement||null;
const reqFS=shell.requestFullscreen||shell.webkitRequestFullscreen,exitFS=D.exitFullscreen||D.webkitExitFullscreen;
let pseudo=false;
const isReal=()=>fsEl()===shell;
function sync(){const real=isReal(),on=real||pseudo;shell.classList.toggle('is-fs',real);shell.classList.toggle('is-pfs',pseudo&&!real);D.documentElement.classList.toggle('pfs-lock',pseudo&&!real);
  fsBtn.textContent=on?(real?'Exit fullscreen':'Exit full view'):'Fullscreen';fsBtn.setAttribute('aria-pressed',on?'true':'false');fit()}
async function enterFS(){if(reqFS){try{await reqFS.call(shell);pseudo=false;sync();return}catch(e){}}pseudo=true;sync()}
async function leaveFS(){pseudo=false;if(isReal()&&exitFS){try{await exitFS.call(D)}catch(e){}}sync()}
const park=()=>{try{stage.focus({preventScroll:true})}catch(e){}};   /* Space/Enter during play must never re-press Restart/Fullscreen */
fsBtn.onclick=()=>{((isReal()||pseudo)?leaveFS():enterFS());park()};
const onFsChange=()=>{pseudo=false;sync()};
D.addEventListener('fullscreenchange',onFsChange);D.addEventListener('webkitfullscreenchange',onFsChange);
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&pseudo&&!isReal())leaveFS()});
/* canvas games: internal resolution stays W x H, only the displayed size changes; pointer maths uses getBoundingClientRect so hits stay exact */
let fitting=false;
function fit(){if(fitting)return;fitting=true;try{const gf=$('#gfit'),gs=$('#gscale'),cv=board.querySelector('canvas'),on=isReal()||pseudo;
  gs.style.transform='';gs.style.width='';gf.style.width='';gf.style.height='';
  if(cv){cv.style.width='';cv.style.height='';cv.style.maxWidth=''}
  if(!on)return;
  const r=stage.getBoundingClientRect(),w=Math.max(120,r.width),h=Math.max(120,r.height);
  if(cv){const k=Math.min(w/cv.width,h/cv.height);cv.style.maxWidth='none';cv.style.width=Math.floor(cv.width*k)+'px';cv.style.height=Math.floor(cv.height*k)+'px';return}
  const bw=board.offsetWidth,bh=board.offsetHeight,k=Math.min(1,w/Math.max(1,bw),h/Math.max(1,bh));   /* tall DOM boards shrink to fit; nothing ever scrolls off-screen */
  if(k<1){gf.style.width=Math.floor(bw*k)+'px';gf.style.height=Math.floor(bh*k)+'px';gs.style.width=bw+'px';gs.style.transformOrigin='0 0';gs.style.transform='scale('+k+')'}
  }finally{fitting=false}}
if(window.ResizeObserver){const ro=new ResizeObserver(()=>fit());ro.observe(stage);ro.observe(board.parentNode)}
_ael('orientationchange',fit);

/* ---- destroy: leaving the page ends every loop, timer and listener and leaves fullscreen; coming back from bfcache restarts cleanly ---- */
function destroy(){destroyed=true;tok++;cleanup();pseudo=false;if(isReal()&&exitFS){try{exitFS.call(D)}catch(e){}}}
_ael('pagehide',destroy);
_ael('pageshow',e=>{if(e.persisted&&destroyed){destroyed=false;sync();start()}});
_ael('error',e=>{if(e&&e.filename&&/\/assets\/(e\/|games\.js)/.test(e.filename))fail(e.error||e.message)});
window.GK.destroy=destroy;
$('#prev').onclick=()=>{if(n>1){n--;start();park()}};$('#next').onclick=()=>{if(n<C.prog(slug).level){n++;start();park()}};$('#restart').onclick=()=>{start();park()};
start();
};
window.GK.boot=boot;
})();
