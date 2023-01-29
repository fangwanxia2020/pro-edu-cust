<template v-slot:operation="scope">
  <div class="bg">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="与我需求匹配">
        <ty-table
          id="dictCode"
          ref="dictCodeTableObj"
          :columns="columnsNeed"
          :data="dataList"
          :showIndex="false"
          :hidePage="true"
        >
          <template v-slot:operation="scope">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
              >查看详情</el-button
            >
          </template>
        </ty-table>
      </el-form-item>

      <el-form-item label="跟进记录">
        <div class="create-btn" @click="followUp">创建跟进</div>
        <div class="block list-content">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in list"
              :key="index"
              :timestamp="timestamp(item.followTime)"
              placement="top"
            >
              <el-card>
                <div>
                  跟进事项: {{ item.type | filtersType(type) }}
                  <div class="edit-btn">
                    <!-- <div @click="editDetail(item)">
                      <i class="el-icon-edit-outline"></i>
                    </div> -->
                    <div @click="deleteDetail(item)">
                      <i class="el-icon-delete"></i>
                    </div>
                  </div>
                </div>
                <div>跟进时间: {{ item.followTime | filtersTime(item.followTime) }}</div>
                <div>跟进人: {{ item.follower }}</div>
                <div>跟进内容: {{ item.note }}</div>
                <div>跟进提醒: {{ item.remindType | filtersRemindType(item.remindTimeValue) }}</div>
                <div>提醒方式: {{ item.remindWay | filtersRemindWay(item.remindWay) }}</div>
                <div>提醒谁看: {{ item.remindList }}</div>
                <div>创建时间: {{ item.createTime }}</div>
                <div>创建人: {{ item.createName }}</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-form-item>
    </el-form>
    <ve-dialog
      :content="content"
      :visible.sync="dialogVisible"
      :visibleType="visibleType"
      :source="source"
      :recommendedEnterpriseRelId="recommendedEnterpriseRelId"
      :cooperativePurposeId="cooperativePurposeId"
      @getData="getData"
      :followRemindId="followRemindId"
    ></ve-dialog>
  </div>
</template>

<script>
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import veDialog from '@/views/cooperation/components/SelectPeople/VeDialog.vue'
import { getRecord, deletePeFollowRemind, getDetails, getNeed } from '@/api/cooperation/record.js'
// import getColumns from './followRecord.js'
import getColumnsNeed from './needRecord.js'

export default {
  components: {
    veDialog
  },
  filters: {
    filtersType(val, list) {
      return selectDictLabel(list, val) || '-'
    },
    filtersRemindType(val, otVal) {
      if (val == 1) {
        return '准时提醒'
      }
      if (val == 2) {
        switch (otVal) {
          case '1':
            return '提前5分钟'
          case '2':
            return '提前10分钟'

          case '3':
            return '提前15分钟'
        }
      }
      return '无'
    },
    filtersRemindWay(val) {
      console.log(typeof val, '//')
      console.log(val, 'val')
      if (val === null) {
        return '无'
      }
      let str = ''
      if (val.includes('1')) {
        str = '系统消息 '
      }
      if (val.includes('2')) {
        str += '短信通知 '
      }
      if (val.includes('3')) {
        str += '邮件通知 '
      }
      return str
    },
    filtersTime(val) {
      if (val) {
        return val.split(' ')[0]
      }
      return '-'
    }
  },
  name: 'followRecord2',
  data() {
    return {
      type: [],
      visibleType: 'add',
      form: {},
      // editFormDetai: {},
      columns: null,
      columnsNeed: null,
      content: {},
      dataList: [],
      dialogVisible: false,
      cooperationDemandId: Number(
        this.$route.query.cooperationDemandId ? this.$route.query.cooperationDemandId : 0
      ),
      source: Number(this.$route.query.source ? this.$route.query.source : 0),
      cooperativePurposeId: Number(
        this.$route.query.cooperativePurposeId ? this.$route.query.cooperativePurposeId : null
      ),
      recommendedEnterpriseRelId: Number(
        this.$route.query.recommendedEnterpriseRelId
          ? this.$route.query.recommendedEnterpriseRelId
          : null
      ),
      list: [],
      followRemindId: Number(
        this.$route.query.followRemindId ? this.$route.query.followRemindId : 0
      )
    }
  },
  created() {
    this.init()
    this.getTimeLine()
    this.getNeedData()
  },
  computed: {
    timestamp() {
      return function (val) {
        if (val) {
          return val.split(' ')[0]
        }
        return ''
      }
    }
  },
  mounted() {},
  methods: {
    editDetail(item) {
      getDetails(item.followRemindId).then((res) => {
        this.visibleType = 'edit'
        this.content.data = res.data
        this.dialogVisible = true
      })
    },
    deleteDetail(item) {
      this.$confirm('此操作将删除该记录, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePeFollowRemind(item.followRemindId).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.getTimeLine()
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
    getData() {
      this.getTimeLine()
    },
    async init() {
      this.columnsNeed = await getColumnsNeed()
      const { sys_follow_remind_type: type } = await getDictMultiple(['sys_follow_remind_type'])
      this.type = type
    },
    checkDetail() {
      getDetails(this.followRemindId).then((res) => {
        this.visibleType = 'edit'
        this.content.data = res.data
        this.dialogVisible = true
      })
    },
    getNeedData() {
      getNeed(this.recommendedEnterpriseRelId).then((res) => {
        this.dataList.push(res.data)
      })
    },
    handleUpdate(row) {
      this.$router.push({
        path: '/market/profession',
        query: { cooperationDemandId: row.cooperationDemandId }
      })
    },
    followUp() {
      this.visibleType = 'add'
      this.dialogVisible = true
    },
    getTimeLine() {
      getRecord({
        cooperationDemandId: this.recommendedEnterpriseRelId,
        source: this.source
      }).then((res) => {
        this.list = res.data.peFollowRemindVoList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: #fff;
  padding: 20px;
  .list-content {
    line-height: 28px;
    .edit-btn {
      float: right;
      margin-right: 50px;
      transform: scale(1.3);
    }
  }
  .create-btn {
    position: absolute;
    top: -49px;
    left: 108px;
    color: $primaryColor;
    cursor: pointer;
  }
}
::v-deep {
  .el-timeline-item__timestamp {
    color: #303133;
    line-height: 1;
    font-size: 14px;
  }
}
</style>
