<template>
  <div class="bg">
    <search :name="'产教通'" v-model="name"></search>
    <el-tabs class="top-tab" v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="找项目" name="porject">
        <condition @changeParams="changeConditionParams"></condition>
        <div class="condition">
          <!-- @getSort="getSort"  -->
          <list-sort :sortArr="sortArr" @changeOutSort="changeOutSort">
            <condition-list
              v-if="listItem.length"
              :list="listItem"
              :sysCooperationModel="sysCooperationModel"
            ></condition-list>
            <pagination
              v-if="listItem.length"
              :total="demandData.total"
              :page.sync="demandData.pageNum"
              :limit.sync="demandData.pageSize"
              @pagination="getDemandList"
            />
            <div v-else class="service-no">暂无数据</div>
          </list-sort>
        </div>
      </el-tab-pane>
      <el-tab-pane label="找能力" name="ability">
        <ability-condition @changeAbilityParams="changeAbilityParams"></ability-condition>
        <div class="condition">
          <list-sort :sortArr="sortArr2" @changeOutSort="changeAbilityOutSort">
            <ability-list v-if="list.length" :list="list"></ability-list>
            <pagination
              v-if="list.length"
              :total="competenceData.total"
              :page.sync="competenceData.pageNum"
              :limit.sync="competenceData.pageSize"
              @pagination="getCompetenceList"
            />
            <div v-else class="service-no">暂无数据</div>
          </list-sort>
        </div></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import { demandList, platformList } from '@/api/needMarket/market.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { RELEASE_STATUS } from '@/utils/dict-enum'
import { json } from 'body-parser'
import Pagination from '@/components/Pagination'
import AbilityList from './components/abilityList.vue'
import Condition from './components/condition.vue'
import ConditionList from './components/conditionList.vue'
import AbilityCondition from './components/abilityCondition.vue'
import ListSort from './components/listSort.vue'
import Search from './components/search.vue'

export default {
  components: {
    Search,
    Condition,
    AbilityCondition,
    ListSort,
    ConditionList,
    AbilityList,
    Pagination
  },
  data() {
    return {
      checked1: true,
      activeName: 'porject',
      listItem: [],
      provideResources: [],
      needToResource: [],
      name: '',
      sortArr: [
        { name: '默认排序', id: 0, sort: false, isSort: 0, key: '0' },
        { name: '按匹配度', id: 1, sort: true, isSort: 0, key: '1' },
        { name: '时间排序', id: 2, sort: true, isSort: 0, key: '2' },
        { name: '按浏览量', id: 3, sort: true, isSort: 0, key: '3' },
        { name: '按沟通数', id: 4, sort: true, isSort: 0, key: '4' }
      ],
      sortArr2: [
        { name: '默认排序', id: 0, sort: false, isSort: 0, key: '0' },
        { name: '按浏览量', id: 1, sort: true, isSort: 0, key: '3' },
        { name: '按沟通数', id: 2, sort: true, isSort: 0, key: '4' }
        // { name: '平台认证', id: 3, sort: false, isSort: 0, key: 'certification_status' }
      ],
      list: [],
      sysCooperationModel: [],
      demandData: {
        lift: null,
        releaseStatus: RELEASE_STATUS.RECRUIT,
        sortBy: 0,
        pageSize: 10,
        pageNum: 1,
        searchValue: null,
        needToResource: null,
        provideResources: null,
        enterpriseTypeTemplateId: null
      },
      competenceData: {
        lift: null,
        publishStatus: RELEASE_STATUS.RECRUIT,
        sortBy: 0,
        pageSize: 10,
        pageNum: 1,
        searchValue: null
      }
    }
  },
  watch: {
    name(val) {
      this.demandData.searchValue = val
      this.competenceData.searchValue = val
      this.resetPage()
      this.resetPage2()
      this.getDemandList()
      this.getCompetenceList()
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 顶部筛选专业共建
    changeConditionParams(params) {
      let { needToResourceArr, provideResourcesArr, codeArr, enterpriseTypeTemplateIdArr, city } =
        params
      let area = city ? [city, ...codeArr] : codeArr
      let arr = [
        'needToResourceArr',
        'provideResourcesArr',
        'enterpriseTypeTemplateIdArr',
        'codeArr'
      ]
      let flag = false // 是否选了全部
      arr.forEach((item) => {
        if (params[item].length > 1) {
          let last = params[item][params[item].length - 1]
          let first = params[item][0]
          if (last == null || last == '全部' || first == null || first == '全部') {
            flag = true
            console.log('选了全部')
          }
        }
      })
      if (flag) {
        return
      }
      // 重置页数
      this.resetPage()
      this.demandData = {
        ...this.demandData,
        needToResource: needToResourceArr.join(','),
        provideResources: provideResourcesArr.join(','),
        enterpriseTypeTemplateId: enterpriseTypeTemplateIdArr.join(','),
        area: area.join(',') == '全部' ? null : area.join(',')
      }
      this.getDemandList()
    },
    // 顶部筛选能力
    changeAbilityParams(params) {
      let { abilieTypeArr } = params
      let arr = ['abilieTypeArr']
      let flag = false // 是否选了全部
      arr.forEach((item) => {
        if (params[item].length > 1) {
          let last = params[item][params[item].length - 1]
          let first = params[item][0]
          if (last == null || first == null) {
            flag = true
            console.log('选了全部')
          }
        }
      })
      if (flag) {
        return
      }
      // 重置页数
      this.resetPage2()
      this.competenceData.types = abilieTypeArr.length ? abilieTypeArr.join(',') : null

      this.getCompetenceList()
    },
    // 项目筛选
    changeOutSort(arr) {
      this.sortArr = [...arr]
      let {
        releaseStatus,
        searchValue,
        needToResource,
        provideResources,
        enterpriseTypeTemplateId,
        area,
        pageNum,
        pageSize
      } = this.demandData
      this.demandData = {
        lift: null,
        sortBy: 0,
        releaseStatus,
        searchValue,
        needToResource,
        provideResources,
        enterpriseTypeTemplateId,
        area,
        pageNum: 1,
        pageSize
      }
      this.sortArr.forEach((item) => {
        if (item.key && item.isSort) {
          this.demandData.lift = item.isSort = item.sort ? item.isSort : null
          this.demandData.sortBy = item.key
        }
      })

      this.getDemandList()
    },
    // 能力筛选
    changeAbilityOutSort(arr) {
      this.sortArr2 = [...arr]
      let { pageNum, pageSize, publishStatus, searchValue, types } = this.competenceData
      this.competenceData = {
        lift: null,
        sortBy: 0,
        certificationStatus: null,
        pageNum: 1,
        pageSize,
        publishStatus,
        searchValue,
        types
      }
      this.sortArr2.forEach((item) => {
        if (item.isSort) {
          this.competenceData.lift = item.isSort = item.sort ? item.isSort : null
          if (item.key == 'certification_status') {
            this.competenceData.certificationStatus = 2
          } else {
            this.competenceData.sortBy = item.key
          }
        }
      })

      this.getCompetenceList()
    },
    async init() {
      const {
        sys_cooperation_model: sysCooperationModel,
        provide_resources: provideResources,
        need_to_resource: needToResource
      } = await getDictMultiple(['sys_cooperation_model', 'provide_resources', 'need_to_resource'])
      this.provideResources = provideResources
      this.needToResource = needToResource
      this.sysCooperationModel = sysCooperationModel
      this.getDemandList()
      this.getCompetenceList()
    },
    resetPage() {
      this.demandData.pageNum = 1
    },
    resetPage2() {
      this.competenceData.pageNum = 1
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    searchFun(val) {
      this.demandData.searchValue = val
      this.competenceData.searchValue = val
      this.resetPage()
      this.resetPage2()
      this.getDemandList()
      this.getCompetenceList()
    },
    getDemandList() {
      demandList(this.demandData).then((res) => {
        if (res.code === 200) {
          this.listItem = res.data.records
          this.demandData.total = res.data.total

          this.listItem.map((item) => {
            let { provideResources, needToResource } = item
            this.$set(item, 'newArr', [])
            // 要求合作方提供资源
            let provide = needToResource ? needToResource.split(',') : []
            provide.map((ite) => {
              item.newArr.push(selectDictLabel(this.needToResource, ite))
            })
            console.log('item.newArr')
            console.log(item.newArr)
            // 自己有的
            this.$set(item, 'otArr', [])
            let resources = provideResources ? provideResources.split(',') : []
            resources.map((ite) => {
              item.otArr.push(selectDictLabel(this.provideResources, ite))
            })
            console.log('item.otArr')
            console.log(item.otArr)
            // if (item.provideResources) {
            //   item.otArr = item.provideResources.split(',')
            // }
          })
          // console.log(this.listItem)
        }
      })
    },
    getCompetenceList() {
      platformList(this.competenceData).then((res) => {
        if (res.code === 200) {
          this.list = res.data.records
          this.competenceData.total = res.data.total
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
  }
  .service-no {
    text-align: center;
    line-height: 50px;
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
