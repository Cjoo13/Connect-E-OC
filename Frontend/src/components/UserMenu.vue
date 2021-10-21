<template>
        <nav id="user_menu">
            <router-link to="/modify-account" title="Modifier votre compte"></router-link>
            <router-link to="/delete-account" title="Supprimer votre compte"></router-link>
            <router-link to="/" title="Se déconnecter"><i @click="deconnect" class="fas fa-door-open" title="Déconnexion"></i></router-link>
        </nav>
</template>

<script>
export default {
    name: "UserMenu",
    methods: {
        deconnect() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>