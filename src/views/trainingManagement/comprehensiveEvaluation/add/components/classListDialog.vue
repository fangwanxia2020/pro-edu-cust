<template>
  <el-dialog title="选择班级" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
    <el-table :data="tableData" border style="width: 100%" @row-click="singleElection">
      <el-table-column label="" width="65">
        <template slot-scope="{ row }">
          <el-radio class="radio" v-model="templateRadio" :label="row.schoolClassId"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column prop="studentDate" label="入学时间"> </el-table-column>
      <el-table-column prop="customName" label="自定义名称"> </el-table-column>
      <el-table-column prop="name" label="班级">
        <template slot-scope="{ row }">
          <span>{{ sysCassNameText(row.name) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentNum" label="学生数"> </el-table-column>
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
import { schoolClassList } from '@/api/trainingManagement/comprehensiveEvaluation'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'

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
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      classInfo: {},
      sysCassName: []
    }
  },
  computed: {
    sysCassNameText() {
      return function (val) {
        return selectDictLabel(this.sysCassName, val) || '-'
      }
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
    async init() {
      const { sys_class_name: sysCassName } = await getDictMultiple(['sys_class_name'])
      this.sysCassName = sysCassName
      this.getClassList()
    },
    getClassList() {
      schoolClassList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        query: []
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
      this.templateRadio = row.schoolClassId
      this.classInfo = row
    },
    submitSelect() {
      this.$emit('getClassInfo', this.classInfo)
      this.closeDialog()
    },
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.getClassList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getClassList()
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
