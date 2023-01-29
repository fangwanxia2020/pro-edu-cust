<template>
  <div class="page">
    <p>合作项目名称: {{ projectName }}</p>
    <p class="title">合作事项</p>
    <div class="btns-bar" v-if="!isView">
      <el-button type="primary" size="small" @click="handleAdd">增加</el-button>
      <el-button size="small" :disabled="canDeleted" @click="handleDelete()">删除</el-button>
      <el-button size="small" @click="navigater('/cooperation/cooperativeManage')">返回</el-button>
      <!-- <el-button type="primary" size="small">分享</el-button> -->
    </div>
    <ty-table
      id="projectMissionId"
      ref="missionTable"
      :columns="tipColumns"
      :data="tableData"
      :showSelect="true"
      :showIndex="false"
      :checkList.sync="tableselectionRows"
      :hidePage="true"
    >
      <template v-slot:operation="scope">
        <el-button
          size="mini"
          type="text"
          v-if="showPublic(scope.row)"
          icon="el-icon-edit"
          @click="handleUpdate(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="text"
          icon="el-icon-search"
          v-if="showDetail(scope.row)"
          @click="goDetail(scope.row)"
          >详情</el-button
        >
        <el-button
          size="mini"
          v-if="showShare(scope.row)"
          type="text"
          icon="el-icon-edit"
          @click="openShare(scope.row)"
          >分享</el-button
        >
        <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          v-if="showPublic(scope.row)"
          @click="publicUpdate(scope.row)"
          >发布</el-button
        >

        <el-button
          v-if="showDel(scope.row)"
          size="mini"
          type="text"
          icon="el-icon-delete"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </ty-table>
    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <pc-form :disabled="disabled" :data="jsonData" v-model="editData" ref="infoForm">
        <template slot="requireCompletionUnitId">
          <el-select v-model="editData.selfId" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.selfId"
              :label="item.partnerName"
              :value="item.selfId"
            >
            </el-option>
          </el-select>
        </template>
      </pc-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <share-dialog
      :dialogVisible.sync="dialogVisible"
      :projectMissionId="projectMissionId"
    ></share-dialog>
  </div>
</template>

<script>
import {
  addBatchProjectMission,
  removeProMissionAndFollowByPids,
  shareProjectMission,
  editProjectMission,
  releaseProjectMission,
  completionUnitList,
  projectMissionList
} from '@/api/cooperation/cooperativeManage'
import shareDialog from '@/views/cooperation/workWithMe/detail/components/shareDialog.vue'
import { getTipColumns, newTipForm } from './cooperationForm'

export default {
  name: '',
  components: { shareDialog },
  data() {
    return {
      isView: Boolean(this.$route.query.isView),
      tipColumns: [],
      tableselectionRows: [],
      tableData: [],
      projectId: this.$route.query.projectId ? this.$route.query.projectId : null,
      projectName: this.$route.query.projectName ? this.$route.query.projectName : '',
      open: false,
      title: '',
      editData: {
        missionName: '',
        missionNote: '',
        finishDate: '',
        requireCompletionUnitId: '',
        requireCompletionUnit: '',
        requireCompletionPeople: '',
        requireCompletionObjType: '',
        selfId: null,
        requireCompletionTime: null
      },
      disabled: false,
      options: [],
      dialogVisible: false,
      projectMissionId: null
    }
  },
  computed: {
    canDeleted() {
      return !this.tableselectionRows.length
      // if (!this.tableselectionRows.length) return true
      // let flag = false
      // this.tableselectionRows.forEach((item) => {
      //   if (item.status == 2) {
      //     flag = true
      //   }
      // })

      // return flag
    },
    showShare() {
      return function (row) {
        // 有编辑权限的才显示分享按钮
        // row.visitType === 2 &&
        return row.visitType === 2 && row.status === 2
      }
    },

    jsonData() {
      return newTipForm(this.options)
      // return newFormData(this.isDetails);
    },
    showPublic() {
      return function (row) {
        if (row.status === 2) return false
        return true
      }
    },
    showDetail() {
      return function (row) {
        if (row.status === 2) return true
        return false
      }
    },
    showDel() {
      return function (row) {
        if (row.status !== 2) return true
        return false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    openShare(row) {
      this.dialogVisible = true
      this.projectMissionId = row.projectMissionId
    },
    goDetail(row) {
      this.$router.push({
        path: '/workWithMe/cooperationDetail',
        query: {
          projectMissionId: row.projectMissionId,
          canEdit: row.visitType
        }
      })
    },
    publicUpdate(row) {
      let that = this
      this.$confirm('是否确认要发布该数据项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async function () {
          const res = releaseProjectMission(row.projectMissionId)
          that.msgSuccess('发布成功')
          that.resetList()
        })
        .catch(function () {})
    },

    async init() {
      if (this.$route.query.projectId) {
        this.getProject()
        this.getList()
      }
      this.tipColumns = await getTipColumns()
    },
    async getList() {
      const res = await projectMissionList({ projectId: this.projectId })
      res.data.records.forEach((item) => {
        item.selfId = `${item.requireCompletionUnitId}${item.requireCompletionObjType}`
      })

      this.tableData = [...res.data.records]
    },
    // 详情
    async getProject() {
      const res = await completionUnitList(this.projectId)
      res.data.forEach((item) => {
        item.selfId = `${item.partnerId}${item.partnerType}`
      })
      this.options = [...res.data]
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.disabled = false
      this.reset()
      this.open = true
      this.title = '新增合作事项'
    },
    handleDetail(row) {
      this.disabled = true
      this.editData = { ...row }
      if (this.$refs.infoForm) this.$refs.infoForm.reset()
      this.open = true
      this.title = '合作事项详情'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.disabled = false
      this.editData = { ...row }
      if (this.$refs.infoForm) this.$refs.infoForm.reset()
      this.open = true
      this.title = '修改合作事项'
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      let that = this
      let chooseIds = this.tableselectionRows.map((item) => item.projectMissionId).join(',')
      let ids = row ? row.projectMissionId : chooseIds
      this.$confirm('是否确认删除该数据项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async function () {
          const res = await removeProMissionAndFollowByPids(ids)
          that.resetList()
          that.msgSuccess('删除成功')
        })
        .catch(function () {})
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 没有projectId的时候用index作为标识
    resetList() {
      this.$refs.missionTable.handleTableSelectAll([])
      this.tableselectionRows = []
      this.getList()
    },
    // 表单重置
    reset() {
      this.editData = {
        missionName: '',
        missionNote: '',
        finishDate: '',
        requireCompletionUnitId: '',
        requireCompletionUnit: '',
        requireCompletionPeople: '',
        requireCompletionObjType: '',

        requireCompletionTime: null,
        selfId: null
      }
      if (this.$refs.infoForm) this.$refs.infoForm.reset()
    },
    /** 提交按钮 */
    submitForm() {
      if (this.disabled) {
        this.open = false
        return
      }
      // 提交要做校验
      this.$refs.infoForm.getData().then(async (data) => {
        this.editData.projectId = this.projectId
        this.editData.requireCompletionTime = this.editData.requireCompletionTime
          ? `${this.editData.requireCompletionTime.split(' ')[0]} 00:00:00`
          : null
        const item = this.options.find((e) => e.selfId == this.editData.selfId)
        this.editData.requireCompletionUnit = item.partnerName
        this.editData.requireCompletionObjType = item.partnerType
        this.editData.requireCompletionUnitId = item.partnerId
        if (this.editData.projectMissionId) {
          // 修改
          const res = await editProjectMission(this.editData)
          if (res.code === 200) {
            this.resetList()

            this.open = false
          }
        } else {
          // 新增
          const res = await addBatchProjectMission([this.editData])
          if (res.code === 200) {
            this.resetList()

            this.open = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #fff;
  padding: 10px 20px;
  height: 100%;
  .title {
    line-height: 20px;
    border-left: 4px solid #4282e4;
    margin-bottom: 20px;
    padding-left: 7px;
  }
}
.btns-bar {
  margin-bottom: 10px;
}
</style>
