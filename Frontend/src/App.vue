<template>
  <div id="app">

    <header>
      <img src="./assets/logo-header.png" id="logo_header" alt="Logo Groupomania" />
    </header>
    <router-view/>
  </div>
</template>

<script>
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body, html {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%; 
}
#app {
  height: 100%;
  background-color: #d0cece;
  background-image: url("./assets/business-background.png");
  background-size: cover;
}

header {
  display: flex;
  height: 30%;
}
header img {
  width: 25%;
  margin: auto;
  margin-top: -80px;
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
