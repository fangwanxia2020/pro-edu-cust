<template>
  <div>
    <div class="btns-bar"></div>
    <ty-table
      :border="false"
      id="tagId"
      ref="table"
      :columns="columns"
      :data="tableData"
      :showSelect="false"
      :hidePage="true"
    >
    </ty-table>
  </div>
</template>

<script>
import { tagValueList } from '@/api/unitInfo/unitDetail'
import { getLabelColumns } from './jsonData'

export default {
  props: {},
  name: '',
  data() {
    return {
      // enterpriseId: this.$route.query.enterpriseId,
      tableData: [],
      columns: [],
      enterpriseId: this.$store.state.user.userInfo.enterpriseId
    }
  },
  computed: {
    showUpdate() {
      return function (status) {
        return status == 0
      }
    },
    showDelete() {
      return function (status) {
        return status == 0 || status == 1
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.columns = await getLabelColumns()
      this.getList()
    },
    async getList() {
      const res = await tagValueList(this.enterpriseId)
      this.tableData = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.btns-bar {
  margin-bottom: 15px;
  margin-top: 15px;
}
</style>
