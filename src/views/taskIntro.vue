<template>
  <div class="task">
    <div v-if="!applyAlready">
      <div class="cooperation-info">
        <h2 class="title">协同任务</h2>
        <p>负责的事项名称：{{ info.missionName }}</p>
        <p>负责实施单位：{{ info.requireCompletionUnit }}</p>
        <p>
          要求落地完成时间：{{
            info.requireCompletionTime ? info.requireCompletionTime.split(' ')[0] : '-'
          }}
        </p>
        <p>负责人：{{ info.requireCompletionPeople }}</p>
      </div>
      <div class="next">
        <!-- <div v-if="isEdit">{{ num }}人正在协同编辑</div>
          <div v-if="!isEdit">此任务已设置权限, 请登录后使用</div> -->
        <div v-if="token">
          <el-button v-if="permissionType == 3" class="into-btn" @click="toDetail(2)" type="primary"
            >进入详情并加入编辑</el-button
          >
          <el-button v-if="permissionType == 2" class="into-btn" @click="toDetail(1)" type="primary"
            >进入详情</el-button
          >
        </div>
        <div v-if="canApply && permissionType == 1">
          <el-button class="into-btn" @click="applyRead()" type="primary">申请查看权限</el-button>
          <el-button class="into-btn" @click="applyEdit()">申请编辑权限</el-button>
        </div>
        <div v-if="!token">
          <el-button class="into-btn" @click="toLogin()" type="primary">立即登录</el-button>
        </div>
      </div>
    </div>
    <div class="result" v-if="applying && stauts == 0">
      <i class="el-icon-success success-icon"></i>
      <h2>已申请{{ visitType == 1 ? '查看' : '编辑' }}权限</h2>
      <div>等待任务创建人处理</div>

      <el-button class="into-btn" @click="$router.push('/')" type="text">回到首页</el-button>
    </div>
    <div class="result" v-if="applyAlready && stauts == 2">
      <i class="el-icon-warning warning-icon"></i>
      <h2>权限申请未通过</h2>

      <el-button class="into-btn" @click="$router.push('/')" type="text">回到首页</el-button>
    </div>
    <el-dialog title="申请权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="tips">
          {{ userData.loginName }} 正向任务创建者 {{ userData.createName }} 申请{{ typeName }}权限
        </div>
        <el-form-item label="">
          <el-input v-model="form.content" autocomplete="off" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  projectMissionFreeInfo,
  selectUserWhetherApplyTask,
  applyingTaskRights
} from '@/api/cooperation/workWithMe'
import { getToken } from 'ty-pc/lib/utils/auth'

export default {
  data() {
    return {
      applyAlready: false, // 是否已经提交申请
      applying: false, // 申请中
      canApply: false, // 可申请
      typeName: '编辑', // 编辑/查看
      stauts: 0,
      form: { content: '' }, // 留言内容
      userData: {
        loginName: '',
        createName: ''
      },
      num: 1,
      isEdit: true,
      token: null,
      dialogFormVisible: false,
      info: {
        missionName: '',
        requireCompletionUnit: '',
        requireCompletionTime: '',
        requireCompletionPeople: ''
      },
      projectMissionId: null,
      permissionType: null, // 1-仅指定人员，2，所有人可查看，3-所有人可编辑
      visitType: 1,
      selfVisitType: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { projectMissionId, permissionType, selfVisitType } = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      )
      this.projectMissionId = projectMissionId
      this.permissionType = permissionType
      this.selfVisitType = selfVisitType
      this.token = getToken()
      this.getprojectMissionFreeInfo()
      // 仅指定人员的时候才要申请
      if (this.token && this.permissionType == 1) {
        this.getApplyDeatil()
      }
    },
    async getApplyDeatil() {
      const res = await selectUserWhetherApplyTask(this.projectMissionId)
      this.userData = res.data
      // 申请者和打开着不是本人
      if (res.data) {
        // 两个都为null就是本人分享, 本人打开
        if (!res.data.projectMissionRelParticipantVo && !res.data.projectMissionVo) {
          this.toDetail(this.selfVisitType)
        }
        // 任务-协同联系人关系（协同管理）查询返回对象
        if (res.data.projectMissionRelParticipantVo) {
          // 这个有值的时候说明是有申请过任务，给它显示申请中的那个页面
          this.applying = true
          this.applyAlready = true
          // 状态：0待审核-，1-审核通过，2-审核不通过
          this.stauts = res.data.projectMissionRelParticipantVo.status
          this.visitType = res.data.projectMissionRelParticipantVo.visitType
          // 已经审核了并且通过了, 直接跳去详情
          if (this.stauts == 1) {
            this.toDetail(this.visitType)
          }
        }
        // 项目任务查询返回对象
        if (res.data.projectMissionVo) {
          let { createId } = res.data.projectMissionVo
          let { userId } = this.$store.state.user
          // 同一个人的话就能直接进去并且能编辑
          if (createId === userId) {
            // 直接跳详情
            this.toDetail(this.selfVisitType)
            // console.log('1111')
            // console.log(this.visitType)
            // this.toDetail(this.visitType)
          }

          // projectMissionVo
          // 项目任务查询返回对象
          // 这个有值的时候说明没有申请过权限，显示 让它 申请权限
          this.canApply = true
        }
      } else {
        // 申请者和打开着是本人, 按钮是去详情
      }
    },
    apply() {},
    applyRead() {
      this.typeName = '查看'
      this.visitType = 1
      this.dialogFormVisible = true
    },
    applyEdit() {
      this.typeName = '编辑'
      this.visitType = 2
      this.dialogFormVisible = true
    },
    cancel() {
      this.dialogFormVisible = false
      this.form.content = ''
    },
    async submit() {
      let { permissionType, projectMissionId, visitType } = this
      let { content } = this.form
      let { loginId, createId, createName } = this.userData
      let data = {
        permissionType,
        projectMissionId,
        projectParticipantId: loginId,
        visitType,
        content,
        createName,
        createId
      }
      const res = await applyingTaskRights(data)
      // if (res.data == 200) {
      this.cancel()
      this.applying = true
      this.applyAlready = true
      // }
    },
    toDetail(type) {
      // type 1 查看 2 编辑
      this.$router.push(
        `/workWithMe/cooperationDetail?projectMissionId=${this.projectMissionId}&&canEdit=${type}`
      )
    },
    toLogin() {
      this.$router.push({
        path: `/login`,
        query: {
          info: this.$route.query.info,
          backUrl: 'taskIntro'
        }
      })
      // }
    },
    getprojectMissionFreeInfo() {
      projectMissionFreeInfo(this.projectMissionId).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.followRemindList = res.data.followRemindList
          this.info = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss">
.task {
  padding-top: 50px;
  .cooperation-info {
    background-color: #fff;
    padding: 20px 50px 50px;
    width: 549px;
    margin: 0 auto;
    .title {
      margin-bottom: 40px;
    }
  }
  .next {
    margin: 0 auto 0;
    text-align: center;
    width: 549px;
    background-color: #fff;
    padding: 50px;
    padding-top: 0;
    .success-icon {
      font-size: 80px;
      color: #157ef9;
    }
    .into-btn {
      display: block;
      width: 80%;
      margin: 0px auto 30px;
    }
  }
  .tips {
    margin-bottom: 10px;
  }
}
.result {
  margin: 0 auto;
  text-align: center;
  width: 549px;
  background-color: #fff;
  border: 1px solid #fff;
  padding: 50px;
  .success-icon {
    font-size: 80px;
    color: #06dd7d;
  }
  .warning-icon {
    font-size: 80px;
    color: #ff9933;
  }
  .into-btn {
    display: block;
    width: 80%;
    margin: 30px auto;
  }
}
</style>
