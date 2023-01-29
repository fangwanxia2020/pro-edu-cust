<template>
  <div class="bg">
    <search :title="'产教通'" v-model="name"></search>
    <el-tabs class="top-tab" v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="商品目录" name="porject">
        <div class="condition">
          <list-sort :sortArr="sortArr" @changeOutSort="changeOutSort">
            <condition-list
              v-if="listItem.length"
              :list="listItem"
              :sysCooperationModel="sysCooperationModel"
            ></condition-list>
            <div class="empty" v-else>暂无数据</div>
          </list-sort>
        </div>
        <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getMarketList"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { marketList } from '@/api/needMarket/service.js'
import { getDictMultiple } from '@/utils/tool.js'
import ConditionList from './components/conditionList.vue'
import ListSort from './components/listSort.vue'
import Search from './components/search.vue'
import Pagination from '@/components/Pagination'

export default {
  components: { Search, ListSort, ConditionList, Pagination },
  data() {
    return {
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      checked1: true,
      activeName: 'porject',
      listItem: [],
      sortArr: [
        { name: '默认排序', id: 2, sort: false, isSort: 0, key: '' },
        { name: '价格排序', id: 3, sort: true, isSort: 0, key: 'priceSort' }
      ],
      name: '',
      sysCooperationModel: []
    }
  },
  created() {
    this.init()
  },
  watch: {
    name(val) {
      this.queryParams.name = val
      this.getMarketList()
    }
  },
  methods: {
    changeOutSort(arr) {
      this.sortArr = [...arr]
      this.queryParams = {
        name: this.name,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize
      }
      this.sortArr.forEach((item) => {
        if (item.key && item.isSort) {
          this.queryParams[item.key] = item.isSort
        }
      })
      this.getMarketList()
      console.log(this.queryParams)
    },
    async init() {
      const { sys_cooperation_model: sysCooperationModel } = await getDictMultiple([
        'sys_cooperation_model'
      ])
      this.sysCooperationModel = sysCooperationModel
      this.getMarketList()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getMarketList() {
      marketList(this.queryParams).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.listItem = [...res.data.records]
          this.total = res.data.total
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-gray: #f0f1f4;
.pagination-container {
  text-align: center;
}
.bg {
  background: #fff;
  .fr {
    float: right;
  }
  .line {
    height: 10px;
    width: 100%;
    background: $bg-gray;
  }
  .condition {
    // padding: 10px;
    .empty {
      color: #606266;
      line-height: 50px;
      text-align: center;
    }
  }
}
::v-deep {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #fe9400;
    color: #fff !important;
  }
  .el-tabs__nav-wrap {
    padding-left: 30px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: 3px solid #fe9400;
    margin: 0;
  }
  .el-tabs__item:hover {
    color: #909399 !important;
  }
}
</style>
