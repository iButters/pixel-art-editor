// Shadow tokens - Pixel-style hard shadows

export const shadows = {
  none: 'none',
  // Hard pixel shadows (no blur)
  pixel: {
    sm: '2px 2px 0',
    md: '4px 4px 0',
    lg: '6px 6px 0',
  },
  // Soft shadows for modern elements
  soft: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.15)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.2)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.25)',
  },
  // Inset shadows for pressed states
  inset: {
    sm: 'inset 2px 2px 0',
    md: 'inset 4px 4px 0',
  },
} as const;
