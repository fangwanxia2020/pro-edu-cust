<template>
  <div>
    <div class="line"></div>
    <div class="condition">
      <el-row>
        <el-col :span="3"><span>企业能力类型: </span></el-col>
        <el-col :span="20"
          ><el-checkbox-group
            v-model="form.abilieTypeArr"
            size="small"
            @change="changeCheckBox($event, 'abilieTypeArr')"
          >
            <el-checkbox-button
              v-for="ite in abilieTypeOption"
              :label="ite.dictValue"
              :key="ite.dictValue"
              >{{ ite.dictLabel }}</el-checkbox-button
            >
          </el-checkbox-group></el-col
        >
      </el-row>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { getDictMultiple } from '@/utils/tool'

export default {
  props: {},
  data() {
    return {
      form: {
        abilieTypeArr: []
      },
      abilieTypeOption: []
    }
  },
  watch: {
    form: {
      handler(newValue) {
        // 修改查询参数
        this.$emit('changeAbilityParams', this.form)
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 选全部就清空
    changeCheckBox(e, key) {
      if (e[0] == null) {
        this.form[key] = e.slice(1)
        return
      }
      if (e.length && e[e.length - 1] == null) {
        this.form[key] = [null]
      }
    },
    async init() {
      const { sys_abilie_type: abilieType } = await getDictMultiple(['sys_abilie_type'])
      this.abilieTypeOption = [{ dictValue: null, dictLabel: '全部' }, ...abilieType]
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  height: 10px;
  width: 100%;
  background: #f0f1f4;
}
.condition {
  padding: 20px;
  line-height: 30px;
}
::v-deep {
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    background: #fe9400;
    box-shadow: none;
  }
  .el-checkbox-button__inner {
    background: #f2f2f2;
    border: none !important;
    border-radius: 0 !important;
    margin-right: 7px;
    margin-bottom: 10px;
  }
  .el-checkbox-button__inner:hover {
    color: #909399 !important;
  }
}
</style>
