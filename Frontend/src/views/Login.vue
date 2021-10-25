<template>
    <div class="login_signup_setup">   
        <h2>Connectez-vous à votre compte personnel !</h2>
        <form v-on:submit.prevent="login" id="form_login" >
            <div class="form__cartouche">
                <label for="mail">E-mail :</label>
                <input type="mail" id="mail" name="mail" class="form__input"/>
            </div>
            <div class="form__cartouche">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" class="form__input"/>
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
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            let loginDatas = {
                "email": this.loginInput.email,
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
                    } else {
                        alert("Mot de passe incorrect ! ");
                    }
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="scss">
</style>