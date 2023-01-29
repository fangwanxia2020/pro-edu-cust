<template>
  <!--退款订单-->
  <div id="refund-order">
    <el-form :inline="true" class="demo-form-inline" size="small" @submit.native.prevent>
      <!-- <el-form-item>
				<el-select v-model="numberType"  placeholder="请选择">
					<el-option label="订单编号" value="1"></el-option>
					<el-option label="退款编号" value="2"></el-option>
				</el-select>
			</el-form-item> -->
      <el-form-item label="订单编号">
        <el-input
          v-model="bandOrderNo"
          clearable
          placeholder="输入编号"
          class="search-input"
        ></el-input>
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="bandBeginTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="开始日期"
          class="table-date"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="bandEndTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="结束日期"
          class="table-date"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="退款方式">
        <el-select v-model="refundWay" placeholder="请选择">
          <el-option label="全部" value="null"></el-option>
          <el-option label="仅退款" value="0"></el-option>
          <el-option label="退款退货" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款状态">
        <el-select v-model="refundStatus" placeholder="请选择">
          <el-option label="全部" value="null"></el-option>
          <el-option label="申请退款" value="0"></el-option>
          <el-option label="审核通过，退款中" value="1"></el-option>
          <el-option label="审核不通过" value="2"></el-option>
          <el-option label="退款成功" value="3"></el-option>
          <el-option label="退款失败" value="4"></el-option>
          <el-option label="用户取消退款" value="5"></el-option>
          <el-option label="同意退货，退款中" value="6"></el-option>
          <el-option label="不同意退货" value="7"></el-option>
          <el-option label="买家退货成功" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type @click="handleSearch" size="small">查询</el-button>
        <!-- <el-button native-type @click="handleSearch" size="small">重置</el-button> -->
      </el-form-item>
    </el-form>
    <div class="btt">
      <el-button type="primary" native-type @click="openBatchRefund" size="small">审核</el-button>
    </div>
    <el-tabs tab-position="top" type="card" v-model="tabsValue" @tab-click="handleClick">
      <el-tab-pane label="全部" name="null"></el-tab-pane>
      <el-tab-pane label="退款处理中" name="1"></el-tab-pane>
      <el-tab-pane label="退款成功" name="2"></el-tab-pane>
      <el-tab-pane label="退款关闭" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 表单列表 -->
    <el-table
      ref="multipleTable"
      :data="tableDataArray"
      stripe
      :fit="true"
      @selection-change="handleSelectionChange"
      size="medium"
      tooltip-effect="light"
    >
      <el-table-column type="selection" :selectable="checkSelectable" width="55"> </el-table-column>
      <el-table-column label="商品主图" width="80">
        <template slot-scope="scope" v-if="scope.row.orderItemVo">
          <img :src="scope.row.orderItemVo.goodsImage" class="avatar1" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="settlementRuleName" label="商品名称">
        <template slot-scope="scope" v-if="scope.row.orderItemVo">
          <span>{{ scope.row.orderItemVo.goodsName ? scope.row.orderItemVo.goodsName : '' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column show-overflow-tooltip prop="settlementDescribe" label="申请编号" ></el-table-column> -->
      <el-table-column show-overflow-tooltip prop="usedTypeCode" label="退款方式">
        <template slot-scope="scope">
          <span v-if="scope.row.refundWay == 0">仅退款</span>
          <span v-else>退款退货</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="orderNo" label="订单编号"></el-table-column>
      <el-table-column show-overflow-tooltip label="订单金额">
        <template slot-scope="scope" v-if="scope.row.orderItemVo">
          <span>{{ scope.row.orderItemVo.orderItemFee }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="refundFee" label="退款金额"></el-table-column>
      <el-table-column show-overflow-tooltip prop="createTime" label="申请时间"></el-table-column>
      <el-table-column show-overflow-tooltip prop="refundStatus" label="退款状态">
        <template slot-scope="scope">
          <span v-if="scope.row.refundStatus == 0">申请退款</span>
          <span v-if="scope.row.refundStatus == 1">审核通过,退款中</span>
          <span v-if="scope.row.refundStatus == 2">审核不通过</span>
          <span v-if="scope.row.refundStatus == 3">退款成功</span>
          <span v-if="scope.row.refundStatus == 4">退款失败</span>
          <span v-if="scope.row.refundStatus == 5">用户取消退款</span>
          <span v-if="scope.row.refundStatus == 6">同意退货</span>
          <span v-if="scope.row.refundStatus == 7">不同意退货</span>
          <span v-if="scope.row.refundStatus == 8">客户已发货</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="approveNote" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click="dispose(scope.row)"
            v-if="scope.row.refundStatus == 0"
            >处理</el-button
          >
          <el-button
            type="primary"
            size="small"
            plain
            v-else-if="scope.row.refundStatus == 8 && scope.row.refundWay == 1"
            @click="openDelivery(scope.row)"
          >
            处理
          </el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <!--处理退款弹窗-->
    <el-dialog title="处理-退款" :visible.sync="refundFeeFlag" width="450px" center>
      <div v-if="refundFeeFlag">
        <el-form size="small" label-width="130px" :model="refundForm" ref="refundForm">
          <el-form-item label="订单编号：">{{ refundInfo.orderNo }}</el-form-item>
          <el-form-item label="退款金额：">{{ refundInfo.refundFee }}</el-form-item>
          <el-form-item label="退款原因：">{{
            refundInfo.refundReason == 1 ? '商家发错' : '货物不对'
          }}</el-form-item>
          <el-form-item label="退款说明：" v-if="!!refundInfo.refundNote">{{
            refundInfo.refundNote
          }}</el-form-item>
          <div class="cut-line"></div>
          <el-form-item
            prop="refundFee"
            label="退款金额确认："
            :rules="[
              { required: true, message: '请输入退款金额', trigger: 'blur' },
              { pattern: reg, message: '请输入不小于0.01的数值', trigger: 'blur' },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  } else {
                    if (value < 0.01) {
                      callback('请输入不小于0.01的数值')
                    } else {
                      if (value > refundInfo.refundFee) {
                        callback('输入的退款金额不能大于订单总额')
                      } else {
                        callback()
                      }
                    }
                  }
                },
                trigger: 'blur'
              }
            ]"
          >
            <el-input
              clearable
              placeholder="输入金额"
              class="search-input"
              :disabled="true"
              v-model="refundForm.refundFee"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="remind">若同意全额退款，请勿修改金额，金额谨慎提交，确认无法驳回。</div>
          </el-form-item>
          <el-form-item label="处理结果：" required>
            <el-select placeholder="请选择" v-model="refundForm.refundStatus">
              <el-option label="同意退款" value="1"></el-option>
              <el-option label="不同意退款" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input :maxlength="1000" type="textarea" v-model="refundForm.refundNote"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="orderRefundAduit">确认提交</el-button>
        </div>
      </div>
    </el-dialog>
    <!--处理退货弹窗-->
    <el-dialog title="处理-退货" :visible.sync="refundGoodsFlag" width="450px" center>
      <el-form size="small" label-width="120px">
        <el-form-item label="订单编号：">{{ refundInfo.orderNo }}</el-form-item>
        <el-form-item label="退款金额：">{{ refundInfo.refundFee }}元</el-form-item>
        <el-form-item label="退款原因：">{{ refundInfo.refundReasonCode }}</el-form-item>
        <el-form-item label="退款说明：" v-if="!!refundInfo.refundNote">{{
          refundInfo.refundNote
        }}</el-form-item>
        <div class="cut-line"></div>
        <el-form-item label="处理结果：" required>
          <el-select placeholder="请选择" v-model="refundForm.refundGoodsStatus">
            <el-option label="同意退货" value="6"></el-option>
            <el-option label="不同意退货" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            :maxlength="1000"
            type="textarea"
            v-model="refundForm.refundGoodsNote"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="orderGoodsRefundAduit">确认提交</el-button>
      </div>
    </el-dialog>
    <!--处理-收货处理-->
    <el-dialog title="处理-收货处理" :visible.sync="deliveryFlag" width="450px" center>
      <el-form size="small" label-width="120px">
        <el-form-item label="订单编号：">{{ refundInfo.orderNo }}</el-form-item>
        <el-form-item label="退款金额：">{{ refundInfo.refundFee }}元</el-form-item>
        <el-form-item label="退款原因：">{{ refundInfo.refundReasonCode }}</el-form-item>
        <div class="cut-line"></div>
        <el-form-item label="到货确认：" required>
          <el-select placeholder="请选择" v-model="refundForm.refundDeliverySubmit">
            <el-option label="确认收货" value="1"></el-option>
            <el-option label="未收到货" value="2"></el-option>
            <el-option label="货物破损" value="3"></el-option>
            <el-option label="货物掉包" value="4"></el-option>
            <el-option label="其他" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="refundForm.refundDeliveryOtherReason"
            clearable
            placeholder="输入其他原因"
            :maxlength="500"
            class="search-input"
            :disabled="refundForm.refundDeliverySubmit != 5"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理结果：" required>
          <el-select placeholder="请选择" v-model="refundForm.refundDeliveryStatus">
            <el-option label="同意退款" value="1"></el-option>
            <el-option label="不同意退款" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="saveOrderGoodsRefund">确认提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="批量审核" :visible.sync="batchRefundFlag" width="600px" center>
      <el-form size="small" label-width="120px">
        <el-form-item label="审核备注：">
          <el-input :maxlength="1000" type="textarea" v-model="batchRefundNote"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="batchNoAgreeRefund">不同意退款</el-button>
        <el-button type="primary" @click="batchAgreeRefund">同意退款</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { refundApplyList, orderRefundAduit, getRefundApply } from '@/api/orderCenter/order.js'
// import { tableList } from '@/assets/js/mixin.js'
// import { refundOrder } from '@/config/api'

export default {
  // mixins: [tableList],
  data() {
    return {
      totalCount: null,
      pageNum: 1,
      pageSize: 5,
      reg: /^(\d|[1-9]\d+)(\.\d+)?$/ /* 大于0的数正则 */,
      refundFeeFlag: false /* 退款弹窗判断 */,
      refundGoodsFlag: false /* 退货弹窗 */,
      deliveryFlag: false /* 收货弹窗 */,
      numberType: '1' /* 编号类型选择 */,
      bandOrderNo: null /* 订单编号 */,
      searchOrderNo: null /* 搜索订单编号 */,
      searchRefundNo: null /* 搜索退款编号 */,
      bandBeginTime: null /* 开始时间 */,
      searchBeginTime: null /* 搜索开始时间 */,
      bandEndTime: null /* 结束时间 */,
      searchEndTime: null /* 搜索结束时间 */,
      refundWay: null /* 退款方式 */,
      searchRefundWay: null /* 搜索退款方式 */,
      refundStatus: null /* 退款状态 */,
      searchRefundStatus: null /* 搜索退款状态 */,
      tabsValue: 'null',
      status: null /* 退款状态 */,
      refundForm: {
        refundNote: null /* 退款处理备注 */,
        refundStatus: '1' /* 退款处理结果 */,
        refundFee: 0 /* 退款金额 */,

        refundGoodsNote: null /* 退货处理备注 */,
        refundGoodsStatus: '6' /* 退货处理结果 */,

        refundDeliverySubmit: '1' /* 到货确认情况 */,
        refundDeliveryOtherReason: null /* 其他原因说明 */,
        refundDeliveryStatus: '1' /* 收货处理结果 */
      },
      refundInfo: {} /* 退款订单详情信息 */,
      batchRefundFlag: false /* 批量审核弹窗状态 */,
      multipleSelection: [] /* 选中的订单 */,
      batchRefundNote: null /* 批量退款备注 */,
      tableDataArray: []
    }
  },
  created() {
    this.tableData()
  },
  methods: {
    tableData() {
      refundApplyList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        query: {
          status: this.status,
          orderNo: this.searchOrderNo,
          refundWay: this.searchRefundWay,
          refundStatus: this.searchRefundStatus,
          endTime: this.searchEndTime,
          beginTime: this.searchBeginTime
        }
      }).then((res) => {
        this.tableDataArray = res.data.records
        this.totalCount = res.data.total
        console.log(this.tableDataArray, 'this.tableDataArray')
        // let listArr = []
        // res.data.records.forEach((i) => {
        //   if (i.orderItemVo) {
        //     listArr.push(i.orderItemVo)
        //   }
        // })
        // console.log(listArr, 'listArr')
      })
      // this.postAwait(
      //   this,
      //   refundOrder.refundApplyList,
      //   {
      //     endTime: this.searchEndTime,
      //     orderNo: this.searchOrderNo,
      //     pageNo: this.currentPage,
      //     pageSize: this.pageSize,
      //     refundNo: this.searchRefundNo,
      //     refundStatus: this.searchRefundStatus,
      //     refundWay: this.searchRefundWay,
      //     startTime: this.searchBeginTime,
      //     status: this.status
      //   },
      //   (data) => {
      //     if (data.resultCode == '0000') {
      //       let list = data.responseObject.list
      //       list.map((item) => {
      //         switch (item.refundStatus) {
      //           case 0:
      //             item.refundStatusCode = '申请退款'
      //             break
      //           case 1:
      //             item.refundStatusCode = '审核通过，退款中'
      //             break
      //           case 2:
      //             item.refundStatusCode = '审核不通过'
      //             break
      //           case 3:
      //             item.refundStatusCode = '退款成功'
      //             break
      //           case 4:
      //             item.refundStatusCode = '退款失败'
      //             break
      //           case 5:
      //             item.refundStatusCode = '用户取消退款'
      //             break
      //           case 6:
      //             item.refundStatusCode = '同意退货，退款中'
      //             break
      //           case 7:
      //             item.refundStatusCode = '不同意退货'
      //             break
      //           case 8:
      //             item.refundStatusCode = '买家退货成功'
      //             break
      //           default:
      //             item.refundStatusCode = '交易结束'
      //         }
      //       })
      //       this.handleTable(arguments[0], data)
      //     }
      //   }
      // )
    },
    checkSelectable(row) {
      return row.refundStatus === 0
    },
    /* 搜索功能 */
    handleSearch() {
      if (this.bandBeginTime > this.bandEndTime) {
        this.$message.error('开始时间不能大于结束时间')
        return
      }
      this.currentPage = 1
      this.searchBeginTime = this.bandBeginTime
      this.searchEndTime = this.bandEndTime
      this.searchOrderNo = this.bandOrderNo
      this.searchRefundStatus = this.refundStatus
      this.searchRefundWay = this.refundWay
      this.tableData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.tableData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.tableData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /* 打开批量审核弹窗 */
    openBatchRefund() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'error',
          message: '请先勾选至少一个审核单'
        })
        return
      }
      if (this.multipleSelection.length > 10) {
        this.$message({
          type: 'error',
          message: '一次性最多只能批量处理10个审核单'
        })
        return
      }
      this.batchRefundNote = null
      this.batchRefundFlag = true
    },
    // 批量同意退款
    batchAgreeRefund() {
      let orderRefundAduitDatas = []
      this.multipleSelection.map((item) => {
        orderRefundAduitDatas.push({
          approveNote: this.batchRefundNote,
          realFee: item.refundFee,
          refundApplyId: item.refundApplyId,
          refundStatus: 1
        })
      })
      this.api.batchOrderRefundAduit(
        {
          orderRefundAduitDatas
        },
        (data) => {
          this.tableData()
          this.batchRefundFlag = false
          this.$message({
            type: 'success',
            message: '审核成功'
          })
        }
      )
    },
    // 批量不同意退款
    batchNoAgreeRefund() {
      let orderRefundAduitDatas = []
      this.multipleSelection.map((item) => {
        orderRefundAduitDatas.push({
          approveNote: this.batchRefundNote,
          realFee: item.refundFee,
          refundApplyId: item.refundApplyId,
          refundStatus: 2
        })
      })
      this.api.batchOrderRefundAduit(
        {
          orderRefundAduitDatas
        },
        (data) => {
          this.tableData()
          this.batchRefundFlag = false
          this.$message({
            type: 'success',
            message: '审核成功'
          })
        }
      )
    },
    /* 打开处理弹窗 */
    dispose(row) {
      this.refundForm = {
        refundNote: null /* 退款处理备注 */,
        refundStatus: '1' /* 退款处理结果 */,
        refundFee: 0 /* 退款金额 */,
        refundGoodsNote: null /* 退货处理备注 */,
        refundGoodsStatus: '6' /* 退货处理结果 */,
        refundDeliverySubmit: '1' /**/,
        refundDeliveryStatus: '1' /* 收货处理结果 */
      }
      if (row.refundWay == 0) {
        this.refundFeeFlag = true
      } else if (row.refundWay == 1) {
        this.refundGoodsFlag = true
      }
      this.getDetail(row)
    },
    /* 打开收货处理 */
    openDelivery(row) {
      this.refundForm = {
        refundNote: null /* 退款处理备注 */,
        refundStatus: '1' /* 退款处理结果 */,
        refundFee: 0 /* 退款金额 */,
        refundGoodsNote: null /* 退货处理备注 */,
        refundGoodsStatus: '6' /* 退货处理结果 */,
        refundDeliverySubmit: '1' /**/,
        refundDeliveryStatus: '1' /* 收货处理结果 */,
        refundDeliveryNote: null /* 收货处理备注 */
      }
      this.deliveryFlag = true
      this.getDetail(row)
    },
    /* 获取订单详情 */
    getDetail(row) {
      // this.postAwait(
      //   this,
      //   refundOrder.getRefundApply,
      //   {
      //     refundApplyId: row.refundApplyId
      //   },
      //   (data) => {
      //     if (data.resultCode == '0000') {
      //       let res = data.responseObject
      //       if (res.refundReason == 1) {
      //         res.refundReasonCode = '订单信息拍错（规格/数量等）'
      //       } else if (res.refundReason == 2) {
      //         res.refundReasonCode = '电话信息/姓名/身份证等填写错误'
      //       } else if (res.refundReason == 3) {
      //         res.refundReasonCode = '计划有变，不想参加活动了'
      //       } else if (res.refundReason == 4) {
      //         res.refundReasonCode = '活动因故取消'
      //       } else if (res.refundReason == 5) {
      //         res.refundReasonCode = '商家发错/货物不对'
      //       } else if (res.refundReason == 6) {
      //         res.refundReasonCode = '其他原因'
      //       }
      //       this.refundInfo.refundFee = this.refundInfo.refundFee
      //       this.refundForm.refundFee = res.refundFee
      //       this.refundInfo = res
      //     }
      //   }
      // )
      getRefundApply(row.refundApplyId).then((res) => {
        console.log(res, 'res')
        this.refundInfo = res.data
      })
    },
    /* 退款审核 */
    orderRefundAduit() {
      this.$refs.refundForm.validate((valid) => {
        if (valid) {
          // this.postAwait(
          //   this,
          //   refundOrder.orderRefundAduit,
          //   {
          //     approveNote: this.refundForm.refundNote,
          //     realFee: this.refundForm.refundFee,
          //     refundApplyId: this.refundInfo.refundApplyId,
          //     refundStatus: this.refundForm.refundStatus
          //   },
          //   (data) => {
          //     if (data.resultCode == '0000') {
          //       this.messageSuccess('审核成功')
          //       this.tableData()
          //       this.refundFeeFlag = false
          //     }
          //   }
          // )
          orderRefundAduit({
            approveNote: this.refundForm.refundNote,
            realFee: this.refundForm.refundFee,
            refundApplyId: this.refundInfo.refundApplyId,
            refundStatus: this.refundForm.refundStatus
          }).then((res) => {
            console.log(res, 'res')
          })
        }
      })
    },
    /* 审核退款退货 */
    // orderGoodsRefundAduit() {
    //   this.postAwait(
    //     this,
    //     refundOrder.orderGoodsRefundAduit,
    //     {
    //       approveNote: this.refundForm.refundGoodsNote,
    //       refundApplyId: this.refundInfo.refundApplyId,
    //       refundStatus: this.refundForm.refundGoodsStatus
    //     },
    //     (data) => {
    //       if (data.resultCode == '0000') {
    //         this.messageSuccess('审核成功')
    //         this.tableData()
    //         this.refundGoodsFlag = false
    //       }
    //     }
    //   )
    // },
    /* 收货处理确认 */
    // saveOrderGoodsRefund() {
    //   if (this.refundForm.refundDeliverySubmit != 5) {
    //     this.refundForm.refundDeliveryOtherReason = null
    //   }
    //   this.postAwait(
    //     this,
    //     refundOrder.saveOrderGoodsRefund,
    //     {
    //       deliverOther: this.refundForm.refundDeliveryOtherReason,
    //       deliverStatus: this.refundForm.refundDeliverySubmit,
    //       refundApplyId: this.refundInfo.refundApplyId,
    //       refundStatus: this.refundForm.refundDeliveryStatus
    //     },
    //     (data) => {
    //       if (data.resultCode == '0000') {
    //         this.messageSuccess('处理成功')
    //         this.tableData()
    //         this.deliveryFlag = false
    //       }
    //     }
    //   )
    // },
    // 不同状态订单切换
    handleClick(tab, event) {
      console.log(tab.name, 'tab')
      console.log(event, 'event')
      this.status = Number(tab.name)
      this.currentPage = 1
      this.tableData()
    }
  }
}
</script>
<style lang="scss" scoped>
.btt {
  margin: 20px 0 20px 0;
}
.demo-form-inline {
  background-color: #fff;
  padding: 19px 0px 3px 15px;
}
#refund-order {
  .search-input {
    width: 230px;
  }
  .avatar1 {
    width: 60px;
    height: 60px;
  }
  .cut-line {
    margin-top: 10px;
    margin-bottom: 10px;
    @include bb(1px);
  }
  .btn {
    text-align: center;
  }
  .remind {
    color: #999999;
  }
}
.page {
  margin-left: 33.5%;
}
</style>
