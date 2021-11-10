import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


const app = createApp(App);


axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
});



app.use(router);
app.use(store);
app.mount('#app');
