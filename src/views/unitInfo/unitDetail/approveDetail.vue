<template>
  <div class="page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <info></info>
      </el-tab-pane>
      <el-tab-pane label="审核" name="second"><approve></approve> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Info from './components/info.vue'
import Approve from './components/approve.vue'

export default {
  components: { Info, Approve },
  name: 'unitDetail',
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.page {
  background: #fff;
  padding: 20px;
  min-height: calc(100vh - 148px);
}
</style>
