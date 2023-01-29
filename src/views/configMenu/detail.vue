<!--
 * @Author: hjm
 * @Date: 2022-10-31 14:28:09
 * @LastEditors: hjm
 * @LastEditTime: 2022-10-31 14:53:56
 * @Description: file content
-->
<template>
  <div>
    <ty-pc-form
      :apiData="apiData"
      :requestEditData="requestEditData"
      :detailData="detailData"
      :detailFlag="detailFlag"
      :backBtnText="backBtnText"
      :submitBtnText="submitBtnText"
    ></ty-pc-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiData: null,
      detailData: null,
      detailFlag: false,
      requestEditData: null,
      submitBtnText: '提交',
      backBtnText: '返回'
    }
  },
  created() {
    // console.log(this.$route.query) // 回显数据查询id
    if (this.$route.query.checkObj) {
      const detailData = JSON.parse(this.$route.query.checkObj)
      if (Object.keys(detailData).length == 1) {
        this.detailData = detailData[Object.keys(detailData)[0]] || ''
      } else {
        this.detailData = detailData
      }
      this.requestEditData = detailData
    }
    if (this.$route.query.detailFlag == 'true') {
      this.detailFlag = true
    }
    if (
      this.$route.query.formBtnText &&
      Object.keys(JSON.parse(this.$route.query.formBtnText)).length
    ) {
      const { backBtnText, submitText } = JSON.parse(this.$route.query.formBtnText)
      if (submitText) this.submitBtnText = submitText
      if (backBtnText) this.backBtnText = backBtnText
    }
    this.apiData = this.$route.params.id
    this.$store.dispatch('tagsView/updateCurrentTag', this.$route)
  }
}
</script>

<style scoped></style>
