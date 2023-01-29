<template>
  <div class="activity-management-list">
    <ty-business-crud
      v-if="columns"
      class="high-search-crud"
      mainKey="ty-list"
      :showIndex="true"
      :columns="columns"
      search-mode="high"
      :getListInterface="getListInterface"
      :showSearchFields="['followTime', 'follower', 'type', 'status']"
      title=""
      @highSearchChange="highSearchChangeFun"
      :border="false"
      :showOperation="[]"
      @resetSearch="resetSearchFun"
    >
      <template #search>
        <search-box-form-date
          v-show="searchDateRangShow"
          label-text="跟进时间"
          @change="setParams({ ...$event })"
        />
      </template>
      <template #btnsBar>
        <div class="btns-bar">
          <!-- <el-button type="primary" size="small"
            >新增</el-button
          >
          <el-button size="small">删除</el-button> -->
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="checkout(row)">查看详情</el-button>
        </div>
      </template>
    </ty-business-crud>
  </div>
</template>

<script>
import SearchBoxFormDate from '@/components/SearchBoxFormDate.vue'
import getColumns from './jsonData'

export default {
  components: {
    SearchBoxFormDate
  },

  data() {
    return {
      columns: null,
      searchDateRangShow: false,
      getListInterface: {
        url: '/system/remind/list',
        methodType: 'get',
        params: {
          follower: '',
          type: null,
          status: null,
          pageSize: 10,
          pageNum: 1
        }
      }
    }
  },

  created() {
    this.init()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
      console.log(this.getListInterface, 'getListInterface')
    },
    setParams(data) {
      const { params } = this.getListInterface
      this.$set(this.getListInterface, 'params', {
        ...params,
        ...data
      })
    },
    // 查看详情
    checkout(row) {
      console.log(row, 'wor')
      if (row.source === 1) {
        this.$router.push({
          path: '../intention/record',
          query: {
            cooperativePurposeId: row.cooperationDemandId,
            source: row.source
          }
        })
      }
      if (row.source === 2) {
        this.$router.push({
          path: '../needMatch/record',
          query: {
            recommendedEnterpriseRelId: row.cooperationDemandId,
            source: row.source
          }
        })
      }
      if (row.source === 3) {
        this.$router.push({
          path: '../abilityMatch/record',
          query: {
            recommendedEnterpriseRelId: row.cooperationDemandId,
            source: row.source
          }
        })
      }
      if (row.source === 0) {
        this.$router.push({
          path: '../workWithMe/cooperationDetail',
          query: {
            projectMissionId: row.cooperationDemandId,
            source: row.source
          }
        })
      }
      console.log(row, 'row4444444444')
    },
    addRemind() {
      this.newWindow({})
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    },
    resetSearchFun() {
      this.getListInterface.params = {}
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
