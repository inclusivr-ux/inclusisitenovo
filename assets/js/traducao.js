/* =============================================================================
   InclusiVR — tradução para o inglês (pedido de 28/10/2026)
   O botão EN só traduz os textos da página em que a pessoa está. O layout, os
   menus, os botões (inclusive o Comprar), os links e as funções continuam iguais.
   - O dicionário fica em assets/js/traducao-en.js e só é baixado quando alguém
     escolhe o inglês.
   - A escolha fica guardada no navegador: as outras páginas também abrem em inglês,
     até a pessoa tocar em PT. Também dá para abrir uma página já em inglês com
     ?lang=en no fim do endereço (e ?lang=pt para voltar ao português).
   - Textos que aparecem depois (jogos, avisos, preço da campanha, posts do blog)
     também são traduzidos, porque a página é observada enquanto está em inglês.
   - Sem JavaScript, o botão EN continua levando para a página em inglês (/en/).
   - Texto que não está no dicionário continua em português. Para conferir o que
     falta numa página, abra-a com ?lang=en&traducao=verificar e veja o console.
   ============================================================================= */
(function () {
  'use strict';
  var IVR = window.InclusiVR = window.InclusiVR || {};
  var html = document.documentElement;
  var raiz = html.getAttribute('data-raiz') || '';
  var CHAVE = 'inclusivr:idioma';
  var paginaInglesa = html.lang === 'en';
  var ATRIBUTOS = ['alt', 'title', 'aria-label', 'placeholder', 'aria-roledescription'];
  var PULAR = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, TEMPLATE: 1 };

  function ler() { try { return window.localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravar(v) { try { window.localStorage.setItem(CHAVE, v); } catch (e) { /* sem armazenamento: vale só nesta página */ } }

  /* ---------- botão de idioma (topo e rodapé): EN no português, PT no inglês ---------- */
  var botoes = Array.prototype.slice.call(document.querySelectorAll('.idioma'));
  botoes.forEach(function (a) {
    a.setAttribute('translate', 'no');
    a.__original = { href: a.getAttribute('href'), title: a.getAttribute('title'), lang: a.getAttribute('lang'), hreflang: a.getAttribute('hreflang'),
      rotulo: (a.querySelector('[aria-hidden="true"]') || {}).textContent, oculto: (a.querySelector('.visualmente-oculto') || {}).textContent };
  });
  function mostrarBotao(idioma) {
    botoes.forEach(function (a) {
      var o = a.__original, rot = a.querySelector('[aria-hidden="true"]'), oc = a.querySelector('.visualmente-oculto');
      if (idioma === 'en') {
        a.setAttribute('title', 'Versão em português'); a.setAttribute('lang', 'pt-BR'); a.setAttribute('hreflang', 'pt-BR');
        if (rot) rot.textContent = 'PT';
        if (oc) oc.textContent = 'Versão em português';
      } else {
        if (o.title) a.setAttribute('title', o.title); if (o.lang) a.setAttribute('lang', o.lang); if (o.hreflang) a.setAttribute('hreflang', o.hreflang);
        if (rot && o.rotulo) rot.textContent = o.rotulo;
        if (oc && o.oculto) oc.textContent = o.oculto;
      }
    });
  }

  /* Na página /en/ (já em inglês), o botão PT leva ao início e passa a lembrar o português */
  if (paginaInglesa) {
    botoes.forEach(function (a) { a.addEventListener('click', function () { gravar('pt'); }); });
    return;
  }

  /* ---------- motor de tradução ---------- */
  var dic = null, padroes = [];
  var originaisTexto = new Map(), originaisAttr = new Map(), tituloOriginal = null;
  var observador = null, ativo = false, faltando = {};
  var verificar = /[?&]traducao=verificar\b/.test(window.location.search);

  function norm(t) { return String(t).replace(/\s+/g, ' ').trim(); }
  /* frase inteira: dicionário e, se não houver, os padrões (textos com números e nomes) */
  function traduzirFrase(k) {
    if (Object.prototype.hasOwnProperty.call(dic, k)) return dic[k];
    for (var i = 0; i < padroes.length; i++) {
      var m = padroes[i][0].exec(k);
      if (m) return typeof padroes[i][1] === 'function' ? padroes[i][1].apply(null, m) : k.replace(padroes[i][0], padroes[i][1]);
    }
    return null;
  }
  /* divide em frases (depois de . ! ou ? seguido de espaço), para mensagens montadas por partes */
  function frases(k) {
    var partes = [], atual = '';
    for (var i = 0; i < k.length; i++) {
      atual += k.charAt(i);
      if ('.!?'.indexOf(k.charAt(i)) !== -1 && k.charAt(i + 1) === ' ') { partes.push(atual.trim()); atual = ''; }
    }
    if (atual.trim()) partes.push(atual.trim());
    return partes;
  }
  function traduzir(txt) {
    var k = norm(txt);
    if (k.length < 2 || !/[A-Za-zÀ-ÿ]/.test(k)) return null; /* letra solta (jogo das vogais) fica como está */
    var r = traduzirFrase(k);
    if (r !== null) return r;
    var partes = frases(k);
    if (partes.length > 1) {
      var en = partes.map(traduzirFrase);
      if (en.every(function (x) { return x !== null; })) return en.join(' ');
    }
    if (verificar) faltando[k] = true;
    return null;
  }
  function pular(el) {
    if (!el) return true;
    if (PULAR[el.nodeName]) return true;
    return !!(el.closest && el.closest('[translate="no"], .notranslate'));
  }
  function traduzirNo(no) {
    var pai = no.parentNode;
    if (!pai || pai.nodeType !== 1 || pular(pai)) return;
    var atual = no.nodeValue;
    var en = traduzir(atual);
    /* texto novo sem tradução: ele mesmo é o original (não volta um texto antigo no PT) */
    if (en === null) { originaisTexto.delete(no); return; }
    var ini = atual.match(/^\s*/)[0], fim = atual.match(/\s*$/)[0];
    var novo = ini + en + fim;
    if (novo === atual) return;
    originaisTexto.set(no, atual);
    no.nodeValue = novo;
  }
  function traduzirAtributos(el) {
    if (el.nodeType !== 1 || pular(el)) return;
    ATRIBUTOS.forEach(function (at) {
      if (!el.hasAttribute(at)) return;
      var atual = el.getAttribute(at);
      var en = traduzir(atual);
      var guardados = originaisAttr.get(el) || {};
      if (en === null || en === atual) { delete guardados[at]; return; }
      guardados[at] = atual;
      originaisAttr.set(el, guardados);
      el.setAttribute(at, en);
    });
  }
  function traduzirArvore(raizNo) {
    if (!raizNo) return;
    if (raizNo.nodeType === 3) { traduzirNo(raizNo); return; }
    if (raizNo.nodeType !== 1 && raizNo.nodeType !== 9 && raizNo.nodeType !== 11) return;
    if (raizNo.nodeType === 1) { if (pular(raizNo)) return; traduzirAtributos(raizNo); }
    var w = document.createTreeWalker(raizNo, NodeFilter.SHOW_TEXT, null);
    var nos = [], n;
    while ((n = w.nextNode())) nos.push(n);
    nos.forEach(traduzirNo);
    if (raizNo.querySelectorAll) {
      Array.prototype.forEach.call(raizNo.querySelectorAll('[alt], [title], [aria-label], [placeholder], [aria-roledescription]'), traduzirAtributos);
    }
  }
  function traduzirTitulo() {
    var en = traduzir(document.title);
    if (en !== null && en !== document.title) { if (tituloOriginal === null) tituloOriginal = document.title; document.title = en; }
  }

  function observar() {
    if (!('MutationObserver' in window)) return;
    observador = new MutationObserver(function (registros) {
      registros.forEach(function (r) {
        if (r.type === 'characterData') traduzirNo(r.target);
        else if (r.type === 'attributes') traduzirAtributos(r.target);
        else Array.prototype.forEach.call(r.addedNodes, traduzirArvore);
      });
      observador.takeRecords();
    });
    observador.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS });
    var t = document.querySelector('title');
    if (t) new MutationObserver(function () { if (ativo) traduzirTitulo(); }).observe(t, { childList: true, characterData: true, subtree: true });
  }

  function aplicarIngles() {
    ativo = true;
    html.lang = 'en';
    html.classList.add('idioma-en');
    traduzirArvore(document.body);
    traduzirTitulo();
    if (!observador) observar(); else observador.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS });
    mostrarBotao('en');
    html.classList.remove('traduzindo');
    IVR.idioma = 'en';
    document.dispatchEvent(new CustomEvent('inclusivr:idioma', { detail: { idioma: 'en' } }));
    if (verificar) setTimeout(function () { console.info('[tradução] textos sem inglês nesta página:', Object.keys(faltando)); }, 2500);
  }
  function voltarPortugues() {
    ativo = false;
    if (observador) observador.disconnect();
    originaisTexto.forEach(function (pt, no) { no.nodeValue = pt; });
    originaisAttr.forEach(function (attrs, el) { Object.keys(attrs).forEach(function (at) { el.setAttribute(at, attrs[at]); }); });
    originaisTexto.clear(); originaisAttr.clear();
    if (tituloOriginal !== null) { document.title = tituloOriginal; tituloOriginal = null; }
    html.lang = 'pt-BR';
    html.classList.remove('idioma-en', 'traduzindo');
    mostrarBotao('pt');
    IVR.idioma = 'pt';
    document.dispatchEvent(new CustomEvent('inclusivr:idioma', { detail: { idioma: 'pt' } }));
  }

  function usarDicionario() {
    var D = window.INCLUSIVR_EN || {};
    dic = D.textos || {}; padroes = D.padroes || [];
    /* os padrões podem traduzir um pedaço do texto (ex.: a legenda depois de "Ampliar:") */
    D.tr = function (x) { var r = traduzir(x); return r === null ? x : r; };
  }
  function carregarDicionario(pronto) {
    if (window.INCLUSIVR_EN) { usarDicionario(); pronto(true); return; }
    var s = document.createElement('script');
    s.src = raiz + 'assets/js/traducao-en.js';
    s.onload = function () { usarDicionario(); pronto(!!window.INCLUSIVR_EN); };
    s.onerror = function () { pronto(false); };
    document.head.appendChild(s);
  }
  function irParaIngles() {
    carregarDicionario(function (ok) {
      if (ok) aplicarIngles();
      else { html.classList.remove('traduzindo', 'idioma-en'); gravar('pt'); }
    });
  }

  IVR.idioma = 'pt';
  IVR.traduzir = function (texto) { return ativo && dic ? (traduzir(texto) || texto) : texto; };

  /* clique no botão EN/PT: troca o idioma sem sair da página */
  botoes.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      if (ativo) { gravar('pt'); voltarPortugues(); }
      else { gravar('en'); irParaIngles(); }
    });
  });

  if (html.classList.contains('idioma-en') || ler() === 'en') irParaIngles();
})();
