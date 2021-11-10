import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


const app = createApp(App);


axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
});

axios.interceptors.response.use((res) => {
      return res;
    },
    async (err) => {
        const originalConfig = err.config;
        let token = localStorage.getItem('token');    
        let tt = new Date();
    
        if(token.exp < tt.getTime()){
        // Si token expiré mais moins de 5 minute
            if(tt.getTime() < token.exp+(5*60)  ){
                try {
                    const rs = await axios.post("/auth/refresh", {
                    refreshToken: localStorage.getItem("refreshToken"),
                    });
        
                    const { accessToken } = rs.data;
            
                    store.dispatch('auth/refresh', accessToken);
                    localStorage.setItem("token", accessToken);
            
                    return axios(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshtoken');
            }
        }
        
        return Promise.reject(err);
    }
);



app.use(router);
app.use(store);
app.mount('#app');
