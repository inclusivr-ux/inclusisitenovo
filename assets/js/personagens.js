/* =============================================================================
   InclusiVR — Seu Zé e o elefante em 2D
   - Personagens articulados em SVG (cada parte se mexe: pernas, braços, cabeça,
     chapéu, olhos, orelhas, tromba e rabo).
   - Palco no alto do rodapé, com duas cenas curtas (até ~4,8 s cada):
       1. "Pega-pega": Seu Zé corre atrás do elefante com a rede, o elefante vira
          o jogo, os dois somem... e o elefante volta pelo outro lado.
       2. "Esconde-esconde": o elefante se esconde atrás de uma árvore fininha.
     A cena começa quando o palco aparece na tela e para sozinha. Um clique no
     palco (ou o botão redondo) mostra a outra cena.
   - Os dois braços ficam sempre à vista e acompanham o corpo; as mãos ficam\n     soltas ou segurando a rede: nenhum gesto vira sinal.
   - Com "reduzir movimento" ligado no aparelho, o palco mostra uma cena parada.
   - Para tirar o palco do site: recursos.palco = false no config.js.
   - IVR.personagens.ze('bolso' | 'rede') e IVR.personagens.elefante() devolvem o
     SVG para outras animações.
   ============================================================================= */
(function () {
  'use strict';
  var IVR = window.InclusiVR = window.InclusiVR || {};
  function permitido() { return IVR.movimentoPermitido ? IVR.movimentoPermitido() : true; }

  /* ---------- desenhos (contorno #1a1a1a, cores do Seu Zé e do elefante do livro) ---------- */
  var ZE_BOLSO = [
    '<svg class="rig ze-svg" viewBox="0 0 270 330" aria-hidden="true" focusable="false">',
    '<ellipse class="rig-sombra" cx="112" cy="318" rx="60" ry="7" fill="#100448" opacity=".22"/>',
    '<g class="ze-inclina">',
    '<g class="ze-corpo">',
    '<g class="ze-perna ze-perna--tras">',
    '<path class="rig-t" d="M80 250h24v46c0 5-3 8-8 8h-8c-5 0-8-3-8-8z" fill="#7e2410"/>',
    '<path d="M82 286h20" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" opacity=".35"/>',
    '<path class="rig-t" d="M76 300c0-6 5-9 13-9 13 0 23 6 23 14 0 6-6 9-18 9h-12c-5 0-7-4-6-14z" fill="#3f2410"/>',
    '<path d="M79 309h31" stroke="#2a1608" stroke-width="3" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-perna ze-perna--frente">',
    '<path class="rig-t" d="M116 250h24v46c0 5-3 8-8 8h-8c-5 0-8-3-8-8z" fill="#9b2c12"/>',
    '<path d="M118 286h20" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" opacity=".35"/>',
    '<path class="rig-t" d="M112 300c0-6 5-9 13-9 13 0 23 6 23 14 0 6-6 9-18 9h-12c-5 0-7-4-6-14z" fill="#5a3417"/>',
    '<path d="M115 309h31" stroke="#3a210d" stroke-width="3" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-tronco">',
    '<path class="rig-t" d="M62 206c0-30 20-46 48-46s48 16 48 46v8H62z" fill="#7b7716"/>',
    '<path class="rig-t" d="M58 206h104l4 50c1 14-21 20-56 20s-57-6-56-20z" fill="#9b2c12"/>',
    '<path d="M62 228q48 10 96 0" fill="none" stroke="#6e1d0a" stroke-width="3" stroke-linecap="round"/>',
    '<path class="rig-t" d="M80 212v-28c0-5 4-8 9-8h42c5 0 9 3 9 8v28z" fill="#9b2c12"/>',
    '<rect x="98" y="192" width="24" height="14" rx="3" fill="#7e2410" stroke="#1a1a1a" stroke-width="3"/>',
    '<circle cx="88" cy="190" r="4.5" fill="#f6c744" stroke="#1a1a1a" stroke-width="2.5"/>',
    '<circle cx="132" cy="190" r="4.5" fill="#f6c744" stroke="#1a1a1a" stroke-width="2.5"/>',
    '</g>',
    '<g class="ze-binoculo-peito">',
    '<path d="M90 162 100 196M130 162 120 196" stroke="#1a1a1a" stroke-width="2.5"/>',
    '<rect class="rig-f" x="94" y="194" width="15" height="20" rx="5" fill="#3b3d36"/>',
    '<rect class="rig-f" x="111" y="194" width="15" height="20" rx="5" fill="#3b3d36"/>',
    '<circle cx="101.5" cy="210" r="4.5" fill="#74d0d8" stroke="#1a1a1a" stroke-width="2"/>',
    '<circle cx="118.5" cy="210" r="4.5" fill="#74d0d8" stroke="#1a1a1a" stroke-width="2"/>',
    '</g>',
    '<g class="ze-braco ze-braco--tras">',
    '<path d="M70 184 56 228" stroke="#1a1a1a" stroke-width="22" stroke-linecap="round"/>',
    '<path d="M70 184 56 228" stroke="#5f5c12" stroke-width="14" stroke-linecap="round"/>',
    '<circle cx="55" cy="236" r="9" fill="#fedbb6" stroke="#1a1a1a" stroke-width="4"/>',
    '<path d="M51 234q4 3 8 0" fill="none" stroke="#1a1a1a" stroke-width="2" opacity=".4" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-braco ze-braco--frente-livre">',
    '<path d="M150 184 164 228" stroke="#1a1a1a" stroke-width="22" stroke-linecap="round"/>',
    '<path d="M150 184 164 228" stroke="#7b7716" stroke-width="14" stroke-linecap="round"/>',
    '<circle cx="165" cy="236" r="9.5" fill="#fedbb6" stroke="#1a1a1a" stroke-width="4"/>',
    '<path d="M161 234q4 3 8 0" fill="none" stroke="#1a1a1a" stroke-width="2" opacity=".4" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-cabeca">',
    '<path class="rig-f" d="M62 92c-10 6-12 22-4 34 4 6 10 8 14 6l6-36z" fill="#f6f2ea"/>',
    '<path class="rig-f" d="M158 92c10 6 12 22 4 34-4 6-10 8-14 6l-6-36z" fill="#f6f2ea"/>',
    '<circle class="rig-t" cx="110" cy="114" r="43" fill="#fedbb6"/>',
    '<path d="M138 84c12 8 18 22 15 38-6-10-12-14-20-16z" fill="#f4c095"/>',
    '<ellipse cx="85" cy="127" rx="9" ry="6" fill="#f6a9a4"/>',
    '<ellipse cx="135" cy="127" rx="9" ry="6" fill="#f6a9a4"/>',
    '<path class="rig-t" d="M68 120c4 0 8 4 12 4 8 18 18 26 30 26s22-8 30-26c4 0 8-4 12-4 2 34-18 62-42 62S66 154 68 120z" fill="#f6f2ea"/>',
    '<path d="M134 150c8-6 12-16 14-28 2 20-6 40-20 50 4-8 6-14 6-22z" fill="#cfe6f7"/>',
    '<path class="rig-f" d="M110 133c-5-5-15-7-24-3-8 3-12 11-9 17 5-5 12-6 18-4 7 2 12 1 15-4 3 5 8 6 15 4 6-2 13-1 18 4 3-6-1-14-9-17-9-4-19-2-24 3z" fill="#f6f2ea"/>',
    '<circle class="rig-f" cx="110" cy="126" r="9.5" fill="#f39b95"/>',
    '<circle cx="106.5" cy="122.5" r="2.6" fill="#fff" opacity=".8"/>',
    '<g class="ze-olhos">',
    '<circle cx="91" cy="106" r="15" fill="#e6f6ea"/>',
    '<circle cx="129" cy="106" r="15" fill="#e6f6ea"/>',
    '<g class="ze-pupilas">',
    '<circle cx="93" cy="107" r="6.5" fill="#4f9a4a"/>',
    '<circle cx="131" cy="107" r="6.5" fill="#4f9a4a"/>',
    '<circle cx="93" cy="107" r="3.2" fill="#1a1a1a"/>',
    '<circle cx="131" cy="107" r="3.2" fill="#1a1a1a"/>',
    '<circle cx="95" cy="104.5" r="1.6" fill="#fff"/>',
    '<circle cx="133" cy="104.5" r="1.6" fill="#fff"/>',
    '</g>',
    '</g>',
    '<circle cx="91" cy="106" r="15" fill="none" stroke="#1a1a1a" stroke-width="4.5"/>',
    '<circle cx="129" cy="106" r="15" fill="none" stroke="#1a1a1a" stroke-width="4.5"/>',
    '<path d="M106 104q4-4 8 0" fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>',
    '<path d="M84 99l5-4M122 99l5-4" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>',
    '<g class="ze-sobrancelhas">',
    '<path class="rig-f" d="M74 93c5-9 18-12 29-5-5 1-9 4-11 7-6-3-12-3-18-2z" fill="#f6f2ea"/>',
    '<path class="rig-f" d="M146 93c-5-9-18-12-29-5 5 1 9 4 11 7 6-3 12-3 18-2z" fill="#f6f2ea"/>',
    '</g>',
    '</g>',
    '<g class="ze-chapeu">',
    '<g transform="rotate(-4 110 76) translate(0 -4)">',
    '<path class="rig-t" d="M64 78c0-30 16-45 46-45s46 15 46 45z" fill="#f0bb4c"/>',
    '<path d="M128 36c16 6 24 20 26 40h-14c0-18-4-30-12-40z" fill="#d99a26"/>',
    '<path class="rig-f" d="M64 66h92v12H64z" fill="#6b3d14"/>',
    '<path d="M82 50l6 8M100 44l3 8M120 44l-2 8M138 50l-5 8" stroke="#b77f1f" stroke-width="2.5" stroke-linecap="round"/>',
    '<ellipse class="rig-t" cx="110" cy="80" rx="88" ry="17" fill="#e8ad3d"/>',
    '<path d="M150 70c20 3 40 6 46 10 0 6-20 12-40 14 10-4 14-10 10-16z" fill="#c98a19"/>',
    '<path d="M40 82q30 8 70 8t70-8" fill="none" stroke="#b77f1f" stroke-width="2.5" stroke-linecap="round"/>',
    '</g>',
    '</g>',
    '</g>',
    '</g>',
    '</svg>'
  ].join('');

  var ZE_REDE = [
    '<svg class="rig ze-svg" viewBox="0 0 270 330" aria-hidden="true" focusable="false">',
    '<ellipse class="rig-sombra" cx="112" cy="318" rx="60" ry="7" fill="#100448" opacity=".22"/>',
    '<g class="ze-inclina">',
    '<g class="ze-corpo">',
    '<g class="ze-perna ze-perna--tras">',
    '<path class="rig-t" d="M80 250h24v46c0 5-3 8-8 8h-8c-5 0-8-3-8-8z" fill="#7e2410"/>',
    '<path d="M82 286h20" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" opacity=".35"/>',
    '<path class="rig-t" d="M76 300c0-6 5-9 13-9 13 0 23 6 23 14 0 6-6 9-18 9h-12c-5 0-7-4-6-14z" fill="#3f2410"/>',
    '<path d="M79 309h31" stroke="#2a1608" stroke-width="3" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-perna ze-perna--frente">',
    '<path class="rig-t" d="M116 250h24v46c0 5-3 8-8 8h-8c-5 0-8-3-8-8z" fill="#9b2c12"/>',
    '<path d="M118 286h20" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" opacity=".35"/>',
    '<path class="rig-t" d="M112 300c0-6 5-9 13-9 13 0 23 6 23 14 0 6-6 9-18 9h-12c-5 0-7-4-6-14z" fill="#5a3417"/>',
    '<path d="M115 309h31" stroke="#3a210d" stroke-width="3" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-tronco">',
    '<path class="rig-t" d="M62 206c0-30 20-46 48-46s48 16 48 46v8H62z" fill="#7b7716"/>',
    '<path class="rig-t" d="M58 206h104l4 50c1 14-21 20-56 20s-57-6-56-20z" fill="#9b2c12"/>',
    '<path d="M62 228q48 10 96 0" fill="none" stroke="#6e1d0a" stroke-width="3" stroke-linecap="round"/>',
    '<path class="rig-t" d="M80 212v-28c0-5 4-8 9-8h42c5 0 9 3 9 8v28z" fill="#9b2c12"/>',
    '<rect x="98" y="192" width="24" height="14" rx="3" fill="#7e2410" stroke="#1a1a1a" stroke-width="3"/>',
    '<circle cx="88" cy="190" r="4.5" fill="#f6c744" stroke="#1a1a1a" stroke-width="2.5"/>',
    '<circle cx="132" cy="190" r="4.5" fill="#f6c744" stroke="#1a1a1a" stroke-width="2.5"/>',
    '</g>',
    '<g class="ze-braco ze-braco--tras">',
    '<path d="M70 184 56 228" stroke="#1a1a1a" stroke-width="22" stroke-linecap="round"/>',
    '<path d="M70 184 56 228" stroke="#5f5c12" stroke-width="14" stroke-linecap="round"/>',
    '<circle cx="55" cy="236" r="9" fill="#fedbb6" stroke="#1a1a1a" stroke-width="4"/>',
    '<path d="M51 234q4 3 8 0" fill="none" stroke="#1a1a1a" stroke-width="2" opacity=".4" stroke-linecap="round"/>',
    '</g>',
    '<g class="ze-cabeca">',
    '<path class="rig-f" d="M62 92c-10 6-12 22-4 34 4 6 10 8 14 6l6-36z" fill="#f6f2ea"/>',
    '<path class="rig-f" d="M158 92c10 6 12 22 4 34-4 6-10 8-14 6l-6-36z" fill="#f6f2ea"/>',
    '<circle class="rig-t" cx="110" cy="114" r="43" fill="#fedbb6"/>',
    '<path d="M138 84c12 8 18 22 15 38-6-10-12-14-20-16z" fill="#f4c095"/>',
    '<ellipse cx="85" cy="127" rx="9" ry="6" fill="#f6a9a4"/>',
    '<ellipse cx="135" cy="127" rx="9" ry="6" fill="#f6a9a4"/>',
    '<path class="rig-t" d="M68 120c4 0 8 4 12 4 8 18 18 26 30 26s22-8 30-26c4 0 8-4 12-4 2 34-18 62-42 62S66 154 68 120z" fill="#f6f2ea"/>',
    '<path d="M134 150c8-6 12-16 14-28 2 20-6 40-20 50 4-8 6-14 6-22z" fill="#cfe6f7"/>',
    '<path class="rig-f" d="M110 133c-5-5-15-7-24-3-8 3-12 11-9 17 5-5 12-6 18-4 7 2 12 1 15-4 3 5 8 6 15 4 6-2 13-1 18 4 3-6-1-14-9-17-9-4-19-2-24 3z" fill="#f6f2ea"/>',
    '<circle class="rig-f" cx="110" cy="126" r="9.5" fill="#f39b95"/>',
    '<circle cx="106.5" cy="122.5" r="2.6" fill="#fff" opacity=".8"/>',
    '<g class="ze-olhos">',
    '<circle cx="91" cy="106" r="15" fill="#e6f6ea"/>',
    '<circle cx="129" cy="106" r="15" fill="#e6f6ea"/>',
    '<g class="ze-pupilas">',
    '<circle cx="93" cy="107" r="6.5" fill="#4f9a4a"/>',
    '<circle cx="131" cy="107" r="6.5" fill="#4f9a4a"/>',
    '<circle cx="93" cy="107" r="3.2" fill="#1a1a1a"/>',
    '<circle cx="131" cy="107" r="3.2" fill="#1a1a1a"/>',
    '<circle cx="95" cy="104.5" r="1.6" fill="#fff"/>',
    '<circle cx="133" cy="104.5" r="1.6" fill="#fff"/>',
    '</g>',
    '</g>',
    '<circle cx="91" cy="106" r="15" fill="none" stroke="#1a1a1a" stroke-width="4.5"/>',
    '<circle cx="129" cy="106" r="15" fill="none" stroke="#1a1a1a" stroke-width="4.5"/>',
    '<path d="M106 104q4-4 8 0" fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>',
    '<path d="M84 99l5-4M122 99l5-4" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>',
    '<g class="ze-sobrancelhas">',
    '<path class="rig-f" d="M74 93c5-9 18-12 29-5-5 1-9 4-11 7-6-3-12-3-18-2z" fill="#f6f2ea"/>',
    '<path class="rig-f" d="M146 93c-5-9-18-12-29-5 5 1 9 4 11 7 6-3 12-3 18-2z" fill="#f6f2ea"/>',
    '</g>',
    '</g>',
    '<g class="ze-chapeu">',
    '<g transform="rotate(-4 110 76) translate(0 -4)">',
    '<path class="rig-t" d="M64 78c0-30 16-45 46-45s46 15 46 45z" fill="#f0bb4c"/>',
    '<path d="M128 36c16 6 24 20 26 40h-14c0-18-4-30-12-40z" fill="#d99a26"/>',
    '<path class="rig-f" d="M64 66h92v12H64z" fill="#6b3d14"/>',
    '<path d="M82 50l6 8M100 44l3 8M120 44l-2 8M138 50l-5 8" stroke="#b77f1f" stroke-width="2.5" stroke-linecap="round"/>',
    '<ellipse class="rig-t" cx="110" cy="80" rx="88" ry="17" fill="#e8ad3d"/>',
    '<path d="M150 70c20 3 40 6 46 10 0 6-20 12-40 14 10-4 14-10 10-16z" fill="#c98a19"/>',
    '<path d="M40 82q30 8 70 8t70-8" fill="none" stroke="#b77f1f" stroke-width="2.5" stroke-linecap="round"/>',
    '</g>',
    '</g>',
    '<g class="ze-braco ze-braco--frente">',
    '<path d="M164 244 224 96" stroke="#1a1a1a" stroke-width="10" stroke-linecap="round"/>',
    '<path d="M164 244 224 96" stroke="#b07a32" stroke-width="5" stroke-linecap="round"/>',
    '<path d="M244 52c26 4 38 34 26 58-6 12-18 16-30 10-8-4-12-12-16-22" fill="#fff" fill-opacity=".45" stroke="#1a1a1a" stroke-width="3.5" stroke-linejoin="round"/>',
    '<path d="M252 62c8 12 10 28 4 44M240 66c4 12 4 26 0 40M232 78c6 6 18 8 34 4" fill="none" stroke="#1a1a1a" stroke-width="1.8" opacity=".5"/>',
    '<ellipse cx="236" cy="72" rx="19" ry="26" transform="rotate(30 236 72)" fill="none" stroke="#1a1a1a" stroke-width="7"/>',
    '<ellipse cx="236" cy="72" rx="19" ry="26" transform="rotate(30 236 72)" fill="none" stroke="#b07a32" stroke-width="3"/>',
    '<path d="M146 178 178 190" stroke="#1a1a1a" stroke-width="22" stroke-linecap="round"/>',
    '<path d="M146 178 178 190" stroke="#7b7716" stroke-width="14" stroke-linecap="round"/>',
    '<circle cx="185" cy="190" r="10.5" fill="#fedbb6" stroke="#1a1a1a" stroke-width="4"/>',
    '<path d="M180 186q5 4 10 0" fill="none" stroke="#1a1a1a" stroke-width="2" opacity=".45" stroke-linecap="round"/>',
    '</g>',
    '</g>',
    '</g>',
    '</svg>'
  ].join('');

  var ELEFANTE = [
    '<svg class="rig ele-svg" viewBox="0 0 280 200" aria-hidden="true" focusable="false">',
    '<ellipse class="rig-sombra" cx="128" cy="191" rx="86" ry="6" fill="#100448" opacity=".22"/>',
    '<g class="ele-corpo">',
    '<g class="ele-pata ele-pata--tras-longe">',
    '<path class="rig-t" d="M64 128h26v50c0 5-5 8-13 8s-13-3-13-8z" fill="#868c9c"/>',
    '<ellipse cx="69" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="77" cy="184.5" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="85" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '</g>',
    '<g class="ele-pata ele-pata--frente-longe">',
    '<path class="rig-t" d="M140 128h26v50c0 5-5 8-13 8s-13-3-13-8z" fill="#868c9c"/>',
    '<ellipse cx="145" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="153" cy="184.5" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="161" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '</g>',
    '<g class="ele-rabo">',
    '<path d="M44 104c-12 4-16 14-13 26" fill="none" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>',
    '<path class="rig-f" d="M26 126c-5 4-5 11 1 13 5 2 9-2 9-9z" fill="#5d6170"/>',
    '</g>',
    '<path class="rig-t" d="M38 110c0-42 34-62 80-62 48 0 76 22 76 60 0 34-26 50-76 50-48 0-80-14-80-48z" fill="#a3a9b8"/>',
    '<path d="M50 130c16 20 118 24 136 0-2 18-24 28-68 28-42 0-62-10-68-28z" fill="#8f95a5"/>',
    '<path d="M76 62c16-8 40-10 60-6" fill="none" stroke="#c6cbd6" stroke-width="5" stroke-linecap="round"/>',
    '<g class="ele-pata ele-pata--tras-perto">',
    '<path class="rig-t" d="M84 128h26v50c0 5-5 8-13 8s-13-3-13-8z" fill="#a3a9b8"/>',
    '<ellipse cx="89" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="97" cy="184.5" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="105" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '</g>',
    '<g class="ele-pata ele-pata--frente-perto">',
    '<path class="rig-t" d="M160 128h26v50c0 5-5 8-13 8s-13-3-13-8z" fill="#a3a9b8"/>',
    '<ellipse cx="165" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="173" cy="184.5" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '<ellipse cx="181" cy="183" rx="3" ry="2.2" fill="#f2e9d6"/>',
    '</g>',
    '<g class="ele-cabeca">',
    '<circle class="rig-t" cx="210" cy="84" r="38" fill="#a3a9b8"/>',
    '<path d="M202 48c-2-8 2-13 7-13M211 47c0-8 4-12 9-10M219 49c2-6 6-8 11-6" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>',
    '<g class="ele-tromba">',
    '<path class="rig-t" d="M236 90c19 6 28 24 24 44-2 10-12 12-14 4-2-8 4-14 2-22-3-10-10-14-18-14z" fill="#a3a9b8"/>',
    '<path d="M244 102l-7 4M251 113l-8 3M254 125h-8" stroke="#7d8392" stroke-width="2.5" stroke-linecap="round"/>',
    '</g>',
    '<path d="M232 108c2 8 8 12 16 10" fill="none" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round"/>',
    '<path d="M232 108c2 8 8 12 16 10" fill="none" stroke="#fffaf0" stroke-width="4.5" stroke-linecap="round"/>',
    '<path d="M218 106c4 6 10 8 14 6" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>',
    '<ellipse cx="226" cy="92" rx="7" ry="4.5" fill="#f4a9b8" opacity=".9"/>',
    '<g class="ele-olho">',
    '<ellipse cx="222" cy="72" rx="7" ry="8.5" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>',
    '<g class="ele-pupila">',
    '<circle cx="224" cy="73" r="4" fill="#1a1a1a"/>',
    '<circle cx="225.5" cy="71" r="1.4" fill="#fff"/>',
    '</g>',
    '</g>',
    '<path d="M214 60q8-5 16 0" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>',
    '<g class="ele-orelha">',
    '<path class="rig-t" d="M192 50c-24-6-38 14-34 40 3 22 20 34 38 26 8-14 10-48-4-66z" fill="#b8bdca"/>',
    '<path d="M188 62c-14-2-20 12-18 28 2 14 12 20 22 16 4-12 4-32-4-44z" fill="#f4b6c4"/>',
    '</g>',
    '</g>',
    '</g>',
    '</svg>'
  ].join('');

  IVR.personagens = {
    ze: function (variante) { return variante === 'rede' ? ZE_REDE : ZE_BOLSO; },
    elefante: function () { return ELEFANTE; }
  };

  /* ---------- palco ---------- */
  var palco = document.querySelector('[data-palco]');
  if (!palco) return;
  var janela = palco.querySelector('.palco__janela');
  var botao = palco.querySelector('[data-palco-repetir]');
  var runa = palco.querySelector('.palco__runa');
  var C = IVR.config || window.INCLUSIVR_CONFIG || {};
  var desligado = C.recursos && C.recursos.palco === false;
  if (desligado || !janela || !('IntersectionObserver' in window) || typeof janela.animate !== 'function') { palco.hidden = true; return; }

  var ESTADOS = ['anda', 'corre', 'olha', 'susto', 'freia', 'toca', 'abana', 'pisca', 'espia'];
  var timers = [];
  var ze = null, ele = null;
  var tocando = false, proxima = Math.random() < 0.5 ? 0 : 1;
  var autoTocadas = 0, ultimoFim = 0, visivel = false;

  function em(t, fn) { timers.push(setTimeout(fn, t)); }
  function criarAtor(tipo) {
    var el = document.createElement('div');
    el.className = 'ator ator--' + tipo;
    var vira = document.createElement('div');
    vira.className = 'ator__vira';
    el.appendChild(vira);
    var a = { el: el, vira: vira, anim: null, f: -1, variante: null, balao: null };
    if (tipo === 'ze') {
      a.balao = document.createElement('span');
      a.balao.className = 'ator__balao';
      el.appendChild(a.balao);
    } else {
      vira.innerHTML = ELEFANTE;
    }
    janela.appendChild(el);
    return a;
  }
  function vestir(a, variante) {
    if (a.variante === variante) return;
    a.vira.innerHTML = variante === 'rede' ? ZE_REDE : ZE_BOLSO;
    a.variante = variante;
  }
  function px(a, f) { return Math.round(f * janela.clientWidth - a.el.offsetWidth / 2); }
  /* posições fora do palco (à esquerda e à direita), conforme o tamanho do boneco */
  function fora(a, lado) {
    var m = (a.el.offsetWidth / 2 + 24) / janela.clientWidth;
    return lado === 'dir' ? 1 + m : -m;
  }
  function estreito() { return janela.clientWidth < 520; }
  function por(a, f) {
    if (a.anim) { a.anim.cancel(); a.anim = null; }
    a.f = f;
    a.el.style.transform = 'translateX(' + px(a, f) + 'px)';
  }
  function mover(a, f0, f1, dur, curva) {
    if (a.anim) a.anim.cancel();
    a.f = f1;
    a.el.style.transform = 'translateX(' + px(a, f1) + 'px)';
    a.anim = a.el.animate([
      { transform: 'translateX(' + px(a, f0) + 'px)' },
      { transform: 'translateX(' + px(a, f1) + 'px)' }
    ], { duration: dur, easing: curva || 'linear' });
  }
  function estado(a, lista) {
    ESTADOS.forEach(function (c) { a.el.classList.remove(c); });
    (lista || []).forEach(function (c) { a.el.classList.add(c); });
  }
  function virar(a, lado) { a.el.classList.toggle('ator--esq', lado === 'esq'); }
  function balao(a, texto) {
    if (!a.balao) return;
    a.balao.classList.remove('ator__balao--on');
    if (!texto) return;
    a.balao.textContent = texto;
    void a.balao.offsetWidth;
    a.balao.classList.add('ator__balao--on');
  }
  function poeira(a, n) {
    var r = a.el.getBoundingClientRect(), j = janela.getBoundingClientRect();
    var esq = a.el.classList.contains('ator--esq');
    var x = r.left - j.left + r.width * (esq ? 0.66 : 0.34);
    for (var i = 0; i < (n || 1); i++) {
      var p = document.createElement('i');
      p.className = 'palco__poeira';
      p.style.left = Math.round(x + Math.random() * 16 - 8) + 'px';
      p.style.setProperty('--dx', Math.round((esq ? 1 : -1) * (10 + Math.random() * 16)) + 'px');
      p.style.setProperty('--tam', Math.round(12 + Math.random() * 10) + 'px');
      p.style.animationDelay = (i * 60) + 'ms';
      janela.appendChild(p);
      setTimeout(p.remove.bind(p), 700 + i * 60);
    }
  }
  function rastro(a, t0, t1, cada) { for (var t = t0; t <= t1; t += cada) em(t, poeira.bind(null, a, 1)); }
  function acenderRuna() {
    if (!runa) return;
    runa.classList.add('acesa');
    var r = runa.getBoundingClientRect(), j = janela.getBoundingClientRect();
    var camada = document.createElement('div');
    camada.className = 'faiscas';
    camada.style.zIndex = '5';
    for (var i = 0; i < 7; i++) {
      var f = document.createElement('i');
      f.className = 'faisca';
      f.style.left = Math.round(r.left - j.left + r.width * (0.2 + Math.random() * 0.6)) + 'px';
      f.style.top = Math.round(r.top - j.top + r.height * 0.3) + 'px';
      f.style.setProperty('--tam', (4 + Math.random() * 5).toFixed(1) + 'px');
      f.style.setProperty('--dx', Math.round(Math.random() * 40 - 20) + 'px');
      f.style.setProperty('--dy', Math.round(-50 - Math.random() * 60) + 'px');
      f.style.setProperty('--giro', Math.round(Math.random() * 360 - 180) + 'deg');
      f.style.setProperty('--atraso', (Math.random() * 0.3).toFixed(2) + 's');
      f.style.setProperty('--dur', (0.9 + Math.random() * 0.6).toFixed(2) + 's');
      camada.appendChild(f);
    }
    janela.appendChild(camada);
    em(1700, function () { runa.classList.remove('acesa'); });
    setTimeout(camada.remove.bind(camada), 2300);
  }
  function parar() {
    timers.forEach(clearTimeout);
    timers = [];
    [ze, ele].forEach(function (a) { if (a && a.anim) { a.anim.cancel(); a.anim = null; } });
    Array.prototype.forEach.call(janela.querySelectorAll('.palco__poeira, .faiscas'), function (x) { x.remove(); });
    if (runa) runa.classList.remove('acesa');
    tocando = false;
  }
  function fim() { tocando = false; ultimoFim = Date.now(); }
  function preparar(varianteZe) {
    vestir(ze, varianteZe);
    estado(ze); estado(ele); balao(ze, null);
    virar(ele, 'dir'); por(ele, fora(ele, 'esq'));
    virar(ze, 'dir'); por(ze, fora(ze, 'esq') - 0.05);
  }

  /* Cena 1: pega-pega */
  function pegaPega() {
    preparar('rede');
    var n = estreito(), zePara = n ? 0.33 : 0.42, elePara = n ? 0.77 : 0.72, zeVolta = n ? 0.27 : 0.3;
    em(0, function () { estado(ele, ['corre']); mover(ele, fora(ele, 'esq'), elePara, 1050, 'cubic-bezier(.3,.5,.45,1)'); });
    rastro(ele, 100, 950, 230);
    em(330, acenderRuna);
    em(250, function () { estado(ze, ['corre']); mover(ze, fora(ze, 'esq'), zePara, 1100, 'cubic-bezier(.3,.5,.4,1)'); });
    rastro(ze, 350, 1250, 200);
    em(1050, function () { estado(ele, ['freia']); });
    em(1130, function () { virar(ele, 'esq'); });
    em(1220, function () { estado(ele, ['toca']); });
    em(1350, function () { estado(ze, ['freia']); poeira(ze, 3); });
    em(1440, function () { estado(ze, ['susto']); balao(ze, '!'); });
    em(1760, function () { estado(ele, ['corre']); mover(ele, elePara, fora(ele, 'esq'), 1500, 'cubic-bezier(.5,0,.75,1)'); });
    rastro(ele, 1850, 3100, 230);
    em(1800, function () { balao(ze, null); virar(ze, 'esq'); estado(ze, ['freia']); });
    em(1880, function () { estado(ze, ['corre']); mover(ze, zePara, fora(ze, 'esq'), 950, 'cubic-bezier(.45,0,.7,1)'); });
    rastro(ze, 1950, 2750, 180);
    em(3150, function () { virar(ze, 'dir'); estado(ze, ['anda']); mover(ze, fora(ze, 'esq'), zeVolta, 700, 'cubic-bezier(.2,.6,.4,1)'); });
    em(3700, function () { virar(ele, 'esq'); estado(ele, ['anda']); mover(ele, fora(ele, 'dir'), 0.86, 550, 'cubic-bezier(.2,.7,.4,1)'); });
    em(3850, function () { estado(ze); });
    em(3900, function () { virar(ze, 'esq'); estado(ze, ['olha']); balao(ze, '?'); });
    em(4250, function () { estado(ele, ['toca']); });
    em(4750, fim);
  }

  /* Cena 2: esconde-esconde (o elefante atrás da árvore fininha) */
  function escondeEsconde() {
    preparar('bolso');
    em(0, function () { estado(ele, ['corre']); mover(ele, fora(ele, 'esq'), 0.68, 1000, 'cubic-bezier(.3,.5,.4,1)'); });
    rastro(ele, 100, 900, 230);
    em(330, acenderRuna);
    em(1000, function () { estado(ele, ['freia']); poeira(ele, 2); });
    em(1250, function () { estado(ele, ['espia']); });
    em(450, function () { estado(ze, ['anda']); mover(ze, fora(ze, 'esq'), estreito() ? 0.3 : 0.34, 1450, 'cubic-bezier(.25,.4,.45,1)'); });
    em(1900, function () { estado(ze); });
    em(1950, function () { estado(ze, ['olha']); balao(ze, '?'); });
    em(2150, function () { estado(ele, ['abana', 'espia']); });
    em(2800, function () { estado(ele, ['espia']); estado(ze); virar(ze, 'esq'); });
    em(2950, function () { estado(ele, ['anda']); mover(ele, 0.68, 0.83, 380, 'ease-out'); });
    em(3330, function () { estado(ele, ['toca']); });
    em(3600, function () { virar(ze, 'dir'); estado(ze, ['susto']); balao(ze, '!'); });
    em(3640, function () { estado(ele, ['corre']); mover(ele, 0.83, 0.68, 220, 'ease-in'); });
    em(3860, function () { estado(ele, ['freia', 'espia']); });
    em(4050, function () { estado(ze); balao(ze, '?'); });
    em(4250, function () { estado(ele, ['pisca', 'espia']); });
    em(4650, fim);
  }
  var CENAS = [pegaPega, escondeEsconde];

  /* cena parada (reduzir movimento): o elefante "escondido" atrás da árvore */
  function quadroParado() {
    parar();
    vestir(ze, 'bolso');
    estado(ze); estado(ele, ['espia']);
    virar(ze, 'dir'); por(ze, estreito() ? 0.3 : 0.34);
    virar(ele, 'dir'); por(ele, 0.68);
    balao(ze, '?');
  }
  function montar() {
    if (ze) return;
    ele = criarAtor('ele');
    ze = criarAtor('ze');
    if (permitido()) preparar('rede'); else quadroParado();
  }
  function tocar() {
    montar();
    if (!permitido()) { quadroParado(); return; }
    parar();
    tocando = true;
    CENAS[proxima]();
    proxima = (proxima + 1) % CENAS.length;
  }

  var obs = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (en.isIntersecting) montar();
      visivel = en.isIntersecting && en.intersectionRatio >= 0.6;
      if (visivel && !tocando && permitido() && autoTocadas < 3 && (!ultimoFim || Date.now() - ultimoFim > 12000)) {
        autoTocadas++;
        tocar();
      }
    });
  }, { threshold: [0, 0.6] });
  obs.observe(janela);

  janela.addEventListener('click', tocar);
  if (botao) {
    botao.hidden = !permitido();
    botao.addEventListener('click', tocar);
  }
  document.addEventListener('inclusivr:movimento', function (e) {
    if (botao) botao.hidden = !e.detail.permitido;
    if (!e.detail.permitido && ze) quadroParado();
  });
  var espera;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(function () {
      if (!ze || tocando) return;
      por(ze, ze.f);
      por(ele, ele.f);
    }, 150);
  });
})();
