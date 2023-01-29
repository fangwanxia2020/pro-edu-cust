<template>
  <!-- 选择合同 -->
  <div class="select-dialog-table-btn">
    <el-button v-if="isShow" size="mini" type="text" @click="handleClick">{{
      text || '请选择'
    }}</el-button>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
      @closed="closed"
      :before-close="beforeClose"
      top="20px"
    >
      <el-form :model="queryParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同名称" prop="contractName">
              <el-input
                v-model="queryParams.contractName"
                placeholder="请输入合同名称"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input
                v-model="queryParams.contractNo"
                placeholder="请输入合同编号"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否联合体" prop="connectStatus">
              <el-select v-model="queryParams.connectStatus" placeholder="是否联合体">
                <el-option
                  v-for="item in connectStatusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="20px">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="toNewOne"
                >新建</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin-top: 20px">
        <el-tabs v-model="activeName" @tab-click="handleClick2">
          <el-tab-pane label="客户合同" name="1">
            <ty-table
              id="id"
              ref="tableObj"
              :columns="columns"
              :data="list"
              :pager="page"
              :showSelect="true"
              :checkList.sync="checkList"
              @pageSizeChange="pageSizeChange"
              @pageCurrentChange="pageCurrentChange"
              @select="select"
            ></ty-table
          ></el-tab-pane>
          <!-- @select-all="selectAll" -->
          <el-tab-pane label="采购合同" name="2">
            <ty-table
              id="id"
              ref="tableObj2"
              :columns="columns2"
              :data="list2"
              :pager="page2"
              :showSelect="true"
              :checkList.sync="checkList2"
              @pageSizeChange="pageSizeChange2"
              @pageCurrentChange="pageCurrentChange2"
              @select="select2"
            ></ty-table
          ></el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
    <ty-table
      :id="rowKey"
      ref="dictCodeTableObj"
      :columns="partnerColumns"
      :data="selectList"
      :hidePage="true"
    >
      <template v-slot:operation="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </ty-table>
  </div>
</template>
<script>
import {
  getCustomerContractMainList,
  getPurchaseContractMainList
} from '@/api/cooperation/cooperativeManage'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { getContractColumns, getContractColumns2 } from '../cooperationForm'
// 是否联合体:0-否，1-是
const connectStatusOption = [
  { label: '否', value: 0 },
  { label: '是', value: 1 }
]
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 唯一标识(必传)
    rowKey: {
      type: [String, Number],
      default: ''
    },
    // 是否单/多选
    isMore: {
      type: Boolean,
      default: false
    },
    // 选中数据回显数据
    selectShowList: {
      type: Array,
      default: () => []
    },
    // 是否显示选择/操作按钮
    isShow: {
      type: Boolean,
      default: true
    },
    // 选中显示类型
    text: {
      type: String,
      default: ''
    }
  },
  watch: {
    // selectShowList: {
    //   handler(newValue) {
    //     this.selectList = newValue
    //     this.currentSelect = this.selectList.length ? this.selectList[0] : {}
    //     // console.log('传递过来的人员列表', this.selectList );
    //   },
    //   immediate: true
    //   // deep:true
    // }
  },
  data() {
    // this.selectList = []
    this.currentSelect = {}
    return {
      connectStatusOption,
      sysCustomerType: [],
      columns: null,
      columns2: null,
      partnerColumns: null,
      queryParams: {
        connectStatus: '',
        contractName: '',
        contractNo: ''
      },
      activeName: '1',
      copyCurrentSelect: [],
      dialogVisible: false,
      radio: '',
      list: [],
      list2: [],
      checkList: [],
      checkList2: [],
      tableselectionRows: [],
      tableselectionRows2: [],
      deleteSelect: [],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0,
        pageNum: 1,
        pageSize: 5
      },
      page2: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0,
        pageNum: 1,
        pageSize: 5
      },
      // 选中的列表
      selectList: []
      // currentSelect: {},
      // queryParams: this.searchParams
    }
  },
  created() {
    this.init()
  },
  methods: {
    setList(list) {
      if (list) {
        list.forEach((item) => {
          item.selfId = `${item[this.rowKey]}${item.contractMainType}`
          if (item.contractMainType === 0) {
            item.id = item[this.rowKey]
            item.contractName = item.contractMainName
          } else {
            item.contractName = item.contractMainName
            item.id = item[this.rowKey]
          }
        })
        this.selectList = [...list]
      }
    },

    async init() {
      this.partnerColumns = await getContractColumns2()
      this.columns = await getContractColumns()
      this.columns2 = await getContractColumns()
    },
    // 跳去客户合同/采购合同
    toNewOne() {
      let page = this.activeName == '1' ? '/customerContracts/add' : '/purchaseContracts/add'
      this.$router.push({
        path: page
      })
    },

    handleClick2() {},
    // 打开窗口
    async handleClick() {
      this.activeName = '1'
      await this.getListData()
      await this.getListData2()
      this.currentSelect = this.selectList.length ? this.selectList[0] : {}
      this.dialogVisible = true
      this.$nextTick(() => {
        this.selectShow()
        this.selectShow2()
      })
    },
    // 获取客户合同列表数据(针对分页)
    async getListData() {
      let params = {
        ...this.queryParams,
        ...this.page
      }
      await getCustomerContractMainList(params).then((res) => {
        res.data.records.forEach((item) => {
          item[this.rowKey] = item.id
          item.contractMainName = item.contractName
          item.contractMainType = 0
          // 唯一id
          item.selfId = `${item[this.rowKey]}${item.contractMainType}`
        })
        this.list = res.data.records
        this.page.total = res.data.total
        // this.selectShow()
      })
    },
    // 获取采购合同列表数据(针对分页)
    async getListData2() {
      await getPurchaseContractMainList(this.queryParams).then((res) => {
        res.data.records.forEach((item) => {
          item[this.rowKey] = item.id
          item.contractMainName = item.contractName
          item.contractMainType = 1
          // 唯一id
          item.selfId = `${item[this.rowKey]}${item.contractMainType}`
        })
        this.list2 = res.data.records
        this.page2.total = res.data.total
        // this.selectShow2()
      })
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.page.pageSize = val
      this.getListData()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.page.pageNum = val
      this.getListData()
    },
    pageSizeChange2(val) {
      this.page2.limit = val
      this.page2.pageSize = val
      this.getListData()
    },
    pageCurrentChange2(val) {
      this.page2.pageNo = val
      this.page2.pageNum = val
      this.getListData()
    },
    // 单选
    handleChangeRadio(e, row) {
      this.currentSelect = row
      if (this.selectList.length) {
        this.copyCurrentSelect = JSON.parse(JSON.stringify(this.selectList))
        this.selectList = []
      }
    },
    // 多选
    handleSelectionChange(rows) {
      // console.log(rows.map(v => v.personName));
      // this.checkList = [...rows]
      // console.log(this.checkList, this.selectList);
      // this.checkList.length ? this.checkList.push(rows) : (this.checkList = [...rows])
    },
    select({ selection, row }) {
      if (selection.findIndex((v) => v.selfId === row.selfId) === -1 && this.selectList.length) {
        const index = this.selectList.findIndex((v) => v.selfId === row.selfId)
        if (index !== -1) this.deleteSelect.push(row)
      }
      let arr = selection.filter((item) => item.contractMainType === 0)
      this.checkList = [...arr]
    },
    select2({ selection, row }) {
      if (selection.findIndex((v) => v.selfId === row.selfId) === -1 && this.selectList.length) {
        const index = this.selectList.findIndex((v) => v.selfId === row.selfId)
        if (index !== -1) this.deleteSelect.push(row)
      }
      let arr = selection.filter((item) => item.contractMainType === 1)
      this.checkList2 = [...arr]
    },
    selectAll(selection) {
      this.checkList = [...selection]
      //  console.log(selection.map(v =>v.personName));
    },
    // 确定
    ok() {
      if (!this.checkList.length && !this.checkList2.length) {
        this.$message.warning('请选择客户合同/采购合同')
        return
      }
      let arr = []
      if (this.isMore) {
        arr = this.removeArr([...this.selectList, ...this.checkList, ...this.checkList2])
        this.selectList = JSON.parse(JSON.stringify(arr))
        if (this.deleteSelect.length) {
          const ids = this.deleteSelect.map((v) => v[this.rowKey])
          this.selectList = this.selectList.filter((v) => !ids.includes(v[this.rowKey]))
        }
        this.deleteSelect = []
      } else {
        arr[0] = this.currentSelect
        this.selectList = JSON.parse(JSON.stringify(arr))
        this.copyCurrentSelect.length = 0
        // console.log(this.selectList);
      }
      // this.radio = this.currentSelect[this.rowKey]
      this.dialogVisible = false

      this.$emit('selectData', this.isMore ? this.selectList : this.selectList[0])
    },
    // 删除选中的内容
    handleDelete(row) {
      const index = this.selectList.findIndex((v) => v.selfId === row.selfId)
      this.selectList.splice(index, 1)
      this.$emit('selectData', this.isMore ? this.selectList : '')
      this.$forceUpdate()
    },
    // 重置搜索框
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 点击搜索
    handleQuery() {
      // console.log(this.searchParams);
      if (this.activeName === '1') {
        this.page.pageNum = 1
        this.page.pageNo = 1
        this.getListData()
      } else {
        this.page2.pageNum = 1
        this.page2.pageNo = 1
        this.getListData2()
      }
    },
    // 获取选中的id
    getUserIdsChange(arr) {
      return arr.map((v) => v[this.rowKey])
    },
    // 企业客户回显
    selectShow() {
      let arr = this.selectList.filter((item) => item.contractMainType === 0)
      this.checkList = [...arr]
      this.$refs.tableObj.changeRowSelection(this.checkList, 'id')
    },
    // 合作单位回显
    selectShow2() {
      let arr = this.selectList.filter((item) => item.contractMainType === 1)
      this.checkList2 = [...arr]
      this.$refs.tableObj2.changeRowSelection(this.checkList2, 'id')
    },
    removeArr(arr) {
      arr.forEach((item) => {
        item.selfId = `${item[this.rowKey]}${item.contractMainType}`
      })
      const res = new Map()
      return arr.filter((item) => !res.has(item.selfId) && res.set(item.selfId, 1))
    },
    cancel() {
      this.resetForm('queryForm')
      this.dialogVisible = false
      this.checkList = []
      this.checkList2 = []

      this.deleteSelect = []
      if (this.copyCurrentSelect.length) this.selectList = this.copyCurrentSelect
    },
    // 数据初始化
    closed() {
      this.resetForm('queryForm')
      this.radio = ''
      this.$emit('closed')
    },
    beforeClose(done) {
      this.resetForm('queryForm')
      if (this.copyCurrentSelect.length) this.selectList = this.copyCurrentSelect
      this.checkList = []
      this.checkList2 = []
      this.deleteSelect = []
      done()
    }
  }
}
</script>
<style lang="scss" scoped>
// ::v-deep .el-table__header-wrapper .el-checkbox {
//   display: none;
// }
// .add{
//   padding: 500px;
// }
// .add ::v-deep .el-form-item.is-error .el-input__inner{
//   border-color:#0803f7 !important
// }
::v-deep {
  .el-form-item__content {
    margin-left: 0 !important;
    width: 100%;
  }
  .el-form-item {
    display: flex;
    width: 74%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
