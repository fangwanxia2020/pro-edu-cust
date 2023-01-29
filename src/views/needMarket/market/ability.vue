<template>
  <div class="page">
    <div class="bg">
      <div class="title">
        {{ platformInfo.name
        }}<span class="tips">{{
          platformInfo.certificationStatus | filtersCertificationStatus(certificationStatus)
        }}</span>
      </div>
      <div>证书全称: {{ platformInfo.certificateVo.name }}</div>
      <div>证书描述说明: {{ platformInfo.certificateVo.note }}</div>
      <div>发证机构: {{ platformInfo.certificateVo.certifyingAuthority }}</div>
      <div>证件类型: {{ platformInfo.certificateVo.certificateType }}</div>
      <div>职业名称: {{ platformInfo.certificateVo.jobTitle }}</div>
      <div>工种/技能方向: {{ platformInfo.certificateVo.direction }}</div>
      <div>
        职业技能等级:<ty-checkbox
          :remote="true"
          v-model="platformInfo.skillLevels"
          interfaceMethod="/basic/system/dict/data/dictType/skill_level"
          :optItem="{ value: 'dictValue', label: 'dictLabel' }"
          :interfaceParam="{}"
          resList="data"
          :inline="true"
          :disabled="true"
        ></ty-checkbox>
      </div>
      <div>
        具备能力: {{ platformInfo.certificateVo.capacityType | filtersCapacityType(capacityType) }}
      </div>
    </div>
    <div class="phone-info">
      <div>单位名称: {{ platformInfo.enterpriseName }}</div>
      <div>联系电话: {{ platformInfo.phone }}</div>
      <el-button
        class="btn"
        type="warning"
        size="medium"
        :disabled="canContact"
        @click="handlePushKF"
        >在线客服</el-button
      >
    </div>
  </div>
</template>

<script>
import { competenceDetail } from '@/api/needMarket/market.js'
import { selectDictLabel, getDictMultiple } from '@/utils/tool.js'

export default {
  filters: {
    filtersCertificationStatus(val, list) {
      return selectDictLabel(list, val) || '-'
    },
    filtersCapacityType(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      certificationStatus: [],
      capacityType: [],
      platformInfo: {
        certificateVo: {},
        skillLevels: []
      }
    }
  },
  computed: {
    // 自己的就不能发给自己
    canContact() {
      const { orgId } = this.$store.state.user.userInfo
      return orgId == this.platformInfo.orgId
    }
  },
  async created() {
    const { certification_status: certificationStatus, capacity_type: capacityType } =
      await getDictMultiple(['certification_status', 'capacity_type'])
    this.certificationStatus = certificationStatus
    this.capacityType = capacityType
    this.getCompetenceDetail(this.$route.query.enterpriseCompetenceId)
  },
  methods: {
    // 跳转到一对一客服页
    handlePushKF() {
      let { orgId, adminUserId: userId, enterpriseName: custUserName } = this.platformInfo
      this.$router.push({
        path: `/market/oneOnlineService`,
        query: {
          type: 1,
          orgId, // 组织id
          userId, // 用户id
          custUserName
        }
      })
    },
    // 获取
    getCompetenceDetail(id) {
      competenceDetail(id).then((res) => {
        if (res.code === 200) {
          this.platformInfo = { ...res.data }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: #fff;
  padding: 20px;
  line-height: 35px;
}
.tips {
  background: red;
  color: #fff;
  font-size: 12px;
  padding: 3px 8px;
  line-height: 16px;
  margin-left: 40px;
}
.phone-info {
  padding: 20px;
  margin: 10px 0;
  line-height: 30px;
  border: 1px solid #ccc;
  background: #fffdf7;
  .btn {
    margin-top: 10px;
  }
}
</style>
