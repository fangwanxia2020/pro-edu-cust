<!-- 列表配置模板页 -->
<template>
  <ty-business-crud2
    v-if="isCompleteReq"
    ref="tyBusinessCrud2"
    :columns="templateJsonData.columns"
    :getListInterface="{
      url: templateJsonData.interfaceUrl.url,
      methodType: templateJsonData.interfaceUrl.methodType,
      params: {
        orgId: orgId
      }
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
    @reportDetail="reportDetail"
  >
  </ty-business-crud2>
</template>

<script>
import { configurationInfo } from '@/api/management/template'

export default {
  data() {
    return {
      templateId: null,
      isCompleteReq: false,
      orgId: this.$store.state.user.userInfo.orgId,
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
      }
    }
  },
  created() {
    const templateId = this.$route.path.split('/').slice(-1).toString()
    this.templateId = templateId
    this.getConfigurationInfo()
  },
  methods: {
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
    reportDetail(e) {
      console.log(e)
      this.$router.push({
        path: '/trainingManagement/reportDetail',
        query: { classRelStudentId: e.classRelStudentId }
      })
    }
  }
}
</script>
