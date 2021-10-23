<template>
     
    <div class="login_signup_setup">          
        <h2>Pour rejoindre la communauté, merci de remplir ce formulaire</h2>
        <form v-on:submit.prevent="signup" id="form_signup" >
          <div class="form__cartouche">
            <label for="name">Nom :</label>
            <input type="text" id="name" name="name" class="form__input"/>
          </div>
          <div class="form__cartouche">
            <label for="firstname">Prénom :</label>
            <input type="text" id="firstname" name="firstname" class="form__input"/>
          </div> 
          <div class="form__cartouche">
            <label for="mail">E-mail :</label>
            <input type="mail" id="mail" name="mail" class="form__input"/>
          </div>
          <div class="form__cartouche">
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" class="form__input"/>
          </div>  
          <button>S'inscrire</button>                                       
        </form> 
          <nav class="nav_login_signup"><p>Vous avez déjà un compte ? <router-link to="/">Connectez-vous</router-link></p></nav> 
      </div> 
</template>


<script>
export default {
    name: 'Signup',
    data() {
        return {
            inputSignup: {
                name: "",
                firstName: "",
                mail: "",
                password: ""
            }
        }
    },
    methods: {
        signup() {
            let inputDatas = {
                "name": this.inputSignup.name,
                "firstName": this.inputSignup.firstName,
                "mail": this.inputSignup.mail,
                "password": this.inputSignup.password
            }
            console.log(inputDatas)
            let url = "http://localhost:3000/api/auth/signup"
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options)
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("token", res.token);
                    console.log(localStorage)
                    this.$router.push("/");
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="scss">

</style>