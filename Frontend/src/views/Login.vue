<template>
    <div class="login_signup_setup">   
        <h2>Connectez-vous à votre compte personnel !</h2>
        <form v-on:submit.prevent="login" class="form" >
            <div class="form__cartouche">
                <label for="email">E-mail :</label>
                <input type="email" id="mail" name="mail" class="form__input" required v-model="loginInput.mail"/>
            </div>
            <div class="form__cartouche">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" class="form__input" required v-model="loginInput.password"/>
            </div>   
            <button type="submit">Se connecter</button>                                     
        </form>        
        <nav class="nav_login_signup"><p>Vous n'avez pas de compte ? <router-link to="/signup">Inscrivez vous !</router-link></p></nav>
    </div>  
</template>


<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            loginInput: {
                mail: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            let loginDatas = {
                "mail": this.loginInput.mail,
                "password": this.loginInput.password
            }
            console.log(loginDatas)
            let url = "http://localhost:3000/api/auth/login"
            axios.post(url, loginDatas)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.token) {
                        localStorage.setItem("userId", res.data.id);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("refreshToken", res.data.refreshToken);
                        console.log(res)
                        this.$router.push(`/account/${ res.data.id }`);
                        
                    } 
                })
                .catch(error => {
                    alert("Mail ou mot de passe incorrects, veuillez réessayer");
                    console.log(error)
                })
        }
    }
}
</script>

<style lang="scss">
.login_signup_setup {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    h2 {
        font-size: 1.5rem;
        margin-bottom: 30px;
        @media screen and (max-width: 768px) {
            margin-left: 20px;
    }
    }
    @media screen and (max-width: 768px) {
        margin-top: 20px;
    }
}
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__cartouche {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 15px;
        width: 38%;
        label {
            display: flex;
            justify-content: flex-end;
            width: 600px
        }
        @media screen and (max-width: 768px) {
    
        }
    }
    &__input {
        margin-left: 10px;
    }
}

button {
    margin: auto;
    margin-bottom: 30px;
    margin-top: 30px;
    box-shadow: 0px 5px 10px lightgrey;
    padding: 15px;
    border-radius: 30px;
    background: rgb(18,36,66);
    cursor: pointer;
    border-width: 0;
    color: rgb(255,255,255);
    &:hover {
        transform: scale(1.02);
        opacity: 0.9;
        box-shadow: 3px 3px 12px rgba(0,0,0,.5);
    }
}
</style>