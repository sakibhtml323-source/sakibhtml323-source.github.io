(()=>{const {C,ctl,dpad,hue,cvs,loop,ptrx,E,setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame,cancelAnimationFrame,addEventListener}=window.GK;
const RC=[['Patishapta','Mix the rice flour batter','Cook thin crepes on a pan','Add the coconut and jaggery filling','Roll up the crepes','Serve warm'],['Puli Pitha','Grind the rice into flour','Make a dough with hot water','Shape small shells','Fill with coconut and jaggery','Seal and boil in milk'],['Bhapa Pitha','Soak the rice overnight','Grind it into coarse flour','Mix in the date jaggery filling','Steam in a covered pot','Serve with date syrup'],['Chitoi Pitha','Mix the flour with water','Pour the batter onto a hot pan','Cover with a lid to cook','Turn it over once','Serve with molasses'],['Pakon Pitha','Prepare a rice dough','Shape it into small rolls','Fry them until golden','Soak in sugar syrup','Cool and serve'],['Nakshi Pitha','Knead the dough well','Roll it out flat','Cut and press patterns','Deep fry until crisp','Dip in sweet syrup']];
E.pitha=({b,tier,rnd,info,fin})=>{
  const pool=C.sh(RC.slice(),rnd),need=3+(tier>>2);let ok=0,lives=3,i=0,cur,order,pos=0;
  b.className='board math';b.style.removeProperty('--n');
  const draw=()=>{b.innerHTML='<div class="q" style="font-size:24px">'+cur[0]+'</div><p class="tn">Put the steps in the right order.</p>'+order.map((s,k)=>'<button class="stepc'+(cur.indexOf(s)-1<pos?' dn':'')+'" data-k="'+k+'">'+s+'</button>').join('');info('Recipes '+ok+'/'+need+' · Lives '+'♥'.repeat(lives))};
  const next=()=>{cur=pool[i++%pool.length];const st=cur.slice(1);do{order=C.sh(st.slice(),rnd)}while(order.join()===st.join());pos=0;draw()};
  b.onclick=e=>{const c=e.target.closest('.stepc');if(!c||c.classList.contains('dn'))return;const s=order[+c.dataset.k];
    if(cur.indexOf(s)-1===pos){pos++;if(pos>=cur.length-1){ok++;if(ok>=need){draw();return fin(lives===3?3:lives===2?2:1)}return next()}draw()}else{lives--;if(!lives)return fin(0);draw()}};
  next()};
if(window.GK.boot)window.GK.boot();
})();
