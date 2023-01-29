<template>
  <div id="coopereEvalue">
    <ty-business-crud
      v-if="columns"
      :id="'id'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['missionName', 'requireCompletionUnit', 'evaluateScore']"
      :showIndex="false"
      :showSelect="false"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="listCrud"
    >
      <template #search>
        <search-box-form-date
          v-show="highShow"
          label-text="要求落地完成时间"
          @change="setParams({ ...$event })"
        />
      </template>
      <!-- <template #btnsBar>
        <div class="btns-bar">
          <el-button type="primary" size="small" @click="handleEvalue(0)">评价</el-button>
        </div>
      </template> -->
      <template #rowOperator="{ row }">
        <div>
          <el-button size="mini" type="text" @click="handleDetail(row)">详情</el-button>
          <el-button size="mini" type="text" @click="handleEvalue(1, row)">评价</el-button>
        </div>
      </template>
    </ty-business-crud>

    <!-- 评价弹窗 -->
    <el-dialog :visible.sync="evalueVisible" title="评价" v-if="evalueVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="满意度: " prop="evaluateScore">
          <el-select v-model="form.evaluateScore" placeholder="请选择满意度" clearable size="mini">
            <el-option
              v-for="item in sys_satisfy_level"
              :key="+item.dictValue"
              :label="item.dictLabel"
              :value="+item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合作评价: " prop="content">
          <el-input
            type="textarea"
            v-model="form.content"
            maxlength="200"
            show-word-limit
            :rows="5"
            placeholder="请输入合作评价"
          ></el-input>
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
import { getUnitList, toEvalue } from '@/api/cooperation/coopereEvalue.js'
import { deepClone } from '@/utils/tool'
import getColumns from './jsonData.js'
import SearchBoxFormDate from '@/components/SearchBoxFormDate'

export default {
  components: {
    SearchBoxFormDate
  },
  data() {
    return {
      columns: null,
      getListInterface: {
        url: '/system/projectMission/completeProjectMissionList',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun
      },
      highShow: false,
      selectRows: [],
      // 评价弹窗
      evalueVisible: false,
      form: {},
      rules: {
        evaluateScore: [{ required: true, message: '请选择满意度', trigger: 'change' }],
        content: [{ required: true, message: '请输入合作评价', trigger: 'blur' }]
      },
      sys_satisfy_level: [] // 满意度列表
    }
  },
  async created() {
    await this.getDicts('sys_satisfy_level').then((res) => {
      this.sys_satisfy_level = res.data
    })
    let unitList = await this.getUnitList()
    this.columns = await getColumns(unitList)
  },
  methods: {
    // 获取实施单位列表
    getUnitList() {
      return new Promise((resolve) => {
        getUnitList().then((res) => {
          let arr = res.data.map((item) => {
            return { value: item, label: item }
          })
          resolve(arr)
        })
      })
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.highShow = val
    },
    setParams(data) {
      const { params } = this.getListInterface
      this.$set(this.getListInterface, 'params', {
        ...params,
        ...data
      })
    },
    // 重置查询
    resetSearchFun() {
      this.getListInterface.params = {}
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection
    },
    // 详情
    handleDetail(row) {
      this.$router.push({
        path: '/coopereEvalue/detail',
        query: {
          isdisabled: 1,
          projectMissionId: row.projectMissionId
        }
      })
    },
    // 打开评价弹窗
    handleEvalue(num, row) {
      // num 0-批量评价 1-单个评价
      this.evalueVisible = true
      this.form = deepClone(row)
    },
    // 关闭评价弹窗
    handleClose() {
      this.evalueVisible = false
    },
    // 评价 保存
    handleSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.form,
            objId: this.form.projectMissionId // 合作事项标识
          }
          toEvalue(params).then((res) => {
            this.$message({
              type: 'success',
              message: '评价成功'
            })
            this.handleReload()
            this.handleClose()
          })
        }
      })
    },
    // 刷新页面
    handleReload() {
      this.$refs.listCrud.setCheckList([])
      this.$refs.listCrud._getListData()
    }
  }
}
</script>

<style scoped lang="scss">
#coopereEvalue {
  .high-search-crud ::v-deep {
    .searchBox-high-operator-bar {
      display: none;
    }
  }
  .btn-continer {
    text-align: end;
  }
  ::v-deep .searchBox-wrapper {
    margin-bottom: 20px;
  }
}
</style>
