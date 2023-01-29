<template>
  <!--设置等级 -->
  <el-dialog class="ve-dialog" :visible.sync="dialogVisible" @close="closeCallback" :title="title">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="单位名称">
        <div>{{ form.name }}</div>
      </el-form-item>
      <el-form-item label="等级" :rules="[{ required: true, message: '请选择等级' }]">
        <el-select v-model="form.partnerLevelId" placeholder="请选择等级">
          <el-option
            v-for="(item, index) in ListData"
            :key="index"
            :label="item.levelName"
            :value="item.partnerLevelId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn-continer" v-if="!disabled">
      <el-button size="small" type="primary" @click="submit">确定</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'

import { getOrgList, bindCustomerPartner } from '@/api/partnerManagement/partner'
import {
  getLevelList,
  editCustomerPartner,
  editSupplierPartner
} from '@/api/partnerManagement/level'
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
      default: '设置等级'
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
      customerId: null,
      contantVisible: false,
      dialogVisible: this.visible,
      type: null,
      ListData: [],
      form: {
        id: '',
        name: '',
        partnerLevelId: null
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      this.getList()
    },
    // type 1: 企业客户  2, 合作单位
    getData(partnerLevelId, id, name, type) {
      this.type = type
      this.form.id = id
      this.form.name = name
      this.form.partnerLevelId = partnerLevelId
      // getOrgList(relevanceOrgId).then((res) => {
      //   this.tableData = [res.data]
      //   console.log(this.tableData)
      // })
    },
    getList() {
      getLevelList().then((res) => {
        this.ListData = [...res.data.records]
      })
    },

    closeCallback() {
      this.form.id = ''
      this.form.name = ''
      this.form.partnerLevelId = null
      this.type = null
    },
    resetData() {},
    close() {
      this.dialogVisible = false
    },
    async submit() {
      if (!this.form.partnerLevelId) {
        this.$message.error('请选择等级')
        return
      }
      if (this.type == 1) {
        // 企业客户
        const res = await editCustomerPartner({
          customerId: this.form.id,
          partnerLevelId: this.form.partnerLevelId
        })
      } else {
        // 合作单位
        const res = await editSupplierPartner({
          supplierId: this.form.id,
          partnerLevelId: this.form.partnerLevelId
        })
      }

      this.$message.success('设置成功')
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
