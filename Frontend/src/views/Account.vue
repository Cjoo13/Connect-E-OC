<template>
     <section>
         

            <div class="account_setup">
                <h2>Bienvenue sur votre espace personnel, {{ userAccount.firstName }} {{ userAccount.name }}</h2> 
                <UserMenu></UserMenu>
            </div>  
     </section>
</template>

<script>
import UserMenu from '../components/UserMenu'
import jwt_decode from 'jwt-decode'
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
    mounted() {
        
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        this.userAccount.firstName = decoded.firstName;
        this.userAccount.name = decoded.name;
    },
}
</script>

<style lang="scss">

.account_setup {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
    @media screen and (max-width: 768px) {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
}
</style>