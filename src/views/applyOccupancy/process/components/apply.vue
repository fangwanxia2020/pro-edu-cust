<template>
  <div>
    <ty-pc-form
      :apiData="id"
      @submitSuccess="submitSuccess"
      :requestCreateData="requestCreateData"
      :requestEditData="requestEditData"
      submitBtnText="下一步"
      :backBtnShow="false"
      :detailInfoFlag="detailInfoFlag"
    ></ty-pc-form>
  </div>
</template>

<script>
import { addBusinessApply } from '@/api/applyOcupancy/process'

export default {
  props: {
    unitInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    templateId: {
      type: [Number, String],
      default: null
    },
    detailInfoFlag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    templateId(newVal) {
      this.id = newVal
    }
  },
  data() {
    return {
      id: this.templateId,
      requestCreateData: {
        addEnterpriseAuthTypeDtos: [
          {
            enterpriseTypeTemplateId: this.unitInfo.enterpriseTypeTemplateId
          }
        ]
      },
      requestEditData: {
        addEnterpriseAuthTypeDtos: [
          {
            enterpriseTypeTemplateId: this.unitInfo.enterpriseTypeTemplateId
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {},
    submitSuccess(data) {
      addBusinessApply({
        objId: data.enterpriseId,
        businessType: 1
      }).then((res) => {
        if (res.code === 200) {
          this.$emit('nextStep', data)
        }
      })
    }
  }
}
</script>

<style type="text/css"></style>
