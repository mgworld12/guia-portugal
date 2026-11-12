(()=>{
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
if(typeof YT==="undefined"){$("#lista").innerHTML="<p class='nd'>Não foi possível carregar os dados (youtubers-dados.js). Confira se o arquivo foi enviado ao repositório.</p>";return}
const host=u=>{try{return new URL(u).hostname}catch(e){return""}};
const COR={Norte:"#8fb0ea",Centro:"#b7cdf2",Lisboa:"#f2cf72",Alentejo:"#a9d4b0",Algarve:"#f1b5a5",Açores:"#c9b8ec",Madeira:"#9fd9d6"};
const REDES=[["u","YouTube"],["ig","Instagram"],["tt","TikTok"],["fb","Facebook"],["x","X (Twitter)"],["site","Site"],["o","Outro link"]];
const links=c=>REDES.map(([k,n])=>{const u=k==="u"?c.u:(c.s||{})[k];return u?[n,u]:null}).filter(Boolean);
const btn=([n,u])=>`<a class="lk" href="${esc(u)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(n)}: abrir" title="${esc(n)}"><img src="https://www.google.com/s2/favicons?sz=64&domain=${host(u)}" alt="" width="18" height="18"></a>`;
const fallbackImg=r=>r.querySelectorAll(".lk img").forEach(i=>i.addEventListener("error",()=>{i.replaceWith(Object.assign(document.createElement("b"),{textContent:"↗"}))}));
const ini=n=>(n.match(/[A-Za-zÀ-ú0-9]/)||["?"])[0].toUpperCase();
// posições: afasta os pinos que partilham o mesmo ponto
const grp={};YT.canais.forEach(c=>{const k=c.lat.toFixed(4)+","+c.lng.toFixed(4);(grp[k]=grp[k]||[]).push(c)});
Object.values(grp).forEach(a=>{a.sort((x,y)=>x.n.localeCompare(y.n,"pt"));a.forEach((c,i)=>{const ang=i*2.39996,r=i?0.012*Math.sqrt(i):0;c.p=[c.lat+r*Math.sin(ang),c.lng+r*Math.cos(ang)/Math.cos(c.lat*Math.PI/180)]})});
const nomes=[...new Set(YT.canais.map(c=>c.r))],ORD=["Norte","Centro","Lisboa","Alentejo","Algarve","Açores","Madeira"].filter(r=>nomes.includes(r));
let reg="Todos",q="",map=null,cluster=null,sel=null;const mk=new Map();
$("#regioes").innerHTML=["Todos",...ORD].map(r=>`<button type="button" class="cat-btn" data-r="${r}">${r}<small class="n"></small></button>`).join("");
const filtrados=()=>YT.canais.filter(c=>(reg==="Todos"||c.r===reg)&&(!q||(c.n+" "+c.l+" "+c.r).toLowerCase().includes(q)));
const cartao=document.createElement("div");cartao.className="cart";cartao.hidden=true;let tmr=null,cur=null;
const ocultar=()=>{cartao.hidden=true;cur=null};
const agendaOcultar=()=>{clearTimeout(tmr);tmr=setTimeout(ocultar,350)};
cartao.addEventListener("mouseenter",()=>clearTimeout(tmr));cartao.addEventListener("mouseleave",agendaOcultar);
const mostrar=c=>{clearTimeout(tmr);cur=c;const L2=links(c);
cartao.innerHTML=`<div class="cart-av">${esc(ini(c.n))}</div><div class="cart-tx"><b>${esc(c.n)}</b><span>${esc(c.l)} · ${esc(c.r)}</span></div><div class="cart-lk">${L2.map(btn).join("")}</div>`;
fallbackImg(cartao);cartao.hidden=false;
if(!map)return;const p=map.latLngToContainerPoint(c.p),W=map.getSize(),w=cartao.offsetWidth,h=cartao.offsetHeight;
let x=Math.max(6,Math.min(W.x-w-6,p.x-w/2)),y=p.y-h-14;if(y<6)y=p.y+14;cartao.style.left=x+"px";cartao.style.top=y+"px"};
const estilo=(c,on)=>({radius:on?9:5,color:"#fff",weight:1.5,fillColor:on?"#e0a526":"#d62828",fillOpacity:1});
const desenhar=()=>{const f=filtrados();
if(cluster){cluster.clearLayers();mk.clear();f.forEach(c=>{const m=L.circleMarker(c.p,estilo(c,sel===c));m.on("mouseover",()=>mostrar(c));m.on("mouseout",agendaOcultar);m.on("click",()=>{mostrar(c)});mk.set(c,m);cluster.addLayer(m)})}
$("#cont").textContent=`${f.length} de ${YT.canais.length} canais`;
$("#lista").innerHTML=f.length?f.map(c=>`<article class="yt-item" data-i="${YT.canais.indexOf(c)}"><div class="cart-av">${esc(ini(c.n))}</div><div class="cart-tx"><b>${esc(c.n)}</b><span>${esc(c.l)} · ${esc(c.r)}</span></div><div class="cart-lk">${links(c).map(btn).join("")}</div></article>`).join(""):"<p class='nd'>Nenhum canal encontrado.</p>";
fallbackImg($("#lista"));
document.querySelectorAll("#regioes .cat-btn").forEach(b=>{const r=b.dataset.r;b.classList.toggle("active",r===reg);b.querySelector(".n").textContent=" "+(r==="Todos"?YT.canais.length:YT.canais.filter(c=>c.r===r).length)})};
const vista=()=>{if(!map)return;if(reg==="Madeira")map.flyToBounds([[32.35,-17.4],[33.2,-16.2]],{duration:.6});else if(reg==="Açores")map.flyToBounds([[36.8,-31.4],[39.8,-24.9]],{duration:.6});else if(reg==="Todos")map.flyToBounds([[36.9,-9.6],[42.2,-6.1]],{duration:.6});else{const b=L.featureGroup(regLayers.filter(l=>l.feature.properties.n===reg)).getBounds();map.flyToBounds(b,{padding:[20,20],duration:.6})}};
let regLayers=[];
const setReg=r=>{reg=r;sel=null;ocultar();desenhar();vista()};
if(typeof L!=="undefined"){
map=L.map("mapar",{scrollWheelZoom:false,minZoom:5,maxZoom:16}).fitBounds([[36.9,-9.6],[42.2,-6.1]]);
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",{maxZoom:16,maxNativeZoom:16,attribution:"Tiles © Esri — Esri, HERE, Garmin, © OpenStreetMap contributors | Limites: CAOP/DGT (CC BY 4.0)"}).addTo(map);
const gj=L.geoJSON(YTMAPA,{style:f=>({fillColor:COR[f.properties.n],fillOpacity:.55,color:"#fff",weight:1.2}),onEachFeature:(f,l)=>{regLayers.push(l);l.on("click",()=>setReg(f.properties.n));l.bindTooltip(f.properties.n,{sticky:true})}}).addTo(map);
map.on("zoomend",()=>{const z=map.getZoom();gj.setStyle(f=>({fillColor:COR[f.properties.n],fillOpacity:z>=9?.12:.55,color:z>=9?"#8a9a90":"#fff",weight:z>=9?.8:1.2}))});
cluster=(L.markerClusterGroup?L.markerClusterGroup({maxClusterRadius:42,showCoverageOnHover:false,spiderfyOnMaxZoom:true,iconCreateFunction:c=>{const n=c.getChildCount();return L.divIcon({html:`<div><span>${n}</span></div>`,className:"mc",iconSize:L.point(30+Math.min(n,40)/2,30+Math.min(n,40)/2)})}}):L.layerGroup()).addTo(map);
map.getContainer().appendChild(cartao);
map.on("click",ocultar);map.on("movestart",ocultar);
}else $("#mapar").innerHTML="<p class='nd' style='padding:1rem'>O mapa não carregou. Confira se a pasta <b>lib</b> foi enviada ao repositório. A lista abaixo continua funcionando.</p>";
document.addEventListener("click",e=>{const b=e.target.closest("#regioes .cat-btn");if(b)return setReg(b.dataset.r);
const it=e.target.closest(".yt-item");if(it&&!e.target.closest(".lk")){const c=YT.canais[+it.dataset.i];if(reg!=="Todos"&&reg!==c.r)reg="Todos";sel=c;desenhar();if(map){$("#mapar").scrollIntoView({behavior:"smooth",block:"center"});const m=mk.get(c);if(m&&cluster.zoomToShowLayer)cluster.zoomToShowLayer(m,()=>{map.flyTo(c.p,Math.max(map.getZoom(),11),{duration:.5});setTimeout(()=>mostrar(c),600)});else{map.flyTo(c.p,11,{duration:.5});setTimeout(()=>mostrar(c),600)}}}});
$("#busca").addEventListener("input",e=>{q=e.target.value.trim().toLowerCase();desenhar()});
desenhar();
})();
