// Demo Sprite - A cute GameBoy-style character with walk animation
// 32x32 canvas, 4 frames

import type { Frame } from '../types';
import { nanoid } from 'nanoid';

// GameBoy colors
const DARK = '#0f380f';
const MID_DARK = '#306230';
const MID_LIGHT = '#8bac0f';
const LIGHT = '#9bbc0f';

// Helper to create pixel data from ASCII art
function parseAsciiArt(art: string[], colorMap: Record<string, string>): Map<string, string> {
  const pixels = new Map<string, string>();

  art.forEach((row, y) => {
    [...row].forEach((char, x) => {
      if (colorMap[char]) {
        pixels.set(`${x},${y}`, colorMap[char]);
      }
    });
  });

  return pixels;
}

const colorMap: Record<string, string> = {
  '#': DARK,      // Darkest - outline
  '@': MID_DARK,  // Dark - shadows
  '+': MID_LIGHT, // Light - highlights
  '.': LIGHT,     // Lightest - bright spots
};

// Frame 1: Idle / Standing
const frame1Art = [
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '          ########              ',
  '        ##........##            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #....@@@@....#           ',
  '       #..@@....@@..#           ',
  '       #............#           ',
  '        ##..####..##            ',
  '          ########              ',
  '        ############            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #............#           ',
  '       ##############           ',
  '       #......##....#           ',
  '       #......##....#           ',
  '       #..####..####            ',
  '       #..#  #..#               ',
  '       ####  ####               ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
];

// Frame 2: Walk Right Leg Forward
const frame2Art = [
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '          ########              ',
  '        ##........##            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #....@@@@....#           ',
  '       #..@@....@@..#           ',
  '       #............#           ',
  '        ##..####..##            ',
  '          ########              ',
  '        ############            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #............#           ',
  '       ##############           ',
  '       #......##....#           ',
  '       #......##....#           ',
  '       #..####  ####            ',
  '       #..#    #..#             ',
  '       ####    ####             ',
  '              #..#              ',
  '              ####              ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
];

// Frame 3: Walk Both Legs Center
const frame3Art = [
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '          ########              ',
  '        ##........##            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #....@@@@....#           ',
  '       #..@@....@@..#           ',
  '       #............#           ',
  '        ##..####..##            ',
  '          ########              ',
  '        ############            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #............#           ',
  '       ##############           ',
  '       #......##....#           ',
  '       #......##....#           ',
  '         ####..####             ',
  '         #..#..#..#             ',
  '         ####..####             ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
];

// Frame 4: Walk Left Leg Forward
const frame4Art = [
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '          ########              ',
  '        ##........##            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #....@@@@....#           ',
  '       #..@@....@@..#           ',
  '       #............#           ',
  '        ##..####..##            ',
  '          ########              ',
  '        ############            ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #..++....++..#           ',
  '       #............#           ',
  '       ##############           ',
  '       #......##....#           ',
  '       #......##....#           ',
  '       ####  ####..#            ',
  '         #..#  #..#             ',
  '         ####  ####             ',
  '         #..#                   ',
  '         ####                   ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
  '                                ',
];

export function createDemoFrames(): Frame[] {
  return [
    {
      id: nanoid(),
      pixels: parseAsciiArt(frame1Art, colorMap),
    },
    {
      id: nanoid(),
      pixels: parseAsciiArt(frame2Art, colorMap),
    },
    {
      id: nanoid(),
      pixels: parseAsciiArt(frame3Art, colorMap),
    },
    {
      id: nanoid(),
      pixels: parseAsciiArt(frame4Art, colorMap),
    },
  ];
}

// Alternative: A simpler bouncing ball animation
export function createBouncingBallFrames(): Frame[] {
  const frames: Frame[] = [];

  const ballPositions = [
    { y: 8, squash: false },
    { y: 12, squash: false },
    { y: 16, squash: false },
    { y: 20, squash: false },
    { y: 23, squash: true },  // Squashed on ground
    { y: 20, squash: false },
    { y: 16, squash: false },
    { y: 12, squash: false },
  ];

  ballPositions.forEach(({ y, squash }) => {
    const pixels = new Map<string, string>();
    const cx = 16;

    if (squash) {
      // Squashed ball
      for (let dx = -5; dx <= 5; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          const dist = Math.sqrt((dx * dx) / 4 + dy * dy);
          if (dist <= 2.5) {
            let color = LIGHT;
            if (dist > 1.5) color = MID_LIGHT;
            if (dx < -2 && dy < 0) color = LIGHT; // highlight
            if (dx > 2 || dy > 1) color = MID_DARK; // shadow
            pixels.set(`${cx + dx},${y + dy}`, color);
          }
        }
      }
      // Outline
      for (let dx = -5; dx <= 5; dx++) {
        pixels.set(`${cx + dx},${y - 3}`, DARK);
        pixels.set(`${cx + dx},${y + 3}`, DARK);
      }
      for (let dy = -2; dy <= 2; dy++) {
        pixels.set(`${cx - 6},${y + dy}`, DARK);
        pixels.set(`${cx + 6},${y + dy}`, DARK);
      }
    } else {
      // Round ball
      for (let dx = -4; dx <= 4; dx++) {
        for (let dy = -4; dy <= 4; dy++) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= 4) {
            let color = MID_LIGHT;
            if (dist <= 2) color = LIGHT;
            if (dx > 1 && dy > 1) color = MID_DARK;
            if (dx < -1 && dy < -1) color = LIGHT;
            pixels.set(`${cx + dx},${y + dy}`, color);
          }
        }
      }
      // Outline
      for (let dx = -4; dx <= 4; dx++) {
        for (let dy = -4; dy <= 4; dy++) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 3.5 && dist <= 4.5) {
            pixels.set(`${cx + dx},${y + dy}`, DARK);
          }
        }
      }
    }

    // Ground line
    for (let x = 4; x < 28; x++) {
      pixels.set(`${x},26`, DARK);
      pixels.set(`${x},27`, MID_DARK);
    }

    // Shadow under ball
    const shadowY = 25;
    const shadowWidth = squash ? 7 : 5;
    for (let dx = -shadowWidth; dx <= shadowWidth; dx++) {
      pixels.set(`${cx + dx},${shadowY}`, MID_DARK);
    }

    frames.push({
      id: nanoid(),
      pixels,
    });
  });

  return frames;
}

// A cute ghost animation
export function createGhostFrames(): Frame[] {
  const ghostBase = [
    '                                ',
    '                                ',
    '                                ',
    '                                ',
    '         ##########             ',
    '       ##..........##           ',
    '      #..............#          ',
    '     #................#         ',
    '     #....##....##....#         ',
    '     #....##....##....#         ',
    '     #................#         ',
    '     #................#         ',
    '     #......####......#         ',
    '     #................#         ',
    '     #................#         ',
    '     #................#         ',
    '     #................#         ',
    '     #................#         ',
    '     #................#         ',
    '     #................#         ',
    '     #................#         ',
  ];

  const tails = [
    // Tail frame 1
    [
      '     #..#..#..#..#..#         ',
      '      ## ## ## ## ##          ',
      '                                ',
    ],
    // Tail frame 2
    [
      '     #...#....#...#..#        ',
      '      ###  ##  ###  #         ',
      '                                ',
    ],
    // Tail frame 3
    [
      '     #..#..#..#..#..#         ',
      '       ##  ##  ##  #          ',
      '                                ',
    ],
    // Tail frame 4
    [
      '     #...#....#...#..#        ',
      '      ##  ####  ## #          ',
      '                                ',
    ],
  ];

  const frames: Frame[] = [];

  tails.forEach((tail, i) => {
    const fullArt = [
      ...ghostBase,
      ...tail,
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
    ];

    // Add floating motion - ghost moves up/down slightly
    const yOffset = i % 2 === 0 ? 0 : 1;
    const adjustedArt = yOffset === 0
      ? fullArt
      : ['                                ', ...fullArt.slice(0, -1)];

    frames.push({
      id: nanoid(),
      pixels: parseAsciiArt(adjustedArt, colorMap),
    });
  });

  return frames;
}
