<template>
  <!-- 合作意向 -->
  <div>
    <!-- 查询 -->
    <div class="serachModule">
      <el-form :model="queryParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="orgName">
              <el-input
                v-model="queryParams.orgName"
                placeholder="请输入企业名称"
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

        <template v-if="isShow">
          <el-row>
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
              <el-form-item label="合作模式" prop="cooperativeModel">
                <el-select
                  style="width: 80%"
                  clearable
                  size="small"
                  v-model="queryParams.cooperativeModel"
                  placeholder="请选择"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="(value, index) in sys_cooperation_model"
                    :key="index"
                    :label="value.dictLabel"
                    :value="value.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业名称" prop="majorName">
                <el-input
                  v-model="queryParams.majorName"
                  placeholder="请输入专业名称"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="时间" prop="customerContact">
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
        </template>
      </el-form>
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
      >
        <!-- v-slot:btnsBar -->
        <template #btnsBar>
          <div class="btns-bar"></div>
        </template>
        <template #operation="{ row }">
          <div>
            <el-button size="mini" type="text" @click="detailIntention(row)">查看详情</el-button>
            <el-button
              size="mini"
              type="text"
              :disabled="canContact(row)"
              @click="handlePushKF(row)"
              >咨询</el-button
            >
            <el-button v-if="showAttention(row)" size="mini" type="text" @click="editStatus(row, 1)"
              >关注</el-button
            >
            <el-button size="mini" type="text" @click="followRecord(row)">跟进记录</el-button>
            <el-button size="mini" type="text" v-if="showIgnore(row)" @click="editStatus(row, 2)"
              >忽略</el-button
            >
            <el-button size="mini" type="text" @click="followUp(row)">跟进</el-button>
            <el-button size="mini" type="text" @click="sign(row)">签订合同</el-button>
            <el-button size="mini" type="text" @click="newIntention(row)">创建合作</el-button>
          </div>
        </template>
      </ty-table>
      <ve-dialog
        :content="content"
        :visible.sync="dialogVisible"
        :cooperativePurposeId="cooperativePurposeId"
        :source="source"
      ></ve-dialog>
    </div>
  </div>
</template>
<script>
import {
  purposeList,
  purposeCount,
  editCooperativePurposeStatus
} from '@/api/cooperation/intention'
import veDialog from '@/views/cooperation/components/SelectPeople/VeDialog.vue'
import { getDictMultiple, selectDictLabel, getOptions } from '@/utils/tool'
import { getColumns } from './jsonData.js'

export default {
  components: {
    veDialog
  },
  data() {
    return {
      cooperativePurposeId: null,
      source: 1,
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
        enterpriseId: this.$store.state.user.userInfo.orgId,
        pageSize: 10,
        orgName: '',
        contactName: '',
        contactPhone: '',
        cooperativeModel: '',
        majorName: '',
        beginTime: '',
        status: '',
        endTime: ''
      },
      cooper_supplier_type: [],
      sys_cooperative_purpose_tag: []
    }
  },
  computed: {
    isChange() {
      return this.selectRows.length > 0
    },
    showAttention() {
      return (row) => {
        return row.status !== 1
      }
    },
    // 自己不能咨询自己
    canContact() {
      return function (row) {
        const { orgId } = this.$store.state.user.userInfo
        const { belongOrgId } = row
        return belongOrgId == orgId
      }
    },
    showIgnore() {
      return (row) => {
        return row.status !== 2
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { sys_cooperation_model: model, sys_cooperative_purpose_tag: tag } =
        await getDictMultiple(['sys_cooperation_model', 'sys_cooperative_purpose_tag'])
      tag.forEach((item) => {
        item.num = 0
      })
      this.sys_cooperation_model = [...model]
      this.listTypeArr = [...tag]
      this.listTypeArr.push({
        dictValue: null,
        dictLabel: '全部',
        num: 0
      })
      this.columns = await getColumns()
      this.resetList()
    },
    async resetList() {
      // const { orgId } = this.$store.state.user.userInfo
      // const res = await purposeCount(orgId)
      // if (res.data) {
      //   let { all, follow, ignore, pending, signed } = res.data
      //   this.listTypeArr[0].num = pending
      //   this.listTypeArr[1].num = follow
      //   this.listTypeArr[2].num = ignore
      //   this.listTypeArr[3].num = signed
      //   this.listTypeArr[4].num = all
      // }
      this.queryParams.status = this.listTypeArr[0].dictValue
      this.activeName = this.listTypeArr[0].dictValue
      this.getList()
    },
    // 修改合作意向状态
    async editStatus(row, status) {
      // 先写死
      // 状态：0-待处理，1-已关注，2-已忽略，3-已签订合同 (字典类型：sys_cooperative_purpose_tag)
      let text = Number(status) === 1 ? '关注' : '忽略'
      this.confirm(`是否确认${text}该合作意向？`, async () => {
        let params = {
          cooperativePurposeId: row.cooperativePurposeId,
          status
        }
        let res = await editCooperativePurposeStatus(params)
        this.$message.success('修改成功')
        this.resetList()
      })
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      }
      purposeList(sendData).then((response) => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        let { all, follow, ignore, pending, signed } = response.data.countVo
        this.listTypeArr[0].num = pending
        this.listTypeArr[1].num = follow
        this.listTypeArr[2].num = ignore
        this.listTypeArr[3].num = signed
        this.listTypeArr[4].num = all
        this.loading = false
      })
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
      this.queryParams.pageNo = val
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
          name: 'intention',
          cooperativePurposeId: row.cooperativePurposeId
        }
      })
    },
    // 跟进弹窗
    followUp(row) {
      this.cooperativePurposeId = row.cooperativePurposeId
      this.dialogVisible = true
    },
    // 跟进记录
    followRecord(row) {
      this.$router.push({
        path: '/intention/record',
        query: {
          cooperationDemandId: row.cooperationDemandId,
          source: 1,
          cooperativePurposeId: row.cooperativePurposeId
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

    // 新建
    newIntention() {
      this.$router.push({
        path: '/cooperativeManage/add',
        query: {
          backUrl: '/cooperation/intention'
        }
      })
    },
    // 编辑
    editIntention(row) {
      this.$router.push({
        path: '/cooperativeManage/edit',
        query: {
          projectId: row.projectId,
          backUrl: '/cooperation/intention'
        }
      })
    },
    // 详情
    detailIntention(row) {
      this.$router.push({
        path: '/market/profession',
        query: {
          cooperationDemandId: row.cooperationDemandId
        }
      })
    },
    // 跳转到一对一客服页
    handlePushKF(row) {
      let {
        otherOrgId: orgId,
        adminUserId: userId,
        otherOrgName: custUserName,
        createId: custUserId
      } = row
      this.$router.push({
        path: `/market/oneOnlineService`,
        query: {
          type: 1,
          orgId, // 组织id
          userId, // 用户id
          custUserName,
          custUserId
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
      this.queryParams.contactPhone = ''
      this.queryParams.cooperativeModel = ''
      this.queryParams.majorName = ''
      this.timeData = ''
      this.isShow = false
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
<style scoped lang="scss">
.intention-list {
  padding: 10px;
  background: #fff;
  margin-top: 20px;
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
}
::v-deep {
  .el-form-item {
    margin-bottom: 11px;
  }
  .el-tabs__nav-wrap::after {
    height: 0px;
  }
}
</style>
