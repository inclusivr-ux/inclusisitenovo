# Trilha original para o vídeo do Igor apresentando o livro SinalizaAção (sem fala; vídeo em LIBRAS).
# Clima: conto de fadas leve e acolhedor. Fá maior, 96 BPM, 16 compassos = 40 s.
# Instrumentos (General MIDI): celesta (melodia), violão de náilon (dedilhado), cordas em pizzicato
# (baixo), cordas suaves (fundo), glockenspiel (brilho na 2ª parte), flauta (contracanto) e
# percussão leve (shaker, triângulo e "bell tree" no começo e no fim).
import random
import mido

random.seed(7)
TPQ = 480
BPM = 96
BAR = 4 * TPQ
N = {}
nomes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
for oct_ in range(1, 8):
    for i, n in enumerate(nomes):
        N[f'{n}{oct_}'] = 12 * (oct_ + 1) + i

def nota(s):
    return N[s]

eventos = {}  # canal -> lista de (tick, tipo, a, b)

def add(canal, ini, dur, alt, vel, humano=True):
    if humano:
        ini = max(0, ini + random.randint(-6, 6))
        vel = max(1, min(127, vel + random.randint(-5, 5)))
    eventos.setdefault(canal, []).append((ini, 'on', alt, vel))
    eventos[canal].append((ini + max(30, dur), 'off', alt, 0))

# ---------- harmonia ----------
# acordes por compasso (1 a 16); "a/b" = dois acordes no compasso
ACORDES = ['F', 'C/E', 'F', 'Am', 'Bb', 'C', 'F', 'Dm', 'Gm7', 'C7',
           'Bb', 'C', 'Am', 'Dm', 'Gm7|C7', 'F']
VOZ = {  # (baixo, notas do dedilhado do violão)
    'F':   ('F2', ['F3', 'C4', 'F4', 'A4']),
    'C/E': ('E2', ['E3', 'C4', 'E4', 'G4']),
    'Am':  ('A2', ['A3', 'E4', 'A4', 'C5']),
    'Bb':  ('Bb2', ['Bb3', 'F4', 'Bb4', 'D5']),
    'C':   ('C3', ['C4', 'G4', 'C5', 'E5']),
    'Dm':  ('D3', ['D4', 'A4', 'D5', 'F5']),
    'Gm7': ('G2', ['G3', 'D4', 'F4', 'Bb4']),
    'C7':  ('C3', ['C4', 'G4', 'Bb4', 'E5']),
}
CORDAS = {  # acordes do fundo (cordas suaves)
    'F': ['F3', 'A3', 'C4', 'F4'], 'C/E': ['E3', 'G3', 'C4', 'E4'], 'Am': ['E3', 'A3', 'C4', 'E4'],
    'Bb': ['F3', 'Bb3', 'D4', 'F4'], 'C': ['E3', 'G3', 'C4', 'E4'], 'Dm': ['F3', 'A3', 'D4', 'F4'],
    'Gm7': ['F3', 'Bb3', 'D4', 'G4'], 'C7': ['E3', 'G3', 'Bb3', 'E4'],
}

# canais
CEL, VIO, PIZ, COR, GLO, FLA, PER = 0, 1, 2, 3, 4, 5, 9

def dedilhado(compasso, acorde, ini_beat=0, beats=4, vel=50):
    baixo, ns = VOZ[acorde]
    padrao = [0, 1, 2, 3, 2, 1, 2, 1]  # índice nas notas do acorde, em colcheias
    for k in range(beats * 2):
        t = compasso * BAR + ini_beat * TPQ + k * (TPQ // 2)
        alt = nota(ns[padrao[k % 8]])
        v = vel + (6 if k % 4 == 0 else 0)
        add(VIO, t, int(TPQ * 1.4), alt, v)

def baixo_pizz(compasso, acorde, ini_beat=0, beats=4, vel=58):
    b, _ = VOZ[acorde]
    alt = nota(b)
    quinta = alt + 7
    for k in range(0, beats, 2):
        t = compasso * BAR + (ini_beat + k) * TPQ
        add(PIZ, t, TPQ, alt if k == 0 else quinta, vel)

def cordas(compasso, acorde, ini_beat=0, beats=4, vel=40):
    for s in CORDAS[acorde]:
        add(COR, compasso * BAR + ini_beat * TPQ, beats * TPQ - 20, nota(s), vel, humano=False)

for c, ac in enumerate(ACORDES):
    partes = ac.split('|')
    if len(partes) == 2:
        blocos = [(partes[0], 0, 2), (partes[1], 2, 2)]
    else:
        blocos = [(ac, 0, 4)]
    for a, ib, nb in blocos:
        if c < 15:
            dedilhado(c, a, ib, nb, vel=46 if c < 2 else 50)
        if 2 <= c <= 14:
            baixo_pizz(c, a, ib, nb, vel=56 if c < 10 else 60)
        if c >= 4:
            v = 34 if c < 10 else (40 if c < 14 else 44)
            cordas(c, a, ib, nb, vel=v)
# compasso final: acorde de Fá em arpejo lento no violão, cordas sustentadas
for k, s in enumerate(['F2', 'C3', 'F3', 'A3', 'C4', 'F4']):
    add(VIO, 15 * BAR + k * 60, BAR * 2, nota(s), 52 - k * 2)
add(PIZ, 15 * BAR, TPQ * 2, nota('F2'), 60)
for s in ['F3', 'A3', 'C4', 'F4', 'A4']:
    add(COR, 15 * BAR, int(BAR * 1.6), nota(s), 46, humano=False)

# ---------- melodia (celesta) ----------
# (compasso, tempo em semínimas, duração em semínimas, nota)
MEL = [
    # introdução: brilho
    (1, 2, .5, 'G5'), (1, 2.5, .5, 'E5'), (1, 3, .5, 'C5'), (1, 3.5, .5, 'G4'),
    # tema A
    (2, 0, 1.5, 'C5'), (2, 1.5, .5, 'D5'), (2, 2, 1, 'C5'), (2, 3, 1, 'A4'),
    (3, 0, 1.5, 'E5'), (3, 1.5, .5, 'D5'), (3, 2, 2, 'C5'),
    (4, 0, 1.5, 'D5'), (4, 1.5, .5, 'E5'), (4, 2, 1, 'F5'), (4, 3, 1, 'D5'),
    (5, 0, 3, 'C5'), (5, 3, 1, 'G4'),
    (6, 0, 1, 'A4'), (6, 1, 1, 'C5'), (6, 2, 1, 'F5'), (6, 3, 1, 'A5'),
    (7, 0, 1.5, 'G5'), (7, 1.5, .5, 'F5'), (7, 2, 2, 'D5'),
    (8, 0, 1, 'F5'), (8, 1, 1, 'D5'), (8, 2, 1, 'Bb4'), (8, 3, 1, 'D5'),
    (9, 0, 3, 'C5'), (9, 3, .5, 'C5'), (9, 3.5, .5, 'E5'),
    # tema B (mais aberto)
    (10, 0, 1, 'F5'), (10, 1, 1, 'D5'), (10, 2, 1, 'F5'), (10, 3, 1, 'Bb5'),
    (11, 0, 1.5, 'A5'), (11, 1.5, .5, 'G5'), (11, 2, 2, 'E5'),
    (12, 0, 1, 'C5'), (12, 1, 1, 'E5'), (12, 2, 1, 'A5'), (12, 3, 1, 'G5'),
    (13, 0, 2, 'F5'), (13, 2, 2, 'D5'),
    # final
    (14, 0, 1, 'Bb4'), (14, 1, 1, 'D5'), (14, 2, 1, 'E5'), (14, 3, 1, 'G5'),
    (15, 0, 4, 'F5'),
]
for c, b, d, n in MEL:
    vel = 74 if c < 10 else 80
    if c == 1: vel = 56
    add(CEL, c * BAR + int(b * TPQ), int(d * TPQ * 0.95), nota(n), vel)
# floreio final da celesta (sobe até o Fá agudo)
for k, s in enumerate(['A5', 'C6', 'F6']):
    add(CEL, 15 * BAR + TPQ + k * (TPQ // 2), TPQ * 3, nota(s), 58 - k * 6)

# glockenspiel dobra a melodia do tema B, bem baixinho
for c, b, d, n in MEL:
    if 10 <= c <= 13:
        add(GLO, c * BAR + int(b * TPQ), int(d * TPQ * 0.8), nota(n) + 12, 38)

# flauta: contracanto curto no tema B
FLAUTA = [(10, 0, 4, 'D5'), (11, 0, 4, 'C5'), (12, 0, 4, 'C5'), (13, 0, 2, 'A4'), (13, 2, 2, 'F4'),
          (14, 0, 2, 'G4'), (14, 2, 2, 'Bb4')]
for c, b, d, n in FLAUTA:
    add(FLA, c * BAR + int(b * TPQ), int(d * TPQ * 0.95), nota(n), 48)
add(FLA, 15 * BAR, BAR, nota('A4'), 46)

# ---------- percussão leve ----------
SHAKER, TRIANGULO, BELL = 82, 81, 84
for c in range(4, 15):
    for k in range(8):
        v = 30 if k % 2 == 0 else 22
        add(PER, c * BAR + k * (TPQ // 2), TPQ // 4, SHAKER, v)
for c in (6, 10, 14):
    add(PER, c * BAR, TPQ, TRIANGULO, 40)
add(PER, 0, TPQ * 2, BELL, 50)
add(PER, 15 * BAR, TPQ * 2, BELL, 46)

# ---------- arquivo MIDI ----------
mid = mido.MidiFile(ticks_per_beat=TPQ)
meta = mido.MidiTrack(); mid.tracks.append(meta)
meta.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(BPM), time=0))
meta.append(mido.MetaMessage('time_signature', numerator=4, denominator=4, time=0))
meta.append(mido.MetaMessage('track_name', name='Trilha SinalizaAcao', time=0))
CONFIG = {  # canal: (programa, volume, pan, reverb, chorus)
    CEL: (8, 100, 76, 70, 10),
    VIO: (24, 92, 44, 52, 12),
    PIZ: (45, 84, 60, 44, 0),
    COR: (48, 70, 64, 72, 20),
    GLO: (9, 64, 84, 72, 0),
    FLA: (73, 70, 52, 66, 0),
    PER: (0, 64, 80, 50, 0),
}
for canal, evs in sorted(eventos.items()):
    tr = mido.MidiTrack(); mid.tracks.append(tr)
    prog, vol, pan, rev, cho = CONFIG[canal]
    tr.append(mido.Message('program_change', channel=canal, program=prog, time=0))
    for cc, val in ((7, vol), (10, pan), (91, rev), (93, cho), (11, 127)):
        tr.append(mido.Message('control_change', channel=canal, control=cc, value=val, time=0))
    evs.sort(key=lambda e: (e[0], 0 if e[1] == 'off' else 1))
    agora = 0
    for t, tipo, a, b in evs:
        dt = t - agora; agora = t
        if tipo == 'on':
            tr.append(mido.Message('note_on', channel=canal, note=a, velocity=b, time=dt))
        else:
            tr.append(mido.Message('note_off', channel=canal, note=a, velocity=0, time=dt))
mid.save('trilha-sinalizaacao.mid')
print('compassos:', len(ACORDES), '| duração (s):', round(len(ACORDES) * 4 * 60 / BPM, 2), '| trilhas:', len(mid.tracks))
