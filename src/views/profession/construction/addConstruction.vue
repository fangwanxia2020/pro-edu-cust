<template>
  <div class="contain">
    <div class="title">
      <h4>专业共建信息</h4>
    </div>
    <el-form :model="form" label-position="top" ref="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作模式: " prop="cooperationModel">
            <div>
              <el-select
                v-model="form.cooperationModel"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in list"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
              <div class="cooperation-detail" v-if="note">
                <span>{{ note }}</span>
              </div>
            </div>
          </el-form-item>
          <!-- <el-form-item label="需求类型: " prop="type">
            <div>
              <el-select v-model="form.type" clearable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in list2"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item> -->
          <el-form-item label="专业名称: " prop="themeName">
            <el-input style="width: 100%" v-model="form.themeName"> </el-input>
          </el-form-item>
          <el-form-item label="发起方能提供的资源: " prop="resourceDescription">
            <el-checkbox-group v-model="checkbox" @change="handleCheck">
              <el-checkbox
                v-for="(item, index) in resource"
                :label="resoureArr[index]"
                :key="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              style="width: 100%"
              v-model="form.resourceDescription.resourcesContent"
            >
            </el-input>

            <div class="cooperation-detail" v-if="true">
              <span class="more">（设置正确的标签能更好的为企业推荐业务！）</span>
              <div>企业资质标签</div>
              <div>
                <el-checkbox-group v-model="tagArr" @change="handleTagId" size="small">
                  <el-checkbox-button
                    v-for="item in this.tapGroups[0]"
                    :label="item.tagId"
                    :key="item.tagId"
                    >{{ item.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
              <div>企业服务能力标签</div>
              <div>
                <el-checkbox-group v-model="tagArr" @change="handleTagId" size="small">
                  <el-checkbox-button
                    v-for="item in this.tapGroups1[0]"
                    :label="item.tagId"
                    :key="item.tagId"
                    >{{ item.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="合作地区: " prop="area">
            <el-input style="width: 100%" v-model="form.area"> </el-input>
          </el-form-item>
          <el-form-item label="专业共建的目标和愿景: " prop="target">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              style="width: 100%"
              v-model="form.target"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="comboStatus" label="是否接受联合体共建">
            <el-radio-group v-model="form.comboStatus" @change="radioChange">
              <el-radio :label="0">接受</el-radio>
              <el-radio :label="1">不接受</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="要求合作方提供的资源: " prop="partnerSource">
            <el-checkbox-group v-model="checkbox2" @change="handleCheck2">
              <el-checkbox
                v-for="(item, index) in resource"
                :label="resoureArr[index]"
                :key="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              style="width: 100%"
              v-model="form.partnerSource.resourcesContent"
            >
            </el-input>
            <div class="cooperation-detail" v-if="true">
              <span class="more">（设置正确的标签能更好的为企业推荐业务！）</span>
              <div>企业资质标签</div>
              <div>
                <el-checkbox-group v-model="tagArr1" @change="handleTagId1" size="small">
                  <el-checkbox-button
                    v-for="item in this.tapGroups[0]"
                    :label="item.tagId"
                    :key="item.tagId"
                    >{{ item.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
              <div>企业服务能力标签</div>
              <div>
                <el-checkbox-group v-model="tagArr1" @change="handleTagId1" size="small">
                  <el-checkbox-button
                    v-for="item in this.tapGroups1[0]"
                    :label="item.tagId"
                    :key="item.tagId"
                    >{{ item.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="合作方需具备的条件: " prop="partnerCertification">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              style="width: 100%"
              v-model="form.partnerCertification"
            >
            </el-input>
            <div class="cooperation-detail" v-if="true">
              <span class="more">（设置正确的标签能更好的为企业推荐业务！）</span>
              <div>企业基础标签</div>
              <div>
                <el-checkbox-group v-model="tagArr1" @change="handleTagId1" size="small">
                  <el-checkbox-button
                    v-for="item in this.tapGroups2[0]"
                    :label="item.tagId"
                    :key="item.tagId"
                    >{{ item.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="resourceNote" label="发起方简介:">
            <ty-editor
              v-model="form.resourceNote"
              :height="300"
              action="/file/file/upload"
              resFormat="data"
            ></ty-editor>
          </el-form-item>
          <el-form-item label="发起方荣誉证书" prop="fileUrl">
            <ty-upload
              v-model="fileList"
              action="/file/file/upload/img"
              :width="100"
              :height="100"
              :length="20"
              :multiple="false"
              resFormat="data"
            >
              <i class="el-icon-plus"></i>
            </ty-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sumbit('form')">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import {
  addPeCooperationDemand,
  editPeCooperationDemand,
  getPeCooperationDemandDetails,
  editTagValue,
  getTagsDetails
} from '@/api/profession/construction.js'
import { deepClone } from '../../tool/build/utils'

export default {
  data() {
    return {
      fileList: [],
      checkbox: [],
      checkbox2: [],
      resource: ['场地', '设备', '原料', '专业人员', '就业岗位', '内容'],
      resoureArr: ['space', 'equipment', 'material', 'personnel', 'position', 'content'],
      tapGroups: [],
      tapGroups1: [],
      tapGroups2: [],
      tagArr: [],
      tagArr1: [],
      list: [],
      list2: [],
      arrData: {},
      arrData2: {},
      visibleType: this.$route.query.visibleType,
      cooperationDemandId: Number(this.$route.query.cooperationDemandId),
      note: '',
      form: {
        type: null,
        cooperationModel: null,
        themeName: '',
        area: '',
        target: '',
        comboStatus: 0,
        partnerCertification: '',
        resourceNote: '',
        addFileList: [],
        resourceDescription: {
          resourcesContent: ''
        },
        partnerSource: {
          resourcesContent: ''
        },
        editTagValueDtoList: [
          {
            objId: null,
            objType: 0,
            tagId: []
          },
          {
            objId: null,
            objType: 2,
            tagId: []
          }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      otherForm: {},
      rules: {
        partnerSource: [{ required: true, message: '请输入提供资源', trigger: 'blur' }],
        cooperationModel: [{ required: true, message: '请选择合作模式', trigger: 'change' }],
        type: [{ required: true, message: '请选择需求类型', trigger: 'change' }],
        themeName: [{ required: true, message: '请输入专业名称', trigger: 'blur' }],
        resourceDescription: [{ required: true, message: '请输入资源描述', trigger: 'blur' }],
        area: [{ required: true, message: '请输入合作地区', trigger: 'blur' }],
        target: [{ required: true, message: '请输入专业共建的目标和愿景', trigger: 'blur' }],
        comboStatus: [{ required: true, message: '请至少选择一个', trigger: 'change' }],
        // resourcesContent: [{ required: true, message: '请输入资源要求', trigger: 'blur' }],
        partnerCertification: [{ required: true, message: '请输入资质要求', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.init()
  },
  watch: {
    'form.cooperationModel': function (val) {
      if (val) {
        switch (val) {
          case '1':
            this.note = this.list[0].remark
            break
          case '2':
            this.note = this.list[1].remark
            break
          case '3':
            this.note = this.list[2].remark
            break
          case '4':
            this.note = this.list[3].remark
            break
          default:
            this.note = ''
        }
      } else {
        this.note = ''
      }
    }
  },
  computed: {},
  methods: {
    async init() {
      if (this.visibleType == 'edit') {
        // 共建信息回显接口
        getPeCooperationDemandDetails(this.cooperationDemandId).then((res) => {
          Object.entries(res.data).forEach((item) => {
            if (item[0] in this.form) {
              this.$set(this.form, item[0], item[1])
            }
          })
          this.otherForm = deepClone(this.form)
          // 图片回显
          res.data.fileVoList.forEach((e) => {
            this.fileList.push({
              url: e.fileUrl
            })
          })
          // 资源回显
          let rsc = JSON.parse(res.data.resourceDescription).resourcesContent
          let rscObj = {
            resourcesContent: rsc
          }
          let pts = JSON.parse(res.data.partnerSource).resourcesContent
          let ptsObj = {
            resourcesContent: pts
          }
          this.$set(this.form, 'resourceDescription', { ...rscObj })
          this.$set(this.form, 'partnerSource', { ...ptsObj })
          switch (res.data.cooperationModel) {
            case 1:
              this.form.cooperationModel = '学校引进企业模式'
              break
            case 2:
              this.form.cooperationModel = '劳动和教学相结合、工学交替'
              break
            case 3:
              this.form.cooperationModel = '校企互动式模式'
              break
            case 4:
              this.form.cooperationModel = '订单式合作'
              break
          }
          switch (res.data.type) {
            case 1:
              this.form.type = '求购'
              break
            case 2:
              this.form.type = '售卖'
              break
          }
          // 多选框回显
          Object.entries(res.data.resourceDescriptionDto).forEach((item) => {
            if (item[1] == true) {
              this.checkbox.push(item[0])
            }
          })
          Object.entries(res.data.partnerSourceDto).forEach((item) => {
            if (item[1] == true) {
              this.checkbox2.push(item[0])
            }
          })
        })
      }
      // 标签回显接口
      getTagsDetails({
        objId: this.visibleType == 'edit' ? this.cooperationDemandId : null,
        objType: 2
      }).then((res) => {
        this.arrData = { ...res.data }
        this.tapGroups.push(res.data[1])
        this.tapGroups1.push(res.data[2])
        this.tapGroups2.push(res.data[0])
        this.tagsEcho()
      })
      getTagsDetails({
        objId: this.visibleType == 'edit' ? this.cooperationDemandId : null,
        objType: 0
      }).then((res) => {
        this.arrData2 = { ...res.data }
        this.tagsEcho2()
      })
      const { sys_cooperation_model: res, sys_type: type } = await getDictMultiple([
        'sys_cooperation_model',
        'sys_type'
      ])
      res.forEach((e) => {
        e.value = e.dictValue
        e.label = e.dictLabel
      })
      this.list = [...res]
      this.list2 = [...type]
    },
    cancel() {
      this.$router.push({
        path: '/construction'
      })
    },
    // 标签回显
    tagsEcho() {
      for (var i = 0; i <= 2; i++) {
        for (var j = 0; j < this.arrData[i].length; j++) {
          if (this.arrData[i][j].rel == 1) {
            this.tagArr1.push(this.arrData[i][j].tagId)
          }
        }
      }
    },
    tagsEcho2() {
      for (var i = 0; i <= 2; i++) {
        for (var j = 0; j < this.arrData2[i].length; j++) {
          if (this.arrData2[i][j].rel == 1) {
            this.tagArr.push(this.arrData2[i][j].tagId)
          }
        }
      }
    },
    handleTagId(val) {
      this.tagArr = val
    },
    handleTagId1(val) {
      this.tagArr1 = val
    },
    radioChange(val) {
      console.log(val)
    },
    handleCheck(val) {
      this.checkbox = val
    },
    handleCheck2(val) {
      this.checkbox2 = val
    },
    sumbit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.visibleType == 'add') {
            if (this.checkbox.length == 0) {
              return this.$message.error('发起方能提供的资源不可为空')
            }
            if (this.checkbox2.length == 0) {
              return this.$message.error('要求合作方提供的资源不可为空')
            }
            let addForm = deepClone(this.form)
            this.checkbox.forEach((item) => {
              this.$set(addForm.resourceDescription, item, true)
            })
            this.checkbox2.forEach((item) => {
              this.$set(addForm.partnerSource, item, true)
            })
            for (var i = 0; i < this.fileList.length; i++) {
              addForm.addFileList[i] = {
                fileUrl: this.fileList[i].url
              }
            }
            addForm.editTagValueDtoList[0].tagId = this.tagArr
            addForm.editTagValueDtoList[1].tagId = this.tagArr1
            console.log(addForm, 'addForm')
            addPeCooperationDemand(addForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push({
                  path: '/construction'
                })
              }
            })
          }
          if (this.visibleType == 'edit') {
            if (this.checkbox.length == 0) {
              return this.$message.error('发起方能提供的资源不可为空')
            }
            if (this.checkbox2.length == 0) {
              return this.$message.error('要求合作方提供的资源不可为空')
            }
            let editForm = deepClone(this.form)
            this.checkbox.forEach((item) => {
              this.$set(editForm.resourceDescription, item, true)
            })
            this.checkbox2.forEach((item) => {
              this.$set(editForm.partnerSource, item, true)
            })
            this.$set(editForm, 'cooperationDemandId', this.$route.query.cooperationDemandId)
            for (var j = 0; j < this.fileList.length; j++) {
              editForm.addFileList[j] = {
                fileUrl: this.fileList[j].url
              }
            }
            editForm.cooperationModel = this.otherForm.cooperationModel
            editForm.type = this.otherForm.type
            editPeCooperationDemand(editForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push({
                  path: '/construction',
                  isVisible: 'owner'
                })
              }
            })
            let params = [
              {
                objId: this.cooperationDemandId,
                objType: 0,
                tagId: this.tagArr
              },
              {
                objId: this.cooperationDemandId,
                objType: 2,
                tagId: this.tagArr1
              }
            ]
            editTagValue(params).then((res) => {
              console.log(res)
            })
          }
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSuccess() {
      console.log(this.form.addFileList)
    }
  }
}
</script>

<style scoped lang="scss">
.title {
}
.contain {
  background-color: white;
  padding: 13px;
  padding-left: 50px;
}
.cooperation-detail {
  background: rgb(248, 246, 246);
  padding: 10px;
  width: 100%;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.more {
  color: #797979;
  font-size: 12px;
}
</style>
