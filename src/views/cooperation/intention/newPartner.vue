<template>
  <div
    :class="{
      'activity-management-list-edit': true,
      'create-page': true,
      'create-page--layout': !isAdd
    }"
  >
    <pc-form
      :class="['activity-info-form', Number(flag) === 1 ? 'detail' : '']"
      :data="formData"
      v-model="addData"
      :disabled="Number(flag) === 1"
      ref="supplierFrom"
    >
      <template slot="contartPeople">
        <!--- 编辑表  注意唯一键值要定义就是属性id --->
        <ty-edit-table
          class="edit-table"
          id="detailId"
          ref="editProdTable"
          :showIndex="true"
          :showSelect="false"
          :columns="editTable.columns"
          :data="editData.detailLists"
          :disabled="isView"
        />
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button size="small" @click="handleDelete">删除</el-button>
          </el-col>
        </el-row>
      </template>
    </pc-form>
    <div class="activity-sub">
      <el-button style="margin-left: 50px" type="primary" @click="submit" v-if="Number(flag) === 0"
        >提交</el-button
      >
      <el-button @click="goBackRouter('/cooperativePartner/supplierManage')">返回</el-button>
    </div>
  </div>
</template>
<script>
import { testPath } from '@/utils/tool'
// import {
//   supplierDetail,
//   addSupplier,
//   editSupplier
// }
// from "@/api/cooperativePartner/supplierManage"
// import addrLinkage from "@/components/addrLinkage.vue";
import { listUser } from '@/api/system/user'
import { getMoreFile } from '@/api/companyBasicInfo'
import { TyEditTable } from 'ty-pc'
import SelectDialogTableBtn from '@/components/selectDialogTableBtn'
import { partnerForm } from './partnerForm'

const principalColumn = [
  {
    key: 'personName',
    label: '人员姓名'
  },
  {
    key: 'postName',
    label: '岗位'
  },
  {
    key: 'workTypeName',
    label: '工种'
  },
  {
    key: 'mobilePhone',
    label: '联系电话'
  }
]
export default {
  components: {
    // SelectDialogTableBtn,
    TyEditTable
  },
  data() {
    return {
      listUser,
      principalColumn,
      formData: partnerForm(this.$route.query.flag || 0),
      addData: {},
      addrCodeId: [],
      flag: this.$route.query.flag ? this.$route.query.flag : 0,
      supplierId: this.$route.query.supplierId ? this.$route.query.supplierId : null,
      isAccommodate: false,
      pictureList: {},
      selectTechnologyManagerList: [],
      projectManagerParams: {
        mobilePhone: '',
        personName: '',
        pageNum: 1,
        pageSize: 10
      },
      isView: false,
      editData: {
        detailLists: []
      },
      // 可编辑表格
      editTable: {
        columns: [
          {
            prop: 'procedureName',
            label: '联系人名称',
            formFormat: {
              type: 'input',
              icon: 'icon-input',
              name: '生产工序名称',
              flag: 0,
              options: {
                clearable: false,
                showText: false,
                width: '100%',
                defaultValue: '',
                required: true,
                dataType: 'string',
                maxlength: '30',
                minlength: '',
                validator: '',
                pattern: '',
                patternTips: '',
                placeholder: '',
                disabled: false,
                hide: false,
                tipFont: '',
                mouseTips: '',
                borderRadius: 'no'
              },
              key: 1617950402000,
              model: 'procedureName',
              rules: [
                {
                  required: true,
                  message: '联系人名称不能为空'
                }
              ]
            }
          },
          {
            prop: 'procedureName',
            label: '手机号码',
            formFormat: {
              type: 'input',
              icon: 'icon-input',
              name: '生产工序名称',
              flag: 0,
              options: {
                clearable: false,
                showText: false,
                width: '100%',
                defaultValue: '',
                required: true,
                dataType: 'string',
                maxlength: '30',
                minlength: '',
                validator: '',
                pattern: '',
                patternTips: '',
                placeholder: '',
                disabled: false,
                hide: false,
                tipFont: '',
                mouseTips: '',
                borderRadius: 'no'
              },
              key: 1617950402000,
              model: 'procedureName',
              rules: [
                {
                  required: true,
                  message: '手机号码不能为空'
                }
              ]
            }
          },
          {
            prop: 'procedureName',
            label: '邮箱',
            formFormat: {
              type: 'input',
              icon: 'icon-input',
              name: '生产工序名称',
              flag: 0,
              options: {
                clearable: false,
                showText: false,
                width: '100%',
                defaultValue: '',
                required: true,
                dataType: 'string',
                maxlength: '30',
                minlength: '',
                validator: '',
                pattern: '',
                patternTips: '',
                placeholder: '',
                disabled: false,
                hide: false,
                tipFont: '',
                mouseTips: '',
                borderRadius: 'no'
              },
              key: 1617950402000,
              model: 'procedureName',
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空'
                }
              ]
            }
          },
          {
            prop: 'operation',
            label: '操作',
            width: 150,
            type: 'operation'
          }
        ]
      }
    }
  },
  created() {
    console.log('111')
    // this.init()
    if (this.$route.query.supplierId) {
      this.getSupplier()
    }
  },
  computed: {
    isAdd() {
      return testPath(/add/)
    }
  },
  watch: {},
  methods: {
    handleAdd() {},
    handleDelete() {},
    // async init() {
    //   this.jsonData = await supplierForm()
    // },
    // 提交
    submit() {
      this.$refs.supplierFrom.getData().then((res) => {
        // return
        // if (this.$route.query.supplierId) {
        //   // 编辑
        //   data.supplierId = this.$route.query.supplierId
        //   // editSupplier(data).then(() => {
        //   //   this.$message({
        //   //     type: "success",
        //   //     message: "编辑成功"
        //   //   })
        //   //   this.$router.go(-1)
        //   // })
        // } else {
        //   // 新增
        //   // addSupplier(data).then(() => {
        //   //   this.$message({
        //   //     type: "success",
        //   //     message: "新增成功"
        //   //   })
        //   //   this.$router.push('/cooperativePartner/supplierManage');
        //   // })
        // }
      })
    },
    // 供应商详情
    getSupplier() {
      // supplierDetail(this.supplierId).then(async res => {
      //   // console.log(res, 111)
      //   if (res.code === 200) {
      //     let {
      //       supplierType,
      //       name,
      //       code,
      //       slotRegion,
      //       region,
      //       address,
      //       briefing,
      //       supplierPictureVoList,
      //       contact,
      //       phone
      //     } = res.data;
      //     let qualification = [];
      //     let environment = [];
      //     let room = [];
      //     let emergency = [];
      //     if (supplierPictureVoList) {
      //       if (supplierPictureVoList.supplierQualification) { //企业资质
      //         let arr = supplierPictureVoList.supplierQualification.split(",");
      //         for (let item of arr) {
      //           let aa = await getMoreFile({
      //             fileIds: item
      //           })
      //           qualification = [...qualification, ...aa.data]
      //         }
      //       }
      //       if (supplierPictureVoList.supplierEnvironment) { //环境
      //         let arr = supplierPictureVoList.supplierEnvironment.split(",");
      //         for (let item of arr) {
      //           let aa = await getMoreFile({
      //             fileIds: item
      //           })
      //           environment = [...environment, ...aa.data]
      //         }
      //       }
      //       if (supplierPictureVoList.supplierRoom) { //房型
      //         let arr = supplierPictureVoList.supplierRoom.split(",");
      //         for (let item of arr) {
      //           let aa = await getMoreFile({
      //             fileIds: item
      //           })
      //           room = [...room, ...aa.data]
      //         }
      //       }
      //       if (supplierPictureVoList.supplierEmergency) { //应急疏散图
      //         let arr = supplierPictureVoList.supplierEmergency.split(",");
      //         for (let item of arr) {
      //           let aa = await getMoreFile({
      //             fileIds: item
      //           })
      //           emergency = [...emergency, ...aa.data]
      //         }
      //       }
      //     }
      //     let obj = {
      //       supplierType: supplierType + '',
      //       name,
      //       code,
      //       slotRegion,
      //       region,
      //       address,
      //       briefing,
      //       contact,
      //       phone,
      //       supplierQualification: qualification,
      //       supplierEnvironment: environment,
      //       supplierRoom: room,
      //       supplierEmergency: emergency
      //     }
      //     this.addData = {
      //       ...this.addData,
      //       ...obj
      //     }
      //     // console.log(this.addData)
      //   }
      // })
    }
  }
}
</script>
<style scoped lang="scss">
.activity-management-list-edit {
  &__tabs {
    margin-bottom: 40px;

    ::v-deep .el-tabs__content {
      padding: 20px 10px;
    }
  }

  &__btn-group {
    display: flex;
    justify-content: center;

    .el-button {
      & + .el-button {
        margin-left: 30px;
      }
    }
  }

  .activity-sub {
    text-align: center;
    margin-top: 50px;
  }
}
.detail {
  ::v-deep {
    .el-upload-add {
      display: none !important;
    }
  }
}
.mb8 {
  margin-top: 20px;
}
</style>
