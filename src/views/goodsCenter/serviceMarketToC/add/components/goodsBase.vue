<template>
  <div>
    <ty-pc-form
      ref="formContainer"
      :apiData="templateId"
      submitBtnText="保存并进行下一步"
      @submitSuccess="submitSuccess"
      :backBtnShow="false"
      :submitBtnShow="false"
      :requestCreateData="requestCreateData"
      @getDetail="getDetail"
      :detailFlag="isDetail"
    ></ty-pc-form>
    <div class="btn" v-if="templateId">
      <el-button type="primary" @click="submit" v-if="!isDetail">保存并进行下一步</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import { getCodeSerialNumber } from '@/api/goodsCenter/serviceMarket.js'
import { reCheckGoods } from '@/views/goodsCenter/serviceMarket/goodsEvent'

export default {
  props: {
    templateId: {
      type: [String, Number],
      default: ''
    },
    innerCatalogId: {
      type: [String, Number],
      default: ''
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    needChangeStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    innerCatalogId(val) {
      this.requestCreateData.innerCatalogId = val
    }
  },
  data() {
    return {
      requestCreateData: {
        innerCatalogId: this.innerCatalogId
      }
    }
  },
  created() {
    if (!this.isDetail && !this.isEdit) this.getCodeSerialNumber()
  },
  methods: {
    getCodeSerialNumber() {
      getCodeSerialNumber().then((res) => {
        if (res.code === 200) {
          this.requestCreateData.code = res.data
        }
      })
    },
    async submit() {
      if (this.needChangeStatus) {
        let saveFlag = await reCheckGoods(this)
        if (!saveFlag) {
          return
        }
      }
      this.$refs.formContainer.handleSubmit()
    },
    submitSuccess(data) {
      let _data = data || {}
      this.$emit('submitGoodsBase', _data)
    },
    getDetail(data) {
      this.$emit('getGoodsDetail', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  text-align: center;
}
</style>
