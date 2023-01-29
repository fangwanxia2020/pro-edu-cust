<template>
  <!-- 供应商管理 -->
  <div class="activity-management-list">
    <ty-business-crud
      v-if="columns"
      :id="'id'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'contractName',
        'contractNo',
        'partyACompany',
        'phone',
        'isSoonExpire',
        'checkStatus',
        'isConfirm',
        'status',
        'connectStatus',
        'sourceFromType'
      ]"
      :showIndex="true"
      :showSelect="true"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="supplierCrud"
    >
      <template #search>
        <search-box-form-date
          v-show="searchDateRangShow"
          label-text="签订日期"
          @change="setParams({ ...$event })"
        />
      </template>
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addContract">新建合同</el-button>
          <!-- <el-button
            size="small"
            :disabled="!isChange"
            @click="deleteSupplier"
          >删除</el-button> -->
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            v-show="
              !(row.checkStatus === 1 && row.isConfirm === 1) && row.sourceFromString === '乙方新建'
            "
            @click="editSupplier(row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="deleteSupplier(row)"
            v-show="row.checkStatus !== 1 && row.sourceFromString === '乙方新建'"
            >删除</el-button
          >

          <el-button
            size="mini"
            type="text"
            v-show="
              row.checkStatus === 1 &&
              row.sourceFromString === '乙方新建' &&
              row.isConfirm === 0 &&
              row.isShared === 0
            "
            @click="show(row)"
            >共享</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="examine(row)"
            v-show="row.checkStatus !== 1 && row.sourceFromString === '乙方新建'"
            >审核</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="detailSupplier(row)"
            v-show="
              (row.checkStatus === 1 && row.isConfirm === 1) || row.sourceFromString === '甲方共享'
            "
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            v-show="row.sourceFromString === '乙方新建' && row.checkStatus === 1"
            @click="showReactive(row)"
            >甲方反馈详情</el-button
          >
          <el-button
            size="mini"
            v-show="row.sourceFromString === '甲方共享'"
            type="text"
            @click="showReactive(row)"
            >我的反馈详情</el-button
          >
          <el-button
            size="mini"
            v-show="row.sourceFromString === '甲方共享' && row.isConfirm === 0"
            type="text"
            @click="confirmFeedback(row)"
            >填写反馈</el-button
          >
          <el-button
            size="mini"
            v-show="row.sourceFromString === '甲方共享' && row.isConfirm !== 1"
            type="text"
            @click="confirmBtn(row)"
            >确认一致</el-button
          >
        </div>
      </template>
    </ty-business-crud>
    <el-dialog
      class="ve-dialog"
      :visible.sync="dialogVisible"
      @close="closeCallback"
      title="反馈情况"
    >
      <ty-table
        :columns="tableColumns"
        :data="tableData"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
        :pager="page"
        :showSelect="false"
        :showIndex="false"
      >
        <template slot="fileId" slot-scope="{ data }">
          <el-button size="small" type="text" @click="downfile(data)" v-show="data.fileId !== null">
            <a :href="url">下载</a>
          </el-button></template
        >
      </ty-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close" size="small">确定</el-button>
        <el-button @click="close" size="small">取消</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      width="40%"
      :visible.sync="examineVisible"
      @close="examineVisible = false"
      title="审核合同"
    >
      <el-form ref="examineForm" :rules="examineForm" :model="examineData" label-width="80px">
        <el-form-item label="合同编号:">
          <span>{{ examineData.contractNo }}</span>
        </el-form-item>
        <el-form-item label="合同名称:">
          <span>{{ examineData.contractName }}</span>
        </el-form-item>
        <el-form-item label="审核结果" prop="checkStatus">
          <el-radio-group v-model="examineData.checkStatus">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="examineConfig" size="small">确定</el-button>
        <el-button @click="examineClose" size="small">取消</el-button>
      </span>
    </el-dialog>
    <feedback :row="row" :dialogVisible="feedbackVisible" @close="feedbackClose"></feedback>
  </div>
</template>
<script>
import {
  deleteByIds,
  shareContract,
  Feedback,
  contractCheck,
  confirmContract
} from '@/api/contractManagement/index'
import { getColumns, getTableColumns } from './jsonData.js'
import SearchBoxFormDate from '@/components/SearchBoxFormDate'
import feedback from '../components/feedback.vue'

export default {
  components: {
    // SearchBoxFormItem,
    SearchBoxFormDate,
    feedback
  },
  data() {
    return {
      url: null,
      feedbackVisible: false,
      row: {},
      examineVisible: false,
      examineData: {
        contractNo: '',
        contractName: '',
        id: '',
        checkStatus: ''
      },
      id: '',
      partyACompany: '',
      dialogVisible: false,
      columns: null,
      tableColumns: [],
      tableData: [],
      content: {},
      getListInterface: {
        url: '/system/contractMain/getCustomerContractMainList',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      searchDateRangShow: false,
      selectRows: [],
      examineForm: {
        checkStatus: [{ required: true, message: '请选择审核结果', trigger: 'blur' }]
      }
      // searchDateRang: null, // 最近交货日期
    }
  },
  computed: {
    isChange() {
      return this.selectRows.length > 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    downfile(data) {
      this.url = `${this.baseUrl}/file/file/down/${data.fileId}`
    },
    // 填写反馈
    confirmFeedback(row) {
      this.row = row
      this.feedbackVisible = true
    },
    feedbackClose() {
      this.feedbackVisible = false
    },
    // 反馈弹窗
    showReactive(row) {
      this.dialogVisible = true
      this.id = row.id
      this.partyACompany = row.partyACompany
      this.getList()
    },
    // 确定审核
    examineConfig() {
      this.$refs.examineForm.validate((valid) => {
        if (valid) {
          let obj = {}
          obj.id = this.examineData.id
          obj.checkStatus = Number(this.examineData.checkStatus)
          contractCheck(obj).then((res) => {
            if (res.code === 200) {
              this.$message.success('审核成功')
              this.searchDateRang = []
              this.$refs.supplierCrud.setCheckList([])
              this.$refs.supplierCrud._getListData()
              this.examineVisible = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消审核
    examineClose() {
      this.examineData.checkStatus = ''
      this.examineVisible = false
    },
    async init() {
      this.columns = await getColumns()
      this.tableColumns = await getTableColumns()
    },
    setParams(data) {
      const { params } = this.getListInterface
      console.log('data', data)
      this.$set(this.getListInterface, 'params', {
        ...params,
        ...data
      })
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
    addContract() {
      this.$router.push({
        path: '/customerContracts/add'
      })
    },
    // 删除
    deleteSupplier(row) {
      this.confirm('确认删除所选合同？', async () => {
        let id = ''
        if (row.id) {
          id = row.id
        } else {
          let arr = []

          id = arr.toString()
        }
        deleteByIds(id).then((res) => {
          if (res.code === 200) {
            this.searchDateRang = []
            this.$refs.supplierCrud.setCheckList([])
            this.$refs.supplierCrud._getListData()
            this.$message.success('删除成功')
          }
        })
      })
    },

    // 审核
    examine(row) {
      console.log('row', row)
      this.examineData.contractNo = row.contractNo
      this.examineData.contractName = row.contractName
      this.examineData.id = row.id
      this.examineVisible = true
    },
    // 确认一致
    confirmBtn(row) {
      this.confirm('确认一致？', async () => {
        confirmContract(row.id).then((res) => {
          if (res.code === 200) {
            this.selectRows = []
            this.$refs.supplierCrud.setCheckList([])
            this.$refs.supplierCrud._getListData()
            this.$message.success('确认一致成功')
          }
        })
      })
    },
    // 共享
    show(row) {
      this.confirm('确认共享所选合同？', async () => {
        let id = ''
        if (row.id) {
          id = row.id
        } else {
          let arr = []

          id = arr.toString()
        }
        shareContract(id).then((res) => {
          if (res.code === 200) {
            this.selectRows = []
            this.$refs.supplierCrud.setCheckList([])
            this.$refs.supplierCrud._getListData()
            this.$message.success('共享成功')
          }
        })
      })
    },
    // 编辑
    editSupplier(row) {
      this.$router.push({
        path: '/customerContracts/edit',
        query: {
          id: row.id,
          flag: 0
        }
      })
    },
    // 详情
    detailSupplier(row) {
      this.$router.push({
        path: '/customerContracts/edit',
        query: {
          id: row.id,
          flag: 1
        }
      })
    },
    getList() {
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        contractMainId: this.id
      }

      Feedback(sendData).then((res) => {
        this.tableData = res.data.records
        this.tableData.forEach((item) => {
          item.partyACompany = this.partyACompany
        })
        this.page.total = res.data.total
      })
    },
    closeCallback() {},
    close() {
      this.dialogVisible = false
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.getList()
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
</style>
