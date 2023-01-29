<template>
  <div>
    <div class="title">申请业务</div>
    <div class="content">
      <p>业务名称: {{ selectDictLabel(businessType, form.businessType) }}</p>
      <p>申请时间: {{ form.applyTime }}</p>
      <p>申请人: {{ form.createName }}</p>
    </div>
    <div v-if="form.isCharge != 0">
      <div class="title">缴费信息</div>
      <div>已缴费！订单号：2209011203应付总金额：¥599.00</div>
      <el-button>订单详情</el-button>
    </div>

    <div class="title">审核</div>
    <div v-if="approveList.length" class="approve-list">
      <div v-for="(item, index) in approveList" :key="index" class="approve-item">
        审核时间: {{ item.auditDate }} 审核人: {{ item.auditUserName }} 审核结果:
        {{ selectDictLabel(statusOption, item.auditStatus) }} 审核意见: {{ item.reason || '-' }}
      </div>
    </div>
    <div v-if="!approveList.length && flag == 1" class="approve-list">暂无审核记录</div>
    <pc-form
      v-if="flag != 1"
      :class="['info-form', flag == 1 ? 'detail' : '']"
      :data="formData"
      v-model="addData"
      :disabled="flag == 1"
      ref="aopprveFrom"
    >
    </pc-form>
    <div class="submit-btn">
      <el-button style="margin-left: 50px" type="primary" @click="submit" v-if="flag == 0"
        >提交</el-button
      >
      <el-button @click="goBackRouter('/approveManagement/unitApprove')">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getDictMultiple } from '@/utils/tool'
import {
  editBusinessApply,
  businessApplyDetail,
  enterpriseAuditList
} from '@/api/unitInfo/unitDetail'
import { approveForm } from './approveForm'

const statusOption = [
  { dictValue: 0, dictLabel: '待审核 ' },
  { dictValue: 1, dictLabel: '审核通过  ' },
  { dictValue: 2, dictLabel: '审核未通过' }
]
export default {
  name: '',
  data() {
    return {
      statusOption,
      approveList: [], // 审批记录
      form: {
        temp: '-',
        businessCodeUrl: null,
        addr: '',
        creditCode: '',
        businessScope: '',
        enterpriseName: '',
        isCharge: 0 // 是否收费(0-免费，1-收费)
      },
      flag: this.$route.query.flag ? this.$route.query.flag : 0,
      businessApplyId: this.$route.query.businessApplyId ? this.$route.query.businessApplyId : null,
      enterpriseId: this.$route.query.enterpriseId ? this.$route.query.enterpriseId : null,
      formData: approveForm(this.$route.query.flag || 0),
      addData: {
        businessApplyId: this.$route.query.businessApplyId,
        reason: '',
        applyStatus: null
      },
      businessType: []
    }
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { business_type: businessType } = await getDictMultiple(['business_type'])
      this.businessType = businessType
      const res = await businessApplyDetail(this.businessApplyId)
      this.form = { ...this.form, ...res.data }
      const approveRes = await enterpriseAuditList({ type: 1, enterpriseId: this.enterpriseId })
      this.approveList = [...approveRes.data.records]

      // 已经审核过了, 详情展示
      if (this.flag == 1) {
        let { applyStatus, reason } = this.form
        this.addData.applyStatus = applyStatus
        this.addData.reason = reason
      }
    },
    // 提交
    submit() {
      this.$refs.aopprveFrom.getData().then((res) => {
        editBusinessApply(this.addData).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.$router.go(-1)
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.info-form {
  margin-top: 20px;
}
.submit-btn {
  text-align: center;
  margin-top: 50px;
}
.title {
  background-color: #f5faff;
  font-size: 17px;
  font-weight: bold;
  padding: 10px 10px;
}
.content {
  padding-left: 50px;
}
.approve-list {
  margin-left: 50px;
  margin-bottom: 10px;
  margin-top: 20px;
  .approve-item {
    background: #f2f2f2;
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>
