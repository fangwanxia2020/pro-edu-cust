<template>
  <search-box-form-item v-bind="$attrs">
    <el-date-picker
      v-bind.sync="$attrs"
      type="daterange"
      value-format="yyyy-MM-dd HH:mm:ss"
      v-model="dateRange"
      :style="{ width }"
      :size="size"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :editable="editable"
      @change="handleDateRangeChange"
    />
  </search-box-form-item>
</template>

<script>
import SearchBoxFormItem from './SearchBoxFormItem'

/**
 * 列表搜索栏日期范围组件，统一格式化搜索日期
 * @module SearchBoxFormDate
 * @vue-prop {string} [beginTimeKey='beginTime'] 开始日期属性名
 * @vue-prop {string} [endTimeKey='endTime'] 结束日期属性名
 * @vue-prop {string} [rangeSeparator='至'] 选择范围时的分隔符
 * @vue-prop {string} [size='medium'] 输入框尺寸
 * @vue-prop {string|number} [width='100%'] 输入框宽度
 * @vue-prop {string} [startPlaceholder='开始日期'] 范围选择时开始日期的占位内容
 * @vue-prop {string} [endPlaceholder='结束日期'] 范围选择时结束日期的占位内容
 * @vue-prop {boolean} [editable=false] 文本框可输入
 * @vue-event {Object} change 用户确认选定的值时触发
 */
export default {
  name: 'SearchBoxFormDate',
  components: { SearchBoxFormItem },
  props: {
    beginTimeKey: {
      type: String,
      default: 'beginTime'
    },
    endTimeKey: {
      type: String,
      default: 'endTime'
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    size: {
      type: String,
      default: 'medium'
    },
    width: {
      type: String || Number,
      default: '100%'
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dateRange: []
    }
  },
  methods: {
    handleDateRangeChange(dateRange) {
      const { beginTimeKey, endTimeKey } = this
      let params = {}
      if (dateRange && dateRange.length) {
        let [beginTime, endTime] = dateRange
        endTime = this.toDateUtil.formatDateTime(endTime, 'yyyy-MM-dd')
        endTime += ' 23:59:59'
        params = { [beginTimeKey]: beginTime, [endTimeKey]: endTime }
      } else {
        params = { [beginTimeKey]: undefined, [endTimeKey]: undefined }
      }

      this.$emit('change', params)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-range-separator {
    line-height: 24px !important;
  }
}
</style>
