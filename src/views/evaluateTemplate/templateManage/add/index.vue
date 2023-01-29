<template>
  <div class="create-page">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="模板名称" prop="name" label-width="80px">
        <el-input
          class="tpl-name"
          v-model="form.name"
          clearable
          :disabled="isDetail"
          placeholder="请输入模板名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="note" label-width="80px">
        <el-input
          :disabled="isDetail"
          class="tpl-name"
          v-model="form.note"
          clearable
          type="textarea"
          :rows="2"
          placeholder="请输入说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="评价类型" prop="evaluateType" label-width="80px">
        <el-select v-model="form.evaluateType" placeholder="请选择" :disabled="isDetail">
          <el-option
            v-for="item in evaluateTypeOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!isDetail">
        <el-button type="primary" @click="addIndex">+添加指标</el-button>
      </el-form-item>
      <el-form-item class="index-content" v-for="(item, idx) in form.evaluateTplItem" :key="idx">
        <div class="header-title">
          <el-form-item
            label="指标目录："
            label-width="110px"
            :prop="tplItemProp(idx, 'tplItemDirectory')"
          >
            <el-input
              :disabled="isDetail"
              placeholder="请输入指标目录"
              class="index-input"
              v-model="item.tplItemDirectory"
              clearable
            ></el-input>
            <i class="el-icon-delete del" @click="delIndex(idx)" v-if="!isDetail"></i>
          </el-form-item>
        </div>
        <el-form-item
          label="指标名称："
          label-width="110px"
          :prop="tplItemProp(idx, 'tplItemName')"
          :rules="[
            { required: true, message: '请输入指标名称', trigger: 'blur' },
            { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
          ]"
        >
          <el-input
            :disabled="isDetail"
            placeholder="请输入指标名称"
            class="index-input"
            v-model="item.tplItemName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="指标描述："
          label-width="110px"
          :prop="tplItemProp(idx, 'tplItemNote')"
        >
          <el-input
            :disabled="isDetail"
            placeholder="请输入指标描述"
            class="index-input"
            type="textarea"
            :rows="2"
            v-model="item.tplItemNote"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="评价依据："
          label-width="110px"
          :prop="tplItemProp(idx, 'tplItemBasis')"
          :rules="[{ required: true, message: '请选择评价依据', trigger: 'change' }]"
        >
          <el-select
            v-model="item.tplItemBasis"
            placeholder="请选择"
            clearable
            :disabled="isDetail"
          >
            <el-option
              v-for="item in basisOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="依据说明：" label-width="110px" prop="tplItemBasisNote">
          <el-input
            :disabled="isDetail"
            placeholder="请输入依据说明"
            class="index-input"
            type="textarea"
            :rows="2"
            v-model="item.tplItemBasisNote"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label-width="110px"
          label="评价方式："
          :prop="tplItemProp(idx, 'tplItemType')"
          :rules="[{ required: true, message: '请选择评价方式', trigger: 'change' }]"
        >
          <el-select
            placeholder="请选择评价方式"
            v-model="item.tplItemType"
            clearable
            :disabled="isDetail"
          >
            <el-option
              v-for="item in evaluateModeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="item.tplItemType == BASIS_OF_EVALUATION.DIRECT" class="direct-item">
          <el-form-item
            label-width="110px"
            label="打分范围："
            :prop="evaluateTplItemProp(idx, 0, DIRECT_ITEM_VALUE, 'value')"
            :rules="[{ required: true, message: '请输入最低分', trigger: 'blur' }]"
          >
            <span>最低分</span>
            <el-input
              :disabled="isDetail"
              placeholder="请输入最低分"
              class="select-input"
              v-model="item[DIRECT_ITEM_VALUE][0].value"
              type="number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label=""
            :prop="evaluateTplItemProp(idx, 1, DIRECT_ITEM_VALUE, 'value')"
            :rules="[{ required: true, message: '请输入选项值', trigger: 'blur' }]"
          >
            <span>最高分</span>
            <el-input
              :disabled="isDetail"
              placeholder="请输入最高分"
              class="select-input"
              v-model="item[DIRECT_ITEM_VALUE][1].value"
              clearable
              type="number"
            ></el-input>
          </el-form-item>
        </div>
        <div v-else-if="item.tplItemType == BASIS_OF_EVALUATION.GRADING">
          <el-form-item
            label-width="110px"
            label="档位打分："
            v-for="(item1, idx1) in item.gradingItemValue"
            :key="idx1"
            :prop="evaluateTplItemProp(idx, idx1, GRADING_ITEM_VALUE, 'value')"
            :rules="[
              { required: true, message: '请输入选项值', trigger: 'blur' },
              { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
            ]"
          >
            <span>{{ `第${idx1 + 1}档` }}</span>
            <el-input
              :disabled="isDetail"
              placeholder="请输入选项值"
              class="select-input"
              v-model="item1.value"
              clearable
              type="number"
            ></el-input>
            <span class="grading-text">分</span>
            <el-button
              v-if="!isDetail"
              type="success"
              icon="el-icon-plus"
              circle
              @click="addOption(GRADING_ITEM_VALUE, idx)"
            ></el-button>
            <el-button
              v-if="!isDetail"
              @click="delOption(GRADING_ITEM_VALUE, idx, idx1)"
              type="danger"
              icon="el-icon-minus"
              circle
            ></el-button>
          </el-form-item>
        </div>
        <div v-else-if="item.tplItemType == BASIS_OF_EVALUATION.OPTIONS">
          <el-form-item
            label-width="110px"
            label="选项评价："
            v-for="(item1, idx1) in item.evaluateTplItemValue"
            :key="idx1"
            :prop="evaluateTplItemProp(idx, idx1, EVALUATE_TPL_ITEM_VALUE, 'value')"
            :rules="[
              { required: true, message: '请输入选项值', trigger: 'blur' },
              { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
            ]"
          >
            <el-input
              :disabled="isDetail"
              placeholder="请输入选项值"
              class="select-input"
              v-model="item1.value"
              clearable
            ></el-input>
            <el-button
              v-if="!isDetail"
              type="success"
              icon="el-icon-plus"
              circle
              @click="addOption(EVALUATE_TPL_ITEM_VALUE, idx)"
            ></el-button>
            <el-button
              v-if="!isDetail"
              @click="delOption(EVALUATE_TPL_ITEM_VALUE, idx, idx1)"
              type="danger"
              icon="el-icon-minus"
              circle
            ></el-button>
          </el-form-item>
        </div>
        <div v-else-if="item.tplItemType == BASIS_OF_EVALUATION.COMPLIANCE" class="tips">
          判断被评价对象是否符合本条标准要求
        </div>
        <div v-else-if="item.tplItemType == BASIS_OF_EVALUATION.STARS" class="tips">
          为被评价对象打星，最高5星，最低1星
        </div>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit" v-if="!isDetail">保存</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getDictMultiple } from '@/utils/tool'
import { BASIS_OF_EVALUATION } from '@/utils/dict-enum'
import {
  EVALUATE_TPL_ITEM_VALUE,
  EVALUATE_TPL_ITEM,
  GRADING_ITEM_VALUE,
  DIRECT_ITEM_VALUE,
  EDIT,
  ADD,
  DETAIL
} from '@/constants'
import {
  addEvaluateTpl,
  getEvaluateTplById,
  editEvaluateTpl
} from '@/api/evaluateTemplate/templateManage'
import { getLastPath } from '@/utils/share'
import { handAddTpl, handDetailTpl } from './handleData'

export default {
  computed: {
    tplItemProp() {
      return (idx, key) => {
        return `${EVALUATE_TPL_ITEM}.${idx}.${key}`
      }
    },
    evaluateTplItemProp() {
      return (idx, idx1, key, key1) => {
        return `${EVALUATE_TPL_ITEM}.${idx}.${key}.${idx1}.${key1}`
      }
    },
    isDetail() {
      return this.pathType === DETAIL
    }
  },
  data() {
    return {
      BASIS_OF_EVALUATION,
      EVALUATE_TPL_ITEM_VALUE,
      GRADING_ITEM_VALUE,
      DIRECT_ITEM_VALUE,
      form: {
        name: null,
        note: null,
        evaluateType: null,
        evaluateTplItem: [
          {
            evaluateTplItemValue: [{ value: null }],
            gradingItemValue: [{ value: null }],
            directItemValue: [
              { seq: 1, value: 0 },
              { seq: 2, value: 0 }
            ], // 直接打分
            tplItemName: null, // 指标名称
            tplItemType: null, // 评价方式
            tplItemDirectory: null, // 指标目录
            tplItemNote: null, // 指标描述
            tplItemBasis: null, // 评价依据
            tplItemBasisNote: null // 依据说明
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        evaluateType: [{ required: true, message: '请选择评价类型', trigger: 'change' }]
      },
      basisOptions: [], // 评价依据
      evaluateTypeOptions: [], // 评价类型
      evaluateModeOptions: [], // 评价方式
      evaluateTplId: this.$route.query.evaluateTplId,
      pathType: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const {
        business_evaluate_type: businessEvaluateType,
        sys_tpl_item_type: sysTplItemType,
        basis_of_evaluation: basisOfEvaluation
      } = await getDictMultiple([
        'business_evaluate_type',
        'sys_tpl_item_type',
        'basis_of_evaluation'
      ])
      this.basisOptions = basisOfEvaluation
      this.evaluateTypeOptions = businessEvaluateType
      this.evaluateModeOptions = sysTplItemType
      const pathType = getLastPath(this.$route)
      this.pathType = pathType
      if (pathType === EDIT || pathType === DETAIL) {
        this.getDetail()
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { name, note, evaluateType, evaluateTplItem } = this.form
          const evaluateTplItems = handAddTpl(evaluateTplItem)
          const addEvaluateTplObj = {
            name,
            evaluateType,
            note,
            evaluateTplItems
          }
          if (this.pathType === ADD) {
            addEvaluateTpl(addEvaluateTplObj).then((res) => {
              if (res.code === 200) {
                this.$message.success('新建成功')
                this.$router.go(-1)
              }
            })
          } else if (this.pathType === EDIT) {
            addEvaluateTplObj.evaluateTplId = this.evaluateTplId
            editEvaluateTpl(addEvaluateTplObj).then((res) => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.$router.go(-1)
              }
            })
          }
        }
      })
    },
    // 获取指标详情
    getDetail() {
      getEvaluateTplById(this.evaluateTplId).then((res) => {
        if (res.code === 200) {
          console.log(res.data)
          const { name, evaluateType, note, evaluateTplItemVos } = res.data
          const evaluateTplItem = handDetailTpl(evaluateTplItemVos)
          const form = {
            name,
            evaluateType: String(evaluateType),
            note,
            evaluateTplItem
          }
          this.form = form
        }
      })
    },
    /* 添加指标 */
    addIndex() {
      if (this.form.evaluateTplItem.length >= 20) {
        this.messageErr('最多只能添加20个指标项')
        return
      }
      this.form.evaluateTplItem.push({
        evaluateTplItemValue: [{ value: null }], // 选项评分
        gradingItemValue: [{ value: null }], // 分档打分
        directItemValue: [
          { seq: 1, value: 0 },
          { seq: 2, value: 0 }
        ], // 直接打分
        tplItemName: null, // 指标名称
        tplItemType: null, // 评价方式
        tplItemDirectory: null, // 指标目录
        tplItemNote: null, // 指标描述
        tplItemBasis: null, // 评价依据
        tplItemBasisNote: null // 依据说明
      })
    },
    /* 删除指标 */
    delIndex(index) {
      if (this.form.evaluateTplItem.length <= 1) {
        this.messageErr('请至少保留一个指标模板')
        return
      }
      this.form.evaluateTplItem.splice(index, 1)
    },
    /* 添加选项 */
    addOption(key, index) {
      if (this.form.evaluateTplItem[index][key].length >= 20) {
        this.messageErr('最多只能添加20个项')
        return
      }
      this.form.evaluateTplItem[index][key].push({
        value: null
      })
    },
    /* 删除选项 */
    delOption(key, index1, index2) {
      if (this.form.evaluateTplItem[index1][key].length <= 1) {
        this.messageErr('请至少保留一个项')
        return
      }
      this.form.evaluateTplItem[index1][key].splice(index2, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  @include wh(50px, 50px);
}
.btn {
  text-align: center;
}
.tpl-name {
  width: 80%;
}
.header-title {
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  font-size: 14px;
  background: #e6e9ed;
  vertical-align: middle;
  .index-input {
    width: 65%;
  }
  .el-icon-delete {
    // display: inline-block;
    float: right;
    font-size: 24px;
    line-height: 30px;
    height: 30px;
    cursor: pointer;
  }
  .el-form-item__error {
    left: 120px !important;
  }
}
.grading-text {
  padding: 0 10px;
}
.index-content {
  border: 1px solid #ccc;
  width: 80%;
}
.select-input {
  width: 220px;
}
.direct-item {
  @include faj(center, flex-start);
}
.tips {
  margin-left: 20px;
}
.el-form-item .el-form-item {
  margin-bottom: 22px;
}
</style>
