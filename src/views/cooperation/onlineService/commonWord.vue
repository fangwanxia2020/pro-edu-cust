<!--
    常用语
    @author hjm
    @date 2020-08-06
    @since 1.0.0
-->
<template>
  <div>
    <div class="service-title">
      <div>常用语</div>
      <el-button plain type="primary" size="mini" @click="addPhrase()"> 新增常用语 </el-button>
    </div>
    <div class="service">
      <div class="service-content service-left">
        <div class="service-add-sort">
          <el-button type="text" @click="addKfPhraseCategory()"> 新增分类 </el-button>
        </div>
        <div class="service-card">
          <div
            :class="[
              'service-sort-item',
              categoryItem.categoryId == selectCategoryId ? 'service-sort-select' : ''
            ]"
            v-for="(categoryItem, categoryIndex) in kfPhraseCategoryList"
            :key="categoryIndex"
          >
            <div class="service-sort-title" @click="selectCategory(categoryItem)">
              {{ categoryItem.categoryName }}
            </div>
            <div v-if="categoryIndex != 0">
              <i
                class="el-icon-edit service-sort-icon"
                @click="modifyKfPhraseCategory(categoryItem)"
              >
              </i>
              <i
                class="el-icon-delete service-sort-icon"
                @click="delKfPhraseCategory(categoryItem)"
              >
              </i>
            </div>
          </div>
        </div>
      </div>
      <div class="service-content service-main">
        <div
          v-for="(phraseItem, phraseIndex) in kfPhraseList"
          :key="phraseIndex"
          class="service-phrase"
        >
          <div class="service-phrase-con">
            <div class="service-phrase-detail">
              {{ phraseItem.replyContent }}
            </div>
          </div>
          <div class="service-phrase-icon">
            <i class="el-icon-edit service-sort-icon" @click="modifyPhrase(phraseItem)"> </i>
            <i
              class="el-icon-delete service-sort-icon"
              v-if="selectCategoryId != 'why'"
              @click="delPhrase(phraseItem)"
            >
            </i>
          </div>
        </div>
        <div v-if="kfPhraseList.length == 0" class="service-no">暂无数据</div>
        <el-pagination
          v-if="kfPhraseList.length > 0"
          class="service-pagination"
          @current-change="handleCurrentChange"
          small
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 分类表单 -->
    <ty-form-dialog :formDialog="categoryForm" ref="categoryForm"> </ty-form-dialog>
    <!-- 常用语表单 -->
    <ty-form-dialog :formDialog="phraseForm" ref="phraseForm"> </ty-form-dialog>
    <!-- 问候语表单 -->
    <ty-form-dialog :detailsFlag="false" :formDialog="greetingsForm" ref="greetingsForm">
    </ty-form-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orgId: '',
      phraseType: 'common_language',
      typeName: '常用语',
      kfPhraseCategoryList: [], // 分类列表
      categoryId: '', // 选中分类，用于操作
      selectCategoryId: 'why', // 选中分类，用于右边列表
      categoryForm: {
        title: '新增分类', // 对话框标题
        visible: false, // 对话框是否可见
        width: '450', // 对话框宽度
        formId: '740961819451068416',
        labelWidth: '80', // 表单域标签的宽度
        data: [],
        btns: [
          {
            text: '确定',
            emit: (e) => {
              this.sureKfPhraseCategory(e)
            },
            type: 'submit'
          },
          {
            text: '取消',
            emit: (e) => {
              this.categoryForm.visible = false
            }
          }
        ]
      },
      phraseForm: {
        title: '新增常用语', // 对话框标题
        visible: false, // 对话框是否可见
        width: '500', // 对话框宽度
        formId: '741308107199746048',
        labelWidth: '60', // 表单域标签的宽度
        data: [],
        btns: [
          {
            text: '确定',
            emit: (e) => {
              this.surePhrase(e)
            },
            type: 'submit'
          },
          {
            text: '取消',
            emit: (e) => {
              this.phraseForm.visible = false
            }
          }
        ]
      },
      greetingsForm: {
        title: '修改常用语', // 对话框标题
        visible: false, // 对话框是否可见
        width: '500', // 对话框宽度
        formId: '743792397976211456',
        labelWidth: '60', // 表单域标签的宽度
        data: [],
        btns: [
          {
            text: '确定',
            emit: (e) => {
              this.sureGreetings(e)
            },
            type: 'submit'
          },
          {
            text: '取消',
            emit: (e) => {
              this.greetingsForm.visible = false
            }
          }
        ]
      },
      greetings: {}, // 问候语内容
      kfPhraseList: [], // 常用语列表
      kfPhraseId: '', // 选中的常用语
      total: 0,
      pageNo: 1
    }
  },
  created() {
    // 商户orgId
    this.orgId = window.sessionStorage.getItem('orgId')
    this.findAll()
    this.getGreetingsByName()
  },
  watch: {
    selectCategoryId: {
      handler(newValue) {
        if (newValue != 'why') {
          this.getKfPhraseList()
        } else {
          this.getGreetingsByName()
        }
      },
      deep: true
    }
  },
  methods: {
    // 查询类型列表 第一条默认为问候语
    findAll() {
      this.api.findAll(
        {
          orgId: this.orgId,
          phraseType: this.phraseType
        },
        (res) => {
          this.kfPhraseCategoryList = [
            {
              categoryName: '问候语',
              categoryId: 'why'
            }
          ].concat(res)
          // this.selectCategoryId = this.kfPhraseCategoryList[0].categoryId;
        }
      )
    },
    // 新增分类
    addKfPhraseCategory() {
      this.categoryForm.visible = true
      this.$refs.categoryForm.reset()
      this.categoryId = ''
    },
    // 修改分类
    modifyKfPhraseCategory(e) {
      this.$refs.categoryForm.reset()
      this.categoryId = e.categoryId
      let obj = {
        categoryName: e.categoryName
      }
      this.$refs.categoryForm.echoData(obj)
      this.categoryForm.title = '修改分类'
      this.categoryForm.visible = true
    },
    // 确定分类
    sureKfPhraseCategory(e) {
      // 新增
      if (this.categoryId == '') {
        let obj = { ...e, orgId: this.orgId, phraseType: this.phraseType, typeName: this.typeName }
        this.api.addKfPhraseCategory(obj, (res) => {
          this.messageSuccess('新增分类成功！')
          this.categoryForm.visible = false
          this.findAll()
          if (this.$refs.phraseForm.$refs.tyForm) this.$refs.phraseForm.$refs.tyForm.getFormInfo()
        })
      } else {
        let obj = { ...e, orgId: this.orgId, categoryId: this.categoryId }
        this.api.modifyKfPhraseCategory(obj, (res) => {
          this.messageSuccess('修改分类成功！')
          this.categoryForm.visible = false
          this.findAll()
          if (this.$refs.phraseForm.$refs.tyForm) this.$refs.phraseForm.$refs.tyForm.getFormInfo()
        })
      }
    },
    // 删除分类
    delKfPhraseCategory(e) {
      this.confirm('删除分类会连同分类下的问题一同删除，确定要删除吗？', () => {
        this.api.deleteKfPhraseCategory(
          {
            id: e.categoryId
          },
          () => {
            this.messageSuccess('删除分类成功！')
            this.findAll()
            if (this.$refs.phraseForm.$refs.tyForm) this.$refs.phraseForm.$refs.tyForm.getFormInfo()
          }
        )
      })
    },
    // 新增常用语需要的分类
    getFindAll() {
      return {
        orgId: this.orgId,
        phraseType: this.phraseType
      }
    },
    // 新增常用语
    addPhrase() {
      this.kfPhraseId = ''
      this.phraseForm.visible = true
      this.$refs.phraseForm.reset()
    },
    // 修改常用语
    modifyPhrase(e) {
      if (this.selectCategoryId != 'why') {
        this.kfPhraseId = e.kfPhraseId
        this.$refs.phraseForm.reset()
        let obj = {
          categoryId: e.categoryId,
          // 有坑，直接取第一个
          // 2020/8/14 数据结构改了，不用取第一个了，，，，又在做无用功
          replyContent: e.replyContent,
          titleName: e.titleName
        }
        this.$refs.phraseForm.echoData(obj)
        this.phraseForm.title = '修改常用语'
        this.phraseForm.visible = true
      } else {
        let obj = {
          categoryId: '问候语',
          replyContent: e.replyContent
        }
        this.$refs.greetingsForm.echoData(obj)
        this.greetingsForm.visible = true
      }
    },
    // 确定常用语
    surePhrase(e) {
      if (this.kfPhraseId == '') {
        let obj = { ...e, orgId: this.orgId, phraseType: this.phraseType }
        this.api.addKfPhrase(obj, () => {
          this.messageSuccess('新增常用语成功！')
          this.phraseForm.visible = false
          this.getKfPhraseList()
        })
      } else {
        let obj = { ...e, kfPhraseId: this.kfPhraseId }
        this.api.modifyKfPhrase(obj, () => {
          this.messageSuccess('修改常用语成功！')
          this.phraseForm.visible = false
          this.getKfPhraseList()
        })
      }
    },
    // 根据类型id查询知识内容列表
    getKfPhraseList() {
      this.api.getKfPhraseList(
        {
          categoryId: this.selectCategoryId,
          orgId: this.orgId,
          pageNo: this.pageNo,
          pageSize: 10,
          phraseType: this.phraseType
        },
        (res) => {
          this.kfPhraseList = res.list
          this.total = res.pagingVO.totalCount
        },
        false
      )
    },
    // 点击分类
    selectCategory(e) {
      this.pageNo = 1
      this.selectCategoryId = e.categoryId
    },
    // 分类
    handleCurrentChange(e) {
      this.pageNo = e
      this.getKfPhraseList()
    },
    // 删除常用语
    delPhrase(e) {
      this.confirm('确定要删除常用语吗？', () => {
        this.api.deleteKfPhrase(
          {
            id: e.kfPhraseId
          },
          () => {
            let num = (this.total - 1) % 10
            if (num == 0) {
              --this.pageNo
              if (this.pageNo <= 0) {
                this.pageNo = 1
              }
            }
            this.messageSuccess('删除常用语成功！')
            this.getKfPhraseList()
          }
        )
      })
    },
    // 标签 取数组第一个有坑
    matterTag(item, code, name, key) {
      if (item.kfPhraseInfoInfoVOS[0][key] == 1) {
        this.api.addMatterTag(
          {
            matterTagCode: code,
            matterTagName: name,
            objId: item.kfPhraseInfoInfoVOS[0].kfPhraseInfoId
          },
          () => {},
          false
        )
      } else {
        this.api.deleteMatterTag(
          {
            id: item.kfPhraseInfoInfoVOS[0].matterTagId
          },
          () => {},
          false
        )
      }
    },
    // 获取问候语
    getGreetingsByName() {
      this.api.getGreetingsByName(
        {
          categoryName: '问候语',
          phraseType: 'common_language',
          orgId: this.orgId
        },
        (res) => {
          this.kfPhraseList = [res]
          this.total = 1
          this.greetings = res
        }
      )
    },
    // 确定修改问候语
    sureGreetings(e) {
      let obj = {
        ...this.greetings,
        replyContent: e.replyContent,
        orgId: this.orgId,
        categoryName: '问候语'
      }
      this.api.addOrUptGreetingById(obj, (res) => {
        this.messageSuccess('修改常用语成功！')
        this.getGreetingsByName()
        this.greetingsForm.visible = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
.service {
  color: #243247;
  font-size: 14px;
  @include df;
  &-title {
    margin-bottom: 10px;
    @include faj(center, space-between);
  }
  &-left {
    border: 1px solid #dcdfe6;
    width: 214px;
    margin-right: 10px;
    position: relative;
    @include border-radius(4px);
  }
  &-main {
    border: 1px solid #dcdfe6;
    margin-right: 10px;
    @include flex;
    @include border-radius(4px);
  }
  &-add-sort,
  &-sort-item {
    padding: 4px;
    border-bottom: 1px solid #dcdfe6;
  }
  &-sort-item {
    padding: 8px 4px;
    @include faj(center, space-between);
  }
  &-sort-title,
  &-sort-icon {
    cursor: pointer;
  }
  &-sort-select {
    background: #e7edf7;
  }
  &-phrase {
    padding: 10px 4px;
    border-bottom: 1px solid #dcdfe6;
    @include faj(center, space-between);
  }
  &-phrase-img {
    margin-right: 4px;
    @include wh(20px);
  }
  &-phrase-con {
    @include flex;
  }
  &-phrase-icon {
    margin-right: 6px;
    width: 52px;
    text-align: right;
    font-size: 16px;
  }
  &-phrase-info {
    @include faj(center, space-between);
  }
  &-phrase-title {
    font-weight: bold;
    @include faj(center, flex-start);
  }
  &-phrase-detail {
    font-size: 12px;
    color: #5b5858;
    @include ellipsis(1);
  }
  &-pagination {
    text-align: right;
  }
  &-no {
    margin: 20px;
    text-align: center;
  }
}
.service-card {
  height: 420px;
  overflow-y: scroll;
}
.el-checkbox {
  margin-right: 10px;
}
.el-checkbox__label {
  font-size: 12px;
}
</style>
