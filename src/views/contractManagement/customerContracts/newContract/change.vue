<template>
  <div>
    <ty-table
      :columns="columns"
      :data="tableData"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
      :hidePage="true"
      :showSelect="false"
      :showIndex="true"
    >
      <!-- <template slot="download" slot-scope="{ data }"> 下载 </template> -->
    </ty-table>
  </div>
</template>

<script>
import { businessLog } from '@/api/contractManagement/purchase.js'
import { getChangeColumns } from './contractForm'

export default {
  components: {},
  props: {
    contractMainId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      tableData: [],
      columns: [],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    console.log(12345)
    if (this.contractMainId) {
      this.getList()
    }
  },

  methods: {
    async init() {
      this.columns = await getChangeColumns()
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.getList()
    },
    getList() {
      let sendData = {
        // pageNum: this.page.pageNo,
        // pageSize: this.page.limit,
        businessId: this.contractMainId
      }

      businessLog(sendData).then((res) => {
        this.tableData = res.data.records
        this.page.total = res.data.total
      })
    }
  }
}
</script>

<style></style>
