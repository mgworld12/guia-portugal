const raiz=document.documentElement;
try{const t=localStorage.getItem("tema");if(t)raiz.dataset.t=t;else if(matchMedia("(prefers-color-scheme:dark)").matches)raiz.dataset.t="escuro"}catch(e){}
document.getElementById("tema").onclick=()=>{const t=raiz.dataset.t==="escuro"?"claro":"escuro";raiz.dataset.t=t;try{localStorage.setItem("tema",t)}catch(e){}};
const rodas=document.querySelector(".rodas");
if(rodas&&!matchMedia("(prefers-reduced-motion:reduce)").matches){
  rodas.addEventListener("click",e=>{const a=e.target.closest("a.roda");
    if(!a||e.ctrlKey||e.metaKey||e.shiftKey)return;
    e.preventDefault();rodas.classList.add("saindo");a.classList.add("ir");
    setTimeout(()=>{location.href=a.href},480)});
  addEventListener("pageshow",()=>{rodas.classList.remove("saindo");rodas.querySelectorAll(".ir").forEach(x=>x.classList.remove("ir"))});
}
if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

function tonalizar(){const h=document.querySelector(".cab");if(!h)return;const r=h.getBoundingClientRect(),a=[27,67,50],z=[45,106,79];
h.querySelectorAll(".cat-btn").forEach(b=>{const q=b.getBoundingClientRect(),t=Math.max(0,Math.min(1,((q.left+q.width/2-r.left)+(q.top+q.height/2-r.top))/(r.width+r.height)));b.style.setProperty("--hv",`rgb(${a.map((v,i)=>Math.round(v+(z[i]-v)*t)).join(",")})`)})}
{const h=document.querySelector(".cab");if(h){new MutationObserver(tonalizar).observe(h,{childList:true,subtree:true});addEventListener("resize",tonalizar);addEventListener("load",tonalizar);tonalizar()}}

document.addEventListener("click",e=>{const a=e.target.closest("a[data-voltar]");if(!a||e.ctrlKey||e.metaKey||e.shiftKey)return;let ok=false;try{ok=history.length>1&&!!document.referrer&&new URL(document.referrer).origin===location.origin}catch(_){}
if(ok){e.preventDefault();history.back()}});
