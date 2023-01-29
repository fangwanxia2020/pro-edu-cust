<template>
  <div
    :class="{
      'list-edit': true,
      'create-page': true
    }"
  >
    <ty-form-container :backBtnShow="false"></ty-form-container>
    <pc-form
      :class="['activity-info-form', flag == 1 ? 'detail' : '']"
      :data="formData"
      v-model="addData"
      :disabled="flag == 1"
      ref="mainFrom"
    >
    </pc-form>
    <div class="sub-btn">
      <el-button style="margin-left: 50px" type="primary" @click="submit" v-if="flag == 0"
        >提交</el-button
      >
      <el-button @click="backPage">返回</el-button>
    </div>
  </div>
</template>
<script>
import { testPath } from '@/utils/tool'
import { checkSupplierApply, supplierPartnerInfo } from '@/api/partnerManagement/cooperativeUnits'
import { customerPartnerInfo } from '@/api/partnerManagement/partner'
import { approveForm } from './jsonData'

export default {
  components: {},
  data() {
    return {
      addData: { bindingStatus: null, isAdd: null, auditReason: '', customerId: null },
      // formData: approveForm(this.$route.query.flag || 0),
      flag: this.$route.query.flag ? this.$route.query.flag : 0,
      customerId: this.$route.query.customerId ? this.$route.query.customerId : null,
      selfIsAdd: this.$route.query.selfIsAdd ? this.$route.query.selfIsAdd : null,
      isView: false
    }
  },
  created() {
    this.init()
  },
  computed: {
    isAdd() {
      return testPath(/add/)
    },
    formData() {
      return approveForm(this.addData, this.$route.query.flag || 0)
    }
  },
  watch: {},
  methods: {
    async init() {
      if (this.$route.query.flag) {
        this.getDetail()
      }
    },
    // 提交
    submit() {
      this.$refs.mainFrom.getData().then(async (res) => {
        this.addData.partnerId = this.customerId
        let data = { ...this.addData }
        if (this.addData.bindingStatus == 2) {
          data.auditReason = ''
        } else if (this.addData.bindingStatus == 3) {
          data.isAdd = null
        }
        checkSupplierApply(data).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.backPage()
        })
      })
    },
    backPage() {
      return this.$router.push({
        name: 'foundCooperativeUnits',
        params: {
          toApplyList: true
        }
      })
    },
    // 详情
    async getDetail() {
      // const res = await supplierPartnerInfo(this.customerId)
      const res = await customerPartnerInfo(this.customerId)
      this.addData = res.data
      this.addData.isAdd = this.selfIsAdd
    }
  }
}
</script>
<style scoped lang="scss">
.list-edit {
  &__tabs {
    margin-bottom: 40px;

    ::v-deep .el-tabs__content {
      padding: 20px 10px;
    }
  }

  &__btn-group {
    display: flex;
    justify-content: center;

    .el-button {
      & + .el-button {
        margin-left: 30px;
      }
    }
  }

  .sub-btn {
    text-align: center;
    margin-top: 50px;
  }
}
.detail {
  ::v-deep {
    .el-upload-add {
      display: none !important;
    }
  }
}
.btns-bar {
  margin-bottom: 20px;
}
</style>
