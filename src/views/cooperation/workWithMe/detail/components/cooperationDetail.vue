<template>
  <div>
    <h4>事项内容</h4>
    <div class="cooperation-detail">
      <p class="cooperation-info">
        <span>负责的事项名称：{{ info.missionName }}</span>
        <span>负责实施单位：{{ info.requireCompletionUnit }}</span>
        <span
          >要求落地完成时间：{{
            info.requireCompletionTime ? info.requireCompletionTime.split(' ')[0] : '-'
          }}</span
        >
        <span>负责人：{{ info.requireCompletionPeople }}</span>
      </p>
      <p>目标描述： {{ info.missionNote }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  created() {
    // this.getProjectMissionInfo()
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.cooperation-detail {
  background: #ddd;
  padding: 10px;
  .cooperation-info {
    @include faj(center, space-between);
  }
}
</style>
