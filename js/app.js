const $=s=>document.querySelector(s);
const cop=n=>'$'+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const ls={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v===null?d:v}catch(e){return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};
const ss={get(k){try{return JSON.parse(sessionStorage.getItem(k))}catch(e){return null}},set(k,v){sessionStorage.setItem(k,JSON.stringify(v))},del(k){sessionStorage.removeItem(k)}};
const R=[
{id:'kfc',n:'KFC',t:'Pollo frito',e:'🍗',c:'#d4141c',m:'25-35 min',p:[['kfc1','Combo pollo crispy 3 piezas',24500,'🍗'],['kfc2','Balde de 8 piezas',52900,'🍗'],['kfc3','Alitas BBQ x6',17900,'🍖'],['kfc4','Gaseosa',4500,'🥤']]},
{id:'mc',n:"McDonald's",t:'Hamburguesas',e:'🍔',c:'#e51b24',m:'20-30 min',p:[['mc1','Combo Big Mac',28900,'🍔'],['mc2','McPollo',19900,'🍔'],['mc3','Papas medianas',8500,'🍟'],['mc4','Malteada',9900,'🥤']]},
{id:'bk',n:'Burger King',t:'Hamburguesas',e:'🍔',c:'#e4572e',m:'25-40 min',p:[['bk1','Combo Whopper',29900,'🍔'],['bk2','Cheeseburger',12900,'🍔'],['bk3','Aros de cebolla',8900,'🧅'],['bk4','Gaseosa',4500,'🥤']]},
{id:'dom',n:"Domino's",t:'Pizza',e:'🍕',c:'#1b5eab',m:'30-45 min',p:[['dom1','Pizza personal',16900,'🍕'],['dom2','Pizza mediana',36900,'🍕'],['dom3','Pan de ajo',9900,'🥖'],['dom4','Gaseosa 1.5 L',7500,'🥤']]},
{id:'bam',n:'Empanadas Bambi',t:'Empanadas',e:'🥟',c:'#d9903f',m:'15-25 min',p:[['bam1','Empanada de carne',3500,'🥟'],['bam2','Empanada de pollo',3500,'🥟'],['bam3','Combo 6 empanadas',18900,'🥟'],['bam4','Jugo natural',5500,'🧃'],['bam5','Donas x2',7900,'🍩']]},
{id:'ita',n:'Italianisimo',t:'Pastas',e:'🍝',c:'#2e7d32',m:'30-40 min',p:[['ita1','Lasaña de carne',26900,'🍝'],['ita2','Spaghetti boloñesa',24900,'🍝'],['ita3','Ensalada caprese',14900,'🥗'],['ita4','Tiramisú',11900,'🍰']]}];
const me=()=>ss.get('qd_user');
if(!document.body.hasAttribute('data-public')&&!me())location.replace('index.html');
async function sha(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const key=k=>'qd_'+k+'_'+(me()?me().email:'');
const cart=()=>ls.get(key('cart'),{r:null,i:{}});
const saveCart=c=>ls.set(key('cart'),c);
function add(rid,pid){const c=cart();if(c.r&&c.r!==rid&&Object.keys(c.i).length){if(!confirm('Tu carrito tiene productos de '+R.find(x=>x.id==c.r).n+'. ¿Vaciarlo y empezar con '+R.find(x=>x.id==rid).n+'?'))return;c.i={}}c.r=rid;c.i[pid]=(c.i[pid]||0)+1;saveCart(c)}
function rem(pid){const c=cart();if(c.i[pid]>1)c.i[pid]--;else delete c.i[pid];if(!Object.keys(c.i).length)c.r=null;saveCart(c)}
function totals(){const c=cart(),r=R.find(x=>x.id==c.r),L=r?Object.entries(c.i).map(([id,q])=>({p:r.p.find(p=>p[0]==id),q})).filter(x=>x.p):[];const sub=L.reduce((a,x)=>a+x.p[2]*x.q,0),env=sub===0||sub>=20000?0:3000;return{r,L,sub,env,tot:sub+env,n:L.reduce((a,x)=>a+x.q,0)}}
function nav(act){const n=totals().n,l=(h,t)=>`<a href="${h}" ${act==t?'class="b"':''}>${t}</a>`;
$('#nav').innerHTML=`<div class="nav"><a class="logo" href="home.html"><i></i>QuickDish</a><div class="ln">${l('home.html','Inicio')}${l('restaurantes.html','Restaurantes')}${l('rastrear.html','Pedidos')}${l('perfil.html','Mi cuenta')}<a class="cb" href="carrito.html">🧺${n?'<span>'+n+'</span>':''}</a><a href="#" onclick="salir()">Salir</a></div></div>`}
function salir(){ss.del('qd_user');location.href='index.html'}
function msg(id,t){const e=$('#'+id);e.textContent=t;e.className=(id=='ok'?'ok':'err')+' on'}
