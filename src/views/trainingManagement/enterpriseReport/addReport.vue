<template>
  <div class="body">
    <div>
      <el-form :model="form" label-width="150px" :rules="rules" ref="form">
        <el-form-item label="被评价单位名称" prop="objName">
          <el-input style="width: 40%" v-model="form.objName"></el-input>
        </el-form-item>
        <el-form-item label="评价模板" prop="template">
          <el-button type="text" @click="select">选择</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" @closed="closeDialogVisible">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="75" label="选择项">
          <!-- <template slot-scope="scope">
            <el-radio v-model="secRadio" :label="scope.row.name" @input="change"><i></i></el-radio>
          </template> -->
          <template slot-scope="scope">
            <el-radio-group v-model="radioId">
              <el-radio :label="scope.row.evaluateTplId"><i></i></el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateTplId" label="编号"></el-table-column>
        <el-table-column prop="name" label="模板名称"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible('form')">取 消</el-button>
        <el-button type="primary" @click="sumbit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-row>
        <el-col :span="24"
          ><div class="ddt" v-if="templateList.name">{{ templateList.name }}</div></el-col
        >
        <el-col :span="24"
          ><div class="ddt" v-if="templateList.note">{{ templateList.note }}</div></el-col
        >
        <div
          v-for="(item, index) in templateList.evaluateTplItemVos"
          :key="index"
          :label="item.createName"
          :value="index"
        >
          <el-col :span="24"
            ><div class="ddt" v-if="item.tplItemDirectory">{{ item.tplItemDirectory }}</div></el-col
          >
          <el-col :span="24"
            ><div class="bg-purple-dark" v-if="item.tplItemName">
              {{ item.tplItemName }}
            </div></el-col
          >
          <el-col :span="24"
            ><div class="bg-purple-dark" v-if="item.tplItemNote">
              {{ item.tplItemNote }}
            </div></el-col
          >
          <el-col :span="24"
            ><div class="bg-purple-dark" v-if="item.tplItemBasis">
              {{ item.tplItemBasis | filterBasis(type) }}
            </div></el-col
          >
          <el-col :span="24"
            ><div class="bg-purple-dark" v-if="item.tplItemBasisNote">
              {{ item.tplItemBasisNote }}
            </div></el-col
          >
          <div class="bg-purple-dark">
            <el-form :model="formLabelAlign" :rules="rulesIn" ref="formLabelAlign">
              <el-form-item
                v-if="item.tplItemType == 1"
                :rules="[
                  // { required: true, message: '请输入退款金额', trigger: 'blur' },
                  // {
                  //   pattern: /^(\d|[1-9]\d+)(\.\d+)?$/,
                  //   message: '请输入大于0的数值',
                  //   trigger: 'blur'
                  // },
                  // {
                  //   validator(rule, value, callback) {
                  //     if (!value) {
                  //       callback()
                  //     } else {
                  //       if (value < 0.01) {
                  //         callback('请输入大于0的数值')
                  //       } else {
                  //         callback()
                  //       }
                  //     }
                  //   },
                  //   trigger: 'blur'
                  // }
                ]"
              >
                <div>
                  <!-- <el-input
                    v-model="selectValueOne"
                    style="width: 45%"
                    size="small"
                    @input="changeOne"
                  ></el-input> -->
                  <el-input-number
                    v-model="infoArr[index].selectValue"
                    style="width: 45%"
                    size="small"
                    :min="Number(item.evaluateTplItemValueVos[0].value)"
                    :max="Number(item.evaluateTplItemValueVos[1].value)"
                    :controls="false"
                  ></el-input-number>
                  {{ item.evaluateTplItemValueVos[0].value }} —
                  {{ item.evaluateTplItemValueVos[1].value }}分
                </div>
              </el-form-item>
              <el-form-item v-if="item.tplItemType == 2">
                <div>
                  <el-select
                    v-model="infoArr[index].selectValue"
                    clearable
                    placeholder="请选择"
                    style="width: 45%"
                    size="small"
                  >
                    <el-option
                      v-for="ite in item.evaluateTplItemValueVos"
                      :key="ite.evaluateTplItemValueId"
                      :label="ite.value"
                      :value="ite.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="item.tplItemType == 3">
                <div>
                  <el-radio-group v-model="infoArr[index].selectValue">
                    <el-radio
                      v-for="(ite, index) in item.evaluateTplItemValueVos"
                      :key="index"
                      :label="ite.value"
                      :value="index"
                    ></el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item v-if="item.tplItemType == 4">
                <div>
                  <el-radio-group v-model="infoArr[index].selectValue">
                    <el-radio
                      v-for="(ite, index) in item.evaluateTplItemValueVos"
                      :key="index"
                      :label="ite.value"
                      :value="index"
                      >{{ ite.value | filterFit(ite.value) }}</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item prop="selectValue" v-if="item.tplItemType == 5">
                <div>
                  <el-col>
                    <el-rate v-model="infoArr[index].selectValue"></el-rate>
                  </el-col>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-row>
    </div>
    <div class="btn-footer">
      <el-button type="primary" @click="save('formLabelAlign')">保存</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </div>
</template>

<script>
import {
  getListEvaluate,
  getInfo,
  saveOrgEvaluate,
  evaluateInfo
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
      infoArr: [],
      reg: /^(\d|[1-9]\d+)(\.\d+)?$/ /* 大于0的数正则 */,
      form: {
        objName: ''
      },
      tplItemIdArr: [],
      a: null,
      formLabelAlign: {
        // 评价方式
        selectValueOne: '',
        selectValueTwo: '',
        selectValueThree: '',
        selectValueFour: '',
        selectValueFive: null,
        tplItemId: null
      },
      dialogVisible: false,
      tableData: [],
      radioId: null,
      templateList: {},
      type: [],
      rules: {
        objName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }]
      },
      rulesIn: {
        selectValue: [{ required: true, message: '评价方式不能为空', trigger: 'blur' }]
      },
      visible: this.$route.query.visible
    }
  },
  created() {
    this.init()
    this.getDic()
  },
  computed: {},
  methods: {
    init() {
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
    //   this.formLabelAlign.selectValueFive = v
    //   console.log(this.formLabelAlign.selectValueOne, '66')
    //   console.log(this.formLabelAlign.selectValueTwo, '77')
    //   console.log(this.formLabelAlign.selectValueThree, '88')
    // },
    // changeOne(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.formLabelAlign.selectValueOne = e
    // },

    // changeTwo(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.formLabelAlign.selectValueTwo = e
    // },
    // changeThree(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.formLabelAlign.selectValueThree = e
    // },
    // changeFour(e) {
    //   this.$forceUpdate()
    //   console.log(e, 'e')
    //   this.formLabelAlign.selectValueFour = e
    // },
    // 新建保存
    save(formLabelAlign) {
      // this.$refs[formLabelAlign].validate((valid) => {
      //   if (valid) {
      // if(this.tplItemIdArr.length > 1){
      //   let obj = {}
      //   this.tplItemIdArr.forEach(e => {

      //   })
      // }
      let evaluateItemDtos = []
      this.infoArr.map((i) => {
        switch (i.tplItemType) {
          case 1:
            evaluateItemDtos.push({
              selectValue: Number(i.selectValue),
              tplItemId: i.evaluateTplItemId
            })

            break
          case 2:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.evaluateTplItemId
            })
            break
          case 3:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.evaluateTplItemId
            })
            break
          case 4:
            evaluateItemDtos.push({
              selectValue: i.selectValue,
              tplItemId: i.evaluateTplItemId
            })
            break
          case 5:
            evaluateItemDtos.push({
              selectValue: Number(i.selectValue),
              tplItemId: i.evaluateTplItemId
            })
            break
        }
        console.log(i, 'i')
        console.log(evaluateItemDtos, 'evaluateItemDtos')
      })
      saveOrgEvaluate({
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
    sumbit() {
      if (!this.radioId) {
        this.$message.error('请选择模板')
        return
      }
      getInfo(this.radioId).then((res) => {
        if (res.code == 200) {
          this.templateList = res.data
          console.log(this.templateList, 'this.templateList')

          res.data.evaluateTplItemVos.map((e) => {
            this.infoArr.push({
              ...e,
              selectValue: null,
              tplItemId: e.evaluateTplItemId
            })
            // return {
            //   selectValue: null,
            //   tplItemId: e.evaluateTplItemId
            // }
          })
          console.log(this.infoArr, 'infoarr')
          this.dialogVisible = false
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.body {
  background-color: white;
  padding-top: 20px;
  padding: 15px;
}
.bg-purple-dark {
  background-color: #ebedf0;
  padding: 10px 0 10px 20px;
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
  padding: 10px;
}
</style>
