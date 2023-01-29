<template>
  <div class="search">
    <el-row>
      <el-col :span="6">
        <el-avatar size="large" :src="logo" shape="circle"></el-avatar>
        <span class="logo-name">{{ name }}</span>
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="inputContent"
          @change="changeInput"
          @keyup.enter.native="changeInput"
          clearable
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // name: "产教通",
      logo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      inputContent: ''
    }
  },
  methods: {
    changeInput() {
      this.$emit('input', this.inputContent)
    }
    // handerSearch() {
    //   this.$emit('searchFun', this.inputContent)
    // }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 50px 30px 30px;
  .logo-name {
    position: relative;
    top: -12px;
    right: -12px;
  }
}
</style>
