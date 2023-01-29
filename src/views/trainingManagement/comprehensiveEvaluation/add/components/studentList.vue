<template>
  <div>
    <div class="content-div">
      <!-- 学生列表 -->
      <div class="contentDiv-tableDiv">
        <div class="contentDiv-tableDiv-title">学生列表（{{ tableDataLeft.length }}人)</div>
        <el-table
          ref="multipleTable"
          :data="tableDataLeft"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChangeLeft"
        >
          <el-table-column type="selection" align="center" width="55" :selectable="selected">
          </el-table-column>
          <el-table-column prop="studentName" label="姓名" align="center"> </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0">未评</div>
              <div v-if="scope.row.status == 1">已评</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 切换按钮 -->
      <div class="cut-div">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          circle
          @click="moveToRight"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-right"
          circle
          @click="moveToRightAll"
        ></el-button>
        <el-button type="primary" icon="el-icon-arrow-left" circle @click="moveToLeft"></el-button>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-left"
          circle
          @click="moveToLeftAll"
        ></el-button>
        <!-- </div> -->
      </div>

      <!-- 已选学生 -->
      <div class="contentDiv-tableDiv">
        <div class="contentDiv-tableDiv-title">已选学生（{{ tableDataRight.length }}人)</div>
        <el-table
          :data="tableDataRight"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChangeRight"
          ref="multipleTable1"
        >
          <el-table-column type="selection" align="center" width="55"> </el-table-column>
          <el-table-column prop="studentName" align="center" label="姓名"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { studentList } from '@/api/trainingManagement/comprehensiveEvaluation'
import { EDIT, ADD, DETAIL, STUDENT_EVL_CODE } from '@/constants'

export default {
  props: {
    schoolClassId: {
      type: [Number, String],
      default: null
    },
    evaluateTplId: {
      type: [Number, String],
      default: null
    },
    pathType: {
      type: String,
      default: ADD
    },
    evaluateDate: {
      type: String,
      default: null
    }
  },
  watch: {
    schoolClassId(newVal) {
      if (newVal) {
        this.getStudentList(newVal)
      }
    },
    evaluateDate(newVal) {
      if (newVal && this.schoolClassId) {
        this.getStudentList(this.schoolClassId)
      }
    }
  },
  data() {
    return {
      tableDataLeft: [],
      tableDataLeftSelect: [],
      tableDataRight: [],
      tableDataRightSelect: []
    }
  },
  methods: {
    getStudentList(id) {
      let reqObj = {
        code: STUDENT_EVL_CODE,
        objSlaveId: id,
        evaluateDate: this.evaluateDate
      }
      if (this.pathType == EDIT || this.pathType === DETAIL) {
        reqObj.evaluateTplId = this.evaluateTplId
      }
      studentList(reqObj).then((res) => {
        if (res.code === 200) {
          this.tableDataLeft = res.data
          this.tableDataLeftSelect = []
          this.tableDataRight = []
          this.tableDataRightSelect = []
        }
      })
    },
    // 保存成功后的处理
    submitSuccess() {
      const tableDataRight = this.tableDataRight.map((item) => {
        return {
          ...item,
          status: 1
        }
      })
      this.tableDataLeft = [...tableDataRight, ...this.tableDataLeft]
      this.tableDataRight = []
    },
    // 移动到右边
    moveToRight() {
      if (this.tableDataLeftSelect.length == 0) {
        return
      }
      let ids = this.tableDataLeftSelect.map((item) => {
        return item.objId
      })
      this.tableDataLeft = this.tableDataLeft.filter((item) => !ids.includes(item.objId))
      this.tableDataRight = [
        ...this.tableDataRight,
        ...JSON.parse(JSON.stringify(this.tableDataLeftSelect))
      ]
      this.tableDataLeftSelect = []
    },
    // 全部移动到右边
    moveToRightAll() {
      this.tableDataRight = [
        ...this.tableDataRight,
        ...JSON.parse(JSON.stringify(this.tableDataLeft))
      ]
      this.tableDataLeft = []
    },
    // 移动到左边
    moveToLeft() {
      if (this.tableDataRightSelect.length == 0) {
        return
      }
      let ids = this.tableDataRightSelect.map((item) => {
        return item.objId
      })
      this.tableDataRight = this.tableDataRight.filter((item) => !ids.includes(item.objId))
      this.tableDataLeft = [
        ...this.tableDataLeft,
        ...JSON.parse(JSON.stringify(this.tableDataRightSelect))
      ]
      this.tableDataRightSelect = []
    },
    // 全部移动到左边
    moveToLeftAll() {
      this.tableDataLeft = [
        ...this.tableDataLeft,
        ...JSON.parse(JSON.stringify(this.tableDataRight))
      ]
      this.tableDataRight = []
    },
    // 学生多选
    handleSelectionChangeLeft(val) {
      this.tableDataLeftSelect = val
    },
    // 已选学生多选
    handleSelectionChangeRight(val) {
      this.tableDataRightSelect = val
    },
    selected(row) {
      if (row.status == 1) {
        return false // 不可勾选
      }
      return true // 可勾选
    }
  }
}
</script>

<style scoped lang="scss">
.content-div {
  display: flex;
  &-tableDiv {
    width: 320px;
    height: 600px;
    overflow: auto;
    border: 1px solid #afafaf;
    margin-right: 30px;
  }
  &-tableDiv2 {
    width: 410px;
    height: 600px;
    overflow: auto;
    border: 1px solid #afafaf;
    padding: 0 20px 10px 20px;
    margin-left: 50px;
  }
}
.contentDiv-tableDiv-title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 10px 0;
}

.cut-div {
  width: 80px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .el-button + .el-button {
    margin-left: 0;
  }
  &-btn {
    width: 100%;
    height: 60px;
    border: 1px solid #afafaf;
    color: #606263;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;
  }
  &-btn:hover {
    background: #afafaf;
  }
}
</style>
