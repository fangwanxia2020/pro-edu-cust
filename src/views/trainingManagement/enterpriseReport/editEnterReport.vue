<template>
  <div id="body">
    <el-form :model="form" label-width="150px" :rules="rules" ref="form">
      <el-form-item label="被评价单位名称" prop="objName">
        <el-input style="width: 40%" v-model="form.objName"></el-input>
      </el-form-item>
      <el-form-item label="评价模板" prop="template">
        <el-button type="text" @click="select" disabled>选择</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible" width="30%" @closed="closeDialogVisible">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="75" label="选择项">
          <template slot-scope="scope">
            <el-radio-group v-model="radioId" @input="change">
              <el-radio :label="scope.row.evaluateTplId" disabled><i></i></el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateTplId" label="编号"></el-table-column>
        <el-table-column prop="name" label="模板名称"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible('form')">取 消</el-button>
        <el-button type="primary" @click="closeDialogVisible('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="24"
        ><div class="ddt">{{ templateList.evaluateTplName }}</div></el-col
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
          ><div class="ddt" v-if="item.tplItemDirectory">{{ item.tplItemDirectory }}</div></el-col
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
              <el-input-number
                v-model="item.selectValue"
                style="width: 45%"
                size="small"
                :min="Number(item.evaluateItemValueVos[0].value)"
                :max="Number(item.evaluateItemValueVos[1].value)"
                :controls="false"
              ></el-input-number>
              <!-- <el-input
                v-model="item.selectValue"
                style="width: 45%"
                size="small"
                @input="change"
              ></el-input> -->
              {{ item.evaluateItemValueVos[0].value }} — {{ item.evaluateItemValueVos[1].value }}分
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
              >
                <el-option
                  v-for="ite in item.evaluateItemValueVos"
                  :key="ite.value"
                  :label="ite.value"
                  :value="ite.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="24">
            <div v-if="item.tplItemType == 3">
              <el-radio-group v-model="item.selectValue">
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
              <el-radio-group v-model="item.selectValue">
                <el-radio
                  v-for="(ite, index) in item.evaluateItemValueVos"
                  :key="index"
                  :label="ite.value"
                  :value="index"
                  >{{ ite.value | filterFit(ite.value) }}</el-radio
                >
              </el-radio-group>
            </div>
          </el-col>

          <el-col :span="24">
            <div v-if="item.tplItemType == 5">
              <el-col>
                <el-rate v-model="item.selectValue"></el-rate>
              </el-col>
            </div>
          </el-col>
        </div>
      </div>
    </el-row>
    <div class="btn-footer">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </div>
</template>

<script>
import {
  evaluateInfo,
  getListEvaluate,
  saveOrgEvaluate
} from '@/api/trainingManagement/enterpriseReport'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'

export default {
  filters: {
    filterFit(e) {
      if (e == 1) {
        return '符合'
      }
      if (e == 2) {
        return '不符合'
      }
    },
    filterBasis(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      form: {
        objName: ''
      },
      rules: {
        objName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }]
      },
      dialogVisible: false,
      tableData: [],
      radioId: null,
      tplItemIdArr: [],
      a: null,

      // 评价方式
      selectValueOne: '',
      selectValueTwo: '',
      selectValueThree: '',
      selectValueFour: '',
      selectValueFive: null,
      tplItemId: null,

      templateList: {},
      visible: this.$route.query.visible,
      evaluateId: this.$route.query.evaluateId,
      type: []
    }
  },
  created() {
    this.init()
    this.getDic()
    console.log(this.$route.query.evaluateId.evaluateId, 'this.$route.query.evaluateId')
  },
  computed: {},
  methods: {
    init() {
      evaluateInfo(this.evaluateId).then((res) => {
        console.log(res, 'edres')
        this.templateList = res.data
        this.form.objName = res.data.objName
        this.radioId = res.data.evaluateTplId
        console.log(this.templateList, ' this.templateList')
      })
      console.log('ymy')
      getListEvaluate({ evaluateType: 5 }).then((res) => {
        this.tableData = res.data.records
      })
    },
    async getDic() {
      const { basis_of_evaluation: type } = await getDictMultiple(['basis_of_evaluation'])
      this.type = type
    },
    // 触发星星
    // changeStar(v) {
    //   this.$forceUpdate()
    //   console.log(v)
    //   this.selectValueFive = v
    //   console.log(this.formLabelAlign.selectValueOne, '66')
    //   console.log(this.formLabelAlign.selectValueTwo, '77')
    //   console.log(this.formLabelAlign.selectValueThree, '88')
    // },
    // changeOne(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.selectValueOne = e
    // },

    // changeTwo(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.selectValueTwo = e
    // },
    // changeThree(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.selectValueThree = e
    // },
    // changeFour(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.selectValueFour = e
    // },
    save() {
      let evaluateItemDtos = []
      this.templateList.evaluateItemStudentVos.map((i) => {
        switch (i.tplItemType) {
          case 1:
            evaluateItemDtos = [
              {
                selectValue: i.selectValue,
                tplItemId: i.tplItemId
              }
            ]
            break
          case 2:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.tplItemId
            })
            break
          case 3:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.tplItemId
            })
            break
          case 4:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.tplItemId
            })
            break
          case 5:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.tplItemId
            })
            break
        }
        console.log(i, 'i')
        console.log(evaluateItemDtos, 'evaluateItemDtos')
      })
      saveOrgEvaluate({
        evaluateId: this.$route.query.evaluateId.evaluateId,
        evaluateItemDtos,
        evaluateStatus: 2,
        evaluateTplId: this.radioId,
        objType: 5,
        code: 'sysOrg',
        objName: this.form.objName
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
        }
        this.$router.go(-1)
      })
    },
    select() {
      this.dialogVisible = true
    },
    closeDialogVisible() {
      this.dialogVisible = false
    },
    change(e) {
      this.$forceUpdate(e)
    },
    cancel() {
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
