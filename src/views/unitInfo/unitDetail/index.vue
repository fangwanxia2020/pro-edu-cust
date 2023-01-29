<template>
  <div class="page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <basic></basic>
      </el-tab-pane>
      <el-tab-pane label="申请记录" name="second"> <apply-list></apply-list> </el-tab-pane>
      <el-tab-pane label="能力视图" name="third"><ability-list></ability-list></el-tab-pane>
      <el-tab-pane label="标签视图" name="fourth"> <label-list></label-list></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplyList from './components/applyList.vue'
import basic from './components/basic.vue'
import LabelList from './components/labelList.vue'
import AbilityList from './components/abilityList.vue'

export default {
  components: { basic, ApplyList, LabelList, AbilityList },
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
