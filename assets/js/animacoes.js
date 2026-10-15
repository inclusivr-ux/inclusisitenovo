/* =============================================================================
   InclusiVR — animações e magia por ação
   - O salto (entrada da página inicial): a runa acende, faíscas sobem e o
     animal salta do livro para o celular. Uma vez só, em até ~2,5 s.
   - Faíscas quadradas quando a pessoa age (formulário enviado, jogo vencido).
   - Aia e Seu Zé aparecem de vez em quando (no máximo um por vez, até 4 s).
   - Os 5 animais do livro escondidos pelo site (opcional, no config).
   O palco do rodapé (Seu Zé e o elefante) fica em personagens.js.
   Toda animação que começa sozinha dura até 5 s e para. Tudo desliga com
   "reduzir movimento" do aparelho.
   ============================================================================= */
(function () {
  'use strict';
  var IVR = window.InclusiVR || {};
  var C = IVR.config || window.INCLUSIVR_CONFIG || {};
  var raiz = IVR.raiz || '';
  var html = document.documentElement;
  var $$ = IVR.$$ || function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var permitido = IVR.movimentoPermitido || function () { return true; };
  var CORES = ['#58e6e6', '#74d0d8', '#a6f3ee', '#31f5ff'];

  function aleatorio(min, max) { return min + Math.random() * (max - min); }

  /* ---------- faíscas quadradas ---------- */
  function criarFaiscas(camada, n, op) {
    op = op || {};
    for (var i = 0; i < n; i++) {
      var f = document.createElement('i');
      f.className = 'faisca';
      f.style.left = aleatorio(op.xMin || 5, op.xMax || 95) + '%';
      f.style.top = aleatorio(op.yMin || 35, op.yMax || 95) + '%';
      var tam = aleatorio(4, 10);
      f.style.setProperty('--tam', tam.toFixed(1) + 'px');
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

  /* ---------- o salto (página inicial) ---------- */
  var salto = document.querySelector('[data-salto]');
  function concluirSalto() {
    salto.classList.remove('salto--preparado', 'salto--ativo');
    salto.classList.add('salto--final');
    if (permitido()) salto.classList.add('salto--flutua');
  }
  if (salto) {
    if (!permitido()) {
      salto.classList.add('salto--final');
      html.classList.add('salto-pronto');
    } else {
      salto.classList.add('salto--preparado');
      var imgs = $$('img', salto);
      var esperas = imgs.map(function (img) {
        if (img.complete) return Promise.resolve();
        return new Promise(function (ok) { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); });
      });
      var limite = new Promise(function (ok) { setTimeout(ok, 1400); });
      Promise.race([Promise.all(esperas), limite]).then(function () {
        requestAnimationFrame(function () {
          html.classList.add('salto-pronto');
          if (!permitido()) { concluirSalto(); return; }
          salto.classList.add('salto--ativo');
          var camada = salto.querySelector('.salto__faiscas');
          if (camada) {
            criarFaiscas(camada, 16, { atraso: .25, espalhar: 1.1, yMin: 40, yMax: 100 });
            setTimeout(function () { camada.innerHTML = ''; }, 3600);
          }
          setTimeout(concluirSalto, 2300);
        });
      });
    }
    document.addEventListener('inclusivr:movimento', function (e) {
      if (!e.detail.permitido) { salto.classList.remove('salto--flutua'); concluirSalto(); salto.classList.remove('salto--flutua'); }
      else if (salto.classList.contains('salto--final')) salto.classList.add('salto--flutua');
    });
  } else {
    html.classList.add('salto-pronto');
  }

  /* ---------- Aia e Seu Zé procurando os animais ---------- */
  var pontos = $$('[data-aparicao]');
  var personagensLigados = !(C.recursos && C.recursos.personagens === false);
  if (pontos.length && personagensLigados && 'IntersectionObserver' in window) {
    var ativo = null, ultimo = 0, contagem = 0;
    var INTERVALO = 9000, MAXIMO = 3;
    var visiveis = [];
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        var i = visiveis.indexOf(en.target);
        if (en.isIntersecting && en.intersectionRatio >= .6) { if (i === -1) visiveis.push(en.target); tentar(); }
        else if (i !== -1) visiveis.splice(i, 1);
      });
    }, { threshold: [0, .6, 1] });
    pontos.forEach(function (p) { obs.observe(p); });

    var tentar = function () {
      if (ativo || !permitido() || contagem >= MAXIMO || !visiveis.length) return;
      if (Date.now() - ultimo < INTERVALO) return;
      if (contagem > 0 && Math.random() < .3) { ultimo = Date.now() - INTERVALO / 2; return; }
      aparecer(visiveis[Math.floor(Math.random() * visiveis.length)]);
    };
    setInterval(tentar, 2500);

    var aparecer = function (ponto) {
      contagem++; ultimo = Date.now();
      var tipo = ponto.getAttribute('data-aparicao');
      var cruzar = ponto.classList.contains('ponto-aparicao--cruzar');
      var el = document.createElement('div');
      el.className = 'aparicao' + (ponto.hasAttribute('data-espelhar') ? ' aparicao--espelhada' : '');
      el.setAttribute('aria-hidden', 'true');
      var entrar = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('entrando'); }); }); };
      var dur = cruzar ? 3600 : Math.round(aleatorio(2200, 3800));
      if (cruzar) ponto.style.setProperty('--dur-cruzar', dur + 'ms');
      if (cruzar && IVR.personagens) {
        /* na travessia, o Seu Zé articulado anda de verdade (pernas, chapéu e binóculo) */
        var boneco = document.createElement('div');
        boneco.className = 'cruzador anda';
        boneco.innerHTML = IVR.personagens.ze('bolso');
        el.appendChild(boneco);
        ponto.appendChild(el);
        ativo = el;
        entrar();
      } else {
        var img = new Image();
        img.alt = '';
        img.decoding = 'async';
        img.src = raiz + 'assets/img/personagens/' + tipo + '.svg';
        el.appendChild(img);
        ponto.appendChild(el);
        ativo = el;
        if (img.complete) entrar(); else img.addEventListener('load', entrar, { once: true });
      }
      setTimeout(function () {
        el.classList.add('saindo');
        setTimeout(function () { el.remove(); if (ativo === el) ativo = null; ultimo = Date.now(); }, cruzar ? 50 : 520);
      }, dur);
    };
    document.addEventListener('inclusivr:movimento', function (e) {
      if (!e.detail.permitido && ativo) { ativo.remove(); ativo = null; }
    });
  }

  /* ---------- os 5 animais escondidos ---------- */
  var ANIMAIS = {
    abelha: { nome: 'abelha', artigo: 'a', letra: 'A' },
    elefante: { nome: 'elefante', artigo: 'o', letra: 'E' },
    iguana: { nome: 'iguana', artigo: 'a', letra: 'I' },
    onca: { nome: 'onça', artigo: 'a', letra: 'O' },
    urso: { nome: 'urso', artigo: 'o', letra: 'U' }
  };
  var escondidos = $$('[data-animal-escondido]');
  if (escondidos.length && C.recursos && C.recursos.animaisEscondidos) {
    html.classList.add('animais-ativos');
    var guarda = IVR.guarda || { ler: function () { return null; }, gravar: function () {} };
    var achados = [];
    try { achados = JSON.parse(guarda.ler('inclusivr:animais') || '[]') || []; } catch (e) { achados = []; }
    escondidos.forEach(function (b) {
      var a = b.getAttribute('data-animal-escondido');
      if (achados.indexOf(a) !== -1) b.classList.add('encontrado');
      b.addEventListener('click', function () {
        var info = ANIMAIS[a];
        if (!info) return;
        var novo = achados.indexOf(a) === -1;
        if (novo) { achados.push(a); guarda.gravar('inclusivr:animais', JSON.stringify(achados)); }
        b.classList.add('encontrado');
        IVR.faiscas(b, { quantidade: 10 });
        var faltam = 5 - achados.length;
        IVR.aviso({
          titulo: 'Você encontrou ' + info.artigo + ' ' + info.nome + '!',
          texto: 'A runa da letra ' + info.letra + ' acendeu. ' + (faltam > 0 ? (faltam === 1 ? 'Falta 1 animal escondido no site.' : 'Faltam ' + faltam + ' animais escondidos no site.') : ''),
          imagens: [raiz + 'assets/img/cartas/animal-' + a + '.webp', raiz + 'assets/img/cartas/sinal-' + a + '.webp'],
          tempo: 7000
        });
        if (faltam === 0 && novo) {
          var r = (C.recursos && C.recursos.recompensaAnimais) || {};
          setTimeout(function () {
            IVR.aviso({ titulo: r.titulo || 'Você encontrou os 5 animais!', texto: (r.texto || '') + (r.cupom ? ' Cupom: ' + r.cupom : ''), tempo: 12000 });
            IVR.faiscas(b, { quantidade: 24, espalhar: 1 });
          }, 7200);
        }
      });
    });
  }
})();
