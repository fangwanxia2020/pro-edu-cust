<template>
  <div class="activity-management-list">
    <ty-business-crud
      v-if="columns"
      class="high-search-crud"
      mainKey="ty-list"
      :showIndex="true"
      :columns="columns"
      search-mode="high"
      :getListInterface="getListInterface"
      :showSearchFields="['themeName', 'cooperationModel', 'status', 'releaseStatus']"
      title=""
      @highSearchChange="highSearchChangeFun"
      :border="false"
      :showOperation="[]"
      ref="list"
    >
      <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="addRemind">新建</el-button>
          <!-- <el-button size="small">删除</el-button> -->
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="checkout(row)">查看详情</el-button>
          <el-button
            v-if="row.status == 0 || row.status == 2"
            size="mini"
            type="text"
            @click="edit(row)"
            >编辑</el-button
          >
          <el-button
            v-if="row.status == 0 || row.status == 2"
            size="mini"
            type="text"
            @click="submit(row)"
            >提交审核</el-button
          >
          <el-button
            v-if="(row.status == 3 && row.releaseStatus == 0) || row.releaseStatus == 2"
            size="mini"
            type="text"
            @click="release(row)"
            >发布</el-button
          >
          <el-button
            v-if="row.status == 3 && row.releaseStatus == 1"
            size="mini"
            type="text"
            @click="pullDown(row)"
            >下架</el-button
          >
          <el-button v-if="isDelete(row)" size="mini" type="text" @click="deleteData(row)"
            >删除</el-button
          >
        </div>
      </template>
      <template slot="resourceDescriptionDto" slot-scope="{ data }">
        <el-checkbox
          v-model="data.dataList"
          v-for="(item, index) in resource"
          :label="resoureArr[index]"
          :key="item"
          disabled
          style="display: inline-block; margin: 2px"
          >{{ item }}</el-checkbox
        >
      </template>
      <template slot="partnerSourceDto" slot-scope="{ data }">
        <el-checkbox
          v-model="data.dataList2"
          v-for="(item, index) in resource"
          :label="resoureArr[index]"
          :key="item"
          disabled
          style="display: inline-block; margin: 2px"
          >{{ item }}</el-checkbox
        >
      </template>
    </ty-business-crud>
  </div>
</template>

<script>
import {
  editPeCooperationDemand,
  getPeCooperationDemandDetails,
  deletePeCooperationDemand,
  list
} from '@/api/profession/construction.js'
import getColumns from './jsonData'

export default {
  data() {
    return {
      columns: null,
      searchDateRangShow: false,
      getListInterface: {
        url: '/system/demand/list',
        methodType: 'get',
        params: {
          cooperationModel: null,
          enterpriseName: '',
          releaseStatus: null,
          sortBy: null,
          status: null,
          themeName: '',
          beginTime: '',
          endTime: '',
          lift: null,
          pageNum: 1,
          pageSize: 10
        },
        resFormatFun: this.getListResFormatFun
      },
      visibleType: 'add',
      resource: ['场地', '设备', '原料', '专业人员', '就业岗位', '内容'],
      resoureArr: ['space', 'equipment', 'material', 'personnel', 'position', 'content'],
      dataList: [],
      dataList2: [],
      currentTime: ''
    }
  },
  created() {
    this.init()
    console.log(this.getListInterface, 'getListInterface')
    let time = new Date()
    this.currentTime = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()} ${time.getHours()}:${time.getMinutes() + 1}:${time.getSeconds()}`
    // let date = new Date()
    // let year = date.getFullYear()
    // let mouth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    // let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    // this.currentTime = `${year}-${mouth}-${day}`
    console.log(this.currentTime, 'currentDay')
  },
  computed: {
    isDelete() {
      return (row) => {
        if (row.status == 0 || row.status == 2) {
          return true
        }
        if (row.status == 3 && (row.releaseStatus == null || row.releaseStatus == 0)) {
          return true
        }
        if (row.status == 3 && row.releaseStatus == 2) {
          return true
        }
        return false
      }
    }
  },
  methods: {
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.forEach((item) => {
        item.dataList = []
        Object.entries(item.resourceDescriptionDto).forEach((ite) => {
          if (ite[1] == true) {
            item.dataList.push(ite[0])
          }
        })
        item.dataList2 = []
        Object.entries(item.partnerSourceDto).forEach((ite) => {
          if (ite[1] == true) {
            item.dataList2.push(ite[0])
          }
        })
      })
      console.log(res.data.records, 'res.data.records')
      // let arr = res.data.records
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    async init() {
      this.columns = await getColumns()
      list().then((res) => {
        console.log(res, '888')
        // res.data.records.forEach((item) => {
        //   item.dataList = []
        //   Object.entries(item.resourceDescriptionDto).forEach((ite) => {
        //     if (ite[1] == true) {
        //       item.dataList.push(ite[0])
        //     }
        //   })
        // })
        // let arr = res.data.records

        console.log(res.data.records, 'this.dataList')
      })
    },
    // 提交审核
    submit(row) {
      console.log(row)
      this.$confirm('是否确认提交审核?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        editPeCooperationDemand({
          cooperationDemandId: row.cooperationDemandId,
          status: 1,
          submitAuditTime: this.currentTime
        }).then((res) => {
          if (res.code == 200) {
            this.$message.success('提交审核成功')
          }
          this.$refs.list.setCheckList([])
          this.$refs.list._getListData()
        })
      })
    },
    // 下架
    pullDown(row) {
      this.$confirm('是否确认下架?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        editPeCooperationDemand({
          cooperationDemandId: row.cooperationDemandId,
          releaseStatus: 2
        }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
          }
          this.$refs.list.setCheckList([])
          this.$refs.list._getListData()
        })
      })
    },
    // 发布
    release(row) {
      this.$confirm('是否确认发布?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        editPeCooperationDemand({
          cooperationDemandId: row.cooperationDemandId,
          releaseStatus: 1,
          issueTime: this.currentTime
        }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
          }
          this.$refs.list.setCheckList([])
          this.$refs.list._getListData()
        })
      })
    },
    // 查看详情
    checkout(row) {
      this.$router.push({
        path: '/market/profession',
        query: {
          cooperationDemandId: row.cooperationDemandId,
          isVisible: this.$route.query.isVisible
        }
      })
    },
    // 编辑
    edit(row) {
      this.$router.push({
        path: '/construction/add',
        query: { visibleType: 'edit', cooperationDemandId: row.cooperationDemandId }
      })
    },
    // 删除
    deleteData(row) {
      console.log(row, 'row')
      this.$confirm('此操作将删除该记录, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePeCooperationDemand(row.cooperationDemandId).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.$refs.list.setCheckList([])
              this.$refs.list._getListData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    addRemind() {
      console.log(this.visibleType, 'visbleType')
      // this.newWindow('addConstruction')
      this.$router.push({
        path: '/construction/add',
        query: { visibleType: this.visibleType }
      })
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val
    }
  }
}
</script>

<style lang="scss" scoped>
.high-search-crud ::v-deep {
  .searchBox-high-operator-bar {
    display: none;
  }
}
</style>
