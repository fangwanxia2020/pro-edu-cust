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
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="customerCredit"
    >
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addOne">新增</el-button>
          <el-button type="primary" size="small" @click="remove">删除</el-button>
          <el-button type="primary" size="small" @click="goApplyList">申请企业列表</el-button>
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="getDetail(row)">详情</el-button>
          <el-button size="mini" type="text" @click="modify(row)">修改</el-button>
          <el-button size="mini" type="text" @click="getRecord(row)">授信额度变更记录</el-button>
        </div>
      </template>
    </ty-business-crud>

    <el-dialog :title="title" :visible.sync="addVisible" width="500px" :before-close="handleClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="150px">
        <el-form-item label="被授信单位：" prop="customerName">
          <el-select
            placeholder="请选择"
            size="medium"
            v-model="form.customerName"
            @change="suppChange"
            :disabled="title === '修改客户授信额度'"
          >
            <el-option
              v-for="item in suppList"
              :key="item.customerId"
              :value="item.customerId"
              :label="item.customerName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户等级">
          <span>{{ form.levelName }}</span>
        </el-form-item>

        <el-form-item label="授信额度(元)：" prop="creditQuota">
          <el-input-number
            v-model="form.creditQuota"
            :min="min"
            :max="max"
            size="medium"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="授信范围">
          <span>{{ form.overdraft }}</span>
        </el-form-item>
        <el-form-item label="备注信息" prop="status">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addConfig" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog
      title="查看客户授信额度详情"
      :visible.sync="detailVisible"
      width="60%"
      :before-close="handleClose"
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
      :before-close="handleClose"
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
import {
  getSuppList,
  addCustomerCredits,
  removeByIds,
  customerCreditsId,
  editCustomerCredits,
  getCreditChangeInfoList
} from '@/api/partnerManagement/customerCredit.js'
import { getColumns, recordColumns } from './jsonData.js'

export default {
  data() {
    return {
      min: 0,
      max: 0,
      title: '',
      recordColumns: [],
      recordData: [{ data: 1 }],
      recordVisible: false,
      detailVisible: false,
      addVisible: false,
      columns: null,
      getListInterface: {
        url: '/system/credits/getCustomerCreditsList',
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
      rules: {
        customerName: [{ required: true, message: '请选择被授信单位', trigger: 'change' }],
        creditQuota: [{ required: true, message: '请输入授信额度', trigger: 'change' }]
      },
      form: {
        customerName: '', // 企业客户
        levelName: '', // 企业客户等级
        overdraft: '', // 授信范围
        creditQuota: '', // 授信额度
        createOrgId: '', // 创建组织
        customerId: '', // 关联客户表主键
        auditStatus: '', // 审核状态
        creditsSource: '', // 合作来源
        remark: ''
      },
      suppList: [],
      detailColumns: [
        [{ prop: '被授信单位' }, { prop: '授信类型' }],
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
  },
  methods: {
    // 选择企业客户
    suppChange(e) {
      console.log('e', e)
      this.suppList.forEach((item) => {
        if (item.customerId === e) {
          this.form.levelName = item.levelName
          this.form.customerName = item.customerName
          this.form.customerId = item.customerId
          item.overdraftMin = item.overdraftMin === null ? 0 : item.overdraftMin
          item.overdraftMax = item.overdraftMax === null ? 0 : item.overdraftMax
          this.form.overdraft = `${item.overdraftMin} ~ ${item.overdraftMax}`
          this.min = item.overdraftMin
          this.max = item.overdraftMax
        }
      })
    },
    // 申请企业列表
    goApplyList() {
      this.$router.push({
        path: '/customerCredit/applyList'
      })
    },
    // 点击复选框事件
    getCheckList() {
      console.log('row11')
      // this.selectRows = row
    },
    modify(row) {
      this.getSuppList()
      this.addVisible = true
      customerCreditsId(row.customerCreditsId).then((res) => {
        this.title = '修改客户授信额度'
        console.log('res', res)
        this.min = res.data.overdraftMin
        this.max = res.data.overdraftMax
        this.form.creditsSource = res.data.creditsSource
        this.form.customerName = res.data.customerName
        this.form.customerId = res.data.customerId
        this.form.remark = res.data.remark
        this.form.levelName = res.data.levelName
        this.form.customerCreditsId = res.data.customerCreditsId
        this.form.creditQuota = res.data.creditQuota
        res.data.overdraftMin = res.data.overdraftMin === null ? 0 : res.data.overdraftMin
        res.data.overdraftMax = res.data.overdraftMax === null ? 0 : res.data.overdraftMax
        this.form.overdraft = `${res.data.overdraftMin} ~ ${res.data.overdraftMax}`
      })
    },
    // 查看详情
    getDetail(row) {
      this.detailVisible = true
      customerCreditsId(row.customerCreditsId).then((res) => {
        console.log('res', res)

        this.$set(this.detailColumns[0][0], 'data', res.data.customerName)
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
          res.data.creditsSource === 1 ? '新建' : '客户申请'
        )
      })
    },
    // 查看授信额度变更记录
    getRecord(row) {
      console.log('row', row)
      let obj = {}
      obj.customerCreditsId = Number(row.customerCreditsId)
      getCreditChangeInfoList(obj).then((res) => {
        res.data.records.forEach((item) => {
          if (item.changeType === 1) {
            item.changeTypeName = '首次'
          }
          if (item.changeType === 2) {
            item.changeTypeName = '修改额度'
          }
          if (item.changeSource === 1) {
            item.changeSourceName = '新建'
          }
          if (item.changeSource === 2) {
            item.changeSourceName = '客户申请'
          }
          if (item.auditStatus === 0) {
            item.auditStatusName = '待审核'
          }
          if (item.auditStatus === 1) {
            item.auditStatusName = '审核通过'
          }
          if (item.auditStatus === 2) {
            item.auditStatusName = '审核不通过'
          }
        })
        this.recordData = []
        this.recordData = [...this.recordData, ...res.data.records]
      })
      this.recordVisible = true
    },
    handleClose() {
      this.recordVisible = false
      this.detailVisible = false
      this.addVisible = false
    },

    async init() {
      this.columns = await getColumns()
      this.recordColumns = recordColumns
    },
    remove() {
      console.log('111 this.selectRows', this.selectRows)
      let arr = []

      this.selectRows.forEach((item) => {
        arr.push(item.customerCreditsId)
        console.log('item', item)
      })
      this.confirm('确认删除吗？', async () => {
        removeByIds(arr.toString()).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.selectRows = []
            this.$refs.customerCredit.setCheckList([])
            this.$refs.customerCredit._getListData()
          }
        })
      })
    },

    // 客户的供应商列表
    async getSuppList() {
      const res = await getSuppList()
      this.suppList = []
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
      console.log('1111', selection)
      this.selectRows = selection
    },
    // 新增
    addOne() {
      this.initForm()
      this.getSuppList()

      this.title = '新增客户授信额度'
      this.form.creditsSource = 1
      this.form.auditStatus = 0
      this.addVisible = true
    },
    // 格式化新增修改表
    initForm() {
      this.min = 0
      this.max = 0
      Object.keys(this.form).forEach((key) => {
        console.log('obj', key)
        this.form[key] = ''
      })
    },
    addConfig() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '新增客户授信额度') {
            addCustomerCredits(this.form).then((res) => {
              console.log('rs', res)
              if (res.code == 200) {
                this.addVisible = false
                this.$message.success('新增成功')
                this.selectRows = []
                this.$refs.customerCredit.setCheckList([])
                this.$refs.customerCredit._getListData()
              }
            })
          } else if (this.title === '修改客户授信额度') {
            editCustomerCredits(this.form).then((res) => {
              console.log('rs', res)
              if (res.code == 200) {
                this.addVisible = false
                this.$message.success('修改成功')
                this.selectRows = []
                this.$refs.customerCredit.setCheckList([])
                this.$refs.customerCredit._getListData()
              }
            })
          }
        }
      })
      console.log('this.form', this.form)
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
