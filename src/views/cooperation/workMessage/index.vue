<template>
  <div id="workMessage">
    <div class="serachModule">
      <el-form :model="queryParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合作事项名称" prop="projectMissionName">
              <el-input
                v-model="queryParams.projectMissionName"
                placeholder="请输入合作事项名称"
                clearable
                size="small"
                style="width: 80%"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人" prop="projectParticipantName">
              <el-input
                v-model="queryParams.projectParticipantName"
                placeholder="请输入申请人"
                clearable
                size="small"
                style="width: 80%"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="40px">
              <el-button type="primary" size="small" @click="handleQueryClick">搜索</el-button>
              <el-button size="small" @click="resetQuery">重置</el-button>
              <el-button type="text" size="medium" @click="highShow = !highShow">
                高级查询
                <i :class="[highShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="highShow">
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请人手机" prop="projectParticipantPhone">
                <el-input
                  v-model="queryParams.projectParticipantPhone"
                  placeholder="请输入申请人手机"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间" prop="date">
                <el-date-picker
                  style="width: 80%"
                  v-model="queryParams.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="handleChangeDate"
                  value-format="yyyy-MM-dd"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申请人公司名称"
                label-width="110px"
                prop="projectParticipantOrgName"
              >
                <el-input
                  v-model="queryParams.projectParticipantOrgName"
                  placeholder="请输入申请人公司名称"
                  clearable
                  size="small"
                  style="width: 80%"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请权限" prop="visitType">
                <el-select
                  style="width: 80%"
                  clearable
                  size="small"
                  v-model="queryParams.visitType"
                  placeholder="请选择申请权限"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="item in sys_apply_auth"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </div>
    <div class="intention-list">
      <el-tabs v-model="queryParams.status" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in sys_audit_status"
          :key="item.dictValue"
          :label="item.dictLabel"
          :name="item.dictValue"
        >
          <span slot="label">{{ item.dictLabel }}</span>
        </el-tab-pane>
      </el-tabs>
      <ty-table
        v-if="columns"
        :columns="columns"
        :data="tableData"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
        :pager="page"
        :showSelect="false"
        :showIndex="false"
        :border="false"
      >
        <template #operation="{ row }">
          <el-button v-if="showApprove(row)" size="mini" type="text" @click="handleOpen(row, 0)"
            >审核</el-button
          >
          <el-button
            v-if="queryParams.status != 3"
            size="mini"
            type="text"
            @click="handleOpen(row, 1)"
            >修改权限</el-button
          >
        </template>
      </ty-table>
    </div>

    <!-- 审核/修改权限弹窗 -->
    <el-dialog :visible.sync="auditVisible" :title="auditTitle" width="500px" v-if="auditVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="审核: " prop="status" v-if="!auditType">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="2">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申请权限: " prop="visitType" v-else>
          <el-radio-group v-model="form.visitType">
            <el-radio
              v-for="item in sys_apply_auth"
              :key="+item.dictValue"
              :label="+item.dictValue"
            >
              {{ item.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="btn-continer">
        <el-button type="primary" size="mini" @click="handleSave">确定</el-button>
        <el-button type="default" size="mini" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pageMixins from '@/mixins/page.js'
import { getWorkList, toAudit, editAuth } from '@/api/cooperation/workMessage.js'
import { deepClone } from '@/utils/tool'
import getColumns from './jsonData.js'

export default {
  mixins: [pageMixins],
  data() {
    return {
      tableData: [],
      columns: null,
      sys_audit_status: [], // 审核状态
      sys_apply_auth: [], // 申请权限
      highShow: false, // 高级查询开关
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: '0' // tab切换的值
      },
      // 审核/修改权限弹窗
      auditVisible: false,
      auditTitle: '审核',
      form: {},
      auditType: 0,
      rules: {
        status: [{ required: true, message: '请选择审核意见', trigger: 'change' }],
        visitType: [{ required: true, message: '请选择修改权限意见', trigger: 'change' }]
      }
    }
  },
  async created() {
    await this.getList()
    await this.getDicts('sys_apply_auth').then((res) => {
      this.sys_apply_auth = res.data
    })
    await this.getDicts('sys_audit_status').then((res) => {
      this.sys_audit_status = res.data
    })
    this.columns = await getColumns()
  },
  computed: {
    showApprove() {
      return function (row) {
        if (this.queryParams.status == 3) {
          return false
        }
        return row.status == 0
      }
    }
  },
  methods: {
    // 获取列表数据
    getList() {
      getWorkList(this.queryParams).then((res) => {
        this.tableData = res.data.records
        this.page.total = res.data.total
      })
    },
    // 打开审核/修改权限弹窗
    handleOpen(row, num) {
      this.auditVisible = true
      this.auditType = num
      this.form = deepClone(row)
      this.auditTitle = num ? '修改权限' : '审核'
    },
    // 关闭审核/修改权限弹窗
    handleClose() {
      this.auditVisible = false
    },
    // 审核/修改权限 保存
    handleSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // auditType 0-审核 1-修改权限
          if (!this.auditType) {
            let params = {
              projectMissionRelParticipantId: this.form.projectMissionRelParticipantId, // 任务-协同联系人关系标识id
              status: this.form.status, // 1-同意 2-不同意
              visitType: this.form.visitType // 访问类型，1-可查看，2-可编辑
            }
            toAudit(params).then(() => {
              this.$message({
                type: 'success',
                message: '提交审核成功'
              })
              this.getList()
              this.handleClose()
            })
          }
          if (this.auditType) {
            let params = {
              projectMissionRelParticipantId: this.form.projectMissionRelParticipantId, // 任务-协同联系人关系标识id
              visitType: this.form.visitType // 访问类型，1-可查看，2-可编辑
            }
            editAuth(params).then(() => {
              this.$message({
                type: 'success',
                message: '修改权限成功'
              })
              this.getList()
              this.handleClose()
            })
          }
        }
      })
    },
    // 选择时间
    handleChangeDate(e) {
      if (e) {
        let [beginTime, endTime] = e
        this.queryParams.beginTime = beginTime
        this.queryParams.endTime = endTime
      } else {
        this.queryParams.beginTime = ''
        this.queryParams.endTime = ''
      }
    },
    // 切换tabs
    handleClick(tab) {
      this.queryParams.pageNum = 1
      this.queryParams.status = tab.name
      this.getList()
    },
    // 重置
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        status: this.queryParams.status
      }
      this.highShow = false
      this.handleQuery()
    }
  }
}
</script>

<style scoped lang="scss">
#workMessage {
  .intention-list {
    padding: 10px;
    background: #fff;
    margin-top: 20px;
  }
  .high-search-crud ::v-deep {
    .searchBox-high-operator-bar {
      display: none;
    }
  }
  .serachModule {
    background: #fff;
    padding-top: 20px;
    padding-bottom: 12px;
  }
  ::v-deep {
    .el-form-item {
      margin-bottom: 11px;
    }
    .el-tabs__nav-wrap::after {
      height: 0px;
    }
  }
  ::v-deep {
    .el-date-editor .el-range-separator {
      padding: 0;
    }
  }
  .btn-continer {
    text-align: end;
  }
}
</style>
