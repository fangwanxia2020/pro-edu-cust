<template>
  <div class="order">
    <h4>
      订单 <span>{{ orgName }}</span>
    </h4>
    <el-table :data="form.orderItemDtos" class="goods-list">
      <el-table-column label="商品名称" width="400">
        <template slot-scope="scope">
          <div>
            <img class="pic" :src="scope.row.goodsImage" />
            <div>
              <div>{{ scope.row.goodsName }}</div>
              <div v-for="item in scope.row.skuAttrValidStrList" :key="item">{{ item }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价(元)" width="200" prop="price"></el-table-column>
      <el-table-column label="数量" width="200" prop="amount"></el-table-column>
      <el-table-column label="金额(元)" width="200" prop="orderItemFee"></el-table-column>
    </el-table>
    <div class="detail">
      <div>
        给卖家留言 :
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.userNote">
        </el-input>
      </div>
      <div>发票信息 :</div>
      <div>总计 :</div>
    </div>
    <div class="total">
      <div>商品总金额：¥{{ form.orderFee }}</div>
      <div>优惠金额：¥0.00</div>
      <div>
        应付总金额：<span class="total-price">¥{{ form.orderFee }}</span>
      </div>
      <el-button class="buy-btn goods-btn" type="warning" size="medium" @click="toPay()"
        >去付款</el-button
      >
    </div>
  </div>
</template>

<script>
import tempImages from '@/assets/images/404_images/404.png'
import { orderDetail, addOrder } from '@/api/needMarket/service.js'

export default {
  name: '',
  data() {
    return {
      form: {
        userNote: '',
        orderItemDtos: [],
        orderUseType: 4,
        orgId: this.$route.query.orgId,
        orderFee: this.$route.query.totalPrice
      },
      orgName: this.$route.query.orgName,
      // orderUseType:订单业务类型，1普通商品订单，2创客礼包，3发布需求 ，4采购订单，5产品服务订单 6-服务订单 11-全款预售 7-阶段预售 8-高级预售 9-预定 10-金融订单
      tableData: []
      // totalPrice: this.$route.query.totalPrice
    }
  },
  computed: {},
  created() {
    this.form.orderItemDtos = JSON.parse(this.$route.query.dataArr)
    console.log('this.form.orderItemDtos')
    console.log(this.form.orderItemDtos)
  },
  methods: {
    async toPay() {
      const res = await addOrder({ ...this.form, orgName: this.orgName })
      if (res.code == 200) {
        if (this.form.orderFee == 0) {
          // 0元直接支付成功
          this.$router.push({
            path: `/service/paySuccess`,
            query: { orderId: res.data, price: this.form.orderFee }
          })
        } else {
          this.$router.push({
            path: `/service/goodsPay`,
            query: { orderId: res.data }
          })
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.order {
  background: #fff;
  padding: 20px;
  .goods-list {
    width: 100%;
    margin: 20px 0;
  }
  .pic {
    float: left;
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .detail {
    line-height: 35px;
  }
  .total {
    line-height: 30px;
    text-align: right;
    font-size: 14px;
    .total-price {
      font-size: 16px;
      font-weight: bold;
    }
    .buy-btn {
      background: #fe9400;
      font-size: 13px;
    }
  }
}
</style>
