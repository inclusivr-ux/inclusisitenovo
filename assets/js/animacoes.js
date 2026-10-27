/* =============================================================================
   InclusiVR — animações e magia por ação
   - A abelha do livro é a única animação de personagem (pedido da equipe).
   - O holograma do topo da página inicial fica parado. Com
     recursos.aberturaTopo: true no config.js, volta a abertura (a mão se projeta,
     as órbitas abrem e o Seu Zé e a Maga Aia chegam, em menos de 4 s) e o brilho
     ao passar o mouse.
   - A abelha do livro (desenho do Igor) passa voando por algumas seções:
     cada voo dura até 5 s e são no máximo 3 por página.
   - Faíscas quadradas quando a pessoa age (formulário enviado, jogo vencido).
   - Mini-jogo: os 5 animais do livro escondidos pelo site. Quem acha os cinco
     ganha 10% de desconto (print da tela + 1 vez por CPF, conferido pela equipe).
     Durante a campanha (Black November), o prêmio leva ao cupom da campanha.
   Toda animação que começa sozinha dura até 5 s e para. Tudo desliga com
   "reduzir movimento" do aparelho.
   ============================================================================= */
(function () {
  'use strict';
  var IVR = window.InclusiVR || {};
  var C = IVR.config || window.INCLUSIVR_CONFIG || {};
  var R = C.recursos || {};
  var raiz = IVR.raiz || '';
  var html = document.documentElement;
  var $$ = IVR.$$ || function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var permitido = IVR.movimentoPermitido || function () { return true; };
  var guarda = IVR.guarda || { ler: function () { return null; }, gravar: function () {} };
  var CORES = ['#58e6e6', '#74d0d8', '#a6f3ee', '#31f5ff'];

  function aleatorio(min, max) { return min + Math.random() * (max - min); }
  function quandoVisivel(el, limiar, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting && en.intersectionRatio >= limiar) { obs.disconnect(); fn(); } });
    }, { threshold: [0, limiar] });
    obs.observe(el);
  }

  /* ---------- faíscas quadradas ---------- */
  function criarFaiscas(camada, n, op) {
    op = op || {};
    for (var i = 0; i < n; i++) {
      var f = document.createElement('i');
      f.className = 'faisca';
      f.style.left = aleatorio(op.xMin || 5, op.xMax || 95) + '%';
      f.style.top = aleatorio(op.yMin || 35, op.yMax || 95) + '%';
      f.style.setProperty('--tam', aleatorio(4, 10).toFixed(1) + 'px');
      f.style.setProperty('--dx', aleatorio(-40, 40).toFixed(0) + 'px');
      f.style.setProperty('--dy', aleatorio(-150, -60).toFixed(0) + 'px');
      f.style.setProperty('--giro', aleatorio(-180, 180).toFixed(0) + 'deg');
      f.style.setProperty('--atraso', ((op.atraso || 0) + aleatorio(0, op.espalhar || .5)).toFixed(2) + 's');
      f.style.setProperty('--dur', aleatorio(.9, 1.7).toFixed(2) + 's');
      f.style.setProperty('--cor', CORES[i % CORES.length]);
      camada.appendChild(f);
    }
  }
  IVR.faiscas = function (alvo, op) {
    if (!alvo || !permitido()) return;
    op = op || {};
    var r = alvo.getBoundingClientRect();
    var camada = document.createElement('div');
    camada.className = 'faiscas';
    camada.setAttribute('aria-hidden', 'true');
    camada.style.cssText = 'position:fixed;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;z-index:95';
    criarFaiscas(camada, op.quantidade || 12, op);
    document.body.appendChild(camada);
    setTimeout(function () { camada.remove(); }, 2600);
  };

  /* entrada suave do texto do topo */
  requestAnimationFrame(function () { html.classList.add('pronto'); });

  /* ---------- o holograma do topo da página inicial ----------
     Parado por padrão (só a abelha se mexe no site). A abertura e o brilho voltam
     com recursos.aberturaTopo: true no config.js. */
  var holo = R.aberturaTopo === true ? document.querySelector('[data-holo]') : null;
  if (holo) {
    var camadaH = holo.querySelector('.holo__faiscas');
    var sats = $$('[data-holo-sat]', holo);
    var acabou = false, ultimoBrilho = 0, quadro = 0;
    var posSat = function (g, ang) {
      var t = ang * Math.PI / 180;
      var x = +g.getAttribute('data-cx') + +g.getAttribute('data-rx') * Math.cos(t);
      var y = +g.getAttribute('data-cy') + +g.getAttribute('data-ry') * Math.sin(t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
    };
    /* os satélites andam pela órbita (só na abertura e no brilho) e param no lugar de sempre.
       balanco: em vez de chegar, vão um pouco para trás e voltam (sem salto) */
    var andarSats = function (dur, balanco) {
      if (!sats.length || !permitido() || !window.requestAnimationFrame) return;
      cancelAnimationFrame(quadro);
      var t0 = null;
      var passo = function (agora) {
        if (t0 === null) t0 = agora;
        var k = Math.min(1, (agora - t0) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        sats.forEach(function (g) {
          var ate = +g.getAttribute('data-ate'), de = +g.getAttribute('data-de');
          posSat(g, balanco ? ate + (de - ate) * balanco * Math.sin(Math.PI * k) : de + (ate - de) * e);
        });
        if (k < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    };
    var pararSats = function () { cancelAnimationFrame(quadro); sats.forEach(function (g) { posSat(g, +g.getAttribute('data-ate')); }); };
    var concluirHolo = function () {
      acabou = true;
      holo.classList.remove('holo--prep', 'holo--ativo');
    };
    var faiscasHolo = function (atraso) {
      if (!camadaH || !permitido()) return;
      camadaH.innerHTML = '';
      criarFaiscas(camadaH, 16, { atraso: atraso || 0, espalhar: 1, xMin: 8, xMax: 92, yMin: 40, yMax: 100 });
      setTimeout(function () { camadaH.innerHTML = ''; }, 3600);
    };
    if (permitido()) {
      holo.classList.add('holo--prep');
      var abrirHolo = function () {
        if (!permitido()) { concluirHolo(); pararSats(); return; }
        holo.classList.add('holo--ativo');
        andarSats(2600);
        faiscasHolo(1.2);
        setTimeout(concluirHolo, 3000);
      };
      var maoImg = holo.querySelector('.holo__mao img');
      var comecarH = function () { requestAnimationFrame(function () { setTimeout(abrirHolo, 120); }); };
      if (maoImg && !maoImg.complete) { maoImg.addEventListener('load', comecarH, { once: true }); maoImg.addEventListener('error', comecarH, { once: true }); setTimeout(function () { if (!acabou && !holo.classList.contains('holo--ativo')) abrirHolo(); }, 1800); }
      else comecarH();
    }
    /* passar o mouse ou tocar: um brilho atravessa a mão (curto, no máximo a cada 3 s) */
    var brilharHolo = function () {
      if (!acabou || !permitido() || Date.now() - ultimoBrilho < 3000) return;
      ultimoBrilho = Date.now();
      holo.classList.remove('holo--brilha'); void holo.offsetWidth;
      holo.classList.add('holo--brilha');
      andarSats(1200, .3);
      faiscasHolo(.15);
      setTimeout(function () { holo.classList.remove('holo--brilha'); }, 1400);
    };
    holo.addEventListener('mouseenter', brilharHolo);
    holo.addEventListener('click', brilharHolo);
    document.addEventListener('inclusivr:movimento', function (e) { if (!e.detail.permitido) { concluirHolo(); pararSats(); holo.classList.remove('holo--brilha'); } });
  }

  /* ---------- a abelha do livro voando ---------- */
  var faixas = $$('[data-abelha]');
  if (faixas.length && R.abelha !== false && 'IntersectionObserver' in window) {
    var voando = null, ultimoVoo = 0, voos = 0, MAX_VOOS = 3, INTERVALO = 9000;
    var visiveisAbelha = [];
    var obsA = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        var k = visiveisAbelha.indexOf(en.target);
        if (en.isIntersecting && en.intersectionRatio >= .5) { if (k === -1) visiveisAbelha.push(en.target); }
        else if (k !== -1) visiveisAbelha.splice(k, 1);
      });
      tentarVoo();
    }, { threshold: [0, .5, 1] });
    faixas.forEach(function (f) { obsA.observe(f); });
    var tentarVoo = function () {
      if (voando || !permitido() || document.hidden || voos >= MAX_VOOS || !visiveisAbelha.length) return;
      if (Date.now() - ultimoVoo < (voos ? INTERVALO : 1800)) return;
      voar(visiveisAbelha[Math.floor(Math.random() * visiveisAbelha.length)]);
    };
    setInterval(tentarVoo, 1500);
    var voar = function (faixa) {
      voos++; ultimoVoo = Date.now();
      var largura = faixa.clientWidth, altura = faixa.clientHeight;
      if (largura < 200 || altura < 40) { voando = null; return; }
      var abelha = document.createElement('div');
      abelha.className = 'abelha';
      abelha.setAttribute('aria-hidden', 'true');
      abelha.innerHTML = '<img class="abelha__asas" alt="" src="' + raiz + 'assets/img/personagens/abelha-asas.webp">' +
        '<img class="abelha__corpo" alt="" src="' + raiz + 'assets/img/personagens/abelha-corpo.webp">';
      faixa.appendChild(abelha);
      voando = abelha;
      var tam = abelha.offsetWidth || 50;
      var praDireita = Math.random() < .55;
      var x0 = praDireita ? -tam - 10 : largura + 10, x1 = praDireita ? largura + 10 : -tam - 10;
      /* a faixa é o respiro do alto da seção: o voo fica todo dentro dela */
      var folga = Math.max(0, altura - tam * 1.05);
      var amp = Math.min(aleatorio(10, 22), folga / 3), ondas = aleatorio(1.6, 2.4);
      var yBase = Math.min(folga, Math.max(0, folga / 2 + aleatorio(-folga / 6, folga / 6)));
      var dur = Math.round(Math.min(4800, Math.max(3400, largura * 3.6)));
      var quadros = [];
      for (var i = 0; i <= 30; i++) {
        var t = i / 30;
        var x = x0 + (x1 - x0) * t;
        var y = Math.max(0, Math.min(folga, yBase + Math.sin(t * Math.PI * 2 * ondas) * amp));
        var incl = Math.cos(t * Math.PI * 2 * ondas) * 10;
        /* a abelha olha para onde voa: a arte original olha para a esquerda */
        quadros.push({ transform: 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + incl.toFixed(1) + 'deg) scaleX(' + (praDireita ? -1 : 1) + ')' });
      }
      var anim = abelha.animate(quadros, { duration: dur, easing: 'linear', fill: 'forwards' });
      anim.onfinish = function () { abelha.remove(); if (voando === abelha) voando = null; ultimoVoo = Date.now(); };
    };
    document.addEventListener('inclusivr:movimento', function (e) { if (!e.detail.permitido && voando) { voando.remove(); voando = null; } });
    document.addEventListener('visibilitychange', function () { if (document.hidden && voando) { voando.remove(); voando = null; } });
  }

  /* ---------- mini-jogo: os 5 animais escondidos ---------- */
  var ANIMAIS = {
    abelha: { nome: 'abelha', artigo: 'a', letra: 'A', lugar: 'na página inicial' },
    elefante: { nome: 'elefante', artigo: 'o', letra: 'E', lugar: 'na página inicial' },
    iguana: { nome: 'iguana', artigo: 'a', letra: 'I', lugar: 'na página do livro' },
    onca: { nome: 'onça', artigo: 'a', letra: 'O', lugar: 'na página do livro' },
    urso: { nome: 'urso', artigo: 'o', letra: 'U', lugar: 'na página de apps' }
  };
  var ORDEM = ['abelha', 'elefante', 'iguana', 'onca', 'urso'];
  var ligado = R.animaisEscondidos !== false;
  var escondidos = $$('[data-animal-escondido]');
  var caca = document.querySelector('[data-caca]');
  var achados = [];
  try { achados = JSON.parse(guarda.ler('inclusivr:animais') || '[]') || []; } catch (e) { achados = []; }
  achados = achados.filter(function (a) { return ORDEM.indexOf(a) !== -1; });
  var premioInfo = null;
  try { premioInfo = JSON.parse(guarda.ler('inclusivr:animais-premio') || 'null'); } catch (e) { premioInfo = null; }

  /* textos do prêmio: o que estiver entre *asteriscos* fica em destaque; {cupom} vira o código */
  var campP = IVR.campanhaAtiva && C.campanha ? C.campanha : null;
  var premioCamp = campP && (R.recompensaAnimais || {}).campanha ? (R.recompensaAnimais || {}).campanha : null;
  function textoCupom(t) { return String(t || '').split('{cupom}').join(campP && campP.cupom ? campP.cupom : ''); }
  function escrever(el, texto) {
    if (!el) return;
    el.textContent = '';
    textoCupom(texto).split('*').forEach(function (parte, i) {
      if (!parte) return;
      if (i % 2) { var b = document.createElement('strong'); b.textContent = parte; el.appendChild(b); }
      else el.appendChild(document.createTextNode(parte));
    });
  }
  function premioTexto(chave) {
    var P = R.recompensaAnimais || {};
    if (premioCamp && premioCamp[chave] !== undefined) return textoCupom(premioCamp[chave]);
    return P[chave] || '';
  }

  function atualizarCaca() {
    if (!caca) return;
    var n = achados.length;
    $$('[data-caca-animal]', caca).forEach(function (li) {
      var a = li.getAttribute('data-caca-animal');
      var ok = achados.indexOf(a) !== -1;
      li.classList.toggle('achado', ok);
      var s = li.querySelector('.visualmente-oculto');
      if (s) s.textContent = ANIMAIS[a].nome.charAt(0).toUpperCase() + ANIMAIS[a].nome.slice(1) + (ok ? ': encontrado' : ': ainda escondido');
    });
    var prog = caca.querySelector('[data-caca-progresso]');
    if (prog) prog.textContent = n === 0 ? 'Nenhum encontrado ainda.' : n === 5 ? 'Você encontrou todos!' : 'Você já encontrou ' + n + ' de 5.';
    var bt = caca.querySelector('[data-premio-abrir]');
    if (bt) bt.hidden = n < 5;
  }

  /* o prêmio: janela para tirar print e mandar para a equipe */
  var dialogo = null;
  function dataExibicao(iso) {
    try { var d = new Date(iso); return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
    catch (e) { return ''; }
  }
  function abrirPremio(gatilho) {
    var P = R.recompensaAnimais || {};
    var K = C.contato || {};
    if (!premioInfo) { premioInfo = { data: new Date().toISOString(), codigo: 'BICHOS-' + Math.random().toString(36).slice(2, 7).toUpperCase() }; guarda.gravar('inclusivr:animais-premio', JSON.stringify(premioInfo)); }
    if (typeof HTMLDialogElement === 'undefined') {
      IVR.aviso && IVR.aviso({ titulo: premioTexto('titulo') || 'Você encontrou os 5 animais!', texto: premioTexto('texto') + ' ' + premioTexto('instrucoes'), tempo: 15000 });
      return;
    }
    if (!dialogo) {
      dialogo = document.createElement('dialog');
      dialogo.className = 'premio';
      dialogo.setAttribute('aria-labelledby', 'premio-titulo');
      var cartas = ORDEM.map(function (a) { return '<img src="' + raiz + 'assets/img/cartas/animal-' + a + '.webp" alt="" width="300" height="440">'; }).join('');
      dialogo.innerHTML = '<div class="premio__miolo">' +
        '<button type="button" class="icone-botao premio__fechar" data-fechar aria-label="Fechar">' + ((IVR.ICONES || {}).fechar || '×') + '</button>' +
        '<p class="cartela cartela--rosa premio__selo">MISSÃO CUMPRIDA!</p>' +
        '<h2 id="premio-titulo"></h2>' +
        '<div class="premio__cartas" aria-hidden="true">' + cartas + '</div>' +
        '<p class="premio__desconto"></p>' +
        '<p class="premio__texto"></p>' +
        '<p class="premio__instrucoes"></p>' +
        '<p class="premio__codigo"><span>Código</span> <strong data-codigo></strong> <span data-data></span></p>' +
        '<div class="acoes"><a class="botao botao--roxo" data-premio-whats target="_blank" rel="noopener">Enviar pelo WhatsApp</a>' +
        '<a class="botao botao--roxo" data-premio-loja hidden>Comprar o livro</a>' +
        '<button type="button" class="botao botao--contorno" data-fechar>Fechar</button></div></div>';
      document.body.appendChild(dialogo);
      $$('[data-fechar]', dialogo).forEach(function (b) { b.addEventListener('click', function () { dialogo.close(); }); });
      dialogo.addEventListener('click', function (e) { if (e.target === dialogo) dialogo.close(); });
      dialogo.addEventListener('close', function () { if (dialogo.__gatilho && dialogo.__gatilho.focus) dialogo.__gatilho.focus(); });
    }
    dialogo.querySelector('#premio-titulo').textContent = premioTexto('titulo') || 'Você encontrou os 5 animais!';
    dialogo.querySelector('.premio__desconto').textContent = premioTexto('desconto') || '10% de desconto';
    dialogo.querySelector('.premio__texto').textContent = premioTexto('texto');
    dialogo.querySelector('.premio__instrucoes').textContent = premioTexto('instrucoes');
    var codigo = dialogo.querySelector('.premio__codigo');
    var wa = dialogo.querySelector('[data-premio-whats]');
    var loja = dialogo.querySelector('[data-premio-loja]');
    if (premioCamp) {
      /* em campanha: o cupom é o da campanha; não precisa de print nem de código */
      codigo.hidden = true; wa.hidden = true;
      loja.href = IVR.linkLoja ? IVR.linkLoja('livro', 'premio-animais') : '#';
      loja.hidden = false;
    } else {
      codigo.hidden = false; loja.hidden = true;
      dialogo.querySelector('[data-codigo]').textContent = premioInfo.codigo;
      dialogo.querySelector('[data-data]').textContent = dataExibicao(premioInfo.data);
      if (K.whatsapp) {
        wa.href = 'https://wa.me/' + K.whatsapp + '?text=' + encodeURIComponent((P.mensagemWhatsapp || '') + ' Código: ' + premioInfo.codigo);
        wa.hidden = false;
      } else wa.hidden = true;
    }
    dialogo.__gatilho = gatilho || document.activeElement;
    dialogo.showModal();
    if (permitido()) IVR.faiscas(dialogo.querySelector('.premio__cartas'), { quantidade: 26, espalhar: 1 });
  }
  IVR.abrirPremio = abrirPremio;

  if (ligado && (escondidos.length || caca)) {
    html.classList.add('animais-ativos');
    if (caca) {
      caca.hidden = false;
      var chamada = premioCamp ? premioCamp.chamada : (R.recompensaAnimais || {}).chamada;
      if (chamada) escrever(caca.querySelector('[data-caca-oferta]'), chamada);
      atualizarCaca();
      var btP = caca.querySelector('[data-premio-abrir]');
      if (btP) btP.addEventListener('click', function () { abrirPremio(btP); });
    }
    escondidos.forEach(function (b) {
      var a = b.getAttribute('data-animal-escondido');
      var rotular = function () { var inf = ANIMAIS[a]; if (inf) b.setAttribute('aria-label', 'Você já encontrou ' + inf.artigo + ' ' + inf.nome + '.'); };
      if (achados.indexOf(a) !== -1) { b.classList.add('encontrado'); rotular(); }
      /* quando aparece na tela pela primeira vez, o bichinho se mexe um pouco (fica mais fácil de achar) */
      if (achados.indexOf(a) === -1) {
        quandoVisivel(b, .9, function () {
          if (!permitido() || b.classList.contains('encontrado')) return;
          setTimeout(function () { b.classList.add('chama'); setTimeout(function () { b.classList.remove('chama'); }, 1700); }, 600);
        });
      }
      b.addEventListener('click', function () {
        var info = ANIMAIS[a];
        if (!info) return;
        var novo = achados.indexOf(a) === -1;
        if (novo) { achados.push(a); guarda.gravar('inclusivr:animais', JSON.stringify(achados)); }
        b.classList.add('encontrado');
        rotular();
        IVR.faiscas(b, { quantidade: 10 });
        atualizarCaca();
        var faltam = ORDEM.filter(function (x) { return achados.indexOf(x) === -1; });
        var dica = '';
        if (faltam.length) {
          var lugares = [];
          faltam.forEach(function (x) { if (lugares.indexOf(ANIMAIS[x].lugar) === -1) lugares.push(ANIMAIS[x].lugar); });
          dica = (faltam.length === 1 ? 'Falta 1 animal. ' : 'Faltam ' + faltam.length + ' animais. ') + 'Dica: procure ' + lugares.join(' e ') + '.';
        }
        if (IVR.aviso) IVR.aviso({
          titulo: 'Você encontrou ' + info.artigo + ' ' + info.nome + '!',
          texto: 'A runa da letra ' + info.letra + ' acendeu. ' + (faltam.length ? dica : 'Esse era o último!'),
          imagens: [raiz + 'assets/img/cartas/animal-' + a + '.webp'],
          tempo: 8000
        });
        if (!faltam.length && novo) setTimeout(function () { abrirPremio(b); }, 1400);
      });
    });
  }
})();
