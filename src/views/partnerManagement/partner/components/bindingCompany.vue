<template>
  <!-- 绑定已有的系统 -->
  <el-dialog class="ve-dialog" :visible.sync="dialogVisible" @close="closeCallback" :title="title">
    <ty-table
      :columns="columns"
      :data="tableData"
      :showSelect="false"
      :showIndex="false"
      :border="false"
      :hidePage="true"
    >
    </ty-table>
    <div class="btn-continer" v-if="!disabled">
      <el-button size="small" type="primary" @click="submit">确定</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'

import { getOrgList, bindCustomerPartner, getInfoByOrgId } from '@/api/partnerManagement/partner'
import { getCompanyColumns } from './jsonData'

export default {
  components: {},

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: '绑定系统已有的企业'
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
      this.$emit('update:visible', value)
    },
    visible(value) {
      this.dialogVisible = value
    }
  },

  data() {
    return {
      isSubmit: false, // 是否需要提交
      customerId: null,
      relevanceOrgId: null,
      contantVisible: false,
      dialogVisible: this.visible,
      tableData: [],
      columns: []
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      this.columns = await getCompanyColumns()
    },
    getList(relevanceOrgId, isSubmit, customerId) {
      this.isSubmit = isSubmit
      this.customerId = customerId
      this.relevanceOrgId = relevanceOrgId
      getInfoByOrgId(relevanceOrgId).then((res) => {
        this.tableData = [res.data]
        console.log(this.tableData)
      })
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
    async submit() {
      if (!this.isSubmit) {
        this.dialogVisible = false
        return
      }
      const res = await bindCustomerPartner({
        customerId: this.customerId,
        relevanceOrgId: this.relevanceOrgId
      })
      this.$message.success('绑定成功')
      this.$emit('resetList')
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
  margin-top: 20px;
  text-align: end;
}
.btn-group {
  margin-bottom: 20px;
}
</style>
