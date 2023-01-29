<!-- 列表配置模板页 -->
<template>
  <div>
    <ty-business-crud2
      v-if="isCompleteReq"
      ref="tyBusinessCrud2"
      :columns="templateJsonData.columns"
      :getListInterface="{
        url: templateJsonData.interfaceUrl.url,
        methodType: templateJsonData.interfaceUrl.methodType
      }"
      title=""
      :showSearchFields="templateJsonData.showSearchFields"
      :searchMode="templateJsonData.searchMode"
      :searchBtnList="templateJsonData.searchBtnList"
      :optBtnList="templateJsonData.optBtnList"
      :tableBtnList="templateJsonData.tableBtnList"
      :id="templateJsonData.selectId"
      :showSelect="templateJsonData.showSelect"
      :showIndex="templateJsonData.showIndex"
      :affixQueryList="templateJsonData.affixQueryList"
      :timeFormat="templateJsonData.timeFormat"
      :pageInfo="{ limit: templateJsonData.limitNum ? templateJsonData.limitNum : 10 }"
      :dialogWidth="templateJsonData.dialogWidth ? templateJsonData.dialogWidth : 500"
      :tooltipEffect="templateJsonData.tooltipEffect"
      :totalData="templateJsonData.totalData"
      :showLabelSuffix="templateJsonData.showLabelSuffix"
      :showMoreOperator="templateJsonData.showMoreOperator"
      :alignRight="templateJsonData.alignRight"
      :columnFieldList="templateJsonData.columnFieldList"
      :expressionStatus="templateJsonData.expressionStatus"
      :customSort="true"
      :multipleSort="true"
      :labelWidth="templateJsonData.labelWidth || 100"
      :btnSize="templateJsonData.btnSize || 'small'"
      :customColFieldList="templateJsonData.customColFieldList"
      @goDetailPath="goDetailPath"
      @toNewReword="toNewReword"
      @toPunish="toPunish"
      @editReword="editReword"
      @editPunish="editPunish"
    >
    </ty-business-crud2>
    <el-dialog
      :title="form.type == 1 ? '编辑奖励' : '编辑惩罚'"
      :visible.sync="dialogFormVisible"
      :before-close="beforeClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号">
              {{ form.studentNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              {{ form.studentName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入学时间">
              {{ form.studentDate ? form.studentDate.split(' ')[0] : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自定义名称">
              {{ form.customName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="班级"> {{ form.name }}班 </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在年级">
              {{ form.level }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          v-if="form.type == 1"
          label="获得奖项"
          prop="awards"
          :rules="{ message: '请选择获得奖项', trigger: 'blur', required: true }"
        >
          <el-select
            style="width: 220px"
            clearable
            size="small"
            v-model="form.awards"
            placeholder="请选择获得奖项"
            @keyup.enter.native="handleQuery"
          >
            <el-option
              v-for="item in awardsType"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="Number(item.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.type == 2"
          label="收到惩罚"
          prop="punishment"
          :rules="{ message: '请选择收到惩罚', trigger: 'blur', required: true }"
        >
          <el-select
            style="width: 220px"
            clearable
            size="small"
            v-model="form.punishment"
            placeholder="请选择收到惩罚"
            @keyup.enter.native="handleQuery"
          >
            <el-option
              v-for="item in punishmentType"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="Number(item.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="获得日期"
          prop="gainTime"
          :rules="{ message: '请选择获得日期', trigger: 'blur', required: true }"
        >
          <el-date-picker
            v-model="form.gainTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker
        ></el-form-item>
        <el-form-item label="评语">
          <el-input type="textarea" v-model="form.comment" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { configurationInfo } from '@/api/management/template'

import { studentRelObjDetail, editStudentRelObj } from '@/api/trainingManagement/reward'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { deepClone } from '../../tool/build/utils'

export default {
  data() {
    return {
      templateId: null,
      isCompleteReq: false,
      // 列表配置需要参数
      templateJsonData: {
        columns: [],
        showSearchFields: [], // 显示的查询的字段
        searchMode: 'default', // 查询模式
        interfaceUrl: { url: '', methodType: 'GET' }, // 查询接口
        searchBtnList: [], // 筛选栏按钮列表
        optBtnList: [], // 操作栏按钮列表
        tableBtnList: [], // 列表按钮列表
        checkAttribute: [], // 附加查询
        showSelect: false, // 是否显示复选框
        showIndex: false, // 是否显示序号
        selectId: null, // 复选框选中时选择的id
        affixQueryList: [], // 附加查询key/value
        showMoreOperator: false,
        alignRight: false,
        expressionStatus: false,
        tooltipEffect: 'light',
        totalData: {},
        showLabelSuffix: true,
        timeFormat: {
          type: 'date',
          format: 'yyyy-MM-dd'
        },
        columnFieldList: [],
        templateJsonData: []
      },
      dialogFormVisible: false,
      form: { type: 1, studentDate: '' },
      awardsType: [],
      punishmentType: []
    }
  },
  created() {
    const templateId = this.$route.path.split('/').slice(-1).toString()
    this.templateId = templateId
    this.getConfigurationInfo()
    this.init()
  },
  computed: {
    isReWard() {
      return this.form.type == 1
    }
  },
  methods: {
    async init() {
      const { awards_type: awardsType, punishment_type: punishmentType } = await getDictMultiple([
        'awards_type',
        'punishment_type'
      ])
      this.awardsType = awardsType
      this.punishmentType = punishmentType
    },
    // 获取模板信息
    getConfigurationInfo() {
      configurationInfo(this.templateId).then((res) => {
        let { data } = res
        this.templateJsonData = data.templateJson
          ? JSON.parse(data.templateJson)
          : this.templateJsonData
        this.isCompleteReq = true
      })
    },
    // 按钮详情页跳转配置
    goDetailPath(obj) {
      const { clickTypeDetail, checkObj, templateTitle, clickType } = obj
      this.$router.push({
        path: `/tableConfigure/templateDetail/${clickTypeDetail}`,
        query: {
          title: templateTitle,
          checkObj: checkObj ? JSON.stringify(checkObj) : null,
          detailFlag: !!(clickType && clickType == 'check')
        }
      })
    },
    // 新建奖励
    toNewReword(e) {
      this.$router.push({
        path: '/trainingManagement/newReword',
        query: { type: 1 }
      })
    },
    //  新建惩罚
    toPunish(e) {
      this.$router.push({
        path: '/trainingManagement/newReword',
        query: { type: 2 }
      })
    },
    // 编辑奖励
    async editReword(e) {
      const res = await studentRelObjDetail(e.studentRelObjId)
      this.form = { ...res.data }
      this.dialogFormVisible = true
    },
    // 编辑惩罚
    async editPunish(e) {
      console.log('e')
      console.log(e)
      const res = await studentRelObjDetail(e.studentRelObjId)
      this.form = { ...res.data }
      this.dialogFormVisible = true
    },
    beforeClose() {
      this.form = { type: 1, studentDate: '' }
      this.dialogFormVisible = false
    },
    // 提交
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let data = deepClone(this.form)
          data.comment = data.comment ? data.comment : ''
          data.gainTime = `${data.gainTime.split(' ')[0]} 00:00:00`
          data.commentStatus = data.comment ? 1 : 0
          const resProject = await editStudentRelObj(data)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$refs.tyBusinessCrud2._getListData()
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>
