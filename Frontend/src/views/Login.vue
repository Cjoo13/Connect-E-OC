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
            let options = {
                method: "POST",
                body: JSON.stringify(loginDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("token", res.token)
                        console.log(localStorage)
                        this.$router.push("/account");
                    } 
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="scss">
.login_signup_setup {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        font-size: 1.5rem;
        margin-bottom: 30px;
    }
}
.form {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    &__cartouche {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 15px;
        width: 38%
    }
    &__input {
        margin-left: 10px;
    }
}

button {
    display: flex;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100px;
    justify-content: center;
}
</style>