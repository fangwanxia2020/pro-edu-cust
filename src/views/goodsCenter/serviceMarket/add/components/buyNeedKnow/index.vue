<template>
  <div>
    <div class="add-btn">
      <el-button size="small" type="primary" @click="visibleTable = true" v-if="!isDetail"
        >添加</el-button
      >
    </div>
    <ty-table
      :columns="columns"
      :data="tableData"
      :pager="page"
      :showSelect="false"
      :showIndex="false"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
    >
      <template #operation="{ row, $index }">
        <el-button size="mini" type="text" @click="handleEven(EDIT, row, $index)" v-if="!isDetail"
          >修改</el-button
        >
        <el-button size="mini" type="text" @click="handleEven(DETAIL, row)">详情</el-button>
        <el-button size="mini" type="text" @click="handleDel(row)" v-if="!isDetail">删除</el-button>
        <el-button size="mini" type="text" v-if="!isDetail" @click="newTempalte(row)"
          >保存为新模板</el-button
        >
      </template>
    </ty-table>
    <div class="btn-continer" v-if="!isDetail">
      <el-button type="primary" @click="submit(1)">保存</el-button>
      <el-button type="primary" @click="preview">预览</el-button>
      <el-button type="primary" @click="submit(3)" v-if="isEnding">完成</el-button>
      <el-button type="primary" @click="submit(2)" v-else>保存并进行下一步</el-button>
    </div>
    <div class="btn-continer" v-else-if="isDetail">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <select-table :visible.sync="visibleTable" @getSelect="getSelect"></select-table>
    <text-template-detail
      :templateId.sync="templateId"
      :textTemplateInfo="textTemplateInfo"
      :visible.sync="visibleTemplate"
      :formType="formType"
      @submitTextTemplate="submitTextTemplate"
      :textIndex="textIndex"
    ></text-template-detail>
  </div>
</template>

<script>
import { EDIT, DETAIL } from '@/constants'
import { saveGoodsColumn, getGoodsColumn, addTextTemplate } from '@/api/goodsCenter/serviceMarket'
import { COLUMN_TYPE, SHOP_SHELVES_ID } from '@/utils/dict-enum'
import { reCheckGoods } from '@/views/goodsCenter/serviceMarket/goodsEvent'
import getColumns from './jsonData'
import selectTable from './selectTable'
import textTemplateDetail from './textTemplateDetail'

export default {
  components: { selectTable, textTemplateDetail },
  data() {
    return {
      EDIT,
      DETAIL,
      tableData: [], // 当前展示项列表
      columns: [],
      visibleTable: false,
      visibleTemplate: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0
      },
      templateId: null,
      formType: null,
      textIndex: 0,
      textTemplateInfo: {},
      allList: [] // 所有项列表
    }
  },
  computed: {
    isCust() {
      return (item) => {
        return item.columnType == COLUMN_TYPE.CUST
      }
    }
  },
  props: {
    goodsId: {
      type: [String, Number]
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    isEnding: {
      type: Boolean,
      default: false
    },
    needChangeStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    goodsId(newVal) {
      if (newVal) this.getGoodsColumnInfo()
    }
  },
  created() {
    this.init()
  },

  methods: {
    async init() {
      this.columns = await getColumns()
      if (this.goodsId) this.getGoodsColumnInfo()
    },
    getSelect(list) {
      if (this.allList.length == 0) {
        this.allList = list
      } else {
        list.forEach((item) => {
          let flag = this.allList.some((item1) => item1.textTemplateId === item.textTemplateId)
          if (!flag) this.allList.unshift(item)
        })
      }
      this.page.total = this.allList.length
      this.pageList()
    },
    pageList() {
      this.tableData = this.allList.filter((item, index) => {
        return (
          index < this.page.pageNo * this.page.limit &&
          index >= this.page.limit * (this.page.pageNo - 1)
        )
      })
    },
    handleDel(row) {
      let index = 0
      if (row.textTemplateId) {
        for (let i = 0; i < this.allList.length; i++) {
          if (row.textTemplateId == this.allList[i].textTemplateId) {
            index = i
            break
          }
        }
      } else if (row.goodsRelColumnId) {
        for (let i = 0; i < this.allList.length; i++) {
          if (row.goodsRelColumnId == this.allList[i].goodsRelColumnId) {
            index = i
            break
          }
        }
      }
      this.allList.splice(index, 1)
      this.page.total = this.allList.length
      this.pageList()
    },
    handleEven(type, row, index) {
      this.textIndex = index
      this.textTemplateInfo = row
      this.visibleTemplate = true
      this.formType = type
    },
    // 预览
    preview() {
      this.$emit('preview')
    },
    newTempalte(row) {
      this.$confirm('确认后，该栏目内容作为新的模板保存在我的文档模板里！', '是否保存为新模板？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { fileInfoList, columnName, columnNote } = row
        let obj = {
          columnName,
          columnNote,
          columnType: COLUMN_TYPE.CUST,
          shopShelvesId: SHOP_SHELVES_ID.TOB
        }
        if (fileInfoList) {
          obj.columnId = fileInfoList[0].fileId
        }
        addTextTemplate(obj).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        })
      })
    },
    // 获取栏目修改的内容
    submitTextTemplate({ data, index }) {
      const { columnName, columnNote, fileInfoList } = data
      this.tableData[index].columnName = columnName
      this.tableData[index].columnNote = columnNote
      this.tableData[index].fileInfoList = fileInfoList
    },
    // 获取商品的栏目详情
    getGoodsColumnInfo() {
      getGoodsColumn({
        goodsId: this.goodsId
      }).then((res) => {
        if (res.code === 200) {
          let list = res.data.goodsRelColumn.map((item) => {
            const {
              name: columnName,
              note: columnNote,
              goodsRelColumnFileVO,
              columnType,
              soundId,
              goodsRelColumnId
            } = item
            let fileInfoList = []
            if (goodsRelColumnFileVO) {
              fileInfoList.push(goodsRelColumnFileVO)
            }
            return {
              columnName,
              columnNote,
              fileInfoList,
              columnType,
              goodsRelColumnId,
              soundId
            }
          })
          this.allList = list
          this.page.total = this.allList.length
          this.pageList()
        }
      })
    },
    async submit(type) {
      if (this.allList.length > 0) {
        let textTemplateList = this.allList.map((item) => {
          const {
            columnName,
            columnNote,
            fileInfoList,
            columnType,
            textTemplateId,
            soundId,
            goodsRelColumnId
          } = item
          return {
            columnName,
            columnNote,
            columnId: fileInfoList ? fileInfoList[0].fileId : null,
            columnType,
            textTemplateId: soundId || textTemplateId,
            shopShelvesId: SHOP_SHELVES_ID.TOB,
            goodsRelColumnId
          }
        })
        if (this.needChangeStatus) {
          let saveFlag = await reCheckGoods(this)
          if (!saveFlag) {
            return
          }
        }
        saveGoodsColumn({
          goodsId: this.goodsId,
          textTemplateList
        }).then((res) => {
          if (res.code === 200) {
            if (type == 1 || type == 2) this.getGoodsColumnInfo()
            if (type == 1) {
              this.messageSuccess('保存成功')
            } else if (type == 2) {
              this.$emit('nextStep')
            } else if (type == 3) {
              this.$emit('finish')
            }
          }
        })
      } else if (type === 1 || type === 2) {
        this.$message.error('请先添加栏目再保存')
      } else if (type === 3) {
        this.$emit('finish')
      }
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.pageList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.pageList()
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  padding: 10px 0;
}
.btn-continer {
  text-align: center;
}
</style>
