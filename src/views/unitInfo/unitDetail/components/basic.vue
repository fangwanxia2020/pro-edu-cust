<template>
  <div>
    <div class="title">单位信息</div>
    <ty-pc-form
      :apiData="templateId"
      :detailData="enterpriseId"
      :detailFlag="true"
      :backBtnShow="false"
    ></ty-pc-form>
    <!-- <el-row>
      <el-col :span="10">
        <p>统一社会信用代码: {{ form.creditCode || '-' }}</p>
        <p>联系地址:{{ form.registAddr || form.addr || '-' }}</p>
        <p>注册资本: {{ form.registeredCapital || '-' }}</p>
        <p>经营范围: {{ form.businessScope || '-' }}</p>
      </el-col>
      <el-col :span="10">
        <p>公司名称: {{ form.enterpriseName || '-' }}</p>
        <p>企业类型: {{ selectDictLabel(companyType, form.companyType) || '-' }}</p>
        <p>所属行业: {{ form.industryName || '-' }}</p>
      </el-col>
      <el-col :span="4">
        <p>营业执照照片:</p>
        <el-image v-if="form.businessCodeUrl" :src="form.businessCodeUrl"></el-image>
        <div v-else>暂无</div>
      </el-col>
    </el-row> -->
    <!-- <div class="title">经营风险</div> -->
  </div>
</template>

<script>
import { enterprisesGetInfo } from '@/api/unitInfo/unitDetail'
import { getDictMultiple, selectDictLabel, getOptions } from '@/utils/tool'
import { sceneDetail } from '@/api/abilieManagement/companyAbilie'
import { DETAIL } from '@/constants'

export default {
  name: '',
  data() {
    return {
      form: {
        temp: '-',
        businessCodeUrl: null,
        addr: '',
        creditCode: '',
        businessScope: '',
        enterpriseName: ''
      },
      companyType: [],
      templateId: null,
      enterpriseId: null
    }
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    async init() {
      // const { company_type: companyType } = await getDictMultiple(['company_type'])
      // this.companyType = companyType
      const { orgId, enterpriseId } = this.$store.state.user.userInfo
      this.enterpriseId = enterpriseId
      const res = await enterprisesGetInfo(orgId)
      const { enterpriseTypeTemplateId } = res.data
      const enterpriseTypeInfo = await sceneDetail(enterpriseTypeTemplateId)
      const { templateIds } = enterpriseTypeInfo.data
      let templateId = await this.$store.dispatch('template/getTemplateId', {
        templateIds,
        type: DETAIL
      })
      this.templateId = templateId
      // this.form = { ...res.data }
      // console.log(this.form)
    }
  }
}
</script>
<style scoped lang="scss">
.title {
  background-color: #f5faff;
  font-size: 17px;
  font-weight: bold;
  padding: 10px 0;
}
</style>
