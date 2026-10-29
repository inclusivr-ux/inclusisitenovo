/* InclusiVR — idioma escolhido (roda antes de a página aparecer)
   Se a pessoa escolheu o inglês (botão EN) ou abriu a página com ?lang=en, a página
   fica escondida por um instante, até o assets/js/traducao.js trocar os textos.
   Assim o português não "pisca" antes do inglês. Se algo der errado, a página
   aparece sozinha em até 2,5 s (regra no base.css). */
(function () {
  'use strict';
  var html = document.documentElement;
  if (html.lang === 'en') return; /* a página /en/ já é em inglês */
  var escolha = null;
  try {
    var m = /[?&]lang=(en|pt)\b/i.exec(window.location.search);
    if (m) {
      escolha = m[1].toLowerCase();
      window.localStorage.setItem('inclusivr:idioma', escolha);
    } else {
      escolha = window.localStorage.getItem('inclusivr:idioma');
    }
  } catch (e) { escolha = null; }
  if (escolha === 'en') html.classList.add('idioma-en', 'traduzindo');
})();
