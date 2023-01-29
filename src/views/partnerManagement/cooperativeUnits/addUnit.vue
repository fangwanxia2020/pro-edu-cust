<template>
  <div
    :class="{
      'list-edit': true,
      'create-page': true
    }"
  >
    <div>
      <div class="formItem-head">
        <div class="head-content">
          <div class="head-content-title">单位类型</div>
        </div>
      </div>
      <el-radio-group v-model="enterpriseTypeTemplateId" :disabled="detailFlag">
        <el-radio
          @change="changeTemplate(item)"
          :label="item.enterpriseTypeTemplateId"
          v-for="item in templateList"
          :key="item.enterpriseTypeTemplateId"
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
    </div>
    <form-component
      :templateId="templateId"
      :requestCreateData="requestCreateData"
      :requestEditData="requestEditData"
      submitBtnText="保存"
      backBtnText="取消"
    ></form-component>
  </div>
</template>
<script>
import { enterpriseTypeTemplateList } from '@/api/partnerManagement/partner'
import { supplierPartnerInfo } from '@/api/partnerManagement/cooperativeUnits'
import { ADD, DETAIL } from '@/constants'
import { getLastPath } from '@/utils/share'
import { MENU_TYPE } from '@/utils/dict-enum'
import formComponent from '@/views/formComponent'

export default {
  components: { formComponent },
  data() {
    return {
      enterpriseTypeTemplateId: '',
      templateList: [],
      templateId: '',
      requestCreateData: {},
      requestEditData: {},
      detailFlag: false,
      isAdd: this.$route.query.isAdd
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getTemplateList()
      const path = getLastPath(this.$route)

      if (path != ADD) {
        if (path === DETAIL) this.detailFlag = true
        if (this.isAdd != 1) {
          this.getSupplierPartnerInfo()
        } else {
          this.enterpriseTypeTemplateId = Number(this.$route.query.enterpriseTypeTemplateId)
          this.getChangeItem()
        }
      }
    },
    async getTemplateList() {
      const isAdd = this.$route.query.isAdd
      let obj = {
        type: MENU_TYPE.PARTNER
      }
      if (isAdd == 1) {
        obj = {
          type: MENU_TYPE.ENTER,
          level: 2
        }
      }
      let res = await enterpriseTypeTemplateList(obj)
      if (res.code === 200) {
        this.templateList = res.data.records
      }
    },
    getChangeItem() {
      const changeItem = this.templateList.find((item) => {
        return this.enterpriseTypeTemplateId == item.enterpriseTypeTemplateId
      })
      this.changeTemplate(changeItem)
    },
    getSupplierPartnerInfo() {
      supplierPartnerInfo(this.$route.query.supplierId).then((res) => {
        if (res.code === 200) {
          this.enterpriseTypeTemplateId = res.data.templateId
          this.getChangeItem()
        }
      })
    },
    async changeTemplate(item) {
      const path = getLastPath(this.$route)
      this.templateId = await this.$store.dispatch('template/getTemplateId', {
        templateIds: item.templateIds,
        type: path
      })
      this.requestCreateData = {
        templateId: item.enterpriseTypeTemplateId
      }
      this.requestEditData = {
        templateId: item.enterpriseTypeTemplateId
      }
    }
  }
}
</script>
<style scoped lang="scss">
.list-edit {
  &__tabs {
    margin-bottom: 40px;

    ::v-deep .el-tabs__content {
      padding: 20px 10px;
    }
  }

  &__btn-group {
    display: flex;
    justify-content: center;

    .el-button {
      & + .el-button {
        margin-left: 30px;
      }
    }
  }

  .activity-sub {
    text-align: center;
    margin-top: 50px;
  }
}
.detail {
  ::v-deep {
    .el-upload-add {
      display: none !important;
    }
  }
}
.mb8 {
  margin-top: 20px;
}
</style>
