<template>
  <div class="travelers-info">
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- <el-form-item label="其他信息" class="width525">
        <el-checkbox v-model="provideInvoice.value" :disabled="isDetail"
          >商品可提供发票</el-checkbox
        >
      </el-form-item> -->
      <p class="order-travelers">订单需要提交出行人资料</p>
      <el-form-item label="出行人信息" class="info-list">
        <div v-for="item in travelersInfo" :key="item.attrCode" class="info-item">
          <el-checkbox v-model="item.value" :disabled="isDetail">{{ item.attrName }}</el-checkbox>
          <el-checkbox v-model="item.isRequired" :disabled="!item.value || isDetail"
            >必填</el-checkbox
          >
        </div>
      </el-form-item>
      <el-form-item label="出行人证件" class="info-list">
        <div v-for="item in travelersCertificate" :key="item.attrCode" class="info-item">
          <el-checkbox v-model="item.value" :disabled="isDetail">{{ item.attrName }}</el-checkbox>
          <el-checkbox v-model="item.isRequired" :disabled="!item.value || isDetail"
            >必填</el-checkbox
          >
        </div>
      </el-form-item>
      <el-form-item label="监护人信息" class="info-list">
        <div v-for="item in guargianInfo" :key="item.attrCode" class="info-item">
          <el-checkbox v-model="item.value" :disabled="isDetail">{{ item.attrName }}</el-checkbox>
          <el-checkbox v-model="item.isRequired" :disabled="!item.value || isDetail"
            >必填</el-checkbox
          >
        </div>
      </el-form-item>
    </el-form>
    <div class="time-btn" v-if="!isDetail">
      <el-button type="primary" @click="submit(1)">保存</el-button>
      <el-button type="primary" @click="preview">预览</el-button>
      <el-button type="primary" @click="submit(3)" v-if="isEnding">完成</el-button>
      <el-button type="primary" @click="submit(2)" v-else>保存并进行下一步</el-button>
    </div>
    <div class="time-btn" v-else-if="isDetail">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>
import { modifyOrderSubmitInfo, getOrderSubmitInfo } from '@/api/goodsCenter/serviceMarket'
import { reCheckGoods } from '@/views/goodsCenter/serviceMarket/goodsEvent'
import { travelersInfo, travelersCertificate, guargianInfo, resetOrderSubmit } from './data'

export default {
  data() {
    return {
      goodsType: this.$route.query.type,

      // 出行人信息
      travelersInfo,
      // 出行人证件
      travelersCertificate,
      // 监护人信息
      guargianInfo
    }
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    goodsId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isEnding: {
      type: Boolean,
      default: false
    },
    needChangeStatus: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.goodsId) this.getOrderSubmitInfo()
  },
  methods: {
    getOrderSubmitInfo() {
      getOrderSubmitInfo(this.goodsId).then((res) => {
        if (res.code === 200) {
          // 出行人信息赋值
          let prodAttrOrder = res.data
          prodAttrOrder &&
            prodAttrOrder.forEach((attr) => {
              let value = attr.prodAttrValue[0] == 1
              let isRequired = attr.isRequired == 1
              // if (attr.attrValueTypeId == this.provideInvoice.attrCode) {
              //   this.provideInvoice.value = value
              //   this.provideInvoice.prodAttrId = attr.prodAttrId
              // }
              this.travelersInfo.forEach((info) => {
                if (attr.attrValueTypeId == info.attrCode) {
                  info.value = value
                  info.isRequired = isRequired
                  info.prodAttrId = attr.prodAttrId
                }
              })
              this.travelersCertificate.forEach((info) => {
                if (attr.attrValueTypeId == info.attrCode) {
                  info.value = value
                  info.isRequired = isRequired
                  info.prodAttrId = attr.prodAttrId
                }
              })
              this.guargianInfo.forEach((info) => {
                if (attr.attrValueTypeId == info.attrCode) {
                  info.value = value
                  info.isRequired = isRequired
                  info.prodAttrId = attr.prodAttrId
                }
              })
            })
        }
      })
    },
    // 预览
    preview() {
      this.$emit('preview')
    },
    async submit(type) {
      let prodAttrOrder = [
        // {
        //   attrName: this.provideInvoice.attrName,
        //   attrValueTypeId: this.provideInvoice.attrCode,
        //   prodAttrId: this.provideInvoice.prodAttrId,
        //   prodAttrValue: [this.provideInvoice.value ? 1 : 0]
        // }
      ]
      this.travelersInfo.forEach((item) => {
        let obj = {
          attrName: item.attrName,
          attrValueTypeId: item.attrCode,
          prodAttrId: item.prodAttrId,
          prodAttrValue: [item.value ? 1 : 0],
          isRequired: item.isRequired ? 1 : 0
        }
        prodAttrOrder.push(obj)
      })
      this.travelersCertificate.forEach((item) => {
        let obj = {
          attrName: item.attrName,
          attrValueTypeId: item.attrCode,
          prodAttrId: item.prodAttrId,
          prodAttrValue: [item.value ? 1 : 0],
          isRequired: item.isRequired ? 1 : 0
        }
        prodAttrOrder.push(obj)
      })
      this.guargianInfo.forEach((item) => {
        let obj = {
          attrName: item.attrName,
          attrValueTypeId: item.attrCode,
          prodAttrId: item.prodAttrId,
          prodAttrValue: [item.value ? 1 : 0],
          isRequired: item.isRequired ? 1 : 0
        }
        prodAttrOrder.push(obj)
      })
      if (this.needChangeStatus) {
        let saveFlag = await reCheckGoods(this)
        if (!saveFlag) {
          return
        }
      }
      modifyOrderSubmitInfo({
        goodsId: this.goodsId,
        prodAttrOrder
      }).then((data) => {
        if (data.code === 200) {
          if (type == 1 || type == 2) this.getOrderSubmitInfo()
          if (type == 1) {
            this.$message.success('保存成功！')
          } else if (type == 2) {
            this.$emit('nextStep')
          } else if (type == 3) {
            this.$emit('finish')
          }
        }
      })
    }
  },
  destroyed() {
    resetOrderSubmit()
  }
}
</script>

<style scoped lang="scss">
.travelers-info {
  .order-travelers {
    color: #606266;
    padding: 0 0 20px 20px;
  }
  .travelers-info {
    margin-left: 10px;
    border-left: 1px solid #ccc;
  }
  .info-list {
    width: 1000px;
    .info-item {
      display: inline-block;
      width: 280px;
      padding-right: 40px;
    }
  }
  .time-btn {
    padding-top: 10px;
    text-align: center;
  }
}
</style>
