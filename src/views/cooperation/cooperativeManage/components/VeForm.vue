<template>
  <div>
    <pc-form :data="config" v-model="editData" ref="pcForm" :disabled="disabled"> </pc-form>
  </div>
</template>

<script>
import { deepClone } from '@/utils/tool'
import config from './newSupervisionForm'
// import {getSchoolClassScheduleList} from "@/api/course/schoolClassSchedule";
// import { getToken } from "@/utils/auth";

let defaultData = {
  objName: null,
  schoolCoursewareTypeId: null,
  type: null,
  objId: null,
  content: null,
  files: []
}

export default {
  props: {
    value: {
      type: Object,
      default: deepClone(defaultData)
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      config,
      rules: {},
      editData: this.value,
      optionsSubject: [],
      optionsClassHour: [],
      action: `${this.baseUrl}/common/api/file/uploadFile/uploads`,
      uploadData: { fileType: 1, fileUseType: 4 }
    }
  },

  watch: {
    value(data) {
      this.editData = data
    },

    editData: {
      deep: true,
      handler(nv, ov) {
        Object.keys(nv).forEach((key) => {
          if (nv[key] !== ov[key]) {
            this.$refs.pcForm.validateField(key)

            this.$nextTick(() => {
              this.$refs.pcForm.validateField(key)
            })
          }
        })

        this.$emit('input', nv)
      }
    }
  },

  methods: {
    getOptionsSubject() {
      this.getDictComboBo('subject_type', true).then((data) => {
        this.optionsSubject = data
      })
    },
    getData() {
      return this.editData
    },
    validateFields() {
      let ps = Object.keys(this.editData)
        .filter((key) => key in defaultData)
        .map((key) => {
          return this.$refs.pcForm.validateField(key)
        })
      return Promise.all(ps)
    },
    clear() {
      this.$refs.pcForm.reset()
    },
    successsCourseware(res) {
      this.editData.files = res.contractRoot.svcCont.responseObject
      this.editData.files[0].fileOriginalName = this.uploadData.name
    },
    changeBindCourse({ name }) {
      this.editData.objSubName = name
    },
    beforeAvatarUpload(file) {
      let typeMap = ['rar', 'zip', 'doc', 'docx', 'pdf', 'jpg', 'ppt']
      let type = file.name.split('.')[1]
      let isType = typeMap.includes(type)
      if (!isType) {
        this.$message.error('请上传扩展名为rar,zip,doc,docx,pdf,jpg,ppt')
      }
      this.uploadData.name = file.name
      return isType
    }
  },

  created() {
    this.getOptionsSubject()
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload-dragger {
  height: auto;
}
</style>
