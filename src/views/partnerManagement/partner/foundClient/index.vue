<template>
  <div>
    <el-button @click="backPage" size="medium">返回</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="潜在客户列表" name="first">
        <latent-list></latent-list>
      </el-tab-pane>
      <el-tab-pane label="企业客户申请列表" name="second">
        <apply-list></apply-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplyList from './applyList.vue'
import latentList from './latentList.vue'

export default {
  components: { latentList, ApplyList },
  data() {
    return { activeName: 'first' }
  },
  created() {
    console.log('this.$route.param')
    console.log(this.$route.params)
    if (this.$route.params) {
      if (this.$route.params.toApplyList) {
        this.activeName = 'second'
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    backPage() {
      return this.$router.push('/partnerManagement/partner')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-tabs__header {
    background: #fff;
    padding: 0 10px;
    margin-top: 20px;
  }
}
</style>
