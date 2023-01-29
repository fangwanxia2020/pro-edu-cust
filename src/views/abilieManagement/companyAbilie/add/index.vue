<template>
  <div class="abilie-add">
    <ty-pc-form
      :apiData="templateId"
      :requestCreateData="requestCreateData"
      backBtnText="取消"
    ></ty-pc-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templateId: '',
      requestCreateData: {}
    }
  },
  created() {
    const { type, templateId, enterpriseTypeTemplateId } = this.$route.query
    const { enterpriseId } = this.$store.getters.userInfo
    this.templateId = templateId
    this.requestCreateData = {
      type,
      enterpriseTypeTemplateId,
      enterpriseId
    }
  }
}
</script>

<style scoped lang="scss">
.abilie-add {
  width: 60%;
  margin: 0 auto;
}
</style>
