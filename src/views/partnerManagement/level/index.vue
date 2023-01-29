<template>
  <div class="list">
    <ty-business-crud
      id="partnerLevelId"
      v-if="columns"
      class="high-search-crud"
      mainKey="ty-list"
      :showIndex="true"
      :showSelect="true"
      :columns="columns"
      search-mode="base"
      :getListInterface="getListInterface"
      :showSearchFields="['levelName']"
      title=""
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :border="false"
      :showOperation="[]"
      ref="listCrud"
    >
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addProject">新增等级</el-button>
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <!-- <el-button size="mini" type="text" @click="checkEdit(row, 0)" v-if="row.status == 0"
            >详情</el-button
          > -->
          <el-button size="mini" type="text" @click="checkEdit(row, 1)">编辑</el-button>
          <el-button size="mini" type="text" @click="deleteData(row)">删除</el-button>
        </div>
      </template>
    </ty-business-crud>
    <el-dialog
      :title="titleFun"
      :visible.sync="dialogVisible"
      width="45%"
      @closed="closeDialogVisible"
    >
      <el-form :model="form" label-width="150px" :disabled="disabled" :rules="rules" ref="form">
        <el-form-item label="企业等级" prop="levelName">
          <el-input v-model="form.levelName"></el-input>
        </el-form-item>
        <el-form-item label="垫付额度范围(元)" prop="overdraftMax">
          <el-input-number v-model="form.overdraftMin" :min="0"></el-input-number>
          ——
          <el-input-number v-model="form.overdraftMax" :min="form.overdraftMin"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialogVisible('form')">取 消</el-button>
        <el-button size="small" type="primary" @click="sumbit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  removeByIds,
  getDetails,
  addPartnerLevel,
  editPartnerLevel
} from '@/api/partnerManagement/level.js'
import getColumns from './jsonData'

export default {
  components: {},
  data() {
    return {
      form: {
        levelName: '',
        overdraftMin: 0,
        overdraftMax: 0
      },
      dataList: [
        {
          label: '待确认',
          value: '0'
        },
        {
          label: '已完成',
          value: '1'
        }
      ],
      dialogVisible: false,
      disabled: false,
      columns: null,
      visibleType: 'add',
      searchDateRangShow: false,
      selectIds: [],
      rules: {
        levelName: [{ required: true, message: '请输入企业等级', trigger: 'blur' }],
        overdraftMax: [{ required: true, message: '请输入垫付额度范围', trigger: 'blur' }]
      },
      getListInterface: {
        url: '/system/level/list',
        methodType: 'get',
        params: {
          nickName: '',
          phone: '',
          unit: ''
        }
      }
    }
  },

  created() {
    this.init()
  },
  watch: {
    // tableSelection(val) {
    //   this.handleSelectionChange(val)
    //   console.log(val)
    // }
  },
  computed: {
    titleFun() {
      if (this.visibleType == 'add') {
        return '新建等级'
      }
      if (this.visibleType == 'edit') {
        return '修改等级'
      }
      return '等级详情'
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },

    closeDialogVisible(form) {
      this.form = {
        levelName: '',
        overdraftMin: 0,
        overdraftMax: 0
      }
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    addProject() {
      this.visibleType = 'add'
      this.disabled = false
      this.dialogVisible = true
    },
    sumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.overdraftMin >= this.form.overdraftMax) {
            this.$message.error('垫付额度范围最少额度不能大于等于最大额度')
            return
          }
          if (this.visibleType == 'add') {
            addPartnerLevel(this.form).then((res) => {
              console.log(res, 'add')
              if (res.code == 200) {
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
              this.$refs[form].resetFields()
              this.$refs.listCrud.setCheckList([])
              this.$refs.listCrud._getListData()
            })
          } else if (this.visibleType == 'edit') {
            editPartnerLevel(this.form).then((res) => {
              console.log(res)
              this.$refs.listCrud.setCheckList([])
              this.$refs.listCrud._getListData()
            })
          } else {
            this.dialogVisible = false
          }
          this.dialogVisible = false
        }
      })
    },
    handleSelectionChange(selection) {
      this.selectIds = selection
    },
    deleteData(row) {
      this.$confirm('是否确认删除该等级?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeByIds(row.partnerLevelId).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.$refs.listCrud.setCheckList([])
              this.$refs.listCrud._getListData()
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
    // 查看详情
    checkEdit(row, type) {
      getDetails(row.partnerLevelId).then((res) => {
        console.log(res, 'res')
        this.form = res.data
        if (type == 0) {
          this.visibleType = 'check'
          this.disabled = true
        } else {
          this.visibleType = 'edit'
          this.disabled = false
        }
        this.dialogVisible = true
      })
    },

    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    }
  }
}
</script>

<style lang="scss" scoped>
.high-search-crud ::v-deep {
  .searchBox-high-operator-bar {
    display: none;
  }
}
</style>
