<template>
  <div id="body">
    <el-row>
      <el-col :span="24"
        ><div class="ddt">{{ templateList.objName }}</div>
      </el-col>
      <el-col :span="24"
        ><div class="ddt">{{ templateList.evaluateTplName + ':' }}</div></el-col
      >
      <el-col :span="24"
        ><div class="ddt">{{ templateList.note }}</div></el-col
      >
      <div
        v-for="(item, index) in templateList.evaluateItemStudentVos"
        :key="index"
        :label="item.createName"
        :value="index"
      >
        <el-col :span="24"
          ><div class="ddt" v-if="item.tplItemDirectory">
            {{ item.tplItemDirectory + ':' }}
          </div></el-col
        >
        <el-col :span="24"
          ><div class="bg-purple-dark">
            {{ item.tplItemName }}
          </div></el-col
        >
        <el-col :span="24"
          ><div class="bg-purple-dark">
            {{ item.tplItemNote }}
          </div></el-col
        >
        <el-col :span="24"
          ><div class="bg-purple-dark">
            {{ item.tplItemBasis | filterBasis(type) }}
          </div></el-col
        >
        <el-col :span="24"
          ><div class="bg-purple-dark">
            {{ item.tplItemBasisNote }}
          </div></el-col
        >
        <div class="bg-purple-dark">
          <el-col :span="24">
            <div v-if="item.tplItemType == 1">
              <!-- <el-input
                v-model="item.selectValue"
                style="width: 45%"
                size="small"
                disabled
              ></el-input> -->
              {{ item.selectValue }}分
            </div>
          </el-col>

          <el-col :span="24">
            <div v-if="item.tplItemType == 2">
              <el-select
                v-model="item.selectValue"
                clearable
                placeholder="请选择"
                style="width: 45%"
                size="small"
                disabled
              >
                <el-option
                  v-for="ite in item.evaluateItemValueVos"
                  :key="ite.evaluateTplItemValueId"
                  :label="ite.value"
                  :value="ite.evaluateTplItemValueId"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="24">
            <div v-if="item.tplItemType == 3">
              <el-radio-group v-model="item.selectValue" disabled>
                <el-radio
                  v-for="(ite, index) in item.evaluateItemValueVos"
                  :key="index"
                  :label="ite.value"
                  :value="index"
                ></el-radio>
              </el-radio-group>
            </div>
          </el-col>

          <el-col :span="24">
            <div v-if="item.tplItemType == 4">
              <el-radio-group v-model="item.selectValue" disabled>
                <el-radio
                  v-for="(ite, index) in item.evaluateItemValueVos"
                  :key="index"
                  :label="ite.value"
                  :value="index"
                ></el-radio>
              </el-radio-group>
            </div>
          </el-col>

          <el-col :span="24">
            <div v-if="item.tplItemType == 5">
              <el-col>
                <el-rate v-model="item.selectValue" @change="changeStar" disabled></el-rate>
              </el-col>
            </div>
          </el-col>
        </div>
      </div>
    </el-row>
    <div class="btn-footer">
      <!-- <el-button type="primary" @click="save()">保存</el-button> -->
      <el-button @click="save()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { evaluateInfo } from '@/api/trainingManagement/enterpriseReport'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'

export default {
  filters: {
    filterBasis(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      tplItemIdArr: [],
      a: null,
      formLabelAlign: {
        // 评价方式
        selectValue: null,
        tplItemId: null
      },
      templateList: {},
      visible: this.$route.query.visible,
      evaluateId: this.$route.query.evaluateId,
      type: []
    }
  },
  created() {
    this.init()
    this.getDic()
  },
  computed: {},
  methods: {
    init() {
      evaluateInfo(this.evaluateId).then((res) => {
        console.log(res, 'edres')
        this.templateList = res.data
      })
      console.log('ymy')
    },
    async getDic() {
      const { basis_of_evaluation: type } = await getDictMultiple(['basis_of_evaluation'])
      this.type = type
    },
    save() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
#body {
  background-color: white;
  padding-top: 20px;
  padding: 15px;
}
.bg-purple-dark {
  // background-color: #ebedf0;
  padding-left: 15px;
}
.star {
  width: 22px;
  height: 21px;
  margin: 5px 3px;
  margin-right: 30px;
  display: inline-block;
}
.btn-footer {
  // position: absolute;
  text-align: center;
  margin: 10px;
}
.ddt {
  margin-bottom: 20px;
}
</style>
