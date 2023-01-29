<template>
  <div>
    <cooperation-detail :info="info"></cooperation-detail>
    <supplement :info="info" @reset="reset"></supplement>
    <follow-up-record :followRemindList="followRemindList" @reset="reset"></follow-up-record>
    <div class="design-form-wrap__btnwrap bottom-btn">
      <el-button size="small" v-if="canEdit" type="primary" @click="openShare()">分享</el-button>
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
    </div>
    <share-dialog
      :dialogVisible.sync="dialogVisible"
      :projectMissionId="projectMissionId"
    ></share-dialog>
  </div>
</template>

<script>
import { projectMissionInfo } from '@/api/cooperation/workWithMe'
import shareDialog from '@/views/cooperation/workWithMe/detail/components/shareDialog.vue'
import cooperationDetail from './components/cooperationDetail.vue'
import supplement from './components/supplement.vue'
import followUpRecord from './components/followUpRecord.vue'

export default {
  components: { cooperationDetail, supplement, followUpRecord, shareDialog },
  data() {
    return {
      info: {},
      followRemindList: [],
      dialogVisible: false,
      projectMissionId: this.$route.query.projectMissionId
    }
  },
  computed: {
    canEdit() {
      return this.$route.query.canEdit == 2
    }
  },
  created() {
    this.getProjectMissionInfo()
  },
  methods: {
    openShare() {
      this.dialogVisible = true
    },
    getProjectMissionInfo() {
      projectMissionInfo(this.$route.query.projectMissionId).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.followRemindList = [...(res.data.followRemindList || [])]
          this.info = res.data
        }
      })
    },
    reset() {
      this.getProjectMissionInfo()
    }
  }
}
</script>

<style scoped>
.bottom-btn {
  /* margin-left: 210px; */
  position: fixed;
  bottom: 0;
  left: 210px;
  right: 0;
}
</style>
