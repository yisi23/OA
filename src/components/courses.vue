<template>
    <div class="home">
        <header class="navBar">
            <a href="/">
                <h1>OA学院</h1>
            </a>
            <nav>
                <img class="user" src="../assets/img/user.png" alt="">
            </nav>
        </header>
        <main>
            <img class="banner" src="../assets/img/banner.png" alt="">
            <section class="courses">
                <header class="tabs">
                    <div class="tabs-list">
                        <a @click="filter(0)" :class="{on: type === 0}">
                            <span>全部</span>
                        </a>
                        <a @click="filter(1)" :class="{on: type === 1}">
                            <span>报名中</span>
                        </a>
                        <a @click="filter(2)" :class="{on: type === 2}">
                            <span>哲学</span>
                        </a>
                        <a @click="filter(3)" :class="{on: type === 3}">
                            <span>艺术</span>
                        </a>
                        <a @click="filter(4)" :class="{on: type === 4}">
                            <span>历史</span>
                        </a>
                        <a @click="filter(5)" :class="{on: type === 5}">
                            其他
                        </a>
                    </div>
                </header>
                
                <ul class="app" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li is="Course" v-for="course in courses" v-bind:course="course" v-bind:key="course.id"></li>
                </ul>
                <mt-spinner v-if="loading" type="snake"></mt-spinner>
            </section>

        </main>
    </div>
</template>

<script>
import axios from '../utils/customAxios'
import Course from './course'
import URL from '../utils/URL'

export default {
  name: 'courses',
  data () {
    return {
      busy: false,
      courses: [],
      baseURL: '/courses',
      filterURL: '/courses',
      URL: '/courses',
      page: 0,
      type: 0,
      loading: false
    }
  },
  components: {
    Course
  },
  methods: {
    loadMore: function () {
      var me = this
      me.loading = true
      console.log('loading... ' + new Date())
      setTimeout(function () {
        me.URL = URL.addPara(me.filterURL, { page: ++me.page })
        axios
          .get(me.URL)
          .then(function (response) {
            console.log(response)
            me.courses = me.courses.concat(response.data.data.courses)
            console.log('end... ' + new Date())
            me.loading = false
          })
          .catch(function (error) {
            console.log(error)
          })
      }, 1000)
    },
    getCourses () {
      let me = this
      me.URL = me.filterURL
      me.loading = true
      axios
        .get(me.URL)
        .then(function (response) {
          console.log(response)
          me.loading = false
          me.courses = me.courses.concat(response.data.data.courses)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    filter (type) {
      let me = this
      me.type = type
      if (type === 0) {
        me.filterURL = me.baseURL
      } else if (type === 1) {
        me.filterURL = me.baseURL + '?period=1'
      } else {
        me.filterURL = me.baseURL + '?type=' + --type
      }

      me.page = 0
      me.courses = []
      me.getCourses()
    }
  },
  created: function () {
    let me = this

    me.getCourses()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.banner {
  display: block;
  width: 100%;
}

.tabs {
  padding-left: 21px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 40px;
  overflow: auto;
  .tabs-list {
    white-space: nowrap;
    a {
      margin-right: 30px;
      font-size: 14px;
      color: #9b9b9b;
      text-decoration: none;
      &.on {
        color: #000;
      }
    }
  }
}
.courses /deep/ .mint-spinner-snake {
  margin: 10px auto;
}
.courses ul {
  margin: 0;
  padding-left: 0;
  .course {
    position: relative;
    display: flex;
    justify-content: space-between;
    .cover {
      width: 87px;
      height: 130px;
      margin: 15px 6px 5px 15px;
    }
    .info {
      width: 248px;
      margin: 15px 0 13px 6px;
      font-size: 13px;
      color: #9b9b9b;
      line-height: 1;
      .name {
        margin-right: 21px;
        font-size: 18px;
        color: #2a2a2a;
        line-height: 25px;
      }
      .time {
        margin-top: 10px;
      }
      .address {
        margin-top: 12px;
      }
      .quota {
        margin-top: 12px;
      }
      .period {
        position: absolute;
        right: 0;
        bottom: 13px;
        margin-top: 12px;
        img {
          width: 44px;
        }
      }
    }
  }
}
</style>
