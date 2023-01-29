import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const cooperationForm = (flag = 0, isAccommodate = true) => {
  let disabled = flag === 1
  return {
    list: [
      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: '合作事项',
        options: {
          width: '100%',
          defaultValue: ''
        },
        key: 1658126204000,
        model: 'title_1658126204000',
        rules: []
      },
      {
        type: 'input',
        icon: 'icon-input',
        name: '合作项目名称',
        flag: 0,
        options: {
          clearable: false,
          showText: false,
          width: '40%',
          defaultValue: '',
          required: true,
          dataType: 'string',
          maxlength: '',
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
        key: 1658126221000,
        model: 'projectName',
        rules: [
          {
            required: true,
            message: '合作项目名称不能为空'
          }
        ]
      },
      // {
      //   type: 'slot',
      //   icon: 'icon-input',
      //   name: '合作方',
      //   flag: 0,
      //   options: {
      //     slotName: 'companyName',
      //     clearable: false,
      //     showText: false,
      //     width: '100%',
      //     defaultValue: [],
      //     required: false,
      //     dataType: 'array',
      //     maxlength: '',
      //     minlength: '',
      //     validator: false,
      //     pattern: '',
      //     patternTips: '',
      //     placeholder: '',
      //     disabled: false,
      //     hide: false,
      //     tipFont: '',
      //     mouseTips: '',
      //     borderRadius: 'no'
      //   },
      //   key: 1658126242000,
      //   model: 'addProjectPartnerDtoList',
      //   rules: [
      //     {
      //       required: true,
      //       message: '请选择合作方',
      //       // trigger: 'change',
      //       type: 'array'
      //     }
      //   ]
      // },
      {
        type: 'slot',
        icon: 'icon-wenzishezhi-',
        name: '合作方',
        flag: 0,
        options: {
          width: '100%',
          slotName: 'companyName',
          defaultValue: [],
          required: false,
          validator: '',
          hideLabel: false
        },
        key: 16175663512100,
        model: 'addProjectPartnerDtoList',
        rules: [
          {
            required: true,
            message: '请选择合作方'
          }
        ]
      },
      {
        type: 'slot',
        icon: 'icon-input',
        name: '合作合同',
        flag: 0,
        options: {
          slotName: 'contract',
          clearable: false,
          showText: false,
          width: '100%',
          defaultValue: '',
          required: false,
          dataType: 'string',
          maxlength: '',
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
        key: 1658126244000,
        model: 'input_1658126244000',
        rules: [
          {
            type: 'string',
            message: '请输入字符串类型数据'
          }
        ]
      }
      // {
      //   type: 'title',
      //   flag: 0,
      //   icon: 'icon-wenzishezhi-',
      //   name: '合作事项',
      //   options: {
      //     width: '100%',
      //     defaultValue: ''
      //   },
      //   key: 1658126246000,
      //   model: 'title_1658126246000',
      //   rules: []
      // },
      // {
      //   type: 'slot',
      //   icon: 'icon-wenzishezhi-',
      //   name: '',
      //   flag: 1,
      //   options: {
      //     width: '100%',
      //     slotName: 'coopertiveTip',
      //     defaultValue: '',
      //     required: false,
      //     validator: '',
      //     hideLabel: false
      //   },
      //   key: 1658126253000,
      //   model: 'slot_1658126253000',
      //   rules: []
      // }
    ],
    config: {
      id: 'form_1658126200000',
      labelWidth: 130,
      labelPosition: 'top',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}

const getPartnerColumns = async (sysCustomerType = []) => {
  const columns = [
    // {
    //   label: '单位类型',
    //   prop: 'customerType',
    //   formatter(val) {
    //     return selectDictLabel(sysCustomerType, val) || '-'
    //   }
    // },
    {
      label: '单位类型',
      prop: 'customerTypeName',
      formatter(val) {
        return val || '-'
      }
    },
    {
      label: '单位名称',
      prop: 'partnerName'
    },
    {
      label: '联系地址',
      prop: 'detailAddress',
      formatter(val, row) {
        return val || row.partnerAddress || '-'
      }
    },

    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 200,
      fixed: 'right'
    }
  ]

  return columns
}
const getContractColumns = async () => {
  const columns = [
    {
      label: '合同编号',
      prop: 'contractNo'
    },
    {
      label: '合同名称',
      prop: 'contractName'
    },
    {
      label: '合同来源',
      prop: 'sourceFromString'
    },
    {
      label: '是否联合体',
      prop: 'connectStatus',
      formatter(val) {
        return val === 0 ? '否' : '是'
      }
    },
    {
      label: '甲方名称',
      prop: 'partyACompany'
    }
  ]

  return columns
}

const newTipForm = (unitIdOptions = []) => {
  console.log('unitIdOptions')
  console.log(unitIdOptions)
  return {
    list: [
      {
        type: 'input',
        icon: 'icon-input',
        name: '负责事项',
        flag: 0,
        options: {
          clearable: false,
          showText: false,
          width: '100%',
          defaultValue: '',
          required: true,
          dataType: 'string',
          maxlength: '',
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
        key: 1662108934000,
        model: 'missionName',
        rules: [
          {
            type: 'string',
            message: '请输入字符串类型数据'
          },
          {
            required: true,
            message: '负责事项不能为空'
          }
        ]
      },
      {
        type: 'slot',
        icon: 'icon-select',
        name: '负责实施单位',
        flag: 0,
        options: {
          slotName: 'requireCompletionUnitId',
          multiple: false,
          borderRadius: 'no',
          defaultValue: '',
          disabled: false,
          clearable: false,
          placeholder: '',
          required: true,
          showLabel: false,
          width: '100%',
          options: [],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
          interfaceParam: '{"dictType":"sys_tenant_type"}',
          interfaceId: 1662109028000,
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'selfId',
            label: 'partnerName'
          }
        },
        key: 1662108937000,
        model: 'selfId',
        rules: [
          {
            required: true,
            message: '负责实施单位不能为空'
          }
        ]
      },
      {
        type: 'date',
        icon: 'icon-date',
        name: '要求落地完成时间',
        flag: 0,
        options: {
          borderRadius: 'no',
          defaultValue: '',
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          placeholder: '请选择时间',
          startPlaceholder: '',
          endPlaceholder: '',
          tipFont: '',
          type: 'date',
          format: 'yyyy-MM-dd',
          timestamp: false,
          required: true,
          width: '100%',
          interfaceId: 1662109034000
        },
        key: 1662108946000,
        model: 'requireCompletionTime',
        rules: [
          {
            required: true,
            message: '要求落地完成时间不能为空'
          }
        ]
      },
      {
        type: 'input',
        icon: 'icon-input',
        name: '负责人',
        flag: 0,
        options: {
          clearable: false,
          showText: false,
          width: '100%',
          defaultValue: '',
          required: true,
          dataType: 'string',
          maxlength: '',
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
        key: 1662108954000,
        model: 'requireCompletionPeople',
        rules: [
          {
            type: 'string',
            message: '请输入字符串类型数据'
          },
          {
            required: true,
            message: '负责人不能为空'
          }
        ]
      },
      {
        type: 'textarea',
        icon: 'icon-diy-com-textarea',
        name: '目标描述',
        flag: 0,
        options: {
          borderRadius: 'no',
          width: '100%',
          defaultValue: '',
          row: '5',
          required: false,
          disabled: false,
          pattern: '',
          minlength: '',
          patternTips: '',
          tipFont: '',
          maxlength: '140',
          placeholder: ''
        },
        key: 1662108958000,
        model: 'missionNote',
        rules: []
      }
    ],
    config: {
      id: 'form_1662108919000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}

const getTipColumns = async () => {
  const statusArray = ['草稿', '未发布', '已发布']
  const columns = [
    {
      label: '负责事项名称',
      prop: 'missionName'
    },
    {
      label: '负责实施单位',
      prop: 'requireCompletionUnit'
    },
    {
      label: '要求落地完成时间',
      prop: 'requireCompletionTime',
      formatter(val) {
        return val ? val.split(' ')[0] : '-'
      }
    },
    {
      label: '负责人',
      prop: 'requireCompletionPeople'
    },
    {
      label: '目标描述',
      prop: 'missionNote'
    },
    {
      label: '状态',
      prop: 'status',
      formatter(val) {
        return statusArray[val]
      }
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 400,
      fixed: 'right'
    }
  ]

  return columns
}

const getChooiceColumns = async (sysCustomerType = []) => {
  // const { sys_customer_type: sysCustomerType } = await getDictMultiple(['sys_customer_type'])
  const columns = [
    {
      label: '单位类型',
      prop: 'customerTypeName',
      formatter(val) {
        return val || '-'
      }
    },
    {
      label: '单位名称',
      prop: 'customerName'
    },
    {
      label: '联系地址',
      prop: 'detailAddress'
    }
  ]
  return columns
}
const getChooiceColumns2 = async (sysCustomerType = []) => {
  // const { sys_customer_type: sysCustomerType } = await getDictMultiple(['sys_customer_type'])
  const columns = [
    {
      label: '单位类型',
      prop: 'customerTypeName',
      formatter(val) {
        return val || '-'
      }
    },
    {
      label: '单位名称',
      prop: 'supplierName'
    },
    {
      label: '联系地址',
      prop: 'detailAddress'
    }
  ]
  return columns
}

const getContractColumns2 = async (sysCustomerType = []) => {
  const columns = [
    {
      label: '合同编号',
      prop: 'contractNo'
    },
    {
      label: '合同名称',
      prop: 'contractMainName'
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 200,
      fixed: 'right'
    }
  ]
  return columns
}
export {
  cooperationForm,
  getPartnerColumns,
  getContractColumns,
  getTipColumns,
  newTipForm,
  getChooiceColumns,
  getChooiceColumns2,
  getContractColumns2
}
