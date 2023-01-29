function contractForm(flag = 0, isAccommodate = true) {
  let disabled = Number(flag) === 1
  return {
    list: [
      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: '合同基本信息',
        options: {
          width: '100%',
          defaultValue: ''
        },
        key: 1657272828000,
        model: 'title_1657272828000',
        rules: []
      },
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 8,
            list: [
              {
                type: 'slot',
                icon: 'icon-input',
                name: '合同编号',
                flag: 0,
                options: {
                  slotName: 'contractNo',
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
                key: '1657273522000_21908',
                model: 'contractNo',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: '合同编号不能为空'
                  }
                ]
              },
              {
                type: 'date',
                icon: 'icon-date',
                name: '签订日期',
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
                  width: '100%'
                },
                key: '1657273610000_53500',
                model: 'signDate',
                rules: [
                  {
                    required: true,
                    message: '签订日期不能为空'
                  }
                ]
              }
            ]
          },
          {
            span: 6,
            list: [
              {
                type: 'input',
                icon: 'icon-input',
                name: '合同名称',
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
                key: '1657273525000_63727',
                model: 'contractName',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: '合同名称不能为空'
                  }
                ]
              },
              {
                type: 'input',
                icon: 'icon-input',
                name: '合同总金额(元)',
                flag: 0,
                options: {
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
                key: '1657273553000_73979',
                model: 'totalAmount',
                rules: []
              }
            ]
          },
          {
            span: 8,
            list: [
              {
                type: 'date',
                icon: 'icon-date',
                name: '合同有效期',
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
                  type: 'daterange',
                  format: 'yyyy-MM-dd',
                  timestamp: false,
                  required: true,
                  width: '100%'
                },
                key: '1657273541000_796',
                model: 'validDate',
                rules: [
                  {
                    required: true,
                    message: '合同有效期不能为空'
                  }
                ]
              },
              {
                type: 'select',
                icon: 'icon-select',
                name: '是否重大合同',
                flag: 0,
                options: {
                  multiple: false,
                  borderRadius: 'no',
                  defaultValue: '',
                  disabled: false,
                  clearable: false,
                  placeholder: '',
                  required: false,
                  showLabel: false,
                  width: '100%',
                  options: [
                    {
                      value: '0',
                      label: '否'
                    },
                    {
                      value: '1',
                      label: '是'
                    }
                  ],
                  filterable: false,
                  optionDataType: 1,
                  interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
                  interfaceParam: '{"dictType":"sys_tenant_type"}',
                  interfaceId: 1657273566000,
                  resList: 'data.records',
                  interfaceType: 'get',
                  tipFont: '',
                  dictKey: '',
                  props: {
                    value: 'dictValue',
                    label: 'dictLabel'
                  }
                },
                key: '1657273566000_16443',
                model: 'isImportance',
                rules: []
              }
            ]
          }
        ],
        options: {
          gutter: 0,
          justify: 'start',
          align: 'top'
        },
        key: 1657272986000,
        model: 'grid_1657272986000',
        rules: []
      },
      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: '甲方信息',
        options: {
          width: '100%',
          defaultValue: ''
        },
        key: 1657273637000,
        model: 'title_1657273637000',
        rules: []
      },
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 8,
            list: [
              {
                type: 'slot',
                icon: 'icon-input',
                name: '公司名称',
                flag: 0,
                options: {
                  slotName: 'partyACompany',
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
                key: '1657273686000_76642',
                model: 'partyACompany',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: '公司名称不能为空'
                  }
                ]
              },
              {
                type: 'input',
                icon: 'icon-input',
                name: '传真',
                flag: 0,
                options: {
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
                key: '1657273750000_48263',
                model: 'partyAFox',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  }
                ]
              }
            ]
          },
          {
            span: 6,
            list: [
              {
                type: 'input',
                icon: 'icon-input',
                name: '法定代表人',
                flag: 0,
                options: {
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
                key: '1657273687000_39973',
                model: 'partyALegelRepresentative',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  }
                ]
              },
              {
                type: 'input',
                icon: 'icon-input',
                name: '电子邮件',
                flag: 0,
                options: {
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
                key: '1657273753000_21188',
                model: 'partyAEmail',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  }
                ]
              }
            ]
          },
          {
            span: 5,
            list: [
              {
                type: 'input',
                icon: 'icon-input',
                name: '联系人',
                flag: 0,
                options: {
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
                key: '1657273689000_6951',
                model: 'partyAContact',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  }
                ]
              },
              {
                type: 'slot',
                icon: 'icon-input',
                name: '地址',
                flag: 0,
                options: {
                  slotName: 'partyAAddress',
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
                key: '1657273757000_24955',
                model: 'partyAAddress'
              }
            ]
          },
          {
            span: 5,
            list: [
              {
                type: 'input',
                icon: 'icon-input',
                name: '联系电话',
                flag: 0,
                options: {
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
                key: '1657273691000_11071',
                model: 'partyAPhone',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  }
                ]
              },
              {
                type: 'input',
                icon: 'icon-input',
                name: '',
                flag: 0,
                options: {
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
                key: '1657273760000_95472',
                model: 'partyAAddressDetail',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
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
        key: 165727358000,
        model: 'grid_165727358000',
        rules: []
      },

      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: '乙方信息',
        options: {
          width: '100%',
          defaultValue: ''
        },
        key: 1657273855000,
        model: 'title_1657273855000',
        rules: []
      },
      {
        type: 'radio',
        icon: 'icon-radio-active',
        name: '是否联合体',
        flag: 0,
        options: {
          borderRadius: 'no',
          inline: true,
          defaultValue: 'undefined',
          showLabel: false,
          options: [
            {
              value: '是',
              label: '1'
            },
            {
              value: '否',
              label: '0'
            }
          ],
          required: true,
          width: '',
          optionDataType: 1,
          interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
          interfaceParam: '{"dictType":"sys_tenant_type"}',
          interfaceId: 1662021863000,
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          disabled: false
        },
        key: 1662021863000,
        model: 'connectStatus',
        rules: [
          {
            required: true,
            message: '是否联合体不能为空'
          }
        ]
      },
      {
        type: 'slot',
        icon: 'icon-wenzishezhi-',
        name: '承建单位',
        flag: 1,
        options: {
          width: '100%',
          slotName: 'list',
          defaultValue: '',
          required: true,
          validator: '',
          hideLabel: false,
          interfaceId: 1662021904000
        },
        key: 1662021904000,
        model: 'CompanyList',
        rules: [
          {
            required: true,
            message: '承建单位不能为空'
          }
        ]
      },
      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: '其他',
        options: {
          width: '100%',
          defaultValue: ''
        },
        key: 1662021920000,
        model: 'title_1662021920000',
        rules: []
      },
      {
        type: 'editor',
        icon: 'icon-fuwenbenkuang',
        name: '合同补充说明',
        flag: 1,
        options: {
          defaultValue: '',
          width: '',
          action: 'file/file/upload',
          actionParams: '',
          maxSize: 5,
          resFormat: 'data',
          disabled: flag === 1
        },
        key: 1662021948000,
        model: 'supplement',
        rules: []
      }
    ],
    config: {
      id: 'form_1657272825000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}

const getColumns = async () => {
  const columns = [
    {
      label: '文件名称',
      prop: 'attachName'
    },
    {
      label: '备注',
      prop: 'note'
    },
    {
      label: '创建人',
      prop: 'createName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ]

  return columns
}

const getChangeColumns = async () => {
  const columns = [
    {
      label: '操作时间',
      prop: 'createTime'
    },
    {
      label: '操作人',
      prop: 'createName'
    },
    {
      label: '操作内容',
      prop: 'msg'
    }
  ]

  return columns
}
export { getColumns, getChangeColumns, contractForm }
