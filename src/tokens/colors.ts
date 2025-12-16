// GameBoy-inspired color palettes

export const colors = {
  // Dark Mode - Original GameBoy (DMG)
  dark: {
    // Core GameBoy greens
    gb: {
      darkest: '#0f380f',
      dark: '#306230',
      light: '#8bac0f',
      lightest: '#9bbc0f',
    },
    // UI colors derived from GameBoy palette
    background: '#0f380f',
    surface: '#1a4a1a',
    surfaceHover: '#245424',
    border: '#306230',
    borderLight: '#4a7a4a',
    text: '#9bbc0f',
    textMuted: '#8bac0f',
    textDim: '#6a8a0f',
    primary: '#9bbc0f',
    primaryHover: '#b5d62f',
    accent: '#8bac0f',
    // Semantic
    error: '#ff6b6b',
    success: '#9bbc0f',
    warning: '#ffd93d',
  },

  // Light Mode - GameBoy Pocket style
  light: {
    // Grayscale inspired by GB Pocket
    gb: {
      darkest: '#1a1a1a',
      dark: '#555555',
      light: '#aaaaaa',
      lightest: '#f0f0f0',
    },
    // UI colors
    background: '#e8e8e8',
    surface: '#f5f5f5',
    surfaceHover: '#ffffff',
    border: '#cccccc',
    borderLight: '#dddddd',
    text: '#1a1a1a',
    textMuted: '#555555',
    textDim: '#888888',
    primary: '#1a1a1a',
    primaryHover: '#333333',
    accent: '#555555',
    // Semantic
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
  },
} as const;

// Retro palettes for pixel art
export const retroPalettes = {
  gameboy: {
    name: 'GameBoy',
    colors: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'],
  },
  gameboyPocket: {
    name: 'GB Pocket',
    colors: ['#000000', '#555555', '#aaaaaa', '#ffffff'],
  },
  nes: {
    name: 'NES',
    colors: [
      '#000000', '#fcfcfc', '#f8f8f8', '#bcbcbc', '#7c7c7c', '#a4a4a4',
      '#f83800', '#fca044', '#e45c10', '#fce0a8', '#881400', '#503000',
      '#00a800', '#b8f818', '#005800', '#58d854', '#007800', '#a0e020',
      '#0058f8', '#3cbcfc', '#0000bc', '#6888fc', '#0078f8', '#a4e4fc',
      '#6644fc', '#b8b8f8', '#4428bc', '#9878f8', '#d800cc', '#f878f8',
      '#940084', '#fc78f8', '#e40058', '#f85898', '#a80020', '#fc98a4',
    ],
  },
  pico8: {
    name: 'PICO-8',
    colors: [
      '#000000', '#1d2b53', '#7e2553', '#008751',
      '#ab5236', '#5f574f', '#c2c3c7', '#fff1e8',
      '#ff004d', '#ffa300', '#ffec27', '#00e436',
      '#29adff', '#83769c', '#ff77a8', '#ffccaa',
    ],
  },
  commodore64: {
    name: 'C64',
    colors: [
      '#000000', '#ffffff', '#880000', '#aaffee',
      '#cc44cc', '#00cc55', '#0000aa', '#eeee77',
      '#dd8855', '#664400', '#ff7777', '#333333',
      '#777777', '#aaff66', '#0088ff', '#bbbbbb',
    ],
  },
  grayscale: {
    name: 'Grayscale',
    colors: [
      '#000000', '#1a1a1a', '#333333', '#4d4d4d',
      '#666666', '#808080', '#999999', '#b3b3b3',
      '#cccccc', '#e6e6e6', '#ffffff',
    ],
  },
} as const;

export type ThemeMode = 'dark' | 'light';
export type PaletteName = keyof typeof retroPalettes;
