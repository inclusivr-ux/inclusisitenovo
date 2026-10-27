/* =============================================================================
   InclusiVR — minijogos grátis com as cartas do livro (página /apps/jogos/)
   1. Memória das runas   2. Qual é o sinal?   3. As vogais fugiram!
   Usa só os sinais que já estão nas cartas do livro (vogais e 5 animais).
   Jogável com toque, mouse e teclado. Retorno com palavra + ícone (nunca só cor).
   As descrições em texto dos sinais são PROVISÓRIAS: revisão do especialista
   em LIBRAS da equipe (Fauston). Para corrigir, edite os textos "sinal:" abaixo.
   ============================================================================= */
(function () {
  'use strict';
  var IVR = window.InclusiVR || {};
  var raiz = IVR.raiz || '';
  var permitido = IVR.movimentoPermitido || function () { return true; };
  var faiscas = function (alvo, op) { if (IVR.faiscas) IVR.faiscas(alvo, op); };

  /* ---------- as cartas (frente = letra ou animal; verso = sinal) ---------- */
  var CARTAS = [
    { id: 'a', grupo: 'vogais', nome: 'letra A', curto: 'A', frente: 'letra-a', sinal: 'sinal-a',
      altFrente: 'Carta da letra A, gravada em pedra cinza.',
      altSinal: 'Carta de sinal: mão fechada, com os dedos dobrados e o polegar encostado na lateral da mão.' },
    { id: 'e', grupo: 'vogais', nome: 'letra E', curto: 'E', frente: 'letra-e', sinal: 'sinal-e',
      altFrente: 'Carta da letra E, gravada em pedra cinza.',
      altSinal: 'Carta de sinal: dedos dobrados para baixo, com o polegar cruzado na frente, por baixo das pontas dos dedos.' },
    { id: 'i', grupo: 'vogais', nome: 'letra I', curto: 'I', frente: 'letra-i', sinal: 'sinal-i',
      altFrente: 'Carta da letra I, gravada em pedra cinza.',
      altSinal: 'Carta de sinal: mão fechada com o dedo mínimo esticado para cima.' },
    { id: 'o', grupo: 'vogais', nome: 'letra O', curto: 'O', frente: 'letra-o', sinal: 'sinal-o',
      altFrente: 'Carta da letra O, gravada em pedra cinza.',
      altSinal: 'Carta de sinal: dedos curvados encostando no polegar, formando um círculo.' },
    { id: 'u', grupo: 'vogais', nome: 'letra U', curto: 'U', frente: 'letra-u', sinal: 'sinal-u',
      altFrente: 'Carta da letra U, gravada em pedra cinza.',
      altSinal: 'Carta de sinal: dedos indicador e médio esticados para cima e juntos; os outros dedos dobrados.' },
    { id: 'abelha', grupo: 'animais', nome: 'abelha', artigo: 'a', curto: 'ABELHA', frente: 'animal-abelha', sinal: 'sinal-abelha',
      altFrente: 'Carta da abelha: desenho de uma abelha gravado em pedra cinza.',
      altSinal: 'Carta de sinal: uma mão com dois dedos para cima e a outra em pinça ao lado, com um asterisco que indica um movimento curto.' },
    { id: 'elefante', grupo: 'animais', nome: 'elefante', artigo: 'o', curto: 'ELEFANTE', frente: 'animal-elefante', sinal: 'sinal-elefante',
      altFrente: 'Carta do elefante: desenho de um elefante gravado em pedra cinza.',
      altSinal: 'Carta de sinal: um rosto e uma mão com o dedo indicador que desenha uma linha curva do nariz para baixo, como uma tromba.' },
    { id: 'iguana', grupo: 'animais', nome: 'iguana', artigo: 'a', curto: 'IGUANA', frente: 'animal-iguana', sinal: 'sinal-iguana',
      altFrente: 'Carta da iguana: desenho de uma iguana gravado em pedra cinza.',
      altSinal: 'Carta de sinal: uma mão aberta passando por cima das costas da outra mão.' },
    { id: 'onca', grupo: 'animais', nome: 'onça', artigo: 'a', curto: 'ONÇA', frente: 'animal-onca', sinal: 'sinal-onca',
      altFrente: 'Carta da onça: desenho da cabeça de uma onça gravado em pedra cinza.',
      altSinal: 'Carta de sinal: as duas mãos com polegar e indicador formando círculos, ao lado de pintas como as da onça.' },
    { id: 'urso', grupo: 'animais', nome: 'urso', artigo: 'o', curto: 'URSO', frente: 'animal-urso', sinal: 'sinal-urso',
      altFrente: 'Carta do urso: desenho de um urso gravado em pedra cinza.',
      altSinal: 'Carta de sinal: um rosto com as duas mãos em garra no alto da cabeça, como orelhas de urso.' }
  ];
  var POR_ID = {};
  CARTAS.forEach(function (c) { POR_ID[c.id] = c; });
  function img(nome) { return raiz + 'assets/img/cartas/' + nome + '.webp'; }
  function embaralhar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function nomeCompleto(c) { return c.grupo === 'vogais' ? c.nome : c.artigo + ' ' + c.nome; }

  var ICONE_ISSO = '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><circle cx="20" cy="12" r="5"/><circle cx="12" cy="20" r="5"/><circle cx="20" cy="20" r="5"/><path d="M20 25c1.5 2.5 3.5 3.5 6 3.5"/></svg>';
  var ICONE_QUASE = '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M25 16a9 9 0 1 1-3-6.7"/><path d="M23 4v6h-6"/></svg>';
  /* verso das cartas: o logo da InclusiVR entalhado em pedra, aceso com a magia da LIBRAS */
  var VERSO = '<img alt="" src="' + raiz + 'assets/img/cartas/verso-pedra-300.webp" width="300" height="440" decoding="async">';

  function retorno(el, tipo, texto) {
    el.className = 'jogo__retorno' + (tipo ? ' jogo__retorno--' + tipo : '');
    el.innerHTML = tipo ? (tipo === 'acerto' ? ICONE_ISSO : ICONE_QUASE) + '<span></span>' : '<span></span>';
    el.querySelector('span').textContent = texto || '';
  }
  function anunciar(el, texto) { el.textContent = ''; setTimeout(function () { el.textContent = texto; }, 30); }

  /* =========================================================================
     1. MEMÓRIA DAS RUNAS — forme pares: letra ou animal + o sinal certo
     ========================================================================= */
  function memoria(raizJogo) {
    var modo = 'vogais';
    var cartas = [], abertas = [], pares = 0, jogadas = 0, travado = false;
    raizJogo.innerHTML =
      '<div class="jogo">' +
      '<div class="jogo__topo"><div class="acoes" role="group" aria-label="Escolha as cartas">' +
      '<button type="button" class="abas__aba" data-modo="vogais" aria-pressed="true">Vogais</button>' +
      '<button type="button" class="abas__aba" data-modo="animais" aria-pressed="false">Animais</button>' +
      '<button type="button" class="abas__aba" data-modo="todas" aria-pressed="false">Todas</button></div>' +
      '<p class="jogo__placar"><span data-pares>0</span> de <span data-total>5</span> pares · <span data-jogadas>0</span> jogadas</p></div>' +
      '<p class="jogo__retorno" data-retorno><span></span></p>' +
      '<div class="memoria" data-tabuleiro></div>' +
      '<div class="acoes"><button type="button" class="botao botao--contorno botao--sm" data-reiniciar>Embaralhar de novo</button></div>' +
      '<p class="visualmente-oculto" aria-live="polite" data-anuncio></p></div>';
    var tab = raizJogo.querySelector('[data-tabuleiro]');
    var elRet = raizJogo.querySelector('[data-retorno]');
    var elAn = raizJogo.querySelector('[data-anuncio]');
    function rotulo(i) {
      var c = cartas[i];
      if (c.par) return 'Carta ' + (i + 1) + ': ' + c.descricao + '. Par encontrado.';
      if (c.aberta) return 'Carta ' + (i + 1) + ': ' + c.descricao + '.';
      return 'Carta ' + (i + 1) + ', virada para baixo.';
    }
    function placar() {
      raizJogo.querySelector('[data-pares]').textContent = pares;
      raizJogo.querySelector('[data-jogadas]').textContent = jogadas;
    }
    function montar() {
      var base = CARTAS.filter(function (c) { return modo === 'todas' || c.grupo === modo; });
      cartas = [];
      base.forEach(function (c) {
        cartas.push({ id: c.id, face: 'frente', src: img(c.frente), alt: c.altFrente, descricao: c.grupo === 'vogais' ? 'letra ' + c.curto : 'desenho ' + (c.artigo === 'o' ? 'do ' : 'da ') + c.nome });
        cartas.push({ id: c.id, face: 'sinal', src: img(c.sinal), alt: c.altSinal, descricao: 'sinal ' + (c.grupo === 'vogais' ? 'da letra ' + c.curto : (c.artigo === 'o' ? 'do ' : 'da ') + c.nome) + ' (' + c.altSinal.replace('Carta de sinal: ', '').replace(/\.$/, '') + ')' });
      });
      cartas = embaralhar(cartas);
      abertas = []; pares = 0; jogadas = 0; travado = false;
      raizJogo.querySelector('[data-total]').textContent = base.length;
      tab.className = 'memoria memoria--' + cartas.length;
      tab.innerHTML = '';
      cartas.forEach(function (c, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'carta-jogo';
        b.setAttribute('aria-pressed', 'false');
        b.setAttribute('data-i', i);
        b.innerHTML = '<span class="carta-jogo__miolo"><span class="carta-jogo__face carta-jogo__verso">' + VERSO + '</span>' +
          '<span class="carta-jogo__face carta-jogo__frente"><img alt="" src="' + c.src + '" width="300" height="440" loading="lazy" decoding="async"></span></span>';
        b.setAttribute('aria-label', rotulo(i));
        tab.appendChild(b);
      });
      placar();
      retorno(elRet, '', 'Vire duas cartas. Forme o par: a letra ou o animal com o seu sinal.');
      embaralhando();
    }
    /* as cartas se juntam no meio da mesa e voltam embaralhadas (até ~1,3 s) */
    function embaralhando() {
      if (!permitido() || typeof tab.animate !== 'function') return;
      var rt = tab.getBoundingClientRect();
      var cx = rt.left + rt.width / 2, cy = rt.top + rt.height / 2;
      Array.prototype.forEach.call(tab.children, function (b, k) {
        var r = b.getBoundingClientRect();
        var dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
        var giro = (Math.random() * 24 - 12).toFixed(1);
        b.animate([
          { transform: 'translate(0, 0) rotate(0deg)' },
          { transform: 'translate(' + dx.toFixed(0) + 'px, ' + dy.toFixed(0) + 'px) rotate(' + giro + 'deg)', offset: .42 },
          { transform: 'translate(' + (dx * .9).toFixed(0) + 'px, ' + (dy * .9).toFixed(0) + 'px) rotate(' + (-giro) + 'deg)', offset: .56 },
          { transform: 'translate(0, 0) rotate(0deg)' }
        ], { duration: 1100, delay: k * 18, easing: 'cubic-bezier(.45, 0, .25, 1)' });
      });
    }
    function virar(i) {
      var c = cartas[i], b = tab.children[i];
      c.aberta = true;
      b.setAttribute('aria-pressed', 'true');
      b.setAttribute('aria-label', rotulo(i));
    }
    function desvirar(i) {
      var c = cartas[i], b = tab.children[i];
      c.aberta = false;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', rotulo(i));
    }
    tab.addEventListener('click', function (e) {
      var b = e.target.closest('.carta-jogo');
      if (!b || travado) return;
      var i = +b.getAttribute('data-i');
      var c = cartas[i];
      if (c.par || c.aberta) { anunciar(elAn, 'Esta carta já está virada.'); return; }
      virar(i);
      abertas.push(i);
      if (abertas.length === 1) { anunciar(elAn, 'Você virou: ' + c.descricao + '. Escolha outra carta.'); return; }
      jogadas++;
      var a = cartas[abertas[0]], d = cartas[abertas[1]];
      var info = POR_ID[a.id];
      if (a.id === d.id && a.face !== d.face) {
        a.par = d.par = true;
        abertas.forEach(function (k) { tab.children[k].classList.add('par'); tab.children[k].setAttribute('aria-label', rotulo(k)); });
        pares++;
        placar();
        var msg = 'Isso! A runa ' + (info.grupo === 'vogais' ? 'da ' + info.nome : (info.artigo === 'o' ? 'do ' : 'da ') + info.nome) + ' acendeu.';
        retorno(elRet, 'acerto', msg);
        faiscas(b, { quantidade: 12 });
        abertas = [];
        var total = cartas.length / 2;
        if (pares === total) {
          var fim = 'Você formou todos os pares em ' + jogadas + ' jogadas! Jogue de novo ou escolha outras cartas.';
          retorno(elRet, 'acerto', fim);
          anunciar(elAn, msg + ' ' + fim);
          faiscas(tab, { quantidade: 26, espalhar: 1 });
          raizJogo.querySelector('[data-reiniciar]').focus();
        } else {
          anunciar(elAn, msg + ' ' + pares + ' de ' + total + ' pares.');
        }
      } else {
        placar();
        var quase = 'QUASE! ' + capitalizar(a.descricao.split(' (')[0]) + ' e ' + d.descricao.split(' (')[0] + ' não formam um par. Tente de novo.';
        retorno(elRet, 'quase', 'QUASE! Essas duas cartas não formam um par. Tente de novo.');
        anunciar(elAn, quase);
        travado = true;
        setTimeout(function () { abertas.forEach(desvirar); abertas = []; travado = false; }, permitido() ? 1300 : 1700);
      }
    });
    raizJogo.querySelector('[data-reiniciar]').addEventListener('click', montar);
    Array.prototype.forEach.call(raizJogo.querySelectorAll('[data-modo]'), function (bm) {
      bm.addEventListener('click', function () {
        modo = bm.getAttribute('data-modo');
        Array.prototype.forEach.call(raizJogo.querySelectorAll('[data-modo]'), function (x) { x.setAttribute('aria-pressed', x === bm ? 'true' : 'false'); });
        montar();
        anunciar(elAn, 'Novo jogo com ' + (modo === 'todas' ? 'todas as cartas' : modo === 'vogais' ? 'as vogais' : 'os animais') + '.');
      });
    });
    montar();
  }
  function capitalizar(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

  /* =========================================================================
     2. QUAL É O SINAL? — veja a letra ou o animal e escolha o sinal entre 3
     ========================================================================= */
  function qual(raizJogo) {
    var rodadas = [], i = 0, acertos = 0, errou = false, resolvida = false;
    raizJogo.innerHTML =
      '<div class="jogo qual">' +
      '<div class="jogo__topo"><p class="jogo__placar">Rodada <span data-rodada>1</span> de <span data-total>10</span> · <span data-acertos>0</span> acertos de primeira</p></div>' +
      '<div class="qual__pergunta"><div class="qual__alvo"><img alt="" width="300" height="440" data-alvo></div>' +
      '<div><p class="t-h3" tabindex="-1" data-enunciado></p><p class="jogo__dica">Escolha uma das três cartas de sinal.</p></div></div>' +
      '<div class="qual__opcoes" role="group" aria-label="Cartas de sinal" data-opcoes></div>' +
      '<p class="jogo__retorno" data-retorno><span></span></p>' +
      '<div class="acoes"><button type="button" class="botao botao--roxo botao--sm" data-proxima hidden>Próxima</button>' +
      '<button type="button" class="botao botao--contorno botao--sm" data-reiniciar hidden>Jogar de novo</button></div>' +
      '<p class="visualmente-oculto" aria-live="polite" data-anuncio></p></div>';
    var elRet = raizJogo.querySelector('[data-retorno]'), elAn = raizJogo.querySelector('[data-anuncio]');
    var elOp = raizJogo.querySelector('[data-opcoes]'), btProx = raizJogo.querySelector('[data-proxima]'), btDeNovo = raizJogo.querySelector('[data-reiniciar]');
    function iniciar() {
      rodadas = embaralhar(CARTAS); i = 0; acertos = 0;
      raizJogo.querySelector('[data-total]').textContent = rodadas.length;
      btDeNovo.hidden = true;
      rodada(false);
    }
    function rodada(focar) {
      errou = false; resolvida = false;
      var alvo = rodadas[i];
      var mesmos = CARTAS.filter(function (c) { return c.id !== alvo.id && c.grupo === alvo.grupo; });
      var opcoes = embaralhar([alvo].concat(embaralhar(mesmos).slice(0, 2)));
      raizJogo.querySelector('[data-rodada]').textContent = i + 1;
      raizJogo.querySelector('[data-acertos]').textContent = acertos;
      var alvoImg = raizJogo.querySelector('[data-alvo]');
      alvoImg.src = img(alvo.frente);
      alvoImg.alt = alvo.altFrente;
      var enun = raizJogo.querySelector('[data-enunciado]');
      enun.textContent = alvo.grupo === 'vogais' ? 'Qual é o sinal da ' + alvo.nome + '?' : 'Qual é o sinal ' + (alvo.artigo === 'o' ? 'do ' : 'da ') + alvo.nome.toUpperCase() + '?';
      elOp.innerHTML = '';
      opcoes.forEach(function (c, k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'opcao-carta';
        b.setAttribute('data-id', c.id);
        b.setAttribute('aria-label', 'Opção ' + (k + 1) + ': ' + c.altSinal.replace('Carta de sinal: ', ''));
        b.innerHTML = '<img alt="" src="' + img(c.sinal) + '" width="300" height="440">';
        elOp.appendChild(b);
      });
      retorno(elRet, '', '');
      btProx.hidden = true;
      if (focar) enun.focus();
    }
    elOp.addEventListener('click', function (e) {
      var b = e.target.closest('.opcao-carta');
      if (!b || resolvida || b.getAttribute('data-estado') === 'errada') return;
      var alvo = rodadas[i];
      var escolhida = POR_ID[b.getAttribute('data-id')];
      if (escolhida.id === alvo.id) {
        resolvida = true;
        if (!errou) acertos++;
        raizJogo.querySelector('[data-acertos]').textContent = acertos;
        b.setAttribute('data-estado', 'certa');
        b.insertAdjacentHTML('beforeend', '<span class="opcao-carta__marca">Isso!</span>');
        var msg = 'Isso! Este é o sinal ' + (alvo.grupo === 'vogais' ? 'da ' + alvo.nome : (alvo.artigo === 'o' ? 'do ' : 'da ') + alvo.nome) + '.';
        retorno(elRet, 'acerto', msg);
        faiscas(b, { quantidade: 12 });
        if (i < rodadas.length - 1) {
          btProx.hidden = false;
          anunciar(elAn, msg + ' Use o botão Próxima para continuar.');
          btProx.focus();
        } else {
          var fim = 'Fim de jogo! Você acertou ' + acertos + ' de ' + rodadas.length + ' de primeira.';
          retorno(elRet, 'acerto', msg + ' ' + fim);
          anunciar(elAn, msg + ' ' + fim);
          btDeNovo.hidden = false;
          btDeNovo.focus();
          faiscas(elOp, { quantidade: 24, espalhar: 1 });
        }
      } else {
        errou = true;
        b.setAttribute('data-estado', 'errada');
        b.setAttribute('aria-disabled', 'true');
        b.insertAdjacentHTML('beforeend', '<span class="opcao-carta__marca">Não é esse</span>');
        var quase = 'QUASE! Esse é o sinal ' + (escolhida.grupo === 'vogais' ? 'da ' + escolhida.nome : (escolhida.artigo === 'o' ? 'do ' : 'da ') + escolhida.nome) + '. Tente outra carta.';
        retorno(elRet, 'quase', quase);
        anunciar(elAn, quase);
      }
    });
    btProx.addEventListener('click', function () { i++; rodada(true); });
    btDeNovo.addEventListener('click', function () { iniciar(); raizJogo.querySelector('[data-enunciado]').focus(); });
    iniciar();
  }

  /* =========================================================================
     3. AS VOGAIS FUGIRAM! — devolva as vogais às palavras com os sinais
     ========================================================================= */
  var PALAVRAS = [
    { animal: 'abelha', palavra: 'ABELHA', img: 'animal-abelha-480', alt: 'Ilustração do livro: uma abelha amarela voando entre as flores do jardim.' },
    { animal: 'elefante', palavra: 'ELEFANTE', img: 'animal-elefante-480', alt: 'Ilustração do livro: um elefante brincando na lagoa.' },
    { animal: 'iguana', palavra: 'IGUANA', img: 'animal-iguana-480', alt: 'Ilustração do livro: uma iguana verde em cima da pedra.' },
    { animal: 'onca', palavra: 'ONÇA', img: 'animal-onca-480', alt: 'Ilustração do livro: uma onça no campo, perto das borboletas.' },
    { animal: 'urso', palavra: 'URSO', img: 'animal-urso-480', alt: 'Ilustração do livro: um urso comendo mel.' }
  ];
  var VOGAIS = ['A', 'E', 'I', 'O', 'U'];
  function vogais(raizJogo) {
    var lista = [], p = 0, lacunas = [], atual = 0, completa = false;
    raizJogo.innerHTML =
      '<div class="jogo vogais">' +
      '<div class="jogo__topo"><p class="jogo__placar">Palavra <span data-num>1</span> de <span data-total>5</span></p>' +
      '<label class="opcao" data-ajuda hidden><input type="checkbox" data-letras> Mostrar a letra embaixo de cada sinal</label></div>' +
      '<div class="qual__pergunta"><div class="vogais__cena"><img alt="" width="480" height="360" data-cena></div>' +
      '<div><p class="jogo__dica" tabindex="-1" data-enunciado>As vogais fugiram da palavra! Escolha o sinal da vogal que falta.</p>' +
      '<p class="vogais__palavra" data-palavra></p></div></div>' +
      '<div class="vogais__teclado" role="group" aria-label="Sinais das vogais" data-teclado></div>' +
      '<p class="jogo__retorno" data-retorno><span></span></p>' +
      '<div class="acoes"><button type="button" class="botao botao--roxo botao--sm" data-proxima hidden>Próxima palavra</button>' +
      '<button type="button" class="botao botao--contorno botao--sm" data-reiniciar hidden>Jogar de novo</button></div>' +
      '<p class="visualmente-oculto" aria-live="polite" data-anuncio></p></div>';
    var elPal = raizJogo.querySelector('[data-palavra]'), elTec = raizJogo.querySelector('[data-teclado]');
    var elRet = raizJogo.querySelector('[data-retorno]'), elAn = raizJogo.querySelector('[data-anuncio]');
    var btProx = raizJogo.querySelector('[data-proxima]'), btDeNovo = raizJogo.querySelector('[data-reiniciar]');
    var chkLetras = raizJogo.querySelector('[data-letras]');
    var elAjuda = raizJogo.querySelector('[data-ajuda]');
    /* a ajuda (mostrar a letra) só aparece depois de alguns erros: sem isso, fica fácil demais */
    var ERROS_PARA_AJUDA = 3, erros = 0;
    function contarErro() {
      erros++;
      if (erros >= ERROS_PARA_AJUDA && elAjuda.hidden) {
        elAjuda.hidden = false;
        anunciar(elAn, 'Precisa de uma ajuda? Agora você pode mostrar a letra embaixo de cada sinal.');
      }
    }
    VOGAIS.forEach(function (v) {
      var c = POR_ID[v.toLowerCase()];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opcao-carta';
      b.setAttribute('data-letra', v);
      b.setAttribute('aria-label', c.altSinal.replace('Carta de sinal: ', 'Sinal: '));
      b.innerHTML = '<img alt="" src="' + img(c.sinal) + '" width="300" height="440"><span class="opcao-carta__marca" data-rotulo hidden>' + v + '</span>';
      elTec.appendChild(b);
    });
    chkLetras.addEventListener('change', function () {
      Array.prototype.forEach.call(elTec.querySelectorAll('[data-rotulo]'), function (s) { s.hidden = !chkLetras.checked; });
      Array.prototype.forEach.call(elTec.querySelectorAll('.opcao-carta'), function (b) {
        var c = POR_ID[b.getAttribute('data-letra').toLowerCase()];
        b.setAttribute('aria-label', (chkLetras.checked ? 'Letra ' + b.getAttribute('data-letra') + '. ' : '') + c.altSinal.replace('Carta de sinal: ', 'Sinal: '));
      });
    });
    function iniciar() {
      lista = embaralhar(PALAVRAS); p = 0; btDeNovo.hidden = true;
      erros = 0; elAjuda.hidden = true;
      if (chkLetras.checked) { chkLetras.checked = false; chkLetras.dispatchEvent(new Event('change')); }
      palavra(false);
    }
    function desenhar() {
      var w = lista[p].palavra;
      elPal.innerHTML = '';
      var falado = [];
      for (var k = 0; k < w.length; k++) {
        var s = document.createElement('span');
        var idx = lacunas.indexOf(k);
        var preenchida = idx !== -1 && idx < atual;
        var vaga = idx !== -1 && idx >= atual;
        s.className = 'vogais__letra' + (vaga ? ' vogais__letra--vaga' : '') + (idx === atual && !completa ? ' vogais__letra--atual' : '') + (preenchida ? ' vogais__letra--preenchida' : '');
        s.textContent = vaga ? '?' : w[k];
        s.setAttribute('aria-hidden', 'true');
        elPal.appendChild(s);
        falado.push(vaga ? (idx === atual ? 'lacuna atual' : 'lacuna') : w[k]);
      }
      elPal.setAttribute('aria-label', 'Palavra: ' + falado.join(', ') + '.');
      elPal.setAttribute('role', 'img');
    }
    function palavra(focar) {
      var w = lista[p];
      lacunas = [];
      for (var k = 0; k < w.palavra.length; k++) if (VOGAIS.indexOf(w.palavra[k]) !== -1) lacunas.push(k);
      atual = 0; completa = false;
      raizJogo.querySelector('[data-num]').textContent = p + 1;
      raizJogo.querySelector('[data-total]').textContent = lista.length;
      var cena = raizJogo.querySelector('[data-cena]');
      cena.src = raiz + 'assets/img/animais/' + w.img + '.webp';
      cena.alt = w.alt;
      desenhar();
      retorno(elRet, '', '');
      btProx.hidden = true;
      if (focar) raizJogo.querySelector('[data-enunciado]').focus();
    }
    elTec.addEventListener('click', function (e) {
      var b = e.target.closest('.opcao-carta');
      if (!b || completa) return;
      var w = lista[p].palavra;
      var letra = b.getAttribute('data-letra');
      var certa = w[lacunas[atual]];
      if (letra === certa) {
        atual++;
        faiscas(b, { quantidade: 8 });
        if (atual >= lacunas.length) {
          completa = true;
          desenhar();
          var msg = 'Isso! ' + w + ' está completa.';
          retorno(elRet, 'acerto', msg);
          faiscas(elPal, { quantidade: 18, espalhar: .8 });
          if (p < lista.length - 1) { btProx.hidden = false; anunciar(elAn, msg + ' Use o botão Próxima palavra.'); btProx.focus(); }
          else { var fim = 'Você devolveu todas as vogais às palavras!'; retorno(elRet, 'acerto', msg + ' ' + fim); anunciar(elAn, msg + ' ' + fim); btDeNovo.hidden = false; btDeNovo.focus(); }
        } else {
          desenhar();
          var ok = 'Isso! A letra ' + letra + ' voltou para a palavra.';
          retorno(elRet, 'acerto', ok);
          anunciar(elAn, ok + ' Falta mais uma vogal.');
        }
      } else {
        var quase = 'QUASE! Esse é o sinal da letra ' + letra + '. Aqui falta outra vogal.';
        retorno(elRet, 'quase', quase);
        anunciar(elAn, quase);
        contarErro();
      }
    });
    btProx.addEventListener('click', function () { p++; palavra(true); });
    btDeNovo.addEventListener('click', function () { iniciar(); raizJogo.querySelector('[data-enunciado]').focus(); });
    iniciar();
  }

  /* ---------- abas acessíveis (setas, Home e End) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-abas]'), function (caixa) {
    var abas = Array.prototype.slice.call(caixa.querySelectorAll('[role="tab"]'));
    function ativar(aba, focar, marcarEndereco) {
      abas.forEach(function (a) {
        var sel = a === aba;
        a.setAttribute('aria-selected', sel ? 'true' : 'false');
        a.tabIndex = sel ? 0 : -1;
        var painel = document.getElementById(a.getAttribute('aria-controls'));
        if (painel) painel.hidden = !sel;
      });
      if (focar) aba.focus();
      if (marcarEndereco !== false && history.replaceState) history.replaceState(null, '', '#' + aba.getAttribute('aria-controls'));
    }
    abas.forEach(function (a, k) {
      a.addEventListener('click', function () { ativar(a, false); });
      a.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = abas[(k + 1) % abas.length];
        if (e.key === 'ArrowLeft') n = abas[(k - 1 + abas.length) % abas.length];
        if (e.key === 'Home') n = abas[0];
        if (e.key === 'End') n = abas[abas.length - 1];
        if (n) { e.preventDefault(); ativar(n, true); }
      });
    });
    var inicial = window.location.hash ? abas.filter(function (a) { return '#' + a.getAttribute('aria-controls') === window.location.hash; })[0] : null;
    ativar(inicial || abas[0], false, false);
  });

  var mapa = { memoria: memoria, qual: qual, vogais: vogais };
  Array.prototype.forEach.call(document.querySelectorAll('[data-jogo]'), function (el) {
    var f = mapa[el.getAttribute('data-jogo')];
    if (f) f(el);
  });
})();
