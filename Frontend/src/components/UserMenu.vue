<template>
        <nav id="user_menu">
            <ul>
              <li><router-link to="/modify-account" title="Modifier votre compte">Modifier votre compte</router-link></li>
              <li><router-link to="/delete-account" title="Supprimer votre compte">Supprimer votre compte</router-link></li>
              <li><router-link to="/" title="Se déconnecter" @click="deconnect">Se déconnecter</router-link></li>
            </ul>
        </nav>
</template>

<script>
export default {
    name: "UserMenu",
    methods: {
        deconnect() {
            this.$router.push("/");
        }
    }
}
</script>