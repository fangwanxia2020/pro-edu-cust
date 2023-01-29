<template>
  <div>
    <div class="top">
      <div class="title">{{ info.themeName }}</div>
      <div>合作模式: {{ info.cooperationModel | cooperationModelFilter(sysCooperationModel) }}</div>
      <div class="tips">{{ info.issueTime || '' }}</div>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
      class="form-group"
      :rules="rules"
    >
      <el-form-item label="详情描述">
        <el-input type="textarea" v-model="form.note" max="500" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-row>
          <el-col :span="6"
            ><el-form-item label="" label-position="left"
              >公司名称 <el-input class="input-set" v-model="form.orgName"></el-input></el-form-item
          ></el-col>
          <el-col :span="6"
            ><el-form-item label="" label-position="left" prop="contactName"
              ><span>*</span>姓名
              <el-input v-model="form.contactName" class="input-set"></el-input></el-form-item
          ></el-col>
          <el-col :span="6"
            ><el-form-item label="" label-position="left" prop="contactPhone"
              ><span>*</span>手机号码
              <el-input v-model="form.contactPhone" class="input-set"></el-input></el-form-item
          ></el-col>
          <el-col :span="6"
            ><el-form-item label="" label-position="left"
              >电子邮箱 <el-input v-model="form.email" class="input-set"></el-input></el-form-item
          ></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onSubmit">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { demandDetail, addCooperativePurpose } from '@/api/needMarket/market.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool.js'
import { editRecommendedEnterpriseRelStatus } from '@/api/cooperation/needMatch'

export default {
  filters: {
    cooperationModelFilter(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      sysCooperationModel: [],
      cooperationDemandId: this.$route.query.cooperationDemandId,
      recommendedEnterpriseRelId: this.$route.query.recommendedEnterpriseRelId,
      form: {
        orgName: this.$store.getters.userInfo.org.orgName || '',
        contactName: '',
        contactPhone: '',
        email: '',
        note: ''
      },
      info: {},
      rules: {
        contactName: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
        contactPhone: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }]
      }
    }
  },
  async created() {
    const { sys_cooperation_model: sysCooperationModel } = await getDictMultiple([
      'sys_cooperation_model'
    ])
    this.sysCooperationModel = sysCooperationModel
    this.getDemandDetail(this.cooperationDemandId)
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { cooperationModel, enterpriseId, themeName } = this.info
          let form = {
            ...this.form,
            cooperationDemandId: this.cooperationDemandId,
            cooperativeModel: cooperationModel,
            enterpriseId,
            majorName: themeName
          }
          const res = await addCooperativePurpose(form)
          if (res.code === 200) {
            const res2 = await editRecommendedEnterpriseRelStatus({
              status: 3,
              recommendedEnterpriseRelId: this.recommendedEnterpriseRelId
            })
            this.$router.push({
              path: `/market/successPage`
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取
    getDemandDetail(id) {
      demandDetail(id).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.info = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  background: #fff;
  padding: 10px;
  margin: 10px 0;
  line-height: 30px;
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .tips {
    font-size: 13px;
    margin-top: 10px;
  }
}
.form-group {
  background: #fff;
  padding: 10px;
}
.input-set {
  width: 70%;
}
span {
  color: red;
}
</style>
