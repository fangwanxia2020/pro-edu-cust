<template>
  <div class="body">
    <div>
      <h2>订单详情 - {{ title }}</h2>
    </div>
    <div class="reserve-form">
      <div class="header-title">订单信息</div>
      <div class="order-info">
        <div class="info-left info-detail">
          <span>订单号:{{ orderInfo.orderNo || '-' }}</span>
          <span>交易单号:{{ orderInfo.serviceNo || '-' }} </span>
          <span>下单时间:{{ orderInfo.createTime || '-' }}</span>
          <span>支付时间:{{ orderInfo.payTime || '-' }}</span>
        </div>
        <div class="info-right info-detail">
          <span>用户昵称：{{ orderInfo.buyUserInfo.nickName || '-' }}</span>
          <span>支付类型：{{ orderInfo.payWay | filtersPay(payWay) }}</span>
          <span>用户备注：{{ orderInfo.userNote || '-' }}</span>
          <span>商户备注：{{ orderInfo.businessNote || '-' }}</span>
        </div>
      </div>
    </div>

    <div class="reserve-form">
      <div class="header-title">发票信息</div>
      <div class="order-info">
        <div class="all-info">无</div>
      </div>
    </div>

    <div class="reserve-form">
      <div class="header-title">商品信息</div>
      <div class="order-info">
        <div class="product-info all-info">
          <div style="margin-bottom: 10px">
            <span class="platform">单位名称：{{ orderInfo.orgName }}</span>
          </div>
          <el-table
            stripe
            border
            size="medium"
            tooltip-effect="light"
            :data="orderInfo.orderItemVos"
            :span-method="objectSpanMethod"
          >
            <el-table-column label="商品主图" width="130">
              <template slot-scope="scope" v-if="scope.row.goodsImage">
                <img :src="scope.row.goodsImage" alt="" class="avatar1" />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="goodsName" label="商品名称">
              <template slot-scope="scope">
                {{ scope.row.goodsName }}
                <div>
                  {{ scope.row.goodsSkuName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="数量"
              width="60"
              prop="amount"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sourceOrderItemFee"
              label="小计(元)"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="orderItemFee"
              label="合计(元)"
            ></el-table-column>
            <el-table-column show-overflow-tooltip label="其他费用项" width="140">
              <template slot-scope="">
                <div>{{ '-' }}</div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="freight_price"
              label="运费(元)"
              width="90"
              >{{ '-' }}</el-table-column
            >
            <el-table-column
              show-overflow-tooltip
              prop="orderItemFee"
              label="实付金额(元)"
            ></el-table-column>
          </el-table>
          <div class="total">
            订单共<i class="highlight"> {{ orderInfo.orderItemVos.length }}</i
            >件商品，总计：￥<i class="highlight">{{ total }}</i
            >（含运费 ￥<i class="highlight">0.00</i>）
          </div>
        </div>
      </div>
    </div>
    <div class="reserve-form">
      <div class="header-title">报名信息</div>
      <div class="product-info all-info">
        <div style="margin-bottom: 10px">
          <div class="platform">单位名称：{{ orderInfo.buyUserInfo.orgName }}</div>
          <div class="platform">下单人：{{ orderInfo.buyUserInfo.nickName }}</div>
          <div class="platform">手机号码：{{ orderInfo.buyUserInfo.mobilePhone }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="reserve-form">
      <div class="header-title">收货信息</div>
      <div class="order-info">
        <div class="all-info">无</div>
      </div>
    </div> -->
    <!-- <div class="reserve-form">
      <div class="header-title">物流信息</div>
      <div class="order-info">
        <div class="all-info">无</div>
      </div>
    </div> -->

    <div class="btn">
      <el-button type="primary" @click="revert">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getDictMultiple, selectDictLabel } from '@/utils/tool'

import { portDetail } from '@/api/orderCenter/order.js'

export default {
  // name: 'cPortDetail',
  filters: {
    filtersPay(val) {
      if (val == 1) {
        return '授信支付'
      }
      if (val == 2) {
        return '微信支付'
      }
      if (val == 30) {
        return '微信网页扫码支付'
      }
      return '-'
    }
  },
  data() {
    return {
      orderInfo: {},
      orderId: Number(this.$route.query.orderId),
      total: null,
      visible: this.$route.query.visible,
      vis: 'purchase',
      statusList: []
    }
  },
  created() {
    this.getData()
    this.init()
  },
  computed: {
    title() {
      return selectDictLabel(this.statusList, this.orderInfo.orderStatus) || '-'
    }
  },
  methods: {
    async init() {
      const { order_status: status } = await getDictMultiple(['order_status'])
      this.statusList = status
    },
    getData() {
      portDetail(this.orderId).then((res) => {
        this.orderInfo = res.data
        res.data.orderItemVos.map((e) => {
          this.total += e.orderItemFee
        })
      })
    },
    revert() {
      if (this.vis == 'purchase') {
        this.$router.push({
          path: '/purchaseOrder'
        })
      } else {
        this.$router.push({
          path: '../sellerOrder/index'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  background-color: #fff;
  margin: 0px;
}
.reserve-form {
  width: 75%;
  border: 1px #ccc solid;
  // margin-bottom: 20px;
  margin-left: 7%;
  .order-info {
    display: flex;
    margin-bottom: 10px;
    .info-detail {
      flex: 1;
      padding-left: 10px;
    }
    .info-right {
      border-left: 1px solid #ccc;
    }
  }
  .all-info {
    margin: 0 10px 30px 10px;
    width: 100%;
  }
  .product-info {
    span {
      display: inline;
    }
    .platform {
      margin-right: 30px;
      margin-bottom: 6px;
    }
    .total {
      text-align: right;
      // margin-top: 10px;
      padding-top: 35px;
      // width: 300px;
    }
  }
  span {
    display: block;
  }
  .highlight {
    color: #f56c6c;
    font-family: 'Microsoft Yahei', sans-serif;
  }
}
.header-title {
  background: #e6e9ed;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  // font-family: 'Microsoft Yahei', sans-serif;
  background: #e6e9ed;
  position: relative;
}
h2 {
  padding: 0px;
  margin: 0px;
  margin-bottom: 25px;
  padding-top: 30px;
  margin-left: 7%;
}
.btn {
  margin-left: 41%;
  margin-top: 20px;
}
.avatar1 {
  width: 50px;
  height: 50px;
}
</style>
