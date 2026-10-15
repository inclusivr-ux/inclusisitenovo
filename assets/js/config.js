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
    preco: { de: 'R$ 149,90', por: 'R$ 99,90' },
    notaPreco: 'Preço da loja em 14/10/2026. O valor final aparece na loja.',
    idade: 'A partir de 3 anos'
  },

  /* Parâmetros UTM: a loja (WooCommerce) registra de onde veio cada pedido.
     Cada botão já manda o seu nome em utm_content (ex.: "hero", "cabecalho"). */
  utm: { source: 'site', medium: 'botao', campaign: 'relancamento-2026' },

  /* ---------------------------------------------------------------------------
     FAIXA DE CAMPANHA (Black Friday e próximas)
     Aparece só entre "inicio" e "fim" (horário de Brasília). Para testar antes,
     abra qualquer página com ?campanha=previa no fim do endereço.
     --------------------------------------------------------------------------- */
  campanha: {
    ativa: true,
    id: 'black-friday-2026',
    inicio: '2026-11-27T00:00:00-03:00',
    fim: '2026-11-27T23:59:59-03:00',
    texto: 'Black Friday: o livro SinalizaAção sai de R$ 149,90 por R$ 99,90. Só hoje!',
    cupom: '',
    textoLink: 'Comprar o livro',
    link: 'loja',
    /* Durante a campanha, o preço mostrado no site muda para este: */
    preco: { de: 'R$ 149,90', por: 'R$ 99,90' }
  },

  /* Benefício para quem assina a InclusiNews (deixe '' para esconder). */
  beneficioNewsletter: '10% de desconto na primeira compra',

  /* ---------------------------------------------------------------------------
     APPS
     --------------------------------------------------------------------------- */
  /* Endereço do app de AR do livro (Unity WebGL). Passo obrigatório da publicação:
     mover o build que hoje responde em /app para /app/ar/ (ver README). */
  APP_AR_URL: 'https://inclusivr.com.br/app/ar/',

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
    whatsappMensagem: 'Olá, InclusiVR! Vim pelo site e quero conversar.',
    instagram: 'https://www.instagram.com/inclusivr/',
    instagramExibicao: '@inclusivr',
    /* Atendimento por videochamada em LIBRAS (deixe '' se não houver). */
    videochamadaLibras: ''
  },

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
     O botão "Ver em LIBRAS" só aparece onde houver vídeo. Formatos aceitos:
       { src: 'assets/video/boas-vindas.mp4', legendas: 'assets/video/boas-vindas.vtt', poster: '' }
       { youtube: 'ID_DO_VIDEO' }   (abre no modo youtube-nocookie, só no clique)
     --------------------------------------------------------------------------- */
  videosLibras: {
    'boas-vindas': null,
    'livro': null,
    'app-passo-a-passo': null,
    'recado-aia': null
  },

  /* Fotos e vídeos de demonstração extras, por galeria (somam-se aos do HTML).
     Exemplo: 'ar-do-livro': [ { tipo: 'video', youtube: 'ID', legenda: 'O elefante saltando do livro' } ] */
  midias: {
    'livro': [],
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
    /* Aia e Seu Zé aparecendo de vez em quando. */
    personagens: true,
    /* Palco no alto do rodapé: Seu Zé e o elefante em duas cenas curtas. */
    palco: true,
    /* Os 5 animais do livro escondidos pelo site. */
    animaisEscondidos: true,
    recompensaAnimais: {
      titulo: 'Você encontrou os 5 animais!',
      texto: 'Seu Zé agradece. Que tal imprimir as cartas e brincar com elas?',
      cupom: ''
    },
    /* Tradutor automático VLibras (do governo). Decisão do especialista em LIBRAS. */
    vlibras: false
  },

  /* Analytics sem cookies (opcional). Ex.: { provedor: 'plausible', dominio: 'inclusivr.com.br' }
     ou { provedor: 'umami', script: 'https://...', id: '...' }. null = desligado. */
  analytics: null
};
