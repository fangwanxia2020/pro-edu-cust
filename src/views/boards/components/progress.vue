<template>
  <div class="progress">
    <div v-for="(item, index) in list" :key="index">
      <el-row :gutter="20">
        <el-col :span="5"
          ><div>{{ item.missionName }}</div></el-col
        >
        <el-col :span="19">
          <el-progress
            class="progress-list"
            :percentage="item.progress ? item.progress : 0"
            :format="format"
            :stroke-width="10"
          ></el-progress
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    format(percentage) {
      console.log('percentage')
      console.log(percentage)
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  margin-top: 20px;
  line-height: 40px;
  .progress-list {
    margin-top: 10px;
  }
}
</style>
