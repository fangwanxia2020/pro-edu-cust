<template>
  <div class="create-page">
    <ty-form-container v-bind="$attrs" v-on="$listeners" :templateId="id"></ty-form-container>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    templateId: {
      type: [Number, String],
      default: null
    }
  },
  watch: {
    templateId(newVal) {
      this.id = newVal
    }
  },
  data() {
    return {
      id: this.templateId
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.id = this.templateId || this.$route.params.id
    }
  }
}
</script>

<style type="text/css"></style>
