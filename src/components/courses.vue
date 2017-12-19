<template>
    <div class="app"
         style="height: 1200px;background-color: #ccc;width: 400px;margin: 0 auto;"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">
    </div>
</template>

<script>
  export default {
    name: 'courses',
    data () {
      return {busy: false}
    },
    methods: {
      loadMore: function () {
        var self = this
        self.busy = true
        console.log('loading... ' + new Date())
        setTimeout(function () {
          var app = document.querySelector('.app')
          var height = app.clientHeight
          app.style.height = height + 300 + 'px'
          console.log('end... ' + new Date())
          self.busy = false
        }, 1000)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
