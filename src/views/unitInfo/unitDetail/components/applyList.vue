<template>
  <div>
    <div class="btns-bar">
      <!-- 暂定 -->
      <!-- <el-button type="primary" size="small">申请业务</el-button> -->
    </div>
    <ty-table
      id="businessApplyId"
      ref="table"
      :border="false"
      :columns="columns"
      :data="tableData"
      :showSelect="false"
      :hidePage="true"
    >
      <template v-slot:operation="scope">
        <el-button
          size="mini"
          v-if="showUpdate(scope.row.applyStatus)"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdate(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="showDelete(scope.row.applyStatus)"
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleApprove(scope.row.businessApplyId)"
          >提交审核</el-button
        >

        <el-button
          size="mini"
          v-if="showDelete(scope.row.applyStatus)"
          type="text"
          icon="el-icon-delete"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
        <el-button size="mini" type="text" @click="approveDetail(scope.row)">审核详情</el-button>
      </template>
    </ty-table>
  </div>
</template>

<script>
import { businessApply, removeByIds, editBusinessApply } from '@/api/unitInfo/unitDetail'
import { DETAIL } from '@/constants'
import { getColumns } from './jsonData'

export default {
  props: {},
  name: '',
  data() {
    return {
      tableData: [],
      columns: []
    }
  },
  computed: {
    showUpdate() {
      return function (status) {
        return status == 0
      }
    },
    showDelete() {
      return function (status) {
        return status == 0 || status == 1
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
      this.getList()
    },
    async getList() {
      const { enterpriseId } = this.$store.state.user.userInfo
      const res = await businessApply({ objId: enterpriseId, businessType: 1 })
      this.tableData = res.data.records
    },
    async approveDetail(row) {
      let templateId = await this.$store.dispatch('template/getTemplateId', {
        templateIds: row.templateIds,
        type: DETAIL
      })
      this.$router.push({
        path: `/unitInfo/${DETAIL}/${templateId}`,
        query: {
          businessApplyId: row.businessApplyId,
          enterpriseId: row.objId,
          flag: 1
        }
      })
    },
    // 编辑
    handleUpdate() {},

    async handleApprove(businessApplyId) {
      let that = this
      this.$confirm('是否确认提交审核?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async function () {
          const data = {
            businessApplyId,
            applyStatus: 2
          }
          const res = await editBusinessApply(data)
          that.msgSuccess('提交成功')
          that.getList()
        })
        .catch(function () {})
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      let that = this
      let ids = row.businessApplyId
      this.$confirm('是否确认删除该数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async function () {
          const res = await removeByIds(ids)
          that.msgSuccess('删除成功')
          that.getList()
        })
        .catch(function () {})
    }
  }
}
</script>

<style lang="scss" scoped>
.btns-bar {
  margin-bottom: 15px;
  margin-top: 15px;
}
</style>
