import {createApp} from 'vue';
import {router} from './router';
import { createPinia } from 'pinia';
import { db } from '../common/db';
import App from './App.vue';
import './style.css';
import './assets/icon/iconfont.css';

createApp(App).use(createPinia()).use(router).mount('#app');

db('Chat')
  .first()
  .then((obj) => {
    console.log(obj);
  });
