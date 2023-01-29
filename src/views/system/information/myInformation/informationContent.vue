<template>
  <div class="information-content design-form-wrap material-edit">
    <div class="design-form-wrap__ctnwrap">
      <div class="content-text" v-if="infoContent">
        <h3>{{ infoContent.title }}</h3>
        <p class="content-time">{{ infoContent.createTime }}</p>
        <p v-html="infoContent.content"></p>
      </div>
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getImMsgRecordDetail, markRead } from '@/api/system/information'
import store from '@/store'

export default {
  data() {
    return {
      msgRecordId: '',
      infoContent: null
    }
  },
  async created() {
    this.msgRecordId = this.$route.query.id
    this.getDetail()
    await this.markReadMsg()
    await store.dispatch('user/getMsgCount') // 拉取未读信息数
  },
  methods: {
    getDetail() {
      getImMsgRecordDetail(this.msgRecordId).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.infoContent = res.data
        }
      })
    },
    // 标记消息已读
    markReadMsg() {
      return new Promise((resolve) => {
        markRead(this.msgRecordId).then((res) => {
          resolve()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.information-content {
  .content-text {
    padding: 0 100px;
    h3 {
      text-align: center;
    }
    .content-time {
      text-align: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 30px;
      margin-bottom: 20px;
    }
  }
}
</style>
