# Checklist da equipe: onde cada item foi atendido

Status: **feito** · **parcial** (feito, com um detalhe pendente) · **depende da equipe** (o site está pronto para receber).

## Queremos

| Item | Onde e como | Status |
| --- | --- | --- |
| Q1. Relançamento para a Black Friday e o Web Summit Lisboa 2026 | Faixa de campanha editável no `config.js` (Black Friday 27/11/2026, some sozinha fora das datas, pode ser fechada, prévia com `?campanha=previa`); UTM da campanha nos links da loja; página `/en/` com "Meet us at Web Summit Lisbon"; kit de imprensa | feito |
| Q2. Site dividido em abas para investidores e compradores | Menu: Início · SinalizaAção · App · Quem somos · Blog · Fale com a gente | feito |
| Q2a. Início comenta tudo e encaminha | `/`: hero, teste grátis, Signária, 3 produtos, "duas portas" (famílias e escolas / investidores e parceiros), novidades, fale com a gente | feito |
| Q2b. Quem somos robusto para investidores e editais | `/quem-somos/`: missão, problema com fonte, abordagem, ecossistema, tração, modelo de negócio, equipe, parceiro, apoios, materiais, "Salvar em PDF" (folha de impressão) | feito |
| Q2c. SinalizaAção focada no livro e na venda | `/sinalizaacao/`: capa, preço (config), "Comprar o livro", por dentro, animais, galeria, teste grátis, escolas, perguntas, ficha | feito |
| Q2d. Blog | `/blog/` + 4 posts + modelo para publicar em 5 passos (README) | parcial: datas exatas de 3 posts |
| Q2e. "Fale com a gente" no final | Bloco final em todas as páginas + `/contato/` (formulário, canais, InclusiNews) | feito |
| Q3. Estética lúdica e tecnológica | Moldura da marca do Aram + cenas do Igor ("portal para Signária") | feito |
| Q3a. Roxo que puxa para o azul e o rosa | Fundos noite, índigo, roxo profundo, orquídea e rosa nas dicas; auras de luz, sem degradê linear | feito |
| Q3b. Cenários de Signária | Cidade, portão do zoológico, praça, floresta, lagoa, trilha, runas na noite, como fundos e portais | feito |
| Q3c. Pouco conteúdo, sintético | Início com cerca de 360 palavras visíveis (contando o formulário e os canais); livro com cerca de 600 (com as perguntas); Quem somos com cerca de 1.100 | feito |
| Q4. Brincar com a AR no site | QR code em caixa branca com microtexto; 5 páginas com contorno amarelo e selo "Aponte o app aqui"; "Ver em tela cheia para escanear" com dica de brilho (`/app/` e `/app/ar-do-livro/`) | parcial: JLeo testar cada página no app |
| Q5. Aia em 3D com balão e LIBRAS (futuro) | Componente "Recado da Aia" (balão + janela de vídeo em LIBRAS que aparece quando houver vídeo) na página inicial; anúncio "Em breve no app: escaneie a Aia" com contorno tracejado em `/app/ar-do-livro/` | parcial: revisão do texto e vídeo |
| Q6. Fotos e vídeos em cada produto | Galeria reutilizável (livro, AR, Signária IA, VR, jogos), navegação manual, ampliação por teclado, vídeos só no clique; vídeos extras pelo `config.js` | depende da equipe (fotos e vídeos reais) |
| Q7. HTML, CSS e JS | Sem framework e sem build | feito |
| Q8. Personagens aparecendo de vez em quando | Aia e Seu Zé redesenhados em SVG (estilo mais próximo do Aram), espiando por trás de seções; Seu Zé articulado andando na base de seções; palco no rodapé de todas as páginas com o Seu Zé e o elefante em duas cenas curtas ("Pega-pega" e "Esconde-esconde"); uma aparição por vez, tudo com até 5 s | parcial: aprovação da equipe |
| Q9. Fonte da identidade | Archivo Expanded, Outfit, Lexend e Fraunces Soft (substitutas livres), hospedadas no site | feito |
| Q10. Destaque para o app e a facilidade de uso | `/app/`: "Chegou pelo livro?", botão grande "Abrir o app de AR", 3 passos ilustrados, "não precisa instalar" | feito |
| Q11. Teste grátis com as cartas | PDF A4 com marcas de corte, frente e verso, regras do livro; botão "Baixar as cartas (PDF)" no início, no livro e no app | feito |
| Q12. Os 3 produtos | Cartões no início; ecossistema em Quem somos; páginas próprias | feito |
| Q13. Botões "Comprar livro" e "App" no início | Hero: "Conheça o app" (ciano) e "Comprar o livro" (roxo) | feito |
| Q14. Aba do app com 4 itens que abrem páginas | `/app/`: App de AR (disponível), Signária IA, SinalizaAção VR e Jogos (em breve, com minijogos grátis): 4 páginas com cena, o que é, como funciona, galeria, status e ação | feito |
| Q15. Abas e informações sugeridas | `/en/`, `/acessibilidade/`, `/privacidade/`, kit de imprensa, lista de espera (ver DECISOES, item 8) | feito |
| Q16. Destaque para "compre o livro" e os apps | Bloco "Ainda não tem o livro?" e barra fixa no celular nas páginas do app; status escrito de cada app; lojas "Em breve" | feito |
| Q17. Fotos padronizadas da equipe | Mesmo recorte, fundo, círculo e tamanho | parcial: fotos em alta para impressão |
| Q18. Bios no padrão formação, profissionalização, atuação | Formação · Atuação profissional · Na InclusiVR | parcial: formação do JLeo |
| Q19. Igor Bucioli com nome completo e bio de parceiro | Seção própria em Quem somos + página em inglês | parcial: confirmar a foto (A7) |
| Q20. Entrada com foco no app | Manchete "Aponte o celular e veja a LIBRAS ganhar vida." + o salto do livro para o celular | feito |
| Q21. Teste gratuito óbvio: cartas em PDF e jogos grátis | Seção logo depois do hero; 3 minijogos em `/app/jogos/` | feito |
| Q22. Foco no que o usuário vai ver | Duas portas no início; perfil já marcado no contato (`?perfil=`); textos curtos | feito |
| Q23. Os animais do livro no site | Galeria dos animais em `/sinalizaacao/#animais` (vogal, cena, carta e sinal; pronta para 3D com `<model-viewer>`); animais escondidos (opcional) | feito |
| Q24. Acessível para pessoas cegas | HTML semântico, um h1 por página, textos alternativos, teclado, foco visível, diálogos e abas acessíveis, anúncios `aria-live`; 0 erros no axe-core | feito |

## Não queremos

| Item | Como foi evitado | Status |
| --- | --- | --- |
| N1. Site confuso para pessoas surdas | Visual primeiro, passos ilustrados, linguagem simples, Janela de LIBRAS, contato só por texto, nada depende de som | feito (vídeos em LIBRAS dependem da equipe) |
| N2. Emojis | Nenhum emoji em textos, botões, alt ou metadados (verificado por script) | feito |
| N3. Parecer a Hand Talk | Identidade do Aram + cenas de Signária, uma ideia por seção, muito respiro | feito |
| N4. Roadmap | Nenhuma aba, seção ou linha do tempo de planos; só conquistas realizadas | feito |
| N5. Excesso de informação | Textos dentro dos limites; vagas e notas internas só no rascunho (desligado no site; `?rascunho=1` para a equipe) | feito |

## Anexos

| Anexo | O que chegou e onde foi usado | Status |
| --- | --- | --- |
| A1. Site atual | PDF "InclusiVR - Tecnologia Imersiva" (print do site). Aproveitados: InclusiNews, 10% na primeira compra, frases da marca. Evitados: emojis, roadmap, "Igor B.", faixas etárias contraditórias, links "#" | feito |
| A2. PDF do livro | Texto, páginas da direita (renderizadas em alta para os marcadores), regras dos jogos e ficha técnica. As cenas vieram do Design System, que tem as mesmas ilustrações do livro em RGB | feito |
| A3. Identidade visual do Aram | Design System "InclusiVR": logos, selos, placas, ícones, fundo em túnel, mockups e tokens | feito |
| A4. Cartas separadas | PDF das cartas, minijogos, galeria dos animais | feito (pedir originais em 300 dpi) |
| A5. PDF informativo dos produtos | Não chegou. Produtos descritos pelos fatos do briefing | depende da equipe |
| A6. Fotos dos membros | Equipe em Quem somos, página em inglês e kit de imprensa | feito (fotos em alta, se houver) |
| A7. Foto do Igor | Escolhida entre as imagens enviadas | parcial: confirmar |
