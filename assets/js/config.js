/* =============================================================================
   CONFIGURAÇÃO DO SITE DA INCLUSIVR
   -----------------------------------------------------------------------------
   Aqui a equipe muda links, preço, campanha, vídeos e recursos SEM programar.
   Regras para não quebrar o arquivo:
     - Troque só o que está entre aspas '...'.
     - Mantenha as vírgulas no fim das linhas.
     - true = ligado, false = desligado.
     - Para deixar algo vazio, use '' (duas aspas simples).
   Depois de salvar, recarregue a página no navegador para ver a mudança.
   ============================================================================= */
window.INCLUSIVR_CONFIG = {

  /* Modo rascunho: true mostra rótulos rosa "A CONFIRMAR" no que ainda falta.
     Fica false no site publicado. Para revisar sem mudar este arquivo,
     abra qualquer página com ?rascunho=1 no fim do endereço. */
  modoRascunho: false,

  /* Endereços onde o site oficial roda (links ficam sem "index.html" nesses endereços). */
  dominiosProducao: ['inclusivr.com.br', 'www.inclusivr.com.br'],
  urlSite: 'https://inclusivr.com.br',

  /* ---------------------------------------------------------------------------
     LIVRO E LOJA (WooCommerce)
     --------------------------------------------------------------------------- */
  livro: {
    nome: 'SinalizaAção: Animais em Voga',
    urlLoja: 'https://loja.inclusivr.com.br/produto/livro-sinalizaacao-animais-em-voga/',
    urlCarrinho: 'https://loja.inclusivr.com.br/?add-to-cart=16',
    urlLojaInicio: 'https://loja.inclusivr.com.br/',
    /* "loja" leva para a página do livro; "carrinho" já coloca o livro no carrinho. */
    destinoBotaoComprar: 'loja',
    mostrarPreco: true,
    /* Preço fora de campanha (o de campanha fica em "campanha.preco", mais abaixo). */
    preco: { de: '', por: 'R$ 149,90' },
    /* Nota embaixo do preço, fora da campanha. Depois de 30/11, o cupom IGOR volta a dar
       só frete grátis (briefing da Matraca). Deixe '' para não mostrar nada. */
    notaPreco: 'Use o cupom IGOR e ganhe frete grátis. O valor final aparece na loja.',
    idade: 'A partir de 3 anos'
  },

  /* Parâmetros UTM: a loja (WooCommerce) registra de onde veio cada pedido.
     Cada botão já manda o seu nome em utm_content (ex.: "hero", "cabecalho"). */
  utm: { source: 'site', medium: 'botao', campaign: 'relancamento-2026' },

  /* ---------------------------------------------------------------------------
     CAMPANHA: BLACK NOVEMBER 2026 (briefing da Matraca, 21/10/2026)
     Com o cupom IGOR, o livro sai de R$ 149,90 por R$ 99,90, de 1/11 às 0h até
     30/11 às 23h59. Um cupom por pedido; vale para qualquer pessoa.
     Durante a campanha aparecem: o selo nos botões "Comprar", a placa por cima da
     arte do livro, o bloco do cupom com o marca-páginas de presente e o prêmio do
     mini-jogo dos animais (que em novembro leva ao cupom IGOR).
     Vale só entre "inicio" e "fim" (horário de Brasília). Depois do fim, tudo some
     sozinho. Para ver antes, abra qualquer página com ?campanha=previa no fim do endereço.
     Nos textos, {cupom} vira o código do cupom em destaque.
     --------------------------------------------------------------------------- */
  campanha: {
    ativa: true,
    id: 'black-november-2026',
    nome: 'Black November',
    inicio: '2026-11-01T00:00:00-03:00',
    fim: '2026-11-30T23:59:59-03:00',
    cupom: 'IGOR',
    /* Durante a campanha, o preço mostrado no site muda para este: */
    preco: { de: 'R$ 149,90', por: 'R$ 99,90' },
    notaPreco: 'Preço com o cupom IGOR. Um cupom por pedido. O valor final aparece na loja.',
    chamada: 'Black November: com o cupom {cupom}, o livro sai de R$ 149,90 por R$ 99,90 até 30 de novembro.',
    cupomHistoria: '{cupom} é o cupom do artista: quem compra com ele apoia o Igor Bucioli, o artista surdo que desenhou o livro.',
    /* Presente da campanha (aparece com a imagem do marca-páginas). Deixe '' para esconder. */
    brinde: 'De presente: um marca-páginas exclusivo de Signária, assinado pelo Igor e pelo Luciano.'
  },

  /* Natal: quando as datas de corte da entrega forem definidas, escreva a frase aqui.
     Ela aparece perto do preço entre "inicio" e "fim". Exemplo (sugestão do briefing,
     ainda sem confirmar): 'Para chegar antes do Natal pelo Módico, peça até 2/12.' */
  natal: {
    inicio: '2026-11-16T00:00:00-03:00',
    fim: '2026-12-24T23:59:59-03:00',
    texto: ''
  },

  /* ---------------------------------------------------------------------------
     APPS
     --------------------------------------------------------------------------- */
  /* Endereço do app de AR do livro (build do JLeo). Os botões "Abrir o app de AR"
     levam para cá. Atenção na publicação: a pasta /app do servidor é do app de AR;
     a seção de apps do site fica em /apps/. */
  APP_AR_URL: 'https://inclusivr.com.br/app',

  app: {
    /* Lojas de aplicativos: enquanto o link estiver vazio, o site mostra "Em breve",
       sem link. Quando o app estiver publicado, cole o link e (opcional) o selo oficial
       baixado do site da Apple ou do Google em assets/img/lojas/. */
    lojas: {
      appStore: { url: '', selo: '' },
      googlePlay: { url: '', selo: '' }
    }
  },

  /* ---------------------------------------------------------------------------
     CONTATO E REDES
     --------------------------------------------------------------------------- */
  contato: {
    email: 'contato@inclusivr.com.br',
    whatsapp: '5516994002335',
    whatsappExibicao: '(16) 99400-2335',
    whatsappMensagem: 'Olá, InclusiVR! Vim pelo site e gostaria de mais informações.',
    /* Assuntos do WhatsApp na página de contato (mensagem já escrita). */
    whatsappAssuntos: {
      compra: 'Olá, InclusiVR! Tenho interesse em comprar o livro SinalizaAção.',
      instituicoes: 'Olá, InclusiVR! Represento uma escola/instituição e gostaria de conhecer as soluções da InclusiVR para instituições.',
      parcerias: 'Olá, InclusiVR! Gostaria de conversar sobre parcerias e investimentos.',
      imprensa: 'Olá, InclusiVR! Sou da imprensa e gostaria de falar com a equipe.'
    },
    instagram: 'https://www.instagram.com/inclusivr/',
    instagramExibicao: '@inclusivr',
    /* Outras redes (aparecem no site só quando o link estiver preenchido). */
    tiktok: '',
    youtube: '',
    linkedin: '',
    /* Atendimento por videochamada em LIBRAS (deixe '' se não houver). */
    videochamadaLibras: ''
  },

  /* Últimos posts do Instagram, mostrados no blog. Sem isso, o blog mostra o
     convite para seguir com fotos nossas. Para cada post, salve a imagem em
     assets/img/instagram/ e preencha: { imagem: 'assets/img/instagram/post-1.webp',
     link: 'https://www.instagram.com/p/CODIGO/', texto: 'Uma frase sobre o post' } */
  instagramPosts: [],

  /* ---------------------------------------------------------------------------
     FORMULÁRIOS
     Cole aqui o endereço de envio do serviço escolhido (Formspree, Brevo,
     Google Apps Script...). Vazio = o formulário abre o e-mail da pessoa
     já preenchido para contato@inclusivr.com.br.
     --------------------------------------------------------------------------- */
  formularios: {
    contato: '',
    newsletter: '',
    listaEspera: ''
  },

  /* ---------------------------------------------------------------------------
     VÍDEOS EM LIBRAS (Janela de LIBRAS)
     O botão "Ver em LIBRAS" só aparece onde houver vídeo configurado. Formatos aceitos:
       { src: 'assets/video/boas-vindas.mp4', legendas: 'assets/video/boas-vindas.vtt', poster: '' }
       { youtube: 'ID_DO_VIDEO' }   (abre no modo youtube-nocookie, só no clique)
     --------------------------------------------------------------------------- */
  videosLibras: {
    'boas-vindas': null,
    'livro': null,
    'app-passo-a-passo': null,
    'recado-aia': null
  },

  /* Fotos e vídeos extras, por galeria (somam-se aos do HTML).
     Exemplo: 'ar-do-livro': [ { tipo: 'video', youtube: 'ID', legenda: 'O elefante saltando do livro' } ] */
  midias: {
    'ar-do-livro': [],
    'signaria-ia': [],
    'sinalizaacao-vr': [],
    'jogos': []
  },

  /* Modelos 3D dos animais (.glb). Com o arquivo, a galeria mostra o animal em 3D
     e o botão "Ver no seu espaço" (AR no navegador). Ex.: elefante: 'assets/modelos/elefante.glb' */
  modelos3d: { abelha: '', elefante: '', iguana: '', onca: '', urso: '' },

  /* ---------------------------------------------------------------------------
     RECURSOS OPCIONAIS
     --------------------------------------------------------------------------- */
  recursos: {
    /* Aia e Seu Zé espiando por cima das seções de vez em quando. */
    personagens: true,
    /* A abelha do livro (desenho do Igor) passando voando por algumas seções. */
    abelha: true,
    /* Palco no alto do rodapé: Seu Zé e o elefante em duas cenas curtas. */
    palco: true,
    /* Mini-jogo: os 5 animais do livro escondidos pelo site. */
    animaisEscondidos: true,
    /* Prêmio de quem encontra os 5 animais. A pessoa tira um print da tela do
       prêmio e envia para a equipe, que confere e manda o cupom. */
    recompensaAnimais: {
      /* Frase no rodapé. O que estiver entre *asteriscos* fica em destaque. */
      chamada: 'Encontre os cinco e ganhe *10% de desconto* em todos os produtos da loja.',
      titulo: 'Você encontrou os 5 animais!',
      desconto: '10% de desconto',
      texto: 'Seu Zé agradece a ajuda! Você ganhou 10% de desconto em todos os produtos da loja InclusiVR.',
      instrucoes: 'Tire um print desta tela e envie para a equipe da InclusiVR. Válido 1 vez por CPF.',
      mensagemWhatsapp: 'Olá, InclusiVR! Encontrei os 5 animais no site e quero meu cupom de 10%. Vou mandar o print.',
      /* Durante a campanha, o mini-jogo leva ao cupom da campanha (briefing da Matraca).
         Para manter os 10% também em novembro, troque o bloco abaixo por: campanha: null */
      campanha: {
        chamada: 'Encontre os cinco: em novembro, o prêmio é o cupom *{cupom}*, com o livro por R$ 99,90.',
        desconto: 'Cupom {cupom}',
        texto: 'Seu Zé agradece a ajuda! Em novembro, o presente dele é o cupom {cupom}: com ele, o livro SinalizaAção sai por R$ 99,90 até 30 de novembro.',
        instrucoes: 'É só usar o cupom {cupom} na loja. Um cupom por pedido.'
      }
    },
    /* Tradutor automático VLibras (do governo). Decisão do especialista em LIBRAS. */
    vlibras: false
  },

  /* Analytics sem cookies (opcional). Ex.: { provedor: 'plausible', dominio: 'inclusivr.com.br' }
     ou { provedor: 'umami', script: 'https://...', id: '...' }. null = desligado. */
  analytics: null
};
