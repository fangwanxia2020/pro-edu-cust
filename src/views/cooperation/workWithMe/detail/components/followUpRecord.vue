<template>
  <div>
    <h4>
      <span class="mr10">跟进记录</span>
      <el-button icon="el-icon-edit-outline" type="text" @click="handleOpen" v-if="canEdit"
        >创建跟进</el-button
      >
    </h4>
    <div class="block">
      <el-timeline v-if="followRemindList">
        <el-timeline-item
          :timestamp="item.createTime"
          placement="top"
          v-for="item in followRemindList"
          :key="item.followRemindId"
        >
          <note-item :noteItemData="item" @reset="reset"></note-item>
        </el-timeline-item>
      </el-timeline>
    </div>
    <addDialog
      title="创建跟进"
      ref="model"
      @getData="getData"
      :visibleFlag.sync="visibleFlag"
    ></addDialog>
  </div>
</template>

<script>
import { getRecord } from '@/api/cooperation/workWithMe.js'
import { addPeFollowRemind } from '@/api/cooperation/record.js'
import noteItem from './noteItem.vue'
import addDialog from './addDialog.vue'

export default {
  components: { noteItem, addDialog },
  props: {
    followRemindList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      noteItemData: {
        date: '2022-5-12 14:00',
        name: '王总',
        content: 'Lorem ipsum dolor sit amet'
      },
      visibleFlag: false,
      projectMissionId: this.$route.query.projectMissionId
    }
  },
  created() {
    this.getInfo()
  },
  computed: {
    canEdit() {
      return this.$route.query.canEdit == 2
    }
  },
  methods: {
    getInfo() {
      getRecord({
        cooperationDemandId: this.projectMissionId,
        source: 0
      }).then((res) => {
        console.log(res)
      })
    },
    handleOpen() {
      this.visibleFlag = true
    },
    getData(data) {
      console.log(data)
      let obj = {
        cooperationDemandId: this.projectMissionId,
        source: 0,
        note: data,
        followTime: new Date().dateFormat('yyyy-MM-dd HH:mm:ss')
      }
      addPeFollowRemind([obj]).then((res) => {
        if (res.code === 200) {
          this.$message.success('新建成功')
          this.visibleFlag = false
          this.$emit('reset')
        }
      })
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style scoped></style>
