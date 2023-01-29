<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="合同详情" name="first">
        <detail @save="save"></detail>
      </el-tab-pane>
      <el-tab-pane label="相关附件" name="second">
        <enclose :contractMainId="contractMainId"> </enclose>
      </el-tab-pane>
      <el-tab-pane label="合同变更" name="third">
        <change :contractMainId="contractMainId"></change>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Change from './change.vue'
import Detail from './detail'
import Enclose from './enclose.vue'

export default {
  name: 'editPurchaseContract',
  components: { Detail, Enclose, Change },
  data() {
    return {
      activeName: 'first',
      contractMainId: this.$route.query.id
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    save(e) {
      // this.activeName = 'second'
      this.contractMainId = e
      console.log('this.contractMainId', this.contractMainId)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
}
</style>
