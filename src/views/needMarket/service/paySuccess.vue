<template>
  <div class="page">
    <h2 class="title">支付页</h2>
    <div class="content">
      <img class="pic" :src="successImg" />
      <h3>支付成功</h3>
      <div>支付方式 : <span v-if="price == 0">-</span><span v-else>余额支付</span></div>
      <div>支付金额 : ¥{{ price }}</div>
      <div class="btn-list">
        <el-button class="buy-btn goods-btn" type="warning" size="medium" @click="toOrder()"
          >查看订单</el-button
        >
        <el-button class="more-btn goods-btn" type="primary" plain size="medium" @click="toList"
          >继续采购</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import successImg from '@/assets/images/goods/success.png'

export default {
  name: '',
  data() {
    return {
      successImg,
      password: null,
      price: this.$route.query.price || ''
    }
  },
  computed: {},
  created() {},
  methods: {
    toOrder() {
      // password
      this.$router.push({
        path: '/purchaseOrder/details',
        query: {
          orderId: this.$route.query.orderId,
          visible: 'paymentSuccessful'
        }
      })
    },
    toList() {
      // password
      this.$router.push({
        path: `/needMarket/service`
      })
    },
    /* 获取支付密码 */
    getPwd(pwd) {
      this.password = pwd
    }
  }
}
</script>
<style scoped lang="scss">
.page {
  height: 100%;
  background: #fff;
  line-height: 30px;
  padding: 1px 0;
  .title {
    line-height: 50px;
    padding: 0px 20px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .pic {
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  .goods-btn {
    margin-top: 20px;
    width: 200px;
    height: 40px;
  }
  .buy-btn {
    background: #fe9400;
  }
  .more-btn {
    border: 1px solid #fe9400;
    color: #fe9400;
  }
  .el-button.is-plain:hover,
  .el-button.is-plain:focus {
    background: #fe9400 !important;
    color: #fff;
  }

  .content {
    text-align: center;
  }
}
</style>
