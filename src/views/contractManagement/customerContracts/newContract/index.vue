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
  name: 'newContract',
  components: { Detail, Enclose, Change },
  data() {
    return {
      activeName: 'first',
      contractMainId: this.$route.query.id
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log('to', to)
  //   if (to.path === '/partner/ADD') {
  //     from.meta.cache = true
  //   }
  //   next()
  // },
  methods: {
    handleClick(tab, event) {
      if (!this.contractMainId && this.activeName !== 'first') {
        this.$message('请先保存合同详情')
      }
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
