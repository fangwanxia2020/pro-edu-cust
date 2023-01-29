<template>
  <el-dialog
    class="ve-dialog"
    width="80%"
    :visible.sync="dialogVisible"
    @close="closeCallback"
    :title="title"
  >
    <div class="btn-group">
      <el-button type="primary" size="small" @click="newContant">新建</el-button>
      <el-button :disabled="canEdit" type="success" size="small" @click="editContant"
        >编辑</el-button
      >
      <el-button size="small" :disabled="canDelete" @click="deleteContant">删除</el-button>
    </div>
    <ty-table
      :columns="columns"
      :data="tableData"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
      :pager="page"
      :showSelect="true"
      :checkList.sync="tableselectionRows"
      :showIndex="false"
      :border="false"
      @selectionChange="selectionChange"
    >
    </ty-table>
    <div class="btn-continer" v-if="!disabled">
      <el-button type="primary" size="small" @click="close">确定</el-button>
      <el-button @click="close" size="small">取消</el-button>
    </div>
    <contant
      ref="contant"
      :content="contantContent"
      :title="contantTitle"
      :visible.sync="contantVisible"
      :supplierName="supplierName"
      :supplierId="supplierId"
      @reset="reset"
    ></contant>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'
import { contactsList, removeContactsByIds } from '@/api/partnerManagement/cooperativeUnits'
import { getColumns } from '../jsonData'
import Contant from './contant.vue'

let defaultForm = {
  objName: null,
  name: null,
  schoolCoursewareTypeId: null,
  objId: null,
  content: undefined,
  files: []
}

export default {
  components: { Contant },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '联系人'
    },
    content: {
      type: Object,
      default() {
        return {
          data: {}
        }
      }
    }
  },

  computed: {
    disabled() {
      // return this.isExamine
      return false
    },
    canEdit() {
      return this.selectionRows.length != 1
    },
    canDelete() {
      return this.selectionRows.length == 0
    }
  },

  watch: {
    dialogVisible(value) {
      this.$emit('update:visible', value)
    },
    visible(value) {
      this.dialogVisible = value
    },
    content: {
      handler(newValue) {
        console.log('newValue')
        console.log(newValue)
      },
      deep: true
    }
  },

  data() {
    return {
      tableselectionRows: [],
      selectionRows: [],
      contantVisible: false,
      dialogVisible: this.visible,
      contantContent: { data: {}, action: undefined },
      contantTitle: '新建联系人',
      tableData: [],
      columns: [],
      supplierId: '',
      supplierName: '',
      row: {},
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    deleteContant() {
      let that = this
      this.confirm('确认删除所选联系人？', async () => {
        let ids = that.selectionRows.map((item) => item.supplierContactsId).join(',')
        removeContactsByIds(ids).then((res) => {
          if (res.code === 200) {
            that.reset()
            that.$message.success('删除成功')
          }
        })
      })
    },
    selectionChange(e) {
      console.log('e', e)
      // // console.log('this.tableselectionRows', this.tableselectionRows)
      // this.tableselectionRows = []
      this.selectionRows = e
      this.tableselectionRows = e
    },
    async init() {
      this.columns = await getColumns()
    },
    newContant() {
      this.contantTitle = '新建联系人'
      this.contantVisible = true
    },
    editContant() {
      this.contantTitle = '修改联系人'
      // eslint-disable-next-line prefer-destructuring
      // this.contantContent = this.selectionRows[0]
      this.$refs.contant.setData(this.selectionRows[0])
      this.contantVisible = true
    },
    reset() {
      this.resetData()
      this.getList(this.row)
    },
    getList(row) {
      this.row = { ...row }
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        supplierId: row.supplierId
      }
      this.supplierName = row.supplierName
      this.supplierId = row.supplierId
      contactsList(sendData).then((res) => {
        res.data.records.forEach((item) => {
          item.supplierName = row.supplierName
        })
        this.tableData = res.data.records
        this.page.total = res.data.total
      })
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.getList(this.row)
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.getList(this.row)
    },
    closeCallback() {
      this.resetData()
    },
    resetData() {
      this.tableselectionRows = []
      this.selectionRows = []
      // 重置
      // this.form = deepClone(defaultForm);
      // this.$nextTick(() => {
      //   this.$nextTick(() => {
      //     this.$refs.veForm.clear();
      //   });
      // });
    },
    close() {
      this.dialogVisible = false
    },
    open() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ve-dialog {
  .dialog-form {
    margin-right: 20px;
  }
}
.btn-continer {
  text-align: end;
}
.btn-group {
  margin-bottom: 20px;
}
</style>
