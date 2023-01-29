<template>
  <div>
    <div class="header">
      <el-form inline :model="form">
        <el-form-item label="订单编号" class="formItem">
          <el-input v-model="form.keyWord" placeholder="订单编号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" class="formItem">
          <el-select
            v-model="form.orderStatus"
            placeholder="请选择"
            size="small"
            clearable
            style="width: 333px"
          >
            <el-option
              v-for="item in statusList"
              :label="item.dictLabel"
              :key="item.dictValue"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" class="formItem">
          <el-date-picker
            v-model="dateRange"
            size="small"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="formItem">
          <el-button type="primary" size="small" @click="selectData"> 查询 </el-button>
          <el-button size="small" style="margin-left: 10px" @click="reset"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contain">
      <div class="searchBox-high-operator-bar">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <!-- <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport"
              >导出Excel</el-button
            > -->
          </el-col>
        </el-row>
      </div>
      <div class="tab">
        <table border="1" class="ttt">
          <thead>
            <tr>
              <th width="220">订单详情</th>
              <th width="100">订单状态</th>
              <th width="100">金额(元)</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in tabList" :key="index">
            <tr class="tr-th-child">
              <td colspan="4">
                <span class="row">下单时间：{{ item.createTime }}</span>
                <span class="row">订单编号：{{ item.orderNo }}</span>
                <span class="row">单位名称：{{ item.orgName }}</span>
              </td>
            </tr>
            <tr class="tr-td" v-for="(i, index) in item.orderItemVos" :key="index">
              <td>
                <div class="img">
                  <img :src="i.goodsImage" />
                </div>
                <div class="con">
                  <div>{{ i.goodsName }}</div>
                  <div>{{ i.goodsSkuName }}</div>
                </div>
                <div class="num">
                  <span> {{ '×' + i.amount }} </span>
                </div>
              </td>
              <td>
                <div>{{ item.orderStatus | filtersOrderStatus(statusList) }}</div>
                <div>
                  <el-button type="text" @click="orderDet(item)" size="small"> 订单详情 </el-button>
                </div>
              </td>
              <td>{{ item.orderFee }}</td>
              <td>
                <div>
                  <el-button
                    type="text"
                    @click="toPay(item.orderId)"
                    v-if="item.orderStatus == 0"
                    size="small"
                  >
                    去付款
                  </el-button>
                  <el-button
                    type="text"
                    @click="cancel(item.orderId)"
                    style="padding-left: 20px"
                    v-if="item.orderStatus == 0"
                    size="small"
                  >
                    取消订单
                  </el-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { buyList, cancelOrder } from '@/api/orderCenter/order.js'

export default {
  filters: {
    filtersOrderStatus(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      form: {
        keyWord: '',
        orderStatus: null,
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      statusList: [],
      dateRange: [],
      tabList: [],
      total: null
    }
  },
  created() {
    this.getData()
    this.init()
  },
  methods: {
    async init() {
      const { order_status: status } = await getDictMultiple(['order_status'])
      this.statusList = status
    },
    // 获取列表数据
    getData() {
      if (this.dateRange) {
        this.form.beginTime = this.dateRange[0]
        this.form.endTime = this.dateRange[1]
      }
      buyList(this.form).then((res) => {
        this.tabList = res.data.records
        this.total = res.data.total
      })
    },
    selectData() {
      this.getData()
    },
    // 重置
    reset() {
      this.form = {}
      this.dateRange = []
      this.getData()
    },
    // 日期选择器变化触发
    handleChange(row) {
      console.log(row, 'row')
    },
    handleExport() {},
    // 跳转订单详情
    orderDet(item) {
      this.$router.push({
        path: '/purchaseOrder/details',
        query: {
          orderId: item.orderId,
          visible: 'toBePaid',
          orderStatus: item.orderStatus
        }
      })
    },
    // 监听每页条数改变
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getData()
    },
    // 监听当前页改变
    handleCurrentChange(val) {
      this.form.pageNum = val
      console.log()
      this.getData()
    },
    toPay(id) {
      this.$router.push({
        path: '/service/goodsPay',
        query: {
          orderId: id
        }
      })
    },
    cancel(id) {
      this.$confirm('确定取消?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelOrder(id).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.getData()
          }
        })
      })
      // .catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   })
      // })
      // cancelOrder(id).then((res) => {

      //   this.getData()
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  background-color: #fff;
  padding: 25px 0px 3px 15px;
}
.formItem {
  // margin: 20px;
  // // font-weight: 400;
  // margin-left: 15px;
}
.contain {
  // margin-top: 20px;
  margin: 0 auto;
  background-color: #fff;
}
.page {
  margin: 30px 0;
  text-align: center;
}

.tr-td {
  position: relative;
}

.table-input {
  width: 230px;
}
table {
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ebeef5;
  th,
  td {
    padding: 10px 5px;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
  }
  th {
    color: #333;
  }
  td {
    color: #606266;
  }
  .tr-th {
    background-color: #f5f5f5;
    color: #383838;
  }
  .tr-th-child {
    background-color: #fcfcfc;
    color: #383838;
  }
  .row {
    margin: 0 10px;
  }
  .address {
    @include ellipsis(1);
  }
  .tr-td {
    td {
      position: relative;
    }
    .img {
      float: left;
      margin: 0 5px 0 0;
      width: 60px;
      height: 60px;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .con {
      float: left;
      width: 68%;

      .vipSku {
        color: #ccc;
      }
    }
    .num {
      position: absolute;
      top: 40%;
      right: 10px;
      text-align: center;
    }
    .txt {
      text-align: center;
    }
  }
}
.el-button + .el-button {
  margin-left: 0;
  // margin-top: 10px;
}
.businessReduce {
  margin-top: 10px;
}
.tab {
  text-align: left;
  // width: auto;
}
</style>
