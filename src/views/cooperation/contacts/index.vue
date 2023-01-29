<template>
  <div class="activity-management-list">
    <ty-business-crud
      v-if="columns"
      :id="'projectParticipantId'"
      class="high-search-crud"
      mainKey="ty-list"
      :showIndex="true"
      :showSelect="true"
      :columns="columns"
      search-mode="high"
      :getListInterface="getListInterface"
      :showSearchFields="['nickName', 'phone', 'unit']"
      title=""
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :border="false"
      :showOperation="[]"
      ref="listCrud"
    >
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addProject">新增</el-button>
          <el-button size="small" :disabled="!isChange" @click="deleteData">删除</el-button>
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="share(row)" v-if="row.status == 0"
            >分享</el-button
          >
          <el-button size="mini" type="text" @click="checkEdit(row, 0)" v-if="row.status == 0"
            >详情</el-button
          >
          <el-button size="mini" type="text" @click="checkEdit(row, 1)" v-if="row.status == 1"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="deleteData(row)">删除</el-button>
        </div>
      </template>
    </ty-business-crud>
    <!-- 新建协同联系人 -->
    <el-dialog
      :title="titleFun"
      :visible.sync="dialogVisible"
      width="30%"
      @closed="closeDialogVisible"
    >
      <el-form :model="form" label-width="100px" :disabled="disabled" :rules="rules" ref="form">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="unit">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>
        <div class="tip">账号默认密码a123456,请告知对方登录修改密码！</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible('form')">取 消</el-button>
        <el-button type="primary" @click="sumbit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 邀请成为协同联系人 -->
    <el-dialog
      title="返回"
      :visible.sync="inviteDialogVisible"
      width="30%"
      @closed="inviteCloseDialogVisible"
    >
      <div slot="title"><el-button type="text" @click="back()">返回</el-button></div>

      <div class="header-item">
        <h2>邀请成为协同联系人</h2>
        <div>请将链接或二维码发给协同联系人确认</div>
        <div class="more"></div>
        <div class="row">分享至</div>
      </div>
      <div class="share-btn-list">
        <!-- <div class="share-btn-item">
            <el-button icon="el-icon-s-custom" circle @click="showPeople"></el-button>
            <span>协同联系人</span>
          </div> -->
        <div class="share-btn-item">
          <el-button icon="el-icon-link" circle @click="copyLink"></el-button>
          <span>复制链接</span>
        </div>
        <!-- <div class="share-btn-item">
          <el-button icon="el-icon-s-grid" circle @click="showLinkCode"></el-button>
          <span>生成二维码</span>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  removeByIds,
  getDetails,
  addProjectParticipant,
  editProjectParticipant,
  getPower
} from '@/api/cooperation/contacts.js'
import getColumns from './jsonData'

export default {
  components: {},
  data() {
    return {
      form: {
        nickName: '',
        phone: '',
        unit: '',
        status: null
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
      inviteDialogVisible: false,
      disabled: false,
      columns: null,
      visibleType: 'add',
      searchDateRangShow: false,
      selectIds: [],
      // tableselectionRows: [],
      url: `${process.env.VUE_APP_BASE_URL}inviteContacts`,
      pptId: null,
      nName: '',
      iPhone: '',
      iUnit: '',
      adress: '',
      isShare: '',
      rules: {
        nickName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入公司名称', trigger: 'blur' }]
      },
      getListInterface: {
        url: '/system/projectParticipant/list',
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
  watch: {},
  computed: {
    titleFun() {
      if (this.visibleType == 'add') {
        return '新建联系人详情'
      }
      if (this.visibleType == 'edit') {
        return '修改协同联系人'
      }
      return '协同联系人详情'
    },
    isChange() {
      return this.selectIds.length > 0
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },

    closeDialogVisible(form) {
      this.form = {}
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
          if (this.visibleType == 'add') {
            addProjectParticipant(this.form).then((res) => {
              console.log(res, 'add')
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.pptId = res.data.projectParticipantId
                this.isShare = 'add'
                console.log(res, 'res')

                console.log(this.pptId, 'this.pptId')
              } else {
                this.$message.error(res.msg)
              }
              this.$refs[form].resetFields()
              this.$refs.listCrud.setCheckList([])
              this.$refs.listCrud._getListData()
              this.inviteDialogVisible = true
            })
          } else if (this.visibleType == 'edit') {
            editProjectParticipant(this.form).then((res) => {
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
      console.log(this.selectIds, '55555')
    },
    deleteData(row) {
      this.confirm('确认删除所选协同联系人？', async () => {
        let projectParticipantIds = ''
        if (row.projectParticipantId) {
          projectParticipantIds = row.projectParticipantId
        } else {
          let arr = []
          if (this.selectIds) {
            for (let item of this.selectIds) {
              arr.push(item.projectParticipantId)
            }
            projectParticipantIds = arr.toString()
          }
        }
        removeByIds(projectParticipantIds).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.selectIds = []
            this.$refs.listCrud.setCheckList([])
            this.$refs.listCrud._getListData()
          }
        })
      })
    },
    // 查看详情
    checkEdit(row, type) {
      getDetails(row.projectParticipantId).then((res) => {
        console.log(res, 'res')
        this.form = res.data
        if (type == 0) {
          this.visibleType = 'check'
          // this.inviteDialogVisible = true
          this.disabled = true
          this.dialogVisible = true
        } else {
          this.visibleType = 'edit'
          this.disabled = false
          this.dialogVisible = true
        }
      })
    },
    share(row) {
      this.inviteDialogVisible = true
      this.isShare = 'share'
      getPower(row.projectParticipantId).then((res) => {
        console.log(res, 'res')
        this.iPhone = res.data.movTel
        this.nName = res.data.inviter
        this.iUnit = res.data.companyName
        this.pptId = row.projectParticipantId
        let { pptId, nName, iPhone, iUnit } = this
        // base64加密
        this.adress = `${this.url}?info=${JSON.stringify({ pptId, nName, iPhone, iUnit })}`
      })
      getDetails(row.projectParticipantId).then((res) => {
        if (res.code == 200) {
          this.form = res.data
          this.disabled = true
        }
      })
    },
    addRemind() {
      this.newWindow({})
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    },
    back() {
      this.dialogVisible = true
      this.inviteDialogVisible = false
    },
    // 复制链接
    copyLink() {
      if (this.isShare == 'add') {
        getPower(this.pptId).then((res) => {
          console.log(res, 'res')
          this.iPhone = res.data.movTel
          this.nName = res.data.inviter
          this.iUnit = res.data.companyName
          let that = this
          let { pptId, nName, iPhone, iUnit } = this
          // base64加密
          this.link = `${this.url}?info=${JSON.stringify({ pptId, nName, iPhone, iUnit })}`
          this.adress = this.link
          console.log(this.link, 'this.link')
          console.log(nName, 'nName')
          console.log(pptId, 'pptId')
          console.log(iPhone, 'iPhone')
          this.$copyText(this.link).then(
            function (e) {
              that.$message.success('复制到粘贴板成功')
            },
            function (e) {
              that.$message.error('复制失败')
            }
          )
        })
      }
      if (this.isShare == 'share') {
        let that = this
        this.$copyText(this.adress).then(
          function (e) {
            that.$message.success('复制到粘贴板成功')
          },
          function (e) {
            that.$message.error('复制失败')
          }
        )
      }
    },
    inviteCloseDialogVisible() {
      this.inviteDialogVisible = false
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
.share-btn-list {
  @include faj(center, flex-start);
  .share-btn-item {
    padding: 0 30px;
    @include fcaj(center, flex-start);
    span {
      padding-top: 10px;
    }
  }
}
.more {
  border-bottom: 1px solid #e1e5ee;
  margin-bottom: 45px;
  margin-top: 40px;
  width: 90%;
}
.row {
  color: #9d9fa3;
}
.header-item {
  margin-left: 7%;
  margin-bottom: 15px;
}
.tip {
  color: red;
  font-size: small;
  margin-left: 10%;
}
</style>
