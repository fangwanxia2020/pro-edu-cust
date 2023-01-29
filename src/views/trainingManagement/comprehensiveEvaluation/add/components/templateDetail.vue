<template>
  <div>
    <div class="template-content" v-if="templateInfo">
      <h3 class="template-name">{{ templateInfo.name }}</h3>
      <h4>说明</h4>
      <div class="template-explain">{{ templateInfo.note }}</div>
      <div
        class="template-list"
        v-for="(item, index) in templateInfo.evaluateTplItemVos"
        :key="item.evaluateTplItemId"
      >
        <h4 class="template-catalogue">{{ item.tplItemDirectory }}</h4>
        <div class="template-item">
          <h4 class="template-item-name">{{ item.tplItemName }}</h4>
          <p class="template-item-describe" v-if="item.tplItemNote">
            {{ item.tplItemNote }}
          </p>
          <p class="template-item-basis" v-if="item.tplItemBasis">
            <span>评价依据：</span><span>{{ getBasisName(item.tplItemBasis) }}</span>
          </p>
          <p class="template-item-explain" v-if="item.tplItemBasisNote">
            {{ item.tplItemBasisNote }}
          </p>
          <div v-if="item.tplItemType === BASIS_OF_EVALUATION.DIRECT">
            <el-input-number
              v-model="evaluateTplValueList[index].selectValue"
              :min="Number(item.evaluateTplItemValueVos[0].value)"
              :max="Number(item.evaluateTplItemValueVos[1].value)"
              label="请输入分数"
            ></el-input-number>
            <span class="suffix">分</span>
          </div>
          <div v-else-if="item.tplItemType === BASIS_OF_EVALUATION.GRADING">
            <el-select v-model="evaluateTplValueList[index].selectValue" placeholder="请选择">
              <el-option
                v-for="item1 in item.evaluateTplItemValueVos"
                :key="item1.value"
                :label="`${item1.value}分`"
                :value="item1.value"
              >
              </el-option>
            </el-select>
          </div>
          <div v-else-if="item.tplItemType === BASIS_OF_EVALUATION.OPTIONS">
            <el-radio-group v-model="evaluateTplValueList[index].selectValue">
              <el-radio
                v-for="item1 in item.evaluateTplItemValueVos"
                :key="item1.value"
                :label="item1.value"
              >
                {{ item1.value }}
              </el-radio>
            </el-radio-group>
          </div>
          <div v-else-if="item.tplItemType === BASIS_OF_EVALUATION.COMPLIANCE">
            <el-radio v-model="evaluateTplValueList[index].selectValue" :label="1">符合</el-radio>
            <el-radio v-model="evaluateTplValueList[index].selectValue" :label="2">不符合</el-radio>
          </div>
          <div v-else-if="item.tplItemType === BASIS_OF_EVALUATION.STARS">
            <el-rate v-model="evaluateTplValueList[index].selectValue"></el-rate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASIS_OF_EVALUATION } from '@/utils/dict-enum'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { getTplInfo } from '@/api/trainingManagement/comprehensiveEvaluation'

export default {
  computed: {
    getBasisName() {
      return function (value) {
        return selectDictLabel(this.basisOptions, value)
      }
    }
  },
  data() {
    return {
      BASIS_OF_EVALUATION,
      basisOptions: [],
      templateInfo: null,
      evaluateTplValueList: []
    }
  },
  props: {
    evaluateTplId: {
      type: [Number, String],
      default: null
    }
  },
  watch: {
    evaluateTplId(newVal) {
      if (newVal) {
        this.getInfo(newVal)
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { basis_of_evaluation: basisOfEvaluation } = await getDictMultiple([
        'basis_of_evaluation'
      ])
      this.basisOptions = basisOfEvaluation
    },
    // 获取详情
    getInfo(id) {
      getTplInfo(id).then((res) => {
        if (res.code === 200) {
          this.templateInfo = res.data
          let evaluateTplItemVos = res.data.evaluateTplItemVos
          this.evaluateTplValueList = evaluateTplItemVos.map((item) => {
            return {
              selectValue: null,
              tplItemId: item.evaluateTplItemId
            }
          })
        }
      })
    },
    // 重置选项
    resetValueList() {
      this.evaluateTplValueList.forEach((item) => {
        item.selectValue = null
      })
    }
  }
}
</script>

<style scoped lang="scss">
.template-content {
  padding: 20px;
  border-top: 1px solid #ccc;
  font-size: 14px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  .template-name {
    font-weight: 500;
  }
  .template-explain {
    background-color: #f2f2f2;
    padding: 10px;
  }
  .template-item {
    background-color: #f2f2f2;
    padding: 10px;
    .suffix {
      padding-left: 10px;
    }
  }
}
.template-btn {
  padding: 10px;
  text-align: center;
}
</style>
