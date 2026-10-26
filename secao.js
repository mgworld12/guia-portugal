const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const p=new URLSearchParams(location.search),id=p.get("s"),tit=p.get("t")||"Seção";
const s=D.secoes.find(x=>x.id===id);
document.title=tit+" — Guia de Portugal";
document.getElementById("sec").innerHTML=s
?`<h2>${esc(s.t)}</h2><p>${esc(s.p)}</p><div class="grade">${s.c.map(c=>`<article class="card"><h3>${esc(c.n)}</h3><p>${esc(c.d)}</p>${c.t?`<small>${esc(c.t)}</small>`:""}${c.u?`<a href="${esc(c.u)}" target="_blank" rel="noopener">Site oficial</a>`:""}</article>`).join("")}</div>`
:`<h2>${esc(tit)}</h2><div class="obra"><p>Esta página está em construção e chega numa próxima fase do projeto.</p></div>`;
