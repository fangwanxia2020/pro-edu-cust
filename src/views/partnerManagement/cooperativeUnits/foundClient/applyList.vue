<template>
  <!-- 合作单位申请列表 -->
  <div class="management-list">
    <ty-business-crud
      v-if="columns"
      :id="'relevanceOrgId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      search-mode="default"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['bindingStatus', 'isAdd']"
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
          label-text="审核时间"
          @change="setParams({ ...$event })"
        />
      </template>
      <template #btnsBar>
        <div class="btns-bar">
          <!-- <el-button type="primary" size="small" @click="addCooperation">审核</el-button> -->
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            v-if="row.bindingStatus == 0 || row.bindingStatus == 1"
            type="text"
            @click="approvedetail(row)"
            >审核</el-button
          >
          <!-- 0-未绑定 1-申请中 2-绑定成功 3-绑定失败 -->
          <el-button
            size="mini"
            v-if="row.bindingStatus == 2 || row.bindingStatus == 3"
            type="text"
            @click="approvedetail(row, 1)"
            >审核详情</el-button
          >
        </div>
        <el-button
          v-if="row.bindingStatus == 2 && row.isAdd == 0"
          size="mini"
          type="text"
          @click="addContacts(row)"
          >添加通讯录</el-button
        >
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import { enterprisesGetInfo } from '@/api/unitInfo/unitDetail'
import { sceneDetail } from '@/api/abilieManagement/companyAbilie'
import { DETAIL } from '@/constants'
import { checkAddAddressBook } from '@/api/partnerManagement/cooperativeUnits'
import { getColumns } from './jsonData.js'
import SearchBoxFormDate from '@/components/SearchBoxFormDate'

export default {
  components: {
    SearchBoxFormDate
  },
  data() {
    return {
      columns: null,
      getListInterface: {
        url: '/system/supplierPartner/listsOfApplySupplierWithPage',
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
    // 详情
    async approvedetail(row, flag) {
      let res = await enterprisesGetInfo(row.createOrgId)
      if (res.code === 200) {
        let response = await sceneDetail(res.data.enterpriseTypeTemplateId)
        console.log('response')
        console.log(response)
        let templateId = await this.$store.dispatch('template/getTemplateId', {
          templateIds: response.data.templateIds,
          type: DETAIL
        })
        console.log('templateId')
        console.log(templateId)
        this.$router.push({
          path: `/cooperativeUnits/approveClient/${DETAIL}/${templateId}`,
          query: {
            customerId: row.customerId,
            enterpriseId: res.data.enterpriseId,
            selfIsAdd: row.isAdd,
            flag
          }
        })
      }
    },
    // 添加到通讯录
    addContacts(row) {
      this.confirm('确认添加到通讯录？', () => {
        checkAddAddressBook(row.customerId).then((res) => {
          this.selectRows = []
          this.$refs.listCrud.setCheckList([])
          this.$refs.listCrud._getListData()
          this.$message.success('添加成功')
        })
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
