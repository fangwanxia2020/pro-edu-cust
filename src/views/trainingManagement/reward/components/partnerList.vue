<template>
  <!-- 选择客户 -->
  <div class="select-dialog-table-btn">
    <el-button v-if="isShow" size="mini" type="text" @click="handleClick">{{
      text || '请选择'
    }}</el-button>
    <el-dialog
      :title="type == 1 ? '受奖励学生名单' : '受惩罚学生名单'"
      :visible.sync="dialogVisible"
      width="80%"
      @closed="closed"
      :before-close="beforeClose"
      top="20px"
    >
      <ty-business-crud
        v-if="columns"
        class="high-search-crud"
        title=""
        id="studentNum"
        ref="tableObj"
        searchMode="high"
        :showSearchFields="['studentDate', 'name', 'customName', 'studentNum', 'studentName']"
        :showOperation="[]"
        :showIndex="false"
        :showSelect="true"
        :pageInfo="{ limit: 5 }"
        :getListInterface="getListInterface"
        :columns="columns"
        @resetSearch="resetSearchFun"
        :checkList.sync="checkList"
        @checkedChange="handleMultiSelect"
      >
      </ty-business-crud>

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
        <el-button size="mini" type="text" icon="el-icon-edit" @click="addCommon(scope.row)"
          >评语</el-button
        >
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </ty-table>
    <el-dialog title="评语" :visible.sync="dialogFormVisible" :before-close="beforeComentClose">
      对 学号{{ chooseData.studentNum }}, {{ chooseData.studentName }} 的评语
      <div>
        <el-input type="textarea" :rows="4" placeholder="请填写评语" v-model="comment"> </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeComentClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { customerPartner, supplierPartner } from '@/api/cooperation/cooperativeManage'
import { selectDictLabel, getDictMultiple, getDictOptions } from '@/utils/tool'
import { enterpriseTypeTemplateList } from '@/api/applyOcupancy/process'
import { getColumns, getStudentColumns } from '../studentForm'

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
      chooseData: { studentNum: '', studentName: '' },
      dialogFormVisible: false,
      comment: '', // 弹窗评语
      checkList: [],
      // 当前选中的数据
      selectedRows: [],
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
      list: [],
      list2: [],
      tableselectionRows: [],
      deleteSelect: [],
      // 表格列数据
      // 列表查询接口信息
      getListInterface: {
        url: '/system/classRelStudent/queryStudentAndClass',
        methodType: 'get',
        resFormatFun: this.getListResFormatFun,
        params: {
          // type: 4
        }
      },
      // 选中的列表
      selectList: [],
      type: this.$route.query.type
      // queryParams: this.searchParams
    }
  },
  created() {
    this.init()
  },
  computed: {
    isReWard() {
      return this.type == 1
    }
  },
  methods: {
    beforeComentClose() {
      this.comment = ''
      this.chooseData = { studentNum: '', studentName: '' }
      this.dialogFormVisible = false
    },
    submit() {
      console.log('this.chooseData')
      console.log(this.chooseData)
      if (!this.comment) {
        this.$message.warning('请输入评语')
        return
      }
      this.selectList.map((item) => {
        if (item.studentNum == this.chooseData.studentNum) {
          this.$set(item, 'commentStatus', 1)
          this.$set(item, 'comment', this.comment)
        }
      })
      console.log('this.selectList')
      console.log(this.selectList)
      this.dialogFormVisible = false
    },
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 重置查询
    resetSearchFun() {
      this.getListInterface.params = {}
    },
    // 多选框选中数据
    handleMultiSelect(rows) {
      // console.log(rows)
      this.selectedRows = rows
    },
    setList(list) {
      if (list) {
        this.selectList = [...list]
      }
    },
    async init() {
      // const { sys_customer_type: sysCustomerType } = await getDictMultiple(['sys_customer_type'])
      // this.sysCustomerType = sysCustomerType
      this.columns = await getColumns()

      this.partnerColumns = await getStudentColumns(this.sysCustomerType)
      // this.columns = await getChooiceColumns(this.sysCustomerType)
      // this.columns2 = await getChooiceColumns2(this.sysCustomerType)
    },
    // 打开窗口
    async handleClick() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.selectShow()
      })
    },

    select({ selection, row }) {
      if (
        selection.findIndex((v) => v.classRelStudentId === row.classRelStudentId) === -1 &&
        this.selectList.length
      ) {
        const index = this.selectList.findIndex(
          (v) => v.classRelStudentId === row.classRelStudentId
        )
        if (index !== -1) this.deleteSelect.push(row)
      }
      let arr = selection.filter((item) => item.partnerType === 0)
      this.checkList = [...arr]
    },

    selectAll(selection) {
      console.log(
        selection.map((v) => v.personName),
        this.selectList.map((v) => v.personName)
      )
      this.checkList = [...selection]
    },
    // 确定
    ok() {
      if (!this.selectedRows.length) {
        this.$message.warning('请选学生')
        return
      }
      let arr = []
      if (this.isMore) {
        arr = this.removeArr([...this.selectList, ...this.selectedRows])
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
      this.dialogVisible = false
      console.log('this.selectList')
      console.log(this.selectList)
      this.$emit('selectData', this.isMore ? this.selectList : this.selectList[0])
    },
    // 评语
    addCommon(data) {
      this.chooseData = { ...data }
      this.comment = this.chooseData.comment ? this.chooseData.comment : ''
      this.dialogFormVisible = true
    },
    // 删除选中的内容
    handleDelete(row) {
      // 判断下合作事项有没有选过,选了就不能删了
      const index = this.selectList.findIndex((v) => v.classRelStudentId === row.classRelStudentId)
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
    },
    // 获取选中的id
    getUserIdsChange(arr) {
      return arr.map((v) => v[this.rowKey])
    },
    // 学生回显
    selectShow() {
      let arr = this.selectList.filter((item) => item.partnerType === 0)
      this.checkList = [...arr]
      this.$refs.tableObj.setCheckList(this.checkList, 'studentNum')
    },

    removeArr(arr) {
      const res = new Map()
      return arr.filter(
        (item) => !res.has(item.classRelStudentId) && res.set(item.classRelStudentId, 1)
      )
    },
    // 数据初始化
    closed() {
      this.resetForm('queryForm')
      this.$emit('closed')
    },
    cancel() {
      this.resetForm('queryForm')
      this.dialogVisible = false
      this.checkList = []
      this.deleteSelect = []
      if (this.copyCurrentSelect.length) this.selectList = this.copyCurrentSelect
    },
    beforeClose(done) {
      if (this.copyCurrentSelect.length) this.selectList = this.copyCurrentSelect
      this.checkList = []
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
