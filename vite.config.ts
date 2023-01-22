import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { devPlugin, getReplacer } from './plugins/devPlugin';
import optimizer from 'vite-plugin-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [optimizer(getReplacer()), devPlugin(), vue()],
})
