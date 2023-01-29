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
      <template v-slot:companyName>
        <partner-list
          :dataList.sync="dataList"
          :isMore="true"
          rowKey="partnerId"
          @selectData="selectData"
          ref="partner"
        ></partner-list>
      </template>
      <template v-slot:contract>
        <contract-list
          :dataList.sync="dataList"
          :isMore="true"
          rowKey="contractMainId"
          @selectData="selectData2"
          ref="contract"
        ></contract-list>
      </template>
    </pc-form>
    <div class="sub-btn">
      <el-button style="margin-left: 50px" type="primary" @click="submit" v-if="flag == 0"
        >提交</el-button
      >
      <el-button @click="backPage">返回</el-button>
    </div>
  </div>
</template>
<script>
import { testPath } from '@/utils/tool'
import {
  addProject,
  editProject,
  getProAndProMissionByPid
} from '@/api/cooperation/cooperativeManage'
import { listUser } from '@/api/system/user'

import { cooperationForm, getContractColumns } from './cooperationForm'
import PartnerList from './components/partnerList.vue'
import ContractList from './components/contractList.vue'

const principalColumn = [
  {
    key: 'personName',
    label: '人员姓名'
  },
  {
    key: 'postName',
    label: '岗位'
  },
  {
    key: 'workTypeName',
    label: '工种'
  },
  {
    key: 'mobilePhone',
    label: '联系电话'
  }
]
export default {
  components: {
    ContractList,
    PartnerList
  },
  data() {
    return {
      partnerColumns: [],
      contractColumns: [],
      dataList: [],
      listUser,
      principalColumn,
      formData: cooperationForm(this.$route.query.flag || 0),
      addData: {
        enterpriseId: '11',
        partnerId: '11',
        projectId: null,
        projectName: '',
        addProjectPartnerDtoList: [],
        projectContractMainList: []
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
    if (this.$route.query.projectId) {
      this.getProject()
    }
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
      this.addData.addProjectPartnerDtoList = [...arr]
      // this.addData.addProjectPartnerDtoList = arr
      console.log('this.addData.addProjectPartnerDtoList')
      console.log(this.addData.addProjectPartnerDtoList)
      this.$refs.mainFrom.reset()
      // this.$forceUpdate()
    },
    // 选择合同
    selectData2(arr) {
      this.addData.projectContractMainList = [...arr]
    },
    async init() {
      this.contractColumns = await getContractColumns()
    },
    // 提交
    // eslint-disable-next-line consistent-return
    submit() {
      // if (!this.addData.projectName) return this.$message.error('请输入合作项目名称')
      if (!this.addData.addProjectPartnerDtoList.length)
        return this.$message.error('请选择合作伙伴')
      // if (!this.addData.projectContractMainList.length) return this.$message.error('请选择合同')
      console.log(this.addData)
      this.$refs.mainFrom.getData().then(async (res) => {
        if (this.$route.query.projectId) {
          // 编辑
          this.addData.projectId = this.$route.query.projectId
          delete this.addData.projectPartnerList
          editProject(this.addData).then(() => {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.backPage()
          })
        } else {
          // 新增
          const resProject = await addProject(this.addData)
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.backPage()
        }
      })
    },
    // 返回列表页面
    backPage() {
      let { backUrl } = this.$route.query
      if (backUrl) return this.$router.push(backUrl)
      return this.$router.push('/cooperation/cooperativeManage')
    },
    // 详情
    async getProject() {
      const res = await getProAndProMissionByPid(this.projectId)
      let { projectContractMainList, projectPartnerList } = res.data
      this.addData = {
        ...res.data,
        addProjectPartnerDtoList: [...projectPartnerList],
        projectContractMainList
      }

      this.$refs.contract.setList(projectContractMainList)
      this.$refs.partner.setList(projectPartnerList)
    },
    async resetList() {
      console.log('resetList')
    }
  }
}
</script>
<style scoped lang="scss">
.create-page {
  height: auto;
}
.list-edit {
  // background-color: #fff;
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
