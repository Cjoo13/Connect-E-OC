<template>
    <div class="login_signup_setup">   
        <h2>Modifiez vos identifiants de connexion</h2>
        <form v-on:submit.prevent="modifyAccount" class="form" >
            <div class="form__cartouche">
                <label for="email">E-mail :</label>
                <input type="email" id="mail" name="mail" class="form__input" required v-model="inputUpdate.mail">
            </div>
            <div class="form__cartouche">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" class="form__input" required v-model="inputUpdate.password">
            </div>   
            <button>Valider mes changements</button>
            <button @click="deleteInTrash" class="sup_button">Désactiver mon compte</button>                                     
        </form> 
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ModifyAccount',
    data() {
        return {
            userUpdate: {
                userId: localStorage.getItem("userId"),
                mail: "",
                password: ""
            },
            inputUpdate: {
                mail: "",
                password: ""
            }
        }
    },
    methods: {
         modifyAccount() {
            let updateDatas = {
                "mail" : this.inputUpdate.mail,
                "password": this.inputUpdate.password
            }
            let url = `http://localhost:3000/api/auth/${ this.userUpdate.userId }`;
            axios.patch(url, updateDatas)
                .then(res => {
                    console.log(res.data);
                    this.userUpdate.mail = res.data.mail;
                    this.userUpdate.password = res.data.password;
                    alert("Identifiants modifiés !");
                    this.$router.push("/");
                })
                .catch(error => console.log(error))
        },
        
        deleteInTrash() {
            let url = `http://localhost:3000/api/auth/trash/${ this.userUpdate.userId }`;
            axios.delete(url)
                .then((response) => {
                    console.log(response);
                    localStorage.clear();
                    alert("Votre compte a bien été désactivé !");
                })
                .then(this.$router.push("/signup"))
                .catch(error => console.log(error))
        },
    },
}
</script>

<style lang="scss">

.sup_button {
    background: rgb(209,81,90);
}
</style>