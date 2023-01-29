<template>
  <el-dialog class="ve-dialog" :visible.sync="dialogVisible" @close="closeCallback" title="">
    <ve-form class="dialog-form" ref="veForm" v-model="form" :disabled="disabled"></ve-form>

    <div class="btn-continer" v-if="!disabled">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'
import veForm from './VeForm'
// import { addSchoolClassroom, modifySchoolClassroom } from "@/api/baseData/classroom";
// import {getSchoolClassroomInfo} from "@/api/baseData/classroom";
// import { addbeforeClassHomework } from "@/api/workbench";

let defaultForm = {
  objName: null,
  name: null,
  schoolCoursewareTypeId: null,
  objId: null,
  content: undefined,
  files: []
}

export default {
  components: {
    veForm
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    content: {
      type: Object,
      default() {
        return {
          action: undefined,
          data: {}
        }
      }
    }
  },

  computed: {
    isAdded() {
      // return this.content.action === action.added;
      return true
    },
    disabled() {
      // return this.isExamine
      return false
    },

    successText() {
      return this.isAdded ? '新增成功' : '修改成功'
    }
  },

  watch: {
    dialogVisible(value) {
      let actionType = this.content.action

      // if (value) {
      //   switch (actionType) {
      //     case action.added:
      //       //              this.form = {
      //       //                "objName": "1",
      //       //                "name": "1",
      //       //                "type": "2",
      //       //                "objId": "1",
      //       //                "content": "1",
      //       //                "files": "1",
      //       //                "phone": "1"
      //       //              };

      //       break
      //     case action.examine:

      //     case action.modify:
      //       this.getDetail()
      //   }
      // }

      this.$emit('update:visible', value)
    },
    visible(value) {
      if (this.visibleType === 'edit') {
        let resArr = Object.entries(this.content.data)
        resArr.forEach((item) => {
          if (item[0] in this.form) {
            this.$set(this.form, item[0], item[1])
          }
        })
      }
      this.dialogVisible = value
    }
  },

  data() {
    return {
      dialogVisible: this.visible,
      form: deepClone(defaultForm)
    }
  },

  created() {},

  methods: {
    getDetail() {
      let { schoolClassroomId } = this.content.data

      // getSchoolClassroomInfo(schoolClassroomId).then((res) => {
      //   this.form = {
      //     ...objectFilter(res, ['objName', 'name', 'type', 'objId', 'content', 'files', 'phone']),
      //     schoolClassroomId
      //   }
      // })
    },
    closeCallback() {
      this.resetData()
    },
    resetData() {
      this.form = deepClone(defaultForm)

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$refs.veForm.clear()
        })
      })
    },
    submit() {
      this.$refs.veForm.validateFields().then(() => {
        let data = this.$refs.veForm.getData()
        let params = {
          ...data,
          schoolId: this.$store.state.user.userInfo.orgId,
          homeworkFileAddDataList: data.files
        }
        // addbeforeClassHomework(params).then(() => {
        //   this.msgSuccess('新增成功')
        //   this.$emit('updateList')
        //   this.close()
        // })
      })
    },
    close() {
      this.dialogVisible = false
    },
    open() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ve-dialog {
  .dialog-form {
    margin-right: 20px;
  }
}
</style>
