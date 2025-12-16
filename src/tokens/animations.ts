// Animation tokens

export const animations = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    linear: 'linear',
    default: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
    // Snappy for UI interactions
    snap: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
