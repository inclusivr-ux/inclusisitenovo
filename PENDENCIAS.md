# Pendências

O que a equipe precisa enviar, confirmar ou decidir. O site publicado não mostra os rótulos. Para ver cada item no próprio site, com um rótulo rosa **A CONFIRMAR**, abra qualquer página com `?rascunho=1` no fim do endereço.

Legenda: **[antes de publicar]** = precisa estar resolvido até 31/10/2026.

## As 5 mais importantes

1. **[antes de publicar] JLeo: mover o app de AR para `/app/ar/`** e testar no celular (README, passo 3). Sem isso, o botão "Abrir o app de AR" não abre nada.
2. **[antes de publicar] JLeo: testar as 5 páginas de contorno amarelo** (abelha, elefante, iguana, onça e urso) na tela do computador e do tablet. Se alguma não funcionar, ela sai do site ou é trocada pela imagem certa.
3. **[antes de publicar] Fauston: revisar as descrições dos sinais** usadas nos textos alternativos das cartas e dos minijogos (estão marcadas como provisórias).
4. **[antes de publicar] Maria: endereço dos formulários** (Formspree, Brevo ou outro). Sem ele, os formulários abrem o e-mail da pessoa, o que funciona, mas é menos prático.
5. **[antes de publicar] Victor: revisar a Política de Privacidade** e informar o encarregado de dados (DPO).

---

## Luciano

- [ ] Revisar o texto do **Recado da Aia** (página inicial), junto com o Fauston. Texto atual: "Oi! Eu sou a Aia. Quando a criança surda conhece a LIBRAS cedo, ela ganha uma língua para pensar, brincar e fazer amigos. Quando a criança ouvinte aprende LIBRAS, as duas conversam. Vamos sinalizar juntos?" (33 palavras).
- [ ] Aprovar as versões animadas da **Aia e do Seu Zé** (arquivos em `assets/img/personagens/`). De preferência, pedir um acabamento ao Aram ou ao Igor. As mãos ficam escondidas de propósito: nenhum gesto vira sinal errado.
- [ ] Aprovar o **palco do rodapé**: Seu Zé de corpo inteiro e o elefante, desenhados em partes para a animação 2D (`assets/js/personagens.js`), nas cenas "Pega-pega" e "Esconde-esconde". As mãos ficam no bolso ou segurando a rede. Se aprovarem, vale pedir ao Aram ou ao Igor o acabamento desses dois desenhos.
- [ ] Confirmar que as **telas de conceito da Signária IA** podem ir ao ar (abertura, mapa e fase concluída). As telas "Sua vez" e "Quase!" mostram sinais provisórios e só aparecem no rascunho até a revisão do Fauston.
- [ ] Decidir se a vitrine de **O Resgate dos 7 Gatinhos** pode aparecer na página de jogos antes do resultado do PROAC Jogos (hoje, só no rascunho).
- [ ] Confirmar as **datas exatas dos posts**: aprovação no PROAC, finalistas da Tools Competition e Prêmio Sebrae Startups (hoje aparecem só como "2026").
- [ ] Enviar a **apresentação para investidores ou um one-pager em PDF** para a seção "Para investidores e imprensa" (salvar como `assets/downloads/apresentacao-inclusivr.pdf`).
- [ ] Gravar ou indicar quem grava os **vídeos em LIBRAS** (roteiros no fim deste arquivo).

## Fauston

- [ ] **[antes de publicar]** Revisar as descrições dos sinais (texto alternativo das cartas): em `assets/js/jogos.js` (campo `altSinal`) e na galeria dos animais da página do livro.
- [ ] Revisar o **Recado da Aia** com o Luciano.
- [ ] Liberar ou pedir ajustes nas telas da Signária IA com sinais provisórios ("Sua vez" e "Quase!").
- [ ] Decidir sobre o **VLibras** (deixado desligado no `config.js`).
- [ ] Revisar a declaração de **Acessibilidade** com o Victor.
- [ ] Gravar os **vídeos em LIBRAS** (roteiros abaixo). Sugestão: as boas-vindas gravadas por uma pessoa surda (o Igor, por exemplo), para reforçar o protagonismo surdo. A decisão é da equipe.

## JLeo

- [ ] **[antes de publicar]** Mover o build do app de AR para `/app/ar/` e testar (README, passo 3).
- [ ] **[antes de publicar]** Testar no app as 5 páginas de contorno amarelo, na tela (`/app/` e `/app/ar-do-livro/`, botão "Ver em tela cheia para escanear").
- [ ] Enviar a **formação** para a biografia (o campo aparece como "a confirmar").
- [ ] Confirmar se o app de AR **envia ou guarda imagens da câmera** (para a Política de Privacidade).
- [ ] Opcional: modelos 3D dos animais em `.glb` (a galeria já mostra o 3D e o botão "Ver no seu espaço" quando o arquivo existir; ver `modelos3d` no `config.js`).
- [ ] Opcional: um vídeo curto do app de AR funcionando (gravação de tela, com legenda) e um do protótipo da Signária IA.
- [ ] Quando os apps saírem nas lojas: colar os links em `app.lojas` no `config.js` (e os selos oficiais, se quiser).

## Maria

- [ ] **[antes de publicar]** Criar o endereço dos formulários (contato, InclusiNews e lista de espera) e colar no `config.js`.
- [ ] **[antes de publicar]** Confirmar o **preço**: a ficha diz "de R$ 149,90 por R$ 99,90" hoje e a mesma oferta na Black Friday. Se a Black Friday tiver outro preço ou cupom, atualizar o bloco `campanha`.
- [ ] Confirmar os **números do livro**: o site usa "cerca de 200 vendidos e 50 doados até out/2026" (fatos do briefing). A memória da empresa tinha "cerca de 150 vendidos e 100 doados". Usamos o briefing por ser o mais recente.
- [ ] Explicar como o **desconto de 10% da InclusiNews** é entregue (cupom por e-mail?), para o texto ficar claro.
- [ ] Decidir se quer **estatísticas sem cookies** (Plausible ou Umami; campo `analytics` no `config.js`).

## Victor

- [ ] **[antes de publicar]** Revisar a **Política de Privacidade** (rascunho em `/privacidade/`): prazos de guarda, serviços usados, encarregado de dados (DPO).
- [ ] **[antes de publicar]** Enviar o **texto e os logos obrigatórios de crédito do PROAC/PNAB** para a página do SinalizaAção VR, conforme o manual do edital.
- [ ] Revisar a declaração de **Acessibilidade** com o Fauston.
- [ ] Conferir a página **em inglês** (`/en/`) para o Web Summit Lisboa.
- [ ] Garantir **autorização de imagem** para qualquer foto ou vídeo com crianças antes de usar nas galerias.
- [ ] Enviar mais dados para a biografia, se quiser (hoje ela tem cerca de 35 palavras; o pedido era 50 a 70, e não inventamos nada).

## Aram e Igor (pedir pela equipe)

- [ ] Acabamento das animações da **Aia e do Seu Zé** no traço do Aram, incluindo o Seu Zé de corpo inteiro e o elefante do palco do rodapé.
- [ ] Confirmar a **foto do Igor** usada em Quem somos (anexo A7, escolhida entre as imagens enviadas).
- [ ] **Concept arts do SinalizaAção VR** para a galeria da página do VR (rotular como "conceito").

## Arquivos que faltam ou podem melhorar

- [ ] **A5, PDF informativo com os produtos:** não chegou. O arquivo "InclusiVR - Tecnologia Imersiva" é o print do site atual (A1). As descrições dos produtos vieram dos fatos do briefing.
- [ ] **Fotos da equipe em alta resolução:** as atuais têm cerca de 640 px e servem para o site, mas não para impressão. Refazer com: luz frontal suave, fundo liso, rosto e ombros, olhos na altura de 1/3 da foto, a mesma camiseta da marca, câmera na altura dos olhos. A padronização (recorte, fundo índigo e círculo) já está feita.
- [ ] **Cartas em 300 dpi:** o PDF das cartas foi montado com as imagens do anexo A4 (cerca de 250 dpi no tamanho impresso). Se houver os arquivos originais, trocar em `assets/downloads/` e manter o mesmo layout.
- [ ] **Fotos e vídeos demonstrativos** (livro aberto, AR funcionando, crianças brincando, com autorização) para as galerias. As vagas aparecem só no rascunho (`?rascunho=1`).
- [ ] **Logos de apoiadores** (se quiserem logos na lista de parceiros): só com autorização de uso.

---

## Roteiros dos vídeos em LIBRAS

Todos com legenda em português (arquivo `.vtt`), sem música obrigatória e sem depender de som. Duração sugerida: até 40 segundos.

**1. Boas-vindas (página inicial).** Sugestão: gravado por uma pessoa surda.
> Olá! Bem-vindo à InclusiVR. A gente cria livros, apps e jogos para aprender LIBRAS brincando, na cidade de Signária, onde todo mundo sinaliza. Aponte o celular para o livro e veja os animais saltarem da página. Quer testar de graça? Baixe as cartas. Vamos sinalizar juntos!

**2. Apresentação do livro (página SinalizaAção).**
> Este é o livro SinalizaAção: Animais em Voga. Seu Zé, o dono do zoológico, perdeu todos os animais. A Maga Aia ajuda com runas mágicas de LIBRAS. Nas páginas da esquerda, ponha a mão na runa e sinalize junto. Nas da direita, use o app: o animal salta em 3D e o intérprete mostra o sinal. No fim, recorte as cartas e jogue com a família.

**3. Passo a passo do app (página App).**
> Abra o app de AR no celular ou no tablet. Não precisa instalar. Permita a câmera. Abra o livro numa página da direita e aponte o celular, a uns 30 centímetros. Uma página por vez. Quando o animal aparecer, toque no botão do intérprete para ver o sinal em LIBRAS.

**4. Recado da Aia (página inicial, ao lado do balão).**
> Oi! Eu sou a Aia. Quando a criança surda conhece a LIBRAS cedo, ela ganha uma língua para pensar, brincar e fazer amigos. Quando a criança ouvinte aprende LIBRAS, as duas conversam. Vamos sinalizar juntos?

Depois de gravar: colocar os arquivos em `assets/video/` e preencher `videosLibras` no `config.js` (README, item 7).
