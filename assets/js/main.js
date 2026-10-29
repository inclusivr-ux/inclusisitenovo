/* =============================================================================
   InclusiVR — comportamento geral do site (JavaScript puro, sem dependências)
   O site funciona sem JavaScript: aqui só entram melhorias (links da loja com
   UTM, menu no celular, campanha, vídeos em LIBRAS, galeria etc.).
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

  /* =========================================================================
     Trocar de aba (página) = começar do topo. Pedido da equipe: em alguns
     aparelhos a página nova abria no meio, e clicar na aba da página em que a
     pessoa já está não subia (o navegador trata como "recarregar").
     Voltar/avançar e links com # continuam como antes.
     ========================================================================= */
  (function voltarAoTopo() {
    function topoJa() {
      try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      /* quando o site roda dentro de uma moldura (prévia), tenta subir também a página de fora */
      if (window.parent !== window && document.documentElement.scrollIntoView) {
        var raizEl = document.documentElement, antes = raizEl.style.scrollPaddingTop;
        raizEl.style.scrollPaddingTop = '0px';
        try { raizEl.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) { /* sem acesso: segue */ }
        raizEl.style.scrollPaddingTop = antes;
      }
    }
    IVR.topo = topoJa;
    /* 1) clicar na aba da página atual: sobe até o topo, sem recarregar */
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, window.location.href); } catch (er) { return; }
      if (url.origin !== window.location.origin || url.hash) return;
      var semIndex = function (u) { return u.pathname.replace(/index\.html$/, '') + u.search; };
      if (semIndex(url) !== semIndex(window.location)) return;
      e.preventDefault();
      var suave = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      try { window.scrollTo({ top: 0, left: 0, behavior: suave ? 'smooth' : 'instant' }); } catch (er) { window.scrollTo(0, 0); }
      var alvo = document.getElementById('conteudo') || document.querySelector('main');
      if (alvo) { if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1'); try { alvo.focus({ preventScroll: true }); } catch (er) { /* segue */ } }
    });
    /* 2) página nova: começa do topo (sem rolagem suave, para nada interromper) */
    if (window.location.hash) return;
    var tipo = '';
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      tipo = nav ? nav.type : (performance.navigation && performance.navigation.type === 2 ? 'back_forward' : 'navigate');
    } catch (e) { tipo = 'navigate'; }
    if (tipo === 'back_forward' || tipo === 'reload') return;
    var mexeu = false;
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) {
      window.addEventListener(ev, function () { mexeu = true; }, { once: true, passive: true });
    });
    var talvez = function () { if (!mexeu && (window.scrollY > 0 || window.parent !== window)) topoJa(); };
    topoJa();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', talvez);
    window.addEventListener('load', function () { talvez(); setTimeout(talvez, 150); setTimeout(talvez, 600); });
    window.addEventListener('pageshow', function (ev) { if (!ev.persisted) talvez(); });
  })();

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
  var camp = IVR.campanhaAtiva ? (C.campanha || {}) : null;
  var preco = (camp && camp.preco) ? camp.preco : (L.preco || {});
  $$('[data-preco-bloco]').forEach(function (el) { el.hidden = !L.mostrarPreco; });
  $$('[data-preco-por]').forEach(function (el) { if (preco.por) el.textContent = preco.por; });
  $$('[data-preco-de]').forEach(function (el) {
    if (preco.de) el.textContent = preco.de;
    var esconder = !preco.de || preco.de === preco.por;
    el.hidden = esconder;
    /* sem "de", some também o rótulo "De"/"por" lido pelo leitor de tela */
    var envolve = el.closest('.preco__de'); if (envolve) envolve.hidden = esconder;
    var bloco = el.closest('[data-preco-bloco]');
    var rotulo = bloco && bloco.querySelector('.preco__por .visualmente-oculto'); if (rotulo) rotulo.hidden = esconder;
  });
  $$('[data-preco-nota]').forEach(function (el) { var n = (camp && camp.notaPreco) || L.notaPreco; if (n) el.textContent = n; });
  $$('[data-idade]').forEach(function (el) { if (L.idade) el.textContent = L.idade; });

  /* arte temporária da campanha: selo nos botões de compra, placa sobre a arte do livro
     e o bloco do cupom (com o marca-páginas de presente) perto do preço */
  function comCupom(el, texto, cupom) {
    /* "{cupom}" no texto do config vira o código em destaque */
    el.textContent = '';
    String(texto).split('{cupom}').forEach(function (parte, i) {
      if (i > 0) { var b = document.createElement('strong'); b.className = 'cupom'; b.textContent = cupom || ''; el.appendChild(b); }
      if (parte) el.appendChild(document.createTextNode(parte));
    });
  }
  IVR.comCupom = comCupom;
  if (camp) {
    html.classList.add('campanha-ativa');
    $$('[data-campanha-nome]').forEach(function (el) { if (camp.nome) el.textContent = camp.nome; });
    $$('[data-campanha-preco]').forEach(function (el) { if (preco.por) el.textContent = preco.por; });
    $$('[data-campanha-cupom]').forEach(function (el) { if (camp.cupom) el.textContent = camp.cupom; });
    $$('[data-campanha-com-cupom]').forEach(function (el) { el.hidden = !camp.cupom; });
    $$('[data-campanha-chamada]').forEach(function (el) { if (camp.chamada) comCupom(el, camp.chamada, camp.cupom); });
    $$('[data-campanha-artista]').forEach(function (el) { if (camp.cupomHistoria) comCupom(el, camp.cupomHistoria, camp.cupom); else el.hidden = true; });
    $$('[data-campanha-brinde]').forEach(function (el) {
      var t = el.querySelector('[data-campanha-brinde-texto]');
      if (camp.brinde && t) t.textContent = camp.brinde; else el.hidden = true;
    });
    $$('[data-campanha-selo], [data-campanha-placa], [data-campanha-bloco]').forEach(function (el) { el.hidden = false; });
    /* caixa do botão do topo do início: abaixo (padrão) ou no canto de cima, como nos outros botões */
    if (camp.seloTopoInicio === 'acima') $$('.botao--selo-abaixo').forEach(function (el) { el.classList.remove('botao--selo-abaixo'); });
  }

  /* Natal: a frase das datas de corte da entrega aparece perto do preço quando a equipe preencher o config */
  (function () {
    var N = C.natal || {};
    if (!N.texto) return;
    var agora = Date.now(), ini = Date.parse(N.inicio || ''), fim = Date.parse(N.fim || '');
    var noPeriodo = (isNaN(ini) || agora >= ini) && (isNaN(fim) || agora <= fim);
    if (!noPeriodo && params.get('campanha') !== 'previa') return;
    $$('[data-natal]').forEach(function (el) { el.textContent = N.texto; el.hidden = false; });
  })();

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
  /* assuntos do WhatsApp com mensagem pronta */
  $$('[data-wa]').forEach(function (a) {
    var msg = (K.whatsappAssuntos || {})[a.getAttribute('data-wa')] || K.whatsappMensagem || '';
    if (K.whatsapp) a.href = 'https://wa.me/' + K.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');
  });
  /* outras redes: só aparecem com o link preenchido */
  $$('[data-rede]').forEach(function (el) {
    var url = K[el.getAttribute('data-rede')];
    var a = el.tagName === 'A' ? el : el.querySelector('a');
    if (url && a) { a.href = url; el.hidden = false; } else el.hidden = true;
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
     Vídeos: os controles são os do próprio navegador (funcionam também sem
     JavaScript). Aqui só entra um botão grande de play por cima da capa.
     Nada toca sozinho: o som só sai quando a pessoa aperta o play.
     ========================================================================= */
  $$('[data-video]').forEach(function (v) {
    var b = v.parentNode.querySelector('[data-video-play]');
    if (!b) return;
    v.removeAttribute('controls');
    b.hidden = false;
    var tocar = function () {
      v.setAttribute('controls', '');
      b.hidden = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* o navegador pediu outro toque: os controles já estão à vista */ });
    };
    b.addEventListener('click', tocar);
    v.addEventListener('click', function () { if (!v.hasAttribute('controls')) tocar(); });
    v.addEventListener('play', function () {
      b.hidden = true; v.setAttribute('controls', '');
      /* um vídeo por vez */
      $$('[data-video]').forEach(function (o) { if (o !== v && !o.paused) o.pause(); });
    });
    v.addEventListener('ended', function () { b.hidden = false; });
  });

  /* =========================================================================
     Vídeo curto que toca sozinho, sem som, só enquanto está na tela (ex.: o
     trecho do SinalizaAção VR no início). Tem botão de pausa (WCAG 2.2.2).
     Com "reduzir movimento" ou economia de dados ligada, só toca no clique.
     Sem JavaScript, fica o player do navegador com a capa.
     ========================================================================= */
  $$('[data-video-auto]').forEach(function (caixa) {
    var v = caixa.querySelector('video');
    var b = caixa.querySelector('[data-video-auto-botao]');
    if (!v || !b) return;
    v.removeAttribute('controls');
    v.muted = true;
    b.hidden = false;
    var pausadoPelaPessoa = false;
    var economia = !!(navigator.connection && navigator.connection.saveData);
    var podeSozinho = function () { return IVR.movimentoPermitido() && !economia && !pausadoPelaPessoa; };
    var mostrar = function () {
      caixa.classList.toggle('video-auto--parado', v.paused);
      b.setAttribute('aria-label', v.paused ? 'Tocar o vídeo' : 'Pausar o vídeo');
    };
    var tocar = function () { var p = v.play(); if (p && p.catch) p.catch(mostrar); };
    b.addEventListener('click', function () {
      if (v.paused) { pausadoPelaPessoa = false; tocar(); } else { pausadoPelaPessoa = true; v.pause(); }
    });
    v.addEventListener('click', function () { b.click(); });
    v.addEventListener('play', mostrar);
    v.addEventListener('pause', mostrar);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) {
        if (ents[0].isIntersecting) { if (podeSozinho()) tocar(); }
        else if (!v.paused) v.pause();
      }, { threshold: .35 }).observe(caixa);
    }
    document.addEventListener('inclusivr:movimento', function (e) { if (!e.detail.permitido && !v.paused) v.pause(); });
    mostrar();
  });

  /* =========================================================================
     Vídeos e imagens extras de uma seção (config.js, midias). Ex.: os GIFs e
     vídeos curtos do "Espelho Mágico da Aia" na página do SinalizaAção VR.
     ========================================================================= */
  var MIDIAS = C.midias || {};
  $$('[data-midias]').forEach(function (lista) {
    var itens = MIDIAS[lista.getAttribute('data-midias')] || [];
    itens.forEach(function (m) {
      if (!m || !m.src) return;
      var li = document.createElement('li');
      var fig = document.createElement('figure');
      if (m.tipo === 'video') {
        var q = document.createElement('div'); q.className = 'clipe__quadro';
        var v = document.createElement('video');
        v.className = 'clipe__video'; v.controls = true; v.playsInline = true; v.preload = 'none';
        v.setAttribute('playsinline', '');
        if (m.capa) v.poster = raiz + m.capa;
        v.src = raiz + m.src;
        if (m.legenda) v.setAttribute('aria-label', 'Vídeo: ' + m.legenda);
        q.appendChild(v); fig.appendChild(q);
      } else {
        var img = document.createElement('img');
        img.src = raiz + m.src; img.alt = m.alt || ''; img.loading = 'lazy'; img.decoding = 'async';
        fig.appendChild(img);
      }
      if (m.legenda) { var cap = document.createElement('figcaption'); cap.textContent = m.legenda; fig.appendChild(cap); }
      li.appendChild(fig); lista.appendChild(li);
    });
  });

  /* =========================================================================
     Últimos posts do Instagram (lista manual no config; sem lista, fica o convite)
     ========================================================================= */
  $$('[data-instagram-posts]').forEach(function (lista) {
    var posts = C.instagramPosts || [];
    if (!posts.length) return;
    lista.innerHTML = '';
    posts.slice(0, 6).forEach(function (p) {
      if (!p || !p.imagem || !p.link) return;
      var li = document.createElement('li');
      li.innerHTML = '<a class="insta__post" href=""><img alt="" loading="lazy" decoding="async" width="400" height="400"><span class="visualmente-oculto"></span></a>';
      li.querySelector('a').href = p.link;
      li.querySelector('img').src = (/^https?:/.test(p.imagem) ? '' : raiz) + p.imagem;
      li.querySelector('.visualmente-oculto').textContent = 'Post no Instagram: ' + (p.texto || 'abrir no Instagram');
      lista.appendChild(li);
    });
    var box = lista.closest('[data-instagram]');
    if (box) box.classList.add('insta--posts');
  });

  /* =========================================================================
     Novidades do blog (lidas de blog/posts.json; sem JS fica a lista do HTML)
     ========================================================================= */
  /* ordem por data, do mais recente para o mais antigo (campo "data" do posts.json:
     "AAAA-MM-DD", "AAAA-MM" ou só "AAAA"). Data incompleta conta como o fim do período;
     empate mantém a ordem do arquivo. */
  function chaveData(p) { return (String((p && p.data) || '') + '-99-99').slice(0, 10); }
  function porData(posts) {
    return posts.map(function (p, i) { return { p: p, i: i }; }).sort(function (a, b) {
      var ka = chaveData(a.p), kb = chaveData(b.p);
      return ka < kb ? 1 : ka > kb ? -1 : a.i - b.i;
    }).map(function (x) { return x.p; });
  }
  IVR.postsPorData = porData;
  $$('[data-posts]').forEach(function (lista) {
    var qtd = parseInt(lista.getAttribute('data-posts'), 10) || 100;
    if (!window.fetch) return;
    fetch(raiz + 'blog/posts.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function (posts) {
      if (!Array.isArray(posts) || !posts.length) return;
      posts = porData(posts);
      lista.innerHTML = '';
      var destaque = lista.classList.contains('posts--blog') || lista.classList.contains('posts--destaque');
      /* blog: mostra até "postsPorPagina" (config.js); com mais posts, aparece o botão "Ver publicações mais antigas" */
      var porPagina = (C.blog && C.blog.postsPorPagina) || 9;
      var paginar = lista.classList.contains('posts--blog') && posts.length > porPagina;
      posts.slice(0, qtd).forEach(function (p, i) {
        var li = document.createElement('li');
        var url = IVR.urlInterna('blog/' + p.pasta + '/');
        var nivel = lista.getAttribute('data-nivel') === 'h2' ? 'h2' : 'h3';
        li.innerHTML = '<article class="post-cartao"><img alt="" loading="lazy" decoding="async" width="640" height="360">' +
          '<div class="post-cartao__miolo"><p class="data"></p><' + nivel + '><a></a></' + nivel + '><p class="resumo"></p></div></article>';
        var img = li.querySelector('img');
        /* o primeiro cartão é maior: usa a capa grande */
        img.src = raiz + (i === 0 && destaque ? String(p.capa).replace(/-640\.webp$/, '-1280.webp') : p.capa);
        img.alt = '';
        if (p.capaFoco) img.style.objectPosition = p.capaFoco;
        li.querySelector('.data').textContent = p.dataExibicao || '';
        var a = li.querySelector(nivel + ' a'); a.href = url; a.textContent = p.titulo;
        li.querySelector('.resumo').textContent = p.resumo || '';
        if (paginar && i >= porPagina) li.hidden = true;
        lista.appendChild(li);
      });
      if (paginar) {
        var mais = document.createElement('p');
        mais.className = 'mais-antigos';
        mais.innerHTML = '<button type="button" class="botao botao--contorno">Ver publicações mais antigas</button>';
        lista.parentNode.insertBefore(mais, lista.nextSibling);
        mais.querySelector('button').addEventListener('click', function () {
          var ocultos = $$('li[hidden]', lista);
          ocultos.slice(0, porPagina).forEach(function (li) { li.hidden = false; });
          var primeiro = ocultos[0] && ocultos[0].querySelector('a');
          if (primeiro) primeiro.focus();
          if (ocultos.length <= porPagina) mais.remove();
        });
      }
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
      /* a pergunta do navegador não fica na página: traduz aqui quando o site está em inglês */
      var pedir = function () { window.prompt(IVR.traduzir ? IVR.traduzir('Copie o link:') : 'Copie o link:', url); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, pedir);
      else pedir();
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
    /* a linha da esquerda só aparece quando sobra margem ao lado do texto (no tablet ela encostava no texto) */
    if ((tipo === 'hero' && w >= 1000) || (tipo === 'base' && !estreito)) {
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
