<template>
    <div class="entryForm">
        <div v-show="enrolled" class="tip">
          <img src="../assets/course/entryForm/img/enroll_success.png" alt="">
          <div>报名申请成功</div>
          <router-link to="/courses">
            <mt-button type="default" class="enrollBtn">我知道了</mt-button>
          </router-link>
          
        </div>
        <div v-show="!enrolled" class="body">
          <div class="info">
            <mt-field label="姓名" placeholder="" v-model="name"></mt-field>
            <mt-cell @click.native="sexSheetVisible=true" title="性别" v-model="sex" is-link></mt-cell>
            <mt-cell @click.native="openPicker" title="出生年月" v-model="birthdate" is-link></mt-cell>
            <mt-cell title="学历" v-model="education" is-link></mt-cell>
            <mt-cell title="职业" v-model="profession" is-link></mt-cell>

            <div class="reason">
                <textarea class="oa-textarea" placeholder="记录一下参加理由吧" rows="3"></textarea>
            </div>
        </div>
        <mt-button @click="enroll()" type="default" class="enrollBtn">马上报名</mt-button>
        <div class="hint">为了保证课程质量和体验，OA活动会控制合适的参与人数及质量。</div>

        <mt-actionsheet :actions="sexSheetActions" v-model="sexSheetVisible">
        </mt-actionsheet>
        <div is="mt-datetime-picker" ref="picker" v-model="datePickerValue" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleDateConfirm">
        </div>
        </div>
        
    </div>
</template>

<script>
import axios from '../utils/customAxios'
import moment from 'moment/moment'

export default {
  name: 'entryForm',
  data () {
    return {
      name: '',
      sex: '',
      birthdate: '',
      education: '',
      profession: '',
      sexSheetVisible: false,
      sexSheetActions: [],
      datePickerValue: new Date(),
      URL: '',
      tipShow: false,
      enrolled: false
    }
  },
  methods: {
    enroll () {
      let me = this
      axios.post(me.URL)
      .then((response) => {
        console.log(response.data.retdesc)
        this.enrolled = true
      })
    },
    openPicker () {
      this.$refs.picker.open()
    },
    setSex (value) {
      this.sex = value.name
    },
    handleDateConfirm (value) {
      this.birthdate = moment.unix(value / 1000).format('YYYY/MM/DD')
    }
  },
  created: function () {
    let me = this
    me.URL = '/course/' + this.$route.params.id
  },
  mounted () {
    this.sexSheetActions = [{
      name: '男',
      method: this.setSex
    }, {
      name: '女',
      method: this.setSex
    }]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
a {
  text-decoration: none;
}
.entryForm {
  position: relative;
  font-size: 26/2px;
  color: #ABABAB;
  background: #F4F4F4;
  .tip {
    width: 100%;
    padding: 180/2px 0 200/2px 0;
    font-size: 38/2px;
    color: #494949;
    text-align: center;
    img {
      margin-bottom: 43/2px;
      width: 299/2px;
    }
  }
  .info {
    font-size: 32/2px;
    color: #494949;
    line-height: 105/2px;

    & /deep/ .mint-field {
      .mint-field-core {
        color: #ccc;
        text-align: right;
      }
      
    }
    & /deep/ .mint-cell {
      border-bottom: 1px solid #E5E5E5;
      .mint-cell-wrapper {
        padding: 0 38/2px;
      }
      .mint-cell-value {
        input, span {
          color: #ccc;
        }
        &.is-link {
          margin-right: 19/2px;
        }
      }
    }
    .oa-textarea {
        display: block;
        border: 0;
        resize: none;
        width: 100%;
        color: inherit;
        font-size: 1em;
        line-height: inherit;
        outline: 0;
    }
    .reason {
      margin-top: 20/2px;
      font-size: 26/2px;
      color: #9B9B9B;
      line-height: 37/2px;
      .oa-textarea {
        box-sizing: border-box;
        min-height: 280/2px;
        padding: 27/2px 41/2px;
      }
    }
  }
  .enrollBtn {
    display: block;
    width: 670/750*100%;
    height: 86/2px;
    margin: 50/2px auto 30/2px;
    font-size: 34/2px;
    color: #fff;
    text-align: center;
    line-height: 48/2px;
    background: #FF691E;
  }
  .hint {
    width: 662/750*100%;
    margin: 0 auto;
  }
}
</style>
