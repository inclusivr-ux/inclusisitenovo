# Trilha do vídeo do Igor com o livro

Música de fundo do vídeo em que o Igor Bucioli apresenta o livro *SinalizaAção: Animais em Voga* (página inicial e página do app de AR). O vídeo é em LIBRAS, sem fala, e já traz a legenda em português na imagem: a música é só um fundo, e nada depende dela.

## A música

- **Duração:** 40 s (o vídeo tem 39,8 s; a música termina junto).
- **Clima:** conto de fadas leve e acolhedor, como Signária. Fá maior, 96 batidas por minuto, 16 compassos, com começo suave, uma segunda parte mais aberta e um final que fecha devagar.
- **Instrumentos:** celesta (melodia), violão de náilon (dedilhado), cordas em pizzicato (baixo), cordas suaves (fundo), glockenspiel e flauta na segunda parte, percussão bem leve (chocalho, triângulo e sininhos no começo e no fim).
- **Volume no vídeo:** -16,5 LUFS, pico de -3,3 dB (nível confortável, perto do usado no YouTube).

## Como foi feita

Composta pelo Claude (IA), a pedido da equipe, para este vídeo: melodia e harmonia escritas do zero, nota a nota, num arquivo MIDI (o `compor.py` gera o `trilha-sinalizaacao.mid`). O som dos instrumentos vem do banco de sons gratuito **GeneralUser GS v2.0.3**, de S. Christian Collins (schristiancollins.com). A licença do banco permite usá-lo "sem restrição" em músicas próprias, "privadas ou comerciais" (íntegra em `LICENCA-GeneralUser-GS.txt`). Não há música de terceiros.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `trilha-sinalizaacao.wav` | A música pronta (48 kHz, estéreo), igual à do vídeo |
| `trilha-sinalizaacao.mid` | As notas: abre em qualquer programa de música (GarageBand, MuseScore, FL Studio...) para trocar instrumentos ou mudar o andamento |
| `compor.py` | O script que escreveu as notas (Python com a biblioteca `mido`) |
| `LICENCA-GeneralUser-GS.txt` | Licença do banco de sons |

## Para usar em outros lugares

Dá para usar a mesma música em reels e posts do livro. Para um vídeo de outra duração, peça uma versão no tamanho certo: a música foi feita para fechar junto com este vídeo.
