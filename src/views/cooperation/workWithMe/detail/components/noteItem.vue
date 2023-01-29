<template>
  <div class="note-item">
    <div class="note-item-top">
      <div>
        <span>{{ noteItemData.createName }}</span>
      </div>
      <div v-if="canEdit">
        <!-- 不用编辑新增，如果不对，删除 -->
        <!-- <el-button type="text" icon="el-icon-edit-outline" @click="openDetail"></el-button> -->
        <el-button
          v-show="showDetate(noteItemData.createId)"
          type="text"
          icon="el-icon-delete"
          @click="deleteNote"
        ></el-button>
      </div>
    </div>
    <div class="note-item-text">
      {{ noteItemData.note }}
    </div>
    <addDialog
      title="创建跟进"
      ref="model"
      @getData="getData"
      :followRemindId="noteItemData.followRemindId"
      :visibleFlag.sync="visibleFlag"
    ></addDialog>
  </div>
</template>

<script>
import { editPeFollowRemind, deletePeFollowRemind } from '@/api/cooperation/record.js'
import addDialog from './addDialog.vue'

export default {
  components: { addDialog },
  props: {
    noteItemData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      visibleFlag: false
    }
  },
  computed: {
    canEdit() {
      return this.$route.query.canEdit == 2
    },
    showDetate() {
      return function (createId) {
        let { userId } = this.$store.state.user
        // 只有本人能删除
        return createId === userId
      }
    }
  },
  methods: {
    getData(data) {
      let obj = {
        followRemindId: this.noteItemData.followRemindId,
        note: data,
        followTime: this.noteItemData.followTime
      }
      editPeFollowRemind(obj).then((res) => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.visibleFlag = false
          this.$emit('reset')
        }
      })
    },
    openDetail() {
      this.visibleFlag = true
    },
    deleteNote() {
      deletePeFollowRemind(this.noteItemData.followRemindId).then((res) => {
        this.$message.success('删除成功')
        this.$emit('reset')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.note-item {
  background: #ddd;
  padding: 10px;
  margin-bottom: 10px;
  &-top {
    @include faj(center, space-between);
    div {
      &:first-child {
        color: #999;
      }
    }
  }
}
</style>
