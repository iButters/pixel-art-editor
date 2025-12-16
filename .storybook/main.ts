import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    // Set base path for GitHub Pages
    if (process.env.GITHUB_PAGES) {
      config.base = '/pixel-art-editor/storybook/';
    }
    return config;
  },
};
export default config;