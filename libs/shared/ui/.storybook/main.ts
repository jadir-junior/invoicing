import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  previewHead: (head) => `
    ${head}
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        font-family: Poppins;
      }
    </style>
  `,
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
