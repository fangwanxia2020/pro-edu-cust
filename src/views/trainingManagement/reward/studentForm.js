import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const cooperationForm = (type, flag = 0, isAccommodate = true) => {
  let disabled = flag === 1
  let isReWard = type == 1
  return {
    list: [
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 8,
            list: [
              {
                type: 'select',
                icon: 'icon-select',
                name: '获得奖项',
                flag: 0,
                options: {
                  multiple: false,
                  borderRadius: 'no',
                  defaultValue: '',
                  disabled: false,
                  clearable: false,
                  placeholder: '',
                  required: true,
                  showLabel: false,
                  width: '',
                  optionDataType: 2,
                  options: [
                    {
                      value: '选项1'
                    },
                    {
                      value: '选项2'
                    },
                    {
                      value: '选项3'
                    }
                  ],
                  filterable: false,
                  interfaceMethod: '/basic/system/dict/data/dictType/awards_type',
                  interfaceParam: '{}',
                  interfaceId: '',
                  resList: 'data',
                  interfaceType: 'get',
                  tipFont: '',
                  dictKey: '',
                  hide: !isReWard,
                  props: {
                    value: 'dictValue',
                    label: 'dictLabel'
                  }
                },
                key: '1667891773000_7145',
                model: 'awards',
                prop: {
                  relation: [
                    {
                      templateServiceInterfaceId: null,
                      attrKey: null
                    }
                  ]
                },
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: '获得奖项不能为空'
                  }
                ]
              },
              {
                type: 'select',
                icon: 'icon-select',
                name: '受到惩罚',
                flag: 0,
                options: {
                  multiple: false,
                  borderRadius: 'no',
                  defaultValue: '',
                  disabled: false,
                  clearable: false,
                  placeholder: '',
                  required: true,
                  showLabel: false,
                  width: '',
                  optionDataType: 2,
                  options: [
                    {
                      value: '选项1'
                    },
                    {
                      value: '选项2'
                    },
                    {
                      value: '选项3'
                    }
                  ],
                  filterable: false,
                  interfaceMethod: '/basic/system/dict/data/dictType/punishment_type',
                  interfaceParam: '{}',
                  interfaceId: '',
                  resList: 'data',
                  interfaceType: 'get',
                  tipFont: '',
                  dictKey: '',
                  hide: isReWard,
                  props: {
                    value: 'dictValue',
                    label: 'dictLabel'
                  }
                },
                key: '16678913000_7145',
                model: 'punishment',
                prop: {
                  relation: [
                    {
                      templateServiceInterfaceId: null,
                      attrKey: null
                    }
                  ]
                },
                rules: [
                  {
                    required: true,
                    message: '获得惩罚不能为空'
                  }
                ]
              }
            ]
          },

          {
            span: 8,
            list: [
              {
                type: 'date',
                icon: 'icon-date',
                name: '获得日期',
                flag: 0,
                options: {
                  borderRadius: 'no',
                  defaultValue: '',
                  readonly: false,
                  disabled: false,
                  editable: true,
                  clearable: true,
                  placeholder: '',
                  startPlaceholder: '',
                  endPlaceholder: '',
                  tipFont: '',
                  type: 'date',
                  format: 'yyyy-MM-dd',
                  timestamp: false,
                  required: true,
                  width: '',
                  interfaceId: 1667891791000
                },
                key: '1667891776000_85229',
                model: 'gainTime',
                prop: {
                  relation: [
                    {
                      templateServiceInterfaceId: null,
                      attrKey: null
                    }
                  ]
                },
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: '获得日期不能为空'
                  }
                ]
              }
            ]
          }
        ],
        options: {
          gutter: 0,
          justify: 'start',
          align: 'top'
        },
        key: 1667891754000,
        model: 'grid_1667891754000',
        prop: {
          relation: [
            {
              templateServiceInterfaceId: null,
              attrKey: null
            }
          ]
        },
        rules: []
      },
      {
        type: 'slot',
        icon: 'icon-wenzishezhi-',
        name: isReWard ? '受奖励的学生名单' : '受惩罚的学生名单',
        flag: 1,
        options: {
          width: '100%',
          slotName: 'nameList',
          defaultValue: '',
          required: false,
          validator: '',
          hideLabel: false
        },
        key: 1667891804000,
        model: 'nameList',
        prop: {
          relation: [
            {
              templateServiceInterfaceId: null,
              attrKey: null
            }
          ]
        },
        rules: [
          {
            type: 'string',
            message: '请输入字符串类型数据'
          }
        ]
      }
    ],
    config: {
      id: 'form_1667891751000',
      labelWidth: 150,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}

const getPartnerColumns = async (sysCustomerType = []) => {
  const columns = [
    {
      label: '单位类型',
      prop: 'customerType',
      formatter(val) {
        return selectDictLabel(sysCustomerType, val) || '-'
      }
    },
    {
      label: '单位名称',
      prop: 'partnerName'
    },
    {
      label: '联系地址',
      prop: 'detailAddress'
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

const getColumns = async (sysCustomerType = []) => {
  const { sys_class_name: sysClassType } = await getDictMultiple(['sys_class_name'])
  const columns = [
    {
      label: '学号',
      prop: 'studentNum'
    },
    {
      label: '姓名',
      prop: 'studentName'
    },
    {
      label: '入学时间',
      prop: 'studentDate',
      formatter: (val) => {
        return val ? val.split(' ')[0] : ''
      }
    },
    {
      label: '自定义名称',
      prop: 'customName',
      baseSearch: true
    },
    {
      label: '班级',
      prop: 'name',
      baseSearch: true,
      formFormat: {
        type: 'select',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '请选择班级',
          required: false,
          showLabel: true,
          width: '100%',
          options: [],
          filterable: false,
          optionDataType: 2, // 1-静态数据 2-动态数据
          interfaceMethod: '/basic/system/dict/data/dictType/sys_class_name',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          }
        },
        key: 1608804132002,
        model: 'cooperativeModel',
        rules: []
      },
      formatter(val) {
        return selectDictLabel(sysClassType, val) || '-'
      }
    },
    {
      label: '年级',
      prop: 'level'
    }
  ]
  return columns
}

const getStudentColumns = async (sysCustomerType = []) => {
  const columns = [
    {
      label: '学号',
      prop: 'studentNum',
      baseSearch: true
    },
    {
      label: '姓名',
      prop: 'studentName',
      baseSearch: true
    },
    {
      label: '入学时间',
      prop: 'studentDate',
      formatter: (val) => {
        return val ? val.split(' ')[0] : ''
      }
    },
    {
      label: '自定义名称',
      prop: 'customName'
    },
    {
      label: '班级',
      prop: 'name'
    },
    {
      label: '所在年级',
      prop: 'level'
    },
    {
      label: '评语',
      prop: 'commentStatus',
      formatter(val) {
        return val == 1 ? '已写' : val == 0 ? '未写' : '未写'
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
export {
  cooperationForm,
  getPartnerColumns,
  getContractColumns,
  newTipForm,
  getColumns,
  getStudentColumns
}
