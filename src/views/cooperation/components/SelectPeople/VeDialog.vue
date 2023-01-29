<template>
  <el-dialog
    class="ve-dialog"
    :visible.sync="dialogVisible"
    @close="closeCallback"
    @open="open"
    :title="titleFun"
  >
    <ve-form class="dialog-form" ref="veForm" v-model="form" :disabled="disabled"></ve-form>

    <div class="btn-continer" v-if="!disabled">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'
import { addPeFollowRemind, editPeFollowRemind } from '@/api/cooperation/record.js'
import { stringify } from 'json5'
import veForm from './VeForm'
// import { addSchoolClassroom, modifySchoolClassroom } from "@/api/baseData/classroom";
// import {getSchoolClassroomInfo} from "@/api/baseData/classroom";
// import { addbeforeClassHomework } from "@/api/workbench";

let defaultForm = {}

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
    },
    cooperativePurposeId: {
      type: Number,
      default: 0
    },
    source: {
      type: Number,
      default: 0
    },
    recommendedEnterpriseRelId: {
      type: Number,
      default: 0
    },
    visibleType: {
      type: String,
      default: 'add',
      require: true
    }
  },

  computed: {
    isAdded() {
      return true
    },
    disabled() {
      return false
    },

    successText() {
      return this.isAdded ? '新增成功' : '修改成功'
    },
    titleFun() {
      return this.visibleType === 'add' ? '新增跟进' : '修改跟进'
    }
  },

  watch: {
    dialogVisible(value) {
      //         let actionType = this.content.action;
      //         if(value) {
      //           switch (actionType) {
      //             case action.added:
      // //              this.form = {
      // //                "objName": "1",
      // //                "name": "1",
      // //                "type": "2",
      // //                "objId": "1",
      // //                "content": "1",
      // //                "files": "1",
      // //                "phone": "1"
      // //              };
      //               break;
      //             case action.examine:
      //             case action.modify:
      //               this.getDetail();
      //           }
      //         }
      this.$emit('update:visible', value)
    },
    visible(value) {
      if (value) {
        // 回显
        if (this.visibleType === 'edit') {
          let resArr = Object.entries(this.content.data)
          resArr.forEach((item) => {
            if (item[0] in this.form) {
              this.$set(this.form, item[0], item[1])
            }
          })
        }
      }
      this.dialogVisible = value
    }
  },

  data() {
    return {
      dialogVisible: this.visible,
      form: {
        cooperativePurposeId: this.cooperativePurposeId,
        followTime: '',
        follower: 1,
        note: '',
        nextNote: '',
        remindIdList: [],
        remindTimeValue: '',
        remindType: null,
        remindWayList: [],
        peopleList: [],
        peopleList2: [],
        source: this.source,
        type: null,
        remindTime: '',
        nextTast: false
      },
      userIdArr: [],
      userIdArr2: [],
      followRemindDtoList: []
    }
  },

  created() {},

  methods: {
    getDetail() {
      // let {schoolClassroomId} = this.content.data;
      // getSchoolClassroomInfo(schoolClassroomId).then((res) => {
      //   this.form = {
      //     ...objectFilter(res, [
      //       "objName",
      //       "name",
      //       "type",
      //       "objId",
      //       "content",
      //       "files",
      //       "phone"
      //     ]),
      //     schoolClassroomId
      //   };
      // });
    },
    closeCallback() {
      console.log('1111')
      this.form.nextTast = false
      this.resetData()
    },
    resetData() {
      this.$refs.veForm.clear()
    },
    submit() {
      this.$refs.veForm
        .validateFields()
        .then(() => {
          let anForm = deepClone(this.form)
          if (anForm.followTime) {
            anForm.followTime = `${anForm.followTime.split(' ')[0]} 00:00:00`
          }
          this.followRemindDtoList = []
          if (anForm.peopleList.length !== 0) {
            anForm.peopleList.forEach((res) => {
              this.userIdArr.push(res.userId)
            })
          }
          if (anForm.peopleList2.length !== 0) {
            anForm.peopleList2.forEach((res) => {
              this.userIdArr2.push(res.userId)
            })
          }
          this.followRemindDtoList.push({
            cooperationDemandId:
              this.source === 1 ? this.cooperativePurposeId : this.recommendedEnterpriseRelId,
            source: this.source,
            type: anForm.type,
            followTime: anForm.followTime,
            note: anForm.note,
            remindIdList: this.userIdArr
          })
          if (anForm.nextTast) {
            if (anForm.remindTime) {
              anForm.remindTime = `${anForm.remindTime.split(' ')[0]} 00:00:00`
            }
            let obj = {
              cooperationDemandId:
                this.source === 1 ? this.cooperativePurposeId : this.recommendedEnterpriseRelId,
              source: this.source,
              note: anForm.nextNote,
              followTime: anForm.remindTime,
              follower: String(this.userIdArr2),
              remindTimeValue: Number(anForm.remindTimeValue),
              remindWayList: anForm.remindWayList
            }
            if (anForm.remindTimeValue == 0) {
              this.followRemindDtoList.push({
                ...obj,
                remindType: 1
              })
            } else {
              this.followRemindDtoList.push({
                ...obj,
                remindType: 2
              })
            }
          }

          // if (this.followRemindDtoList[0].remindIdList.length === 0) {
          //   return this.$message.error('请选择提醒人员')
          // }
          if (this.visibleType === 'edit') {
            let params = {
              deleteFlag: 0,
              followRemindId: this.content.data.followRemindId,
              followTime: anForm.followTime,
              follower: anForm.follower,
              note: anForm.note,
              remindIdList: anForm.remindIdList,
              remindTimeValue: anForm.remindTimeValue,
              remindType: anForm.remindType,
              remindWay: anForm.remindWay,
              status: anForm.status,
              type: anForm.type
            }
            editPeFollowRemind(params).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$emit('getData')
              } else this.$message.error(res.msg)
            })
          }
          if (this.visibleType === 'add') {
            addPeFollowRemind(this.followRemindDtoList).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$emit('getData')
              } else this.$message.error(res.msg)
            })
          }
          this.followRemindDtoList = []
          this.peopleList2 = []
          this.anForm = {}
          this.dialogVisible = false
          this.$refs.veForm.clear()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    close() {
      this.$refs.veForm.clear()
      this.dialogVisible = false
    },
    open() {}
  }
}
</script>

<style lang="scss" scoped>
.ve-dialog {
  .dialog-form {
    margin-right: 20px;
  }
}
.btn-continer {
  text-align: end;
}
</style>
