<template>
  <div>
    <pc-form :data="formData" v-model="editData" ref="pcForm" :disabled="disabled">
      <template v-slot:choosePeople>
        <showPeople :peopleList.sync="editData.peopleList"></showPeople>
      </template>
      <template v-slot:choosePeople2>
        <showPeople :peopleList.sync="editData.peopleList2"></showPeople>
      </template>
    </pc-form>
  </div>
</template>

<script>
import { deepClone, getDictMultiple } from '@/utils/tool'
// import { init } from 'events'
import followForm from './followForm'
import showPeople from './showPeople.vue'
// import {getSchoolClassScheduleList} from "@/api/course/schoolClassSchedule";
// import { getToken } from "@/utils/auth";

let defaultData = {
  followTime: '',
  follower: 0,
  note: '',
  nextNote: '',
  remindIdList: [],
  remindTimeValue: '',
  remindType: 0,
  remindWayList: [],
  type: 0,
  remindTime: '',
  peopleList: [],
  peopleList2: []
}

export default {
  components: { showPeople },
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
  mounted() {
    this.init()
  },
  data() {
    return {
      editData: this.value,
      rules: {},
      optionsSubject: [],
      optionsClassHour: [],
      action: `${this.baseUrl}/common/api/file/uploadFile/uploads`,
      uploadData: { fileType: 1, fileUseType: 4 },
      peopleList: [],
      peopleList2: []
    }
  },
  computed: {
    formData() {
      return followForm(this.editData, this.$route.query.flag || 0, this.typeArr)
    }
  },

  watch: {
    value(data) {
      console.log(data)
      this.editData = data
    },
    peopleList: {
      handler(val) {
        console.log('peopleList===')
      },
      deep: true
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

    // 'editData.courseId': function (value) {
    //   if (value) {
    //     let queryData = { pageSize: 999, pageNo: 1, schoolCourseId: value }
    //     getSchoolClassScheduleList(queryData).then(({ list }) => {
    //       this.optionsClassHour = list.map(({ classHourName, schoolClassScheduleId }) => {
    //         return {
    //           label: classHourName,
    //           value: schoolClassScheduleId
    //         }
    //       })
    //     })
    //   }
    // }

    // "editData.peopleList":{
    //   deep:true,
    //   handler(){

    //   }

    // }
  },

  methods: {
    async init() {
      const { sys_follow_remind_type: res } = await getDictMultiple(['sys_follow_remind_type'])
      res.forEach((e) => {
        e.value = e.dictValue
        e.label = e.dictLabel
      })
      this.typeArr = [...res]
    },
    getOptionsSubject() {
      // this.getDictComboBo('subject_type', true).then((data) => {
      //   this.optionsSubject = data;
      // });
    },
    getData() {
      return this.editData
    },
    validateFields() {
      return this.$refs.pcForm.getData()
    },
    clear() {
      this.editData = {
        cooperativePurposeId: null,
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
        source: null,
        type: null,
        remindTime: '',
        nextTast: false
      }
      this.$refs.pcForm.reset()
      setTimeout(() => {
        this.$refs.pcForm.reset()
      }, 100)
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
