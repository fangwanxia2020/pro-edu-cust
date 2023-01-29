<template>
  <div class="success-page">
    <div class="change-icon">
      <i class="el-icon-s-claim"></i>
    </div>
    <p>操作成功</p>
    <el-button type="primary" @click="$router.push('/needMarket/market')">返回供需市场</el-button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.success-page {
  @include fcaj(center, space-between);
}
.change-icon {
  font-size: 100px;
}
</style>
