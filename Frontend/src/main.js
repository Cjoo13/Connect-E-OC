import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.interceptors.push(function(request,next){

    let token = localStorage.getItem('token')    
    let tt = new Date()
    // Si token expiré
    if(token.exp < tt.getTime()){
        // Si token expiré mais moins de 5 minute
        if(tt.getTime() < token.exp+(5*60)  ){
            let refreshToken = localStorage.getItem('refreshtoken')
            fetch('http://localhost:3000/api/auth/refresh', {
                method: "POST",
                body: JSON.stringify(refreshToken),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    // stokage du nouveau token
                    token = data.token
                    localStorage.setItem('token', token)
                })
        }else{
            // Ici token expiré ça mere la race de ça grand-mère
            localStorage.removeItem('token')
            localStorage.removeItem('refreshtoken')
        }
    }

  // modifying request headers

  request.headers.set('Authorization', 'Bearer '+token);

  next();
});

createApp(App).use(VueResource).use(store).use(router).mount('#app')
