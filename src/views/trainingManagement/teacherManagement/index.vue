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
      <h4>老师信息</h4>
      <div class="btn">
        <el-button type="primary" @click="add" size="small">添加</el-button>
      </div>
      <div>
        <ty-table
          v-if="columns"
          id="classRelTeacherId"
          :columns="columns"
          :data="tableData"
          :border="false"
          :hidePage="true"
        >
          <template slot="headTeacher" slot-scope="{ row }">
            <el-switch
              @change="changeHeadTeacher(row)"
              v-model="row.headTeacher"
              :active-value="active"
              :inactive-value="inactive"
            >
            </el-switch>
          </template>
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
        <el-form :model="form" label-width="100px" :disabled="disabled" :rules="rules" ref="form">
          <el-form-item label="老师姓名" prop="teacherName">
            <el-input v-model="form.teacherName"></el-input>
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
          <el-form-item label="学历" prop="education">
            <el-select v-model="form.education" clearable placeholder="请选择" style="width: 100%">
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
          <el-form-item label="设为班主任" prop="headTeacher">
            <el-switch v-model="form.headTeacher" :active-value="active" :inactive-value="inactive">
            </el-switch>
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
  add,
  edit,
  teacherDet,
  removeByIds,
  editHeadTeacher
} from '@/api/trainingManagement/teacher.js'
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
      form: {
        education: null,
        mobilePhone: '',
        headTeacher: null,
        sex: null,
        teacherName: '',
        schoolClassId: this.$route.query.schoolClassId
      },
      active: 1,
      inactive: 0,
      info: {},
      value: '',
      columns: null,
      rules: {
        teacherName: [{ required: true, message: '请输入老师姓名', trigger: 'blur' }],
        mobilePhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 数据初始化
      getDet(this.$route.query.schoolClassId).then((res) => {
        this.info = res.data
      })
      list({ schoolClassId: this.$route.query.schoolClassId }).then((res) => {
        console.log(res, '888')
        this.tableData = res.data
      })
      // 获取字典
      const {
        uc_education: edc,
        sys_sex_type: type,
        sys_class_name: classList
      } = await getDictMultiple(['uc_education', 'sys_sex_type', 'sys_class_name'])
      this.edc = edc
      this.type = type
      this.list = [...type]
      this.listNa = [...edc]
      this.classList = classList
      this.columns = await getColumns()
    },
    changeHeadTeacher(row) {
      console.log(row)
      // this.form.headTeacher = row
      editHeadTeacher({
        classRelTeacherId: row.classRelTeacherId,
        headTeacher: row.headTeacher
      }).then((res) => {
        console.log(res)
        this.getData()
      })
    },
    add() {
      this.dialogVisible = true
      this.visibleType = 'add'
    },
    edit(row) {
      this.dialogVisible = true
      this.visibleType = 'edit'
      // 编辑回显
      teacherDet(row.classRelTeacherId).then((res) => {
        this.form = res.data
        console.log(res, 'res')
        console.log(this.form, ' this.form')
        if (res.data.sex == null) {
          this.form.sex = ''
        } else {
          this.form.sex = selectDictLabel(this.type, res.data.sex)
        }
        if (res.data.education == null) {
          this.form.education = ''
        } else {
          this.form.education = selectDictLabel(this.edc, res.data.education)
        }
      })
    },
    sumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.visibleType == 'add') {
            let addForm = deepClone(this.form)
            addForm.schoolClassId = this.$route.query.schoolClassId
            add(addForm).then((res) => {
              console.log(res, 'add')
              if (res.code == 200) {
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
              this.$refs[form].resetFields()
              this.getData()
              this.addForm = {}
            })
          } else if (this.visibleType == 'edit') {
            let editForm = deepClone(this.form)
            this.list.map((item) => {
              if (editForm.sex == item.dictLabel) {
                editForm.sex = Number(item.dictValue)
              }
            })
            this.listNa.map((item) => {
              if (editForm.education == item.dictLabel) {
                editForm.education = Number(item.dictValue)
              }
            })
            edit(editForm).then((res) => {
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
          removeByIds(row.classRelTeacherId).then((res) => {
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
