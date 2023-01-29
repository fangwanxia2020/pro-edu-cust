<!--
    知识库

    @author hjm
    @date 2020-08-06
    @since 1.0.0
-->
<template>
  <div>
    <div class="service-title">
      <div>知识库</div>
      <el-button plain type="primary" size="mini" @click="addPhrase()"> 新增知识库 </el-button>
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
            <div>
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
            <div class="service-phrase-info">
              <div class="service-phrase-title">
                <img class="service-phrase-img" src="../../../../assets/images/knowledge.png" />
                {{ phraseItem.titleName }}
              </div>
              <div>
                <el-checkbox
                  v-for="(item, index) in phraseItem.matterTagInfoVOS"
                  :key="index"
                  v-model="item.commonMatter"
                  :true-label="1"
                  :false-label="0"
                  @change="
                    matterTag(phraseItem, item.matterTagCode, item.matterTagName, 'commonMatter')
                  "
                >
                  {{ item.matterTagName }}
                </el-checkbox>
              </div>
            </div>
            <!-- <div class="service-phrase-detail"
                            v-html="phraseItem.replyContent">
                        </div> -->
          </div>
          <div class="service-phrase-icon">
            <i class="el-icon-edit service-sort-icon" @click="modifyPhrase(phraseItem)"> </i>
            <i class="el-icon-delete service-sort-icon" @click="delPhrase(phraseItem)"> </i>
          </div>
        </div>
        <div v-if="kfPhraseList.length == 0" class="service-no">暂无数据</div>
        <el-pagination
          v-if="kfPhraseList.length > 0"
          class="service-pagination"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          small
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 分类表单 -->
    <ty-form-dialog :formDialog="categoryForm" ref="categoryForm"> </ty-form-dialog>
    <!-- 知识库表单 -->
    <!-- <ty-form-dialog
            :formDialog="phraseForm"
            ref="phraseForm">
        </ty-form-dialog> -->
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
      categoryId: '', // 选中分类，用于操作
      selectCategoryId: '', // 选中分类，用于右边列表
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
      /* phraseForm: {
                    title: '新增知识库', //对话框标题
                    visible: false,  //对话框是否可见
                    width: '700',      //对话框宽度
                    formId: '740974695339397120',
                    labelWidth: '80',  //表单域标签的宽度
                    data: [],
                    btns: [{
                        text: '确定',
                        emit: (e) => {
                            this.surePhrase(e);
                        },
                        type: 'submit',
                    },{
                        text: '取消',
                        emit: (e) => {
                            this.phraseForm.visible = false;
                        },
                    }],
                }, */
      kfPhraseList: [], // 知识库列表
      kfPhraseId: '', // 选中的知识库
      total: 0,
      pageNo: 1
    }
  },
  created() {
    // 商户orgId
    this.orgId = window.sessionStorage.getItem('orgId')
    let selectCategoryId = this.$route.query.selectCategoryId
    let pageNo = this.$route.query.pageNo
    if (selectCategoryId) {
      this.pageNo = parseInt(pageNo)
      this.selectCategoryId = selectCategoryId
    }
    this.findAll()
  },
  watch: {
    selectCategoryId: {
      handler(newValue) {
        this.getKfPhraseList()
      },
      deep: true
    }
  },
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
          if (res.length > 0)
            this.selectCategoryId = this.selectCategoryId
              ? this.selectCategoryId
              : res[0].categoryId
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
          if (this.$refs.categoryForm.$refs.tyForm)
            this.$refs.categoryForm.$refs.tyForm.getFormInfo()
        })
      } else {
        let obj = { ...e, orgId: this.orgId, categoryId: this.categoryId }
        this.api.modifyKfPhraseCategory(obj, (res) => {
          this.messageSuccess('修改分类成功！')
          this.categoryForm.visible = false
          this.findAll()
          if (this.$refs.categoryForm.$refs.tyForm)
            this.$refs.categoryForm.$refs.tyForm.getFormInfo()
        })
      }
    },
    // 删除分类
    delKfPhraseCategory(e) {
      this.confirm('删除分类会连同分类下的问题一同删除，确定要删除吗', () => {
        this.api.deleteKfPhraseCategory(
          {
            id: e.categoryId
          },
          () => {
            this.messageSuccess('删除分类成功！')
            this.findAll()
            if (this.$refs.categoryForm.$refs.tyForm)
              this.$refs.categoryForm.$refs.tyForm.getFormInfo()
          }
        )
      })
    },
    // 新增知识库需要的分类
    getFindAll() {
      return {
        orgId: this.orgId,
        phraseType: this.phraseType
      }
    },
    // 新增知识库
    addPhrase() {
      /* this.kfPhraseId = '';
                this.phraseForm.visible = true; */
      let obj = {
        selectCategoryId: this.selectCategoryId,
        pageNo: this.pageNo
      }
      this.local.set('knowledgeBase', obj)
      this.navigater('./operateknowledge')
    },
    // 修改知识库
    modifyPhrase(e) {
      let obj = {
        categoryId: e.categoryId,
        matterTagAddData: this.type.arr(e.matterTagInfoVOS) ? e.matterTagInfoVOS : [],
        phraseType: e.phraseType,
        titleName: e.titleName,
        selectCategoryId: this.selectCategoryId,
        pageNo: this.pageNo
      }
      this.local.set('knowledgeBase', obj)
      this.navigater(
        `./operateknowledge?kfPhraseId=${e.kfPhraseId}&kfPhraseInfoId=${e.kfPhraseInfoId}`
      )
    },
    // 确定知识库
    surePhrase(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // return
      // if (this.kfPhraseId == '') {
      //   let obj = { ...e, orgId: this.orgId, phraseType: this.phraseType }
      //   this.api.addKfPhrase(obj, () => {
      //     this.messageSuccess('新增知识库成功！')
      //     this.phraseForm.visible = false
      //     this.getKfPhraseList()
      //   })
      // } else {
      //   let obj = { ...e, kfPhraseId: this.kfPhraseId }
      //   this.api.modifyKfPhrase(obj, () => {
      //     this.messageSuccess('修改知识库成功！')
      //     this.phraseForm.visible = false
      //     this.getKfPhraseList()
      //   })
      // }
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
          for (let i in res.list) {
            for (let j in res.list[i].matterTagInfoVOS) {
              res.list[i].matterTagInfoVOS[j].commonMatter = 1
            }
          }
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
    // 删除知识库
    delPhrase(e) {
      this.confirm('确定要删除知识库吗？', () => {
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
            this.messageSuccess('删除知识库成功！')
            this.getKfPhraseList()
          }
        )
      })
    },
    // 标签
    matterTag(item, code, name, key) {
      for (let i of item.matterTagInfoVOS) {
        if (i.matterTagCode == code) {
          if (i[key] == 1) {
            this.api.addMatterTag(
              {
                matterTagCode: code,
                matterTagName: name,
                objId: i.matterTagId
              },
              () => {},
              false
            )
          } else {
            this.api.deleteMatterTag(
              {
                id: i.matterTagId
              },
              () => {},
              false
            )
          }
          break
        }
      }
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
    padding: 8px 4px;
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
    margin: 6px 0 0 20px;
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
