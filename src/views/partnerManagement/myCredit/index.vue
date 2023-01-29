<template>
  <!-- 合作伙伴管理-企业客户 -->
  <div class="management-list">
    <ty-business-crud
      v-if="columns"
      :id="'customerCreditsId'"
      class="high-search-crud"
      mainKey="ty-list"
      search-mode="default"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['suppOrgName', 'creditsSource', 'auditStatus']"
      :showSelect="true"
      :showIndex="false"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="clientCrud"
    >
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addOne">发起额度申请</el-button>
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="getDetail(row)">详情</el-button>
          <el-button size="mini" type="text" @click="getRecord(row)">授信额度变更记录</el-button>
          <el-button size="mini" type="text" v-show="row.auditStatus === 1" @click="apply(row)"
            >发起提额申请</el-button
          >
          <el-button size="mini" type="text" v-show="row.auditStatus === 2" @click="apply(row)"
            >重新发起提额申请</el-button
          >
        </div>
      </template>
    </ty-business-crud>

    <el-dialog title="发起额度申请" :visible.sync="addVisible" width="500px" @closed="handleClose">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="申请类型：">
          <span> {{ creditsSource }} </span>
        </el-form-item>
        <el-form-item label="授信企业：">
          <el-select
            placeholder="请选择"
            size="medium"
            @change="selectChange"
            v-model="form.customerId"
            v-show="!addVisibleFlag"
          >
            <el-option
              v-for="item in suppList"
              :key="item.customerId"
              :value="item.customerId"
              :label="item.suppOrgName"
            ></el-option>
          </el-select>
          <span v-show="addVisibleFlag">{{ suppOrgName }}</span>
          <!-- <span> 企业客户首次申请额度 </span> -->
        </el-form-item>
        <el-form-item v-show="addVisibleFlag" label="目前我的额度(元)：">
          <span>{{ currentQuota }}</span>
        </el-form-item>
        <el-form-item label="授信额度范围(元)：">
          <span>{{ range }}</span>
        </el-form-item>
        <el-form-item label="申请授信额度(元)：">
          <el-input-number
            v-model="form.creditQuota"
            :min="min"
            :max="max"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="addConfig" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog
      title="查看企业授信额度详情"
      :visible.sync="detailVisible"
      width="60%"
      @closed="handleClose"
    >
      <div class="detailBox">
        <el-row :gutter="20" v-for="(item, index) in detailColumns" :key="index">
          <el-col :span="8" v-for="(items, indexs) in item" :key="indexs"
            ><div>{{ items.prop }}:{{ items.data }}</div></el-col
          >
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看授信额度变更记录 -->
    <el-dialog
      title="查看授信额度变更记录"
      :visible.sync="recordVisible"
      width="60%"
      @closed="handleClose"
    >
      <div class="box">
        <el-table
          :data="recordData"
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            align="center"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            v-for="(item, index) in recordColumns"
            :key="index"
          ></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recordVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="recordVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { removeByIds } from '@/api/partnerManagement/partner'
import {
  getSuppList,
  addCustomerCredits,
  customerCreditsId,
  ChangeInfoList,
  editCustomerCredits
} from '@/api/partnerManagement/myCredit'
import { getColumns, recordColumns } from './jsonData.js'

export default {
  data() {
    return {
      creditsSource: '我的信用申请',
      suppOrgName: '',
      addVisibleFlag: false,
      range: '',
      currentQuota: '',
      min: 0,
      max: 0,
      recordColumns: [],
      recordData: [],
      recordVisible: false,
      detailVisible: false,
      addVisible: false,
      columns: null,
      getListInterface: {
        url: '/system/credits/getMyCreditsList',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun
      },
      searchDateRangShow: false,
      dialogVisible: false,
      companyVisible: false,
      selectRows: [],
      rules: {},
      form: {
        creditQuota: 0, // 授信额度
        createOrgId: '', // 创建组织
        customerId: '', // 关联客户表主键
        auditStatus: '', // 审核状态
        creditsSource: 2 // 合作来源
      },
      suppList: [],
      detailColumns: [
        [{ prop: '授信企业' }, { prop: '授信类型' }],
        [
          { prop: '我的授信额度（元）' },
          { prop: '已用授信额度（元）' },
          { prop: '剩余授信额度（元）' }
        ],
        [{ prop: '审核状态' }, { prop: '创建时间' }, { prop: '更新时间' }]
      ]
    }
  },
  computed: {},
  created() {
    this.init()
    this.getSuppList()
  },
  methods: {
    selectChange(e) {
      this.suppList.forEach((item) => {
        if (item.customerId === e) {
          this.form.createOrgId = item.createOrgId
          this.min = item.overdraftMin === null ? 0 : item.overdraftMin
          this.max = item.overdraftMax === null ? 0 : item.overdraftMax
          this.range = `${this.min}~${this.max}`
        }
      })
      console.log(e)
    },
    // 查看详情
    getDetail(row) {
      this.detailVisible = true
      customerCreditsId(row.customerCreditsId).then((res) => {
        console.log('res', res)

        this.$set(this.detailColumns[0][0], 'data', res.data.suppOrgName)
        this.$set(this.detailColumns[1][0], 'data', res.data.creditQuota)
        this.$set(this.detailColumns[1][1], 'data', res.data.useQuota)
        this.$set(this.detailColumns[1][2], 'data', res.data.surplusQuota)
        this.$set(this.detailColumns[2][1], 'data', res.data.createTime)
        this.$set(this.detailColumns[2][2], 'data', res.data.updateTime)
        if (res.data.auditStatus === 0) {
          this.$set(this.detailColumns[2][0], 'data', '待审核')
        } else if (res.data.auditStatus === 1) {
          this.$set(this.detailColumns[2][0], 'data', '审核通过')
        } else if (res.data.auditStatus === 2) {
          this.$set(this.detailColumns[2][0], 'data', '审核不通过')
        }

        this.$set(
          this.detailColumns[0][1],
          'data',
          res.data.creditsSource === 1 ? '合作单位新建' : '申请'
        )
      })
    },

    // 发起提额申请
    apply(row) {
      console.log('row', row)
      this.currentQuota = row.surplusQuota
      this.min = row.overdraftMin === null ? 0 : row.overdraftMin
      this.max = row.overdraftMax === null ? 0 : row.overdraftMax
      this.range = `${this.min}~${this.max}`
      this.form.customerId = row.customerId
      this.form.auditStatus = row.auditStatus
      // this.form.creditsSource = row.creditsSource
      this.form.customerCreditsId = row.customerCreditsId
      this.suppOrgName = row.suppOrgName
      if (row.creditsSource === 1) {
        this.creditsSource = '合作单位新建'
      }
      if (row.creditsSource === 2) {
        this.creditsSource = '我的信用申请'
      }
      this.addVisibleFlag = true
      this.addVisible = true
    },
    // 查看授信额度变更记录
    getRecord(row) {
      this.recordVisible = true
      let obj = {}
      obj.customerCreditsId = row.customerCreditsId
      ChangeInfoList(obj).then((res) => {
        res.data.records.forEach((item) => {
          if (item.changeSource === 1) {
            item.changeSource = '合作单位新建'
          }
          if (item.changeSource === 2) {
            item.changeSource = '申请'
          }
          if (item.changeType === 1) {
            item.changeType = '首次'
          }
          if (item.changeType === 2) {
            item.changeType = '修改额度'
          }
          if (item.auditStatus === 0) {
            item.auditStatus = '待审核'
          }
          if (item.auditStatus === 1) {
            item.auditStatus = '审核通过'
          }
          if (item.auditStatus === 2) {
            item.auditStatus = '审核不通过'
          }
        })
        this.recordData = []
        this.recordData = [...this.recordData, ...res.data.records]

        this.recordData = res.data.records

        console.log('this.recordData', this.recordData)
      })
    },
    handleClose() {},

    async init() {
      this.columns = await getColumns()
      this.recordColumns = recordColumns
    },

    // 客户的供应商列表
    async getSuppList() {
      const res = await getSuppList()
      this.suppList = [...this.suppList, ...res.data]
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      console.log(res)
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 重置查询
    resetSearchFun() {
      this.getListInterface.params = {}
      this.searchDateRang = []
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection)
      this.selectRows = selection
    },
    // 新增
    addOne() {
      this.addVisibleFlag = false
      this.form.creditsSource = 2
      this.form.auditStatus = 0
      this.addVisible = true
    },
    addCancel() {
      this.addVisible = false
      this.form.creditQuota = 0
      this.form.createOrgId = ''
      this.form.customerId = ''
      this.form.auditStatus = ''
      this.form.creditsSource = 2
      this.form.customerCreditsId = ''
      this.creditsSource = '我的信用申请'
      this.min = 0
      this.max = 0
      this.range = ''
    },

    addConfig() {
      console.log('this.form', this.form)
      if (this.addVisibleFlag) {
        editCustomerCredits(this.form).then((res) => {
          console.log('rs', res)
          if (res.code == 200) {
            this.addCancel()
            this.getSuppList()
            this.$refs.clientCrud._getListData()
            this.$message.success('提额成功')
          }
        })
      } else {
        addCustomerCredits(this.form).then((res) => {
          console.log('rs', res)
          if (res.code == 200) {
            this.addCancel()
            this.getSuppList()
            this.$refs.clientCrud._getListData()
            this.$message.success('新增成功')
          }
        })
      }
    },

    resetList() {
      this.$refs.clientCrud.setCheckList([])
      this.$refs.clientCrud._getListData()
    }
  }
}
</script>
<style scoped lang="scss">
.high-search-crud ::v-deep {
  .searchBox-high-operator-bar {
    display: none;
  }
}

.detailBox ::v-deep {
  padding-left: 20px;
  .el-row {
    height: 40px;
    line-height: 40px;
  }
}
</style>
