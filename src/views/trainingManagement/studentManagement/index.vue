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
      <h4>学生信息</h4>
      <div class="btn">
        <el-button type="primary" @click="add" size="small">添加</el-button>
        <ty-export
          size="small"
          buttonText="下载导入模板"
          action="/system/classRelStudent/downloadStudentTemplate"
          exportName="人员模板"
          style="margin-left: 10px"
        ></ty-export>
        <ty-upload-file
          style="display: inline-block; margin-left: 10px"
          @change="importExcel1"
          @success="onSuccess"
          :fileMaxSize="2"
          :action="`/system/classRelStudent/importData/${$route.query.schoolClassId}`"
          :showUploadList="false"
          :fileSuffixs="fileType"
          uploadFileText="批量导入"
        >
          <el-button size="small" icon="el-icon-upload2" type="primary" slot="trigger"
            >批量导入</el-button
          >
        </ty-upload-file>
      </div>
      <div>
        <ty-table
          v-if="columns"
          id="classRelStudentId"
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
      <el-dialog :visible.sync="dialogVisible" width="30%" @closed="closeDialogVisible">
        <el-form :model="form" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="学生姓名" prop="studentName">
            <el-input v-model="form.studentName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" clearable placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in list"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              v-model="form.birthDate"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="民族" prop="nation">
            <el-select v-model="form.nation" clearable placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in listNa"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobilePhone">
            <el-input v-model="form.mobilePhone"></el-input>
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
  addClassRelStudent,
  editClassRelStudent,
  stdDetails,
  removeByIds,
  getDet,
  downloadStudentTemplate,
  importData
} from '@/api/trainingManagement/student.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { stringify } from 'json5'
import { deepClone } from '../../tool/build/utils'
import getColumns from './jsonData'

export default {
  components: {},
  filters: {
    filtersClass(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      list: [],
      listNa: [],
      visibleType: 'add',
      type: null,
      snt: null,
      classList: [],
      form: {
        mobilePhone: '',
        nation: null,
        birthDate: '',
        sex: null,
        studentName: '',
        schoolClassId: this.$route.query.schoolClassId
      },
      info: {},
      fileType: ['xlsx'],
      rules: {
        studentName: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
        mobilePhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      },
      columns: null
    }
  },
  created() {
    this.getData()
    console.log(this.$route.query.schoolClassId, 'ooo')
  },
  methods: {
    async getData() {
      // 数据初始化
      getDet(this.$route.query.schoolClassId).then((res) => {
        this.info = res.data
      })
      list({ schoolClassId: this.$route.query.schoolClassId }).then((res) => {
        this.tableData = res.data
      })
      this.columns = await getColumns()
      // 获取字典
      const {
        sys_nation_type: snt,
        sys_sex_type: type,
        sys_class_name: classList
      } = await getDictMultiple(['sys_nation_type', 'sys_sex_type', 'sys_class_name'])
      this.type = type
      this.snt = snt
      this.classList = classList
      this.list = [...type]
      this.listNa = [...snt]
    },

    add() {
      this.dialogVisible = true
      this.visibleType = 'add'
    },
    edit(row) {
      this.dialogVisible = true
      this.visibleType = 'edit'
      // 编辑回显
      stdDetails(row.classRelStudentId).then((res) => {
        this.form = res.data
        console.log(this.list, 'this.list')
        if (res.data.sex != null) {
          this.form.sex = stringify(res.data.sex)
        }
        this.form.nation = selectDictLabel(this.snt, res.data.nation)
      })
    },
    importExcel1(res) {
      console.log(res, 'youma')
      console.log(res.msg, 'youma')
      this.$message(res.res.msg)
      this.getData()
    },
    onSuccess(res) {
      // console.log('res')
      // console.log(res)
      // console.log(res.msg)
      // console.log('12134')
      // this.$message(res.msg)
      // // this.$message.success(res.msg)
      // this.getData()
    },
    sumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.visibleType == 'add') {
            let addForm = deepClone(this.form)
            console.log(addForm, 'addForm')
            addForm.schoolClassId = this.$route.query.schoolClassId
            addClassRelStudent(addForm).then((res) => {
              console.log(res, 'add')
              if (res.code == 200) {
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
              this.$refs[form].resetFields()
              this.getData()
            })
          } else if (this.visibleType == 'edit') {
            let editForm = deepClone(this.form)
            this.list.map((item) => {
              if (editForm.sex == item.dictLabel) {
                editForm.sex = Number(item.dictValue)
              }
            })
            this.listNa.map((item) => {
              if (editForm.nation == item.dictLabel) {
                editForm.nation = Number(item.dictValue)
              }
            })
            editClassRelStudent(editForm).then((res) => {
              console.log(res)
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.dialogVisible = false
          }
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
          removeByIds(row.classRelStudentId).then((res) => {
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
