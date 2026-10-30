(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
E.pattern=({b,tier,rnd,info,fin,alive})=>{
  const pads=tier<6?4:6,goal=3+tier;let seq=[],pos=0,lives=3,busy=true;
  b.className='board pattern';b.style.setProperty('--n',pads===4?2:3);
  b.innerHTML=Array.from({length:pads},(_,i)=>'<button class="cell pad p'+i+'" data-i="'+i+'" aria-label="Pad '+(i+1)+'"></button>').join('');
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const flash=async i=>{const p=b.children[i];if(!p)return;p.classList.add('lit');await wait(380);p.classList.remove('lit');await wait(160)};
  const show=async()=>{busy=true;info('Watch… '+seq.length+'/'+goal);await wait(500);for(const i of seq){if(!alive())return;await flash(i)}if(!alive())return;busy=false;pos=0;info('Your turn · Lives '+'♥'.repeat(lives))};
  const add=()=>{seq.push(rnd()*pads|0);show()};
  b.onclick=e=>{const c=e.target.closest('.pad');if(!c||busy)return;const i=+c.dataset.i;c.classList.add('lit');setTimeout(()=>c.classList.remove('lit'),180);
    if(i===seq[pos]){pos++;if(pos===seq.length){if(seq.length>=goal)return fin(lives===3?3:lives===2?2:1);busy=true;setTimeout(add,500)}}
    else{lives--;if(!lives)return fin(0);show()}};
  add()};
if(window.GK.boot)window.GK.boot();
})();
