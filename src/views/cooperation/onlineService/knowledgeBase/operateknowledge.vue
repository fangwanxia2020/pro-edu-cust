<!--
    知识库

    @author hjm
    @date 2020-08-06
    @since 1.0.0
-->
<template>
  <div class="knowledge">
    <el-form size="small" :model="phraseForm" ref="phraseForm" label-width="60px" :rules="rules">
      <el-form-item label="分类" prop="categoryId">
        <el-select v-model="phraseForm.categoryId" placeholder="请选择">
          <el-option
            v-for="(item, index) in kfPhraseCategoryList"
            :key="index"
            :label="item.categoryName"
            :value="item.categoryId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="titleName">
        <el-input v-model="phraseForm.titleName"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox
          v-for="(item, index) in phraseForm.matterTagAddData"
          :key="index"
          v-model="item.commonMatter"
          :true-label="1"
          :false-label="0"
        >
          {{ item.matterTagName }}
        </el-checkbox>
      </el-form-item>
      <el-form-item label="内容" prop="replyContent">
        <ty-editor v-model="phraseForm.replyContent" :height="300"></ty-editor>
      </el-form-item>
      <div class="form-btn-con">
        <el-button type="primary" @click="surePhrase('phraseForm')"> 保存 </el-button>
        <el-button @click="goknowledgeBase()"> 返回 </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orgId: '',
      phraseType: 'knowledge_base',
      typeName: '知识库',
      kfPhraseCategoryList: [], // 分类列表
      phraseForm: {
        categoryId: '',
        titleName: '',
        replyContent: '',
        matterTagAddData: [
          {
            matterTagCode: 'common_matter',
            matterTagName: '常见问题'
          },
          {
            matterTagCode: 'hot_matter',
            matterTagName: '热门问题'
          }
        ]
      },
      rules: {
        categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
        titleName: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        replyContent: [{ required: true, message: '请输入内容', trigger: 'change' }]
      },
      kfPhraseId: '',
      kfPhraseInfoId: ''
    }
  },
  created() {
    // 商户orgId
    this.orgId = window.sessionStorage.getItem('orgId')
    this.findAll()
    this.kfPhraseInfoId = this.$route.query.kfPhraseInfoId
    this.kfPhraseId = this.$route.query.kfPhraseId
    // 编辑
    if (this.kfPhraseInfoId != undefined) {
      this.getKfPhraseInfo()
    }
  },
  watch: {},
  methods: {
    // 查询类型列表
    findAll() {
      this.api.findAll(
        {
          orgId: this.orgId,
          phraseType: this.phraseType
        },
        (res) => {
          this.kfPhraseCategoryList = res
          if (res.length > 0) this.selectCategoryId = res[0].categoryId
        }
      )
    },
    // 获取知识库详细信息
    getKfPhraseInfo() {
      this.api.getKfPhraseInfoInfo(
        {
          id: this.kfPhraseInfoId
        },
        (res) => {
          let obj = this.local.get('knowledgeBase')
          let matterTagAddData = []
          let flag = true
          for (let i of this.phraseForm.matterTagAddData) {
            flag = true
            for (let j of obj.matterTagAddData) {
              if (i.matterTagCode == j.matterTagCode) {
                flag = false
                break
              }
            }
            if (flag) matterTagAddData.push(i)
          }
          this.phraseForm = {
            categoryId: obj.categoryId,
            titleName: obj.titleName,
            matterTagAddData: matterTagAddData.concat(obj.matterTagAddData),
            replyContent: res.replyContent
          }
        }
      )
    },
    // 确定知识库
    surePhrase(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          let [matterTagAddData, obj] = [[], {}]
          for (let i of this.phraseForm.matterTagAddData) {
            if (i.commonMatter == 1) {
              matterTagAddData.push({
                matterTagCode: i.matterTagCode,
                matterTagName: i.matterTagName
              })
            }
          }
          obj = {
            ...this.phraseForm,
            matterTagAddData,
            orgId: this.orgId,
            phraseType: this.phraseType,
            typeName: this.typeName
          }
          if (this.kfPhraseInfoId == undefined) {
            // obj.matterTagAddData = matterTagAddData
            this.api.addKfPhrase(obj, () => {
              this.messageSuccess('新增知识库成功！')
              this.goknowledgeBase()
            })
          } else {
            obj.kfPhraseInfoId = this.kfPhraseInfoId
            obj.kfPhraseId = this.kfPhraseId
            this.api.modifyKfPhrase(obj, () => {
              this.messageSuccess('修改知识库成功！')
              this.goknowledgeBase()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 返回
    goknowledgeBase() {
      let obj = this.local.get('knowledgeBase')
      this.navigater(
        `./knowledgeBase?selectCategoryId=${obj.selectCategoryId}&pageNo=${obj.pageNo}`
      )
    }
  }
}
</script>
<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
