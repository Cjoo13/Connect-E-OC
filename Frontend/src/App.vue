<template>
  <div id="app">

    <header>
      <img src="./assets/logo-header.png" id="logo_groupomania" alt="Logo Groupomania" />
    </header>
    <router-view/>
  </div>
</template>

<script>
</script>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  height: 100%; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
}
header {
  display: flex;
  height: 30%;
}
header img {
  width: 25%;
  margin: auto;
  margin-top: -60px;
}
@media screen and (max-width: 768px) {
  header img {
    width: 35%;
  }
}
@media screen and (max-width: 450px) {
  header img {
    width: 50%;
  }
}
</style>
