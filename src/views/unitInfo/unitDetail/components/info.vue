<template>
  <div>
    <form-component></form-component>
  </div>
</template>

<script>
import formComponent from '@/views/formComponent/index'

export default {
  components: { formComponent },
  data() {
    return {}
  },
  created() {
    this.init()
  },
  methods: {
    init() {},
    submitSuccess(data) {}
  }
}
</script>

<style type="text/css"></style>
