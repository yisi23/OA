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
            <ul>
                <li @click="gotoDetail(course.id)" class="course" v-for="course in courses">
                    <img class="cover" :src="course.cover" alt="">
                    <div class="info">
                        <div class="name">
                            {{course.name}}
                        </div>
                        <div class="time">
                            <label for="">时间：</label>
                            {{course.startDate | datetime('YYYY/MM/DD')}}-{{course.endDate | datetime('YYYY/MM/DD')}}
                        </div>
                        <div class="address">
                            <label for="">地点：</label>
                            {{course.address}}
                        </div>
                        <div class="quota">
                            <label for="">人数：</label>
                            限{{course.quota}}人
                        </div>
                        <div class="period">
                            <img v-if="course.period === 0" src="../assets/img/period_enrolling.png" alt="">
                            <img v-else-if="course.period === 1" src="../assets/img/period_ongoing.png" alt="">
                            <img v-else-if="course.period === 2" src="../assets/img/period_enrolling.png" alt="">
                        </div>
                    </div>
                </li>
            </ul>

        </section>
        <div class="app"
             style="height: 1200px;background-color: #ccc;width: 400px;margin: 0 auto;"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="10">
        </div>
    </main>

</template>

<script>
  import axios from '../utils/customAxios'

  export default {
    name: 'courses',
    data () {
      return {
        busy: false,
        courses: []
      }
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
      },
      getCourses () {
        let me = this
        axios.get('/courses')
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

    main {
        height: 1000rem;
    }

    .banner {
        display: block;
        width: 100%;
    }

    .tabs {
        padding-left: 21px;
        border-bottom: 1px solid #E5E5E5;
        line-height: 40px;
        overflow: auto;
        .tabs-list {
            white-space: nowrap;
            a {
                margin-right: 30px;
                font-size: 14px;
                color: #9B9B9B;
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
                color: #9B9B9B;
                line-height: 1;
                .name {
                    margin-right: 21px;
                    font-size: 18px;
                    color: #2A2A2A;
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
