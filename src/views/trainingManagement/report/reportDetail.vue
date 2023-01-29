<template>
  <div class="page">
    <el-row :gutter="50" class="top-content">
      <el-col :span="8"
        ><img class="pic" :src="peopleImg" />
        <div class="info">
          <div>{{ studentVo.studentName }}</div>
          <div>学号: {{ studentVo.studentNum }}</div>
          <div>手机: {{ studentVo.mobilePhone }}</div>
          <div>性别: {{ studentVo.sex | filtersType(type) }}</div>
          <div>民族: {{ studentVo.nation | filterNation(snt) }}</div>
        </div></el-col
      >
      <el-col :span="14"
        ><div class="num-list">
          <div class="num-item">
            <div>培训内容</div>
            <div class="num">{{ reportData.trainingNumber }}</div>
          </div>
          <div class="num-item">
            <div>培训时长</div>
            <div class="num">{{ reportData.trainingTime }}天</div>
          </div>
          <div class="num-item">
            <div>收到奖励</div>
            <div class="num">{{ reportData.rewardNumber }}次</div>
          </div>
          <div class="num-item none-border">
            <div>收到处罚</div>
            <div class="num">{{ reportData.penaltyNumber }}次</div>
          </div>
        </div></el-col
      >
    </el-row>
    <div class="title">参加培训记录</div>
    <ty-table
      :showIndex="false"
      :columns="trainColumns"
      :data="trainingContentVoList"
      :hidePage="true"
    ></ty-table>
    <div class="title">获得奖励</div>
    <ty-table
      :showIndex="false"
      :columns="rewardColumns"
      :data="rewardList"
      :hidePage="true"
    ></ty-table>
    <div class="title">受到处罚</div>
    <ty-table
      :showIndex="false"
      :columns="punishColumns"
      :data="penaltyList"
      :hidePage="true"
    ></ty-table>
    <div class="title">考试成绩记录</div>
    <ty-table
      :showIndex="false"
      :columns="recordColumns"
      :data="studentScoreVos"
      :hidePage="true"
    ></ty-table>
    <div class="title">综合评价</div>
    <div>
      <div
        v-for="(item, index) in tableLists"
        :key="index"
        :label="item.createName"
        :value="index"
        class="contain"
      >
        <el-row>
          <el-col :span="12">评价单位：{{ item.orgName }}</el-col>
          <el-col :span="12"
            >评价日期：
            <span v-if="item.evaluateDate">
              {{ item.evaluateDate.split(' ')[0] }}
            </span></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="24"
            ><div>{{ item.evaluateTplName }}</div></el-col
          >
          <el-col :span="24"
            ><div>{{ item.note }}</div></el-col
          >
          <div v-for="(i, index) in item.evaluateItemStudentVos" :key="index">
            <el-col :span="24"
              ><div>{{ i.tplItemDirectory }}</div></el-col
            >
            <el-col :span="24"
              ><div class="bg-purple-dark">
                {{ i.tplItemName }}
              </div></el-col
            >
            <el-col :span="24"
              ><div class="bg-purple-dark">
                {{ i.tplItemNote }}
              </div></el-col
            >
            <el-col :span="24"
              ><div class="bg-purple-dark">
                {{ i.tplItemBasis | filterBasis(basis) }}
              </div></el-col
            >
            <el-col :span="24"
              ><div class="bg-purple-dark">
                {{ i.tplItemBasisNote }}
              </div></el-col
            >
            <el-col :span="24">
              <div class="bg-purple-dark" v-if="i.tplItemType == 1">
                <!-- <el-input
                  v-model="i.selectValue"
                  disabled
                  style="width: 45%"
                  size="small"
                ></el-input
                > -->{{ i.selectValue }}
                分
              </div>
              <div class="bg-purple-dark" v-if="i.tplItemType == 2">
                <el-select
                  disabled
                  v-model="i.selectValue"
                  clearable
                  placeholder="请选择"
                  style="width: 45%"
                  size="small"
                >
                  <el-option
                    v-for="ite in i.evaluateItemValueVos"
                    :key="ite.evaluateItemValueId"
                    :label="ite.value"
                    :value="ite.evaluateItemValueId"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="bg-purple-dark" v-if="i.tplItemType == 3">
                <el-radio-group v-model="i.selectValue">
                  <el-radio
                    v-for="(ite, index) in i.evaluateItemValueVos"
                    :key="index"
                    :label="ite.value"
                    :value="index"
                    disabled
                  ></el-radio>
                </el-radio-group>
              </div>
              <div class="bg-purple-dark" v-if="i.tplItemType == 4">
                <el-radio-group v-model="i.selectValue">
                  <el-radio
                    v-for="(ite, index) in i.evaluateItemValueVos"
                    :key="index"
                    :label="ite.value"
                    :value="index"
                    disabled
                    >{{ ite.value | filterFit(ite.value) }}</el-radio
                  >
                </el-radio-group>
              </div>
              <div v-if="i.tplItemType == 5" class="bg-purple-dark">
                <div class="bg-purple-dark">
                  <el-rate v-model="i.selectValue" disabled></el-rate>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  trainingReport,
  trainingContentId,
  getScoreById,
  studentTrainingInfo,
  studentEvaluateOrgList,
  studentEvaluateTimeList
} from '@/api/trainingManagement/report'
import peopleImg from '@/assets/images/user.png'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { getTrainColumns, getRewardColumns, getPunishColumns, getRecordColumns } from './jsonData'

export default {
  name: 'reportDetail',

  data() {
    return {
      peopleImg,
      classRelStudentId: this.$route.query.classRelStudentId,
      reportData: {},
      studentVo: {},
      rewardList: [],
      penaltyList: [],
      studentScoreVos: [],
      trainingContentVoList: [],
      trainColumns: null,
      punishColumns: null,
      rewardColumns: null,
      recordColumns: null,
      list: [],
      listDate: [],
      tableLists: [],
      input: '',
      inputSelect: '',
      radioArray: [],
      selectRadioArray: [],
      listNa: [],
      setion: [],
      type: [],
      snt: [],
      basis: []
    }
  },
  filters: {
    filtersType(val, list) {
      console.log(val, 'val')
      if (val == null) {
        return '-'
      }
      return selectDictLabel(list, val) || '-'
    },
    filterNation(val, list) {
      return selectDictLabel(list, val) || '-'
    },
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

  computed: {},
  watch: {
    // formInline: {
    //   handler(v) {
    //     // console.log(v, 'v??')
    //     if (v.createTime != '' && v.orgId != null) {
    //       // this.getStudentTrainingInfo()
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const {
        sys_nation_type: snt,
        sys_sex_type: type,
        basis_of_evaluation: basis
      } = await getDictMultiple(['sys_nation_type', 'sys_sex_type', 'basis_of_evaluation'])
      this.type = type
      this.snt = snt
      this.basis = basis
      this.list = [...type]
      this.listNa = [...snt]
      const res = await trainingReport(this.classRelStudentId)
      let { trainingContentVoList, penaltyList, rewardList, studentScoreVos, studentVo } = res.data
      this.reportData = { ...res.data }
      this.trainingContentVoList = trainingContentVoList
      this.studentVo = studentVo
      this.penaltyList = penaltyList
      this.rewardList = rewardList
      this.studentScoreVos = studentScoreVos
      this.trainColumns = await getTrainColumns()
      this.punishColumns = await getPunishColumns()
      this.rewardColumns = await getRewardColumns()
      this.recordColumns = await getRecordColumns()
      // 评价单位
      const { orgId } = this.$store.state.user.userInfo
      // 详情
      studentTrainingInfo({
        code: 'ucStudent',
        objType: 4,
        objId: this.studentVo.classRelStudentId,
        // objId: 1,
        orgId
        // createTime: this.formInline.createTime
      }).then((res) => {
        this.tableLists = res.data
        console.log(this.tableLists, 'this.tableLists')
        res.data.evaluateItemStudentVos[0].evaluateItemValueVos.forEach((i) => {
          this.radioArray.push(i.value)
        })
        console.log(this.radioArray, 'this.radioArray')
      })
    },
    change(val) {
      console.log(val, 'val')
    },
    changeDate(val) {
      console.log(val, 'valddd')
    }
  }
}
</script>
<style scoped lang="scss">
.page {
  background: #fff;
  padding: 20px;
  .top-content {
    padding-top: 20px;
    width: 100%;
    margin-bottom: 20px;
  }
  .pic {
    width: 170px;
    height: 180px;
    float: left;
    margin-right: 17px;
    margin-top: -20px;
  }
  .info {
    line-height: 30px;
  }
  .num-list {
    display: flex;
    flex-direction: row;
    .num-item {
      margin-top: 20px;
      padding: 0 20px;
      text-align: center;
      line-height: 30px;
      color: #625a5a;
      border-right: 1px solid rgb(231, 228, 228);
      .num {
        font-size: 20px;
        color: #000;
        // font-weight: bold;
      }
    }
    .none-border {
      border-right: none;
    }
  }
  .title {
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    margin: 20px 0;
  }

  .bg-purple-dark {
    background-color: #ebedf0;
    padding-left: 15px;
  }
  .contain {
    margin-top: 20px;
  }
  .star {
    width: 22px;
    height: 21px;
    margin: 5px 3px;
    display: inline-block;
  }
}
</style>
