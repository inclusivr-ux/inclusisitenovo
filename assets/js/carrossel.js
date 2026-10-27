/* =============================================================================
   InclusiVR — galeria de fotos que passa sozinha (Quem somos, na página inicial)
   - Troca de foto a cada 6 s, com um esmaecer.
   - Botão de pausar/continuar (exigência de acessibilidade para conteúdo que se
     move sozinho por mais de 5 s); também pausa ao passar o mouse ou ao focar.
   - Com "reduzir movimento" no aparelho, não troca sozinha: a pessoa usa as setas.
   - Sem JavaScript, as fotos ficam numa faixa com rolagem lateral.
   ============================================================================= */
(function () {
  'use strict';
  var IVR = window.InclusiVR || {};
  var permitido = IVR.movimentoPermitido || function () { return true; };
  var TEMPO = 6000;

  Array.prototype.slice.call(document.querySelectorAll('[data-carrossel]')).forEach(function (raiz) {
    var lista = raiz.querySelector('.carrossel__lista');
    var itens = Array.prototype.slice.call(raiz.querySelectorAll('.carrossel__item'));
    var pontos = Array.prototype.slice.call(raiz.querySelectorAll('[data-carrossel-ir]'));
    var controles = raiz.querySelector('.carrossel__controles');
    var pausa = raiz.querySelector('[data-carrossel-pausa]');
    if (!lista || itens.length < 2) return;
    if (controles) controles.hidden = false;

    var atual = 0, timer = null;
    var parado = !permitido();          /* a pessoa pausou (ou o aparelho pede menos movimento) */
    var segurando = false;              /* mouse em cima ou foco dentro: pausa temporária */
    var visivel = false;

    function mostrar(n, daPessoa) {
      atual = (n + itens.length) % itens.length;
      itens.forEach(function (li, i) {
        var ok = i === atual;
        li.classList.toggle('ativo', ok);
        if (ok) li.removeAttribute('aria-hidden'); else li.setAttribute('aria-hidden', 'true');
        /* a próxima foto já começa a carregar */
        if (i === (atual + 1) % itens.length) { var im = li.querySelector('img'); if (im && im.loading === 'lazy') im.loading = 'eager'; }
      });
      pontos.forEach(function (b, i) { if (i === atual) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      /* quando a pessoa troca a foto, o leitor de tela anuncia a legenda */
      lista.setAttribute('aria-live', daPessoa ? 'polite' : 'off');
    }
    function parar() { if (timer) { clearInterval(timer); timer = null; } }
    function rodar() {
      parar();
      if (parado || segurando || !visivel || document.hidden || !permitido()) return;
      timer = setInterval(function () { mostrar(atual + 1, false); }, TEMPO);
    }
    function atualizarPausa() {
      raiz.classList.toggle('carrossel--parado', parado);
      if (pausa) pausa.setAttribute('aria-label', parado ? 'Continuar a troca das fotos' : 'Pausar a troca das fotos');
    }

    if (pausa) pausa.addEventListener('click', function () { parado = !parado; atualizarPausa(); rodar(); });
    var ant = raiz.querySelector('[data-carrossel-anterior]');
    var prox = raiz.querySelector('[data-carrossel-proxima]');
    if (ant) ant.addEventListener('click', function () { mostrar(atual - 1, true); rodar(); });
    if (prox) prox.addEventListener('click', function () { mostrar(atual + 1, true); rodar(); });
    pontos.forEach(function (b) { b.addEventListener('click', function () { mostrar(+b.getAttribute('data-carrossel-ir'), true); rodar(); }); });

    raiz.addEventListener('mouseenter', function () { segurando = true; parar(); });
    raiz.addEventListener('mouseleave', function () { segurando = raiz.contains(document.activeElement); rodar(); });
    raiz.addEventListener('focusin', function () { segurando = true; parar(); });
    raiz.addEventListener('focusout', function (e) { if (!raiz.contains(e.relatedTarget)) { segurando = false; rodar(); } });
    document.addEventListener('visibilitychange', rodar);
    document.addEventListener('inclusivr:movimento', function (e) { if (!e.detail.permitido) { parado = true; atualizarPausa(); } rodar(); });

    /* só troca enquanto a galeria está na tela */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) { visivel = ents[0].isIntersecting; rodar(); }, { threshold: .35 }).observe(raiz);
    } else { visivel = true; }

    atualizarPausa();
    mostrar(0, false);
    rodar();
  });
})();
