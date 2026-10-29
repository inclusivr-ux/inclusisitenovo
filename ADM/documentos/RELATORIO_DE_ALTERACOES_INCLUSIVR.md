# Relatório de alterações do site da InclusiVR

**4ª rodada · Plano de Alterações da reunião de 28/10/2026 · entregue em 29/10/2026**

Base do trabalho: o PDF "Plano de Alterações do Site InclusiVR" (53 itens numerados, complementos A a G e pendências P1 a P10, com o apêndice "DO MENU.pdf") e os arquivos da Pasta Exemplo (`Exemplo/` no repositório). O site continua estático (só HTML, CSS e JavaScript), sem servidor próprio, sem framework e sem etapa de build.

## Resumo

- **Todos os 53 itens e os complementos A a G foram atendidos.** Os únicos pontos que ficaram parados são os que o próprio plano bloqueia até a equipe responder: a frase nova da página do livro (P1), os dois links do Instagram do Igor (P2) e a referência da animação das cartas (P3). Para a P3, o site já tem uma animação provisória, explicada na seção 3.
- **Botão EN:** agora só traduz. Todas as páginas trocam para o inglês no lugar, com o mesmo layout, o mesmo menu e o botão de compra ("Buy"). O botão vira PT para voltar.
- **Textos novos que dependem de aprovação** (O problema, Nossa abordagem, linha do tempo, biografias e posts) estão no ar como proposta e marcados com um rótulo rosa, que só aparece com `?rascunho=1` no fim do endereço.
- **Testes:** nenhum problema nas 19 páginas, em 10 larguras de tela, em português e em inglês. Nenhuma violação de acessibilidade no axe-core. Os testes de interação passaram (detalhes na seção 6).
- **O que a equipe precisa fazer agora:** seção 7 (pendências) e o topo do `PENDENCIAS.md`.
- **Atualização de 29/10 (logos novos):** os quatro logos enviados depois da entrega (VaiTec, Crie Games, Web Summit Rio e Web Summit Lisboa) já estão no início e em Quem somos (seção 1.8).

Como ver o site no computador: abra a pasta do site com um servidor local (por exemplo, `python3 -m http.server` na pasta do site) e acesse `http://localhost:8000`. Atalhos úteis no fim de qualquer endereço:

- `?campanha=previa` mostra a Black November antes de 1/11.
- `?rascunho=1` mostra os rótulos rosa dos textos que esperam aprovação.
- `?lang=en` abre em inglês e `?lang=pt` volta ao português.

O trabalho está no branch `claude/bold-curie-l6853n` do repositório (nenhum pull request foi aberto).

---

## 1. Alterações realizadas

As decisões citadas (W39 a W61) estão explicadas no `DECISOES.md`. A coluna "Status" segue a legenda do `CHECKLIST.md`.

### 1.1 Menu e navegação (todas as páginas)

| Item do PDF | O que foi feito | Status |
| --- | --- | --- |
| 1. EN só traduz, sem mudar o layout | Antes, o EN levava a outra página (`/en/`), com outro desenho e sem o botão Comprar. Agora o EN troca os textos da própria página para o inglês: menus, botões, links, jogos, formulários, avisos, preços da campanha, títulos da aba e textos alternativos das imagens. Nada muda de lugar. O botão vira **PT** para voltar ao português, também no lugar. A escolha fica guardada no navegador e vale para as próximas páginas. O dicionário (`assets/js/traducao-en.js`) só é baixado quando alguém escolhe o inglês. | feito; revisão do inglês pela equipe |
| 2. Comprar visível em todos os idiomas | O cabeçalho é o mesmo nos dois idiomas. O botão "Comprar" vira "Buy", no mesmo lugar e com o mesmo link da loja. O teste automático confere o botão em todas as páginas, em PT e EN. | feito |

### 1.2 Página inicial

| Item do PDF | O que foi feito | Status |
| --- | --- | --- |
| 3. Caixa Black November abaixo do botão "Livro SinalizaAção" | Caixa preta com borda lima, no estilo da referência BlackExemplo, logo abaixo do botão roxo: "BLACK NOVEMBER · R$ 99,90 com cupom IGOR". Aparece sozinha de 1/11 a 30/11 (e com `?campanha=previa`). Os outros elementos do bloco continuam no lugar. | feito |
| 4 e A. Seu Zé com o livro, segurando com as duas mãos e sem apontar | Nova imagem do Seu Zé no topo, montada com o desenho do Igor da cena 10 do livro (em que ele segura as runas com as duas mãos e não aponta), com a capa do livro SinalizaAção no lugar das runas. A expressão e o traço são os do Igor. O texto que descreve a ilustração para leitores de tela também mudou. | feito (seção 3, D4) |
| 5. Esferas girando ao redor do logo no mouse | As três esferas giram nas órbitas enquanto o mouse está sobre a mão da InclusiVR (no celular, um toque faz girar por 2 s). Elas passam por trás da mão na metade de cima da órbita e voltam ao lugar quando o mouse sai. Não atrapalham a leitura nem os botões. Com "reduzir movimento" ligado no aparelho, ficam paradas. | feito |
| 6. Anomalia no cabelo da Aia | A falha era uma mancha vermelha solta à direita da cabeça, que sobrou do recorte do desenho. Saiu só a mancha e o contorno dela. O resto da arte ficou igual. | feito |
| 7 e C. Signária: sem o texto da Aia, cidade em destaque, sem botão | O "Recado da Aia" (texto e balão) saiu. A cidade ocupa a largura do bloco, só com a cartela "ESTA É SIGNÁRIA / UMA CIDADE BASTANTE PECULIAR: TODOS OS MORADORES COMUNICAM-SE EM LIBRAS." Não há botão. | feito |
| 8. Atributos do livro em cards | Quatro cards iguais, cada um com ícone, nome e uma linha: "A partir de 3 anos", "Página com textura", "Realidade aumentada" e "Cartas para jogar". No celular, um embaixo do outro. | feito |
| 9. "Em desenvolvimento" → "Próximos lançamentos" | O sobretítulo do bloco virou "Próximos lançamentos". O selo do SinalizaAção VR passou de "Em desenvolvimento" para "Em breve", igual ao da Signária IA, para não afirmar desenvolvimento avançado. | feito |
| 10. Composição da Aia para "O que vem por aí" | Card da Signária IA com a Aia em 3D e o celular com a tela do mapa, montado com os arquivos `aia-3d-380.webp` e `IA.webp`. A `IA.png` foi usada só como referência do resultado. | feito |
| 11. Vídeo do SinalizaAção VR no lugar da imagem | O vídeo enviado (1,6 MB) virou 578 KB em MP4 e 460 KB em WebM, com a mesma imagem e a mesma duração (16,7 s). A trilha de áudio saiu, porque era muda. O vídeo toca sozinho e sem som só enquanto está na tela, tem botão de pausa e não baixa nada antes de aparecer. Com "reduzir movimento" ou economia de dados, só toca no clique. | feito |
| 12. Livro antes de Signária | O bloco do livro veio para logo depois do topo; Signária ficou abaixo dele. | feito |
| 13. Margens no computador e no celular | A margem lateral do celular passou de 16 para 20 px. A linha acima dos logos acompanha o conteúdo. Botões com texto longo quebram a linha em vez de passar da borda da tela (em 320 px). Conferido: nenhuma página com rolagem lateral, de 320 a 1920 px. | feito |
| 14, 16 e 17. Cards de públicos iguais, uma imagem só, cards como links de contato | O título fica acima de uma imagem só: a praça de Signária (a imagem do centro, que era a de "Escolas e instituições"). Abaixo, três cards do mesmo tamanho e estilo (ícone, título, texto e "Falar com a equipe"). Cada link abre o contato com o perfil já marcado (família, escola ou investidor). O card de investidores perdeu os números e ficou com uma frase. | feito |
| 15. Títulos sem ponto final | Em todo o site (seção 1.7). | feito |
| B. Livro em destaque | O bloco do livro é o primeiro depois do topo, com os cards de atributos, o preço (a caixa preta da Black November em novembro) e os botões. | feito |
| D. Sem a imagem do jogo do gato | Não entrou. O 7 Gatinhos continua fora do site. | feito |
| E. Galeria maior e logos certos | Galeria mais larga. Cada logo fica numa placa do mesmo tamanho, sobre o fundo escuro. O Sebrae Startups (azul, que sumia no fundo noite) entrou na versão branca. Os outros já estavam na versão para fundo escuro. Em 29/10, entraram os quatro logos novos da Pasta Exemplo (seção 1.8). | feito |

### 1.3 Página do livro (`sinalizaacao/`)

| Item do PDF | O que foi feito | Status |
| --- | --- | --- |
| 18. Oferta Black November padronizada | A mesma caixa do início: R$ 149,90 riscado, R$ 99,90 em destaque, "com o cupom IGOR" e a nota "Um cupom por pedido. O valor final aparece na loja." Em novembro e na prévia. Fora de novembro, o preço normal e a frase do frete grátis. | feito |
| 19. Sem "Livro 1 da coletânea de livros" | Saiu da página do livro. Também saiu do bloco do livro no início ("Coletânea LIBROS, livro 1"), para ficar coerente. | feito |
| F. Composição anterior do livro | A montagem de 15/10 voltou ao topo da página: livro aberto, celular e elefante em 3D, com a placa "Experiência em realidade aumentada". Os arquivos do elefante foram recuperados do histórico do projeto (versão de 15/10), sem reconstruir nada por suposição. A placa da campanha saiu de cima da arte, porque a oferta já aparece ao lado do preço. | feito |
| 20 a 23. Cartas: as duas formas de brincar, app primeiro, 10 cartas e 5 animais | Nova seção "Cartas para imprimir e brincar". Ela diz que são 10 cartas (5 vogais e 5 animais) e mostra dois cards. **1 · Com o aplicativo**: os três minijogos, que abrem no navegador, com o botão "Jogar os minijogos". **2 · Sem celular, em casa**: as duas regras do livro e o botão "Baixar as 10 cartas (PDF)", com a descrição do PDF. O card das cartas em "Por dentro do livro" leva a essa seção. | feito; confirmar a lista das cartas (P5) |
| 24. Faixa divisória da seção de cartas | A faixa estreita, que parecia solta, virou uma seção no mesmo estilo de cards da página. | feito |
| 25 e G. Animação nos cards de download | As cartas A, E e I da área de download abrem em leque ao passar o mouse ou ao receber o foco do teclado, e uma vez quando aparecem na tela. É uma interpretação provisória (seção 3, D9). | parcial: falta a referência (P3) |
| P1. Frase "Será que a magia da LIBRAS vai trazer todo mundo de volta?" | Continua igual, como o plano manda, até a equipe enviar a frase nova. | depende da equipe |

### 1.4 Página do app (`apps/`) e página dos jogos (`apps/jogos/`)

| Item do PDF | O que foi feito | Status |
| --- | --- | --- |
| 26. Sem "Outros apps da InclusiVR" | A lista "Os apps da InclusiVR" (app de AR, Signária IA, SinalizaAção VR e Jogos) saiu. A página fala só do app do livro. | feito |
| 27. As duas funções do app | O topo diz: "O app tem duas funções: ver o livro em realidade aumentada e jogar os minijogos com as cartas." Abaixo, dois cards separados: **1 · Realidade aumentada** e **2 · Minijogos**, cada um com imagem, texto e o seu botão. | feito |
| 28. Abre no navegador | Aviso em destaque: "Abre direto no navegador. Não precisa instalar nada: funciona no celular, no tablet e no computador." | feito |
| 29. Links separados | "Abrir a realidade aumentada" leva ao app de AR (`inclusivr.com.br/app`). "Jogar os minijogos" leva à página dos jogos (`/apps/jogos/`). | feito |
| 30. Imagens reais dos minijogos, mais convidativos | Capturas reais dos três jogos, feitas no próprio site. Na página do app, a seção "Três jogos com as cartas do livro" tem um card por jogo, cada um com link direto para o jogo. Na página dos jogos, as abas viraram três cartões com a tela de cada jogo e uma dica ("Forme os pares", "Ache o sinal certo", "Complete a palavra"), e o jogo fica numa "mesa" branca. | feito |

### 1.5 Quem somos (`quem-somos/`)

| Item do PDF | O que foi feito | Status |
| --- | --- | --- |
| 31. O problema, sem estatística | Texto novo: "Quando falta LIBRAS, falta conversa". Ele explica a barreira de comunicação e por que praticar LIBRAS importa para a inclusão. Saiu o dado de 90% e a fonte. A lei ficou num quadro ao lado (2002, 2005 e 2021). | feito; aprovação (P9) |
| 32 e 33. Nossa abordagem com os quatro pilares e a comunidade surda | Título "O que move a InclusiVR". O texto cita os quatro pilares: tecnologia, entretenimento, narrativa e sensibilidade, e acessibilidade e inclusão. Quatro quadros: "Tecnologia que aproxima", "Brincar para aprender", "Uma história que emociona" e "Inclusão feita com a comunidade surda" (o 4º, com o Igor e a consultoria da Cultura de Acesso). | feito; aprovação (P9) |
| 34. Sem o trecho de 2023 e o parágrafo seguinte | Saíram "Com a comunidade surda. De 2023 a 2025..." e "Tecnologia como apoio...". | feito |
| 35. Imagem da Signária IA nos produtos | A mesma composição do início (Aia 3D e a tela do mapa). | feito |
| 36. Título e imagem como link, sem "Conhecer" | O card inteiro de cada produto é clicável. Saíram os três links "Conhecer...". | feito |
| 37. "Nossa história" sem os subtítulos | Ficou "Nossa história". Saíram "Do primeiro sonho ao livro nas mãos." e "Nem sempre o primeiro caminho é o caminho final." | feito |
| 38. Linha do tempo com os marcos do plano | 2023: a ideia nasce na pós-graduação da USP. 2024: incubação no NIDUS e equipe formada. 2025: lançamento do livro de LIBRAS com realidade aumentada. 2026: Crie Games, Web Summit Rio e Lisboa, app com novas funções e minijogos, site novo e SinalizaAção VR em desenvolvimento. Saíram os marcos "2023–2025: Dois anos de escuta" e "Hoje", que não estão na lista do plano. | feito; conferir fatos (P6) |
| 39. Sem a EMEBS Anne Sullivan | Retirada da lista "Feito por muitas mãos". | feito |
| 40. Parceiros mantidos | Igor Bucioli (o plano escreve "Bucholi"; ficou a grafia correta), Cultura de Acesso e Associação dos Surdos de Ribeirão Preto continuam. A EMEBS Helen Keller e a Associação de Surdos de São Paulo também continuam, porque não houve pedido para tirá-las. Nenhum parceiro novo entrou. | feito; confirmar Helen Keller e ASSP |
| 41. Chamada para novas parcerias | Quadro "Venha ser parceiro da InclusiVR", com o botão "Quero ser parceiro", que abre o contato com o perfil "Parceria" marcado. | feito |
| 42. "Conheça nosso time", sem subtítulo | Saíram "Cinco sócios, uma língua em comum." e "Formações diferentes, que se completam." | feito |
| 43. Alinhamento da equipe | Foto, nome e papel centralizados. A última linha (dois integrantes) fica no meio. As biografias ficam alinhadas à esquerda. | feito |
| 44. Nomes da equipe | Luciano Azevedo, Maria Clara Franco, Victor Sad, JLeo e Fauston, também nos textos alternativos das fotos e na página `/en/`. Entrou a foto nova do JLeo (Pasta Exemplo). | feito; confirmar (P7) |
| 45. Bio da Maria | "Tem experiência na área de pesquisa: atua em pesquisa de mercado e em pesquisa com usuários (UX)." | feito |
| 46. Revisão individual das biografias | Arquivo `BIOGRAFIAS_PARA_REVISAO.md`, com uma parte para cada pessoa. Nenhuma biografia foi reescrita além do pedido do item 45. | depende da equipe (P8) |
| 47. Sem a seção repetida de parceiros e ilustrador | Saiu a seção "Parceiro ilustrador · Igor de Campos Bucioli". O Igor continua nos parceiros e no 4º pilar. | feito |
| 48 e 49. Públicos no lugar dos modelos de negócio, sem SaaS | "Modelo de negócio" (B2C, B2B, B2G e SaaS) virou "Para quem a InclusiVR trabalha": famílias, escolas e instituições, empresas, e governos e prefeituras, com o botão "Falar com a equipe". | feito |

### 1.6 Blog (`blog/`)

| Item do PDF | O que foi feito | Status |
| --- | --- | --- |
| 50. Posts com mais contexto | Os cinco posts foram ampliados, com intertítulos: o que é cada prêmio, programa ou evento, por que a InclusiVR foi reconhecida, por que isso importa e o que vem depois. Só entraram fatos que já estavam no site ou na memória da empresa. Ficam marcados para conferência. | feito; conferir fatos (P6) |
| 51. Visual do blog mantido | Mesmo layout, mesmas fotos e mesmo destaque azul nos links. | feito |
| 52. Ordem por data | Cada post ganhou o campo `data` no `blog/posts.json`. O blog e o bloco "Novidades" do início mostram do mais recente para o mais antigo. | feito; datas exatas (P6) |
| 53. Paginação para depois | Já está pronta, mas só aparece com mais de 9 posts: o blog mostra os 9 mais recentes e o botão "Ver publicações mais antigas". O número fica em `blog.postsPorPagina` no `config.js`. | feito |

### 1.7 Em todo o site

- **Item 15, títulos sem ponto final:** 58 títulos e o slogan "Conectando mundos por meio das línguas de sinais e tecnologia" (topo e rodapé), em todas as páginas, incluindo a 404 e a `/en/`. O corpo dos textos, as cartelas narrativas de Signária (como "UMA HISTÓRIA CONSTRUÍDA POR MUITAS MÃOS.") e as legendas continuam com a pontuação normal.
- **Item 13, margens:** a margem do celular vale para todas as páginas, e nenhuma página tem rolagem lateral em 10 larguras, de 320 a 1920 px.
- **Página em inglês antiga (`/en/`):** continua no ar, porque o link já foi divulgado (Web Summit). Ela recebeu as decisões que tocam nela: nomes públicos, "The problem" sem a estatística e "Who we serve" no lugar de "Business model", sem SaaS (W56).
- **Kit de imprensa** (`assets/downloads/kit-imprensa-inclusivr.zip`, sem link no site): a foto do JLeo foi trocada pela nova. Os textos do kit não mudaram.

### 1.8 Logos novos (enviados em 29/10, depois da entrega)

A equipe enviou quatro logos para a Pasta Exemplo (`Exemplo/2910 8h19/`). Eles entraram no bloco "Prêmios, parcerias e eventos" do início e na seção "Feito por muitas mãos" de Quem somos:

| Logo enviado | O que foi feito |
| --- | --- |
| Aceleração VaiTec | Substitui o logo antigo, que era pequeno (147 × 77 px) e ficava borrado em telas de alta resolução. O arquivo novo veio na versão para fundo claro (roxo e verde-água). No fundo escuro, o roxo quase some, por isso o roxo virou branco e o verde-água ficou, como na versão para fundo escuro que o site já usava. |
| Web Summit Rio | Era só texto ("Web Summit Rio · 2026"); virou logo. Veio na versão para fundo claro (texto azul-marinho): o texto virou branco e a marca laranja ficou, como na versão do Web Summit para fundo escuro. |
| Web Summit Lisboa | Era só texto; virou logo, como veio (já é a versão para fundo escuro). |
| Crie Games | Era só texto ("Crie Games · Sebrae"); virou logo, como veio (branco). |

Agora são oito logos em placas iguais: 4 por linha a partir de 768 px e 2 por linha em telas menores. A linha de nomes em texto saiu. Os arquivos têm nomes novos, para que ninguém veja o logo antigo guardado no navegador (as imagens ficam guardadas por um mês). Os textos alternativos são "Crie Games, programa do Sebrae", "Web Summit Rio 2026" e "Web Summit Lisboa 2026", com tradução no modo inglês. Os originais continuam na Pasta Exemplo.

---

## 2. Arquivos modificados, criados e removidos

### Páginas (HTML)

| Arquivo | O que mudou |
| --- | --- |
| `index.html` | Itens 3 a 17 e A a E; títulos; scripts do idioma |
| `sinalizaacao/index.html` | Itens 18 a 25 e F; títulos; scripts do idioma |
| `apps/index.html` | Itens 26 a 30; títulos; scripts do idioma |
| `apps/jogos/index.html` | Item 30 (escolha por cartões); títulos; scripts do idioma |
| `quem-somos/index.html` | Itens 31 a 49; títulos; scripts do idioma |
| `blog/premio-sebrae-startups-2026/index.html`, `blog/inclusivr-na-feira-da-diversidade-2026/index.html`, `blog/signaria-ia-finalista-tools-competition/index.html`, `blog/sinalizaacao-vr-aprovado-no-proac/index.html`, `blog/lancamento-do-livro-sinalizaacao/index.html` | Item 50 (textos ampliados, com marca P6); títulos; scripts do idioma |
| `blog/index.html`, `blog/_modelo-de-post/index.html` | Títulos; scripts do idioma |
| `blog/posts.json` | Campo `data` em cada post (item 52) |
| `en/index.html` | Nomes, "The problem" e "Who we serve" (W56); títulos |
| `apps/ar-do-livro/index.html`, `apps/signaria-ia/index.html`, `apps/sinalizaacao-vr/index.html`, `contato/index.html`, `acessibilidade/index.html`, `privacidade/index.html`, `404.html` | Títulos sem ponto final; scripts do idioma |

### Estilo e funcionamento (CSS e JavaScript)

| Arquivo | O que mudou |
| --- | --- |
| `assets/css/tokens.css` | Margem do celular de 16 para 20 px |
| `assets/css/base.css` | Botões longos não passam da borda; a página fica escondida por um instante enquanto troca para o inglês, para não piscar em português |
| `assets/css/componentes.css` | Caixa da Black November abaixo do botão; placas dos logos; vídeo que toca sozinho com botão de pausa |
| `assets/css/paginas.css` | Novos blocos do início, do livro, do app, dos jogos, de Quem somos e do blog (cards, composições, leque, linha do tempo, equipe, públicos) |
| `assets/js/main.js` | Posição da caixa da campanha; vídeo que toca sozinho; ordem do blog por data e paginação; a pergunta do "Copiar link" em inglês no modo EN |
| `assets/js/animacoes.js` | Esferas girando no mouse; leque das cartas |
| `assets/js/config.js` | Nota do preço da campanha, `campanha.seloTopoInicio`, `blog.postsPorPagina`, `recursos.orbitasNoMouse` e o vídeo do VR em `midias.vr` |
| `assets/js/idioma.js` (novo) | Lê a escolha de idioma antes de a página aparecer (evita piscar) |
| `assets/js/traducao.js` (novo) | O motor do botão EN/PT: troca os textos no lugar e volta exatamente ao português |
| `assets/js/traducao-en.js` (novo) | O dicionário português → inglês (cerca de 1.000 textos e 36 regras para textos com números e nomes) |

### Imagens, vídeo e downloads

| Arquivo | Situação |
| --- | --- |
| `assets/img/hero/seu-ze-livro-200.png`, `-200.webp`, `-400.webp` | Novos (Seu Zé com o livro) |
| `assets/img/hero/seu-ze-aponta-200.png`, `-200.webp`, `-400.webp` | Removidos (Seu Zé apontando) |
| `assets/img/hero/maga-aia-borboleta-260.png`, `-260.webp`, `-520.webp` | Modificados (cabelo da Aia) |
| `assets/img/interface/elefante-3d-520.png`, `-520.webp`, `-900.webp` | Recuperados da versão de 15/10 (composição do livro) |
| `assets/img/jogos/` (12 arquivos) | Novos: capturas reais dos três minijogos (paisagem e retrato) |
| `assets/img/vr/sinalizaacao-vr-trecho-capa-784.jpg` | Novo: capa do vídeo do VR (38 KB) |
| `assets/video/sinalizaacao-vr-trecho.mp4` e `.webm` | Novos: vídeo do VR otimizado (578 KB e 460 KB) |
| `assets/img/equipe/jose-leonardo-martins-200.webp`, `-400.jpg`, `-400.webp` | Modificados: foto nova do JLeo |
| `assets/downloads/kit-imprensa-inclusivr.zip` | Modificado: foto nova do JLeo no kit |
| `assets/img/logos/vaitec-aceleracao.webp`, `crie-games.webp`, `web-summit-rio.webp` e `web-summit-lisboa.webp` | Novos (29/10): os logos enviados, na versão para fundo escuro |
| `assets/img/logos/vaitec.webp` | Removido (29/10): o logo antigo do VaiTec |

### Documentos da equipe (pasta `ADM/`, não vai para o servidor)

| Arquivo | Situação |
| --- | --- |
| `ADM/documentos/RELATORIO_DE_ALTERACOES_INCLUSIVR.md` | Novo (este relatório) |
| `ADM/documentos/capturas-28-10/` (44 imagens) | Novas: capturas de tela do computador e do celular (anexo) |
| `ADM/documentos/BIOGRAFIAS_PARA_REVISAO.md` | Novo: biografias para cada um revisar a sua (P8) |
| `ADM/documentos/PENDENCIAS.md` | Pendências da rodada no topo (P1 a P10 e outras) |
| `ADM/documentos/DECISOES.md` | Decisões W39 a W61 |
| `ADM/documentos/CHECKLIST.md` | Tabela da rodada de 28/10 |
| `ADM/documentos/README.md` | Como mexer no idioma, no vídeo, no blog e nas novas opções do `config.js` |
| `ADM/documentos/PROGRESSO.md` e `ADM/LEIA-ME.txt` | Resumo da 4ª rodada |

---

## 3. Decisões tomadas por conta própria

Onde o plano não definia o resultado exato, a escolha foi a mais segura para os dois públicos (crianças e famílias, e quem decide compras e parcerias), dentro da identidade visual. Tudo pode ser trocado; o "como" está em cada item.

| # | O que não estava definido | O que foi feito | Por quê / como mudar |
| --- | --- | --- | --- |
| D1 | Como "só traduzir" sem uma página nova para cada idioma | Tradução no lugar, com um dicionário que troca cada texto da página. Textos que aparecem depois (jogos, avisos, preço da campanha, lista do blog) também são traduzidos. A página `/en/` continua no ar e é o destino do EN para quem navega sem JavaScript (W39). | Mantém o layout e as funções idênticos, sem duplicar as páginas. Para mudar uma tradução, troque o lado inglês da linha no `traducao-en.js` (README, seção 13). |
| D2 | Termos do inglês | Os nomes do universo ficam como estão (SinalizaAção, Signária, Maga Aia, Seu Zé, LIBRAS, InclusiNews, título do livro). "Signária IA" vira "Signaria AI", como manda a regra de escrita da marca. "Coletânea LIBROS" vira "LIBROS Collection". Preços em inglês: "R$ 99.90". | Coerência com a marca e com a página `/en/`. |
| D3 | Animais do app de AR em inglês | Na página do app de AR, os animais aparecem como "Bee (abelha)", "Elephant (elefante)", "Iguana", "Jaguar (onça)" e "Bear (urso)". | A letra de cada animal (A, E, I, O, U) vem do nome em português. Sem o nome original, "A" ao lado de "Bee" não faria sentido. |
| D4 | Não havia desenho do Seu Zé com o livro (itens 4 e A) | Em vez de redesenhar o personagem, foi usado o desenho do Igor da cena 10 (Seu Zé segurando as runas com as duas mãos, sem apontar), com a capa do livro no lugar das runas e a barba e os dedos por cima (W41). Sem filtro e sem espelhar. | Respeita o traço do Igor e a regra de não espelhar personagens. Se o Igor fizer um desenho próprio, ele entra com o mesmo nome (`assets/img/hero/seu-ze-livro-*`). |
| D5 | "IA.wepm" (P4) | Lido como `IA.webp`, a tela do mapa da Signária IA (o arquivo que veio na Pasta Exemplo). A `IA.png` foi só referência (W45). | Era o único arquivo com esse nome na pasta. |
| D6 | Vídeo "leve" (item 11) | Duas versões (MP4 e WebM), sem a trilha de áudio muda, que toca sozinha e sem som só na tela, com botão de pausa (W46). | Um vídeo que se mexe sozinho precisa de pausa (WCAG 2.2.2). O mesmo trecho também entrou em "O projeto hoje", na página do VR (`midias.vr`). |
| D7 | "Próximos lançamentos" (item 9) | O selo do VR no bloco do início passou para "Em breve". Na página do VR e no card de produtos de Quem somos, o selo "Em desenvolvimento" continuou, porque é um fato e o plano pede a troca só no bloco do início (o item 38 cita o "desenvolvimento do SinalizaAção VR" em 2026). | Se a equipe quiser "Em breve" em todo lugar, é uma troca de texto. |
| D8 | Imagem única de "Para quem" (item 16) | A praça de Signária com os moradores (a imagem do centro, do card de escolas e instituições), com o título acima e os três cards por cima da parte de baixo da imagem (W47). | No celular, o título ficava em cima do desenho; acima da imagem, fica legível em qualquer tela. |
| D9 | Animação das cartas A, E e I (item 25, G e P3) | Sem a referência, as cartas abrem em leque no mouse e no foco do teclado, e uma vez quando aparecem na tela. É a mesma mecânica do leque de cartas da versão de 15/10 (W53). | A animação lembrada pode ser outra. Quando a referência chegar, a troca é só no CSS. Com "reduzir movimento", o leque não se mexe sozinho. |
| D10 | "Livro 1" (item 19) | Saiu da página do livro e também do bloco do livro no início (W51). | Coerência entre as duas páginas. A ficha técnica do livro (série "SinalizaAção; 1", com ISBN) não mudou. |
| D11 | Placa da campanha sobre a composição restaurada (F) | Saiu, porque a oferta já aparece ao lado do preço (W51). | Evita repetir a oferta e cobrir a arte. |
| D12 | Quatro pilares (itens 32 e 33) | O texto de abertura cita os quatro pilares do plano. O 4º quadro junta "acessibilidade e inclusão" com a participação da comunidade surda: "Inclusão feita com a comunidade surda". | Assim, os quatro quadros correspondem aos quatro pilares citados, e o quarto item pedido no item 33 fica no lugar certo. |
| D13 | Marcos da linha do tempo (item 38) | Ficaram só os quatro marcos do plano (2023 a 2026). Saíram "2023–2025: Dois anos de escuta" e "Hoje". | O plano lista os marcos. As 250 entrevistas continuam no "Somos a InclusiVR" do início e nos posts. |
| D14 | Parceiros que o plano não citou (item 40) | A EMEBS Helen Keller e a Associação de Surdos de São Paulo continuam. | Não houve pedido para tirá-las. A equipe confirma (pendências). |
| D15 | Destino dos cards de públicos e da chamada de parceria (itens 17 e 41) | Página de contato com o perfil já marcado (`?perfil=familia`, `escola`, `investidor` ou `parceria`). | Leva direto ao contato, como pedido, e já diz quem está escrevendo. A equipe confirma os destinos (P10). |
| D16 | Datas dos posts (item 52) | A ordem usa as datas que já estavam no site e as da memória da empresa (PROAC no início de 2026, Tools em abril e maio de 2026). Na tela, os posts sem data exata continuam mostrando só "2026". | Não inventar datas. Com as datas exatas, basta preencher o campo `data` no `blog/posts.json`. |
| D17 | Recado da Aia (item 7) | O recado saiu do início. As pendências que pediam a revisão dele foram marcadas como "não se aplica mais", e o texto ficou guardado no `PENDENCIAS.md` para um possível retorno. | O recado não aparece mais em nenhuma página. |
| D18 | Onde salvar o relatório | Em `ADM/documentos/`, junto com os outros documentos da equipe. | O repositório não tem pasta `docs/`. A pasta `ADM/` não vai para o servidor, e o `.htaccess` bloqueia arquivos `.md`. |
| D19 | Kit de imprensa | A foto do JLeo no kit foi trocada pela nova. Os textos do kit não mudaram. | Na rodada anterior, a foto nova do Igor também foi para o kit. |
| D20 | Imagem do minijogo no celular (página do app) | No recorte deitado do celular, a imagem mostra as duas fileiras de cartas inteiras, sem a frase do jogo cortada ao meio. | Tinha uma linha de texto cortada pela metade no topo da imagem. |
| D21 | "SignáriaIA" nos itens 7 e C | Lido como o bloco da cidade de Signária ("ESTA É SIGNÁRIA"), porque os dois itens falam da imagem da cidade e do texto da Aia, que ficavam nesse bloco. O card do produto Signária IA não mudou por causa desses itens. | É o único bloco com a cidade e o balão da Aia. |
| D22 | Grafias do plano | O plano escreve "Livro Sinalização", "Página Sinalização" e "Igor Bucholi". O site manteve os nomes oficiais: SinalizaAção e Igor Bucioli. | Regra de escrita da marca. |
| D23 | Logos novos para fundo claro (29/10) | O VaiTec e o Web Summit Rio vieram na versão para fundo claro. Nas placas escuras do site, a parte roxa ou azul-marinho virou branca e as cores da marca ficaram (verde-água e laranja). O desenho dos logos não mudou. | É o que o item E pede (a versão certa para cada fundo), e as duas marcas têm versões assim para fundo escuro. Se a equipe conseguir as versões oficiais para fundo escuro, elas entram no lugar. |

Uma observação fora do escopo, sem alteração: na página dos jogos, o texto já existente "Quero receber um aviso por e-mail quando os novos jogos lançar." tem um erro de concordância. Sugestão: "quando os novos jogos forem lançados". Está nas pendências, para a equipe decidir.

---

## 4. Textos alterados

Os textos marcados com * estão no ar como proposta e aparecem com o rótulo rosa em `?rascunho=1` (P6, P7, P8 e P9).

### 4.1 Títulos sem ponto final (item 15)

O ponto final saiu de 58 títulos e do slogan, sem outra mudança no texto. Exemplos: "Um livro para tocar, ver e sinalizar." → "Um livro para tocar, ver e sinalizar"; "Fale com a gente." → "Fale com a gente"; "Esta página fugiu do zoológico." → "Esta página fugiu do zoológico"; "Não funcionou? Confira." → "Não funcionou? Confira"; "Signária precisa de você." → "Signária precisa de você". Pontos de interrogação e de exclamação ficaram ("Qual é o sinal?", "As vogais fugiram!").

### 4.2 Início

| Onde | Antes | Depois | Por quê |
| --- | --- | --- | --- |
| Bloco do livro, linha da série | "Disponível · Coletânea LIBROS, livro 1" | "Disponível · Coletânea LIBROS" | Item 19 (coerência, D10) |
| Atributos do livro | "A partir de 3 anos" · "Página com textura" · "Realidade aumentada" · "Cartas para jogar" | Os mesmos nomes, cada um com uma linha: "Para ler e brincar em família" · "Runas de pedra para tocar" · "Os animais saltam em 3D" · "Dois jogos de cartas no livro" | Item 8 (cards visuais) |
| Nota do preço em novembro | "Preço com o cupom IGOR. Um cupom por pedido. O valor final aparece na loja." | "Um cupom por pedido. O valor final aparece na loja." (o cupom aparece em destaque ao lado do preço) | Itens 3 e 18 (oferta padronizada) |
| Signária | "ESTA É SIGNÁRIA." + cartela + Recado da Aia: "Oi, eu sou a Aia. Aqui em Signária, a LIBRAS é nossa língua e fonte de magia. Quem aprende um sinal para se aproximar de alguém também ganha essa magia. Vamos sinalizar juntos?" | "ESTA É SIGNÁRIA" + a mesma cartela, sem o recado | Itens 7 e C |
| Sobretítulo de "O que vem por aí" | "Em desenvolvimento" | "Próximos lançamentos" | Item 9 |
| Selo do SinalizaAção VR | "Em desenvolvimento" | "Em breve" | Item 9 (D7) |
| Card de investidores e parceiros | "250+ entrevistas com pessoas surdas e ouvintes." · "Top 8 na Tools Competition 2026, entre 1.400+ propostas." · "PROAC: SinalizaAção VR aprovado em 2026." | "Quer investir na InclusiVR ou criar uma parceria? Vamos conversar." | Item 17 (texto simplificado) |
| Cards de públicos | (sem link) | "Falar com a equipe" em cada card | Item 17 |
| Descrição da ilustração do topo (leitores de tela) | "...o Seu Zé segura uma runa e aponta para a mão..." | "...o Seu Zé segura com as duas mãos o livro SinalizaAção..." | Itens 4 e A |

### 4.3 Página do livro

| Onde | Antes | Depois | Por quê |
| --- | --- | --- | --- |
| Topo, linha da série | "Disponível · Livro 1 da Coletânea LIBROS" | "Disponível" | Item 19 |
| Placa sobre a composição | "Black November · R$ 149,90 R$ 99,90 · com o cupom IGOR" | (saiu; a oferta fica ao lado do preço) | F (D11) |
| "Por dentro do livro", card das cartas | "Baixe as cartas grátis e experimente em casa." | "Dá para brincar com o aplicativo ou sem celular. Veja as duas formas de brincar." (link para a seção das cartas) | Itens 20 a 22 |
| Seção das cartas, título | "Experimente as cartas de graça." | Sobretítulo "Cartas grátis" e título "Cartas para imprimir e brincar" | Itens 20 a 24 |
| Seção das cartas, texto | "Baixe as 10 cartas do livro, imprima e jogue em casa. Os dois jogos funcionam sem o app: é só reunir a turma." | "São 10 cartas do livro: 5 vogais (A, E, I, O e U) e 5 animais (abelha, elefante, iguana, onça e urso). De um lado, a letra ou o animal; do outro, o sinal em LIBRAS. Dá para brincar de dois jeitos." | Item 23 |
| Jeito 1 (novo) | — | "Com o aplicativo": "Os minijogos abrem no navegador do celular, do tablet ou do computador, sem instalar nada. As cartas são as mesmas do livro." + os três jogos + "Jogar os minijogos" | Item 21 |
| Jeito 2 (novo) | — | "Sem celular, em casa": "Imprima, recorte e jogue com a família ou com a turma. As regras são as do livro e vêm no PDF." + as duas regras + "PDF com 5 folhas A4: as regras, as vogais e os animais, frente e verso. Peça ajuda a um adulto para recortar." + "Baixar as 10 cartas (PDF)" | Item 22 |

### 4.4 Página do app e página dos jogos

| Onde | Antes | Depois | Por quê |
| --- | --- | --- | --- |
| Sobretítulo do topo | "App de AR do livro" | "App do livro SinalizaAção" | Itens 26 e 27 (o app tem duas funções) |
| Texto do topo | "O app de realidade aumentada abre no navegador. Não precisa instalar." · "Funciona no celular, no tablet e no notebook ou computador com câmera. Não funcionou? Veja as dicas." | "O app tem duas funções: ver o livro em realidade aumentada e jogar os minijogos com as cartas." · "Abre direto no navegador. Não precisa instalar nada: funciona no celular, no tablet e no computador." | Itens 27 e 28 |
| Bloco das funções (novo) | — | "As duas funções do app": "1 · Realidade aumentada · Veja o livro ganhar vida: Aponte a câmera para uma página da direita do livro: o animal aparece em 3D, e o intérprete mostra o sinal em LIBRAS." e "2 · Minijogos · Jogue com as cartas do livro: Três jogos grátis com as letras, os animais e os sinais das cartas. Não precisa do livro para jogar." | Itens 27 e 29 |
| Título do passo a passo | "Como usar o app em 3 passos" | "Como usar a realidade aumentada" · "Três passos, com o livro aberto na sua frente." | Item 27 (separar as funções) |
| Lista de apps | "Os apps da InclusiVR." (app de AR, Signária IA, SinalizaAção VR e Jogos) | (saiu) | Item 26 |
| Minijogos (novo) | — | "Três jogos com as cartas do livro" · "Para jogar sozinho ou em família, no toque, no mouse ou no teclado. Se errar, é só tentar de novo." + um card por jogo ("Vire as cartas de pedra e forme pares: a letra ou o animal com o sinal certo."; "Aparece uma letra ou um animal. Descubra qual das três cartas tem o sinal certo."; "As vogais sumiram do nome do animal. Traga cada uma de volta com o sinal certo.") | Item 30 |
| Página dos jogos, texto do topo | "Três minijogos grátis com as cartas do livro. Jogue no celular ou no computador, sem instalar." | "Três minijogos grátis com as cartas do livro. Eles abrem no navegador do celular, do tablet ou do computador, sem instalar." | Item 28 |
| Página dos jogos, escolha do jogo | "Memória das runas" · "Qual é o sinal?" · "As vogais fugiram!" | Os mesmos nomes, com uma dica: "Forme os pares" · "Ache o sinal certo" · "Complete a palavra" | Item 30 |

### 4.5 Quem somos

| Onde | Antes | Depois | Por quê |
| --- | --- | --- | --- |
| O problema, título | "Aprender LIBRAS ainda é difícil." · "E quem mais precisa começa tarde." | "Quando falta LIBRAS, falta conversa" | Item 31 |
| O problema, texto* | "90% das crianças surdas nascem em famílias ouvintes." · "Essas famílias precisam aprender LIBRAS para conversar com a criança desde cedo." · "Quem estuda sozinho vê o sinal no vídeo, mas não sabe se está sinalizando certo." · (lei) · Fonte: Mitchell e Karchmer, 2004 | "A LIBRAS é a língua de muitas pessoas surdas no Brasil, mas ainda é pouco conhecida por quem ouve. Sem uma língua em comum, a conversa não acontece, e a pessoa surda fica de fora: na escola, no trabalho, no atendimento e até dentro de casa." · "Muitas famílias ouvintes de crianças surdas precisam aprender LIBRAS do zero para conversar com os filhos desde cedo." · "Quem quer aprender encontra pouco material para praticar e, estudando sozinho, não sabe se está sinalizando certo." · "A inclusão não pode depender só da pessoa surda. Quanto mais gente souber LIBRAS, mais natural fica a comunicação entre surdos e ouvintes." · "Por isso, levamos a LIBRAS para perto das pessoas, com livros, apps e jogos que fazem a prática virar brincadeira." | Item 31 (sem estatística; P9) |
| O que diz a lei | Um item da lista com as três leis | Quadro "O que diz a lei": 2002 (Lei 10.436), 2005 (Decreto 5.626) e 2021 (Lei 14.191) | Leitura mais rápida, mesmos fatos |
| Nossa abordagem, título e abertura* | "Ciência, história e brincadeira." · "A base é a mesma em todos os produtos. O jeito de praticar muda conforme o público e o que cada mídia permite." | "O que move a InclusiVR" · "Quatro pilares estão em tudo o que criamos: tecnologia, entretenimento, narrativa e sensibilidade, e acessibilidade e inclusão. Eles aparecem juntos em cada produto, do livro ao jogo de realidade virtual." | Item 32 (P9) |
| Quadro 1* | "Mostra, tenta, repete." · "O sinal é mostrado, a pessoa tenta e repete. É a base da Análise do Comportamento Aplicada." | "Tecnologia que aproxima" · "Realidade aumentada, realidade virtual e inteligência artificial a serviço do aprendizado: o animal salta do livro, as mãos viram controle e a câmera ajuda a conferir o sinal." | Item 32 |
| Quadro 2* | "Sinal, palavra e imagem." · "O sinal, a palavra escrita e a imagem aparecem juntos, para um lembrar o outro (equivalência de estímulos)." | "Brincar para aprender" · "Cartas, minijogos e desafios fazem a prática virar brincadeira. A base é a Análise do Comportamento: o sinal é mostrado, a pessoa tenta e repete, com sinal, palavra escrita e imagem juntos." | Item 32 (a pedagogia continua, dentro do pilar) |
| Quadro 3* | "Uma boa história." · "Tudo acontece em Signária, e a história dá um motivo para praticar, como ajudar a Maga Aia e o Seu Zé a encontrar os animais." | "Uma história que emociona" · "Tudo acontece em Signária, a cidade onde todos sinalizam. Ajudar a Maga Aia e o Seu Zé dá um motivo para praticar e aproxima as pessoas da cultura surda." | Item 32 |
| Quadro 4 (novo)* | — | "Inclusão feita com a comunidade surda" · "Acessibilidade e inclusão começam na criação. A comunidade surda participa da criação e da inovação: as ilustrações são do artista surdo Igor Bucioli, e a Cultura de Acesso acompanha os produtos com a consultoria de profissionais surdos e de diferentes áreas." | Item 33 (D12) |
| Parágrafos retirados | "Com a comunidade surda. De 2023 a 2025, fizemos mais de 250 entrevistas com pessoas surdas e ouvintes. A Cultura de Acesso, empresa de acessibilidade de São Paulo, valida nosso trabalho com profissionais surdos e ouvintes, e as ilustrações são do artista surdo Igor Bucioli." · "Tecnologia como apoio. A tecnologia complementa professores e intérpretes, nunca os substitui. Para nós, a LIBRAS é língua, cultura e potência criativa, e não só um recurso de acessibilidade." | (saíram) | Item 34 |
| Produtos | "Conhecer o livro" · "Conhecer a Signária IA" · "Conhecer o jogo" | (saíram; o card inteiro é o link) | Item 36 |
| Nossa história, cabeçalho | "Nossa história" · "Do primeiro sonho ao livro nas mãos." · "Nem sempre o primeiro caminho é o caminho final." | Sobretítulo "Linha do tempo" · "Nossa história" | Item 37 |
| 2023* | "Uma pergunta na USP." · "Na disciplina de pós-graduação “Cientista Empreendedor”, surgiu a pergunta: e se a gente fizesse um jogo de realidade virtual para ensinar LIBRAS? Daí veio o nosso nome." | "A ideia nasce na USP" · "Na pós-graduação da USP, na disciplina “Cientista Empreendedor”, surge a vontade de unir tecnologia e a disseminação da LIBRAS. A primeira pergunta foi: e se a gente fizesse um jogo de realidade virtual para ensinar LIBRAS?" | Item 38 (P6) |
| 2023–2025 | "Dois anos de escuta." · "Mais de 250 entrevistas com pessoas surdas e ouvintes para entender quem precisa aprender LIBRAS, e por quê." | (saiu) | Item 38 (D13) |
| 2024* | "Residência no NIDUS e o encontro com o Igor." · "Entramos no NIDUS, no InovaUSP, e conhecemos o artista surdo Igor Bucioli, que topou desenhar o nosso universo." | "Incubação e equipe formada" · "Começa a incubação no NIDUS, no InovaUSP, e a equipe se forma. É também quando conhecemos o artista surdo Igor Bucioli, que topou desenhar o nosso universo." | Item 38 (P6) |
| 2025* | "O livro nasce." · "Acelerados pelo VaiTec, da AdeSampa, transformamos a primeira parte da história do jogo num livro com realidade aumentada. O lançamento foi em 10 de dezembro." | "O livro chega às mãos" · "Lançamos o livro SinalizaAção: Animais em Voga, de LIBRAS com realidade aumentada, em 10 de dezembro, com aceleração do VaiTec, da AdeSampa." | Item 38 (P6) |
| 2026* | "Reconhecimento." · "O SinalizaAção VR foi aprovado no PROAC, a Signária IA ficou no top 8 da Tools Competition, entre mais de 1.400 propostas, e entramos no Prêmio Sebrae Startups, entre as 1.000 melhores do país." | "Reconhecimento e novos passos" · "Concluímos o Crie Games, do Sebrae, e participamos do Web Summit Rio e do Web Summit Lisboa. O app do livro ganha novas funções e minijogos, o site é renovado e o SinalizaAção VR, aprovado no PROAC, está em desenvolvimento." | Item 38 (P6) |
| Hoje | "Mais mãos sinalizando." · "O livro chega a famílias e escolas, e parte dos exemplares foi doada. O SinalizaAção VR está em desenvolvimento, e a Signária IA vem aí." | (saiu) | Item 38 (D13) |
| Parceiros | "EMEBS Anne Sullivan · São Paulo" | (saiu) | Item 39 |
| Chamada de parceria (nova) | — | "Venha ser parceiro da InclusiVR" · "Escolas, associações, empresas e projetos que querem levar a LIBRAS a mais gente: vamos conversar." · botão "Quero ser parceiro" | Item 41 |
| Equipe, cabeçalho | "Cinco sócios, uma língua em comum." · "Formações diferentes, que se completam." | "Conheça nosso time" | Item 42 |
| Nomes* | "Luciano Delphino de Azevedo Junior" · "Maria Clara Franco Cardoso" · "Victor Sad de Souza" · "José Leonardo Martins (JLeo)" · "Fauston Henrique Della Flora Zandoná" | "Luciano Azevedo" · "Maria Clara Franco" · "Victor Sad" · "JLeo" · "Fauston" | Item 44 (P7) |
| Bio da Maria, atuação* | "Atua em pesquisa de mercado e em pesquisa com usuários (UX)." | "Tem experiência na área de pesquisa: atua em pesquisa de mercado e em pesquisa com usuários (UX)." | Item 45 (P8) |
| Seção do Igor | "Parceiro ilustrador · Igor de Campos Bucioli · Artista e ilustrador surdo, engenheiro de automação e influenciador digital, com mais de 800 mil seguidores no Instagram. · Fez as ilustrações de SinalizaAção: Animais em Voga, a leitura performática no lançamento do livro e as concept arts do SinalizaAção VR. · @igorbucioli no Instagram" | (saiu; ele segue nos parceiros e no 4º pilar) | Item 47 |
| Modelo de negócio | "Negócio · Modelo de negócio." · "B2C: Venda do livro para famílias." · "B2B: Escolas, livrarias e empresas." · "B2G: PNLD/MEC, secretarias e programas de leitura." · "SaaS: Signária IA: plano gratuito e licenças para instituições." | "Quem atendemos · Para quem a InclusiVR trabalha" · "Atendemos quem busca ferramentas inclusivas ou precisa de soluções para a acessibilidade em LIBRAS." · "Famílias: Livro, cartas e jogos para aprender LIBRAS junto com as crianças, em casa." · "Escolas e instituições: Materiais lúdicos para trabalhar a LIBRAS com alunos surdos e ouvintes, e com as famílias." · "Empresas: Ferramentas para equipes que querem atender clientes surdos e incluir colegas surdos no dia a dia." · "Governos e prefeituras: Soluções para programas de leitura, educação e acessibilidade, com a LIBRAS de forma lúdica." · botão "Falar com a equipe" | Itens 48 e 49 |

A página `/en/` recebeu os mesmos pontos em inglês: "The problem" (sem o dado de 90% e a fonte), "Who we serve" (no lugar de "Business model", sem SaaS) e os nomes públicos.

### 4.6 Blog (item 50)*

Os cinco posts mantêm o título, a foto e o começo. O que mudou em cada um:

| Post | Antes | Depois (intertítulos novos) |
| --- | --- | --- |
| InclusiVR entre as 1.000 melhores startups do país | 5 parágrafos: o reconhecimento, o ano de 2026, a trajetória, as entrevistas e quem somos | Abertura ampliada + "O que é o Prêmio Sebrae Startups" (o que é o Sebrae e o programa) + "Por que esse reconhecimento importa" + "O que nos trouxe até aqui" (2026, a trajetória desde 2023 e o que veio da escuta) + "Quem somos" |
| A InclusiVR na Feira da Diversidade | 3 parágrafos: o estande, o livro e o VR, e a imprensa | Abertura ampliada + "O que levamos" + "Por que participar de eventos como este" (o retorno do público vai para os produtos) + "Na imprensa" |
| Signária IA é finalista da Tools Competition | O resultado e "Por que isso importa?" num parágrafo | "O que é a Tools Competition" (competição internacional; trilha de educação básica, K-12) + "Por que isso importa" + "Como a Signária IA funciona" + "O que vem agora" |
| SinalizaAção VR aprovado no PROAC | O resultado e "O projeto está em desenvolvimento. O jogo é para jovens e adultos." | "O que é o PROAC" (programa do Governo de SP; recursos da Política Nacional Aldir Blanc) + "Uma história que voltou ao começo" (o PROAC de 2024, o livro e a aprovação de 2026) + "Como é o jogo" (inclui as atividades com escolas e associações de surdos) + "O que vem agora" |
| O livro SinalizaAção chegou! | O livro e "O livro é para tocar, ver e sinalizar:" | "A história" + "Por que um livro" (o VR não é a melhor opção para crianças pequenas) + "Um livro para tocar, ver e sinalizar" + "Feito por muitas mãos" (entrevistas, texto, ilustrações, diagramação, LIBRAS e app) |

---

## 5. Materiais da Pasta Exemplo

| Arquivo | Como foi usado | Onde aparece | Arquivo no site |
| --- | --- | --- | --- |
| `BlackExemplo.png` | Só referência de estilo (caixa preta com borda lima). A caixa foi feita em HTML e CSS, para ficar nítida, traduzível e legível em qualquer tela. | Topo do início (abaixo do botão "Livro SinalizaAção"), preço do bloco do livro no início e preço da página do livro | — |
| `IA.png` | Só referência do resultado, como o plano pede | — | — |
| `aia-3d-380.webp` | Parte da composição da Signária IA. É idêntico ao arquivo que o site já tinha. | Início ("O que vem por aí") e Quem somos (produtos) | `assets/img/signaria-ia/aia-3d-380.webp` (e as versões de 760 px) |
| `IA.webp` (o "IA.wepm" do plano) | A tela do mapa no celular da composição. É idêntico ao arquivo que o site já tinha. | Os mesmos lugares | `assets/img/signaria-ia/app-mapa-390.webp` (e a versão de 780 px) |
| `SinalizacaoVR.mp4` (1,6 MB, 784 × 480, 16,7 s, áudio mudo) | Otimizado, sem a trilha muda, com uma imagem de capa | Início ("O que vem por aí", card do VR) e página do SinalizaAção VR ("O projeto hoje") | `assets/video/sinalizaacao-vr-trecho.mp4` (578 KB), `.webm` (460 KB) e `assets/img/vr/sinalizaacao-vr-trecho-capa-784.jpg` (38 KB) |
| `Nova Imagem para JLEO.jpeg` | Foto nova do JLeo, recortada no mesmo enquadramento das outras | Quem somos (equipe), página `/en/` e kit de imprensa | `assets/img/equipe/jose-leonardo-martins-200.webp`, `-400.jpg` e `-400.webp`; `fotos-equipe/jose-leonardo-martins.png` no kit |

Logos enviados em 29/10 (`Exemplo/2910 8h19/`):

| Arquivo | Como foi usado | Onde aparece | Arquivo no site |
| --- | --- | --- | --- |
| `Logo Aceleração VAI TEC Puramente Transparente.png` | Recortado, com o roxo trocado por branco para o fundo escuro (D23) | Início e Quem somos (logos) | `assets/img/logos/vaitec-aceleracao.webp` (436 × 200 px, 25 KB) |
| `Logo Web Summit Rio em fundo transparente.png` | Recortado (a imagem tinha muita borda vazia), com o texto azul-marinho trocado por branco (D23) | Os mesmos lugares | `assets/img/logos/web-summit-rio.webp` (950 × 200 px, 29 KB) |
| `WebSummit_Lisbon_transparente.png` | Recortado, sem mudar as cores | Os mesmos lugares | `assets/img/logos/web-summit-lisboa.webp` (326 × 200 px, 16 KB) |
| `logo_crie_games.png` | Sem mudar as cores | Os mesmos lugares | `assets/img/logos/crie-games.webp` (316 × 200 px, 7 KB) |

A Pasta Exemplo continua no repositório, sem mudanças. Ela **não** deve ir para o servidor (README, seção 2).

---

## 6. Testes realizados

Todos os testes abaixo foram executados nesta rodada, num navegador Chromium automatizado (Playwright), com o site servido localmente. Os resultados valem para a versão entregue: depois dos últimos ajustes pequenos (o recorte da imagem do jogo no celular, seis textos novos no dicionário e a pergunta do "Copiar link"), os testes gerais, de tradução e de interação rodaram de novo.

| Teste | Como | Resultado |
| --- | --- | --- |
| Teste geral em português | 19 páginas × 10 larguras (320, 375, 390, 414, 600, 768, 1024, 1280, 1440 e 1920 px), com celular e toque emulados abaixo de 700 px. Confere erros de JavaScript e do console, arquivos que não carregam, rolagem lateral, imagens sem texto alternativo, o botão Comprar no topo e se os 282 links internos levam a arquivos que existem. | Nenhum problema |
| Teste geral em inglês | O mesmo teste, com `?lang=en` | Nenhum problema |
| Textos sem tradução | As 18 páginas do site em inglês, com o modo de verificação, que lista todo texto que ficou em português. Também 13 páginas com `?campanha=previa`. | Nenhum texto sem tradução |
| Botão EN/PT e inglês em uso (27 checagens) | Na troca EN→PT no lugar, o endereço não muda; ao voltar, o texto, os textos alternativos e o título da aba ficam idênticos ao original. A escolha vale na página seguinte, e `?lang=pt` volta e guarda o português. Os três jogos em inglês têm perguntas, respostas e avisos em inglês. As mensagens de erro do formulário de contato também. A caça aos animais tem avisos em inglês. O menu cabe numa linha em inglês (1024 a 1440 px), com a mesma altura do português. | 27 de 27 aprovadas |
| Inglês até o fim | Os três jogos jogados até a última tela em inglês: a memória com pares errados e certos e com troca de modo, as 10 rodadas do "Qual é o sinal?" com respostas erradas e as 5 palavras de "As vogais fugiram!". Também a caça aos 5 animais nas três páginas, até a janela do prêmio, fora e dentro de novembro. Em cada etapa, o teste procura na página qualquer texto ou atributo que tenha ficado em português. | Nenhum texto em português. Na primeira rodada, o teste achou "Não é esse" (a marca da carta errada) sem tradução; foi corrigido e testado de novo. A mensagem pronta do WhatsApp continua em português, de propósito (vai para a equipe). |
| "Copiar link" dos posts | Sem acesso à área de transferência, o navegador pede para copiar o link | Em português: "Copie o link:"; em inglês: "Copy the link:" |
| Acessibilidade (axe-core 4.10.2, regras WCAG A e AA até a 2.2) | 24 variações de página (todas as páginas, a campanha e o inglês) × 3 modos: computador, celular e computador com movimento (depois de 4,5 s de animação) | Nenhuma violação |
| Blog | Ordem por data no blog e no bloco "Novidades" do início. A paginação foi simulada com 12 posts: aparecem 9 e o botão; depois do clique, os 12 e o botão some. | Aprovado |
| Esferas do logo | Com o mouse em cima, as esferas giram e passam por trás e pela frente da mão; ao sair, voltam ao lugar | Aprovado |
| Vídeo do VR | Toca sozinho e sem som quando aparece na tela (rolando com a roda do mouse, saltando para ele e centralizando) e pausa ao sair da tela. Com "reduzir movimento", fica parado até o clique. | Aprovado |
| Checagens finais (15) | Os cards de públicos e o "Quero ser parceiro" abrem o contato com o perfil certo marcado. A caixa da Black November fica escondida hoje (29/10) e aparece na prévia, abaixo do botão. O leque das cartas anima ao aparecer e abre no mouse. Não há "Livro 1" nas páginas alteradas. O Comprar leva à mesma loja em PT e EN. Nenhum erro de JavaScript. | 15 de 15 aprovadas |
| Revisão visual | As 22 seções alteradas, no computador (1440 px) e no celular (390 px), em capturas, todas revistas (anexo). A revisão achou dois detalhes, já corrigidos: a frase do minijogo cortada no card do app, no celular (D20), e a barra fixa de compra por cima das capturas (só nas capturas, não no site). | Aprovado depois das correções |
| Logos novos (29/10) | Início e Quem somos em 6 larguras (320 a 1440 px): oito placas iguais, 4 por linha a partir de 768 px e 2 em telas menores, sem rolagem lateral e sem logo espremido. Depois, o teste geral de novo (19 páginas × 10 larguras em português; as duas páginas em inglês), os textos alternativos no modo inglês e o axe-core nas duas páginas, em PT e EN, nos 3 modos. As capturas 06 e 16 do anexo foram refeitas. | Nenhum problema |

**O que não foi testado:**

- Celulares e tablets de verdade (iPhone, Android). Os testes usaram um Chromium com celular emulado.
- Os navegadores Safari e Firefox.
- Leitores de tela de verdade (NVDA, VoiceOver, TalkBack). A acessibilidade foi conferida com o axe-core, que é automático.
- A compra na loja até o fim, o cupom IGOR na loja e o envio real dos formulários (o endereço dos formulários ainda não foi configurado).
- O app de AR em `/app`, que fica fora deste site.
- A velocidade da página num servidor de verdade (Lighthouse, por exemplo).

---

## 7. Pendências

A lista completa, com quem faz o quê, está no topo do `PENDENCIAS.md`. Os itens desta rodada:

| # | Quem | O que falta |
| --- | --- | --- |
| P1 | Luciano | A frase nova da página do livro, no lugar de "Será que a magia da LIBRAS vai trazer todo mundo de volta?" (bloco "Uma história de busca"). Até lá, fica a frase atual. |
| P2 | Igor (pela equipe) | Os dois links do Instagram (perfil de influenciador e perfil de ilustrador). Hoje o site usa um só, `instagram.com/igorbucioli`, na página do livro e no bloco do livro do início. |
| P3 | Luciano | Vídeo curto, GIF ou gravação de tela da animação das cartas A, E e I. Até lá, fica o leque provisório (D9). |
| P4 | — | Resolvida: todos os arquivos chegaram ("IA.wepm" = `IA.webp`). |
| P5 | Fauston | Confirmar a lista das 10 cartas (5 vogais e 5 animais) e se o PDF serve para as duas formas de brincar. |
| P6 | Luciano e Victor | Conferir a linha do tempo (2023 a 2026), os textos ampliados dos posts e as datas exatas dos posts (campo `data` no `blog/posts.json`). |
| P7 e P8 | Cada integrante | Nome público e biografia, no `BIOGRAFIAS_PARA_REVISAO.md`. Falta a formação do JLeo. |
| P9 | Luciano | Aprovar ou reescrever "O problema" e "Nossa abordagem" (Quem somos e página `/en/`). |
| P10 | Victor | Confirmar textos e destinos dos botões principais ("Livro SinalizaAção", "Comprar o livro", "Comprar agora", "Falar com a equipe", "Quero ser parceiro", "Abrir a realidade aumentada" e "Jogar os minijogos"). |
| — | Equipe | Confirmar se a EMEBS Helen Keller e a Associação de Surdos de São Paulo continuam nos parceiros. |
| — | Equipe (de preferência alguém com inglês fluente) | Revisar o inglês do `assets/js/traducao-en.js`, principalmente as biografias, a política de privacidade e os posts. |
| — | Igor (opcional) | Se quiser, desenhar o Seu Zé segurando o livro; o arquivo entra com o mesmo nome. |
| — | Equipe (sugestão) | Corrigir a concordância de "quando os novos jogos lançar" na página dos jogos (texto anterior a esta rodada): "quando os novos jogos forem lançados". |

As pendências de rodadas anteriores (cupom IGOR na loja, marca-páginas, autorização de imagem, endereço dos formulários etc.) continuam no `PENDENCIAS.md`.

---

## 8. Limitações

- **O inglês foi feito com ajuda de IA**, com um glossário comum e uma revisão de coerência, mas ainda não passou por uma pessoa com inglês nativo. Os nomes do universo foram mantidos (D2).
- **Texto novo precisa entrar no dicionário.** O que não estiver no `traducao-en.js` continua em português no modo inglês. Para conferir uma página: `?lang=en&traducao=verificar` e o console do navegador (README, seção 13).
- **Mensagens que saem do site continuam em português**, mesmo no modo inglês: o e-mail montado pelo formulário (quando o endereço dos formulários não está configurado) e as mensagens prontas do WhatsApp. Elas são lidas pela equipe.
- **A página `/en/` antiga continua** como uma página resumida em inglês, separada do resto. O botão EN não leva mais a ela (só sem JavaScript).
- **O Seu Zé com o livro é uma montagem** com o desenho do Igor, não um desenho novo (D4).
- **A animação das cartas é provisória** até a referência da equipe (D9).
- **As datas de alguns posts são aproximadas.** A ordem está certa pelo que se sabe hoje, mas a tela mostra só "2026" nos posts sem data exata (D16).
- **Os textos novos de Quem somos e do blog são propostas** baseadas no plano e nos fatos que já estavam no site e na memória da empresa. A equipe precisa aprová-los antes de publicar (P6 e P9).
- **O kit de imprensa** ganhou só a foto nova do JLeo. Os textos do kit não foram revistos nesta rodada (ainda dizem "livro 1", por exemplo).
- **O vídeo do VR toca sozinho só nos navegadores que permitem vídeo sem som automático** (os principais permitem). Nos outros, ele mostra a capa e o botão de tocar.
- **Testes:** só em Chromium automatizado, sem aparelhos reais, Safari, Firefox ou leitores de tela (seção 6).

---

## Anexo: capturas de tela

Capturas da versão entregue, no computador (1440 px de largura, reduzidas para 1200 px) e no celular (390 px). A Black November aparece em modo de prévia nas capturas 01, 02, 07 e 21, porque a campanha só começa em 1/11. Nas capturas, o cabeçalho fixo e a barra de compra do celular foram escondidos, para não cobrir as seções.

| Seção | Computador | Celular |
| --- | --- | --- |
| 01 · Início: topo com a Black November abaixo do botão, Seu Zé com o livro e a Aia corrigida | <img src="capturas-28-10/01-inicio-topo-computador.jpg" width="560" alt="Topo do início no computador"> | <img src="capturas-28-10/01-inicio-topo-celular.jpg" width="220" alt="Topo do início no celular"> |
| 02 · Início: o livro em destaque, cards de atributos e oferta | <img src="capturas-28-10/02-inicio-livro-computador.jpg" width="560" alt="Bloco do livro no computador"> | <img src="capturas-28-10/02-inicio-livro-celular.jpg" width="220" alt="Bloco do livro no celular"> |
| 03 · Início: Signária, só a cidade e a cartela | <img src="capturas-28-10/03-inicio-signaria-computador.jpg" width="560" alt="Signária no computador"> | <img src="capturas-28-10/03-inicio-signaria-celular.jpg" width="220" alt="Signária no celular"> |
| 04 · Início: Próximos lançamentos, com o vídeo do VR e a composição da Signária IA | <img src="capturas-28-10/04-inicio-proximos-lancamentos-computador.jpg" width="560" alt="Próximos lançamentos no computador"> | <img src="capturas-28-10/04-inicio-proximos-lancamentos-celular.jpg" width="220" alt="Próximos lançamentos no celular"> |
| 05 · Início: Para quem, uma imagem e três cards iguais | <img src="capturas-28-10/05-inicio-para-quem-computador.jpg" width="560" alt="Para quem no computador"> | <img src="capturas-28-10/05-inicio-para-quem-celular.jpg" width="220" alt="Para quem no celular"> |
| 06 · Início: galeria maior e logos em placas | <img src="capturas-28-10/06-inicio-galeria-e-logos-computador.jpg" width="560" alt="Galeria e logos no computador"> | <img src="capturas-28-10/06-inicio-galeria-e-logos-celular.jpg" width="220" alt="Galeria e logos no celular"> |
| 07 · Livro: topo com a composição de 15/10 e a oferta | <img src="capturas-28-10/07-livro-topo-computador.jpg" width="560" alt="Topo da página do livro no computador"> | <img src="capturas-28-10/07-livro-topo-celular.jpg" width="220" alt="Topo da página do livro no celular"> |
| 08 · Livro: cartas, com as duas formas de brincar | <img src="capturas-28-10/08-livro-cartas-computador.jpg" width="560" alt="Seção das cartas no computador"> | <img src="capturas-28-10/08-livro-cartas-celular.jpg" width="220" alt="Seção das cartas no celular"> |
| 09 · App: as duas funções, cada uma com o seu link | <img src="capturas-28-10/09-app-topo-computador.jpg" width="560" alt="Topo da página do app no computador"> | <img src="capturas-28-10/09-app-topo-celular.jpg" width="220" alt="Topo da página do app no celular"> |
| 10 · App: os três minijogos, com capturas reais | <img src="capturas-28-10/10-app-minijogos-computador.jpg" width="560" alt="Minijogos na página do app no computador"> | <img src="capturas-28-10/10-app-minijogos-celular.jpg" width="220" alt="Minijogos na página do app no celular"> |
| 11 · Jogos: escolha por cartões e a mesa do jogo | <img src="capturas-28-10/11-jogos-escolha-computador.jpg" width="560" alt="Página dos jogos no computador"> | <img src="capturas-28-10/11-jogos-escolha-celular.jpg" width="220" alt="Página dos jogos no celular"> |
| 12 · Quem somos: o problema, sem estatística | <img src="capturas-28-10/12-quem-somos-problema-computador.jpg" width="560" alt="O problema no computador"> | <img src="capturas-28-10/12-quem-somos-problema-celular.jpg" width="220" alt="O problema no celular"> |
| 13 · Quem somos: os quatro pilares | <img src="capturas-28-10/13-quem-somos-abordagem-computador.jpg" width="560" alt="Nossa abordagem no computador"> | <img src="capturas-28-10/13-quem-somos-abordagem-celular.jpg" width="220" alt="Nossa abordagem no celular"> |
| 14 · Quem somos: produtos clicáveis, sem "Conhecer" | <img src="capturas-28-10/14-quem-somos-produtos-computador.jpg" width="560" alt="Produtos no computador"> | <img src="capturas-28-10/14-quem-somos-produtos-celular.jpg" width="220" alt="Produtos no celular"> |
| 15 · Quem somos: Nossa história, de 2023 a 2026 | <img src="capturas-28-10/15-quem-somos-historia-computador.jpg" width="560" alt="Linha do tempo no computador"> | <img src="capturas-28-10/15-quem-somos-historia-celular.jpg" width="220" alt="Linha do tempo no celular"> |
| 16 · Quem somos: parceiros e "Venha ser parceiro" | <img src="capturas-28-10/16-quem-somos-parceiros-computador.jpg" width="560" alt="Parceiros no computador"> | <img src="capturas-28-10/16-quem-somos-parceiros-celular.jpg" width="220" alt="Parceiros no celular"> |
| 17 · Quem somos: Conheça nosso time | <img src="capturas-28-10/17-quem-somos-equipe-computador.jpg" width="560" alt="Equipe no computador"> | <img src="capturas-28-10/17-quem-somos-equipe-celular.jpg" width="220" alt="Equipe no celular"> |
| 18 · Quem somos: Para quem a InclusiVR trabalha | <img src="capturas-28-10/18-quem-somos-para-quem-computador.jpg" width="560" alt="Para quem a InclusiVR trabalha no computador"> | <img src="capturas-28-10/18-quem-somos-para-quem-celular.jpg" width="220" alt="Para quem a InclusiVR trabalha no celular"> |
| 19 · Blog: lista por data | <img src="capturas-28-10/19-blog-lista-computador.jpg" width="560" alt="Lista do blog no computador"> | <img src="capturas-28-10/19-blog-lista-celular.jpg" width="220" alt="Lista do blog no celular"> |
| 20 · Blog: um post ampliado | <img src="capturas-28-10/20-blog-post-computador.jpg" width="560" alt="Post ampliado no computador"> | <img src="capturas-28-10/20-blog-post-celular.jpg" width="220" alt="Post ampliado no celular"> |
| 21 · Inglês: o mesmo topo do início, com o "Buy" e a Black November | <img src="capturas-28-10/21-ingles-inicio-topo-computador.jpg" width="560" alt="Topo do início em inglês no computador"> | <img src="capturas-28-10/21-ingles-inicio-topo-celular.jpg" width="220" alt="Topo do início em inglês no celular"> |
| 22 · Inglês: a seção das cartas | <img src="capturas-28-10/22-ingles-livro-cartas-computador.jpg" width="560" alt="Seção das cartas em inglês no computador"> | <img src="capturas-28-10/22-ingles-livro-cartas-celular.jpg" width="220" alt="Seção das cartas em inglês no celular"> |
