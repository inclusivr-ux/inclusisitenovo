# Site da InclusiVR

Site estático, feito só com HTML, CSS e JavaScript. Não tem etapa de "build": o que está nesta pasta é exatamente o que vai para o servidor.

```
inclusivr-site/
├── index.html              Início
├── sinalizaacao/           Livro (página de venda)
├── app/                    Aba dos apps (endereço impresso no livro)
│   ├── ar-do-livro/        App de AR do livro
│   ├── signaria-ia/        Signária IA
│   ├── sinalizaacao-vr/    SinalizaAção VR
│   └── jogos/              Minijogos grátis
├── quem-somos/             Material para investidores e editais
├── blog/                   Lista de posts, posts e o modelo de post
├── contato/                Fale com a gente
├── acessibilidade/         Declaração de acessibilidade
├── privacidade/            Política de privacidade (rascunho para revisão)
├── en/                     Página em inglês (Web Summit)
├── 404.html                Página "não encontrada"
├── assets/
│   ├── css/                tokens.css (cores e fontes), base, componentes, páginas, impressão
│   ├── js/config.js        (tudo o que a equipe muda sem programar)
│   ├── js/                 main.js, formularios.js, animacoes.js, personagens.js (Seu Zé e o elefante), jogos.js
│   ├── img/                imagens (WebP com reserva em JPG/PNG)
│   ├── fonts/              fontes do site (licença OFL)
│   ├── downloads/          PDF das cartas e kit de imprensa
│   ├── video/              vídeos em LIBRAS (quando chegarem)
│   └── vendor/             model-viewer 4.3.1 (3D e AR no navegador)
├── sitemap.xml, robots.txt, site.webmanifest, .htaccess, favicon.ico
└── README.md, PENDENCIAS.md, DECISOES.md, CHECKLIST.md, PROGRESSO.md
```

---

## 1. Ver o site no computador

**Jeito rápido:** abra o arquivo `index.html` com dois cliques. Tudo funciona, mas o Chrome bloqueia as fontes da marca quando o site é aberto direto do disco (é uma regra de segurança do navegador). O Firefox mostra as fontes.

**Jeito completo (recomendado):** use um servidor local.

- **VS Code:** instale a extensão *Live Server*, clique com o botão direito em `index.html` e escolha *Open with Live Server*.
- **Terminal:** dentro da pasta `inclusivr-site`, rode `python3 -m http.server 8000` e abra `http://localhost:8000` no navegador.

O modo rascunho fica desligado: o site aparece como vai ao ar. Para revisar o que ainda falta, abra qualquer página com `?rascunho=1` no fim do endereço (por exemplo, `http://localhost:8000/?rascunho=1`). Aparecem rótulos rosa **A CONFIRMAR** e as vagas para fotos e vídeos. A lista completa está no `PENDENCIAS.md`.

## 2. Publicar

Antes de publicar:

1. Resolva os itens marcados como "antes de publicar" no `PENDENCIAS.md`.
2. Confira que `modoRascunho` está `false` em `assets/js/config.js` (é o padrão). Os rótulos e as vagas ficam escondidos sem quebrar o layout.
3. Faça o passo 3 abaixo (mover o app de AR). **É obrigatório.**

Depois, envie **o conteúdo** da pasta `inclusivr-site` (não a pasta em si) para a raiz do domínio:

- **Hospedagem com painel (cPanel, Hostinger, HostGator...):** pelo gerenciador de arquivos ou FTP, envie tudo para `public_html`, mantendo as pastas. O arquivo `.htaccess` já configura a página 404, a compressão e o cache.
- **Netlify:** arraste a pasta para o painel *Deploys*. A página `404.html` é reconhecida sozinha.
- **Vercel ou GitHub Pages:** suba a pasta para um repositório e publique a raiz. Também reconhecem `404.html`.

Os links internos terminam em `/` (por exemplo, `sinalizaacao/`). No domínio oficial, o servidor abre o `index.html` de cada pasta. Fora dele (no computador ou numa prévia), o `main.js` completa os links com `index.html` sozinho.

## 3. Mover o app de AR para /app/ar/ (passo obrigatório)

Hoje o app de AR (Unity WebGL) responde em `inclusivr.com.br/app`, o endereço impresso no livro. No novo site, `/app/` passa a ser a página dos apps, com o botão grande **Abrir o app de AR** e os passos de uso. O app em si muda para `/app/ar/`.

1. Faça uma cópia de segurança da pasta atual do app no servidor.
2. Crie a pasta `app/ar/` no servidor.
3. Mova **todos** os arquivos do build do Unity (o `index.html` do Unity e as pastas `Build/`, `TemplateData/` e o que mais houver, inclusive um `.htaccess` próprio, se existir) para `app/ar/`.
4. Envie o novo site. Ele traz o arquivo `app/index.html`, a nova página dos apps.
5. No celular, teste `inclusivr.com.br/app` (deve abrir a página dos apps) e `inclusivr.com.br/app/ar/` (deve abrir o app).
6. Se o app ficar em outro endereço, troque o valor de `APP_AR_URL` em `assets/js/config.js`. Todos os botões **Abrir o app de AR** usam esse valor.

Quem digita o endereço do livro (`inclusivr.com.br/app`) chega à página dos apps e abre a AR com um toque.

## 4. Editar o `config.js` (sem programar)

Abra `assets/js/config.js` num editor de texto (Bloco de Notas, VS Code). Regras: troque só o que está entre aspas `'...'`, mantenha as vírgulas no fim das linhas, use `true` (ligado) ou `false` (desligado). Salve e recarregue a página.

| O que mudar | Onde no config | Exemplo |
| --- | --- | --- |
| Preço do livro | `livro.preco` e `livro.notaPreco` | `preco: { de: 'R$ 149,90', por: 'R$ 99,90' }` |
| Esconder o preço | `livro.mostrarPreco` | `false` |
| Botão "Comprar" vai para a página do livro ou direto para o carrinho | `livro.destinoBotaoComprar` | `'loja'` ou `'carrinho'` |
| Faixa da Black Friday | bloco `campanha` | datas em `inicio` e `fim`, `texto`, `cupom`, `preco` |
| Testar a faixa antes da data | no navegador | abra qualquer página com `?campanha=previa` no fim do endereço |
| Benefício da InclusiNews | `beneficioNewsletter` | `''` esconde |
| Endereço do app de AR | `APP_AR_URL` | `'https://inclusivr.com.br/app/ar/'` |
| Lojas de apps (quando o app sair) | `app.lojas` | cole o link em `url`; o selo "Em breve" vira link |
| E-mail, WhatsApp, Instagram | bloco `contato` | `videochamadaLibras` mostra o canal de videochamada |
| Formulários | bloco `formularios` | cole o endereço do serviço (veja abaixo) |
| Vídeos em LIBRAS | bloco `videosLibras` | veja o item 7 |
| Fotos e vídeos extras nas galerias | bloco `midias` | `{ tipo: 'video', youtube: 'ID', legenda: '...' }` |
| Modelos 3D dos animais | `modelos3d` | `elefante: 'assets/modelos/elefante.glb'` |
| Personagens que aparecem | `recursos.personagens` | `false` desliga |
| Palco do rodapé (Seu Zé e o elefante) | `recursos.palco` | `false` tira o palco |
| Ver os rótulos A CONFIRMAR | no navegador | abra qualquer página com `?rascunho=1` no fim do endereço |
| Animais escondidos | `recursos.animaisEscondidos` e `recompensaAnimais` | o `cupom` aparece para quem achar os 5 |
| Tradutor VLibras | `recursos.vlibras` | decisão do Fauston |
| Estatísticas sem cookies | `analytics` | `{ provedor: 'plausible', dominio: 'inclusivr.com.br' }` |

Os links da loja ganham parâmetros UTM sozinhos (`utm_source=site`, `utm_medium=botao`, `utm_campaign=relancamento-2026` ou o `id` da campanha, `utm_content=` nome do botão). Assim a loja mostra de qual botão veio cada venda (nas versões recentes do WooCommerce, cada pedido mostra a "Origem").

**Formulários.** Sem endereço configurado, o formulário abre o e-mail da pessoa já preenchido para `contato@inclusivr.com.br`. Para receber direto:

1. Crie uma conta gratuita no [Formspree](https://formspree.io) (ou use Brevo ou Google Apps Script).
2. Crie um formulário e copie o endereço de envio (algo como `https://formspree.io/f/abcdwxyz`).
3. Cole em `formularios.contato`, `formularios.newsletter` e `formularios.listaEspera` (pode ser o mesmo endereço ou três diferentes).
4. Mande um teste por cada formulário do site.

## 5. Publicar um post no blog (5 passos)

1. Copie a pasta `blog/_modelo-de-post` e dê um nome curto à cópia, sem acentos e com hífens (exemplo: `blog/oficina-na-emebs`).
2. Abra o `index.html` da nova pasta e troque o título, a data, a capa e o texto. Os comentários no próprio arquivo mostram onde. Apague a linha `<meta name="robots" content="noindex">`.
3. Coloque a imagem de capa em `assets/img/blog/` (1280 × 720 px, `.jpg` ou `.webp`).
4. Em `blog/posts.json`, copie um bloco `{ ... }`, cole **no início** da lista e troque os dados (`pasta`, `titulo`, `dataExibicao`, `resumo`, `capa`, `capaAlt`).
5. Envie a nova pasta, a imagem e o `posts.json` para o servidor.

O post aparece sozinho no blog e nas "Novidades" da página inicial. Para o Google achar mais rápido, acrescente o endereço também no `sitemap.xml` (opcional).

## 6. Trocar imagens e fotos

- **Mesmo nome, mesmo tamanho:** o jeito mais simples é substituir o arquivo por outro com o mesmo nome e as mesmas medidas.
- **Fotos da equipe:** `assets/img/equipe/<nome>-400.jpg`, `-400.webp` e `-200.webp`, quadradas, com rosto e ombros centralizados e fundo índigo (como as atuais).
- **Formatos:** use WebP para o site e JPG como reserva. Para converter, o [Squoosh](https://squoosh.app) é gratuito e roda no navegador.
- **Ilustrações do Igor:** pode recortar, mas sem filtros de cor e sem espelhar personagens que estão sinalizando.
- **Logos:** só os arquivos originais de `assets/img/marca/`. Sem redesenhar, recolorir ou criar versão horizontal.
- Toda imagem nova precisa de texto alternativo (`alt`) que descreva o que importa. Nas cartas e runas, descreva a mão do sinal (e peça a revisão do Fauston).

## 7. Vídeos em LIBRAS

1. Grave o vídeo (roteiros no `PENDENCIAS.md`) e faça a legenda em português (arquivo `.vtt`).
2. Coloque os arquivos em `assets/video/`.
3. No `config.js`, em `videosLibras`, troque `null` pelo vídeo. Exemplo:
   `'boas-vindas': { src: 'assets/video/boas-vindas.mp4', legendas: 'assets/video/boas-vindas.vtt', poster: '' },`
   Ou, se o vídeo estiver no YouTube: `'livro': { youtube: 'ID_DO_VIDEO' },`

O botão **Ver em LIBRAS** aparece sozinho onde houver vídeo. Nenhum vídeo toca com som sozinho.

## 8. Mudar o menu em todas as páginas

O cabeçalho e o rodapé estão escritos em cada página (é melhor para acessibilidade e para o Google). Para mudar o menu:

1. No VS Code, abra a pasta `inclusivr-site`.
2. Use *Localizar nos arquivos* e *Substituir nos arquivos* (`Ctrl+Shift+H`; no Mac, `Cmd+Shift+H`).
3. Procure o trecho exato do item (por exemplo, `>Blog</a></li>`) e troque em todos os arquivos `.html` de uma vez.

A página em inglês (`en/index.html`) tem cabeçalho e rodapé próprios, em inglês. A `404.html` usa endereços que começam com `/`.

## 9. Animações

- **Regra:** toda animação que começa sozinha dura no máximo 5 segundos e para. Por isso o site não precisa de botão de pausa. Com a opção "reduzir movimento" do aparelho ligada, nada se mexe.
- **O salto** (início): cerca de 4,7 s, uma vez só.
- **Aia e Seu Zé espiando** e o **Seu Zé atravessando** a base de algumas seções: no máximo 4 s cada, no máximo 3 por página.
- **Palco do rodapé:** o Seu Zé e o elefante, desenhados em partes (pernas, braços, cabeça, chapéu, olhos, orelhas, tromba e rabo), em duas cenas de até ~4,8 s: "Pega-pega" e "Esconde-esconde". A cena começa quando o palco aparece na tela; um clique (ou o botão redondo) mostra a outra. Os desenhos e as cenas estão em `assets/js/personagens.js`; as poses, no fim de `assets/css/componentes.css`.
- As mãos dos personagens ficam no bolso ou segurando a rede: nenhum gesto vira sinal. Se um dia algum personagem for sinalizar, o sinal passa antes pelo Fauston.

## 10. Ao editar textos

- Sem emojis. Use os ícones de linha que já estão no site.
- Grafias: InclusiVR, SinalizaAção, Signária, Maga Aia, Seu Zé, Coletânea LIBROS, Signária IA, SinalizaAção VR, LIBRAS em caixa alta. Na primeira menção da página: "Língua Brasileira de Sinais (LIBRAS)".
- "Língua de sinais" (não "linguagem"); "pessoa surda" (nunca "surdo-mudo").
- Frases curtas, uma ideia por frase. Um título `h1` por página, títulos em ordem.
- Fatos, números e datas só com fonte.

## Créditos e licenças

- Ilustrações: Igor de Campos Bucioli (todos os direitos reservados). Identidade visual: Aram. Diagramação do livro: Nina Nunes.
- Fontes: Archivo, Outfit, Lexend e Fraunces, licença SIL Open Font License (arquivos em `assets/fonts/`).
- `model-viewer` 4.3.1, licença Apache 2.0 (em `assets/vendor/`).
- Sem cookies e sem rastreadores por padrão.
