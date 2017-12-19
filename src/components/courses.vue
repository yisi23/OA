<template>
    <main>
        <img @click="getCourses" class="banner" src="../assets/img/banner.png" alt="">
        <section class="courses">
            <header class="tabs">
                <div class="tabs-list">
                    <a class="on" href="events/week-music">
                        <span>全部</span>
                    </a>
                    <a href="events/week-1001" data-i="0">
                        <span>报名中</span>
                    </a>
                    <a href="events/week-1002" data-i="1">
                        <span>哲学</span>
                    </a>
                    <a href="events/week-1003" data-i="2">
                        <span>艺术</span>
                    </a>
                    <a href="events/week-1004" data-i="3">
                        <span>历史</span>
                    </a>
                    <a href="events/week-music">其他</a>
                </div>
            </header>
            <ul class="app" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <li is="Course" v-for="course in courses" v-bind:course="course" v-bind:key="course.id"></li>
            </ul>
        </section>

    </main>

</template>

<script>
import axios from '../utils/customAxios'
import Course from './course'

export default {
  name: 'courses',
  data () {
    return {
      busy: false,
      courses: []
    }
  },
  components: {
    Course
  },
  methods: {
    loadMore: function () {
      var me = this
      me.busy = true
      console.log('loading... ' + new Date())
      setTimeout(function () {
        axios
          .get('/courses')
          .then(function (response) {
            console.log(response)
            me.courses = me.courses.concat(response.data.data.courses)
          })
          .catch(function (error) {
            console.log(error)
          })
        console.log('end... ' + new Date())
        me.busy = false
      }, 1000)
    },
    getCourses () {
      let me = this
      axios
        .get('/courses')
        .then(function (response) {
          console.log(response)
          me.courses = response.data.data.courses
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created: function () {
    this.getCourses()
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
