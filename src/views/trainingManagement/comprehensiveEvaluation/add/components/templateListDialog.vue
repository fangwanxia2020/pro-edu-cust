<template>
  <el-dialog title="选择评价模板" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
    <el-table :data="tableData" border style="width: 100%" @row-click="singleElection">
      <el-table-column label="" width="65">
        <template slot-scope="{ row }">
          <el-radio class="radio" v-model="templateRadio" :label="row.evaluateTplId"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="编号" width="80"> </el-table-column>
      <el-table-column prop="name" label="模板名称"> </el-table-column>
    </el-table>
    <div class="page-part">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="btn-continer">
      <el-button type="primary" @click="submitSelect">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getListEvaluate } from '@/api/trainingManagement/comprehensiveEvaluation'
import { EVALUATE_TYPE } from '@/utils/dict-enum'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      columns: null,
      templateRadio: null,
      templateInfo: {},
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0
    }
  },
  watch: {
    visible(newVal) {
      this.templateRadio = null
      this.dialogVisible = newVal
      this.selectRows = []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getListEvaluate({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        evaluateType: EVALUATE_TYPE.STUDENT
      }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.$emit('update:visible', false)
    },
    singleElection(row) {
      this.templateInfo = row
      this.templateRadio = row.evaluateTplId
    },
    submitSelect() {
      this.$emit('getTemplateInfo', this.templateInfo)
      this.closeDialog()
    },
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.btn-continer {
  padding-top: 20px;
  text-align: center;
}
.page-part {
  text-align: center;
}
</style>
