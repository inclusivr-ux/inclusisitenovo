# Progresso

Situação em 22/10/2026: versão com a Black November do briefing da Matraca, a página inicial nova e as alterações do segundo PDF dos sócios (3ª rodada). Meta: publicar até 26/10; a campanha começa sozinha em 1/11.

## Feito na 3ª rodada de 22/10 (PDF "Alterações do site" e vídeo do Igor)

- Vídeo do Igor com o livro tocando no player do navegador (MP4 e WebM, só no play), versão original cortada antes do convite da live de 23/03, com a capa enviada e uma trilha instrumental original de 40 s, em volume confortável.
- Só a abelha se mexe: saíram a Aia e o Seu Zé espiando e o palco do rodapé; o topo do início ficou parado.
- Trocar de aba sempre leva ao topo (também ao clicar na aba atual e na prévia).
- Início: cartela "Uma história construída por muitas mãos.", Recado da Aia sem o segredo, cidade de Signária sem texto por cima no computador (e mais de perto no celular), bloco do livro enxuto (sem a faixa etária e o preço repetidos).
- Quem somos: pedagogia explicada por produto, Cultura de Acesso em poucas palavras, NIDUS no InovaUSP; foto do Igor enviada em todo o site e no kit de imprensa.
- SinalizaAção VR: "O projeto hoje", com fotos da São Paulo Innovation Week e espaço para os GIFs e vídeos do Espelho Mágico da Aia (`midias.vr`).
- Revisão: o `config.js` tinha o bloco `midias` repetido (corrigido); verificação estática sem problemas; axe-core sem problemas no computador, no celular, com movimento e com a campanha; nenhuma página com rolagem lateral; 103 testes de interação e 13 testes novos dos extras de mídia aprovados; o vídeo testado tocando com som depois do clique.

## Feito na 2ª rodada de 22/10 (topo em holograma)

- Topo do início: a mão da InclusiVR em 3D, no estilo holograma do site anterior (brilho, órbitas e satélites), agora parada; o Seu Zé (p. 9 do livro) aponta para ela e a Maga Aia (p. 13) pisca o olho com a borboleta na mão. Abertura de menos de 4 s, uma vez; brilho ao passar o mouse; tudo parado com "reduzir movimento". Imagem de compartilhamento refeita.
- Botão roxo "Livro SinalizaAção" leva à página do livro, com o selo da Black November; a página do livro mantém o Comprar para a loja. A linha "Nossos produtos" saiu.
- Recado da Aia mais curto, com o texto da equipe.
- No celular, o desenho do topo aparece logo depois do título.
- Revisão: topo visto de 320 a 1920 px (com e sem a campanha, com e sem movimento); nenhuma das 22 páginas com rolagem lateral em 10 larguras; axe-core sem problemas em todas as páginas; 99 testes de interação aprovados; verificação estática sem problemas.

## Feito na 1ª rodada de 22/10

- Black November com o cupom IGOR (R$ 149,90 por R$ 99,90, de 1/11 a 30/11): selo no botão Comprar, placa no livro, bloco com o "cupom do artista" e o marca-páginas assinado, pergunta no FAQ. A faixa verde saiu. Fora de novembro, a nota do preço fala do frete grátis do cupom IGOR.
- Topo do início: "Comprar o livro" + "Conheça a InclusiVR", atalhos para os três produtos e o portal de Signária (selo da InclusiVR, runas, Seu Zé e Maga Aia do Igor).
- Recado da Aia novo; o livro e o vídeo do Igor num bloco só; SinalizaAção VR e Signária IA com mais espaço; Aia 3D nova em todo o site; 7 Gatinhos fora do site.
- Quem somos no fim do início, com galeria de oito fotos do Drive (com pausa); Crie Games, Web Summit Rio e Web Summit Lisboa em "Prêmios, parcerias e eventos".
- InclusiNews sem os 10%; mini-jogo só com a frase do rodapé (em novembro, leva ao cupom IGOR); sem a mensagem rosa.
- Página do livro sem os vídeos das crianças; página de apps sem "Antes de abrir" (QR no topo); foto nova do Igor (site e kit de imprensa).
- Imagens de compartilhamento do início e da Signária IA refeitas; imagens e vídeos sem uso retirados; documentos fora da pasta do site e .md bloqueado no `.htaccess`.
- Revisão: páginas vistas em 375 px e 1440 px (com e sem a campanha); nenhuma das 22 páginas com rolagem lateral em 10 larguras (de 320 a 1440 px); axe-core sem problemas em todas as páginas (celular, computador, com movimento e com a campanha); 93 testes de interação aprovados (campanha antes, durante e depois, prêmio dos animais fora e dentro de novembro, galeria com pausa e teclado, animação do topo que para antes de 5 s, movimento reduzido, formulários, jogos, menu e teclado); verificação estática de links, títulos, textos alternativos e de conteúdo retirado (7 Gatinhos, 10% da InclusiNews, faixa, vídeos das crianças).

## Próximos passos (equipe)

1. Resolver os itens [antes de publicar] e [até 31/10] do `PENDENCIAS.md` (as 7 mais importantes estão no topo).
2. Publicar até 26/10 sem apagar a pasta `/app` do servidor (README, passo 3) e testar no celular. Para ver a Black November antes de 1/11: `?campanha=previa`.
3. Até 30/10: datas de corte do Natal no `config.js` (`natal.texto`).
4. Semana da Black Friday: app de AR novo (fotos e post).
5. Depois de 30/11: a campanha some sozinha; conferir o preço da loja.
