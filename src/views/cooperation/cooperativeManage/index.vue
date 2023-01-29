<template>
  <!-- 合作管理 -->
  <div class="activity-management-list">
    <ty-business-crud
      v-if="columns"
      :id="'projectId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['projectName', 'partnerName']"
      :showIndex="true"
      :showSelect="true"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="listCrud"
    >
      <template #search>
        <search-box-form-date
          v-show="searchDateRangShow"
          label-text="创建日期"
          @change="setParams({ ...$event })"
        />
      </template>
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addCooperation">新建合作</el-button>
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="editCooperation(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="toMission(row)">合作事项</el-button>
          <el-button size="mini" type="text" @click="deleteCooperation(row)">删除</el-button>
          <el-button size="mini" type="text" @click="detailCooperation(row)">查看详情</el-button>
        </div>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { removeProAndProMissionByPids } from '@/api/cooperation/cooperativeManage'
import getColumns from './jsonData.js'
import SearchBoxFormDate from '@/components/SearchBoxFormDate'

export default {
  components: {
    SearchBoxFormDate
  },
  data() {
    return {
      columns: null,
      getListInterface: {
        url: '/system/project/list',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun
      },
      searchDateRangShow: false,
      selectRows: []
      // searchDateRang: null, // 最近交货日期
    }
  },
  computed: {
    isChange() {
      return this.selectRows.length > 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    setParams(data) {
      const { params } = this.getListInterface
      this.$set(this.getListInterface, 'params', {
        ...params,
        ...data
      })
    },
    async init() {
      this.columns = await getColumns()
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },

    // 重置查询
    resetSearchFun() {
      this.getListInterface.params = {}
      this.searchDateRang = []
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection)
      this.selectRows = selection
    },
    // 新增
    addCooperation() {
      this.$router.push({
        path: '/cooperativeManage/add'
      })
    },
    // 删除
    deleteCooperation(row) {
      let chooseIds = this.selectRows.map((item) => item.projectId).join(',')
      let ids = row ? row.projectId : chooseIds
      this.confirm('确认删除所选合作？', () => {
        removeProAndProMissionByPids(ids).then((res) => {
          this.selectRows = []
          this.$refs.listCrud.setCheckList([])
          this.$refs.listCrud._getListData()
          this.$message.success('删除成功')
        })
      })
    },
    toMission(row) {
      this.$router.push({
        path: '/cooperativeManage/mission',
        query: {
          projectId: row.projectId,
          projectName: row.projectName
        }
      })
    },
    // 编辑
    editCooperation(row) {
      this.$router.push({
        path: '/cooperativeManage/edit',
        query: {
          projectId: row.projectId
        }
      })
    },
    // 详情
    detailCooperation(row) {
      this.$router.push({
        path: '/cooperativeManage/details',
        query: {
          projectId: row.projectId,
          flag: 1
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.high-search-crud ::v-deep {
  .searchBox-high-operator-bar {
    display: none;
  }
}
</style>
