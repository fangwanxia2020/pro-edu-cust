<template>
  <div>
    <h2 class="contain">邀请您成为协同联系人</h2>
    <div class="body">
      <div class="det">邀请公司名称:{{ info.iUnit || '-' }}</div>
      <div class="det">邀请人:{{ info.nName || '-' }}</div>
      <div class="det">联系手机:{{ info.iPhone || '-' }}</div>
    </div>
    <div class="ddt">受邀后可使用产教通执行跨企业协同任务</div>
    <div class="btn">
      <el-button type="primary" @click="toLogin()">接受邀请</el-button>
    </div>
  </div>
</template>

<script>
import { getUserByPhone, editProjectParticipantStatus } from '@/api/cooperation/contacts.js'

export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    // let { pptId, iPhone, iUnit, nName }
    // this.info = this.$route.query.info.replace('-', '+').replace('_', '/')
    // decodeURIComponent(escape(window.atob(this.info)))
    this.info = JSON.parse(this.$route.query.info)
    console.log(JSON.parse(this.$route.query.info), 'this.$route.query.info')
  },
  methods: {
    toLogin() {
      editProjectParticipantStatus({ projectParticipantId: this.info.pptId }).then((res) => {
        console.log(res, 'res')
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push({
            path: '/login'
          })
        }
      })
      // if (res.data == false) {
      //   console.log('youma ')
      //   this.$message.error('用户不存在')
      //   this.$router.push({
      //     path: '/register',
      //     query: {
      //       info: this.$route.query.info,
      //       projectParticipantId: this.info.pptId
      //       // backUrl: 'inviteContacts'
      //     }
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.contain {
  margin-left: 30%;
  margin-top: 130px;
}
.body {
  width: 40%;
  height: 50%;
  background-color: rgb(233, 231, 231);
  margin-left: 30%;
}
.det {
  margin: 15px;
  padding: 25px 15px;
}
.ddt {
  margin-left: 30%;
  color: rgb(163, 159, 159);
}
.btn {
  margin-top: 50px;
  margin-left: 48%;
}
</style>
