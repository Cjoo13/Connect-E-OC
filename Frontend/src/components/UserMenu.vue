<template>
        <nav id="user_menu">
            <ul>
              <li><router-link :to="{ name: 'ModifyAccount', params: { id: userAccount.userId } }" title="Modifier votre compte">Modifier votre compte</router-link></li>
              <li><router-link to="/" title="Se déconnecter" @click="deconnect">Se déconnecter</router-link></li>
            </ul>
        </nav>
</template>

<script>
export default {
    name: "UserMenu",
    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId")
            }
        }
    },
    methods: {
        deconnect() {
            localStorage.removeItem("token");
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss">
ul {
    text-decoration: none;
	list-style-type: none;
}
li {
    margin-bottom: 10px;
}

</style>