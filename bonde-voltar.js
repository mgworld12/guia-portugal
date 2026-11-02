/*
 * bonde-voltar.js — efeito do bondinho no botão "Voltar"
 *
 * Como usar: coloque este arquivo e o bonde_voltar.png na mesma pasta e acrescente, antes de </body>:
 *     <script src="bonde-voltar.js"></script>
 * (em página dentro de subpasta: src="../bonde-voltar.js"; a imagem é procurada ao lado do script)
 *
 * O botão não é alterado: nenhuma cor, letra ou tamanho muda.
 *   - Passando o mouse: o bondinho aparece sobre o botão (o texto some só enquanto o mouse está em cima).
 *   - Clicando: o botão fica invisível, o bondinho (sem fundo) sai para a esquerda, soltando uma leve poeira ao arrancar, e, quando some,
 *     o botão volta ao normal e a ação ORIGINAL do botão acontece (voltar, link, função da página...).
 *
 * Reconhece o botão por: id="btnVoltar", class="btn-voltar", atributo data-voltar, ou texto "Voltar" (ex.: "← Voltar").
 * Para uma página/botão específico ficar de fora: data-sem-bonde.
 * Ajustes no <script>: data-largura="55" (px), data-duracao="1000" (ms; menor = mais rápido), data-poeira="nao" (sem poeira),
 * data-texto="manter" (não esconde o texto no hover), data-img="outro.png".
 */
(function () {
  'use strict';
  var me = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    for (var i = s.length - 1; i >= 0; i--) if (/bonde-voltar/.test(s[i].src)) return s[i];
  })();
  if (!me) return;
  var IMG = new URL(me.getAttribute('data-img') || 'bonde_voltar.png', me.src).href;
  var LARGURA = +me.getAttribute('data-largura') || 55;        // a imagem original tem 61 px de largura; acima disso perde nitidez
  var DURACAO = +me.getAttribute('data-duracao') || 1000;      // tempo da saída do bondinho
  var POEIRA = me.getAttribute('data-poeira') !== 'nao';        // leve poeira ao arrancar
  var ESCONDER = me.getAttribute('data-texto') !== 'manter';   // esconde o texto do botão enquanto o bondinho aparece
  var SELETOR = 'a,button,[role="button"],input[type="button"],input[type="submit"],[data-voltar],.btn-voltar,#btnVoltar';

  var css = document.createElement('style');
  css.textContent =
    '.bonde-tram{position:fixed;z-index:2147483647;pointer-events:none;margin:0;max-width:none;opacity:0;transform:translateX(15px);' +
    'transition:opacity .2s,transform .2s;user-select:none;-webkit-user-drag:none}' +
    '.bonde-tram.on{opacity:1;transform:translateX(0)}' +
    '.bonde-tram.sai{opacity:1;transition:none;animation:bonde-sai var(--dur,1000ms) cubic-bezier(.4,0,1,1) forwards}' +
    '@keyframes bonde-sai{from{transform:translateX(0)}to{transform:translateX(var(--dist,-100vw))}}' +
    '.bonde-poeira{position:fixed;z-index:2147483646;pointer-events:none;border-radius:50%;opacity:0;' +
    'background:radial-gradient(circle,rgba(185,175,160,.75) 0,rgba(185,175,160,0) 70%);animation:bonde-poeira .7s ease-out forwards}' +
    '@keyframes bonde-poeira{0%{opacity:0;transform:translate(0,0) scale(.4)}20%{opacity:.7}100%{opacity:0;transform:translate(var(--dx,14px),var(--dy,-12px)) scale(2.2)}}';
  document.head.appendChild(css);

  var tram = null, ativo = null, busy = false, bypass = false, TEXTO = /^[^\w\u00C0-\u00FF]{0,3}\s*voltar(\s+\S+){0,3}\s*$/i;   // aceita setas/símbolos antes: "← Voltar"

  function ehVoltar(el) {
    if (el.hasAttribute('data-sem-bonde')) return false;
    if (el.matches('#btnVoltar,.btn-voltar,[data-voltar]')) return true;
    if (!el.matches('a,button,[role="button"],input[type="button"],input[type="submit"]')) return false;
    return TEXTO.test((el.value || el.textContent || '').trim());
  }
  function alvo(n) {
    var el = n && n.closest ? n.closest(SELETOR) : null;
    return el && ehVoltar(el) ? el : null;
  }
  function criar() {
    if (tram) return;
    tram = new Image(); tram.className = 'bonde-tram'; tram.alt = ''; tram.draggable = false;
    tram.style.width = LARGURA + 'px'; tram.onload = posicionar; tram.src = IMG;
    document.body.appendChild(tram);
  }
  function posicionar() {
    if (!tram || !ativo) return;
    var r = ativo.getBoundingClientRect(), h = tram.offsetHeight || LARGURA * 0.77;
    tram.style.left = (r.left + (r.width - LARGURA) / 2) + 'px';
    tram.style.top = (r.top + (r.height - h) / 2) + 'px';
  }
  function entrar(el) {
    if (busy) return;
    ativo = el; criar(); posicionar();
    requestAnimationFrame(function () { if (tram && !busy) tram.classList.add('on'); });
    if (ESCONDER) { el.__bCor = el.style.color; el.style.color = 'transparent'; }
  }
  function sair(el) {
    if (busy) return;
    if (tram) tram.classList.remove('on');
    if (ESCONDER) el.style.color = el.__bCor || '';
    ativo = null;
  }
  function restaurar() {   // deixa o botão exatamente como era
    if (ativo) { ativo.style.visibility = ativo.__bVis || ''; ativo.style.color = ativo.__bCor || ''; }
    if (tram) { tram.remove(); tram = null; }
    busy = false; ativo = null;
  }
  function poeira(esq, topo, h) {   // algumas nuvenzinhas atrás do bondinho (que sai para a esquerda), na altura das rodas
    if (!POEIRA) return;
    for (var i = 0; i < 5; i++) {
      var p = document.createElement('span'), t = 10 + Math.random() * 8;
      p.className = 'bonde-poeira';
      p.style.width = p.style.height = t + 'px';
      p.style.left = (esq + LARGURA - 14 + Math.random() * 16) + 'px';
      p.style.top = (topo + h - t + 2 + Math.random() * 4) + 'px';
      p.style.animationDelay = (i * 70) + 'ms';
      p.style.setProperty('--dx', (10 + Math.random() * 16) + 'px'); p.style.setProperty('--dy', (-8 - Math.random() * 10) + 'px');
      document.body.appendChild(p);
      setTimeout(function (n) { return function () { n.remove(); }; }(p), 1200);
    }
  }
  function disparar(el) {  // executa a ação original do botão (link, onclick, listener...)
    bypass = true;
    try { el.click(); } finally { bypass = false; }
  }

  document.addEventListener('mouseover', function (e) { var el = alvo(e.target); if (el && el !== ativo) entrar(el); }, true);
  document.addEventListener('mouseout', function (e) { var el = alvo(e.target); if (el && el === ativo && !el.contains(e.relatedTarget)) sair(el); }, true);
  window.addEventListener('scroll', posicionar, true);
  window.addEventListener('resize', posicionar);
  window.addEventListener('pageshow', function (e) { if (e.persisted) restaurar(); });   // voltou pelo navegador: tudo normal

  document.addEventListener('click', function (e) {
    if (bypass) return;
    var el = alvo(e.target); if (!el) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (busy) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return disparar(el);   // sem animação para quem prefere
    busy = true; ativo = el; criar(); posicionar();
    var r = el.getBoundingClientRect(), esq = r.left + (r.width - LARGURA) / 2;
    tram.style.setProperty('--dist', -(esq + LARGURA + 20) + 'px'); tram.style.setProperty('--dur', DURACAO + 'ms');
    el.__bVis = el.style.visibility; el.style.visibility = 'hidden';   // o botão some (só o bondinho aparece), mas continua ocupando o espaço
    tram.classList.remove('on'); tram.classList.add('sai');
    poeira(esq, parseFloat(tram.style.top) || r.top, tram.offsetHeight || LARGURA * 0.77);
    setTimeout(function () { var b = ativo; restaurar(); if (b) disparar(b); }, DURACAO);
  }, true);
})();
