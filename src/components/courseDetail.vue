<template>
  <div v-if="course.id" class="course">
    <div class="coverContainer">
      <div :style="{'background-image': 'url(' + course.cover + ')'}" class="blurCover"></div>
      <img class="cover" :src="course.cover" alt="">
    </div>
   
    <div class="info">
      <div class="title">
        <span class="name">
          {{course.name}}
        </span>
        <span class="period">
          <img v-if="course.period === 0" src="../assets/course/img/period_enrolling.png" alt="">
          <img v-else-if="course.period === 1" src="../assets/img/period_ongoing.png" alt="">
          <img v-else-if="course.period === 2" src="../assets/img/period_enrolling.png" alt="">
        </span>        
      </div>
      <div class="deadline">报名截止至：{{course.startDate | datetime('YYYY/MM/DD')}} </div>
      <div class="cell enrollData">
        <label for="">报名人数</label>
        已报{{course.entrant}}人/限制{{course.quota}}
      </div>
      <div class="cell time">
        <label for="">活动时间</label>
        {{course.startDate | datetime('YYYY/MM/DD')}}-{{course.endDate | datetime('YYYY/MM/DD')}}
      </div>
      <div class="cell address">
        <label for="">活动地点</label>
        {{course.address}}
      </div>
      <div class="cell fee">
        <label for="">费用</label>
        <template v-if="course.fee === 0">免费</template>
        <template v-else>收费</template>
      </div>
      <div class="detail">
        <label for="">活动详情</label>
        {{course.detail}}
      </div>
    </div>
    <router-link :to="{path: './entryForm'}" append>
      <div class="enrollBtn">立即报名</div>
    </router-link>
    
  </div>

</template>

<script>
import axios from '../utils/customAxios'
import { Indicator } from 'mint-ui'

export default {
  name: 'course',
  data () {
    return {
      course: {},
      URL: ''
    }
  },
  methods: {
    fetchData () {
      let me = this
      Indicator.open()
      axios
        .get(me.URL)
        .then(function (response) {
          Indicator.close()
          console.log(response)
          me.course = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    enroll () {
      let me = this
      axios.post(me.URL)
      .then((response) => {
        console.log(response.data.retdesc)
      })
    }
  },
  created: function () {
    let me = this
    me.URL = '/course/' + this.$route.params.id
    me.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.course {
  position: relative;
  .coverContainer {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 456/2px;
    padding: 32/2px 0;
    overflow: hidden;
    .blurCover {
      position: absolute;
      z-index: 0;
      left: -10px;
      top: -10px;
      right: -10px;
      bottom: -10px;
      background: center center no-repeat;
      background-size: 100%;
      filter: blur(3px);
    }
    .cover {
      position: relative;
      z-index: 2;
      display: block;
      width: 294/2px;
      height: 392/2px;
      margin: 0 auto;
      box-shadow: 0 0 20px rgba(0,0,0,0.3);
    }
  }
  
  .info {
    margin: 32/2px 40/2px 13px 38/2px;
    font-size: 26/2px;
    color: #9b9b9b;
    line-height: 105/2px;
    .title {
      line-height: 1;
      .name {
        margin-right: 21px;
        font-size: 38/2px;
        color: #2a2a2a;
        line-height: 25px;
      }
      .period {
        img {
          width: 122/2px;
        }
      }         
    }
    .deadline {
      margin: 22/2px auto 35/2px;
      line-height: 1;
    }
    .cell {
      display: flex;
      justify-content: space-between;
      padding-right: 20/2px;
      border-top: 1px solid #E5E5E5;
      label {
        font-size: 32/2px;
        color: #494949;
      }
    }
    .time {
     
    }
    .address {
      
    }
    .quota {
      
    }
    .detail {
      border-top: 1px solid #E5E5E5;
    }
  }
  .enrollBtn {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 22/2px 0 26/2px;
    font-size: 34/2px;
    color: #fff;
    text-align: center;
    line-height: 48/2px;
    background: #FF691E;
  }
}
</style>
