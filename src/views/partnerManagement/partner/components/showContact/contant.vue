<template>
  <el-dialog :visible.sync="dialogVisible" @close="closeCallback" :title="title" append-to-body>
    <div class="btn-continer">
      <!-- :disabled="flag == 1" -->
      <pc-form :data="formData" v-model="addData" ref="mainFrom">
        <template slot="company">{{ customerName }}</template>
      </pc-form>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone, objectFilter } from '@/utils/tool'
import { addContacts, editContacts } from '@/api/partnerManagement/partner'
import { contantForm } from '../jsonData'

let defaultForm = {
  contactsName: null,
  position: null,
  qq: null,
  gender: null,
  contactsPhone: null,
  company: null
}

export default {
  components: {},

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增联系人'
    },
    customerId: {
      type: [Number, String],
      default: null
    },
    customerName: {
      type: String,
      default: ''
    },
    content: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    formData() {
      return contantForm()
      // return newFormData(this.isDetails);
    }
  },

  watch: {
    dialogVisible(value) {
      this.$emit('update:visible', value)
    },
    visible(value) {
      this.dialogVisible = value
    }
    // content: {
    //   handler(newValue) {
    //     console.log('newValue')
    //     console.log(newValue)
    //     this.addData = { ...newValue }
    //   },
    //   deep: true
    // }
  },

  data() {
    return {
      addData: {
        contactsName: '',
        position: '',
        qq: '',
        gender: '',
        contactsPhone: '',
        company: '',
        remark: ''
      },
      // addData: null,
      dialogVisible: this.visible,
      // formData: null,
      company: ''
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      // this.formData = await contantForm(this.addData)
      // console.log('this.formData')
      console.log(this.formData)
    },
    getDetail() {},
    setData(newValue) {
      this.addData = { ...newValue }
    },
    submit() {
      console.log('this.addData222')
      console.log(this.addData)
      console.log(this.customerId)
      let that = this
      // this.$refs.mainFrom.getData().then((res) => {
      //   res.customerId = that.customerId
      //   console.log(res)
      // })
      // return

      this.$refs.mainFrom.getData().then(async (res) => {
        res.customerId = that.customerId
        // this.addData.customerName = this.customerName
        console.log('res')
        console.log(res)
        if (res.customerContactsId) {
          // 编辑
          editContacts(res).then(() => {
            that.$message({
              type: 'success',
              message: '编辑成功'
            })
            that.$emit('reset')
            that.close()
          })
        } else {
          // 新增
          const resProject = await addContacts(res)
          that.$message({
            type: 'success',
            message: '新增成功'
          })
          that.$emit('reset')
          that.close()
        }
      })
    },
    getList() {
      // getOrgList(sendData).then((res) => {
      //   this.tableData = res.data.records
      //   this.page.total = res.data.total
      // })
    },
    closeCallback() {
      this.resetData()
    },
    resetData() {
      this.addData = {
        contactsName: '',
        position: '',
        qq: '',
        gender: undefined,
        contactsPhone: '',
        company: '',
        customerContactsId: null
      }
      this.$refs.mainFrom.reset()
      // this.$nextTick(() => {
      //   this.$nextTick(() => {
      //     this.$refs.veForm.clear();
      //   });
      // });
    },
    close() {
      this.resetData()
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
.btn-group {
  margin-bottom: 20px;
}
</style>
