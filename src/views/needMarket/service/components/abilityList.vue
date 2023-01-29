<template>
  <div class="list">
    <div
      v-for="item in list"
      :key="item.enterpriseCompetenceId"
      class="ability-list"
      @click="toDetail(item)"
    >
      <el-row>
        <el-col :span="20" class="list-title">{{ item.name }}</el-col>
        <el-col :span="4">
          <span class="list-tip"
            >企业{{
              item.certificationStatus | filtersCertificationStatus(certificationStatus)
            }}</span
          ></el-col
        >
      </el-row>
      <el-row class="list-content" v-if="item.certificateVo">
        <el-col :span="12">证书全称: {{ item.certificateVo.name }}</el-col>
        <el-col :span="12">发证机构: {{ item.certificateVo.certifyingAuthority }}</el-col>
        <el-col :span="12">职业名称: {{ item.certificateVo.jobTitle }}</el-col>
        <el-col :span="12">工种/职业方向: {{ item.certificateVo.direction }}</el-col>
        <el-col :span="12">职业技能等级: {{ item.certificateVo.skillLevel }}</el-col>
        <el-col :span="12"
          >具备能力:
          {{ item.certificateVo.capacityType | filtersCapacityType(capacityType) }}</el-col
        >
      </el-row>
      <div class="next">{{ item.enterpriseName }} ></div>
    </div>
  </div>
</template>

<script>
import { selectDictLabel, getDictMultiple } from '@/utils/tool.js'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
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
      capacityType: []
    }
  },
  async created() {
    const { certification_status: certificationStatus, capacity_type: capacityType } =
      await getDictMultiple(['certification_status', 'capacity_type'])
    this.certificationStatus = certificationStatus
    this.capacityType = capacityType
  },
  methods: {
    toDetail(data) {
      this.$router.push({
        path: `/market/ability?enterpriseCompetenceId=${data.enterpriseCompetenceId}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #eff0f3;
}
.ability-list {
  width: 49.7%;
  border-bottom: 2px solid #f0f1f4;
  line-height: 32px;
  font-size: 14px;
  padding: 20px 10px 0;
  background: #fff;
  margin-bottom: 8px;
  cursor: pointer;
  .list-title {
    font-size: 16px;
    font-weight: bold;
  }
  .list-tip {
    float: right;
    background: red;
    color: #fff;
    font-size: 12px;
    padding: 3px 8px;
    line-height: 16px;
  }
  .list-content {
    color: #909399;
  }
  .next {
    text-align: right;
    border-top: 1px solid #f0f1f4;
    line-height: 35px;
  }
}
</style>
