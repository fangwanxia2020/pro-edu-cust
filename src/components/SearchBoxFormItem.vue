<template>
  <div class="search-box-form-item el-form-item el-form-item--medium search-item">
    <label class="el-form-item__label" :style="`width:${labelWidth}px`"
      >{{ labelText }}{{ labelSuffix ? ':' : '' }}</label
    >
    <div class="el-form-item__content" :style="`marginLeft:${labelWidth}px`">
      <slot />
    </div>
  </div>
</template>

<script>
/**
 * 自定义表单字段容器组件
 * @module SearchBoxFormItem
 * @vue-prop {string} labelText 标签名
 * @vue-prop {boolean} [labelSuffix=true] 是否显示后缀冒号
 */
export default {
  name: 'SearchBoxFormItem',
  props: {
    labelText: {
      type: String,
      required: true
    },
    labelSuffix: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style lang="scss" scoped></style>
