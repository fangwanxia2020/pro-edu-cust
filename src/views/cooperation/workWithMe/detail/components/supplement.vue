<template>
  <div class="supplement">
    <h4>
      <span class="mr10">补充说明</span>
      <el-button icon="el-icon-edit-outline" type="text" @click="handleOpen" v-if="canEdit"
        >创建补充</el-button
      >
    </h4>
    <div class="note-list">
      <div v-for="(item, index) in noteList" :key="index" class="note-item">
        <text-item
          :noteItemData="item"
          :noteIndex="index"
          @changeItem="changeItem"
          @deleteItem="deleteItem"
        ></text-item>
      </div>
    </div>
    <div class="complete-part">
      <el-input
        placeholder="请输入内容"
        v-model="complete"
        type="number"
        @blur="blurProgress"
        :disabled="isdisabled"
      >
        <template slot="prepend">完成度</template>
        <template slot="append">%</template>
      </el-input>
    </div>
    <addDialog
      title="创建补充"
      ref="model"
      @getData="getData"
      :visibleFlag.sync="visibleFlag"
    ></addDialog>
  </div>
</template>

<script>
import { editProjectMission, addProjectMissionText } from '@/api/cooperation/workWithMe'
import textItem from './textItem.vue'
import addDialog from './addDialog.vue'

export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    info(newVal) {
      this.complete = newVal.progress
      this.noteList = this.info.textObject || []
    }
  },

  components: { textItem, addDialog },
  data() {
    return {
      noteList: this.info.textObject || [],
      visibleFlag: false,
      complete: Number(this.info.progress),
      projectMissionId: this.$route.query.projectMissionId
    }
  },
  computed: {
    canEdit() {
      return this.$route.query.canEdit == 2
    },
    isdisabled() {
      return this.$route.query.isdisabled == 1
    }
  },
  methods: {
    handleOpen() {
      this.visibleFlag = true
    },
    getData(data) {
      console.log(data)
      const { nickName } = this.$store.getters.userInfo
      let obj = {
        projectMissionId: this.projectMissionId,
        createName: nickName,
        text: data,
        time: new Date().dateFormat('yyyy-MM-dd HH:mm:ss')
      }
      this.noteList.push(obj)
      editProjectMission({
        projectMissionId: this.$route.query.projectMissionId,
        textJson: this.noteList
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success('新建成功')
          this.visibleFlag = false
          this.$emit('reset')
        }
      })
    },
    changeItem(info) {
      const { data, noteIndex } = info
      this.noteList[noteIndex].text = data
      editProjectMission({
        projectMissionId: this.$route.query.projectMissionId,
        textJson: this.noteList
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.visibleFlag = false
          this.$emit('reset')
        }
      })
    },
    deleteItem(index) {
      console.log(index, 'index')
      this.noteList.splice(index, 1)
      console.log(this.noteList, 'this.noteList')
      editProjectMission({
        projectMissionId: this.$route.query.projectMissionId,
        textJson: this.noteList
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.$emit('reset')
        }
      })
    },
    blurProgress() {
      editProjectMission({
        projectMissionId: this.$route.query.projectMissionId,
        progress: this.complete
      }).then((res) => {})
    }
  }
}
</script>

<style scoped lang="scss">
.complete-part {
  margin: 20px 0;
  width: 300px;
}
.supplement {
  @include bt(10px);
}
</style>
