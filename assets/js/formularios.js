/* =============================================================================
   InclusiVR — formulários (contato, InclusiNews e lista de espera)
   - Envia por fetch para o endereço do config (Formspree, Brevo, Apps Script...).
   - Sem endereço configurado, abre o e-mail da pessoa já preenchido.
   - Validação acessível: rótulos visíveis, erro que diz o que corrigir,
     foco no primeiro campo com erro e mensagens anunciadas ao leitor de tela.
   ============================================================================= */
(function () {
  'use strict';
  var C = window.INCLUSIVR_CONFIG || {};
  var IVR = window.InclusiVR || {};
  var EMAIL = (C.contato && C.contato.email) || 'contato@inclusivr.com.br';
  var ICONE_ERRO = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>';
  var ICONE_ACERTO = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2.5" y="2.5" width="19" height="19" rx="3"/><circle cx="9.3" cy="9.3" r="2.6"/><circle cx="14.7" cy="9.3" r="2.6"/><circle cx="9.3" cy="14.7" r="2.6"/><circle cx="14.7" cy="14.7" r="2.6"/><path d="M14.7 17.3c1 1.4 2.2 2 3.3 2"/></svg>';

  var MSG = {
    nome: 'Escreva seu nome.',
    emailVazio: 'Escreva seu e-mail.',
    emailInvalido: 'Confira o e-mail. Ele precisa ter @ e um ponto, como nome@exemplo.com.',
    perfil: 'Escolha uma opção da lista.',
    mensagem: 'Escreva sua mensagem.',
    consentimento: 'Para enviar, marque a caixa de consentimento.',
    resumo: function (n) { return n === 1 ? 'Falta corrigir 1 campo. Veja a mensagem abaixo dele.' : 'Faltam corrigir ' + n + ' campos. Veja as mensagens abaixo de cada um.'; },
    falha: 'Não conseguimos enviar agora. Tente de novo em instantes ou escreva para ' + EMAIL + '.'
  };

  var TIPOS = {
    contato: { sucesso: 'Mensagem enviada! Vamos responder por e-mail, em breve.', assunto: 'Contato pelo site' },
    newsletter: { sucesso: 'Inscrição feita! A próxima InclusiNews chega no seu e-mail.', assunto: 'Quero assinar a InclusiNews' },
    'lista-espera': { sucesso: 'Pronto! Avisamos você por e-mail quando lançar.', assunto: 'Lista de espera' }
  };

  function erroDoCampo(campo) {
    var el = campo.type === 'checkbox' ? campo : campo;
    var valor = (el.value || '').trim();
    if (el.hasAttribute('required')) {
      if (el.type === 'checkbox' && !el.checked) return el.getAttribute('data-erro') || MSG.consentimento;
      if (el.type !== 'checkbox' && !valor) {
        if (el.type === 'email') return MSG.emailVazio;
        return el.getAttribute('data-erro') || (el.tagName === 'SELECT' ? MSG.perfil : (el.name === 'nome' ? MSG.nome : MSG.mensagem));
      }
    }
    if (el.type === 'email' && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return MSG.emailInvalido;
    return '';
  }

  function marcarErro(campo, msg) {
    var id = campo.id + '-erro';
    var alvo = campo.closest('.campo, .opcao');
    var antigo = document.getElementById(id);
    if (antigo) antigo.remove();
    if (!msg) {
      campo.removeAttribute('aria-invalid');
      var desc = (campo.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; }).join(' ');
      if (desc) campo.setAttribute('aria-describedby', desc); else campo.removeAttribute('aria-describedby');
      return;
    }
    campo.setAttribute('aria-invalid', 'true');
    var p = document.createElement('p');
    p.className = 'campo__erro';
    p.id = id;
    p.innerHTML = ICONE_ERRO + '<span></span>';
    p.querySelector('span').textContent = msg;
    var container = campo.type === 'checkbox' ? campo.closest('.opcao') : alvo;
    if (container && container.parentNode) {
      if (campo.type === 'checkbox') container.parentNode.insertBefore(p, container.nextSibling);
      else container.appendChild(p);
    }
    var desc2 = (campo.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
    if (desc2.indexOf(id) === -1) desc2.push(id);
    campo.setAttribute('aria-describedby', desc2.join(' '));
  }

  function estado(form, tipo, texto) {
    var el = form.querySelector('.form__estado');
    if (!el) return;
    el.className = 'form__estado' + (tipo ? ' form__estado--' + tipo : '');
    el.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
    el.innerHTML = texto ? (tipo === 'sucesso' ? ICONE_ACERTO : ICONE_ERRO) + '<span></span>' : '';
    if (texto) el.querySelector('span').textContent = texto;
  }

  function corpoEmail(form) {
    var linhas = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.name === 'site' || el.type === 'submit' || el.type === 'hidden') return;
      var rot = form.querySelector('label[for="' + el.id + '"]');
      var nome = rot ? rot.textContent.replace(/\s+/g, ' ').trim() : el.name;
      var valor = el.type === 'checkbox' ? (el.checked ? 'sim' : 'não') : el.value;
      if (el.tagName === 'SELECT' && el.selectedIndex > -1) valor = el.options[el.selectedIndex].text;
      linhas.push(nome + ': ' + valor);
    });
    linhas.push('', 'Página: ' + window.location.href);
    return linhas.join('\n');
  }

  function faiscasNoBotao(botao) {
    if (IVR.faiscas && botao) IVR.faiscas(botao, { quantidade: 14 });
  }

  function iniciar(form) {
    /* com JS, a validação é nossa (mensagens claras); sem JS, vale a do navegador */
    form.setAttribute('novalidate', '');
    var tipo = form.getAttribute('data-form');
    var cfg = TIPOS[tipo] || TIPOS.contato;
    var botao = form.querySelector('[type="submit"]');
    var textoBotao = botao ? botao.textContent : '';

    /* perfil já marcado pelo link (ex.: contato/?perfil=investidor) */
    var sel = form.querySelector('select[name="perfil"]');
    if (sel) {
      var perfil = null;
      try { perfil = new URLSearchParams(window.location.search).get('perfil'); } catch (e) { /* sem parâmetros */ }
      if (perfil && sel.querySelector('option[value="' + perfil + '"]')) sel.value = perfil;
    }

    /* depois da primeira tentativa, o erro some assim que o campo fica certo.
       (Erros novos só aparecem no envio: assim nada muda de lugar enquanto a pessoa clica.) */
    function revalidar(e) {
      if (!form.classList.contains('tentou')) return;
      var c = e.target;
      if (!c.matches || !c.matches('input, select, textarea') || c.name === 'site') return;
      if (c.getAttribute('aria-invalid') === 'true' && !erroDoCampo(c)) marcarErro(c, '');
    }
    form.addEventListener('input', revalidar);
    form.addEventListener('change', revalidar);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('tentou');
      estado(form, '', '');
      var campos = Array.prototype.filter.call(form.elements, function (el) { return el.matches('input, select, textarea') && el.name && el.name !== 'site' && el.type !== 'hidden'; });
      var invalidos = [];
      campos.forEach(function (c) { var m = erroDoCampo(c); marcarErro(c, m); if (m) invalidos.push(c); });
      if (invalidos.length) {
        estado(form, 'erro', MSG.resumo(invalidos.length));
        invalidos[0].focus();
        return;
      }
      /* campo-armadilha preenchido = robô: finge que deu certo */
      var armadilha = form.querySelector('[name="site"]');
      if (armadilha && armadilha.value) { estado(form, 'sucesso', cfg.sucesso); form.reset(); return; }

      var destino = (C.formularios || {})[tipo === 'lista-espera' ? 'listaEspera' : tipo];
      if (!destino) {
        var assunto = cfg.assunto + (form.getAttribute('data-assunto') ? ' — ' + form.getAttribute('data-assunto') : '');
        window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpoEmail(form));
        estado(form, 'sucesso', 'Abrimos o seu aplicativo de e-mail com a mensagem pronta. É só enviar. Se ele não abriu, escreva para ' + EMAIL + '.');
        return;
      }
      if (botao) { botao.setAttribute('aria-busy', 'true'); botao.disabled = true; botao.textContent = 'Enviando…'; }
      var dados = new FormData(form);
      dados.append('origem', window.location.href);
      if (form.getAttribute('data-assunto')) dados.append('assunto', form.getAttribute('data-assunto'));
      fetch(destino, { method: 'POST', body: dados, headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (!(r.ok || r.type === 'opaque')) throw new Error('falha');
          estado(form, 'sucesso', cfg.sucesso);
          faiscasNoBotao(botao);
          form.reset();
          form.classList.remove('tentou');
        })
        .catch(function () { estado(form, 'erro', MSG.falha); })
        .then(function () { if (botao) { botao.removeAttribute('aria-busy'); botao.disabled = false; botao.textContent = textoBotao; } });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-form]'), iniciar);
})();
