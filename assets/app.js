(()=>{'use strict';
const A=window.AURUM||{root:'/',v:''};
const rawST=window.setTimeout.bind(window),rawCT=window.clearTimeout.bind(window);
const $=(q,e=document)=>e.querySelector(q),$$=(q,e=document)=>[...e.querySelectorAll(q)];
const BASE=150;
const mul=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
const sh=(a,r)=>{for(let i=a.length-1;i>0;i--){const j=r()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* Levels 1-150 are fixed. After 150 the number keeps growing; each cycle of 150 levels
   shows every base level exactly once in a freshly shuffled order, remixed and slightly harder. */
const Levels={BASE,get(n,slug){
  if(n<=BASE)return{n,base:n,remix:false,mirror:false,rot:0,hue:0,boost:0};
  const k=n-BASE-1,cyc=Math.floor(k/BASE),perm=sh(Array.from({length:BASE},(_,i)=>i+1),mul(hash(slug)+cyc*7919)),r=mul(hash(slug)*31+n);
  return{n,base:perm[k%BASE],remix:true,mirror:r()>.5,rot:Math.floor(r()*4)*90,hue:Math.floor(r()*360),boost:Math.floor((n-BASE)/10)}}};
const KEY='aurum.v2';let S={xp:0,streak:0,last:'',wins:0,prog:{}};
/* progress is optional: corrupted, missing or blocked storage must never break a game */
try{const raw=JSON.parse(localStorage.getItem(KEY)||'{}');if(raw&&typeof raw==='object'&&!Array.isArray(raw)){
  if(Number.isFinite(raw.xp)&&raw.xp>=0)S.xp=Math.floor(raw.xp);if(Number.isFinite(raw.streak)&&raw.streak>=0)S.streak=Math.floor(raw.streak);
  if(typeof raw.last==='string'&&raw.last.length<12)S.last=raw.last;if(Number.isFinite(raw.wins)&&raw.wins>=0)S.wins=Math.floor(raw.wins);
  if(raw.prog&&typeof raw.prog==='object'&&!Array.isArray(raw.prog))for(const k of Object.keys(raw.prog)){const p=raw.prog[k];
    if(/^[a-z0-9-]{1,60}$/.test(k)&&p&&Number.isFinite(p.level)&&p.level>=1){const st={};if(p.stars&&typeof p.stars==='object')for(const l of Object.keys(p.stars))if(Number.isFinite(p.stars[l])&&p.stars[l]>=0&&p.stars[l]<=3)st[l]=p.stars[l];S.prog[k]={level:Math.floor(p.level),stars:st}}}}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const level=()=>Math.floor(Math.sqrt(S.xp/120))+1;
const bounds=()=>{const l=level();return[120*(l-1)**2,120*l*l]};
const prog=s=>S.prog[s]||(S.prog[s]={level:1,stars:{}});
const day=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
let tt;const toast=m=>{let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=m;t.classList.add('show');rawCT(tt);tt=rawST(()=>t.classList.remove('show'),2400)};
const chip=()=>{const c=$('#xpchip');if(c)c.innerHTML='<span class="lvl">'+level()+'</span>'+S.xp.toLocaleString()+' XP'};
const addXp=n=>{const b=level();S.xp+=n;if(level()>b)toast('Level up! You are now level '+level());save();chip()};
window.Core={Levels,mul,hash,sh,prog,S,save,addXp,toast,level};

function hydrate(){$$('.card[data-id]').forEach(c=>{const p=S.prog[c.dataset.id];if(!p)return;const end=p.level>BASE;
  $('.js-lv',c).textContent=end?'Level '+p.level+' · Endless':'Level '+p.level+' / '+BASE;$('.js-bar',c).style.width=(end?100:Math.round((p.level-1)/BASE*100))+'%'})}
function filters(){const q=$('#q'),chips=$$('.chip[data-cat]');if(!q&&!chips.length)return;let cat='all';
  const run=()=>{const t=q?String(q.value||'').trim().toLowerCase():'';let n=0;$$('.card[data-name]').forEach(c=>{const ok=(cat==='all'||c.dataset.cat===cat)&&c.dataset.name.includes(t);c.hidden=!ok;if(ok)n++});const e=$('#empty');if(e)e.hidden=n>0;const ct=$('#count');if(ct)ct.textContent=n+(n===1?' game':' games')+' found'};
  if(q){q.addEventListener('input',run);const p=new URLSearchParams(location.search).get('q');if(p)q.value=p.slice(0,80);run()}
  chips.forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.cat;chips.forEach(x=>x.classList.toggle('on',x===b));run()}))}

const DAILY=[20,30,40,60,80,120,300];
const BADGES=[['First Victory','Win your first level',s=>s.wins>=1],['Rising Star','Reach player level 3',()=>level()>=3],['Devoted','Reach a 3-day streak',s=>s.streak>=3],['Centurion','Win 25 levels',s=>s.wins>=25],['Collector','Play 3 different games',s=>Object.keys(s.prog).length>=3],['Beyond 150','Enter endless mode',s=>Object.values(s.prog).some(p=>p.level>BASE)]];
function profile(){const el=$('#profile');if(!el)return;
  const draw=()=>{const t=day(),y=new Date();y.setDate(y.getDate()-1);const can=S.last!==t,cur=can?(S.last===day(y)?S.streak:0):S.streak;
    const done=can?cur%7:((S.streak-1)%7+1),[lo,hi]=bounds(),pct=(S.xp-lo)/(hi-lo),C=2*Math.PI*76;
    const stars=Object.values(S.prog).reduce((a,p)=>a+Object.values(p.stars).reduce((x,v)=>x+v,0),0);
    el.innerHTML='<div class="ring"><svg viewBox="0 0 170 170" width="170" height="170" aria-hidden="true"><defs><linearGradient id="rg"><stop offset="0" stop-color="#F3E2A9"/><stop offset="1" stop-color="#9C7A1A"/></linearGradient></defs><circle cx="85" cy="85" r="76" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="8"/><circle cx="85" cy="85" r="76" fill="none" stroke="url(#rg)" stroke-width="8" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" transform="rotate(-90 85 85)"/></svg><div class="c"><div><b class="gold">'+level()+'</b><br><span class="mu" style="font-size:11px;letter-spacing:.14em">LEVEL</span></div></div></div>'
    +'<p class="mu" style="text-align:center">'+(S.xp-lo)+' / '+(hi-lo)+' XP to next level</p>'
    +'<div class="stats"><div class="stat"><b>'+S.xp.toLocaleString()+'</b><span>Total XP</span></div><div class="stat"><b>'+S.wins+'</b><span>Levels won</span></div><div class="stat"><b>'+stars+'</b><span>Stars</span></div><div class="stat"><b>'+(can?cur:S.streak)+'</b><span>Day streak</span></div></div>'
    +'<h2>Daily reward</h2><div class="days">'+DAILY.map((v,i)=>'<div class="day'+(i<done?' done':'')+(can&&i===cur%7?' now':'')+'"><small>Day '+(i+1)+'</small><b class="gold">+'+v+'</b><small>'+(i<done?'Claimed':'XP')+'</small></div>').join('')+'</div>'
    +'<button class="btn pri" id="claim"'+(can?'':' disabled')+'>'+(can?'Claim today\u2019s reward':'Come back tomorrow')+'</button>'
    +'<h2 style="margin-top:36px">Achievements</h2><div class="shelf">'+BADGES.map(([n,d,f])=>'<div class="medal'+(f(S)?'':' off')+'"><svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="#D4AF37" stroke-width="1.5"/><path d="M20 10l3 7 7 .7-5.3 4.6 1.7 7.2-6.4-4-6.4 4 1.7-7.2L10 17.7l7-.7z" fill="#D4AF37"/></svg><div><b>'+n+'</b><span>'+d+'</span></div></div>').join('')+'</div>';
    const b=$('#claim');if(can)b.onclick=()=>{S.streak=S.last===day(y)?S.streak+1:1;S.last=t;const amt=DAILY[(S.streak-1)%7];addXp(amt);toast('Daily reward claimed: +'+amt+' XP');draw()}};
  draw()}

chip();hydrate();filters();profile();
if('serviceWorker' in navigator&&location.protocol.indexOf('http')===0)navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(r=>{try{r.update()}catch(e){}}).catch(()=>{});
})();
