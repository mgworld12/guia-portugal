const REG={
PT11:{n:"Norte",l:"Norte",t:"A região mais populosa do país, com o Porto como centro. Terra do Vinho do Porto, do vale do Douro e do Gerês, o único parque nacional de Portugal.",d:"Viana do Castelo, Braga, Porto, Vila Real e Bragança, e partes de Aveiro, Viseu e Guarda",a:"Porto (OPO)"},
PT16:{n:"Centro",l:"Centro",t:"Entre o Norte e Lisboa, vai do litoral de Aveiro e da Nazaré à serra da Estrela e ao interior. Tem a Universidade de Coimbra e as aldeias do xisto.",d:"Coimbra, Leiria, Castelo Branco, Aveiro, Viseu, Guarda e partes de Santarém e Lisboa",a:""},
PT17:{n:"Área Metropolitana de Lisboa",l:"Lisboa",t:"Pequena em área, mas é onde vive grande parte da população. Reúne a capital, Sintra, Cascais e a península de Setúbal, e concentra o maior mercado de trabalho.",d:"Lisboa e Setúbal (em parte)",a:"Lisboa (LIS)"},
PT18:{n:"Alentejo",l:"Alentejo",t:"A maior região do continente e uma das menos povoadas. Planícies de sobreiros e vinhas, vilas históricas como Évora e Monsaraz e a costa Vicentina.",d:"Évora, Beja e Portalegre, e partes de Setúbal, Santarém e Lisboa",a:""},
PT15:{n:"Algarve",l:"Algarve",t:"O sul do país, de clima ameno e praias famosas. Mistura falésias, a Ria Formosa e um interior de serra, e é o principal destino de sol e mar.",d:"Faro",a:"Faro (FAO)"},
PT20:{c:"Angra do Heroísmo, Calheta, Corvo, Horta, Lagoa, Lajes das Flores, Lajes do Pico, Madalena, Nordeste, Ponta Delgada, Povoação, Ribeira Grande, Santa Cruz da Graciosa, Santa Cruz das Flores, São Roque do Pico, Velas, Vila da Praia da Vitória, Vila do Porto, Vila Franca do Campo",n:"Açores",l:"Açores",t:"Arquipélago de nove ilhas vulcânicas no meio do Atlântico, com lagoas, termas e observação de baleias. É uma região autónoma, com governo e parlamento próprios.",d:"não existem; a região divide-se em 9 ilhas e 19 municípios",a:"Ponta Delgada (PDL)"},
PT30:{c:"Calheta, Câmara de Lobos, Funchal, Machico, Ponta do Sol, Porto Moniz, Porto Santo, Ribeira Brava, Santa Cruz, Santana, São Vicente",n:"Madeira",l:"Madeira",t:"Arquipélago no Atlântico formado pela ilha da Madeira e por Porto Santo. Destaca-se pelas levadas, pela floresta laurissilva e pelo Funchal. É uma região autónoma.",d:"não existem; a região divide-se em 11 municípios",a:"Funchal (FNC)"}};
const ns="http://www.w3.org/2000/svg",$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const OX=250,W=OX+CONT.w,H=CONT.h,DY=H-524;let svg=`<svg viewBox="0 0 ${W} ${H}" role="group" aria-label="Mapa das regiões de Portugal"><image href="img/mapa-portugal.webp" x="${OX}" y="0" width="${CONT.w}" height="${CONT.h}"/>`;
Object.entries(CONT.r).forEach(([id,d])=>{svg+=`<path class="reg ov" data-id="${id}" transform="translate(${OX} 0)" tabindex="0" role="button" aria-label="${esc(REG[id].n)}" d="${d}"/>`});
Object.entries(CONT.s).forEach(([k,s])=>{svg+=`<path class="sub" data-id="${s.r}" data-s="${k}" transform="translate(${OX} 0)" tabindex="0" role="button" aria-label="${esc(s.n)}" d="${s.d}"/>`});
svg+=`<text class="rl lis" x="${OX+80}" y="676">Lisboa</text>`;
MAPA.q.forEach(([id,nm,x,y,w,h])=>{const t=id==="PT30"?`translate(0 ${DY})`:"";svg+=`<g transform="${t}"><rect class="frame reg-hit" data-id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><text class="rl fr" x="${x+8}" y="${y+14}">${nm}</text>${MAPA.r.filter(r=>r.id===id).map(r=>`<path class="reg isl" data-id="${id}" style="--c:var(--r${id.slice(2)})" tabindex="0" role="button" aria-label="${nm}" d="${r.d}"/>`).join("")}</g>`});
$("#mapa").innerHTML=svg+"</svg>";
$("#lista").innerHTML=Object.keys(REG).map(id=>`<button type="button" class="cat-btn" data-id="${id}"><i style="background:var(--r${id.slice(2)})"></i>${esc(REG[id].n)}</button>`).join("");
const info=$("#info");let curId=null;
const SUBL={};Object.entries(CONT.s).forEach(([k,s])=>{(SUBL[s.r]=SUBL[s.r]||[]).push([k,s])});
const vazio=()=>{info.style.setProperty("--c","var(--br)");info.innerHTML=`<h3>Regiões de Portugal</h3><p>Passe o mouse sobre uma região do mapa (ou toque nela) para ler um breve resumo. Nas regiões do continente, passe o mouse sobre cada cor para ver os concelhos da sub-região.</p>`};
const subTxt=sid=>{const s=CONT.s[sid];return s?`<b>${esc(s.n)}</b> (${s.c.length} concelhos): ${esc(s.c.join(", "))}`:"Passe o mouse (ou toque) numa sub-região do mapa, ou toque num dos botões acima, para ver os concelhos."};
const PAG={PT11:"norte.html",PT16:"centro.html",PT17:"lisboa_tejo.html",PT18:"alentejo.html",PT15:"algarve.html",PT20:"acores.html",PT30:"madeira.html"};
const CLH={};
const markup=(id,sid)=>{const r=REG[id],subs=SUBL[id]||[];let conc;
if(subs.length>1)conc=`<li>Sub-regiões: <span class="sc">${subs.map(([k,s])=>`<button type="button" class="sb${k===sid?" on":""}" data-s="${k}">${esc(s.n)}</button>`).join("")}</span><div class="cl" style="min-height:${CLH[id]||0}px">${subTxt(sid)}</div></li>`;
else{const c=subs.length?subs[0][1].c:r.c.split(", ");conc=`<li>Concelhos (${c.length}): ${esc(c.join(", "))}</li>`}
return `<h3>${esc(r.n)}</h3><p>${esc(r.t)}</p><ul><li>Distritos: ${esc(r.d)}</li>${conc}${r.a?`<li>Aeroporto: ${esc(r.a)}</li>`:""}</ul><div class="rod-info">${PAG[id]?`<a class="pg-link" href="${PAG[id]}">Abrir a página da região →</a>`:`<span class="breve-tag">Página da região: em breve</span>`}</div>`};
const showSub=(id,sid)=>{document.querySelectorAll(".sub").forEach(p=>p.classList.toggle("sel2",p.dataset.s===sid));info.querySelectorAll(".sb").forEach(b=>b.classList.toggle("on",b.dataset.s===sid));const el=info.querySelector(".cl");if(el)el.innerHTML=subTxt(sid)};
const sel=(id,sid)=>{const r=REG[id];if(!r)return;
if(id!==curId){curId=id;$("#mapa svg").classList.add("has-sel");document.querySelectorAll(".reg").forEach(p=>p.classList.toggle("sel",p.dataset.id===id));document.querySelectorAll(".cat-btn").forEach(b=>b.classList.toggle("active",b.dataset.id===id));
info.style.setProperty("--c",`var(--r${id.slice(2)})`);info.innerHTML=markup(id,sid);
info.querySelectorAll(".sb").forEach(b=>{const f=()=>showSub(id,b.dataset.s);b.addEventListener("click",f);b.addEventListener("mouseenter",f)})}
showSub(id,sid)};
const fixH=()=>{const keep=curId,ks=keep?(info.querySelector(".sb.on")||{}).dataset?.s:undefined;info.style.minHeight="0";info.style.height="auto";
Object.keys(CLH).forEach(k=>delete CLH[k]);
Object.keys(REG).forEach(id=>{const subs=SUBL[id]||[];if(subs.length>1)subs.forEach(([k])=>{info.innerHTML=markup(id,k);const el=info.querySelector(".cl");CLH[id]=Math.max(CLH[id]||0,el?el.offsetHeight:0)})});
let mx=0;
Object.keys(REG).forEach(id=>{const subs=SUBL[id]||[];(subs.length>1?[undefined,...subs.map(([k])=>k)]:[undefined]).forEach(sid=>{info.innerHTML=markup(id,sid);mx=Math.max(mx,info.offsetHeight)})});
info.style.height=(mx+4)+"px";info.style.minHeight="";curId=null;if(keep)sel(keep,ks);else vazio()};
document.querySelectorAll(".reg:not(.ov),.reg-hit").forEach(p=>{p.addEventListener("mouseenter",()=>sel(p.dataset.id));p.addEventListener("focus",()=>sel(p.dataset.id));p.addEventListener("click",()=>sel(p.dataset.id))});
document.querySelectorAll(".sub").forEach(p=>{const f=()=>sel(p.dataset.id,p.dataset.s);p.addEventListener("mouseenter",f);p.addEventListener("focus",f);p.addEventListener("click",f)});
document.querySelectorAll(".cat-btn").forEach(b=>b.addEventListener("click",()=>sel(b.dataset.id)));
vazio();fixH();addEventListener("load",fixH);let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(fixH,150)});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fixH);
const sc=(D.secoes.find(s=>s.id==="administracao")||{c:[]}).c;
$("#niveis").innerHTML=sc.map(c=>`<article class="card"><h3>${esc(c.n)}</h3><p>${esc(c.d)}</p></article>`).join("");
