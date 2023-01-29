<template>
  <!-- 合作伙伴管理-企业客户 -->
  <div class="management-list">
    <ty-business-crud
      v-if="columns"
      :id="'creditChangeId'"
      class="high-search-crud"
      mainKey="ty-list"
      search-mode="default"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['customerName', 'changeSource', 'auditStatus']"
      :showIndex="false"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      ref="clientCrud"
    >
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="getDetail(row)">详情</el-button>
          <el-button size="mini" type="text" @click="audit(row)">审核</el-button>
          <!-- <el-button size="mini" type="text">禁用</el-button>
          <el-button size="mini" type="text">授信额度变更记录</el-button> -->
        </div>
      </template>
    </ty-business-crud>

    <!-- 详情 -->
    <el-dialog
      title="查看企业客户授信额度详情"
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
      title="授信额度审核"
      :visible.sync="recordVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="audit" v-for="(item, index) in auditList" :key="index">
        <span>{{ item.prop }}</span> <span>{{ item.val }}</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="审核结果" prop="auditStatus">
          <el-radio-group v-model="ruleForm.auditStatus">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recordVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="auditConfig" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { customerCreditsId, creditChange } from '@/api/partnerManagement/customerCredit.js'
import getColumns from './jsonData.js'

export default {
  data() {
    return {
      creditChangeId: '',
      rules: {
        auditStatus: [{ required: true, message: '请选择审核结果', trigger: 'change' }]
      },
      ruleForm: {
        auditStatus: ''
      },
      auditList: [
        { prop: '授信类型:', val: '' },
        { prop: '申请类型:', val: '' },
        { prop: '被授信单位:', val: '' },
        { prop: '申请额度 (元):', val: '' },
        { prop: '申请时间:', val: '' }
      ],
      recordVisible: false,
      detailVisible: false,
      columns: getColumns,
      getListInterface: {
        url: '/system/creditChange/getCreditChangeList',
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
      detailColumns: [
        [{ prop: '被授信单位' }, { prop: '授信类型' }, { prop: '申请类型' }],
        [{ prop: '申请授信额度（元）' }, { prop: '审核状态' }, { prop: '审核人' }],
        [{ prop: '审核时间' }, { prop: '创建时间' }]
      ]
    }
  },
  computed: {},

  methods: {
    // 确认审核结果
    auditConfig() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('ruleForm', this.ruleForm)
          let obj = {}
          obj.creditChangeId = this.creditChangeId
          obj.auditStatus = Number(this.ruleForm.auditStatus)
          creditChange(obj).then((res) => {
            if (res.code === 200) {
              this.recordVisible = false
              this.$message.success('审核成功')
              this.$refs.clientCrud.setCheckList([])
              this.$refs.clientCrud._getListData()
            }
          })
        }
      })
    },
    // 申请企业列表
    goApplyList() {
      this.$router.push({
        path: '/customerCredit/applyList'
      })
    },
    // 查看详情
    getDetail(row) {
      this.detailVisible = true
      customerCreditsId(row.customerCreditsId).then((res) => {
        console.log('res', res)

        this.$set(this.detailColumns[0][0], 'data', res.data.customerName)
        this.$set(this.detailColumns[0][1], 'data', res.data.creditsSource)
        // this.$set(this.detailColumns[0][2], 'data', res.data.changeType)
        this.$set(this.detailColumns[1][0], 'data', res.data.creditQuota)
        this.$set(this.detailColumns[1][2], 'data', res.data.updateName)
        this.$set(this.detailColumns[2][1], 'data', res.data.createTime)
        this.$set(this.detailColumns[2][0], 'data', res.data.updateTime)
        if (res.data.auditStatus === 0) {
          this.$set(this.detailColumns[1][1], 'data', '待审核')
        } else if (res.data.auditStatus === 1) {
          this.$set(this.detailColumns[1][1], 'data', '审核通过')
        } else if (res.data.auditStatus === 2) {
          this.$set(this.detailColumns[1][1], 'data', '审核不通过')
        }

        this.$set(
          this.detailColumns[0][1],
          'data',
          res.data.creditsSource === 1 ? '新建' : '客户申请'
        )

        this.$set(
          this.detailColumns[0][2],
          'data',
          row.changeType === 1 ? '首次申请额度' : '申请提额'
        )
      })
    },
    // 查看授信额度变更记录
    audit(row) {
      console.log(' row', row)
      this.creditChangeId = row.creditChangeId
      if (row.changeSource === 1) {
        this.auditList[0].val = '合作单位'
      }
      if (row.changeSource === 2) {
        this.auditList[0].val = '企业客户申请'
      }

      if (row.changeType === 1) {
        this.auditList[1].val = '首次申请额度'
      }
      if (row.changeType === 2) {
        this.auditList[1].val = '申请提额'
      }
      this.auditList[2].val = row.customerName
      this.auditList[3].val = row.changeQuota
      this.auditList[4].val = row.createTime
      this.recordVisible = true
    },
    handleClose() {
      this.detailVisible = false
      this.recordVisible = false
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

.audit {
  margin-bottom: 16px;
  span {
    margin-left: 10px;
  }
}
</style>
