<template>
  <el-dialog class="ve-dialog" :visible.sync="dialogVisible" @close="closeCallback" :title="title">
    <ty-table
      :columns="columns"
      :data="tableData"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
      :pager="page"
      :showSelect="false"
      :showIndex="false"
    >
      <!-- slot-scope="{ data }" -->
      <template slot="download"> 下载 </template>
    </ty-table>
    <div class="btn-continer" v-if="!disabled">
      <el-button type="primary" @click="close">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'

import getColumns from './jsonData'

let defaultForm = {
  objName: null,
  name: null,
  schoolCoursewareTypeId: null,
  objId: null,
  content: undefined,
  files: []
}

export default {
  components: {},

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // getOrgList: {
    //   type: String,
    //   default: ''
    // },
    title: {
      type: String,
      default: '反馈情况'
    },
    content: {
      type: Object,
      default() {
        return {
          action: undefined,
          data: {}
        }
      }
    }
  },

  computed: {
    disabled() {
      // return this.isExamine
      return false
    }
  },

  watch: {
    dialogVisible(value) {
      //         let actionType = this.content.action;

      //         if(value) {
      //           switch (actionType) {
      //             case action.added:
      // //              this.form = {
      // //                "objName": "1",
      // //                "name": "1",
      // //                "type": "2",
      // //                "objId": "1",
      // //                "content": "1",
      // //                "files": "1",
      // //                "phone": "1"
      // //              };

      //               break;
      //             case action.examine:

      //             case action.modify:
      //               this.getDetail();
      //           }
      //         }

      this.$emit('update:visible', value)
    },
    visible(value) {
      this.dialogVisible = value
    }
  },

  data() {
    return {
      dialogVisible: this.visible,
      tableData: [],
      columns: [],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      this.columns = await getColumns()
    },
    getList() {
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      }

      // getOrgList(sendData).then((res) => {
      //   this.tableData = res.data.records
      //   this.page.total = res.data.total
      // })
    },
    pageSizeChange(val) {
      this.page.limit = val
      this.getList()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val
      this.getList()
    },
    closeCallback() {
      // this.resetData();
    },
    resetData() {
      // this.form = deepClone(defaultForm);
      // this.$nextTick(() => {
      //   this.$nextTick(() => {
      //     this.$refs.veForm.clear();
      //   });
      // });
    },
    close() {
      this.dialogVisible = false
    },
    open() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ve-dialog {
  .dialog-form {
    margin-right: 20px;
  }
}
.btn-continer {
  text-align: end;
}
</style>
