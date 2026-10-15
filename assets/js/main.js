/* =============================================================================
   InclusiVR — comportamento geral do site (JavaScript puro, sem dependências)
   O site funciona sem JavaScript: aqui só entram melhorias (links da loja com
   UTM, menu no celular, faixa de campanha, vídeos em LIBRAS, galeria etc.).
   ============================================================================= */
(function () {
  'use strict';

  var C = window.INCLUSIVR_CONFIG || {};
  var html = document.documentElement;
  var raiz = html.getAttribute('data-raiz') || '';
  var IVR = window.InclusiVR = window.InclusiVR || {};
  IVR.config = C;
  IVR.raiz = raiz;
  html.classList.remove('sem-js');
  html.classList.add('js');

  var params;
  try { params = new URLSearchParams(window.location.search); } catch (e) { params = { get: function () { return null; } }; }

  /* modo rascunho: rótulos rosa "A CONFIRMAR" para a revisão da equipe.
     Desligado no site publicado; para ver os rótulos, abra qualquer página com ?rascunho=1 no fim do endereço. */
  var rascunho = !!C.modoRascunho || params.get('rascunho') === '1';
  IVR.rascunho = rascunho;
  if (rascunho) html.classList.add('modo-rascunho');

  /* ---------- armazenamento no navegador (pode falhar: sempre com try/catch) ---------- */
  var guarda = {
    ler: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    gravar: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* sem armazenamento: segue sem lembrar */ } }
  };
  IVR.guarda = guarda;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  IVR.$ = $; IVR.$$ = $$;

  var ICONES = {
    fechar: '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    anterior: '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    proximo: '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    libras: '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="26" height="22" rx="4"/><path d="M13 11.5v9l7.5-4.5z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z"/></svg>'
  };
  IVR.ICONES = ICONES;

  /* =========================================================================
     Links em pré-visualização: fora do domínio oficial (no computador, numa
     prévia), "pasta/" vira "pasta/index.html" para todo link funcionar.
     ========================================================================= */
  var emProducao = (C.dominiosProducao || []).indexOf(window.location.hostname) !== -1;
  IVR.emProducao = emProducao;
  if (!emProducao) {
    $$('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(h) || h.charAt(0) === '/') return;
      var m = h.match(/^([^?#]*)(.*)$/);
      var caminho = m[1], resto = m[2];
      if (caminho === '' && resto) return;
      if (caminho === '' || caminho === '.' || caminho === './') caminho = 'index.html';
      else if (/\/$/.test(caminho)) caminho += 'index.html';
      else if (caminho === '..') caminho = '../index.html';
      a.setAttribute('href', caminho + resto);
    });
  }
  IVR.urlInterna = function (caminho) {
    var url = raiz + caminho;
    if (!emProducao && /\/$/.test(url)) url += 'index.html';
    return url;
  };

  /* =========================================================================
     Movimento: respeita "reduzir movimento" do aparelho.
     Toda animação que começa sozinha dura no máximo 5 segundos e para.
     ========================================================================= */
  var mqReduz = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  IVR.movimentoPermitido = function () { return !mqReduz.matches; };
  function aplicarMovimento() {
    html.classList.toggle('sem-movimento', mqReduz.matches);
    document.dispatchEvent(new CustomEvent('inclusivr:movimento', { detail: { permitido: IVR.movimentoPermitido() } }));
  }
  aplicarMovimento();
  if (mqReduz.addEventListener) mqReduz.addEventListener('change', aplicarMovimento);

  /* =========================================================================
     Menu do celular (padrão "disclosure")
     ========================================================================= */
  var botaoMenu = $('.topo__menu-botao');
  var menu = $('#menu-principal');
  function fecharMenu(devolverFoco) {
    if (!menu || !botaoMenu) return;
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    if (devolverFoco) botaoMenu.focus();
  }
  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', function () {
      var abrir = botaoMenu.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('aberto', abrir);
      botaoMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      if (abrir) { var primeiro = menu.querySelector('a'); if (primeiro) primeiro.focus(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('aberto')) fecharMenu(true);
    });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('aberto') && !e.target.closest('.topo')) fecharMenu(false);
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) fecharMenu(false); });
  }

  /* =========================================================================
     Hero fora da tela: mostra "Comprar o livro" no cabeçalho e a barra do celular
     ========================================================================= */
  var hero = $('[data-hero]');
  var barra = $('.barra-compra');
  if (barra) document.body.classList.add('com-barra-compra');
  if (hero && 'IntersectionObserver' in window) {
    html.classList.add('tem-hero');
    new IntersectionObserver(function (entradas) {
      var fora = !entradas[0].isIntersecting;
      html.classList.toggle('hero-fora', fora);
      if (barra) barra.classList.toggle('visivel', fora);
    }, { rootMargin: '-90px 0px 0px 0px', threshold: 0 }).observe(hero);
  } else if (barra) {
    barra.classList.add('visivel');
  }

  /* =========================================================================
     Campanha (Black Friday e próximas)
     ========================================================================= */
  function campanhaAtiva() {
    var c = C.campanha;
    if (!c || !c.ativa) return false;
    if (params.get('campanha') === 'previa') return true;
    var agora = Date.now(), ini = Date.parse(c.inicio), fim = Date.parse(c.fim);
    return !isNaN(ini) && !isNaN(fim) && agora >= ini && agora <= fim;
  }
  IVR.campanhaAtiva = campanhaAtiva();

  /* =========================================================================
     Loja: links com UTM por botão (a loja registra a origem do pedido)
     ========================================================================= */
  function urlComUtm(base, conteudo) {
    try {
      var u = new URL(base);
      var utm = C.utm || {};
      if (utm.source) u.searchParams.set('utm_source', utm.source);
      if (utm.medium) u.searchParams.set('utm_medium', utm.medium);
      var camp = IVR.campanhaAtiva && C.campanha ? C.campanha.id : utm.campaign;
      if (camp) u.searchParams.set('utm_campaign', camp);
      if (conteudo) u.searchParams.set('utm_content', conteudo);
      return u.toString();
    } catch (e) { return base; }
  }
  function urlLoja(tipo) {
    var L = C.livro || {};
    if (tipo === 'carrinho') return L.urlCarrinho;
    if (tipo === 'inicio') return L.urlLojaInicio;
    return L.destinoBotaoComprar === 'carrinho' ? L.urlCarrinho : L.urlLoja;
  }
  IVR.linkLoja = function (tipo, conteudo) { return urlComUtm(urlLoja(tipo), conteudo); };
  $$('[data-loja]').forEach(function (a) {
    var base = urlLoja(a.getAttribute('data-loja'));
    if (base) a.setAttribute('href', urlComUtm(base, a.getAttribute('data-utm') || 'site'));
  });

  /* app de AR */
  if (C.APP_AR_URL) $$('[data-app-ar]').forEach(function (a) { a.setAttribute('href', C.APP_AR_URL); });

  /* preço */
  var L = C.livro || {};
  var preco = (IVR.campanhaAtiva && C.campanha && C.campanha.preco) ? C.campanha.preco : (L.preco || {});
  $$('[data-preco-bloco]').forEach(function (el) { el.hidden = !L.mostrarPreco; });
  $$('[data-preco-por]').forEach(function (el) { if (preco.por) el.textContent = preco.por; });
  $$('[data-preco-de]').forEach(function (el) { if (preco.de) el.textContent = preco.de; el.hidden = !preco.de || preco.de === preco.por; });
  $$('[data-preco-nota]').forEach(function (el) { if (L.notaPreco) el.textContent = L.notaPreco; });
  $$('[data-idade]').forEach(function (el) { if (L.idade) el.textContent = L.idade; });

  /* faixa de campanha */
  var faixa = $('.faixa-campanha');
  if (faixa && IVR.campanhaAtiva) {
    var c = C.campanha;
    var chave = 'inclusivr:faixa-fechada:' + c.id;
    if (guarda.ler(chave) !== '1' || params.get('campanha') === 'previa') {
      var texto = faixa.querySelector('.faixa-campanha__texto');
      var link = c.link === 'loja' || c.link === 'carrinho' ? IVR.linkLoja(c.link, 'faixa-campanha') : c.link;
      texto.innerHTML = '';
      var s = document.createElement('span'); s.textContent = c.texto + ' ';
      texto.appendChild(s);
      if (c.cupom) { var cu = document.createElement('strong'); cu.textContent = 'Cupom: ' + c.cupom + ' '; texto.appendChild(cu); }
      if (link) { var a = document.createElement('a'); a.href = link; a.textContent = c.textoLink || 'Ver oferta'; texto.appendChild(a); }
      faixa.hidden = false;
      faixa.querySelector('.faixa-campanha__fechar').addEventListener('click', function () {
        faixa.hidden = true; guarda.gravar(chave, '1');
      });
    }
  }

  /* =========================================================================
     Contato e redes vindos do config
     ========================================================================= */
  var K = C.contato || {};
  function canal(tipo) { return $$('[data-canal="' + tipo + '"]'); }
  $$('[data-contato="email"]').forEach(function (a) { if (K.email) { a.href = 'mailto:' + K.email; var v = a.querySelector('[data-valor]'); if (v) v.textContent = K.email; } });
  if (K.whatsapp) {
    var wa = 'https://wa.me/' + K.whatsapp + (K.whatsappMensagem ? '?text=' + encodeURIComponent(K.whatsappMensagem) : '');
    $$('[data-contato="whatsapp"]').forEach(function (a) { a.href = wa; var v = a.querySelector('[data-valor]'); if (v && K.whatsappExibicao) v.textContent = K.whatsappExibicao; });
  } else { canal('whatsapp').forEach(function (el) { el.hidden = true; }); }
  if (K.instagram) {
    $$('[data-contato="instagram"]').forEach(function (a) { a.href = K.instagram; var v = a.querySelector('[data-valor]'); if (v && K.instagramExibicao) v.textContent = K.instagramExibicao; });
  } else { canal('instagram').forEach(function (el) { el.hidden = true; }); }
  canal('videochamada').forEach(function (el) {
    if (K.videochamadaLibras) { el.hidden = false; var a = el.querySelector('a'); if (a) a.href = K.videochamadaLibras; }
    else el.hidden = true;
  });
  $$('[data-beneficio-newsletter]').forEach(function (el) {
    if (C.beneficioNewsletter) { el.hidden = false; var t = el.querySelector('[data-valor]') || el; t.textContent = C.beneficioNewsletter; }
    else el.hidden = true;
  });

  /* =========================================================================
     Lojas de aplicativos: "Em breve" sem link até o app ser publicado
     ========================================================================= */
  var lojas = (C.app && C.app.lojas) || {};
  $$('[data-loja-app]').forEach(function (el) {
    var info = lojas[el.getAttribute('data-loja-app')] || {};
    if (!info.url) return;
    var a = document.createElement('a');
    a.className = 'loja-app';
    a.href = info.url;
    if (info.selo) {
      var img = document.createElement('img');
      img.src = raiz + info.selo;
      img.alt = el.getAttribute('data-loja-app') === 'appStore' ? 'Baixar na App Store' : 'Disponível no Google Play';
      a.appendChild(img);
    } else {
      a.innerHTML = el.innerHTML;
      var l1 = a.querySelector('.loja-app__linha1'); if (l1) l1.textContent = 'Baixar em';
    }
    el.replaceWith(a);
  });

  /* =========================================================================
     Avisos curtos (anunciados por leitor de tela)
     ========================================================================= */
  var avisoAtual = null;
  IVR.aviso = function (op) {
    if (avisoAtual) { avisoAtual.remove(); avisoAtual = null; }
    var el = document.createElement('div');
    el.className = 'aviso';
    el.setAttribute('role', 'status');
    var cartas = '';
    (op.imagens || []).forEach(function (src) { cartas += '<img src="' + src + '" alt="">'; });
    el.innerHTML = (cartas ? '<div class="aviso__cartas">' + cartas + '</div>' : '<span></span>') +
      '<p class="aviso__texto">' + (op.titulo ? '<strong></strong>' : '') + '<span></span></p>' +
      '<button type="button" class="icone-botao" aria-label="Fechar aviso">' + ICONES.fechar + '</button>';
    if (op.titulo) el.querySelector('strong').textContent = op.titulo;
    el.querySelector('.aviso__texto span').textContent = op.texto || '';
    document.body.appendChild(el);
    avisoAtual = el;
    var fechar = function () { if (el.parentNode) el.remove(); if (avisoAtual === el) avisoAtual = null; };
    el.querySelector('button').addEventListener('click', fechar);
    var t = setTimeout(fechar, op.tempo || 6000);
    el.addEventListener('focusin', function () { clearTimeout(t); });
    return el;
  };

  /* =========================================================================
     Janela de LIBRAS: o botão só aparece onde houver vídeo configurado
     ========================================================================= */
  var videos = C.videosLibras || {};
  var janela = null, gatilhoJanela = null;
  function fecharJanela() {
    if (!janela) return;
    janela.remove(); janela = null;
    if (gatilhoJanela) gatilhoJanela.focus();
  }
  function abrirJanela(chave, gatilho) {
    var v = videos[chave];
    if (!v) return;
    fecharJanela();
    gatilhoJanela = gatilho;
    janela = document.createElement('aside');
    janela.className = 'janela-libras';
    janela.setAttribute('role', 'dialog');
    janela.setAttribute('aria-labelledby', 'janela-libras-titulo');
    var corpo;
    if (v.youtube) {
      corpo = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtube) + '?autoplay=1&mute=1&cc_load_policy=1&rel=0" title="Vídeo em LIBRAS" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    } else {
      corpo = '<video controls playsinline muted autoplay preload="metadata"' + (v.poster ? ' poster="' + raiz + v.poster + '"' : '') + '><source src="' + raiz + v.src + '">' +
        (v.legendas ? '<track kind="captions" srclang="pt-BR" label="Português" src="' + raiz + v.legendas + '" default>' : '') + '</video>';
    }
    janela.innerHTML = '<div class="janela-libras__topo"><p class="janela-libras__titulo" id="janela-libras-titulo">Em LIBRAS</p>' +
      '<button type="button" class="icone-botao" aria-label="Fechar vídeo em LIBRAS">' + ICONES.fechar + '</button></div>' + corpo;
    document.body.appendChild(janela);
    janela.querySelector('button').addEventListener('click', fecharJanela);
    janela.querySelector('button').focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && janela) fecharJanela(); });
  $$('[data-libras]').forEach(function (el) {
    var chave = el.getAttribute('data-libras');
    if (videos[chave]) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'botao-libras';
      b.innerHTML = ICONES.libras + '<span>Ver em LIBRAS</span>';
      b.addEventListener('click', function () { abrirJanela(chave, b); });
      el.appendChild(b);
    } else if (rascunho) {
      var p = document.createElement('span');
      p.className = 'vaga-libras';
      p.setAttribute('data-pendente', 'vídeo em LIBRAS "' + chave + '" (roteiro no PENDENCIAS.md)');
      el.appendChild(p);
    }
  });
  /* vídeo do Recado da Aia, ao lado do balão */
  $$('[data-recado-video]').forEach(function (el) {
    var v = videos['recado-aia'];
    if (!v) return;
    el.hidden = false;
    el.closest('.recado') && el.closest('.recado').classList.add('recado--com-video');
    el.innerHTML = v.youtube
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtube) + '?cc_load_policy=1&rel=0" title="Recado da Aia em LIBRAS" loading="lazy" allowfullscreen style="width:100%;aspect-ratio:3/4;border:0;border-radius:16px"></iframe>'
      : '<video controls playsinline muted preload="none"' + (v.poster ? ' poster="' + raiz + v.poster + '"' : '') + '><source src="' + raiz + v.src + '">' + (v.legendas ? '<track kind="captions" srclang="pt-BR" label="Português" src="' + raiz + v.legendas + '" default>' : '') + '</video>';
  });

  /* =========================================================================
     Galeria de fotos e vídeos + ampliação acessível (diálogo)
     ========================================================================= */
  function criarItemGaleria(m) {
    var li = document.createElement('li');
    li.className = 'galeria__item';
    var thumb = m.miniatura || m.poster || m.src || '';
    var ehVideo = m.tipo === 'video';
    li.innerHTML = '<figure><button type="button" class="galeria__botao"><img alt="" loading="lazy" decoding="async" width="400" height="300">' +
      (ehVideo ? '<span class="galeria__play"><span>' + ICONES.play + '</span></span>' : '') + '</button><figcaption></figcaption></figure>';
    var b = li.querySelector('button'), img = li.querySelector('img');
    if (thumb) img.src = (/^https?:/.test(thumb) ? '' : raiz) + thumb;
    else if (m.youtube) img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(m.youtube) + '/hqdefault.jpg';
    img.alt = m.alt || '';
    b.setAttribute('data-tipo', ehVideo ? 'video' : 'imagem');
    if (m.src) b.setAttribute('data-src', (/^https?:/.test(m.src) ? '' : raiz) + m.src);
    if (m.youtube) b.setAttribute('data-youtube', m.youtube);
    if (m.legendas) b.setAttribute('data-legendas', raiz + m.legendas);
    b.setAttribute('data-alt', m.alt || '');
    b.setAttribute('aria-label', (ehVideo ? 'Assistir: ' : 'Ampliar: ') + (m.legenda || m.alt || 'mídia'));
    li.querySelector('figcaption').textContent = m.legenda || '';
    return li;
  }
  var caixa = null, caixaItens = [], caixaIndice = 0, caixaGatilho = null;
  function montarCaixa() {
    caixa = document.createElement('dialog');
    caixa.className = 'lightbox';
    caixa.setAttribute('aria-label', 'Foto ou vídeo ampliado');
    caixa.innerHTML = '<div class="lightbox__miolo"><div class="lightbox__topo"><p class="lightbox__contador" aria-live="polite"></p>' +
      '<button type="button" class="icone-botao" data-fechar aria-label="Fechar">' + ICONES.fechar + '</button></div>' +
      '<div class="lightbox__palco"></div>' +
      '<div class="lightbox__base"><button type="button" class="icone-botao" data-anterior aria-label="Anterior">' + ICONES.anterior + '</button>' +
      '<p class="lightbox__legenda"></p><button type="button" class="icone-botao" data-proximo aria-label="Próximo">' + ICONES.proximo + '</button></div></div>';
    document.body.appendChild(caixa);
    caixa.querySelector('[data-fechar]').addEventListener('click', function () { caixa.close(); });
    caixa.querySelector('[data-anterior]').addEventListener('click', function () { mostrarNaCaixa(caixaIndice - 1); });
    caixa.querySelector('[data-proximo]').addEventListener('click', function () { mostrarNaCaixa(caixaIndice + 1); });
    caixa.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); mostrarNaCaixa(caixaIndice - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mostrarNaCaixa(caixaIndice + 1); }
    });
    caixa.addEventListener('close', function () {
      caixa.querySelector('.lightbox__palco').innerHTML = '';
      if (caixaGatilho) caixaGatilho.focus();
    });
  }
  function mostrarNaCaixa(i) {
    var n = caixaItens.length;
    caixaIndice = (i + n) % n;
    var b = caixaItens[caixaIndice];
    var palco = caixa.querySelector('.lightbox__palco');
    palco.innerHTML = '';
    var tipo = b.getAttribute('data-tipo');
    if (tipo === 'video') {
      if (b.getAttribute('data-youtube')) {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(b.getAttribute('data-youtube')) + '?cc_load_policy=1&rel=0';
        f.title = b.getAttribute('data-alt') || 'Vídeo';
        f.allow = 'encrypted-media; picture-in-picture';
        f.allowFullscreen = true;
        palco.appendChild(f);
      } else {
        var v = document.createElement('video');
        v.controls = true; v.playsInline = true; v.preload = 'metadata';
        v.src = b.getAttribute('data-src');
        if (b.getAttribute('data-legendas')) {
          var t = document.createElement('track');
          t.kind = 'captions'; t.srclang = 'pt-BR'; t.label = 'Português'; t.src = b.getAttribute('data-legendas'); t.default = true;
          v.appendChild(t);
        }
        palco.appendChild(v);
      }
    } else {
      var img = document.createElement('img');
      img.src = b.getAttribute('data-src');
      img.alt = b.getAttribute('data-alt') || '';
      palco.appendChild(img);
    }
    var fig = b.closest('figure');
    caixa.querySelector('.lightbox__legenda').textContent = fig && fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent : '';
    caixa.querySelector('.lightbox__contador').textContent = (caixaIndice + 1) + ' de ' + n;
    var multi = n > 1;
    caixa.querySelector('[data-anterior]').hidden = !multi;
    caixa.querySelector('[data-proximo]').hidden = !multi;
  }
  $$('[data-galeria]').forEach(function (g) {
    var extras = (C.midias || {})[g.getAttribute('data-galeria')] || [];
    extras.forEach(function (m) { g.appendChild(criarItemGaleria(m)); });
    /* fora do rascunho, uma galeria só com vagas some (com a seção marcada) */
    if (!rascunho && !g.querySelector('.galeria__item:not([data-pendente])')) {
      var secao = g.closest('[data-secao-galeria]');
      (secao || g).hidden = true;
    }
    g.addEventListener('click', function (e) {
      var b = e.target.closest('.galeria__botao');
      if (!b || typeof HTMLDialogElement === 'undefined') return;
      e.preventDefault();
      if (!caixa) montarCaixa();
      caixaItens = $$('.galeria__botao', g);
      caixaGatilho = b;
      caixa.showModal();
      mostrarNaCaixa(caixaItens.indexOf(b));
    });
  });

  /* =========================================================================
     Marcadores de AR: ver em tela cheia para escanear
     ========================================================================= */
  var telaCheia = null, telaGatilho = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tela-cheia]');
    if (!b || typeof HTMLDialogElement === 'undefined') return;
    e.preventDefault();
    if (!telaCheia) {
      telaCheia = document.createElement('dialog');
      telaCheia.className = 'tela-cheia';
      telaCheia.setAttribute('aria-label', 'Imagem em tela cheia para escanear com o app');
      telaCheia.innerHTML = '<div class="tela-cheia__miolo"><div class="tela-cheia__topo"><p class="tela-cheia__dica">Aumente o brilho da tela. Aponte o app para a imagem, a uns 30 cm.</p>' +
        '<button type="button" class="icone-botao" aria-label="Fechar tela cheia">' + ICONES.fechar + '</button></div><div class="tela-cheia__imagem"><img alt=""></div></div>';
      document.body.appendChild(telaCheia);
      telaCheia.querySelector('button').addEventListener('click', function () { telaCheia.close(); });
      telaCheia.addEventListener('close', function () {
        if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
        if (telaGatilho) telaGatilho.focus();
      });
    }
    telaGatilho = b;
    var img = telaCheia.querySelector('img');
    img.src = b.getAttribute('data-tela-cheia');
    img.alt = b.getAttribute('data-alt') || '';
    telaCheia.showModal();
    if (telaCheia.requestFullscreen) telaCheia.requestFullscreen().catch(function () {});
  });

  /* =========================================================================
     Novidades do blog (lidas de blog/posts.json; sem JS fica a lista do HTML)
     ========================================================================= */
  $$('[data-posts]').forEach(function (lista) {
    var qtd = parseInt(lista.getAttribute('data-posts'), 10) || 100;
    if (!window.fetch) return;
    fetch(raiz + 'blog/posts.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function (posts) {
      if (!Array.isArray(posts) || !posts.length) return;
      lista.innerHTML = '';
      posts.slice(0, qtd).forEach(function (p) {
        var li = document.createElement('li');
        var url = IVR.urlInterna('blog/' + p.pasta + '/');
        var nivel = lista.getAttribute('data-nivel') === 'h2' ? 'h2' : 'h3';
        li.innerHTML = '<article class="post-cartao"><img alt="" loading="lazy" decoding="async" width="640" height="360">' +
          '<div class="post-cartao__miolo"><p class="data"></p><' + nivel + '><a></a></' + nivel + '><p class="resumo"></p></div></article>';
        var img = li.querySelector('img');
        img.src = raiz + p.capa;
        img.alt = p.capaAlt || '';
        li.querySelector('.data').textContent = p.dataExibicao || '';
        var a = li.querySelector(nivel + ' a'); a.href = url; a.textContent = p.titulo;
        li.querySelector('.resumo').textContent = p.resumo || '';
        lista.appendChild(li);
      });
    }).catch(function () { /* mantém a lista estática do HTML */ });
  });

  /* =========================================================================
     Compartilhar, copiar link, imprimir
     ========================================================================= */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copiar-link]');
    if (b) {
      e.preventDefault();
      var url = b.getAttribute('data-copiar-link') || window.location.href;
      var ok = function () { IVR.aviso({ titulo: 'Link copiado', texto: 'Agora é só colar onde quiser.', tempo: 3500 }); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, function () { window.prompt('Copie o link:', url); });
      else window.prompt('Copie o link:', url);
    }
    var p = e.target.closest('[data-imprimir]');
    if (p) { e.preventDefault(); window.print(); }
  });

  /* =========================================================================
     Moldura HUD: linhas finas com chanfro a 45° que entram pelas bordas
     ========================================================================= */
  function caminhosHUD(tipo, w, h) {
    var d = [];
    var estreito = w < 700;
    var y1, x0, xr, bx;
    if (tipo === 'hero' || tipo === 'topo') {
      /* no celular a linha corre rente à borda, para nunca cruzar o texto */
      y1 = estreito ? 10 : Math.max(18, Math.min(46, h * 0.07));
      x0 = estreito ? w * 0.52 : Math.max(60, w * 0.27);
      xr = w - Math.min(150, w * 0.12);
      d.push('M' + (x0 - y1 - 2) + ' -2L' + x0 + ' ' + y1 + 'L' + xr + ' ' + y1 + 'L' + (w + 2) + ' ' + (y1 + (w + 2 - xr)));
    }
    if ((tipo === 'hero' || tipo === 'base') && !estreito) {
      bx = Math.max(14, Math.min(30, w * 0.022));
      var yIni = h * 0.58, yFim = h - Math.min(90, h * 0.12);
      d.push('M-2 ' + (yIni - bx - 2) + 'L' + bx + ' ' + yIni + 'L' + bx + ' ' + yFim + 'L' + (bx + (h + 2 - yFim)) + ' ' + (h + 2));
    }
    if (tipo === 'canto') {
      var c = Math.min(40, w * 0.08);
      if (estreito) c = 10;
      d.push('M' + (w * 0.55) + ' -2L' + (w * 0.55 + c) + ' ' + c + 'L' + (w - c) + ' ' + c + 'L' + (w + 2) + ' ' + (c * 2 + 2));
      if (!estreito) d.push('M-2 ' + (h * 0.7) + 'L' + c + ' ' + (h * 0.7 + c) + 'L' + c + ' ' + (h + 2));
    }
    return d;
  }
  function desenharHUD(svg) {
    var r = svg.getBoundingClientRect();
    var w = Math.round(r.width), h = Math.round(r.height);
    if (!w || !h) return;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('preserveAspectRatio', 'none');
    var ps = caminhosHUD(svg.getAttribute('data-hud'), w, h);
    svg.innerHTML = ps.map(function (p) { return '<path d="' + p + '"/>'; }).join('');
    if (svg.hasAttribute('data-hud-animar') && !svg.__animado && IVR.movimentoPermitido()) {
      svg.__animado = true;
      $$('path', svg).forEach(function (p) {
        var comp = Math.ceil(p.getTotalLength ? p.getTotalLength() : 2000);
        p.style.setProperty('--comp', comp);
        p.classList.add('desenha');
      });
    }
  }
  var hudSvgs = $$('svg[data-hud]');
  hudSvgs.forEach(desenharHUD);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (ents) { ents.forEach(function (en) { desenharHUD(en.target); }); });
    hudSvgs.forEach(function (s) { ro.observe(s); });
  } else {
    window.addEventListener('resize', function () { hudSvgs.forEach(desenharHUD); });
  }

  /* =========================================================================
     Modelos 3D dos animais (só quando houver arquivo .glb no config)
     ========================================================================= */
  var modelos = C.modelos3d || {};
  var mvCarregado = false;
  $$('[data-modelo-3d]').forEach(function (el) {
    var animal = el.getAttribute('data-modelo-3d');
    if (!modelos[animal]) return;
    if (!mvCarregado) {
      mvCarregado = true;
      var s = document.createElement('script');
      s.type = 'module';
      s.src = raiz + 'assets/vendor/model-viewer-4.3.1.min.js';
      document.head.appendChild(s);
    }
    var nome = el.getAttribute('data-nome') || animal;
    var mv = document.createElement('model-viewer');
    mv.setAttribute('src', raiz + modelos[animal]);
    mv.setAttribute('alt', 'Modelo 3D: ' + nome + '. Arraste para girar e use dois dedos para aproximar.');
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('touch-action', 'pan-y');
    mv.setAttribute('ar', '');
    mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    mv.innerHTML = '<button slot="ar-button" class="botao botao--ciano botao--sm" style="position:absolute;right:12px;bottom:12px">Ver no seu espaço</button>';
    el.innerHTML = '';
    el.appendChild(mv);
  });

  /* =========================================================================
     Opcionais: VLibras e analytics sem cookies (desligados por padrão)
     ========================================================================= */
  if (C.recursos && C.recursos.vlibras) {
    var vw = document.createElement('div');
    vw.setAttribute('vw', ''); vw.className = 'enabled';
    vw.innerHTML = '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
    document.body.appendChild(vw);
    var sv = document.createElement('script');
    sv.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    sv.onload = function () { if (window.VLibras) new window.VLibras.Widget('https://vlibras.gov.br/app'); };
    document.body.appendChild(sv);
  }
  if (C.analytics && C.analytics.provedor) {
    var an = document.createElement('script');
    an.defer = true;
    if (C.analytics.provedor === 'plausible') { an.src = 'https://plausible.io/js/script.js'; an.setAttribute('data-domain', C.analytics.dominio || 'inclusivr.com.br'); }
    else if (C.analytics.script) { an.src = C.analytics.script; if (C.analytics.id) an.setAttribute('data-website-id', C.analytics.id); }
    if (an.src) document.head.appendChild(an);
  }

  /* ano no rodapé */
  $$('[data-ano]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
