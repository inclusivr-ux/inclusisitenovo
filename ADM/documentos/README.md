# Site da InclusiVR

Site estático, feito só com HTML, CSS e JavaScript. Não tem etapa de "build": o que está na pasta `inclusivr-site` é exatamente o que vai para o servidor.

No pacote, os documentos da equipe (este README, `PENDENCIAS.md`, `DECISOES.md`, `CHECKLIST.md` e `PROGRESSO.md`) ficam na pasta `documentos/`, **fora** da pasta do site, para não irem parar no servidor. Por segurança, o `.htaccess` também bloqueia qualquer arquivo `.md`.

```
inclusivr-site/
├── index.html              Início
├── sinalizaacao/           Livro (página de venda)
├── apps/                   Aba dos apps (o app de AR em si continua em /app, fora desta pasta)
│   ├── ar-do-livro/        Como usar o app de AR do livro + os animais do livro
│   ├── signaria-ia/        Signária IA
│   ├── sinalizaacao-vr/    SinalizaAção VR
│   └── jogos/              Minijogos grátis
├── quem-somos/             História, produtos, equipe, parceiros e modelo de negócio
├── blog/                   Lista de posts, posts, modelo de post e a área do Instagram
├── contato/                Fale com a gente
├── acessibilidade/         Declaração de acessibilidade
├── privacidade/            Política de privacidade (rascunho para revisão)
├── en/                     Página em inglês (Web Summit)
├── 404.html                Página "não encontrada"
├── assets/
│   ├── css/                tokens.css (cores e fontes), base, componentes, páginas, impressão
│   ├── js/config.js        (tudo o que a equipe muda sem programar)
│   ├── js/                 main.js, formularios.js, animacoes.js (topo, abelha, animais), carrossel.js (galeria de fotos do início), personagens.js (Seu Zé e o elefante), jogos.js
│   ├── img/                imagens (WebP com reserva em JPG/PNG)
│   ├── fonts/              fontes do site (licença OFL)
│   ├── downloads/          PDF das cartas (com link) e kit de imprensa (sem link, só para a equipe)
│   ├── video/              vídeo curto do Igor com o livro e o app, só carrega no clique
│   └── vendor/             model-viewer 4.3.1 (3D e AR no navegador)
└── sitemap.xml, robots.txt, site.webmanifest, .htaccess, favicon.ico
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
3. Leia o passo 3 abaixo: **não apague nem substitua a pasta `/app` do servidor** (é o app de AR).

Depois, envie **o conteúdo** da pasta `inclusivr-site` (não a pasta em si) para a raiz do domínio. A pasta `documentos/` não vai para o servidor:

- **Hospedagem com painel (cPanel, Hostinger, HostGator...):** pelo gerenciador de arquivos ou FTP, envie tudo para `public_html`, mantendo as pastas. O arquivo `.htaccess` já configura a página 404, a compressão e o cache.
- **Netlify:** arraste a pasta para o painel *Deploys*. A página `404.html` é reconhecida sozinha.
- **Vercel ou GitHub Pages:** suba a pasta para um repositório e publique a raiz. Também reconhecem `404.html`.

Os links internos terminam em `/` (por exemplo, `sinalizaacao/`). No domínio oficial, o servidor abre o `index.html` de cada pasta. Fora dele (no computador ou numa prévia), o `main.js` completa os links com `index.html` sozinho.

## 3. O app de AR continua em /app (atenção ao publicar)

O app de AR (build do JLeo) responde em `inclusivr.com.br/app`, o endereço impresso no livro, e **continua lá**. Todos os botões **Abrir o app de AR** do site levam para esse endereço (valor `APP_AR_URL` no `config.js`).

A seção de apps do site mudou para **`/apps/`** (com "s"), justamente para não encostar na pasta do app.

1. Ao enviar o site, **não apague nem substitua** a pasta `app` que já existe no servidor.
2. Depois de publicar, teste no celular: `inclusivr.com.br/app` (abre o app de AR) e `inclusivr.com.br/apps/` (abre a página dos apps do site).
3. Se um dia o app mudar de endereço, troque `APP_AR_URL` no `config.js`. Os botões acompanham sozinhos.

## 4. Editar o `config.js` (sem programar)

Abra `assets/js/config.js` num editor de texto (Bloco de Notas, VS Code). Regras: troque só o que está entre aspas `'...'`, mantenha as vírgulas no fim das linhas, use `true` (ligado) ou `false` (desligado). Salve e recarregue a página.

| O que mudar | Onde no config | Exemplo |
| --- | --- | --- |
| Preço do livro fora de campanha | `livro.preco` e `livro.notaPreco` | `preco: { de: '', por: 'R$ 149,90' }` |
| Esconder o preço | `livro.mostrarPreco` | `false` |
| Botão "Comprar" vai para a página do livro ou direto para o carrinho | `livro.destinoBotaoComprar` | `'loja'` ou `'carrinho'` |
| Black November (selo "R$ 99,90 com cupom IGOR" nos botões Comprar, placa na arte do livro, bloco do cupom com o marca-páginas, preço de R$ 149,90 por R$ 99,90) | bloco `campanha` | vale de `inicio` (1/11/2026, 0h) a `fim` (30/11/2026, 23h59); antes e depois, some sozinho |
| Textos da campanha | `campanha.chamada`, `cupomHistoria`, `brinde` e `notaPreco` | `{cupom}` vira o código em destaque; `brinde: ''` esconde o marca-páginas |
| Nota do preço fora da campanha | `livro.notaPreco` | hoje: "Use o cupom IGOR e ganhe frete grátis. O valor final aparece na loja." |
| Datas de corte do Natal | `natal.texto` | aparece perto do preço de `natal.inicio` (16/11) a `natal.fim` (24/12); vazio = não aparece |
| Ver a campanha fora das datas | no navegador | abra qualquer página com `?campanha=previa` no fim do endereço |
| Desligar a campanha na hora | `campanha.ativa` | `false` |
| Últimos posts do Instagram no blog | `instagramPosts` | `{ imagem: 'assets/img/instagram/post-1.webp', link: 'https://www.instagram.com/p/CODIGO/', texto: '...' }` |
| Mensagens prontas do WhatsApp por assunto | `contato.whatsappAssuntos` | compra, instituições, parcerias, imprensa |
| Endereço do app de AR | `APP_AR_URL` | `'https://inclusivr.com.br/app'` |
| Lojas de apps (quando o app sair) | `app.lojas` | cole o link em `url`; o selo "Em breve" vira link |
| E-mail, WhatsApp, Instagram | bloco `contato` | `videochamadaLibras` mostra o canal de videochamada |
| Formulários | bloco `formularios` | cole o endereço do serviço (veja abaixo) |
| Vídeos em LIBRAS | bloco `videosLibras` | veja o item 7 |
| Fotos e vídeos extras nas galerias | bloco `midias` | `{ tipo: 'video', youtube: 'ID', legenda: '...' }` |
| Modelos 3D dos animais | `modelos3d` | `elefante: 'assets/modelos/elefante.glb'` |
| Personagens que aparecem | `recursos.personagens` | `false` desliga |
| Abelha voando | `recursos.abelha` | `false` desliga |
| Palco do rodapé (Seu Zé e o elefante) | `recursos.palco` | `false` tira o palco |
| Ver os rótulos A CONFIRMAR | no navegador | abra qualquer página com `?rascunho=1` no fim do endereço |
| Animais escondidos (10% de desconto; em novembro, cupom IGOR) | `recursos.animaisEscondidos` e `recompensaAnimais` | frase do rodapé e textos da janela do prêmio; veja o item 11 |
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
- **Fotos da equipe:** `assets/img/equipe/<nome>-400.jpg`, `-400.webp` e `-200.webp`, quadradas, com rosto e ombros centralizados e fundo índigo (como as atuais). A do Igor (`igor-bucioli-*`) é a nova, do encontro em São Paulo.
- **Galeria de fotos do início (Quem somos):** as fotos estão em `assets/img/galeria/`, em 3:2 (`<nome>-640.webp`, `-1200.webp` e `-960.jpg`). Para trocar uma foto, substitua os três arquivos com o mesmo nome. Para mudar a legenda ou o texto alternativo, abra o `index.html` e procure `carrossel__item`. Só fotos com autorização de imagem e, de preferência, sem crianças.
- **Topo do início (mão da InclusiVR em holograma):** `assets/img/hero/` tem a mão 3D (`mao-holo-*`, render do topo do site anterior, com o brilho já na imagem) e os recortes do Seu Zé apontando (`seu-ze-aponta-*`, livro, p. 9) e da Maga Aia com a borboleta (`maga-aia-borboleta-*`, livro, p. 13). Para trocar, mantenha os nomes e as proporções. As órbitas são desenhadas no próprio HTML (procure `holo__orbitas`).
- **Formatos:** use WebP para o site e JPG como reserva. Para converter, o [Squoosh](https://squoosh.app) é gratuito e roda no navegador.
- **Ilustrações do Igor:** pode recortar, mas sem filtros de cor e sem espelhar personagens que estão sinalizando.
- **Logos:** só os arquivos originais de `assets/img/marca/`. A versão do topo (mão inteira + "inclusiVR" ao lado) foi montada com os pixels dos PNGs originais, a pedido dos sócios, sem redesenhar nem recolorir (`inclusivr-branco-ciano-horizontal-*`). Quando o Aram mandar a versão horizontal oficial, é só substituir os arquivos com o mesmo nome.
- **Logos de prêmios e parceiros:** `assets/img/logos/`. Para incluir um novo, use a versão para fundo escuro.
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

- **Regra:** toda animação que começa sozinha dura no máximo 5 segundos e para. Por isso o site não precisa de um botão geral de pausa (só a galeria de fotos tem o seu). Com a opção "reduzir movimento" do aparelho ligada, nada se mexe. Nenhuma animação passa por cima de texto.
- **Arte do Igor:** as animações usam as ilustrações do livro (o Seu Zé e a Aia do topo, a abelha). Sem filtros de cor e sem espelhar quem está sinalizando.
- **O holograma do topo** (início): a mão da InclusiVR se projeta de baixo para cima, as órbitas abrem (os satélites andam um pouco e param) e o Seu Zé e a Maga Aia chegam, em menos de 4 s, uma vez só. Depois, tudo fica parado. Passar o mouse ou tocar no desenho faz um brilho atravessar a mão (no máximo a cada 3 s). O código está em `assets/js/animacoes.js` (procure `holograma`) e o estilo em `assets/css/paginas.css` (procure `.holo`). O vídeo de boas-vindas em LIBRAS, quando existir, entra pelo `videosLibras['boas-vindas']`.
- **Galeria de fotos** (Quem somos, no início): troca de foto a cada 6 s, só enquanto está na tela. Tem botão de pausar (exigência de acessibilidade para o que se move sozinho por mais de 5 s), para ao passar o mouse ou focar com o teclado e não troca sozinha com "reduzir movimento".
- **A abelha** (no lugar do Seu Zé correndo no meio da página): voa de um lado ao outro só na faixa vazia acima do título de algumas seções, cerca de 4 s por voo, no máximo 3 voos por página.
- **Aia e Seu Zé espiando** por cima de algumas seções: no máximo 4 s cada, no máximo 3 por página.
- **Palco do rodapé** (mantido, como pedido): o Seu Zé e o elefante, desenhados em partes, em duas cenas de até ~4,8 s: "Pega-pega" e "Esconde-esconde". Os dois braços do Seu Zé aparecem e acompanham o corpo também ao repetir a cena. Os desenhos e as cenas estão em `assets/js/personagens.js`; as poses, no fim de `assets/css/componentes.css`.
- **Cartas dos jogos:** verso de pedra com a marca entalhada em azul; ao começar e ao "Embaralhar de novo", as cartas se juntam no meio e voltam embaralhadas (~1,3 s).
- As mãos dos personagens animados ficam no bolso ou segurando a rede: nenhum gesto vira sinal. Se um dia algum personagem for sinalizar, o sinal passa antes pelo Fauston.

## 10. Ao editar textos

- Sem emojis. Use os ícones de linha que já estão no site.
- Grafias: InclusiVR, SinalizaAção, Signária, Maga Aia, Seu Zé, Coletânea LIBROS, Signária IA, SinalizaAção VR, LIBRAS em caixa alta. Na primeira menção da página: "Língua Brasileira de Sinais (LIBRAS)".
- "Língua de sinais" (não "linguagem"); "pessoa surda" (nunca "surdo-mudo").
- Frases curtas, uma ideia por frase. Um título `h1` por página, títulos em ordem.
- Fatos, números e datas só com fonte.

## 11. Animais escondidos e o cupom de 10%

- Os 5 animais do livro estão escondidos no alto de algumas seções: **abelha e elefante** no início, **iguana e onça** na página do livro, **urso** na página de apps. No primeiro aparecimento, cada um se mexe um pouco para ajudar quem procura. Também dá para achá-los com o teclado (Tab) e com leitor de tela.
- O progresso aparece no alto do rodapé (os 5 animais), com uma frase só: "Encontre os cinco e ganhe 10% de desconto em todos os produtos da loja." Quem acha os 5 vê a janela do prêmio com um **código** e a data, e a instrução: tirar um print e mandar para a equipe (há um botão pronto para o WhatsApp). **Válido 1 vez por CPF.**
- **Em novembro (Black November):** como pede o briefing da Matraca, o mini-jogo leva ao cupom IGOR. A frase do rodapé e a janela do prêmio mudam sozinhas de 1/11 a 30/11 (sem print, sem CPF, com o botão da loja) e voltam aos 10% em dezembro. Para manter os 10% também em novembro, use `recompensaAnimais.campanha: null` no `config.js`.
- **Na equipe:** confira o print (código e data), confira na loja se o CPF já usou o cupom e envie o cupom de 10%. O cupom fica cadastrado na loja (WooCommerce), não no site: assim ninguém o encontra lendo o código do site.
- Para desligar o jogo: `recursos.animaisEscondidos: false`.

## 12. Kit de imprensa e "Salvar em PDF"

Saíram das páginas, como pedido. O kit continua no servidor, sem link, para a equipe mandar quando alguém pedir: `assets/downloads/kit-imprensa-inclusivr.zip` (link direto: `inclusivr.com.br/assets/downloads/kit-imprensa-inclusivr.zip`). Em 22/10, o kit ganhou a foto nova do Igor e, no texto, o Crie Games (Sebrae) e os eventos (Web Summit Rio e Lisboa 2026). A folha de impressão (`assets/css/impressao.css`) continua valendo para quem imprimir uma página pelo navegador.

## Créditos e licenças

- Ilustrações: Igor de Campos Bucioli (todos os direitos reservados). Identidade visual: Aram. Diagramação do livro: Nina Nunes.
- Fotos reais (galeria do início, blog e Quem somos): Drive da equipe. Confirme as autorizações de imagem antes de publicar (veja o `PENDENCIAS.md`).
- Fontes: Archivo, Outfit, Lexend e Fraunces, licença SIL Open Font License (arquivos em `assets/fonts/`).
- `model-viewer` 4.3.1, licença Apache 2.0 (em `assets/vendor/`).
- Sem cookies e sem rastreadores por padrão.
