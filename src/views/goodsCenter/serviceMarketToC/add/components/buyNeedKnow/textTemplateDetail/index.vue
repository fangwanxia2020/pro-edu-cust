<template>
  <el-dialog title="栏目详情" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
    <pc-form
      v-if="jsonData"
      ref="detailForm"
      class="activity-info-form"
      v-model="formData"
      :data="jsonData"
      :disabled="detailFlag"
    ></pc-form>
    <div v-if="!detailFlag">
      <el-button type="primary" @click="submitSuccess">保存</el-button>
      <el-button @click="goBack">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { DETAIL } from '@/constants'
import { getTextTemplateInfoById } from '@/api/goodsCenter/serviceMarket'
import { getAddJson } from './jsonData'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    templateId: {
      type: [Number, String],
      default: ''
    },
    textTemplateInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formType: {
      type: String,
      default: ''
    },
    textIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
      const { columnName, columnNote, fileInfoList } = this.textTemplateInfo
      this.formData = {
        columnName,
        columnNote,
        fileInfoList
      }
    }
  },
  computed: {
    detailFlag() {
      return this.formType === DETAIL
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      requestEditData: {},
      jsonData: getAddJson(),
      formData: {}
    }
  },
  methods: {
    getInfo() {
      getTextTemplateInfoById(this.textTemplateId).then((res) => {
        if (res.code === 200) {
          const { columnName, columnNote, shopShelvesId, fileInfoList: columnUrl } = res.data
          this.formData = {
            columnName,
            columnNote,
            shopShelvesId,
            columnUrl
          }
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.$emit('update:visible', false)
      this.$emit('update:templateId', null)
    },
    submitSuccess() {
      this.$emit('submitTextTemplate', { data: this.formData, index: this.textIndex })
      this.closeDialog()
    },
    goBack() {
      this.closeDialog()
    }
  }
}
</script>

<style scoped></style>
