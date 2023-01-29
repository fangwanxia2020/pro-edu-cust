<template>
  <div>
    <div class="header">
      <h4>班级信息</h4>
      <div>
        <el-row>
          <el-col :span="12"
            ><div>
              入学时间:
              <span>{{ info.studentDate }}</span>
            </div></el-col
          >
          <el-col :span="12"
            ><div>
              班级:
              <span>{{ info.name | filtersClass(classList) }}</span>
            </div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              所在年级:
              <span>{{ info.level }}</span>
            </div></el-col
          >
          <el-col :span="12"
            ><div>
              班级上限人数:
              <span>{{ info.capacity }}</span>
            </div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div>
              自定义名称:
              <span>{{ info.customName }}</span>
            </div></el-col
          >
          <el-col :span="12"
            ><div>
              关联订单:
              <span>{{ info.orderNum }}</span>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="contain">
      <h4>培训内容</h4>
      <div class="btn">
        <el-button type="primary" @click="add" size="small">添加</el-button>
      </div>
      <div>
        <!-- <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="trainingContent" label="培训内容"> </el-table-column>
          <el-table-column
            prop="trainingType"
            label="培训分类"
            width="280"
            :formatter="formatterType"
          ></el-table-column>
          <el-table-column
            prop="trainingTeacherNameList"
            label="培训老师"
            width="280"
            :formatter="formatterEdc"
          >
          </el-table-column>
          <el-table-column prop="time" label="培训时间" width="380" :formatter="formatterTime">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table> -->
        <ty-table
          v-if="columns"
          id="classRelTeacherId"
          :columns="columns"
          :data="tableData"
          :border="false"
          :hidePage="true"
        >
          <template #operation="{ row }">
            <el-button size="mini" type="text" @click="edit(row)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteRow(row)">删除</el-button>
          </template>
        </ty-table>
      </div>
    </div>
    <div>
      <el-dialog
        :title="titleFun"
        :visible.sync="dialogVisible"
        width="30%"
        @closed="closeDialogVisible"
      >
        <el-form :model="form" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="培训内容" prop="trainingContent">
            <el-input v-model="form.trainingContent"></el-input>
          </el-form-item>
          <el-form-item label="培训分类" prop="trainingType">
            <el-select
              v-model="form.trainingType"
              clearable
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in list"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训老师" prop="trainingTeacherIdList">
            <el-select
              v-model="form.trainingTeacherIdList"
              multiple
              clearable
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in listNa"
                :key="item.classRelTeacherId"
                :label="item.teacherName"
                :value="item.classRelTeacherId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训时间" prop="time">
            <el-date-picker
              v-model="form.time"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
              @change="handleDateRangeChange"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialogVisible('form')">取 消</el-button>
          <el-button type="primary" @click="sumbit('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="btn-footer">
      <el-button type="primary" @click="backClass()">保存</el-button>
      <el-button @click="backClass()">取 消</el-button>
    </div>
  </div>
</template>

<script>
import {
  list,
  getDet,
  addTrainingContent,
  listNoPage,
  editDet,
  editTrainingContent,
  removeByIds
} from '@/api/trainingManagement/content.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { deepClone } from '../../tool/build/utils'
import getColumns from './jsonData'

export default {
  filters: {
    filtersClass(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      classList: [],
      tableData: [],
      dialogVisible: false,
      list: [],
      listNa: [],
      visibleType: 'add',
      edc: null,
      type: null,
      columns: null,
      form: {
        time: [],
        trainingContent: '',
        trainingTeacherIdList: [],
        trainingStartTime: '',
        trainingEndTime: '',
        trainingType: null
      },
      active: 1,
      inactive: 0,
      info: {},
      value: '',
      rules: {
        trainingContent: [{ required: true, message: '请输入', trigger: 'blur' }],
        trainingTeacherIdList: [{ required: true, message: '请选择', trigger: 'change' }],
        trainingType: [{ required: true, message: '请选择', trigger: 'change' }],
        time: [{ required: true, message: '请输入日期', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getData()
  },
  computed: {
    titleFun() {
      return this.visibleType === 'add' ? '新增' : '修改'
    }
  },
  methods: {
    async getData() {
      // 数据初始化
      this.columns = await getColumns()
      getDet(this.$route.query.schoolClassId).then((res) => {
        this.info = res.data
      })
      list({ schoolClassId: this.$route.query.schoolClassId }).then((res) => {
        console.log(res, 'kkkk')
        this.tableData = res.data.records
      })
      listNoPage({ schoolClassId: this.$route.query.schoolClassId }).then((res) => {
        console.log(res, '??')
        this.listNa = res.data
      })
      // 获取字典
      const { training_type: type, sys_class_name: classList } = await getDictMultiple([
        'training_type',
        'sys_class_name'
      ])
      this.classList = classList
      this.type = type
      this.list = [...type]
    },
    add() {
      this.dialogVisible = true
      this.visibleType = 'add'
    },
    edit(row) {
      this.dialogVisible = true
      this.visibleType = 'edit'
      // 编辑回显
      editDet(row.trainingContentId).then((res) => {
        if (res.code == 200) {
          this.form = res.data
          console.log(res, 'res编辑')
          this.form.trainingType = selectDictLabel(this.type, res.data.trainingType)
          let arr = []
          arr[0] = res.data.trainingStartTime
          arr[1] = res.data.trainingEndTime
          this.$set(this.form, 'time', arr)
          // this.form.time = arr
          // this.form.time.push(res.data.trainingStartTime.split(' ')[0])
          // this.form.time.push(res.data.trainingEndTime.split(' ')[0])
          // console.log(this.form.time, '..this.form.time')
        }
      })
    },
    sumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.visibleType == 'add') {
            let addForm = deepClone(this.form)
            addForm.trainingStartTime = addForm.time[0]
            addForm.trainingEndTime = addForm.time[1]
            addForm.trainingTeacherIdList = this.form.trainingTeacherIdList
            addForm.schoolClassId = this.$route.query.schoolClassId
            console.log(addForm.schoolClassId, 'taddForm.schoolClassId')
            console.log(addForm, 'addForm')
            addTrainingContent(addForm).then((res) => {
              console.log(res, 'add')
              if (res.code == 200) {
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
              this.$refs[form].resetFields()
              this.getData()
            })
          }
          if (this.visibleType == 'edit') {
            let editForm = deepClone(this.form)
            this.list.map((item) => {
              if (editForm.trainingType == item.dictLabel) {
                editForm.trainingType = Number(item.dictValue)
              }
            })
            editForm.trainingTeacherIdList = this.form.trainingTeacherIdList
            console.log(this.form.time, 'this.form.time11111')
            console.log(editForm, 'editForm')
            editTrainingContent(editForm).then((res) => {
              console.log(res)
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
          this.dialogVisible = false

          this.dialogVisible = false
        }
      })
    },
    closeDialogVisible(form) {
      this.form = {}
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    deleteRow(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeByIds([row.trainingContentId]).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.getData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    backClass() {
      this.$router.go(-1)
    },
    handleDateRangeChange(time) {
      this.form.trainingStartTime = time[0]
      this.form.trainingEndTime = time[1]
      console.log(this.form.time, 'this.form.time')
    }
  }
}
</script>

<style scoped lang="scss">
.btn-footer {
  // display: flex;
  // justify-content: center;
  text-align: center;
  margin: 10px;
}
</style>
