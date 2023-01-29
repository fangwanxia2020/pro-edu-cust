export default {
  data() {
    return {
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      }
    }
  },
  methods: {
    // 搜索
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleQueryClick() {
      this.handleQuery()
      this.highShow = false
    },
    // 重置
    resetQuery() {
      this.resetForm('queryForm')
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.queryParams.pageSize = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.queryParams.pageNum = val
      this.getList()
    }
  }
}
