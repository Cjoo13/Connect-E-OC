<template>
     <section>
         <UserMenu></UserMenu>

            <div class="account_setup">
                <h2>Bienvenue sur votre espace personnel, {{ userAccount.firstName }} {{ userAccount.name }}</h2> 
            </div>  
     </section>
</template>

<script>
import UserMenu from '../components/UserMenu'
export default {
    name: 'Account',
    components: {
        UserMenu
    },
    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                firstName: "",
                name: ""
            },
        }
    },
    methods: {
        getOneAccount() {
            let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.userAccount.firstName = data.firstName;
                    this.userAccount.name = data.name;
                })
                .catch(error => console.log(error))
        },
    },
}

</script>