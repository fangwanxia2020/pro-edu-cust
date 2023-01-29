<template>
  <div>
    <el-dialog title="分享给协同联系人" :visible.sync="dialogVisibleFlag" @close="closeDialong">
      <div>
        <div class="tips">
          选中以下成员可<span class="el-dropdown-link">
            {{ typeName }}
          </span>
          <!-- <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ typeName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in typeList" :key="index" :command="index">{{
                item
              }}</el-dropdown-item>
            </el-dropdown-menu> </el-dropdown
          > -->
          数据
        </div>
        <!-- :filter-method="filterMethod" -->
        <el-transfer
          filterable
          filter-placeholder="请输入昵称"
          :titles="['未选择', '已选择']"
          v-model="value"
          :data="dataList"
        >
        </el-transfer>
      </div>
      <div class="btn-continer">
        <el-button type="primary" size="mini" @click="submit">确定</el-button>
        <el-button type="default" size="mini" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { projectParticipant, shareProjectMission } from '@/api/cooperation/workWithMe.js'

const typeList = ['编辑', '查看']
export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    dialogVisible(val) {
      this.dialogVisibleFlag = val
    }
  },
  data() {
    return {
      typeName: '编辑',
      dialogVisibleFlag: this.dialogVisible,
      typeList,
      dataList: [],
      value: [],
      peopeleData: {}
      // filterMethod(query, item) {
      //   return item.nickName
      // }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    setData(data) {
      this.typeName = data.visitType == 1 ? '查看' : '编辑'
      this.peopeleData = { ...data }
    },
    closeDialong() {
      this.typeName = '编辑'
      this.value = []
      this.$emit('update:dialogVisible', false)
    },
    async getList() {
      const res = await projectParticipant({ status: 1 })
      let data = []
      res.data.records.forEach((item, index) => {
        data.push({
          label: item.nickName,
          key: item.projectParticipantId,
          name: item.projectParticipantId
        })
      })
      this.dataList = [...data]
    },
    handleCommand(e) {
      console.log('e')
      console.log(e)
      this.typeName = this.typeList[e]
    },
    cancel() {
      this.closeDialong()
    },
    async submit() {
      console.log('this.value')
      console.log(this.value)
      if (!this.value.length) {
        this.$message.error('请选择协同联系人')
        return
      }
      this.peopeleData.projectParticipantIds = [...this.value]
      const res = await shareProjectMission(this.peopeleData)
      this.messageSuccess('保存成功')
      this.$emit('close')
      this.closeDialong()
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     this.$emit('getData', this.form.value)
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.tips {
  // text-align: center;
  padding-left: 390px;
  margin-bottom: 10px;
}
.btn-continer {
  text-align: end;
}
.el-dropdown-link {
  cursor: pointer;
  color: #2289ff;
  // margin-right: 10px;
  font-size: 14px;
}
</style>
