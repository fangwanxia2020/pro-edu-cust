// 联系人列表
const getColumns = async () => {
  const gender = ['未知', '男', '女']
  const columns = [
    {
      label: '合作单位',
      prop: 'supplierName'
    },
    {
      label: '联系人',
      prop: 'contactsName'
    },
    {
      label: '性别',
      prop: 'gender',
      formatter: (val) => {
        return val ? gender[val] : '-'
      }
    },
    {
      label: '职位',
      prop: 'position'
    },
    {
      label: '手机',
      prop: 'contactsPhone'
    },
    {
      label: 'QQ/微信',
      prop: 'qq'
    },
    {
      label: '备注',
      prop: 'remark'
    },
    {
      label: '录入时间',
      prop: 'createTime'
    }
  ]

  return columns
}
// 新建联系人
const contantForm = (flag = 0, isAccommodate = true) => {
  let disabled = flag === 1
  return {
    list: [
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 12,
            list: [
              {
                type: 'input',
                icon: 'icon-input',
                name: '姓名',
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
                key: '1662465696000_58399',
                model: 'contactsName',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: '姓名不能为空'
                  }
                ]
              },
              {
                type: 'input',
                icon: 'icon-input',
                name: '职位',
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
                key: '1662465700000_32172',
                model: 'position',
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
                name: 'QQ/微信',
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
                key: '1662465703000_88792',
                model: 'qq',
                rules: []
              },
              {
                type: 'textarea',
                icon: 'icon-diy-com-textarea',
                name: '备注',
                flag: 0,
                options: {
                  borderRadius: 'no',
                  width: '200%',
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
                key: 1662465707000,
                model: 'remark',
                rules: []
              }
            ]
          },
          {
            span: 12,
            list: [
              {
                type: 'radio',
                icon: 'icon-radio-active',
                name: '性别',
                flag: 0,
                options: {
                  borderRadius: 'no',
                  inline: true,
                  defaultValue: null,
                  showLabel: true,
                  options: [
                    {
                      value: 1,
                      label: '男'
                    },
                    {
                      value: 2,
                      label: '女'
                    }
                  ],
                  required: false,
                  width: '',
                  optionDataType: 1,
                  interfaceMethod: 'system/system/dict/data/list',
                  interfaceParam: {
                    pageNum: 1,
                    pageSize: 9999,
                    dictType: 'sys_job_status'
                  },
                  interfaceId: 1615175636000,
                  resList: 'rows',
                  interfaceType: 'get',
                  tipFont: '',
                  dictKey: '',
                  props: {
                    value: 'dictValue',
                    label: 'dictLabel'
                  },
                  disabled: false
                },
                key: '1662465711000_95105',
                model: 'gender',
                rules: []
              },
              {
                type: 'input',
                icon: 'icon-input',
                name: '手机号码',
                flag: 0,
                options: {
                  clearable: false,
                  showText: false,
                  width: '100%',
                  defaultValue: '',
                  required: false,
                  dataType: 'string',
                  maxlength: '11',
                  minlength: '',
                  validator: '',
                  pattern: '',
                  patternTips: '',
                  placeholder: '',
                  disabled: false,
                  hide: false,
                  tipFont: '',
                  mouseTips: '',
                  borderRadius: 'no',
                  interfaceId: 1662465805000
                },
                key: '1662465715000_66531',
                model: 'contactsPhone',
                rules: []
              },
              {
                type: 'slot',
                icon: 'icon-input',
                name: '所在企业',
                flag: 0,
                options: {
                  slotName: 'company',
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
                  disabled: true,
                  hide: false,
                  tipFont: '',
                  mouseTips: '',
                  borderRadius: 'no'
                },
                key: '1662465753000_941',
                model: 'company',
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
        key: 1662465685000,
        model: 'grid_1662465685000',
        rules: []
      }
    ],
    config: {
      id: 'form_1662465682000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}
// 企业列表
const getCompanyColumns = async () => {
  const columns = [
    {
      label: '企业名称',
      prop: 'enterpriseName'
    },
    {
      label: '社会编码',
      prop: 'creditCode'
    },
    {
      label: '联系人',
      prop: 'corporationName'
    },
    {
      label: '手机号码',
      prop: 'phone'
    },
    {
      label: '企业地址',
      prop: 'registAddr'
    }
  ]

  return columns
}
export { getColumns, contantForm, getCompanyColumns }
