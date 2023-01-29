<!-- 列表配置模板页 -->
<template>
  <ty-business-crud2
    v-if="isCompleteReq"
    ref="tyBusinessCrud2"
    :columns="templateJsonData.columns"
    :getListInterface="{
      url: templateJsonData.interfaceUrl.url,
      methodType: templateJsonData.interfaceUrl.methodType,
      params
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
    :timeSearchList="templateJsonData.timeSearchList"
    :customSort="true"
    :multipleSort="true"
    :labelWidth="templateJsonData.labelWidth || 100"
    :btnSize="templateJsonData.btnSize || 'small'"
    :customColFieldList="templateJsonData.customColFieldList"
    @goDetailPath="goDetailPath"
    @addGoods="addGoods"
    @editGoods="editGoods"
    @preview="preview"
    @deleteGoods="deleteGoods"
    @goodsSpecAdd="goodsSpecAdd"
    @goodsDetail="goodsDetail"
    @downShelvesMultiple="downShelvesMultiple"
    @downShelvesSingle="downShelvesSingle"
    @upShelves="upShelves"
  >
    <!-- <template #search>
      <search-box-form-item label-text="销售目录"
        ><el-cascader
          @change="changeCatalogIds"
          :options="options"
          :props="props"
          clearable
          v-model="saleCatalogIds"
        ></el-cascader>
      </search-box-form-item>
    </template> -->
  </ty-business-crud2>
</template>

<script>
import { configurationInfo } from '@/api/management/template'
import { ADD, EDIT, DETAIL } from '@/constants'
import {
  removeGoodsByIds,
  upGoods,
  downGoods,
  treeSelectCustom
} from '@/api/goodsCenter/serviceMarket'
import { SHOP_SHELVES_ID } from '@/utils/dict-enum'
import { getGoodsIds } from './goodsEvent'

const routePath = 'serviceMarket'
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
      params: {
        saleCatalogId: null
      },
      options: [],
      props: { multiple: true, label: 'catalogName', value: 'saleCatalogId' },
      saleCatalogIds: []
    }
  },
  created() {
    const templateId = this.$route.path.split('/').slice(-1).toString()
    this.templateId = templateId
    this.getConfigurationInfo()
    this.getTreeSelectCustom()
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
    changeCatalogIds(value) {
      if (value.length > 0) {
        let ids = value
          .map((item) => {
            return item[item.length - 1]
          })
          .join(',')
        this.params.saleCatalogId = ids
      } else {
        this.params = {}
      }
    },
    // 获取销售目录
    getTreeSelectCustom() {
      treeSelectCustom({
        status: 1,
        shopShelvesId: SHOP_SHELVES_ID.TOB
      }).then((res) => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    addGoods() {
      this.$router.push({
        path: `/${routePath}/${ADD}`
      })
    },
    editGoods({ goodsId, innerCatalogId }) {
      this.$router.push({
        path: `/${routePath}/${EDIT}`,
        query: {
          goodsId,
          innerCatalogId
        }
      })
    },
    preview(e) {
      this.$router.push({
        path: `/service/goodsDetail?goodsId=${e.goodsId}`
      })
    },
    deleteGoods(data) {
      this.$confirm('此操作将永久删除选中的商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const goodsIds = getGoodsIds(data)
          removeGoodsByIds(goodsIds).then((res) => {
            if (res.code === 200) {
              this.resetList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goodsDetail({ goodsId, innerCatalogId }) {
      this.$router.push({
        path: `/${routePath}/${DETAIL}`,
        query: {
          goodsId,
          innerCatalogId
        }
      })
    },
    // 上架
    upShelves(data) {
      const goodsIds = getGoodsIds(data)
      upGoods(goodsIds).then((res) => {
        if (res.code === 200) {
          this.resetList()
          this.$message({
            type: 'success',
            message: '上架成功!'
          })
        }
      })
    },
    // 下架
    downShelves(goodsIds) {
      downGoods(goodsIds).then((res) => {
        if (res.code === 200) {
          this.resetList()
          this.$message({
            type: 'success',
            message: '下架成功!'
          })
        }
      })
    },
    // 多个下架
    downShelvesMultiple(data) {
      const goodsIds = getGoodsIds(data)
      this.downShelves(goodsIds)
    },
    // 单个下架
    downShelvesSingle({ goodsId }) {
      this.downShelves(goodsId)
    },
    goodsSpecAdd({ goodsId }) {
      this.$router.push({
        path: `/${routePath}/goodsSpecAdd`,
        query: {
          goodsId
        }
      })
    },
    // 刷新列表
    resetList() {
      this.$refs.tyBusinessCrud2.setCheckList([])
      this.$refs.tyBusinessCrud2._getListData()
    }
  }
}
</script>
