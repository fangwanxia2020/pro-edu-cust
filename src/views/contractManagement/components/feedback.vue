<template>
  <div>
    <el-dialog :visible.sync="dialogVisible1" title="填写反馈" @closed="close">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="合同编号：" prop="contractNo">
          <span>{{ form.contractNo }}</span>
        </el-form-item>
        <el-form-item label="合同名称：" prop="contractName">
          <span>{{ form.contractName }}</span>
        </el-form-item>
        <el-form-item label="反馈意见：" prop="content">
          <el-input
            type="textarea"
            maxlength="300"
            v-model="form.content"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="相关附件：" prop="name">
          <el-upload
            :on-exceed="exceed"
            :headers="config"
            class="upload-demo"
            ref="upload"
            method="post"
            :action="url"
            :file-list="fileList"
            v-model="fileVal"
            :auto-upload="false"
            :on-success="success"
            :limit="1"
          >
            <el-button size="small" slot="trigger">选择文件</el-button>
            <el-button size="small" type="primary" @click="submitUpload" style="margin-left: 10px"
              >开始上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              支持文件格式：.jpg .rar .zip .doc .docx .pdf
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click="confirm" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { contractFeedback } from '@/api/contractManagement/index'

export default {
  props: {
    row: {
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible1: false,
      fileVal: [],
      fileList: [],
      url: `${process.env.VUE_APP_BASE_API}/file/file/upload`,
      form: {
        contractNo: '',
        contractName: '',
        contractMainId: '',
        content: '',
        fileId: ''
      },
      rules: {
        content: [{ required: true, message: '请填写反馈内容', trigger: 'blur' }]
      }
    }
  },
  computed: {
    config() {
      return {
        Authorization: this.$store.state.user.token
      }
    }
  },
  watch: {
    row(newVal, oldVal) {
      console.log('newVal', newVal)
      this.form.contractNo = newVal.contractNo
      this.form.contractName = newVal.contractName
      this.form.contractMainId = newVal.id
    },
    dialogVisible(newVal, oldVal) {
      this.dialogVisible1 = newVal
    }
  },
  methods: {
    confirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          contractFeedback(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success('反馈成功')
              this.close()
            }
          })
        }
      })
    },
    close() {
      this.$emit('close')
      this.form.content = ''
    },
    submitUpload() {
      console.log('fileList', this.fileList)
      this.$refs.upload.submit()
    },
    success(res) {
      console.log('fileVal,fileVal', this.fileVal, this.fileVal, res)
      if (res.code === 200) {
        this.form.fileId = res.data.fileId
      }
      this.$message.success('上传成功')
    },
    beforeFileUpload(file) {
      // console.log("file1", file)
      // console.log("file2", file.raw)
      if (
        file.raw.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.raw.type !== 'application/vnd.ms-excel'
      ) {
        this.msgError('请上传xls或者xlsx格式文件')
      }
    },
    exceed() {
      this.msgError('只能上传一个文件')
    }
  }
}
</script>
