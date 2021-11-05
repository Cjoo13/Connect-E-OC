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
  background-size: cover;
  align-items: center;
  background: lighten(#d0cece, 15);
}

header {
  display: flex;
  height: 30%;
  border-bottom: 20px solid rgb(209,81,90);
}
header img {
  width: 400px;
  margin: auto;
  height: 200px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
}
</style>
