// Typography tokens - Pixel/Retro style

export const typography = {
  fontFamily: {
    // System monospace for that retro terminal feel
    mono: "'Courier New', Consolas, 'Liberation Mono', monospace",
    // Clean sans-serif as fallback
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  fontSize: {
    xs: '0.625rem',   // 10px
    sm: '0.75rem',    // 12px
    md: '0.875rem',   // 14px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
  },
} as const;
