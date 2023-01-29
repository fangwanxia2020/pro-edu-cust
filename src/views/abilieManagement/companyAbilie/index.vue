<template>
  <div id="companyAbilie">
    <div class="serachModule">
      <el-form :model="queryParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="能力名称" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入能力名称"
                clearable
                size="small"
                style="width: 80%"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分类" prop="type">
              <el-select
                style="width: 80%"
                clearable
                size="small"
                v-model="queryParams.type"
                placeholder="请选择分类"
                @keyup.enter.native="handleQuery"
              >
                <el-option
                  v-for="item in sys_abilie_type"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="40px">
              <el-button type="primary" size="small" @click="handleQueryClick">搜索</el-button>
              <el-button size="small" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btns-bar">
      <el-button type="primary" size="small" @click="handleJump(ADD)">创建能力</el-button>
      <el-button type="danger" size="small" :disabled="!selectRows.length" @click="handleDel(0)">
        删除
      </el-button>
    </div>
    <div class="intention-list">
      <ty-table
        v-if="columns"
        id="enterpriseCompetenceId"
        :columns="columns"
        :data="tableData"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
        :pager="page"
        :showSelect="true"
        :showIndex="false"
        :border="false"
        :checkList.sync="selectRows"
      >
        <template #operation="{ row }">
          <!-- 0-待认证，1-认证中，2-认证通过，3-认证不通过 -->
          <el-button
            v-if="
              row.certificationStatus == 0 ||
              row.certificationStatus == 1 ||
              row.certificationStatus == 2 ||
              row.certificationStatus == 3
            "
            size="mini"
            type="text"
            @click="handleJump(DETAIL, row)"
            >详情</el-button
          >
          <el-button
            v-if="row.certificationStatus == 0 || row.certificationStatus == 3"
            size="mini"
            type="text"
            @click="handleJump(EDIT, row)"
            >编辑</el-button
          >
          <el-button
            v-if="
              (row.certificationStatus == 0 ||
                row.certificationStatus == 2 ||
                row.certificationStatus == 3) &&
              row.publishStatus == 0
            "
            size="mini"
            type="text"
            @click="handleDel(1, row)"
            >删除</el-button
          >
          <el-button
            v-if="row.certificationStatus == 0 || row.certificationStatus == 3"
            size="mini"
            type="text"
            @click="handleApprove(row)"
            >提交认证</el-button
          >
          <el-button
            v-if="row.certificationStatus == 2 && row.publishStatus == 0"
            size="mini"
            type="text"
            @click="handlePublish(1, row)"
          >
            发布
          </el-button>
          <el-button
            v-if="row.certificationStatus == 2 && row.publishStatus == 1"
            size="mini"
            type="text"
            @click="handlePublish(0, row)"
          >
            取消发布
          </el-button>
        </template>
      </ty-table>
    </div>

    <el-dialog :visible.sync="whyVisible" title="为什么要添加能力？">
      <ul>
        <li>能力可以让系统根据企业的提供的能力不断优化推荐合适的合作客户</li>
        <li>
          最重要的，企业发布需求的时候，你的企业能力和对方的需求相同，会在推荐列表中用突出展示，帮助企业在茫茫商海中一眼就发现对的对方
        </li>
      </ul>
      <div class="btn-continer">
        <el-button type="default" size="mini" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="addVisible" width="500px" title="创建能力" v-if="addVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="能力分类: " prop="value1">
          <el-select
            style="width: 100%"
            clearable
            size="small"
            v-model="form.value1"
            placeholder="请选择能力分类"
          >
            <el-option
              v-for="item in sys_abilie_type"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能力目录: " prop="value2">
          <el-cascader
            ref="cascader"
            style="width: 100%"
            size="small"
            placeholder="请选择能力目录"
            v-model="form.value2"
            :props="indProps"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div class="btn-continer">
        <el-button type="primary" size="mini" @click="handleNext">下一步</el-button>
        <el-button type="default" size="mini" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pageMixins from '@/mixins/page.js'
import {
  getAbilieList,
  delAbilie,
  getTemplateList,
  editAbilie,
  getJsonByTemplateId,
  sceneDetail
} from '@/api/abilieManagement/companyAbilie.js'
import { ADD, EDIT, DETAIL } from '@/constants'
import { MENU_TYPE } from '@/utils/dict-enum'
import getColumns from './jsonData.js'

let templateList = []
export default {
  mixins: [pageMixins],
  data() {
    return {
      ADD,
      EDIT,
      DETAIL,
      tableData: [],
      columns: null,
      sys_abilie_type: [], // 能力分类
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 审核/修改权限弹窗
      whyVisible: false,
      selectRows: [],
      // 创建能力弹窗
      addVisible: false,
      form: {},
      rules: {
        value1: [{ required: true, message: '请选择能力分类', trigger: 'change' }],
        value2: [{ required: true, message: '请选择能力目录', trigger: 'change' }]
      },
      indProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          setTimeout(() => {
            if (node.level == 0) {
              getTemplateList({ parentId: 0, type: MENU_TYPE.COMPANY }).then((res) => {
                templateList = [...templateList, ...res.data.records]
                const arr = res.data.records.map((item) => {
                  return {
                    value: item.enterpriseTypeTemplateId,
                    label: item.name,
                    leaf: !item.hasSon // hasSon是否有子级 true=有 false=没有
                  }
                })
                resolve(arr)
              })
            }
            if (node.data) {
              getTemplateList({ parentId: node.data.value, type: MENU_TYPE.COMPANY }).then(
                (res) => {
                  templateList = [...templateList, ...res.data.records]
                  const arr = res.data.records.map((item) => {
                    return {
                      value: item.enterpriseTypeTemplateId,
                      label: item.name,
                      leaf: !item.hasSon // hasSon是否有子级 true=有 false=没有
                    }
                  })
                  resolve(arr)
                }
              )
            }
          }, 500)
        }
      }
    }
  },
  async created() {
    // 在进入系统时首次打开“单位能力”菜单才弹出弹窗，其他时候不弹；
    let enterNum = sessionStorage.getItem('enterNum')
    if (enterNum == 1) this.whyVisible = true
    sessionStorage.setItem('enterNum', ++enterNum)

    await this.getDicts('sys_abilie_type').then((res) => {
      this.sys_abilie_type = res.data
    })
    await this.getList()
    this.columns = await getColumns()
  },
  methods: {
    // 获取列表数据
    getList() {
      getAbilieList(this.queryParams).then((res) => {
        this.tableData = res.data.records
        this.page.total = res.data.total
      })
    },
    // 关闭弹窗
    handleClose() {
      this.whyVisible = false
      this.addVisible = false
    },
    // 创建能力/编辑/详情
    async handleJump(path, row) {
      if (path === ADD) {
        this.form = {}
        this.addVisible = true
      } else {
        const templateInfo = await sceneDetail(row.enterpriseTypeTemplateId)
        if (templateInfo.code === 200) {
          let templateId = await this.$store.dispatch('template/getTemplateId', {
            templateIds: templateInfo.data.templateIds,
            type: path
          })
          this.$router.push({
            path: `/companyAbilie/${path}/${templateId}`,
            query: {
              enterpriseCompetenceId: row.enterpriseCompetenceId
            }
          })
        }
      }
    },
    // 下一步
    handleNext() {
      console.log(this.form.value2)
      console.log(this.form.value2[this.form.value2.length - 1])
      // templateIds
      // return
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let enterpriseTypeTemplateId = this.form.value2[this.form.value2.length - 1]

          // getJsonByTemplateId(enterpriseTypeTemplateId).then(async (res) => {
          // if (!res.data) {
          //   this.$message({
          //     type: 'warning',
          //     message: '该能力尚未开放认证'
          //   })
          // } else {
          let selectObj = {}
          for (let i = 0; i < templateList.length; i++) {
            let item = templateList[i]
            if (item.enterpriseTypeTemplateId === enterpriseTypeTemplateId) {
              selectObj = item
            }
          }
          console.log('selectObj')
          console.log(selectObj)
          if (selectObj.templateIds && selectObj.templateIds.length) {
            let templateId = await this.$store.dispatch('template/getTemplateId', {
              templateIds: selectObj.templateIds,
              type: ADD
            })
            const { enterpriseId } = this.$store.getters.userInfo
            this.$router.push({
              path: `/companyAbilie/${ADD}/${templateId}`,
              query: {
                enterpriseTypeTemplateId,
                type: this.form.value1,
                enterpriseId
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: '该能力尚未开放认证'
            })
          }
          // })
        }
      })
    },
    // 删除
    handleDel(num, row) {
      // 0-批量 1-单个
      this.handleConfirm(num ? '永久删除该文件' : '永久删除这些文件').then(() => {
        let params
        if (num) {
          params = row.enterpriseCompetenceId
        } else {
          params = this.selectRows.map((item) => item.enterpriseCompetenceId)
        }
        delAbilie(params).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
    // 提交认证
    handleApprove(row) {
      this.handleConfirm('提交认证').then(() => {
        let params = {
          enterpriseCompetenceId: row.enterpriseCompetenceId, // 单位能力id
          certificationStatus: 1 // 平台认证状态：0-待认证，1-认证中，2-认证通过，3-认证不通过
        }
        editAbilie(params).then(() => {
          this.$message({
            type: 'success',
            message: '提交认证成功'
          })
          this.getList()
        })
      })
    },
    // 发布/取消发布
    handlePublish(num, row) {
      // 0-取消发布 1-发布
      this.handleConfirm(num ? '发布' : '取消发布').then(() => {
        let params = {
          enterpriseCompetenceId: row.enterpriseCompetenceId, // 单位能力id
          publishStatus: num // 发布状态：0-未发布，1-已发布
        }
        editAbilie(params).then(() => {
          this.$message({
            type: 'success',
            message: `${num ? '发布' : '取消发布'}成功`
          })
          this.getList()
        })
      })
    },
    handleConfirm(tips) {
      return new Promise((resolve, reject) => {
        this.$confirm(`此操作将${tips}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10
      }
      this.handleQuery()
    }
  }
}
</script>

<style scoped lang="scss">
#companyAbilie {
  .intention-list {
    padding: 10px;
    background: #fff;
    margin-top: 20px;
  }
  .serachModule {
    background: #fff;
    padding-top: 20px;
    padding-bottom: 12px;
  }
  ::v-deep .el-dialog {
    .el-dialog__body ul {
      margin: 0;
      li {
        line-height: 1.5;
      }
    }
  }
  .btns-bar {
    margin-top: 20px;
  }
  .btn-continer {
    text-align: end;
  }
}
</style>
