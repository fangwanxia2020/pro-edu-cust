<template>
  <div class="page">
    <h2 class="title">收银台</h2>
    <div class="main">
      <div class="order-No">
        <img class="pic" :src="tempImages" />
        <div class="content">
          <div>订单编号: {{ form.orderNo }}</div>
          <div>{{ form.goodList }} <span v-if="orderItemVos.length > 1">等多件</span></div>
        </div>
        <div class="price">¥{{ form.orderFee }}</div>
      </div>
      <div @click="choosePay(1)" :class="{ 'is-choose': chooseType == 1 }" class="order-pay">
        <img class="pic" :src="payImg" />
        <div class="content">
          <h3>授信支付</h3>
        </div>
      </div>
      <div class="order-pay" @click="choosePay(2)" :class="{ 'is-choose': chooseType == 2 }">
        <img class="pic" :src="weixinImg" />
        <div class="content">
          <h3>微信支付</h3>
        </div>
      </div>
      <el-button
        :disabled="!chooseType"
        class="buy-btn"
        type="warning"
        size="medium"
        @click="toPayLast()"
        >确认付款</el-button
      >
    </div>
  </div>
</template>

<script>
import tempImages from '@/assets/images/goods/no-pic.png'
import payImg from '@/assets/images/goods/pay.png'
import weixinImg from '@/assets/images/goods/weixin.png'
// import chooseImg from '@/assets/images/goods/choose.png'
// import noChooseImg from '@/assets/images/goods/no-choose.png'
import { orderDetail, creditPay } from '@/api/needMarket/service.js'

export default {
  name: '',
  data() {
    return {
      payImg,
      chooseType: null,
      weixinImg,
      tempImages,
      orderId: this.$route.query.orderId || null,
      form: {
        orderNo: null,
        goodList: ''
      },
      orderItemVos: []
    }
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await orderDetail(this.orderId)

      this.form = { ...res.data }
      let list = []
      let imgList = []
      this.orderItemVos = res.data.orderItemVos
      res.data.orderItemVos.map((item) => {
        list.push(item.goodsName)
        if (item.goodsImage) imgList.push(item.goodsImage)
      })
      this.form.goodList = list[0]
      // this.form.goodList = list.join(', ')
      if (imgList.length) this.tempImages = imgList[0]
    },
    choosePay(type) {
      this.chooseType = type
    },
    toPayLast() {
      if (this.chooseType == 1) {
        this.$router.push({
          path: `/service/payLast`,
          query: { type: this.chooseType, orderId: this.orderId }
        })
      } else if (this.chooseType == 2) {
        this.$router.push({
          path: `/service/payLast`,
          query: { type: this.chooseType, orderId: this.orderId }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.page {
  height: 100%;
  background: #fff;
  padding: 1px 0px;
  .title {
    line-height: 50px;
    padding: 0px 20px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .main {
    padding: 0 20px 0px;
  }

  .order-No {
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 20px;
    margin-bottom: 20px;
    .pic {
      // float: left;
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }
    .content {
      display: inline-block;
      line-height: 30px;
      margin-left: 10px;
    }
    .price {
      line-height: 100px;
      color: #fe9400;
      font-size: 26px;
      font-weight: bold;
      float: right;
      margin-right: 50px;
    }
  }
  .is-choose {
    background-image: url(~@/assets/images/goods/choose.png) !important;
  }
  .order-pay {
    background-image: url(~@/assets/images/goods/no-choose.png);
    background-repeat: no-repeat;
    background-position-x: right;
    background-size: 50px 50px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 5px 20px;
    margin: 10px 20px;
    cursor: pointer;
    .pic {
      // float: left;
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
    .content {
      display: inline-block;
      line-height: 30px;
      margin-left: 10px;
    }
  }
  .buy-btn {
    background: #fe9400;
    font-size: 13px;
    // text-align: right;
    float: right;
    margin: 20px;
  }
}
</style>
