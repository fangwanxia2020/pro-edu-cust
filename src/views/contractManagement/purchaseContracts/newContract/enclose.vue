<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button size="small" type="primary" @click="add">添加</el-button>
      <el-button size="small" type="danger" @click="remove">删除</el-button>
      <!-- @click="downfile" -->
      <!-- href="http://gateway-pei-dev.tianyuaninternet.com/apigateway/file/file/down/1586987028778717184" -->
      <el-button size="small" :disabled="!isSingle" type="primary" @click="downfile"
        ><a :href="url">下载</a>
      </el-button>
    </div>
    <ty-table
      :columns="columns"
      :data="tableData"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
      :pager="page"
      :showSelect="true"
      :showIndex="false"
      @selectionChange="selectionChange"
    >
      <!-- <template slot="download" slot-scope="{ data }"> 下载 </template> -->
    </ty-table>
    <el-dialog title="上传附件" @close="cancel" :visible.sync="dialogVisible" v-if="dialogVisible">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="action"
        :on-change="handleChange"
        :file-list="fileList"
        :data="list"
        :on-success="quillImgSuccess"
      >
        <el-button size="small">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">支持文件格式：.rar .zip .doc .docx .pdf</div>
      </el-upload>
      <div style="margin-top: 40px">
        <span>备注信息：</span>
        <el-input
          style="margin-top: 10px"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="desc"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addContract,
  attachList,
  removeByIds,
  down,
  getMore
} from '@/api/contractManagement/purchase.js'
import { getColumns } from './contractForm'

export default {
  components: {},
  props: {
    contractMainId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      isSingle: false,
      action: `${process.env.VUE_APP_BASE_API}/file/file/upload`,
      fileList: [],
      list: {},
      desc: '',
      url: null,
      selection: [],
      dialogVisible: false,
      tableData: [],
      columns: [],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0
      }
    }
  },
  created() {
    this.init()
    // this.getList()
  },
  mounted() {
    if (this.contractMainId) {
      this.getList()
    }
  },

  methods: {
    quillImgSuccess(res) {
      console.log('res,file', res)
      this.fileList.push(res.data)
    },
    async init() {
      this.columns = await getColumns()
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.getList()
    },
    add() {
      this.dialogVisible = true
    },
    downfile() {
      this.selection.forEach((item) => {
        console.log('this.baseUrl', this.baseUrl)
        this.url = `${this.baseUrl}/file/file/down/${item.fileId}`
        console.log(' this.url', this.url)
      })
    },
    remove() {
      let ids = []
      this.selection.forEach((item) => {
        ids.push(item.id)
      })

      ids = ids.toString()
      console.log('ids', ids)
      removeByIds(ids).then((res) => {
        if (res.code === 200) {
          this.getList()
          this.$message.success('添加成功')
        }
      })
    },
    selectionChange(e) {
      console.log(e)
      this.isSingle = false
      if (e.length === 1) {
        this.isSingle = true
      }
      this.selection = e
    },
    cancel() {
      this.dialogVisible = false
      this.fileList = []
      this.list = []
      this.desc = ''
      this.$refs.upload.clearFiles()
      console.log('fileList', this.list, this.fileList)
    },
    ok() {
      let obj = {}
      obj.contractMainId = ''
      obj.desc = this.desc
      obj.list = []
      if (this.$route.query.id) {
        obj.contractMainId = this.$route.query.id
      } else {
        obj.contractMainId = this.contractMainId
      }
      if (!obj.contractMainId) {
        this.$message('请先保存合同详情')
        return
      }
      this.fileList.forEach((item) => {
        let fileobj = {}
        fileobj.fileId = item.fileId
        fileobj.attachName = item.name
        obj.list.push(fileobj)
      })
      addContract(obj).then((res) => {
        if (res.code === 200) {
          this.cancel()
          this.getList()
          this.$message.success('添加成功')
        }
      })
    },
    handleChange() {},
    getList() {
      console.log(111111)
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        contractMainId: this.contractMainId
      }

      attachList(sendData).then((res) => {
        this.tableData = res.data.records
        this.page.total = res.data.total
      })
    }
  }
}
</script>

<style></style>
