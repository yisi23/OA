<template>
    <div id="app">
        <router-view/>
    </div>
   
</template>

<script>
  import 'normalize.css'
  export default {
    name: 'app'
  }
</script>

<style lang="less">
    body {
        background: #F4F4F4;
    }
    #app {
        font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .navBar {
        display: flex;
        justify-content: space-between;
        line-height: 46px;
        a {
            text-decoration: none;
        }
        h1 {
            margin: 0 0 0 10px;
            font-size: 21px;
            color: #2A2A2A;
        }
        nav .user {
            margin-right: 20px;
            width: 20px;
            vertical-align: middle;
        }
    }
</style>
