<template>
  <div id="order-detail">
    <div class="header border">
      <div class="head-top">
        <span class="title">团详情</span>
        <!-- <el-button class="to-back" @click="toBack">返回</el-button> -->
      </div>
      <div class="head-content commom-txt">
        <div>
          <div>
            <span class="txtcolor">团号：{{ detailData.teamOrderNo }}</span>
            <span class="txtcolor">团名称：{{ detailData.goodsName }}</span>
            <span class="txtcolor">团类型：{{ groupType != 1 ? '研学团' : '散客团' }}</span>
            <span class="txtcolor"
              >是否指定人员参团：{{ detailData.activityAppoint == 1 ? '是' : '否' }}</span
            >
            <span class="txtcolor">组团开始时间：{{ detailData.createTime }}</span>
            <span class="txtcolor">组团结束时间：{{ detailData.endTime }}</span>
            <span class="txtcolor">成团规则：团人数不限制，组团时间结束后自动成团</span>
          </div>
          <div>
            <span class="txtcolor">活动出发日期: {{ detailData.departureDate }}</span>
            <span class="txtcolor">参团单位: {{ detailData.teamName }}</span>
            <span class="txtcolor">参团班级: {{ detailData.classNames }}</span>
            <span class="txtcolor">付款：订单由多人支付</span>
          </div>
        </div>
        <!-- <p>团号：{{detailData.teamOrderNo}}</p> -->
        <div class="con-detail">
          <img :src="detailData.goodsImg" alt="商品图片" />
          <div class="detail-c">
            <p>{{ detailData.goodsName }}</p>
            <!-- <p>参团人数：{{detailData.teamNum}}</p> -->
            <p>名单人数：{{ detailData.totalNum }}</p>
          </div>
          <!-- <span class="jitituan" v-if="groupType != 1">研学团</span>
          <span class="jitituan" v-else>散客团</span> -->
        </div>
      </div>
      <!-- <p class="commom-txt">参团单位：{{detailData.teamName}}</p> -->
      <p class="order-detail" @click="isShowOrderDetail = true">订单明细></p>
    </div>
    <div class="content border" v-loading="tableLoading">
      <p class="c-title">
        <span
          class="c-t-item"
          :class="{ activeItem: !isTravalTogether }"
          @click="isTravalTogether = false"
          >团成员名单</span
        >
        <span
          class="c-t-item"
          :class="{ activeItem: isTravalTogether }"
          @click="isTravalTogether = true"
          style="margin-left: 25px"
          >出游同行人</span
        >
      </p>
      <div v-if="!isTravalTogether">
        <!-- <div v-if="groupType != 0 && ackStatus != 1" style="margin-bottom: 15px">
          <el-button type="primary" @click="editContactList" v-if="!contactListEditable"
            >编辑名单</el-button
          >
          <template v-else>
            <el-button type="primary" @click="saveContact">完成</el-button>
            <el-button type="primary" @click="addContact">添加名单</el-button>
          </template>
        </div> -->
        <p v-if="detailData.contactList.length == 0" style="text-align: center">暂无数据</p>
        <table class="table-upload" :class="{ editable: contactListEditable }" v-else>
          <tr class="table-head">
            <td style="min-width: 30px">序号</td>
            <td style="min-width: 80px">年级</td>
            <td style="min-width: 80px">班级</td>
            <td style="min-width: 60px">角色</td>
            <td style="min-width: 50px"><i>*</i>姓名</td>
            <td style="width: 50px">性别</td>
            <td style="min-width: 100px">证件类型</td>
            <td style="min-width: 152px">证件号码</td>
            <td style="min-width: 50px">监护人称谓</td>
            <td style="min-width: 100px">监护人姓名</td>
            <td style="min-width: 100px"><i>*</i>监护人电话</td>
            <td style="width: 30px">血型</td>
            <td style="width: 30px">身高（CM）</td>
            <td v-if="contactListEditable">操作</td>
          </tr>
          <template v-for="(item, index) in detailData.contactList">
            <tr :key="index" class="table-tr" v-if="!item.deleteFlag">
              <template v-if="!contactListEditable">
                <td>{{ index + 1 }}</td>
                <td>{{ item.grade }}</td>
                <td>{{ item.stuClass }}</td>
                <!-- <td>{{item.roleType==0?'学生':item.roleType==1?'老师':''}}</td> -->
                <td>
                  {{
                    item.roleType == 0
                      ? '学生'
                      : item.roleType == 1
                      ? '老师'
                      : item.roleType == -1
                      ? '非学生'
                      : item.roleType == 2
                      ? '家委'
                      : item.roleType == 3
                      ? '家长'
                      : ''
                  }}
                </td>
                <td>{{ item.memberName }}</td>
                <td>{{ item.sex == 0 ? '女' : item.sex == 1 ? '男' : '' }}</td>
                <td>
                  {{
                    item.licenseType == 0
                      ? '身份证'
                      : item.licenseType == 1
                      ? '军官照'
                      : item.licenseType == 2
                      ? '护照'
                      : item.licenseType == 4
                      ? '台湾通行证'
                      : item.licenseType == 5
                      ? '回乡证'
                      : item.licenseType == 6
                      ? '台胞证'
                      : item.licenseType == 6
                      ? '士兵证'
                      : '其他'
                  }}
                </td>
                <td>{{ item.ilicenseNo }}</td>
                <td>{{ item.guardianAppellation }}</td>
                <td>{{ item.guardianName }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.bloodType }}</td>
                <td>{{ item.height }}</td>
              </template>
              <template v-else>
                <td>{{ index + 1 }}</td>
                <td>
                  <el-input v-model="item.grade" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-input v-model="item.stuClass" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <!-- <el-select v-model="item.roleType" clearable>
                            <el-option label="学生" :value="0"></el-option>
                            <el-option label="非学生" :value="-1"></el-option>
              </el-select>-->
                  <el-select
                    v-if="item.roleType == 1"
                    v-model="item.roleType"
                    clearable
                    :disabled="item.roleType == 1"
                  >
                    <el-option label="老师" :value="1"></el-option>
                  </el-select>
                  <el-select v-else v-model="item.roleType" clearable>
                    <el-option label="学生" :value="0"></el-option>
                    <el-option label="非学生" :value="-1"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.memberName" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-select v-model="item.sex" :disabled="item.roleType == 1">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="item.licenseType" :disabled="item.roleType == 1">
                    <el-option label="身份证" :value="0"></el-option>
                    <el-option label="军官证" :value="1"></el-option>
                    <el-option label="护照" :value="2"></el-option>
                    <el-option label="台湾通行证" :value="4"></el-option>
                    <el-option label="回乡证" :value="5"></el-option>
                    <el-option label="台胞证" :value="6"></el-option>
                    <el-option label="士兵证" :value="7"></el-option>
                    <el-option label="其他" :value="3"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.ilicenseNo" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-input
                    v-model="item.guardianAppellation"
                    :disabled="item.roleType == 1"
                  ></el-input>
                </td>
                <td>
                  <el-input v-model="item.guardianName" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-input v-model="item.phone" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-input v-model="item.bloodType" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-input v-model="item.height" :disabled="item.roleType == 1"></el-input>
                </td>
                <td>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click="showDelContact(item, index)"
                    :disabled="item.roleType == 1"
                    >删除</el-button
                  >
                </td>
              </template>
            </tr>
          </template>
        </table>
        <div class="del-contact-record" v-if="groupType != 1">
          <p style="margin: 15px 0">名单删除记录</p>
          <p v-if="detailData.deleteMemberList.length == 0" style="text-align: center">暂无数据</p>
          <table class="table-upload" v-else>
            <tr class="table-head">
              <td>姓名</td>
              <td>性别</td>
              <td>身份证号</td>
              <td>删除原因</td>
            </tr>
            <tr v-for="(item, index) in detailData.deleteMemberList" :key="index" class="table-tr">
              <td>{{ item.memberName }}</td>
              <td>{{ item.sex == 0 ? '女' : '男' }}</td>
              <td>{{ item.ilicenseNo }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 出游同行人表格 -->
      <div v-else>
        <el-table
          :data="travalTogetherList"
          stripe
          :border="false"
          style="width: 100%"
          :cell-style="{ padding: 0 }"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="orderContact.memberName" label="*出游陪同人姓名"></el-table-column>
          <el-table-column prop="orderContact.sex" label="性别" width="60">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.orderContact.sex == 0">女</span>
                <span v-if="scope.row.orderContact.sex == 1">男</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderContact.phone" label="*出游陪同人电话"></el-table-column>
          <el-table-column
            prop="orderContact.dateOfBirth"
            label="生日"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="orderContact.nationality"
            label="国籍"
            width="80"
          ></el-table-column>
          <el-table-column prop="orderContact.bloodType" label="血型" width="60"></el-table-column>
          <el-table-column prop="orderContact.allergyHistory" label="过敏史"></el-table-column>
          <el-table-column prop="orderContact.licenseType" label="证件类型">
            <template slot-scope="scope">
              <div>
                <!-- 证件类型（0-身份证 1-军官照 2-护照 3-其它） -->
                <span v-if="scope.row.orderContact.licenseType == 0">身份证</span>
                <span v-else-if="scope.row.orderContact.licenseType == 1">军官照</span>
                <span v-else-if="scope.row.orderContact.licenseType == 2">护照</span>
                <span v-else-if="scope.row.orderContact.licenseType == 3">其他</span>
                <span v-else-if="scope.row.orderContact.licenseType == 4">台湾通行证</span>
                <span v-else-if="scope.row.orderContact.licenseType == 5">回乡证</span>
                <span v-else-if="scope.row.orderContact.licenseType == 6">台胞证</span>
                <span v-else-if="scope.row.orderContact.licenseType == 7">士兵证</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderContact.ilicenseNo" label="证件号"></el-table-column>
          <el-table-column prop="memberName" label="出游人姓名"></el-table-column>
          <el-table-column prop="phone" label="出游人电话"></el-table-column>
          <el-table-column
            prop="orderContact.relation"
            label="与出游人关系"
            width="80"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div class="content border">
            <p class="c-title">团领队</p>
    <p  style="text-align:center;">暂无数据</p>-->
    <!-- <table class="table-upload" v-else>
                <tr class="table-head">
                    <td>序号</td>
                    <td><i>*</i>班级</td>
                    <td><i>*</i>角色</td>
                    <td><i>*</i>姓名</td>
                    <td><i>*</i>性别</td>
                    <td><i>*</i>身份证号</td>
                    <td><i>*</i>监护人称谓</td>
                    <td><i>*</i>监护人姓名</td>
                    <td><i>*</i>监护人电话</td>
                    <td>血型</td>
                    <td>身高（CM）</td>
                </tr>
                <tr v-for="(item,index) in detailData.contactList" :key="index" class="table-tr">
                    <td>{{index}}</td>
                    <td>{{item.stuClass}}</td>
                    <td>{{item.guardianAppellation}}</td>
                    <td>{{item.memberName}}</td>
                    <td>{{item.sex==0?'女':'男'}}</td>
                    <td>{{item.ilicenseNo}}</td>
                    <td>{{item.guardianAppellation}}</td>
                    <td>{{item.guardianName}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.bloodType}}</td>
                    <td>{{item.height}}</td>
                </tr>
    </table>-->
    <!-- </div> -->
    <!-------------------------------------------- 弹窗-订单明细 -------------------------------------------->
    <el-dialog title="子订单明细" width="600px" :visible.sync="isShowOrderDetail" center>
      <p v-if="detailData.childOrderInfoList.length == 0" style="text-align: center">暂无数据</p>
      <div v-else>
        <table class="table-upload">
          <tr class="table-head1">
            <td>订单号</td>
            <td>出行人数</td>
            <td>出行人</td>
            <td>状态</td>
          </tr>
          <tr v-for="(item, index) in detailData.childOrderInfoList" :key="index">
            <td>{{ item.orderNo }}</td>
            <td>{{ item.personNumber }}</td>
            <td>{{ item.contactName }}</td>
            <td v-if="item.orderStatus == 0">待付款</td>
            <td v-else-if="item.orderStatus == 1">已付款</td>
            <td v-else-if="item.orderStatus == 5">订单超时无效</td>
            <td v-else-if="item.orderStatus == 7">后台取消订单</td>
            <td v-else-if="item.orderStatus == 8">评价完成</td>
            <td v-else-if="item.orderStatus == 9">客户退款退货</td>
            <td v-else-if="item.orderStatus == 13">完成</td>
            <td v-else-if="item.orderStatus == 30">待传名单</td>
            <td v-else-if="item.orderStatus == 31">报名中</td>
            <td v-else-if="item.orderStatus == 32">绑定手环</td>
            <td v-else-if="item.orderStatus == 33">待消费</td>
            <td v-else-if="item.orderStatus == 34">进行中</td>
            <td v-else-if="item.orderStatus == 98">合同付款申请不通过</td>
            <td v-else-if="item.orderStatus == 99">合同付款申请审核中</td>
            <td v-else-if="item.orderStatus == 100">合同付款申请已通过</td>
            <td v-else-if="item.orderStatus == 35">关闭</td>
            <td v-else></td>
          </tr>
        </table>
        <div style="margin-top: 20px; text-align: right">
          <el-button type="primary" @click="isShowOrderDetail = false">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-------------------------------------------- 弹窗-删除名单 -------------------------------------------->
    <el-dialog title :show-close="false" :visible.sync="delContactVisible" width="400px">
      <span>是否删除名单？</span>
      <el-input type="textarea" v-model="delContactReason"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delContactVisible = false">取 消</el-button>
        <el-button type="primary" @click="delContact">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { groupDetail } from '@/api/yanxue/outGroup.js'

export default {
  data() {
    return {
      orderProjectId: null,
      detailData: {
        contactList: [],
        childOrderInfoList: [],
        deleteMemberList: []
      },
      isShowOrderDetail: false,
      groupType: null, // 团类型
      ackStatus: null, // 确认名单
      contactListEditable: false, // 表格名单编辑状态
      delContactVisible: false, // 删除名单弹窗
      delContactItem: {}, // 删除名单项
      delContactItemIndex: null, // 删除名单项索引
      delContactReason: '', // 删除团名单原因
      // delContactList: [], // 名单删除记录
      tableLoading: false, // 表格数据加载
      operationNbr: null,
      isTravalTogether: false, // 是否出游同行人
      travalTogetherList: [] // 同行人列表
    }
  },
  created() {
    this.orderProjectId = this.$route.query.orderProjectId
    // this.groupType = this.$route.query.groupType
    this.ackStatus = this.$route.query.ackStatus
    this.operationNbr = this.$route.query.operationNbr
    this.getTeamOrderInfoByPOrderId()
  },
  methods: {
    // 编辑团名单
    editContactList() {
      this.contactListEditable = true
    },
    // 完成团名单
    saveContact() {
      // -----------验证输入框-----------
      let contactList = JSON.parse(JSON.stringify(this.detailData.contactList))
      let nameStatus = true // 循环名单数据，添加到请求参数
      let phoneStatus = true
      let phoneCheck = true
      let studentStatus = true
      console.log('contactList', contactList)
      contactList.map((el) => {
        // 如果其中有没填写的名字
        if (!el.memberName) {
          nameStatus = false
        }
        // 如果其中有没填写的手机号
        // else if (!el.phone=='' || el.phone=='') {
        //   phoneStatus = false;
        // }
        else if (!this.check.regPhone(el.phone) && el.phone != '/') {
          phoneCheck = false
        } else if (!el.stuClass) {
          if (el.roleType == 0) {
            studentStatus = false
          }
        }
      })
      if (!nameStatus) {
        this.messageErr('请填写姓名')
        return
      }
      // else if (!phoneStatus) {
      //   this.messageErr("请填写手机号");
      //   return;
      // }
      if (!phoneCheck) {
        this.messageErr('请填写正确的手机号或者填写“/”')
        return
      }
      if (!studentStatus) {
        if (this.groupType == '0') {
          this.messageErr('学生请填写班级')
          return
        }
      }

      this.deleteMemberByOrderContactId()
    },
    // 添加团名单
    addContact() {
      this.detailData.contactList.unshift({ isNew: true })
    },
    // 弹窗-删除团名单
    showDelContact(item, index) {
      if (item.isNew) {
        this.detailData.contactList.splice(index, 1)
        return
      }
      // 保存当前行，点击的删除名单+索引
      this.delContactItem = item
      this.delContactItemIndex = index
      // 显示弹窗
      this.delContactVisible = true
    },
    // 删除团名单
    delContact() {
      let delContactItem = JSON.parse(JSON.stringify(this.delContactItem))
      // delContactItem.delContactReason = this.delContactReason;
      delContactItem.remark = this.delContactReason
      // 如果有删除接口，则调用接口
      // this.deleteMemberByOrderContactId(delContactItem)
      // 添加到删除记录
      this.detailData.deleteMemberList.push(delContactItem)
      this.detailData.contactList[this.delContactItemIndex].deleteFlag = 1

      // 初始化，并隐藏弹窗
      this.delContactItem = {}
      this.delContactItemIndex = null
      this.delContactReason = null // 删除原因
      this.delContactVisible = false
    },
    // 删除团名单接口
    deleteMemberByOrderContactId() {
      let postData = []
      this.detailData.deleteMemberList.forEach((el) => {
        postData.push({
          orderContactId: el.orderContactId,
          remark: el.remark || ''
        })
      })
      this.api.deleteMemberByOrderContactId(postData, (data) => {
        this.editMemberList()
      })
    },

    // 查询研学团体订单详情
    getTeamOrderInfoByPOrderId() {
      this.tableLoading = true
      groupDetail(this.orderProjectId).then((res) => {
        let data = res.data.teamOrderPoJoInfoVO
        this.tableLoading = false
        this.detailData = data
        this.detailData.goodsImg = res.data.goodsImage
        this.groupType = this.detailData.groupType
        this.detailData.teamNum = data.contactList.length // 出游同行人
        let travalTogetherList = []
        if (data.orderContactInfoVOList && data.orderContactInfoVOList.length > 0) {
          data.orderContactInfoVOList.map((el) => {
            if (
              el.pedestrianInformationListVOList &&
              el.pedestrianInformationListVOList.length > 0
            ) {
              el.pedestrianInformationListVOList.map((elp) => {
                elp.phone = el.phone
                elp.memberName = el.memberName
              })
              travalTogetherList = [...travalTogetherList, ...el.pedestrianInformationListVOList]
            }
          })
        }
        console.log('出游同行人：', travalTogetherList)
        this.travalTogetherList = travalTogetherList
      })
    },
    // 返回
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.border {
  padding: 15px;
  border: 1px solid #ccc;
}
.title {
  color: #111;
}
.head-top {
  margin-bottom: 10px;
}
.to-back {
  float: right;
}
.commom-txt {
  color: #606266;
  font-size: 12px;
}
.con-detail {
  position: relative;
  margin: 5px 0;
  padding: 5px 0;
  background: #eee;
  img {
    display: inline-block;
    width: 60px;
    height: 60px;
    vertical-align: sub;
  }
}
.detail-c {
  margin-left: 10px;
  display: inline-block;
  line-height: 30px;
}
.jitituan {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.order-detail {
  display: inline-block;
  margin: 10px 0 0 0;
  color: #0378c3;
  font-size: 12px;
  cursor: pointer;
}
.content {
  margin: 20px 0;
  color: #111;
}
.c-title {
  margin-bottom: 10px;
  .c-t-item {
    cursor: pointer;
  }
  .c-t-item.activeItem,
  .c-t-item:hover {
    color: #0378c3;
  }
}
.table-upload,
// .table-upload tr th,
.table-upload tr td {
  background: #fff;
  font-size: 14px;
  border: 1px solid #e2e8ed;
}
.table-head td {
  color: #909399;
  font-weight: bold;
}
.table-upload tr {
  // border-bottom: 1px solid #ccc;
}
.table-tr:nth-child(2n + 1) {
  background: #fafafa;
}
.table-upload {
  width: 100%;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.table-head1 {
  td:nth-child(1) {
    width: 200px;
  }
  td:nth-child(2) {
    width: 80px;
  }
  td:nth-child(3) {
    width: 150px;
  }
}
.table-head,
.table-tr {
  td {
    // padding: 0 20px;
    padding: 10px 4px;
    text-align: center;
  }
  i {
    // color: red;
  }
}
.editable {
  .table-tr td {
    // padding: 5px 10px;
    padding: 2px;
  }
  .el-input__inner {
    border: none;
  }
}
.txtcolor {
  color: #606266;
  font-size: 13px;
  margin-right: 30px;
  line-height: 25px;
}
.table-upload tr td,
.table-upload tr {
  padding: 10px 10px;
  border-left: none;
  border-right: none;
}
.table-upload {
  border: none;
}
// table {
//   border-collapse: separate;
//   text-indent: initial;
//   border-spacing: 2px;
// }
table {
  border-collapse: collapse;
}
.table-upload tr:first-child {
  border-top: none;
}
</style>
