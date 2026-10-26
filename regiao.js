(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
if(typeof REGIAO==="undefined"){$("#quadro").innerHTML="<h3>Não foi possível carregar os dados</h3><p class='nd'>Confira se o arquivo da região (por exemplo norte-dados.js) foi enviado para o repositório, na mesma pasta do norte.html.</p>";return}
const R=REGIAO,host=u=>{try{return new URL(u).hostname}catch(e){return""}};
const lk=(u,n)=>u?`<a class="lk" href="${esc(u)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir o site: ${esc(n)}" title="Abrir o site"><img src="https://www.google.com/s2/favicons?sz=64&domain=${host(u)}" alt="" width="18" height="18"></a>`:"";
const li=(n,u)=>`<li><span>${esc(n)}</span>${lk(u,n)}</li>`;
const D=Object.fromEntries(R.dist.map(d=>[d.n,d])),CID=Object.fromEntries(R.cid.map(c=>[c.n,c])),REGO=Object.fromEntries(R.orgs.reg.map(o=>[o.id,o])),CIM=Object.fromEntries(R.orgs.cim.map(o=>[o.id,o]));
const SUB={},DIS={};R.geo.features.forEach(f=>{SUB[f.properties.c]=f.properties.s;DIS[f.properties.c]=f.properties.d});
const SUBCONC={};Object.keys(SUB).forEach(c=>(SUBCONC[SUB[c]]=SUBCONC[SUB[c]]||[]).push(c));Object.values(SUBCONC).forEach(a=>a.sort((x,y)=>x.localeCompare(y,"pt")));
const COR=["#1b4332","#2d6a4f","#40916c","#52b788","#74c69d","#95d5b2","#588157","#a3b18a"],CORS={};R.orgs.cim.forEach((o,i)=>CORS[o.s]=COR[i%COR.length]);
const CAM=[["distritos","Distritos"],["concelhos","Concelhos"],["cidades","Cidades"],["orgaos","Órgãos públicos"],["juntas","Juntas de Freguesias"]];
const MOD={d:"distritos",c:"concelhos",cid:"cidades",o:"orgaos",j:"juntas"};
$("#camadas").innerHTML=CAM.map(([k,n])=>`<button type="button" class="cat-btn" data-m="${k}">${n}</button>`).join("");
let mode="distritos",sel=null,map=null,polys=null,mk=null;
const temMapa=typeof L!=="undefined";
if(temMapa){map=L.map("mapar",{scrollWheelZoom:false}).setView(R.view,R.zoom);
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",{maxZoom:16,maxNativeZoom:16,attribution:"Tiles © Esri — Esri, HERE, Garmin, © OpenStreetMap contributors | Limites: CAOP/DGT (CC BY 4.0)"}).addTo(map);
map.createPane("rotulos");const pr=map.getPane("rotulos");pr.style.zIndex=450;pr.style.pointerEvents="none";
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",{pane:"rotulos",maxZoom:16,maxNativeZoom:16}).addTo(map);mk=L.layerGroup().addTo(map)}
else $("#mapar").innerHTML="<p class='nd' style='padding:1rem'>O mapa não carregou. Confira se a pasta <b>lib</b> (com leaflet.js e leaflet.css) foi enviada ao repositório. As listas e os quadros abaixo continuam funcionando.</p>";
const on=(t,id)=>sel&&sel.t===t&&sel.id===id;
const cidConc=()=>sel&&sel.t==="cid"?CID[sel.id].c:null;
const st=f=>{const p=f.properties,d=D[p.d],o={weight:.6,color:"#fff",fillColor:"#d8f3dc",fillOpacity:.5,dashArray:null};
if(mode==="distritos"){o.fillColor=d.cor;o.fillOpacity=d.parte?.45:.7;if(d.parte)o.dashArray="3 3";if(sel&&sel.t==="d"){const x=sel.id===p.d;o.fillColor=x?"#0b2e22":d.cor;o.fillOpacity=x?.85:.2}}
else if(mode==="concelhos"||mode==="juntas"){o.color="#2d6a4f";o.weight=1;o.fillOpacity=.4;if(sel&&(sel.t==="c"||sel.t==="j")&&sel.id===p.c){o.fillColor="#0b2e22";o.fillOpacity=.8}}
else if(mode==="orgaos"){o.fillColor=CORS[p.s];o.fillOpacity=.65;if(sel&&sel.t==="o"){if(CIM[sel.id]){const x=CIM[sel.id].s===p.s;o.fillColor=x?"#0b2e22":CORS[p.s];o.fillOpacity=x?.85:.2}else{o.fillColor="#0b2e22";o.fillOpacity=.6}}}
else{o.fillOpacity=.25;o.color="#95d5b2";if(cidConc()===p.c){o.fillColor="#0b2e22";o.fillOpacity=.6}}
return o};
if(temMapa)polys=L.geoJSON(R.geo,{style:st,onEachFeature:(f,l)=>{l.on("click",()=>{const p=f.properties;if(mode==="distritos")pick("d",p.d);else if(mode==="concelhos")pick("c",p.c);else if(mode==="juntas")pick("j",p.c);else if(mode==="orgaos"){const o=R.orgs.cim.find(x=>x.s===p.s);if(o)pick("o",o.id)}})}}).addTo(map);
const dica=()=>polys&&polys.eachLayer(l=>{const p=l.feature.properties;l.unbindTooltip();const t=mode==="distritos"?"Distrito de "+p.d:mode==="orgaos"?(R.orgs.cim.find(x=>x.s===p.s)||{}).n:(mode==="concelhos"||mode==="juntas")?p.c:null;if(t)l.bindTooltip(t,{sticky:true})});
const marcas=()=>{if(!mk)return;mk.clearLayers();
if(mode==="distritos")R.dist.filter(d=>!d.parte).forEach(d=>{const m=L.marker([d.lat,d.lng],{icon:L.divIcon({className:"mk"+(on("d",d.n)?" on":""),html:"<i></i>",iconSize:[18,18]}),title:d.n}).bindTooltip("Sede: "+d.sede);m.on("click",()=>pick("d",d.n));mk.addLayer(m)});
if(mode==="cidades")R.cid.forEach(c=>{const m=L.circleMarker([c.lat,c.lng],{radius:on("cid",c.n)?9:5,color:"#fff",weight:1.5,fillColor:on("cid",c.n)?"#e0a526":"#1b4332",fillOpacity:1}).bindTooltip(c.n);m.on("click",()=>pick("cid",c.n));mk.addLayer(m)})};
const concGrupos=t=>R.dist.map(d=>[d.n+(d.parte?" (parte)":""),d.conc.map(c=>[t,c,c])]);
const grupos=()=>mode==="distritos"?[["",R.dist.map(d=>["d",d.n,d.n+(d.parte?" (parte)":"")])]]:mode==="concelhos"?concGrupos("c"):mode==="juntas"?concGrupos("j"):mode==="cidades"?[["",R.cid.map(c=>["cid",c.n,c.n])]]:[["Órgãos regionais",R.orgs.reg.map(o=>["o",o.id,o.n])],["Comunidades intermunicipais e área metropolitana",R.orgs.cim.map(o=>["o",o.id,o.n])]];
const lista=()=>{const q=$("#busca").value.trim().toLowerCase();
$("#itens").innerHTML=grupos().map(([t,a])=>{const b=a.filter(x=>x[2].toLowerCase().includes(q));return b.length?`<div class="grp">${t?`<h4>${esc(t)}</h4>`:""}<div class="pl">${b.map(([k,id,n])=>`<button type="button" class="pill${on(k,id)?" on":""}" data-t="${k}" data-id="${esc(id)}">${esc(n)}</button>`).join("")}</div></div>`:""}).join("")||'<p class="nd">Nada encontrado.</p>'};
const camaras=cs=>`<ul class="ln">${cs.map(c=>li("Câmara Municipal de "+c,R.cm[c])).join("")}</ul>`;
const comercio=(cs,k)=>{const a=cs.flatMap(c=>((R.com[c]||{})[k]||[]).map(x=>[x[0],x[1],c]));return a.length?`<ul class="ln">${a.map(([n,u,c])=>li(n+(cs.length>1?" · "+c:""),u)).join("")}</ul>`:'<p class="nd">Ainda por completar.</p>'};
const sec=(t,b,o)=>`<details${o?" open":""}><summary>${t}</summary>${b}</details>`;
const NOTA='<p class="nd">Lista segundo a CAOP anterior a 2025. Em 2025 foram repostas freguesias extintas em 2013, então alguns nomes podem estar desatualizados.</p>';
const ANAFRE=`<ul class="ln">${li("ANAFRE – Associação Nacional de Freguesias","https://www.anafre.pt")}</ul>`;
const juntasC=c=>{const f=R.fre[c]||[];return `<p class="nd">${f.length} freguesias neste concelho.</p><div class="pl">${f.map(n=>`<span class="chip-f">${esc(n)}</span>`).join("")}</div>${NOTA}${ANAFRE}`};
const juntasD=d=>{const n=d.conc.reduce((s,c)=>s+(R.fre[c]||[]).length,0);return `<p class="nd">${n} freguesias nos concelhos deste distrito no Norte. Para ver os nomes, escolha um concelho. <button type="button" class="pill" data-go="juntas">Juntas por concelho</button></p>${ANAFRE}`};
const cardD=d=>`<h3>Distrito de ${esc(d.n)}</h3><p class="meta">${d.parte?`Parte do distrito no Norte · ${d.conc.length} de ${d.total} concelhos`:`Sede: ${esc(d.sede)} · ${d.conc.length} concelhos`}</p><p>${esc(d.desc)}</p>`+(d.parte?"":sec("Órgãos públicos",`<ul class="ln">${d.org.map(([n,u])=>li(n,u)).join("")}</ul>`,1))+sec(`Câmaras municipais (${d.conc.length})`,camaras(d.conc),d.parte)+sec("Juntas de freguesia",juntasD(d))+sec("Principais shoppings",comercio(d.conc,"s"))+sec("Mercados",comercio(d.conc,"m"));
const cardC=(c,t,aberta)=>{const d=D[DIS[c]];return `<h3>${esc(t)}</h3><p class="meta">Concelho de ${esc(c)} · Distrito de ${esc(d.n)} · ${esc(SUB[c])}</p>`+sec("Órgãos públicos do distrito",`<p class="nd">${d.parte?"A sede do distrito fica no Centro.":"Tribunal, Segurança Social, Finanças, GNR, PSP e IEFP."} <button type="button" class="pill" data-t="d" data-id="${esc(d.n)}">Ver o distrito</button></p>`)+sec("Câmara municipal",camaras([c]),!aberta)+sec(`Juntas de freguesia (${(R.fre[c]||[]).length})`,juntasC(c),aberta)+sec("Principais shoppings",comercio([c],"s"))+sec("Mercados",comercio([c],"m"))};
const cardO=o=>{if(REGO[o])return `<h3>${esc(REGO[o].n)}</h3><p class="meta">Órgão regional · Norte</p><p>${esc(REGO[o].d)}</p><ul class="ln">${li("Site oficial",REGO[o].u)}</ul>`;const x=CIM[o],cs=SUBCONC[x.s]||[];
return `<h3>${esc(x.n)}</h3><p class="meta">Sub-região: ${esc(x.s)} · ${cs.length} concelhos</p><p>${x.id==="amp"?"Entidade que reúne os municípios da área metropolitana do Porto para planear em conjunto transportes, ambiente e desenvolvimento.":"Comunidade intermunicipal: associação dos municípios da sub-região para cooperarem em transportes, saúde, ambiente e fundos europeus."}</p>`+(x.u?`<ul class="ln">${li("Site oficial",x.u)}</ul>`:'<p class="nd">Site oficial por completar.</p>')+sec(`Concelhos e câmaras municipais (${cs.length})`,camaras(cs),1)};
const quadro=()=>{const q=$("#quadro");q.style.borderLeftColor=sel&&sel.t==="d"&&D[sel.id].cor||"#2d6a4f";
const pl={distritos:"um distrito",concelhos:"um concelho",cidades:"uma cidade",orgaos:"um órgão",juntas:"um concelho para ver as suas freguesias"}[mode];
q.innerHTML=!sel?`<h3>Informações</h3><p class="nd">Selecione ${pl} ${mode==="juntas"?"":"no mapa ou "}na lista para ver as informações.</p>`:sel.t==="d"?cardD(D[sel.id]):sel.t==="c"?cardC(sel.id,"Concelho de "+sel.id,false):sel.t==="j"?cardC(sel.id,"Juntas de freguesia · "+sel.id,true):sel.t==="cid"?cardC(CID[sel.id].c,"Cidade de "+sel.id,false):cardO(sel.id);
$$("#quadro .lk img").forEach(i=>i.addEventListener("error",()=>{i.replaceWith(Object.assign(document.createElement("b"),{textContent:"↗"}))}))};
const redesenha=()=>{if(polys){polys.setStyle(st);dica()}marcas();lista();quadro()};
const setMode=(m,keep)=>{mode=m;if(!keep)sel=null;$$("#camadas .cat-btn").forEach(b=>b.classList.toggle("active",b.dataset.m===m));redesenha();if(map&&!keep)map.flyTo(R.view,R.zoom,{duration:.6})};
const bounds=f=>{const a=[];polys.eachLayer(l=>{if(f(l.feature.properties))a.push(l)});return L.featureGroup(a).getBounds()};
const pick=(t,id)=>{if(mode!==MOD[t])setMode(MOD[t],true);sel={t,id};redesenha();
if(map){if(t==="d")map.flyToBounds(bounds(p=>p.d===id),{padding:[20,20],duration:.6});else if(t==="c"||t==="j")map.flyToBounds(bounds(p=>p.c===id),{padding:[30,30],duration:.6});
else if(t==="cid")map.flyTo([CID[id].lat,CID[id].lng],11,{duration:.6});else if(t==="o"&&CIM[id])map.flyToBounds(bounds(p=>p.s===CIM[id].s),{padding:[20,20],duration:.6});else if(t==="o")map.flyTo(R.view,R.zoom,{duration:.6})}
$("#quadro").scrollIntoView({behavior:"smooth",block:"nearest"})};
document.addEventListener("click",e=>{const b=e.target.closest(".pill[data-t]");if(b)return pick(b.dataset.t,b.dataset.id);const g=e.target.closest("[data-go]");if(g)return setMode(g.dataset.go);const c=e.target.closest("#camadas .cat-btn");if(c)setMode(c.dataset.m)});
$("#busca").addEventListener("input",lista);
setMode("distritos");
})();
