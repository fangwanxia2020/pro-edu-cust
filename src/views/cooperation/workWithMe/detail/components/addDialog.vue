<template>
  <el-dialog :title="title" :visible.sync="visible" v-if="visible" @close="closeModel">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="value">
        <el-input
          type="textarea"
          v-model="form.value"
          maxlength="5000"
          show-word-limit
          :rows="5"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-continer">
      <el-button type="primary" size="mini" @click="submit">确定</el-button>
      <el-button type="default" size="mini" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDetails } from '@/api/cooperation/record.js'

export default {
  props: {
    title: String,
    width: Number,
    visibleFlag: {
      type: Boolean,
      default: false
    },
    followRemindId: {
      type: Number,
      default: 0
    },
    suppleValue: {
      type: String
    }
  },
  watch: {
    visibleFlag(newVal) {
      this.visible = newVal
      if (newVal && this.followRemindId) {
        this.getDetailsFun()
      } else if (this.suppleValue) {
        this.form.value = this.suppleValue
      }
    }
  },
  data() {
    return {
      visible: this.visibleFlag,
      form: {
        value: ''
      },
      rules: {
        value: { required: true, message: '请输入', trigger: 'blur' }
      }
    }
  },
  methods: {
    openModel() {
      this.visible = true
    },
    getDetailsFun() {
      getDetails(this.followRemindId).then((res) => {
        if (res.code === 200) {
          this.form.value = res.data.note
        }
      })
    },
    closeModel() {
      this.visible = false
      this.$emit('update:visibleFlag', false)
    },
    cancel() {
      this.closeModel()
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('getData', this.form.value)
          this.form.value = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.btn-continer {
  text-align: end;
}
</style>
