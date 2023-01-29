import { selectDictLabel, getDictMultiple, getParent } from '@/utils/tool'
import store from '@/store'

const getColumns = async () => {
  // 0-未绑定 1-申请中 2-绑定成功 3-绑定失败
  const status = ['未绑定', '申请中', '绑定成功', '绑定失败']
  const columns = [
    {
      label: '单位类型',
      prop: 'customerTypeName',
      baseSearch: true
    },
    {
      label: '申请单位',
      prop: 'createOrgName'
    },
    {
      label: '联系地址',
      prop: 'detailAddress'
    },
    {
      label: '申请时间',
      prop: 'applyBindTime'
    },
    {
      label: '审核状态',
      prop: 'bindingStatus',
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
          placeholder: '请选择',
          required: false,
          showLabel: true,
          width: '100%',
          options: [
            // 0-未绑定 1-申请中 2-绑定成功 3-绑定失败
            { label: '未绑定', value: 0 },
            { label: '申请中', value: 1 },
            { label: '绑定成功', value: 2 },
            { label: '绑定失败', value: 3 }
          ],
          filterable: false,
          optionDataType: 1, // 1-静态数据 2-动态数据
          interfaceMethod: '/basic/system/dict/data/dictType/sys_satisfy_level',
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
        model: 'bindingStatus',
        rules: []
      },
      formatter(val) {
        return status[val] || '-'
      }
    },

    {
      label: '是否已经添加到通讯录',
      prop: 'isAdd',
      baseSearch: true,
      width: 100,
      formFormat: {
        type: 'select',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '请选择',
          required: false,
          showLabel: true,
          width: '100%',
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ],
          filterable: false,
          optionDataType: 1, // 1-静态数据 2-动态数据
          interfaceMethod: '/basic/system/dict/data/dictType/sys_satisfy_level',
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
        model: 'isAdd',
        rules: []
      },
      formatter(val) {
        return val == 1 ? '是' : '否'
      }
    },
    {
      label: '审核时间',
      prop: 'auditDate'
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

const getLatentColumns = async () => {
  const columns = [
    {
      label: '单位类型',
      prop: 'customerTypeName'
    },
    {
      label: '下单单位',
      prop: 'orgName',
      baseSearch: true
    },
    {
      label: '联系人',
      prop: 'userName',
      baseSearch: true
    },
    {
      label: '手机号码',
      prop: 'phone'
    },

    {
      label: '是否已经添加到通讯录',
      prop: 'isAdd',
      formFormat: {
        type: 'select',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '请选择',
          required: false,
          showLabel: true,
          width: '100%',
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ],
          filterable: false,
          optionDataType: 1, // 1-静态数据 2-动态数据
          interfaceMethod: '/basic/system/dict/data/dictType/sys_satisfy_level',
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
        model: 'isAdd',
        rules: []
      },
      formatter(val) {
        return val == 1 ? '是' : '否'
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

const approveForm = (data, flag = 0) => {
  console.log('data111')
  console.log(data)
  let isPass = !data.bindingStatus || data.bindingStatus == 2
  let isNoPass = !data.bindingStatus || data.bindingStatus == 3
  let disabled = flag === 1
  return {
    list: [
      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: '审核申请企业',
        options: {
          width: '100%',
          defaultValue: '',
          interfaceId: 1663833196000
        },
        key: 1663833122000,
        model: 'title_1663833122000',
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
        type: 'radio',
        icon: 'icon-radio-active',
        name: '审核结果',
        flag: 0,
        options: {
          borderRadius: 'no',
          inline: true,
          defaultValue: null,
          showLabel: true, // 2-审核通过 3-审核未通过
          options: [
            {
              value: 2,
              label: '审核通过'
            },
            {
              value: 3,
              label: '审核未通过'
            }
          ],
          required: false,
          width: '',
          optionDataType: 1,
          interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
          interfaceParam: '{"dictType":"sys_tenant_type"}',
          interfaceId: 1663833133000,
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          disabled: false,
          valueType: 2
        },
        key: 1663833133000,
        model: 'bindingStatus',
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
        type: 'radio',
        icon: 'icon-radio-active',
        name: '是否要添加到通讯录',
        flag: 0,
        options: {
          borderRadius: 'no',
          inline: true,
          defaultValue: null,
          showLabel: true,
          hide: isNoPass,
          options: [
            // 1-是 0-否
            {
              value: '1',
              label: '是'
            },
            {
              value: '0',
              label: '否'
            }
          ],
          required: false,
          width: '',
          optionDataType: 1,
          interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
          interfaceParam: '{"dictType":"sys_tenant_type"}',
          interfaceId: 11111,
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',

          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          disabled: false,
          valueIsNumber: false
        },
        key: 1663833138000,
        model: 'isAdd',
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
            message: '请选择否要添加到通讯录'
          }
        ]
      },
      {
        type: 'textarea',
        icon: 'icon-diy-com-textarea',
        name: '审核回复',
        flag: 0,
        options: {
          borderRadius: 'no',
          hide: isPass,
          width: '70%',
          defaultValue: '',
          row: 3,
          required: false,
          disabled: false,
          pattern: '',
          minlength: '',
          patternTips: '',
          tipFont: '',
          maxlength: '140',
          placeholder: ''
        },
        key: 1667268138000,
        model: 'auditReason',
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
            message: '审核回复不能为空'
          }
        ]
      }
    ],
    config: {
      id: 'form_1663833113000',
      labelWidth: 160,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '审核结果'
    }
  }
}

export { getColumns, getLatentColumns, approveForm }
