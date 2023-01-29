<template>
  <el-dialog title="选择栏目" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
    <ty-business-crud
      v-if="columns"
      id="textTemplateId"
      ref="tyBusinessCrud"
      :getListInterface="{ url: '/goods/textTemplate/list', methodType: 'get', params }"
      :columns="columns"
      :showSearchFields="['columnName']"
      :showOperation="[]"
      :showSelect="true"
      title=""
      @checkedChange="handleSelectionChange"
    >
    </ty-business-crud>
    <div class="btn-continer">
      <el-button type="primary" @click="submitSelect">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { SHOP_SHELVES_ID } from '@/utils/dict-enum'
import getColumns from './jsonData'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      columns: null,
      selectRows: [],
      params: {
        shopShelvesId: SHOP_SHELVES_ID.TOB
      }
    }
  },
  watch: {
    visible(newVal) {
      const { orgId } = this.$store.getters.userInfo
      this.params.orgId = orgId
      this.dialogVisible = newVal
      this.selectRows = []
      if (newVal) this.$refs.tyBusinessCrud.resetSearch()
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    closeDialog() {
      this.dialogVisible = false
      this.$emit('update:visible', false)
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection
    },
    submitSelect() {
      this.$emit('getSelect', this.selectRows)
      this.closeDialog()
    }
  }
}
</script>

<style scoped lang="scss">
.btn-continer {
  text-align: center;
}
</style>
