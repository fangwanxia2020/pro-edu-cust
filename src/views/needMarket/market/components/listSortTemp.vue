<template>
  <!-- 原本的过滤 -->
  <div>
    <el-checkbox-group v-model="chooice" size="small" class="sort-line">
      <el-checkbox-button
        v-for="item in sortArr"
        :label="item.id"
        :key="item.id"
        @change="changeSort($event, item)"
        >{{ item.name }}
        <i v-if="item.sort == true" class="el-icon-sort"></i>
      </el-checkbox-button>
    </el-checkbox-group>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    sortArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chooice: []
    }
  },
  methods: {
    changeSort(val, item) {
      this.chooice = []
      this.chooice.push(item.id)
      this.$emit('getSort', item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-line {
  padding: 4px 10px;
  border-bottom: 1px solid #dcdfe6;
}
::v-deep {
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    color: #fe9400;
    box-shadow: none;
    background: #fff;
  }
  .el-checkbox-button__inner {
    border: none !important;
    border-radius: 0 !important;
    margin-right: 7px;
    // margin-bottom: 7px;
  }
  .el-checkbox-button__inner:hover {
    color: #fe9400 !important;
  }
}
</style>
