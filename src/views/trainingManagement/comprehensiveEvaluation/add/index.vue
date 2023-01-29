<template>
  <div class="create-page">
    <div class="comprehensive-left">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item prop="evaluateDate" label="评价日期">
          <el-date-picker
            :disabled="isEdit || isDetail"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.evaluateDate"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form label-width="90px" class="demo-ruleForm">
        <el-form-item label="评价对象" required>
          <el-button type="text" @click="visible = true" :disabled="isEdit || isDetail"
            >选择</el-button
          >
        </el-form-item>
      </el-form>
      <div v-if="schoolClassInfo">
        <span>{{ schoolClassInfo.customName }}</span> <span>{{ schoolClassInfo.name }}班</span>
      </div>
      <student-list
        :evaluateDate="ruleForm.evaluateDate"
        :schoolClassId="schoolClassId"
        ref="studentList"
        :evaluateTplId="evaluateTplId"
        :pathType="pathType"
      ></student-list>
      <class-list-dialog :visible.sync="visible" @getClassInfo="getClassInfo"></class-list-dialog>
    </div>
    <div class="comprehensive-right">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-form-item required label="评价模板">
          <el-button type="text" @click="templateVisible = true" :disabled="isEdit || isDetail"
            >选择</el-button
          >
        </el-form-item>
      </el-form>
      <template-detail :evaluateTplId="evaluateTplId" ref="templateDetail"></template-detail>
      <div class="template-btn" v-if="evaluateTplId">
        <el-button type="primary" size="mini" @click="submit(1)">保存</el-button>
        <el-button type="primary" size="mini" @click="checkSummary">查看汇总</el-button>
        <el-button type="primary" size="mini" @click="submit(2)">提交</el-button>
      </div>
      <template-list-dialog
        :visible.sync="templateVisible"
        @getTemplateInfo="getTemplateInfo"
      ></template-list-dialog>
    </div>
  </div>
</template>

<script>
import { EVALUATE_TYPE } from '@/utils/dict-enum'
import { saveStudentEvaluate, evaluateInfo } from '@/api/trainingManagement/comprehensiveEvaluation'
import { getLastPath } from '@/utils/share'
import { EDIT, DETAIL, STUDENT_EVL_CODE } from '@/constants'
import studentList from './components/studentList.vue'
import classListDialog from './components/classListDialog.vue'
import templateListDialog from './components/templateListDialog.vue'
import templateDetail from './components/templateDetail.vue'

export default {
  components: { studentList, classListDialog, templateListDialog, templateDetail },
  data() {
    return {
      visible: false,
      templateVisible: false,
      ruleForm: {
        evaluateDate: ''
      },
      rules: {
        evaluateDate: [
          { type: 'string', required: true, message: '请选择评价日期', trigger: 'change' }
        ]
      },
      schoolClassInfo: null,
      schoolClassId: null,
      evaluateTplId: null,
      evaluateId: this.$route.query.evaluateId,
      pathType: null,
      editFlag: false
    }
  },
  computed: {
    isEdit() {
      return this.pathType === EDIT || this.editFlag
    },
    isDetail() {
      return this.pathType === DETAIL
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const pathType = getLastPath(this.$route)
      this.pathType = pathType
      if (pathType === EDIT || pathType === DETAIL) {
        this.getDetail()
      }
    },
    submit(type) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$refs.studentList.tableDataRight.length === 0) {
            this.$message.error('请先选择评价的学生')
            return ''
          }
          let studentList = this.$refs.studentList.tableDataRight
          const addEvaluateDtos = studentList.map((item) => {
            return {
              code: STUDENT_EVL_CODE,
              evaluateDate: this.ruleForm.evaluateDate,
              objId: item.objId,
              objSlaveId: this.schoolClassId,
              objSlaveType: EVALUATE_TYPE.STUDENT,
              objType: EVALUATE_TYPE.STUDENT,
              objName: item.studentName,
              evaluateTplId: this.evaluateTplId,
              evaluateItemDtos: this.$refs.templateDetail.evaluateTplValueList,
              evaluateStatus: type
            }
          })
          saveStudentEvaluate(addEvaluateDtos).then((res) => {
            if (res.code === 200) {
              this.editFlag = true
              if (type == 2) {
                this.$router.go(-1)
                return
              }
              this.evaluateId = res.data[0]
              // this.$router.push({
              //   path: `/comprehensiveEvaluation/${EDIT}`,
              //   query: {
              //     evaluateId: res.data[0]
              //   }
              // })
              // const newUrl = `/comprehensiveEvaluation/${EDIT}?evaluateId=${res.data[0]}`
              // window.history.replaceState('', '', newUrl)
              // this.$refs.templateDetail.resetValueList()
              // this.$refs.studentList.submitSuccess()
              this.$message.success('保存成功')
            }
          })
        }
      })
    },
    // 获取详情
    getDetail() {
      evaluateInfo({
        evaluateId: this.evaluateId
      }).then((res) => {
        if (res.code === 200) {
          const { evaluateDate, evaluateTplId, objSlaveId } = res.data
          this.ruleForm.evaluateDate = evaluateDate
          this.schoolClassId = objSlaveId
          this.evaluateTplId = evaluateTplId
        }
      })
    },
    // 获取班级列表返回的信息
    getClassInfo(value) {
      this.schoolClassId = value.schoolClassId
      this.schoolClassInfo = value
    },
    // 获取评价模板返回的信息
    getTemplateInfo(value) {
      this.evaluateTplId = value.evaluateTplId
      console.log(this.$refs.studentList)
      this.$refs.studentList.getStudentList(this.schoolClassId)
    },
    checkSummary() {
      this.$router.replace({
        path: '/comprehensiveEvaluation/evaluateSummary',
        query: {
          evaluateTplId: this.evaluateTplId,
          objSlaveId: this.schoolClassId,
          evaluateDate: this.ruleForm.evaluateDate,
          evaluateId: this.evaluateId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.create-page {
  @include faj(flex-start, flex-start);
}
.comprehensive-left {
  width: 60%;
}
.comprehensive-right {
  border-left: 10px solid #ccc;
  padding-left: 10px;
  width: 40%;
}
.template-content {
  padding: 20px;
  border-top: 1px solid #ccc;
  font-size: 14px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  .template-name {
    font-weight: 500;
  }
  .template-explain {
    background-color: #f2f2f2;
    padding: 10px;
  }
  .template-item {
    background-color: #f2f2f2;
    padding: 10px;
    .suffix {
      padding-left: 10px;
    }
  }
}
.template-btn {
  padding: 10px;
  text-align: center;
}
</style>
