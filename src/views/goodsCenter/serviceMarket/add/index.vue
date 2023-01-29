<template>
  <div class="create-page">
    <div class="goods-classify">
      <span class="title">商品分类</span>
      <el-select
        v-model="innerCatalogId"
        placeholder="请选择商品分类"
        @change="changeCatalog"
        :disabled="isDetail"
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.innerCatalogId"
          :label="item.catalogName"
          :value="item.innerCatalogId"
        >
        </el-option>
      </el-select>
    </div>
    <el-tabs tab-position="top" type="card" style="height: 200px" v-model="tabsValue">
      <!-- 基本信息 -->
      <el-tab-pane
        :label="`${index + 1}.${tabPane.label}`"
        v-for="(tabPane, index) in tabPanes"
        :key="tabPane.label"
        :name="index + 1 + ''"
        :disabled="!goodsId"
      >
        <component
          v-bind="tabPane.formAttrs"
          :is="tabPane.formAttrs.is"
          :key="tabPane.label"
          :templateId="templateId"
          :innerCatalogId="innerCatalogId"
          :goodsId="goodsId"
          @submitGoodsBase="submitGoodsBase"
          :needChangeStatus="needChangeStatus"
          :isEnding="tabPanes.length === index + 1"
          @nextStep="nextStep"
          :isDetail="isDetail"
          :isEdit="isEdit"
          @finish="goodsCreateFinish"
          @updateStatus="updateStatus"
          @preview="preview"
          @getGoodsDetail="getGoodsDetail"
        >
        </component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { catalogList, updateGoodsStatus } from '@/api/goodsCenter/serviceMarket'
import { getLastPath } from '@/utils/share'
import { EDIT, DETAIL } from '@/constants'
import { SHOP_SHELVES_ID } from '@/utils/dict-enum'
import priceStock from './components/priceStock.vue'
import goodsBase from './components/goodsBase.vue'
import buyNeedKnow from './components/buyNeedKnow'
import { tabBasePanes, tabOhterPanes } from './jsData/index'

export default {
  components: { priceStock, goodsBase, buyNeedKnow },
  data() {
    return {
      tabPanes: tabBasePanes,
      innerCatalogId: this.$route.query.innerCatalogId || null,
      tabsValue: tabBasePanes[0].name,
      categoryOptions: [],
      templateId: '',
      goodsId: this.$route.query.goodsId || null,
      pathType: null,
      status: null
    }
  },
  created() {
    this.pathType = getLastPath(this.$route)
    this.getCatalogList()
  },
  computed: {
    isDetail() {
      console.log(this.pathType === DETAIL)
      return this.pathType === DETAIL
    },
    isEdit() {
      return this.pathType === EDIT
    },
    needChangeStatus() {
      return this.pathType === EDIT && this.status != 1
    }
  },
  methods: {
    async changeCatalog(row) {
      let changeItem = this.categoryOptions.find((item) => {
        return item.innerCatalogId === row
      })
      const { templateIds, attrExtend } = changeItem
      if (attrExtend != null && attrExtend.length > 0) {
        let list = []
        tabOhterPanes.forEach((tabInfo) => {
          attrExtend.forEach((item) => {
            if (tabInfo.code == item.name && item.value == 1) {
              list.push(tabInfo)
            }
          })
        })
        this.tabPanes = [...tabBasePanes, ...list]
      }
      if (templateIds && templateIds.length > 0) {
        this.templateId = await this.$store.dispatch('template/getTemplateId', {
          templateIds,
          type: this.pathType
        })
      }
    },
    getGoodsDetail({ status }) {
      this.status = status
    },
    getCatalogList() {
      catalogList({
        categoryType: 1,
        status: 1,
        shopShelvesId: SHOP_SHELVES_ID.TOB
      }).then((res) => {
        if (res.code === 200) {
          this.categoryOptions = res.data
          if (this.innerCatalogId) this.changeCatalog(this.innerCatalogId)
        }
      })
    },
    submitGoodsBase(data) {
      this.goodsId = data.goodsId ? data.goodsId : this.goodsId
      this.tabsValue = '2'
      if (this.needChangeStatus) {
        this.updateStatus()
      }
    },
    nextStep() {
      let tabsValue = Number(this.tabsValue)
      this.tabsValue = String(tabsValue + 1)
      if (this.needChangeStatus) {
        this.updateStatus()
      }
    },
    // 新建商品完成，提审
    goodsCreateFinish() {
      this.updateStatus()
      this.$router.go(-1)
    },
    updateStatus() {
      updateGoodsStatus({
        goodsId: this.goodsId,
        status: 1
      }).then((res) => {
        // this.$router.go(-1)
      })
    },
    // 预览
    preview() {
      this.$router.push({
        path: `/service/goodsDetail?goodsId=${this.goodsId}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-classify {
  padding-bottom: 10px;
  .title {
    display: inline-block;
    padding-right: 10px;
  }
}
</style>
