<template>
  <!-- 选择客户 -->
  <div class="select-dialog-table-btn">
    <el-button v-if="isShow" size="mini" type="text" @click="handleClick">{{
      text || '请选择'
    }}</el-button>
    <!-- <div @click="handleClick">选择</div> -->
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
            <el-form-item label="单位类型" prop="customerType">
              <el-select v-model="queryParams.customerType" placeholder="单位类型">
                <el-option
                  v-for="item in sysCustomerType"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位名称" prop="customerName">
              <el-input
                v-model="queryParams.customerName"
                placeholder="请输入单位名称"
                clearable
                style="width: 100%"
              />
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="企业客户" name="1">
            <ty-table
              id="customerId"
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
          <el-tab-pane label="合作单位" name="2">
            <ty-table
              id="supplierId"
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
import { customerPartner, supplierPartner } from '@/api/cooperation/cooperativeManage'
import { selectDictLabel, getDictMultiple, getDictOptions } from '@/utils/tool'
import { enterpriseTypeTemplateList } from '@/api/applyOcupancy/process'
import { getChooiceColumns, getChooiceColumns2, getPartnerColumns } from '../cooperationForm'

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
      sysCustomerType: [],
      columns: null,
      columns2: null,
      partnerColumns: null,
      queryParams: {
        customerType: '',
        customerName: '',
        supplierName: ''
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
          item.selfId = `${item[this.rowKey]}${item.partnerType}`
          if (item.partnerType === 0) {
            item.customerId = item[this.rowKey]
            item.customerName = item.partnerName
          } else {
            item.supplierName = item.partnerName
            item.supplierId = item[this.rowKey]
          }
          item.contacts = item.partnerContact
          item.phone = item.partnerPhone
        })
        this.selectList = [...list]
      }
    },
    async init() {
      // const { sys_customer_type: sysCustomerType } = await getDictMultiple(['sys_customer_type'])
      // this.sysCustomerType = sysCustomerType

      const res = await enterpriseTypeTemplateList({ type: 3 })
      const customerType = getDictOptions(res.data.records, 'name', 'enterpriseTypeTemplateId')
      this.sysCustomerType = customerType
      this.partnerColumns = await getPartnerColumns(this.sysCustomerType)
      this.columns = await getChooiceColumns(this.sysCustomerType)
      this.columns2 = await getChooiceColumns2(this.sysCustomerType)
    },
    // 跳去新建客户/供应商
    toNewOne() {
      let page = this.activeName == '1' ? '/partner/ADD' : '/cooperativeUnits/ADD'
      this.$router.push({
        path: page
      })
    },
    // 数据初始化

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
    // 获取客户列表数据(针对分页)
    async getListData() {
      let params = {
        ...this.queryParams,
        // ...this.page,
        bindingStatus: 2,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      console.log(params)
      await customerPartner(params).then((res) => {
        res.data.records.forEach((item) => {
          item[this.rowKey] = item.customerId
          item.partnerName = item.customerName
          item.partnerType = 0
          // 唯一id
          item.selfId = `${item[this.rowKey]}${item.partnerType}`
        })
        this.list = res.data.records
        this.page.total = res.data.total
        // this.selectShow()
      })
    },
    // 获取供应商列表数据(针对分页)
    async getListData2() {
      let params = {
        ...this.queryParams,
        // ...this.page2,
        bindingStatus: 2,
        pageNum: this.page2.pageNum,
        pageSize: this.page2.pageSize
      }
      await supplierPartner(params).then((res) => {
        res.data.records.forEach((item) => {
          item[this.rowKey] = item.supplierId
          item.partnerName = item.supplierName
          item.partnerType = 1
          // 唯一id
          item.selfId = `${item[this.rowKey]}${item.partnerType}`
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
      // console.log(this.selectList);
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
      let arr = selection.filter((item) => item.partnerType === 0)
      this.checkList = [...arr]
    },
    select2({ selection, row }) {
      if (selection.findIndex((v) => v.selfId === row.selfId) === -1 && this.selectList.length) {
        const index = this.selectList.findIndex((v) => v.selfId === row.selfId)
        if (index !== -1) this.deleteSelect.push(row)
      }
      let arr = selection.filter((item) => item.partnerType === 1)
      this.checkList2 = [...arr]
    },
    selectAll(selection) {
      console.log(
        selection.map((v) => v.personName),
        this.selectList.map((v) => v.personName)
      )
      this.checkList = [...selection]
      //  console.log(selection.map(v =>v.personName));
    },
    // 确定
    ok() {
      if (!this.checkList.length && !this.checkList2.length) {
        this.$message.warning('请选择客户/供应商')
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
      this.radio = this.currentSelect[this.rowKey]
      this.dialogVisible = false
      console.log('this.selectList')
      console.log(this.selectList)
      this.$emit('selectData', this.isMore ? this.selectList : this.selectList[0])
    },
    // 删除选中的内容
    handleDelete(row) {
      // 判断下合作事项有没有选过,选了就不能删了
      const index = this.selectList.findIndex((v) => v.selfId === row.selfId)
      this.selectList.splice(index, 1)

      this.currentSelect = {}
      this.$emit('selectData', this.isMore ? this.selectList : '')
      this.$forceUpdate()
    },
    // 重置搜索框
    resetQuery() {
      this.resetForm('queryForm')
      this.queryParams.supplierName = ''
      this.queryParams.customerName = ''
      this.handleQuery()
    },
    // 点击搜索
    handleQuery() {
      // console.log(this.searchParams);
      this.queryParams.supplierName = this.queryParams.customerName
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
      let arr = this.selectList.filter((item) => item.partnerType === 0)
      this.checkList = [...arr]
      this.$refs.tableObj.changeRowSelection(this.checkList, 'customerId')
    },
    // 合作单位回显
    selectShow2() {
      let arr = this.selectList.filter((item) => item.partnerType === 1)
      this.checkList2 = [...arr]
      this.$refs.tableObj2.changeRowSelection(this.checkList2, 'supplierId')
    },
    removeArr(arr) {
      arr.forEach((item) => {
        item.selfId = `${item[this.rowKey]}${item.partnerType}`
      })
      console.log('arr')
      console.log(arr)
      const res = new Map()
      return arr.filter((item) => !res.has(item.selfId) && res.set(item.selfId, 1))
    },
    // 数据初始化
    closed() {
      this.resetForm('queryForm')
      this.radio = ''
      this.$emit('closed')
    },
    cancel() {
      this.resetForm('queryForm')
      this.dialogVisible = false
      this.checkList = []
      this.checkList2 = []
      this.deleteSelect = []
      if (this.copyCurrentSelect.length) this.selectList = this.copyCurrentSelect
    },
    beforeClose(done) {
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
