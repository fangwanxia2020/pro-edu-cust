<template>
  <div
    :class="{
      'list-edit': true,
      'create-page': true
    }"
  >
    <pc-form
      :class="[flag == 1 ? 'detail' : '']"
      :data="formData"
      v-model="addData"
      :disabled="flag == 1"
      ref="supplierFrom"
    >
      <template slot="contractNo">
        <div>
          <el-input
            disabled
            style="width: 74%; margin-right: 10px"
            v-model="addData.contractNo"
          ></el-input>
          <el-button
            size="small"
            v-if="flag === 0"
            type="primary"
            @click="getContractNo"
            style="width: calc(26% - 10px)"
            >生成编号</el-button
          >
        </div>
      </template>
      <template slot="partyAAddress">
        <ty-select-area size="medium" v-model="addData.partyAAddress"></ty-select-area>
      </template>
      <template slot="partyACompany">
        <div>
          <el-input disabled v-model="addData.partyACompany"></el-input>
          <!-- <el-button
            size="small"
            type="primary"
            @click="pickCustomer"
            style="width: calc(26% - 10px)"
            v-if="flag === 0"
            >请选择</el-button
          > -->
        </div>
      </template>
      <template slot="list">
        <div class="list_box clearfix" v-for="(item, index) in CompanyList" :key="index">
          <el-checkbox v-model="item.radio" @change="radioChange(item)"></el-checkbox>
          <el-form ref="queryForm" :rules="rules" :disabled="flag === '1'">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="公司名称" prop="supplierName">
                  <el-input v-model="item.partyBCompany" size="medium"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item label="法定代表人">
                  <el-input size="medium" v-model="item.partyBLegelRepresentative"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item label="联系人">
                  <el-input v-model="item.partyBContact" size="medium"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系电话">
                  <el-input v-model="item.partyBPhone" size="medium"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form ref="queryForm" :disabled="flag === '1'">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="传真">
                  <el-input v-model="item.partyBFox" size="medium"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item label="电子邮件">
                  <el-input v-model="item.partyBEmail" size="medium"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item label="地址">
                  <ty-select-area size="medium" v-model="item.partyBAddress"></ty-select-area>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="详细地址">
                  <el-input size="medium" v-model="item.partyBAddressDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="switch_box" v-show="addData.connectStatus !== '否'">
            <span>设为联合体主办人</span>
            <el-switch
              :disabled="flag === '1'"
              active-color="#3176FB"
              @change="switchChange(item.supplierId)"
              v-model="item.status"
              inactive-color="#eee"
            >
            </el-switch>
          </div>
        </div>
        <el-button size="mini" type="primary" @click="add">添加</el-button>
        <el-button size="mini" @click="delet">删除</el-button>
      </template>
    </pc-form>
    <div class="sub-btn">
      <el-button
        style="margin-left: 50px"
        size="small"
        type="primary"
        @click="save"
        v-if="flag == 0"
        >保存</el-button
      >
      <!-- <el-button type="primary" @click="submit" v-if="flag == 0" size="small">提交</el-button> -->
      <el-button @click="goBackRouter('/cooperativePartner/supplierManage')" size="small"
        >返回</el-button
      >
    </div>

    <el-dialog
      title="选择企业客户"
      :visible.sync="dialogVisible"
      width="80%"
      @close="cancel"
      top="20px"
    >
      <el-form :model="projectManagerParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位类型" prop="templateId">
              <el-select
                style="width: 100%"
                size="small"
                v-model="projectManagerParams.templateId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in customerOptions"
                  :key="item.enterpriseTypeTemplateId"
                  :label="item.name"
                  :value="item.enterpriseTypeTemplateId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位名称" prop="customerName">
              <el-input
                v-model="projectManagerParams.customerName"
                placeholder="请输入单位名称"
                clearable
                size="small"
                @keydown.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系地址" prop="detailAddress">
              <el-input
                v-model="projectManagerParams.detailAddress"
                placeholder="请输入联系地址"
                clearable
                size="small"
                @keydown.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="20px">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="customerList" border style="width: 100%">
        <el-table-column label width="35">
          <template slot-scope="scope">
            <el-radio :label="scope.row.customerId" v-model="radioValue1" @change="radioChange1"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column prop="customerTypeName" label="单位类型"> </el-table-column>
        <el-table-column prop="customerName" label="单位名称"> </el-table-column>
        <el-table-column prop="addressName" label="省市区地址"> </el-table-column>
        <el-table-column prop="detailAddress" label="联系地址"> </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择合作单位"
      :visible.sync="supplierVisible"
      width="80%"
      @closed="cancel"
      top="20px"
    >
      <el-form :model="projectManagerParams" ref="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="supplierName">
              <el-input
                v-model="supplierParams.supplierName"
                placeholder="请输入企业名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="customerName">
              <el-input
                v-model="supplierParams.contacts"
                placeholder="请输入联系人"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="supplierParams.phone"
                placeholder="请输入联系电话"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="20px">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="addQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery2">重置</el-button>
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="addPartner"
                >新建</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <ty-table
        id="supplierId"
        :columns="supplierColumn"
        :data="supplierList"
        :pager="page2"
        :showSelect="true"
        @pageCurrentChange="pageCurrentChange2"
        @pageSizeChange="pageSizeChange2"
        @selectionChange="selectionChange2"
      ></ty-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="supplierOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  customerPartner,
  getCodeNo,
  supplierPartner,
  addCustomer,
  getCustomer,
  editCustomer,
  getInfo
} from '@/api/contractManagement/purchase'
import { enterpriseTypeTemplateList } from '@/api/applyOcupancy/process'
import { testPath, getDictMultiple, getParent, getOptions } from '@/utils/tool'

import { deepClone } from '@/views/tool/build/utils/index'
import { ADD } from '@/constants'
import { contractForm } from './contractForm'

export default {
  data() {
    return {
      saveFlag: true,
      id: '',
      tableselectionRows: {},
      radioValue1: null,
      supplierRows: [],
      dialogVisible: false,
      supplierVisible: false,
      customerOptions: [],
      customerList: [], // 甲方客户列表
      supplierList: [], // 乙方供应商列表
      formData: contractForm(this.$route.query.flag || 0),
      addData: {
        partyACompany: '',
        contractNo: '',
        CompanyList: [],
        connectStatus: '否'
      },
      addrCodeId: [],
      flag: this.$route.query.flag ? this.$route.query.flag : 0,
      supplierId: this.$route.query.supplierId ? this.$route.query.supplierId : null,
      isAccommodate: false,
      pictureList: {},
      CompanyList: [], // 承建单位
      selectTechnologyManagerList: [],
      projectManagerParams: {
        templateId: '',
        customerName: '',
        detailAddress: ''
      },
      supplierParams: {
        supplierName: '',
        contacts: '',
        phone: ''
      },

      supplierColumn: [
        {
          prop: 'supplierName',
          label: '企业名称'
        },
        {
          prop: 'contacts',
          label: '联系人'
        },
        {
          prop: 'phone',
          label: '联系电话'
        }
      ],
      principalColumn: [
        {
          prop: 'customerTypeName',
          label: '单位类型'
        },
        {
          prop: 'customerName',
          label: '单位名称'
        },
        {
          prop: 'detailAddress',
          label: '联系地址'
        }
      ],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      page2: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      rules: {
        supplierName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    console.log('111')
    this.init()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getCustomer()
    } else {
      this.getPartner()
    }
  },
  computed: {
    isAdd() {
      return testPath(/add/)
    }
  },
  watch: {
    'addData.connectStatus': function (value) {
      console.log('addData.connectStatus', value, this.CompanyList.length)
      if (value === '否') {
        this.CompanyList = []
        console.log('this.CompanyList', this.CompanyList)
      } else if (this.CompanyList.length === 1) {
        this.CompanyList[0].status = true
      }
    },

    CompanyList: {
      handler(newValue) {
        if (this.addData.connectStatus === '是') {
          let flag = false
          this.CompanyList.forEach((item) => {
            if (item.status) {
              flag = true
            }
          })
          if (!flag && this.CompanyList.length > 0) {
            this.CompanyList[0].status = true
          }
        }
        this.addData.CompanyList = this.CompanyList
        console.log('newValue', newValue)
      },
      immediate: true
    }
  },
  methods: {
    getPartner() {
      getInfo().then((res) => {
        if (res.code === 200) {
          console.log(1234)
          this.$set(this.addData, 'partyACompany', res.user.org.orgName)
          this.$set(this.addData, 'partyAContact', res.user.org.username)
          this.$set(this.addData, 'partyAPhone', res.user.org.phone)
          this.$set(this.addData, 'partyACompanyOrgId', res.user.org.id)
          this.$set(this.addData, 'partyAAddressDetail', res.user.org.address)
          console.log('this.Partner', this.Partner)
        }
      })
    },
    // 获取详情
    getCustomer() {
      getCustomer(this.id).then((res) => {
        console.log('res', res)

        this.CompanyList = deepClone(res.data.contractMainPartVoList)
        this.CompanyList.forEach((item) => {
          item.partyBAddress = JSON.parse(item.partyBAddress)
          item.status = item.status !== 0
          this.$set(item, 'partyBLegelRepresentative', item.partyBLegelRepresentative)
        })
        this.addData = res.data
        this.addData.connectStatus = this.addData.connectStatus === 1 ? '是' : '否'
        this.addData.validDate = []
        this.addData.partyAAddress = JSON.parse(this.addData.partyAAddress)
        this.addData.validDate[0] = res.data.validStartDate.slice(0, 10)
        this.addData.validDate[1] = res.data.validEndDate.slice(0, 10)
        console.log('this.addData.validDate', this.addData.validDate)
        console.log('this.CompanyList', this.CompanyList)
      })
    },
    radioChange1(e) {
      console.log('e', e)
      this.customerList.forEach((item) => {
        if (item.customerId === e) {
          this.tableselectionRows = item
        }
      })
    },
    save() {
      this.$refs.supplierFrom.getData().then((res) => {
        console.log(res)

        console.log('this', this.CompanyList)
        let obj = {}
        obj = { ...obj, ...this.addData }
        obj.addContractMainPartDtoList = []

        this.CompanyList.forEach((item) => {
          console.log('item1234560', item)
          // let obj2 = {}
          item.partyBAddress = JSON.stringify(item.partyBAddress)
          // obj2.partyBFox = item.partyBFox
          // obj2.partyBEmail = item.partyBEmail
          item.status = Number(item.status)
          // obj.addContractMainPartDtoList.push(obj2)
        })
        obj.addContractMainPartDtoList = this.CompanyList
        obj.validStartDate = `${res.validDate[0]} 00:00:00`
        obj.validEndDate = `${res.validDate[1]} 00:00:00`
        obj.signDate = `${res.signDate} 00:00:00`

        obj.contractNo = res.contractNo
        obj.contractName = res.contractName
        obj.totalAmount = res.totalAmount
        obj.isImportance = Number(res.isImportance)
        obj.connectStatus = res.connectStatus === '是' ? 1 : 0
        obj.partyAAddress = JSON.stringify(res.partyAAddress)

        console.log('obj', obj)

        if (this.id !== '') {
          obj.id = this.id
          editCustomer(obj).then((resss) => {
            if (resss.code === 200) {
              this.$message.success('保存成功')
              this.$emit('save', resss.data)
              this.saveFlag = false
            }
          })
        } else {
          addCustomer(obj).then((ress) => {
            if (ress.code === 200) {
              this.$message.success('保存成功')
              this.id = ress.data
              this.$emit('save', ress.data)
              this.saveFlag = false
            }
          })
        }
      })
    },
    async init() {
      // this.jsonData = await supplierForm()
      const res = await enterpriseTypeTemplateList({ type: 3 })
      const customerType = getOptions(res.data.records, 'name', 'enterpriseTypeTemplateId')
      // const res = await getDictMultiple(['sys_customer_type'])
      // customerPartner().then((res) => {
      //   console.log('res', res)
      // })
      this.customerOptions = customerType
      this.getcustomerList()
      this.getSupplierList()
    },
    pickCustomer() {
      this.dialogVisible = true
    },
    pageCurrentChange(e) {
      this.page.pageNo = e
      this.getcustomerList()
    },
    pageSizeChange(e) {
      this.page.limit = e
      this.getcustomerList()
    },
    pageCurrentChange2(e) {
      this.page2.pageNo = e
      this.getSupplierList()
    },
    pageSizeChange2(e) {
      this.page2.limit = e
      this.getSupplierList()
    },
    selectionChange2(e) {
      console.log('e', e)
      if (this.addData.connectStatus === '否' && e.length > 1) {
        this.$message('联合体选否时，只能选一个承建单位')
      }
      this.supplierRows = e

      console.log('this.supplierRows', this.supplierRows)
    },
    add() {
      this.supplierVisible = true
    },
    delet() {
      console.log('this.CompanyList', this.CompanyList)
      let flag = false
      this.CompanyList.forEach((item) => {
        if (item.radio) {
          flag = true
        }
      })
      if (!flag) {
        this.$message('请选择承建单位再进行删除')
      } else {
        this.CompanyList = this.CompanyList.filter((item) => item.radio === false)
      }
    },
    switchChange(supplierId) {
      console.log('123supplierId', supplierId)
      if (this.CompanyList.length !== 1) {
        this.CompanyList.forEach((item) => {
          item.status = false
          if (item.supplierId === supplierId) {
            item.status = true
          }
        })
      }
      console.log('this.CompanyList', this.CompanyList)
    },
    cancel() {
      console.log('11111')
      this.page.pageNo = 1
      this.projectManagerParams.templateId = ''
      this.projectManagerParams.customerName = ''
      this.projectManagerParams.detailAddress = ''
      // this.tableselectionRows = {}
      this.dialogVisible = false
      this.supplierVisible = false
    },
    ok() {
      console.log('this.tableselectionRows', this.tableselectionRows)
      this.addData.partyACompany = this.tableselectionRows.customerName
      this.addData.partyAContact = this.tableselectionRows.contacts
      this.addData.partyALegelRepresentative = this.tableselectionRows.legalPerson
      this.addData.partyAPhone = this.tableselectionRows.phone
      this.addData.partyAAddress = this.tableselectionRows.address
      this.addData.partyAAddressDetail = this.tableselectionRows.detailAddress
      this.addData.partyACompanyOrgId = this.tableselectionRows.createOrgId
      // this.addData.partyBOrgId = this.tableselectionRows.relevanceOrgId
      this.page.pageNo = 1
      this.projectManagerParams.templateId = ''
      this.projectManagerParams.customerName = ''
      this.projectManagerParams.detailAddress = ''
      this.dialogVisible = false
    },
    supplierOk() {
      if (this.addData.connectStatus === '否' && this.supplierRows.length > 1) {
        this.$message('联合体选否时，只能选一个承建单位')
        this.resetQuery2()
        return
      }
      this.page2.pageNo = 1
      this.supplierParams.supplierName = ''
      this.supplierParams.contacts = ''
      this.supplierParams.phone = ''
      console.log('this.supplierRows', this.supplierRows)
      this.CompanyList = []
      this.supplierRows.forEach((item) => {
        let obj = {}
        obj.partyBAddress = item.address
        obj.partyBAddressDetail = item.detailAddress
        // obj.partyBLegelRepresentative = item.legalPerson
        this.$set(obj, 'partyBLegelRepresentative', item.legalPerson)
        obj.contacts = item.contacts
        obj.partyBCompany = item.supplierName
        obj.partyBPhone = item.phone
        obj.partyBContact = item.contacts
        obj.partyBOrgId = item.relevanceOrgId
        obj.supplierId = item.supplierId
        this.CompanyList.push(obj)
      })
      this.CompanyList.forEach((item) => {
        this.$set(item, 'radio', false)
        this.$set(item, 'status', false)
      })
      this.supplierVisible = false
      console.log('...this.CompanyList', this.CompanyList)
    },
    // 生成编号
    getContractNo() {
      getCodeNo().then((res) => {
        this.addData.contractNo = res.data
      })
    },
    // 获取甲方客户列表
    getcustomerList() {
      let obj = {}
      obj = { ...obj, ...this.projectManagerParams }
      obj.pageNum = this.page.pageNo
      obj.pageSize = this.page.limit
      // obj.bindingStatus = 2
      // obj.isAdd = 1

      customerPartner(obj).then((res) => {
        console.log('res1', res)
        res.data.records.forEach((item) => {
          item.radioValue = false
          if (item.address) {
            item.addressName = getParent(item.address, 'addrFullname').pop()
            console.log('item.addressName', item.addressName)
          }

          // this.customerOptions.forEach((items) => {
          //   console.log('item', item)
          //   console.log('items', items)
          //   if (Number(item.customerType) === Number(items.dictValue)) {
          //     this.$set(item, 'customerTypeName', items.dictLabel)
          //   }
          // })
        })
        this.customerList = []
        this.customerList = res.data.records
        this.page.total = res.data.total
      })
    },
    radioChange(item) {
      console.log('item', item)
    },
    // 获取甲方客户列表
    getSupplierList() {
      let obj = {}
      obj = { ...obj, ...this.supplierParams }
      obj.pageNum = this.page2.pageNo
      obj.pageSize = this.page2.limit
      // obj.bindingStatus = 2
      // obj.isAdd = 1

      supplierPartner(obj).then((res) => {
        this.supplierList = []
        this.supplierList = res.data.records
        this.page2.total = res.data.total
      })
    },
    // 新建客户
    addPartner() {
      this.$router.push({
        path: `/partner/${ADD}`
      })
    },
    resetQuery() {
      this.page.pageNo = 1
      this.projectManagerParams.templateId = ''
      this.projectManagerParams.customerName = ''
      this.projectManagerParams.detailAddress = ''
      this.radioValue1 = null
      this.getcustomerList()
    },
    // 重置搜索框
    resetQuery2() {
      this.page2.pageNo = 1
      this.supplierParams.supplierName = ''
      this.supplierParams.contacts = ''
      this.supplierParams.phone = ''
      this.supplierRows = []
      this.getSupplierList()
    },

    // 点击搜索
    handleQuery() {
      this.page.pageNo = 1
      this.getcustomerList()
    },
    addQuery() {
      this.page2.pageNo = 1
      this.getSupplierList()
    },
    // 数据初始化
    closed() {},
    // 提交
    submit() {
      this.$refs.supplierFrom.getData().then((res) => {
        console.log(res)

        console.log('this', this.CompanyList)
        let obj = {}
        obj = { ...obj, ...this.addData }
        obj.addContractMainPartDtoList = []

        this.CompanyList.forEach((item) => {
          console.log('item1234560', item)
          // let obj2 = {}
          item.partyBAddress = JSON.stringify(item.partyBAddress)
          // obj2.partyBFox = item.partyBFox
          // obj2.partyBEmail = item.partyBEmail
          item.status = Number(item.status)
          // item.partyBOrgId = item.relevanceOrgId
          // obj.addContractMainPartDtoList.push(obj2)
        })
        obj.addContractMainPartDtoList = this.CompanyList
        obj.validStartDate = `${res.validDate[0]} 00:00:00`
        obj.validEndDate = `${res.validDate[1]} 00:00:00`
        obj.signDate = `${res.signDate} 00:00:00`

        obj.contractNo = res.contractNo
        obj.contractName = res.contractName
        obj.totalAmount = res.totalAmount
        obj.isImportance = Number(res.isImportance)
        obj.connectStatus = res.connectStatus === '是' ? 1 : 0
        obj.partyAAddress = JSON.stringify(res.partyAAddress)

        console.log('obj', obj)

        if (this.id !== '') {
          obj.id = this.id
          editCustomer(obj).then((resss) => {
            if (resss.code === 200) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
          })
        } else {
          addCustomer(obj).then((ress) => {
            if (ress.code === 200) {
              this.$message.success('新增加成功')
              this.$router.go(-1)
            }
          })
        }
      })
    },
    //
    selectData(e) {
      console.log('e111', e)
    },
    // 供应商详情
    getSupplier() {},
    /* 获取三级联动地址编码 */
    getAddr(data) {
      // console.log(data)
      // this.addData.region = data.addrCodeId;
      this.addData = {
        ...this.addData,
        ...{
          region: data.addrCodeId
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.list-edit {
  &__tabs {
    margin-bottom: 40px;

    ::v-deep .el-tabs__content {
      padding: 20px 10px;
    }
  }

  .sub-btn {
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
::v-deep .el-cascader {
  width: 100% !important;
}

::v-deep .list_box {
  border: 1px solid #eee;
  margin-bottom: 20px;
  .el-row {
    margin-left: 0 !important;
  }
  form {
    float: right;
    width: calc(100% - 40px);
    margin-bottom: 20px;
  }
  .el-checkbox {
    float: left;
    top: 72px;
    margin-left: 10px;
    .el-checkbox__inner {
      border-radius: 14px !important;
    }
  }
  .switch_box {
    float: left;
    margin-left: 50px;
    margin-bottom: 20px;
  }
}
.clearfix:after {
  content: '';

  display: block;

  visibility: hidden;

  clear: both;
}
</style>
