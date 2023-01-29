<template>
  <div>
    <el-form class="hse-form" ref="queryForm" label-width="100px" inline :model="queryParams">
      <el-form-item label="表名称" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入表名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="表描述" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          placeholder="请输入表描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="primary" size="small" @click="handleQuery">搜索</el-button>
        <el-button size="small" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="searchBox-high-operator-bar">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" size="small" @click="handleGenTable">生成</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="info" size="small" @click="openImportTable">导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" size="small" :disabled="single" @click="handleEditTable"
            >修改</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" size="small" :disabled="multiple" @click="handleDelete"
            >删除</el-button
          >
        </el-col>
      </el-row>
    </div>
    <ty-table
      id="tableId"
      ref="table"
      show-select
      :border="false"
      :columns="columns"
      :data="tableList"
      :pager="page"
      :checkList.sync="tableselectionRows"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
    >
      <template v-slot:operation="scope">
        <el-button type="text" size="small" @click="handlePreview(scope.row)">预览</el-button>
        <el-button type="text" size="small" @click="handleEditTable(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        <el-button type="text" size="small" @click="handleGenTable(scope.row)">生成代码</el-button>
      </template>
    </ty-table>
    <!-- 预览界面 -->
    <el-dialog
      :title="preview.title"
      :visible.sync="preview.open"
      width="80%"
      top="5vh"
      append-to-body
    >
      <el-tabs v-model="preview.activeName">
        <el-tab-pane
          v-for="(value, key) in preview.data"
          :label="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
          :name="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
          :key="key"
        >
          <pre>{{ value }}</pre>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <import-table ref="import" @ok="handleQuery" />
  </div>
</template>
<script>
import { listTable, previewTable, delTable } from '@/api/tool/gen'
import { downLoadZip } from '@/utils/zipdownload'
import { getToken } from 'ty-pc/lib/utils/auth'
import importTable from './importTable'

export default {
  name: 'Gen',
  components: {
    importTable
  },
  data() {
    return {
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4
      },
      serverOptions: [],
      tableselectionRows: [],
      columns: [
        {
          prop: 'tableName',
          label: '表名称'
        },
        {
          prop: 'tableComment',
          label: '表描述'
        },
        {
          prop: 'className',
          label: '实体'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          type: 'datetime',
          width: '180'
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          type: 'datetime',
          width: '180'
        },
        {
          prop: 'operation',
          label: '操作',
          width: '280',
          type: 'operation'
        }
      ],
      // 遮罩层
      loading: true,
      // 唯一标识符
      uniqueId: '',
      // 选中数组
      ids: [],
      // 选中表数组
      tableNames: [],
      tableIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 表数据
      tableList: [],
      // 日期范围
      dateRange: '',
      // 查询参数
      queryParams: {
        tableName: undefined,
        tableComment: undefined
      },
      // 预览参数
      preview: {
        open: false,
        title: '代码预览',
        data: {},
        activeName: 'domain.java'
      }
    }
  },
  watch: {
    tableselectionRows(val) {
      this.handleSelectionChange(val)
    }
  },
  created() {
    this.getList()
  },
  activated() {
    const time = this.$route.query.t
    if (time != null && time != this.uniqueId) {
      this.uniqueId = time
      this.resetQuery()
    }
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.page.pageNo = 1
      this.getList()
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.getList()
    },
    /** 查询表集合 */
    getList() {
      this.loading = true
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      }
      listTable(this.addDateRange(sendData, this.dateRange)).then((response) => {
        this.tableList = response.rows
        this.page.total = response.total
        this.loading = false
      })
    },
    /** 生成代码操作 */
    handleGenTable(row) {
      const tableIds = row.tableId || this.tableIds
      if (tableIds == '') {
        this.msgError('请选择要生成的数据')
        return
      }
      downLoadZip(
        `${this.baseUrl}/basic/tool/gen/batchGenCode?tables=${tableIds}`,
        getToken(),
        'tianyuan'
      )
    },
    /** 打开导入表弹窗 */
    openImportTable() {
      this.$refs.import.show()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 预览按钮 */
    handlePreview(row) {
      previewTable(row.tableId).then((response) => {
        this.preview.data = response.data
        this.preview.open = true
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.tableId)
      this.tableNames = selection.map((item) => item.tableName)
      this.tableIds = selection.map((item) => item.tableId)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleEditTable(row) {
      const tableId = row.tableId || this.ids[0]
      this.$router.push({
        path: '/gen/edit',
        query: {
          tableId
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const tableIds = row.tableId || this.ids
      this.$confirm(`是否确认删除表编号为"${tableIds}"的数据项?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          return delTable(tableIds)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function () {})
    }
  }
}
</script>

<style lang="scss" scoped>
.ty-table,
.hse-form {
  background-color: #fff;
}
.hse-form {
  padding-top: 20px;
}
</style>
