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
