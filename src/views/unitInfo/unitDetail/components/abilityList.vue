<template>
  <div>
    <div class="btns-bar"></div>
    <ty-table
      :border="false"
      id="businessApplyId"
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
import { competence } from '@/api/unitInfo/unitDetail'
import { getCompetenceColumns } from './jsonData'
import ItemVue from '../../../../layout/components/Sidebar/Item.vue'

export default {
  props: {},
  name: '',
  data() {
    return {
      enterpriseId: this.$route.query.enterpriseId,
      tableData: [],
      columns: []
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
      this.columns = await getCompetenceColumns()
      this.getList()
    },
    async getList() {
      const res = await competence()
      res.data.records.forEach((item) => {
        let list = item.enterpriseTypeTemplateList
        item.catalog = []
        item.catalogName = '-'
        if (list && list.length) {
          list.forEach((ite) => {
            item.catalog.push(ite.name)
          })
          item.catalogName = item.catalog.join(' > ')
        }
      })
      this.tableData = res.data.records
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
