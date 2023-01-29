<template>
  <div
    :class="{
      'list-edit': true,
      'create-page': true
    }"
  >
    <pc-form
      :class="['activity-info-form', flag == 1 ? 'detail' : '']"
      :data="formData"
      v-model="addData"
      :disabled="flag == 1"
      ref="mainFrom"
    >
      <template v-slot:nameList>
        <partner-list
          :dataList.sync="dataList"
          :isMore="true"
          rowKey="classRelStudentId"
          @selectData="selectData"
          ref="partner"
        ></partner-list>
      </template>
    </pc-form>
    <div class="sub-btn">
      <el-button style="margin-left: 50px" type="primary" @click="submit" v-if="flag == 0"
        >保存</el-button
      >
      <el-button @click="backPage">返回</el-button>
    </div>
  </div>
</template>
<script>
import { testPath } from '@/utils/tool'
import { addBatchStudentRelObj } from '@/api/trainingManagement/reward'

import { cooperationForm, getContractColumns } from './studentForm'
import PartnerList from './components/partnerList.vue'

export default {
  components: {
    PartnerList
  },
  data() {
    return {
      partnerColumns: [],
      contractColumns: [],
      dataList: [],
      formData: cooperationForm(this.$route.query.type, this.$route.query.flag || 0),
      addData: {
        type: this.$route.query.type, // 1-学生奖励与评价，2-学生惩罚与评价
        partnerId: '11',
        gainTime: null,
        awards: null,
        punishment: null,
        addStudentRelObjDtoList: []
      },
      flag: this.$route.query.flag ? this.$route.query.flag : 0,
      projectId: this.$route.query.projectId ? this.$route.query.projectId : null,
      isAccommodate: false,
      pictureList: {},
      selectTechnologyManagerList: [],
      projectManagerParams: {
        mobilePhone: '',
        personName: '',
        pageNum: 1,
        pageSize: 10
      },
      isView: false
    }
  },
  created() {
    this.init()
  },
  computed: {
    isAdd() {
      return testPath(/add/)
    }
  },
  watch: {},
  methods: {
    // 选择合伙人
    selectData(arr) {
      console.log(arr)
      this.addData.addStudentRelObjDtoList = [...arr]
    },

    async init() {
      this.contractColumns = await getContractColumns()
    },
    // 提交
    submit() {
      if (!this.addData.addStudentRelObjDtoList.length) return this.$message.error('请选择学生')
      console.log(this.addData)

      this.$refs.mainFrom.getData().then(async (res) => {
        // 新增
        let arr = [...this.addData.addStudentRelObjDtoList]
        arr.map((item) => {
          item.awards = this.addData.awards
          item.punishment = this.addData.punishment
          item.gainTime = this.addData.gainTime
          item.studentId = item.classRelStudentId

          item.comment = item.comment ? item.comment : ''
          item.commentStatus = item.comment ? 1 : 0
          item.type = this.$route.query.type
          item.gainTime = `${item.gainTime.split(' ')[0]} 00:00:00`
        })
        console.log('arr')
        console.log(arr)
        const resProject = await addBatchStudentRelObj(arr)
        this.$message({
          type: 'success',
          message: '新增成功'
        })
        this.backPage()
      })
    },
    // 返回列表页面
    backPage() {
      this.$router.go(-1)
      // let { backUrl } = this.$route.query
      // if (backUrl) return this.$router.push(backUrl)
      // return this.$router.push('/cooperation/cooperativeManage')
    },
    // 详情
    // async getProject() {
    //   const res = await getProAndProMissionByPid(this.projectId)
    //   let { projectContractMainList, projectPartnerList } = res.data
    //   this.addData = {
    //     ...res.data,
    //     addProjectPartnerDtoList: [...projectPartnerList],
    //     projectContractMainList
    //   }

    //   this.$refs.contract.setList(projectContractMainList)
    //   this.$refs.partner.setList(projectPartnerList)
    // },
    async resetList() {
      console.log('resetList')
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

  .sub-btn {
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
.btns-bar {
  margin-bottom: 20px;
}
</style>
