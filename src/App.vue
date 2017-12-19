<template>
  <div id="app">
    <header class="navBar">
      <a href="/"><h1>OA学院</h1></a>
      <nav>
        <img class="user" src="./assets/img/user.png" alt="">
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navBar {
  display: flex;
  justify-content: space-between;
  line-height: 46px;
}
.navBar h1 {
  margin-left: 10px;
  font-size: 21px;
  color: #2A2A2A;
}
.navBar nav .user {
  margin-right: 20px;
  width: 20px;
}
</style>
