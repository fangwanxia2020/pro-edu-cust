<template>
  <!-- 与我协同 -->
  <div id="group-manage">
    <ty-business-crud
      v-if="columns"
      show-select
      searchMode="high"
      label-width="120"
      :id="'activityId'"
      class="high-search-crud"
      mainKey="ty-list"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['missionName', 'requireCompletionUnit']"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      ref="lawsCrud"
    >
      <template #search>
        <search-box-form-date
          v-show="searchDateRangShow"
          :label-width="150"
          label-text="要求落地完成时间"
          @change="Object.assign(getListInterface.params, $event)"
          endTimeKey="endTime"
          beginTimeKey="startTime"
        />
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="goDetail(row)">详情</el-button>
          <el-button v-if="showShare(row)" size="mini" type="text" @click="openShare(row)"
            >分享</el-button
          >
        </div>
      </template>
    </ty-business-crud>
    <share-dialog
      :dialogVisible.sync="dialogVisible"
      :projectMissionId="projectMissionId"
    ></share-dialog>
  </div>
</template>

<script>
import { resFormatFun } from '@/utils/tool'
import { getUnitList } from '@/api/cooperation/coopereEvalue.js'
import getColumns from './jsonData.js'
import SearchBoxFormDate from '@/components/SearchBoxFormDate'
import shareDialog from './detail/components/shareDialog.vue'

export default {
  components: { SearchBoxFormDate, shareDialog },
  data() {
    return {
      columns: null,
      getListInterface: {
        url: '/system/projectMission/list',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1,
          status: 2
        },
        resFormatFun
      },
      selectedRows: [],
      dialogVisible: false,
      searchDateRangShow: false,
      projectMissionId: null,
      arrOptions: []
    }
  },
  computed: {
    showShare() {
      return function (row) {
        // 有编辑权限的才显示分享按钮
        return row.visitType === 2
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      // 处理负责实施单位数据
      await getUnitList().then((res) => {
        this.arrOptions = res.data.map((item, index) => {
          return {
            value: index,
            label: item
          }
        })
      })
      this.columns = await getColumns(this.arrOptions)
    },
    handleCheckedChange(rows) {
      this.selectedRows = rows
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    },
    // 重置查询
    resetSearchFun() {
      this.getListInterface.params = { status: 2 }
      this.searchDateRang = []
    },
    goDetail(row) {
      console.log(row, 'row4564654')
      this.$router.push({
        path: '/workWithMe/cooperationDetail',
        query: {
          projectMissionId: row.projectMissionId,
          canEdit: row.visitType
        }
      })
    },
    openShare(row) {
      this.dialogVisible = true
      this.projectMissionId = row.projectMissionId
    }
  }
}
</script>

<style scoped></style>
