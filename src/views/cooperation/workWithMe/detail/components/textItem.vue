<template>
  <div class="note-item">
    <div class="note-item-top">
      <div>
        <span class="mr10">{{ noteItemData.time }}</span>
        <span>{{ noteItemData.createName }}</span>
      </div>
      <div>
        <el-button type="text" icon="el-icon-edit-outline" @click="openDetail"></el-button>
        <el-button type="text" icon="el-icon-delete" @click="deleteNote"></el-button>
      </div>
    </div>
    <div class="note-item-text">
      {{ noteItemData.text }}
    </div>
    <addDialog
      title="创建跟进"
      ref="model"
      @getData="getData"
      :suppleValue="suppleValue"
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
    },
    noteIndex: {
      type: Number
    }
  },
  data() {
    return {
      visibleFlag: false
    }
  },
  methods: {
    getData(data) {
      this.$emit('changeItem', { data, noteIndex: this.noteIndex })
      this.visibleFlag = false
    },
    openDetail() {
      this.visibleFlag = true
      this.suppleValue = this.noteItemData.text
    },
    deleteNote() {
      this.$emit('deleteItem', this.noteIndex)
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
