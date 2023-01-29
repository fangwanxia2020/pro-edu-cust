<template>
  <!-- 潜在客户列表(企业客户) -->
  <div class="management-list">
    <ty-business-crud
      v-if="columns"
      :id="'orgId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      search-mode="default"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['orgName', 'userName', 'phone', 'isAdd']"
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
      <template #btnsBar>
        <div class="btns-bar">
          <!-- <el-button type="primary" size="small" @click="addCooperation">新建合作</el-button> -->
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button v-if="row.isAdd == 0" size="mini" type="text" @click="addContacts(row)"
            >添加通讯录</el-button
          >
        </div>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { addAddressBook } from '@/api/partnerManagement/partner'
import { getLatentColumns } from './jsonData.js'

export default {
  components: {},
  data() {
    return {
      columns: null,
      getListInterface: {
        url: '/system/customerPartner/discover',
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
      this.columns = await getLatentColumns()
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

    // 添加到通讯录
    addContacts(row) {
      this.confirm('确认添加到通讯录？', () => {
        addAddressBook(row.orgId).then((res) => {
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
