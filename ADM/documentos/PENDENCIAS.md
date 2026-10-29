# Pendências

O que a equipe precisa enviar, confirmar ou decidir. O site publicado não mostra os rótulos. Para ver cada item no próprio site, com um rótulo rosa **A CONFIRMAR**, abra qualquer página com `?rascunho=1` no fim do endereço. Para ver a Black November antes de 1/11, use `?campanha=previa`.

Legenda: **[antes de publicar]** = precisa estar resolvido até **26/10/2026** (data da ata; o site sai sem o plugin de LIBRAS). **[até 31/10]** = antes de a Black November começar sozinha, em 1/11 às 0h.

## Rodada de 28/10/2026 (plano de alterações da reunião): o que a equipe precisa enviar ou decidir

Detalhes de cada item no `RELATORIO_DE_ALTERACOES_INCLUSIVR.md` (seção 7). Os textos novos aparecem com o rótulo rosa em `?rascunho=1`.

- [ ] **P1 · Luciano: frase nova da página do livro.** A frase "Será que a magia da LIBRAS vai trazer todo mundo de volta?" continua no site (bloco "Uma história de busca"), porque a reunião pediu para trocá-la, mas não definiu a frase nova. Mandem a frase aprovada.
- [ ] **P2 · Igor: os dois links do Instagram** (perfil de influenciador e perfil de ilustrador). Hoje o site usa um só, `instagram.com/igorbucioli` (página do livro e bloco do livro no início). Com os dois links, eles entram nos mesmos lugares.
- [ ] **P3 · Luciano: referência da animação das cartas A, E e I** (vídeo curto, GIF ou gravação de tela). Enquanto isso, as cartas da área de download abrem em leque ao passar o mouse (e uma vez quando aparecem na tela), a mesma mecânica do leque de cartas da versão de 15/10 do site. Se a animação lembrada for outra, a troca é só no CSS.
- [x] **P4 · Arquivos da Pasta Exemplo:** todos chegaram. "IA.wepm" é o `IA.webp` (a tela do mapa, igual à que o site já tinha). A `IA.png` foi usada só como referência; a composição foi montada com a `aia-3d-380.webp` e a `IA.webp`.
- [ ] **P5 · Fauston: as 10 cartas.** O site diz "5 vogais (A, E, I, O e U) e 5 animais (abelha, elefante, iguana, onça e urso)", que é o que o PDF das cartas já traz. Confirmem a lista e se o PDF serve para as duas formas de brincar (ele tem as regras dos dois jogos sem celular e o endereço dos minijogos online).
- [ ] **P6 · Luciano e Victor: fatos da história e dos posts.** Conferir a linha do tempo de Quem somos (2023 a 2026), os textos ampliados do blog (descrição do Prêmio Sebrae Startups, da Tools Competition, trilha K-12, do PROAC/PNAB, a história do PROAC 2024 e as atividades com escolas e associações de surdos no post do VR) e as datas exatas dos posts. A ordem do blog usa as datas aproximadas da memória da empresa (PROAC no início de 2026, Tools em abril e maio de 2026); com as datas exatas, é só preencher o campo `data` no `blog/posts.json`.
- [ ] **P7 e P8 · cada integrante: nome público e biografia.** Arquivo `BIOGRAFIAS_PARA_REVISAO.md`, uma parte para cada um. Falta a formação do JLeo.
- [ ] **P9 · Luciano: textos novos de "O problema" e "Nossa abordagem"** (Quem somos). Estão no ar como proposta, sem estatística, com os quatro pilares e a comunidade surda. Aprovem ou mandem a redação final. O mesmo texto foi usado na página em inglês (`/en/`).
- [ ] **P10 · Victor: botões principais.** Confirmar textos e destinos: "Livro SinalizaAção" (topo do início, leva à página do livro), "Comprar o livro" e "Comprar agora" (loja, com UTM), "Falar com a equipe" nos cards de públicos (contato, com o perfil já marcado: família, escola ou investidor), "Quero ser parceiro" (contato, perfil parceria), "Abrir a realidade aumentada" (`inclusivr.com.br/app`) e "Jogar os minijogos" (`/apps/jogos/`).
- [ ] **Parceiros (Quem somos):** a reunião pediu para manter Igor Bucioli, Cultura de Acesso e a Associação dos Surdos de Ribeirão Preto e tirar a EMEBS Anne Sullivan. A EMEBS Helen Keller e a Associação de Surdos de São Paulo continuam, porque não houve pedido para tirá-las. Confirmem se ficam.
- [ ] **Tradução para o inglês:** revisar os textos em inglês (`assets/js/traducao-en.js`), principalmente as biografias, a política de privacidade e os posts. Página nova ou texto novo precisa de uma linha nova no dicionário; o que não estiver lá continua em português.
- [ ] **Sugestão (texto anterior a esta rodada):** na página dos jogos, "Quero receber um aviso por e-mail quando os novos jogos lançar." tem um erro de concordância. Sugestão: "quando os novos jogos forem lançados". Não foi mudado porque não estava no plano. Se mudarem, troquem também a linha correspondente no `assets/js/traducao-en.js`.
- [ ] **Seu Zé com o livro (topo do início):** a imagem foi montada com o desenho do Igor (Seu Zé segurando as runas com as duas mãos, cena 10 do livro) e a capa do livro no lugar das runas. Se o Igor quiser redesenhar o Seu Zé segurando o livro, o arquivo novo entra com o mesmo nome (`assets/img/hero/seu-ze-livro-*`).

## As 7 mais importantes

1. **[antes de publicar] JLeo: publicar sem apagar a pasta `/app` do servidor** (é o app de AR) e testar no celular `inclusivr.com.br/app` e `inclusivr.com.br/apps/` (README, passo 3). Envie só o conteúdo da pasta `inclusivr-site`; a pasta `documentos/` não vai para o servidor.
2. **[antes de publicar] Victor: autorização de imagem** das fotos reais: o público do pré-lançamento (galeria do início e post do lançamento), a equipe e os palestrantes, o estande e os visitantes da Feira da Diversidade (galeria e post) e a foto do VaiTec (com outras pessoas no palco). Sem autorização, a foto sai (README, item 6). Os vídeos com crianças já saíram do site.
3. **[até 31/10] Maria e Victor: Black November na loja.** Configurar o cupom **IGOR** na loja: R$ 99,90 no livro de 1/11 às 0h a 30/11 às 23h59, um cupom por pedido; depois, de novo só frete grátis. Conferir se o frete grátis do IGOR vale para qualquer modalidade, porque o site diz, fora de novembro: "Use o cupom IGOR e ganhe frete grátis." (`livro.notaPreco` no `config.js`).
4. **[até 31/10] Luciano e Victor: o marca-páginas.** O site diz, em novembro: "De presente: um marca-páginas exclusivo de Signária, assinado pelo Igor e pelo Luciano." Se o presente tiver limite (por exemplo, "enquanto durarem os marca-páginas"), escreva isso em `campanha.brinde` no `config.js`. Pelo Código de Defesa do Consumidor, a oferta anunciada vale.
5. **[antes de publicar] Fauston: revisar os exemplos dos 5 parâmetros** na página da Signária IA e as descrições dos sinais nos textos alternativos (cartas, jogos e galeria dos animais). Estão marcados como provisórios. (O Recado da Aia saiu do início na rodada de 28/10, item 7 do plano, e não precisa mais de revisão.)
6. **[antes de publicar] Maria: cupom de 10% dos animais escondidos** (vale fora de novembro). Criar o cupom na loja (limite de 1 uso por CPF) e combinar quem confere os prints do WhatsApp (README, item 11). Em novembro, o mini-jogo leva ao cupom IGOR sozinho.
7. **[antes de publicar] Maria: endereço dos formulários** (Formspree, Brevo ou outro). Sem ele, os formulários abrem o e-mail da pessoa, o que funciona, mas é menos prático.

---

## Black November e Natal (briefing da Matraca)

- [ ] **[até 31/10]** Cupom IGOR na loja e frete grátis fora de novembro (item 3 do topo).
- [ ] **[até 31/10]** Marca-páginas: vai em todos os pedidos de novembro? (item 4 do topo).
- [ ] **Até 30/10 (briefing):** quando as datas de corte do Natal saírem, escreva a frase em `natal.texto` no `config.js`. Ela aparece perto do preço de 16/11 a 24/12. Sugestão do briefing, ainda sem confirmar: "Para chegar antes do Natal pelo Módico, peça até 2/12."
- [ ] **Semana da Black Friday (sugestão 23/11, limite 27/11):** quando a versão nova do app de AR sair, trocar as fotos dos passos (`assets/img/app-real/`), tirar a frase "Uma nova versão está a caminho" da página de apps e publicar um post no blog (README, item 5).
- [ ] **Depoimentos** ("Gente de verdade", só adultos): quando houver os vídeos ou textos autorizados, dá para criar uma seção no livro.
- [ ] **Depois de 30/11:** a campanha some sozinha. Conferir o preço da loja e, se mudou, ajustar `livro.preco` no `config.js` (hoje volta a R$ 149,90).

## Luciano

- [x] ~~Revisar com o Fauston o **Recado da Aia**~~: não se aplica mais. O recado saiu do início na rodada de 28/10 (item 7 do plano: "remover o texto da Aia"). Texto guardado para um possível retorno: "Oi, eu sou a Aia. Aqui em Signária, a LIBRAS é nossa língua e fonte de magia. Quem aprende um sinal para se aproximar de alguém também ganha essa magia. Vamos sinalizar juntos?"
- [ ] **Legenda do vídeo do Igor:** num trecho, a legenda (que já vem gravada na imagem) diz "usando tecnologia de Realidade Virtual", mas o livro usa realidade aumentada. O site não mexe na fala do Igor. Se quiserem corrigir, é preciso reeditar a legenda no arquivo original e trocar o vídeo (README, item 7).
- [ ] Opcional: ligar de novo a **abertura do topo** do início (a mão se projeta e o Seu Zé e a Aia chegam): `recursos.aberturaTopo: true` no `config.js`. Hoje fica parada para que só a abelha se mexa, como pedido.
- [ ] Confirmar as **datas exatas dos posts**: aprovação no PROAC, finalistas da Tools Competition e Prêmio Sebrae Startups (hoje aparecem só como "2026").
- [ ] Opcional: **vídeo de boas-vindas em LIBRAS** no topo do início (com o Fauston). Entra pelo `videosLibras['boas-vindas']` no `config.js` (README, item 7).
- [ ] Opcional: decidir se o botão **Comprar do menu** (em todas as páginas) continua indo direto para a loja ou também passa pela página do livro, como o botão do topo do início.
- [ ] **Foto corporativa da equipe** para Quem somos (pedido da ata). Hoje está a foto do pré-lançamento.

## Fauston

- [ ] **[antes de publicar]** Revisar os **exemplos dos 5 parâmetros** (Signária IA): configuração de mão (letra A), ponto de articulação (URSO), movimento (ELEFANTE), orientação (IGUANA) e expressões não manuais (rosto da Aia).
- [ ] **[antes de publicar]** Revisar as descrições dos sinais nos textos alternativos: `assets/js/jogos.js` (campo `altSinal`) e a galeria dos animais na página do app de AR.
- [x] ~~Revisar o Recado da Aia novo (com o Luciano)~~: o recado saiu do início em 28/10.
- [ ] Revisar a declaração de **Acessibilidade** com o Victor.
- [ ] VLibras: continua desligado (a ata decidiu publicar sem o plugin de LIBRAS).

## JLeo

- [ ] **[antes de publicar]** Publicar sem mexer na pasta `/app` do servidor e testar os dois endereços (README, passo 3).
- [ ] Confirmar se o app de AR **envia ou guarda imagens da câmera** (para a Política de Privacidade).
- [ ] **Vídeos e GIFs atuais do SinalizaAção VR** para "O projeto hoje" (página do VR): trechos curtos do Espelho Mágico da Aia e do jogo, de até 10 s e 3 MB cada. Entram pelo `config.js` (`midias.vr`, README, item 4), sem mexer no HTML. Os vídeos do VR que estão no Drive (pasta da São Paulo Innovation Week) têm de 50 a 450 MB e não puderam ser baixados por aqui: mandem os trechos já cortados (ou os arquivos direto na conversa) e eu converto. Só adultos nos vídeos.
- [ ] Enviar a **formação** para a biografia, se quiser.
- [ ] Quando os apps saírem nas lojas: colar os links em `app.lojas` no `config.js`.

## Maria

- [ ] **[antes de publicar]** Endereço dos formulários (contato, InclusiNews e lista de espera) no `config.js`.
- [ ] **[antes de publicar]** Cupom de 10% dos animais escondidos (1 por CPF) e rotina de conferência dos prints.
- [ ] **[até 31/10]** Cupom IGOR na loja (item 3 do topo).
- [ ] Atualizar também **na loja** o texto do envio, igual ao do site (modalidade Módico, até 10 dias úteis; SEDEX e PAC mais rápidos e mais caros).
- [ ] Opcional: número de **exemplares doados**, se quiserem mostrar (hoje: "parte dos exemplares foi doada", sem número).
- [ ] Decidir se quer **estatísticas sem cookies** (Plausible ou Umami; campo `analytics` no `config.js`).

## Victor

- [ ] **[antes de publicar]** Autorizações de imagem (item 2 do topo). Na página do VR entraram duas fotos da São Paulo Innovation Week (maio de 2026): o estande, sem pessoas, e o Victor com os óculos de realidade virtual. Confira as legendas.
- [ ] **[até 31/10]** Redação da Black November: "de R$ 149,90 por R$ 99,90 com o cupom IGOR", o marca-páginas e o frete grátis fora de novembro (itens 3 e 4 do topo).
- [ ] **[antes de publicar]** Revisar a **Política de Privacidade** (rascunho em `/privacidade/`): prazos de guarda, serviços usados, encarregado de dados (DPO) e o tratamento do **CPF** no resgate do cupom dos animais (o site não pede CPF; a conferência é feita pela equipe, fora do site).
- [ ] **[antes de publicar]** Texto e logos obrigatórios de **crédito do PROAC/PNAB** na página do SinalizaAção VR, conforme o manual do edital.
- [ ] Revisar a declaração de **Acessibilidade** com o Fauston.
- [ ] Conferir a página **em inglês** (`/en/`) para o Web Summit Lisboa.

## Aram e Igor (pedir pela equipe)

- [ ] **Aram:** versão **horizontal oficial** do logo (mão inteira + "inclusiVR"). A do topo foi montada com os pixels dos PNGs originais; o arquivo oficial entra no lugar com o mesmo nome (`assets/img/marca/inclusivr-branco-ciano-horizontal-*`).
- [ ] **Igor:** desenhos do **processo criativo** (rascunhos e versões) para a página do livro (a vaga aparece só no rascunho).
- [ ] **Igor:** concept arts do SinalizaAção VR (rotular como "conceito"), quando puderem ser mostradas.
- [ ] **Igor:** se quiser, o Seu Zé e a Maga Aia em arquivo separado (com fundo transparente) para o topo do início. Hoje os dois foram recortados das páginas 9 (Seu Zé apontando) e 13 (Aia com a borboleta) do livro. Com os arquivos do Igor, dá até para fazer os dois encostados na mão da InclusiVR.

## Arquivos que faltam ou podem melhorar

- [ ] **Posts do Instagram** para a área do blog: imagem + link de cada post (`instagramPosts` no `config.js`). Sem eles, o blog mostra o convite para seguir com fotos nossas.
- [ ] **Links das outras redes** (TikTok, YouTube, LinkedIn): os campos estão vazios no `config.js` e só aparecem quando preenchidos.
- [ ] **Feira da Diversidade:** dia, cidade e local (o post diz só "junho de 2026").
- [ ] **Cartas em 300 dpi:** se houver os arquivos originais, trocar em `assets/downloads/` mantendo o layout.
- [ ] **Fotos da equipe em alta resolução** (as atuais servem para o site, não para impressão).
- [ ] **Seguidores do Igor:** o site diz "mais de 800 mil" (texto da versão anterior, aprovado). As fontes variam (660 mil na inscrição do PROAC 2025; mais de 1 milhão num texto de 2026): vale atualizar com o número do dia.

---

## Roteiros dos vídeos em LIBRAS

Todos com legenda em português (arquivo `.vtt`), sem música obrigatória e sem depender de som. Duração sugerida: até 40 segundos.

**1. Boas-vindas (topo do início, opcional).** Sugestão curta: "Oi! Eu sou a Aia. Bem-vindo a Signária!"

**2. Apresentação do livro (página SinalizaAção).**
> Este é o livro SinalizaAção: Animais em Voga. Os animais do zoológico do Seu Zé sumiram, e a Maga Aia ajuda com as runas mágicas de LIBRAS. Nas páginas da esquerda, ponha a mão na runa e sinalize junto. Nas da direita, use o app: o animal salta em 3D e o intérprete mostra o sinal. No fim, recorte as cartas e jogue com a família.

**3. Passo a passo do app (página do app de AR).**
> Abra inclusivr.com.br/app no celular ou no tablet. Não precisa instalar. Permita a câmera. Abra o livro numa página da direita e aponte o celular, a uns 30 centímetros. Uma página por vez. Quando o animal aparecer, toque no botão do intérprete para ver o sinal em LIBRAS.

**4. Recado da Aia (saiu do início em 28/10; só grave se o recado voltar).**
> Oi, eu sou a Aia. Aqui em Signária, a LIBRAS é nossa língua e fonte de magia. Quem aprende um sinal para se aproximar de alguém também ganha essa magia. Vamos sinalizar juntos?

Depois de gravar: colocar os arquivos em `assets/video/` e preencher `videosLibras` no `config.js` (README, item 7).
