<template>
  <!-- 合作伙伴管理-合作单位 -->
  <div class="management-list">
    <ty-business-crud
      v-if="columns"
      :id="'supplierId'"
      class="high-search-crud"
      mainKey="ty-list"
      search-mode="default"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['templateId', 'supplierName', 'partnerLevelId']"
      :showIndex="true"
      :showSelect="true"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="clientCrud"
    >
      <template #search> </template>
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addOne">新建</el-button>
          <el-button type="primary" size="small" @click="navigater('/cooperativeUnits/foundClient')"
            >发现合作单位</el-button
          >
          <!--  <el-button
            size="small"
            :disabled="!isChange"
            @click="deleteSupplier"
          >删除</el-button> -->
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            v-if="showBindingDetail(row)"
            type="text"
            @click="setBinding(row, false)"
            >绑定详情</el-button
          >
          <el-button size="mini" v-if="showBinding(row)" type="text" @click="setBinding(row, true)"
            >申请绑定</el-button
          >
          <el-button size="mini" type="text" @click="setLevel(row)">设置等级</el-button>
          <el-button size="mini" type="text" @click="setContract(row)">联系人</el-button>
          <el-button size="mini" type="text" @click="editSupplier(row)" v-if="row.isAdd != 1"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="detailSupplier(row)">详情</el-button>
          <el-button size="mini" type="text" @click="deleteSupplier(row)">删除</el-button>
        </div>
      </template>
    </ty-business-crud>
    <show-contact ref="contact" :visible.sync="dialogVisible"></show-contact>
    <binding-company
      ref="bindingCompany"
      :visible.sync="companyVisible"
      @resetList="resetList"
    ></binding-company>
    <binding-level
      ref="bindingLevel"
      :visible.sync="levelVisible"
      @resetList="resetList"
    ></binding-level>
  </div>
</template>
<script>
import { removeByIds } from '@/api/partnerManagement/cooperativeUnits'
import { ADD, EDIT, DETAIL } from '@/constants'
import BindingLevel from '@/views/partnerManagement/partner/components/bindingLevel.vue'
import { enterprisesGetInfo } from '@/api/unitInfo/unitDetail'
import getColumns from './jsonData.js'
import ShowContact from './components/showContact'
import BindingCompany from './components/bindingCompany.vue'

export default {
  components: { BindingCompany, BindingLevel, ShowContact },
  data() {
    return {
      content: {
        data: {},
        action: undefined
      },
      relevanceOrgId: null,
      columns: null,
      getListInterface: {
        url: '/system/supplierPartner/list',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun
      },
      searchDateRangShow: false,
      dialogVisible: false,
      companyVisible: false,
      levelVisible: false,
      selectRows: []
      // searchDateRang: null, // 最近交货日期
    }
  },
  computed: {
    isChange() {
      return this.selectRows.length > 0
    },
    showBinding() {
      return function (row) {
        return row.relevanceOrgId && row.bindingStatus == 0
      }
    },
    showBindingDetail() {
      return function (row) {
        return row.relevanceOrgId && row.bindingStatus != 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    setLevel(row) {
      this.relevanceOrgId = row.relevanceOrgId
      this.$refs.bindingLevel.getData(row.partnerLevelId, row.supplierId, row.supplierName, 2)
      this.levelVisible = true
    },
    setContract(row) {
      this.$refs.contact.getList(row)
      this.dialogVisible = true
    },
    setBinding(row, isSubmit) {
      this.relevanceOrgId = row.relevanceOrgId
      this.$refs.bindingCompany.getList(row.relevanceOrgId, isSubmit, row.supplierId)
      this.companyVisible = true
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
    addOne() {
      this.$router.push({
        path: `/cooperativeUnits/${ADD}`
      })
    },
    // 删除
    deleteSupplier(row) {
      this.confirm('确认删除所选合作单位？', async () => {
        removeByIds(row.supplierId).then((res) => {
          if (res.code === 200) {
            this.selectRows = []
            this.$refs.clientCrud.setCheckList([])
            this.$refs.clientCrud._getListData()
            this.$message.success('删除成功')
          }
        })
      })
    },
    resetList() {
      this.$refs.clientCrud.setCheckList([])
      this.$refs.clientCrud._getListData()
    },
    async getEnterprisesGetInfo(row) {
      if (row.isAdd == 1) {
        let res = await enterprisesGetInfo(row.relevanceOrgId)
        if (res.code === 200) {
          return {
            isAdd: row.isAdd,
            enterpriseId: res.data.enterpriseId,
            enterpriseTypeTemplateId: res.data.enterpriseTypeTemplateId
          }
        }
        return {}
      }
      return {
        supplierId: row.supplierId,
        isAdd: row.isAdd
      }
    },
    // 编辑
    async editSupplier(row) {
      let query = await this.getEnterprisesGetInfo(row)
      this.$router.push({
        path: `/cooperativeUnits/${EDIT}`,
        query
      })
    },
    // 详情
    async detailSupplier(row) {
      let query = await this.getEnterprisesGetInfo(row)
      this.$router.push({
        path: `/cooperativeUnits/${DETAIL}`,
        query
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
