<template>
  <router-link :to="{name: 'course', params: {id: course.id}}">
    <li class="course">
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
  </router-link>


</template>

<script>
export default {
  name: 'course',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      busy: false
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
a {
  text-decoration: none;
}
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
</style>
