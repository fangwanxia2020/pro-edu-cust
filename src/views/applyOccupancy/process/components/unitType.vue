<template>
  <div>
    <el-form ref="form" :model="form" label-width="50px" class="content">
      <h2>选择单位类型</h2>
      <el-form-item label="">
        <el-radio-group v-model="form.type">
          <el-radio
            @change="change($event, item)"
            v-for="item in options"
            :key="item.enterpriseTypeTemplateId"
            :label="item.enterpriseTypeTemplateId"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { enterpriseTypeTemplateList } from '@/api/applyOcupancy/process'
import { MENU_TYPE } from '@/utils/dict-enum'

export default {
  props: {
    unitInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      options: [],
      form: {
        type: this.type
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await enterpriseTypeTemplateList({ type: MENU_TYPE.ENTER, level: 2 })
      this.options = [...res.data.records]
    },

    change(event, item) {
      this.$emit('update:unitInfo', item)
    },
    async setType(type) {
      this.form.type = type
      if (!this.options.length) {
        const res = await enterpriseTypeTemplateList({ type: MENU_TYPE.ENTER, level: 2 })
        this.options = [...res.data.records]
      }
      let item = this.options.find((item) => item.enterpriseTypeTemplateId == type)
      console.log(type)
      if (item) {
        this.$emit('update:unitInfo', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 500px;
  margin: 50px auto;
}
.el-radio-group {
  line-height: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
