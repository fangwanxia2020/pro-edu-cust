<template>
  <!-- 合作意向 -->
  <div>
    <!-- 查询 -->
    <div class="serachModule">
      <el-form :model="queryParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="我的需求" prop="demand">
              <el-input
                v-model="queryParams.demand"
                placeholder="请输入我的需求"
                clearable
                size="small"
                style="width: 80%"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对方供给" prop="supply">
              <el-input
                v-model="queryParams.supply"
                placeholder="请输入对方供给"
                clearable
                size="small"
                style="width: 80%"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="40px">
              <el-button type="primary" size="small" @click="handleQueryClick">搜索</el-button>
              <el-button size="small" @click="resetQuery">重置</el-button>
              <el-button type="text" size="medium" @click="isShow = !isShow"
                >高级查询 <i :class="[isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <div v-show="isShow">
          <el-row>
            <el-col :span="8">
              <el-form-item label="对方能力" prop="ability">
                <el-input
                  v-model="queryParams.ability"
                  placeholder="请输入对方能力"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="对方企业名称" prop="orgName">
                <el-input
                  v-model="queryParams.orgName"
                  placeholder="请输入对方企业名称"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="contactName">
                <el-input
                  v-model="queryParams.contactName"
                  placeholder="请输入联系人"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="contactPhone">
                <el-input
                  v-model="queryParams.contactPhone"
                  placeholder="请输入联系电话"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="推荐时间" prop="customerContact">
                <el-date-picker
                  style="width: 80%"
                  v-model="timeData"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleChangeDate"
                  value-format="yyyy-MM-dd"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="btns-bar">
      <el-button type="primary" size="small" @click="auto()">自动推荐</el-button>
    </div>
    <div class="intention-list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in listTypeArr"
          :key="item.dictValue"
          :label="item.dictLabel"
          :name="item.dictValue"
        >
          <span slot="label">{{ item.dictLabel }}({{ item.num }})</span>
        </el-tab-pane>
      </el-tabs>
      <ty-table
        v-if="columns"
        :columns="columns"
        :data="tableData"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
        :pager="page"
        :showSelect="false"
        :showIndex="false"
        :border="false"
        @sort-change="handleSortChange"
      >
        <template #btnsBar>
          <div class="btns-bar"></div>
        </template>
        <template #operation="{ row }">
          <div>
            <el-button size="mini" type="text" @click="editIntention(row)">查看详情</el-button>
            <el-button
              size="mini"
              :disabled="canContact(row)"
              type="text"
              @click="handlePushKF(row)"
              >咨询</el-button
            >
            <el-button v-if="showAttention(row)" size="mini" type="text" @click="editStatus(row, 1)"
              >关注</el-button
            >
            <el-button size="mini" type="text" @click="followRecord(row)">跟进记录</el-button>
            <el-button v-if="showIgnore(row)" size="mini" type="text" @click="editStatus(row, 2)"
              >忽略</el-button
            >
            <el-button size="mini" type="text" @click="followUp(row)">跟进</el-button>
            <el-button size="mini" type="text" @click="sign(row)">签订合同</el-button>
            <el-button size="mini" type="text" @click="newCooperation(row)">创建合作</el-button>
          </div>
        </template>
      </ty-table>
      <ve-dialog
        :content="content"
        :visible.sync="dialogVisible"
        :source="source"
        :recommendedEnterpriseRelId="recommendedEnterpriseRelId"
      ></ve-dialog>
    </div>
  </div>
</template>
<script>
import {
  demandMatchingList,
  demandCount,
  editRecommendedEnterpriseRelStatus,
  autoRecommendedEnterprise
} from '@/api/cooperation/needMatch'
import veDialog from '@/views/cooperation/components/SelectPeople/VeDialog.vue'
import { getDictMultiple, selectDictLabel, getOptions } from '@/utils/tool'
import { getColumns } from './jsonData.js'

export default {
  components: {
    veDialog
  },
  data() {
    return {
      recommendedEnterpriseRelId: null,
      source: 2,
      isShow: false,
      sys_cooperation_model: [],
      timeData: [],
      // 0-待处理，1-已关注，2-已忽略，3-已签订合同
      listTypeArr: [
        // {
        //   name: "待处理",
        //   id: "0",
        //   num: 0,
        // },
        // {
        //   name: "已关注",
        //   id: "1",
        //   num: 0,
        // },
        // {
        //   name: "已忽略",
        //   id: "2",
        //   num: 0,
        // },
        // {
        //   name: "已签订合同",
        //   id: "3",
        //   num: 0,
        // },
        // {
        //   name: "全部",
        //   id: "null",
        //   num: 2,
        // },
      ],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      activeName: '0',
      tableData: [],
      content: {},
      columns: null,
      searchDateRangShow: false,
      dialogVisible: false,
      selectRows: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        belongOrgId: this.$store.state.user.userInfo.orgId,
        pageSize: 10,
        demand: '',
        supply: '',
        ability: '',
        orgName: '',
        beginTime: '',
        status: 0,
        endTime: '',
        contactName: '',
        contactPhone: ''
      }
    }
  },
  computed: {
    isChange() {
      return this.selectRows.length > 0
    },
    showAttention() {
      return function (row) {
        return row.status !== 1
      }
    },
    showIgnore() {
      return function (row) {
        return row.status !== 2
      }
    },
    // 自己不能咨询自己
    canContact() {
      return function (row) {
        const { orgId } = this.$store.state.user.userInfo
        const { recommendedOrgId } = row
        return recommendedOrgId == orgId
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { sys_matching_tag: tag } = await getDictMultiple(['sys_matching_tag'])
      tag.forEach((item) => {
        item.num = 0
      })
      this.listTypeArr = [...tag]
      this.listTypeArr.push({
        dictValue: null,
        dictLabel: '全部',
        num: 0
      })
      this.columns = await getColumns()
      const { orgId } = this.$store.state.user.userInfo
      this.resetList()
      this.queryParams.status = this.listTypeArr[0].dictValue
      this.activeName = this.listTypeArr[0].dictValue
    },
    // 自动获取刷新列表
    async auto() {
      const res = await autoRecommendedEnterprise()
      this.$message.success('获取成功')
      this.resetList()
    },
    // 修改合作意向状态
    async editStatus(row, status) {
      // 先写死
      // 状态：0-待处理，1-已关注，2-已忽略，3-已发送合作意向 (字典类型：sys_matching_tag)
      let text = Number(status) === 1 ? '关注' : '忽略'
      this.confirm(`是否确认${text}该需求？`, async () => {
        let params = {
          recommendedEnterpriseRelId: row.recommendedEnterpriseRelId,
          status
        }
        let res = await editRecommendedEnterpriseRelStatus(params)
        this.$message.success('修改成功')
        this.resetList()
      })
    },
    async resetList() {
      // const { orgId } = this.$store.state.user.userInfo
      // const res = await demandCount(orgId)
      // if (res.data) {
      //   let { all, follow, ignore, pending, send } = res.data
      //   this.listTypeArr[0].num = pending
      //   this.listTypeArr[1].num = follow
      //   this.listTypeArr[2].num = ignore
      //   this.listTypeArr[3].num = send
      //   this.listTypeArr[4].num = all
      // }

      this.getList()
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      console.log('111')
      let sendData = {
        ...this.queryParams
        // pageNum: this.page.pageNo,
        // pageSize: this.page.limit
      }
      demandMatchingList(sendData).then((response) => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        let { all, follow, ignore, pending, send } = response.data.countVo
        this.listTypeArr[0].num = pending
        this.listTypeArr[1].num = follow
        this.listTypeArr[2].num = ignore
        this.listTypeArr[3].num = send
        this.listTypeArr[4].num = all
        this.loading = false
      })
    },
    /**
     * @order ascending 升序   descending 降序
     * @prop 绑定的字段
     */
    handleSortChange({ order, prop }) {
      const orderMap = {
        ascending: true,
        descending: false
      }
      const sortType = orderMap[order]
      if (order) {
        // ifAsc 匹配度升序,false 为减序 true 为升序
        this.queryParams.ifAsc = sortType
      } else {
        delete this.queryParams.ifAsc
      }
      this.getList()
    },
    // 选择时间
    handleChangeDate(e) {
      if (e) {
        let [beginTime, endTime] = e
        this.queryParams.beginTime = `${beginTime} 00:00:00`
        this.queryParams.endTime = `${endTime} 23:59:59`
      } else {
        this.queryParams.beginTime = ''
        this.queryParams.endTime = ''
      }
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.queryParams.pageSize = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    // 切换tabs
    handleClick(tab, event) {
      console.log(tab)
      console.log(event)
      this.queryParams.pageNum = 1
      if (this.activeName !== '4') {
        this.queryParams.status = this.activeName
      } else {
        this.queryParams.status = null
      }
      this.getList()
      // this.getNum();
    },
    // 签订合同
    sign(row) {
      this.$router.push({
        path: '/customerContracts/add',
        query: {
          recommendedEnterpriseRelId: row.recommendedEnterpriseRelId,
          name: 'needMatch'
        }
      })
    },
    // 跟进弹窗
    followUp(row) {
      this.recommendedEnterpriseRelId = row.recommendedEnterpriseRelId
      this.dialogVisible = true
    },
    // 跟进记录
    followRecord(row) {
      console.log(row.recommendedEnterpriseRelId, 'osadhoiwqndkansd')
      this.$router.push({
        path: '/needMatch/record',
        query: {
          recommendedEnterpriseRelId: row.recommendedEnterpriseRelId,
          source: 2
        }
      })
    },
    editIntention(row) {
      this.$router.push({
        path: '/market/profession',
        query: {
          cooperationDemandId: row.recommendedDemandId,
          recommendedEnterpriseRelId: row.recommendedEnterpriseRelId
        }
      })
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection)
      this.selectRows = selection
    },
    // 新增
    addIntention() {
      // this.$router.push({
      //   path: '/supplierManage/add'
      // })
      this.newWindow('newPartner')
    },

    // 新建合作
    newCooperation(row) {
      this.$router.push({
        path: '/cooperativeManage/add',
        query: {
          backUrl: '/cooperation/needMatch'
        }
      })
    },
    // 详情
    detailIntention(row) {
      this.$router.push({
        path: '/supplierManage/details',
        query: {
          supplierId: row.supplierId,
          flag: 1
        }
      })
    },
    // 跳转到一对一客服页
    handlePushKF(row) {
      let { enterpriseId: orgId, adminUserId: userId, orgName: custUserName } = row
      this.$router.push({
        path: `/market/oneOnlineService`,
        query: {
          type: 1,
          orgId, // 组织id
          userId, // 用户id
          custUserName
        }
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
      // this.getNum();
    },
    handleQueryClick() {
      this.handleQuery()
      this.isShow = false
    },
    /** 重置按钮操作 */
    resetQuery() {
      //   this.queryParams = {}
      this.queryParams.beginTime = ''
      this.queryParams.endTime = ''
      this.timeData = ''
      this.isShow = false
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
<style scoped lang="scss">
.btns-bar {
  margin: 20px 0;
}
.intention-list {
  padding: 10px;
  background: #fff;
  // margin-top: 20px;
}
.high-search-crud ::v-deep {
  .searchBox-high-operator-bar {
    display: none;
  }
}
.serachModule {
  background: #fff;
  padding-top: 20px;
  padding-bottom: 12px;
  .el-form-item {
    margin-bottom: 11px !important;
  }
  .el-tabs__nav-wrap::after {
    height: 0px !important;
  }
}
</style>
