import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import setupInterceptors from './services/setupInterceptors';

setupInterceptors(store);

createApp(App).use(setupInterceptors).use(router).mount('#app')
