import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {devPlugin, getReplacer} from './plugins/devPlugin';
import {buildPlugin} from './plugins/buildPlugin';
import optimizer from 'vite-plugin-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [buildPlugin()],
    },
  },
  plugins: [optimizer(getReplacer()), devPlugin(), vue()],
})
