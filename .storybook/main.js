/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/components/**/*.stories.@(js|jsx)'],
   staticDirs: ['../public'],
   addons: [
     '@storybook/addon-links',
     '@storybook/addon-essentials',
     '@storybook/addon-interactions',
     '@storybook/addon-ally',
   ],
   framework: {
     name: '@storybook/react-vite',
     options: {},
   },
   docs: {
     autodocs: 'tag',
   },
 };
 export default config;