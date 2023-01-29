<template>
  <div class="page">
    <h2 class="title">收银台</h2>
    <div class="content" v-if="chooseType == 1">
      <div>商品信息: {{ form.goodList }} 等多件</div>
      <div>
        订单金额:
        <span class="price">¥{{ form.orderFee }}</span>
      </div>
      <div class="password">
        <p class="note">授信支付密码</p>
        <div class="password-input">
          <input-pwd @get="getPwd" />
        </div>
        <el-button :disabled="false" class="buy-btn" type="warning" size="medium" @click="ensure()"
          >确定</el-button
        >
      </div>
    </div>
    <div class="content" v-if="chooseType == 2">
      <div>
        订单提交成功, 请尽快付款! 订单号: {{ form.orderNo }}
        <div class="price-label">
          应付总金额: <span class="price">¥{{ form.orderFee }}</span>
        </div>
        <div class="pay-type">
          微信支付
          <!-- <div class="time-tip">
            距离二维码还剩{{ countdown }}秒, 过期后请刷新页面重新获取二维码
          </div> -->
        </div>
        <el-row class="code">
          <el-col :span="12">
            <div class="code-img">
              <img :src="QrcodeImg" alt="" />
            </div>

            <img class="tips" :src="tipImg"
          /></el-col>
          <el-col :span="12"> <img class="phone" :src="phoneImg" /></el-col>
        </el-row>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import InputPwd from '@/components/InputPwd.vue'
import { orderDetail, creditPay, weixinPay, generateCodeBySaas } from '@/api/needMarket/service.js'
import tipImg from '@/assets/images/goods/tip.png'
import phoneImg from '@/assets/images/goods/phone.png'
import QR from '@/utils/ty-qrcode.js'

export default {
  name: '',
  components: { InputPwd },
  data() {
    return {
      tipImg,
      phoneImg,
      QrcodeImg: null,
      chooseType: this.$route.query.type,
      password: null,
      form: {
        orderNo: null,
        goodList: ''
      },
      orderId: this.$route.query.orderId || null,
      countdown: 60,
      timer: null,
      payOrderNo: null
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
      res.data.orderItemVos.map((item) => {
        list.push(item.goodsName)
        if (item.goodsImage) imgList.push(item.goodsImage)
      })
      // this.form.goodList = list.join(', ')
      console.log(list)
      this.form.goodList = list[0]
      if (imgList.length) this.tempImages = imgList[0]
      if (this.chooseType == 2) this.addCode()
    },

    async ensure() {
      if (!this.password || this.password.length != 6) {
        this.$message.error('请输入6位数密码')
        return
      }
      const res = await creditPay({ orderId: this.orderId, password: this.password })
      if (res.code == 200) {
        this.$router.push({
          path: `/service/paySuccess`,
          query: { type: this.chooseType, orderId: this.orderId, price: this.form.orderFee }
        })
      }
    },
    /* 获取支付密码 */
    getPwd(pwd) {
      this.password = pwd
    },
    async addCode() {
      const res = await generateCodeBySaas({
        rulesCode: 'wx_pay_code',
        isNewDateToOne: false
      })
      this.payOrderNo = res.data
      const resSed = await weixinPay({
        payOrderNo: this.payOrderNo,
        payWay: 30,
        totalFee: this.form.orderFee,
        orderIdArray: [this.orderId]
      })
      // let val = 'http://sc-test.tianyuaninternet.com/hplatform-h5/'
      let val = resSed.data.codeUrl
      // let val = this.url
      this.addCodeImg(val)
    },
    addCodeImg(val) {
      let img = QR.createQrCodeImg(val, {
        errorCorrectLevel: 'L'
      })
      // console.log(img);
      this.QrcodeImg = img
      // this.sendCode()
    },
    // 倒计时
    sendCode() {
      this.loading() // 启动定时器
      this.timer = setInterval(() => {
        // 创建定时器
        if (this.countdown === 1) {
          this.clearTimer() // 关闭定时器
          // this.skipStep()
        } else {
          this.loading()
        }
      }, 1000)
    },
    loading() {
      // 启动定时器
      this.countdown-- // 定时器减1
    },
    clearTimer() {
      // 清除定时器
      clearInterval(this.timer)
      this.timer = null
    }
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>
<style scoped lang="scss">
.page {
  min-height: 100%;
  .title {
    line-height: 50px;
    padding: 0px 20px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  // height: 100%;
  background: #fff;
  padding: 1px 0;
  .content {
    margin-left: 50px;
    margin-top: 25px;
    line-height: 30px;
  }
  .price-label {
    display: inline;
    margin-left: 40px;
  }
  .pay-type {
    font-size: 18px;
    font-weight: bold;
    margin-top: 30px;
    .time-tip {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      margin-left: 80px;
    }
  }
  .price {
    font-size: 22px;
    font-weight: bold;
  }
  .password {
    margin-top: 50px;
    margin-left: 20px;
    .buy-btn {
      background: #fe9400;
      margin-top: 30px;
      width: 150px;
    }
    .password-input {
      @include faj(center);
      .set-pwd {
        margin-left: 10px;
      }
      .am_payPwd {
        padding: 8px 10px;
        border-radius: 0;
        width: 300px;
        height: 60px;
      }
    }
  }
  .code {
    // text-align: center;
    .code-img {
      margin: 10px auto;
      width: 270px;
      height: 270px;
      padding: 15px;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tips {
      display: block;
      width: 270px;
      height: auto;
      margin: 20px auto 20px;
    }
    .phone {
      width: 380px;
      height: 350px;
    }
  }
}
</style>
