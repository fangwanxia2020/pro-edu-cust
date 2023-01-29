<template>
  <div class="page">
    <el-container>
      <el-header>
        <span class="page-title">入驻申请</span>
        <el-steps
          class="top-steps"
          :space="200"
          :active="active"
          align-center
          process-status="finish"
        >
          <el-step title="选择单位类型"></el-step>
          <el-step title="填写申请"></el-step>
          <el-step title="平台审核"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <div v-if="active == 0">
          <unit-type ref="firstStep" :unitInfo.sync="chooseTypeInfo"></unit-type>
          <div class="sub-btn">
            <el-button
              class="btn"
              type="primary"
              :disabled="!templateId"
              @click="submit"
              v-if="flag == 0"
              >下一步</el-button
            >
          </div>
        </div>
        <div v-else-if="active == 1">
          <apply
            :unitInfo.sync="chooseTypeInfo"
            @nextStep="nextStep"
            :templateId="templateId"
            :detailInfoFlag="detailInfoFlag"
          ></apply>
        </div>
        <div v-else-if="active == 2">
          <approve-list
            :enterpriseId="enterpriseId"
            :authStatus="authStatus"
            @changTab="changTabAgain"
          ></approve-list>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { enterprises } from '@/api/applyOcupancy/process'
import { ADD, EDIT } from '@/constants'
import Apply from './components/apply.vue'
import ApproveList from './components/approveList.vue'
import unitType from './components/unitType.vue'

export default {
  name: 'Process',
  components: { unitType, Apply, ApproveList },
  data() {
    return {
      active: 0,
      chooseTypeInfo: {},
      flag: this.$route.query.flag ? this.$route.query.flag : 0,
      templateConfigurationId: this.$route.query.templateConfigurationId
        ? this.$route.query.templateConfigurationId
        : null,
      enterpriseId: null,
      authStatus: 0,
      templateType: this.$route.query.templateType || 1,
      templateId: '',
      enterpriseTypeTemplateId: null,
      detailInfoFlag: true
    }
  },
  created() {
    this.init()
  },
  watch: {
    async chooseTypeInfo(newVal) {
      console.log(newVal)
      if (this.enterpriseTypeTemplateId) {
        // 审批失败后编辑
        this.templateId = await this.$store.dispatch('template/getTemplateId', {
          templateIds: newVal.templateIds,
          type: EDIT
        })
        if (this.enterpriseTypeTemplateId == newVal.enterpriseTypeTemplateId) {
          this.detailInfoFlag = true
        } else {
          this.detailInfoFlag = false
        }
      } else {
        this.detailInfoFlag = true
        // 新增
        this.templateId = await this.$store.dispatch('template/getTemplateId', {
          templateIds: newVal.templateIds,
          type: ADD
        })
      }
    }
  },
  methods: {
    async init() {
      const { enterpriseId } = this.$store.state.user.userInfo
      if (enterpriseId && enterpriseId != 1) {
        this.enterpriseId = enterpriseId
        const { ...query } = this.$route.query
        this.$router.replace({ query: { ...query, enterpriseId } })
        const enterprisesInfo = await enterprises(enterpriseId)
        // authStatus 审核状态 0待审核 1审核通过 2审核未通过
        let { authStatus, enterpriseTypeTemplateId } = enterprisesInfo.data
        this.authStatus = authStatus
        this.active = 2
        this.enterpriseTypeTemplateId = enterpriseTypeTemplateId
        // if (authStatus == 0) {
        // }
      }
    },
    // 提交
    submit() {
      this.active = 1
    },
    nextStep(data) {
      this.active = 2
      this.enterpriseId = data.enterpriseId
      this.authStatus = 0
    },
    changTab(active) {
      this.active = active
    },
    // 重新编辑
    changTabAgain(active) {
      this.active = active
      // 回显选了什么类型
      this.$nextTick(() => {
        this.$refs.firstStep.setType(this.enterpriseTypeTemplateId)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #fff;
  min-height: 100%;
  .page-title {
    font-size: 24px;
    font-weight: bold;
    float: left;
    margin-top: 32px;
  }
  .el-container {
    .el-header {
      // text-align: center;
      height: 100px !important;
      box-shadow: 6px 6px 6px #ddd;
      .top-steps {
        margin: 22px;
        margin-left: 30%;
      }
    }
  }
  .el-main {
    .sub-btn {
      text-align: center;
      margin-top: 50px;
      .btn {
        width: 300px;
      }
    }
  }
}
</style>
