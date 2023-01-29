<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="studentName" label="评价对象"> </el-table-column>
      <el-table-column
        :prop="item.evaluateTplItemId"
        :label="item.tplItemName"
        v-for="item in evaluateTplValueList"
        :key="item.evaluateTplItemId"
      >
      </el-table-column>
    </el-table>
    <div class="summary-btn">
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { studentList, getTplInfo } from '@/api/trainingManagement/comprehensiveEvaluation'
import { STUDENT_EVL_CODE, EDIT } from '@/constants'

export default {
  data() {
    return {
      tableData: [],
      evaluateTplId: this.$route.query.evaluateTplId,
      evaluateId: this.$route.query.evaluateId,
      objSlaveId: this.$route.query.objSlaveId,
      evaluateDate: this.$route.query.evaluateDate,
      evaluateTplValueList: []
    }
  },
  created() {
    this.getInfo()
    this.getStudentList()
  },
  methods: {
    getStudentList() {
      let reqObj = {
        code: STUDENT_EVL_CODE,
        objSlaveId: this.objSlaveId,
        evaluateTplId: this.evaluateTplId,
        evaluateDate: this.evaluateDate
      }
      studentList(reqObj).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.map((item) => {
            let obj = {
              studentName: item.studentName
            }
            item.evaluateItemStudentVos &&
              item.evaluateItemStudentVos.forEach((item1) => {
                obj[item1.tplItemId] = item1.selectValue
              })
            return obj
          })
        }
      })
    },
    // 获取详情
    getInfo() {
      getTplInfo(this.evaluateTplId).then((res) => {
        if (res.code === 200) {
          this.evaluateTplValueList = res.data.evaluateTplItemVos.map((item) => {
            return {
              evaluateTplItemId: `${item.evaluateTplItemId}`,
              tplItemName: item.tplItemName
            }
          })
        }
      })
    },
    goBack() {
      this.$router.replace({
        path: `/comprehensiveEvaluation/${EDIT}`,
        query: {
          evaluateId: this.evaluateId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.summary-btn {
  padding-top: 10px;
  text-align: center;
}
</style>
