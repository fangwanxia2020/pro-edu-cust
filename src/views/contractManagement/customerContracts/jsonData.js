const getColumns = async () => {
  const columns = [
    {
      label: '合同编号',
      prop: 'contractNo',
      baseSearch: true,
      width: '120'
    },
    {
      label: '合同名称',
      prop: 'contractName',
      baseSearch: true
    },
    {
      label: '合同来源',
      prop: 'sourceFromType',
      baseSearch: false,
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
            {
              value: '0',
              label: '新建'
            },
            {
              value: '1',
              label: '共享'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      },
      formatter: (val, data) => {
        if (data.sourceFromString === null) {
          return ''
        }
        return data.sourceFromString.slice(2, 4)
      }
    },
    {
      label: '是否联合体',
      prop: 'connectStatus',
      baseSearch: false,
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
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      },
      formatter: (val) => {
        return val === 0 ? '否' : '是'
      }
    },
    {
      label: '甲方名称',
      prop: 'partyACompany',
      baseSearch: false
    },
    {
      label: '乙方名称',
      prop: 'partyaCompanyNames'
    },
    {
      label: '签订日期',
      prop: 'signDate',
      type: 'date'
    },
    {
      label: '合同有效期',
      prop: 'validityScope'
    },

    {
      label: '是否快到期',
      prop: 'isSoonExpire',
      baseSearch: false,
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
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      },
      formatter: (val) => {
        return val === 0 ? '否' : '是'
      }
    },

    {
      label: '合同审核状态',
      prop: 'checkStatus',
      baseSearch: false,
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
            {
              value: 0,
              label: '未审核'
            },
            {
              value: 1,
              label: '审核通过'
            },
            {
              value: 2,
              label: '审核不通过'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      },
      formatter: (val) => {
        if (val === 0) {
          return '未审核'
        }
        if (val === 1) {
          return '审核通过'
        }
        if (val === 2) {
          return '审核不通过'
        }

        return ' '
      }
    },
    {
      label: '甲乙方是否确认一致',
      prop: 'isConfirm',
      baseSearch: false,
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
            {
              value: 0,
              label: '否'
            },
            {
              value: 1,
              label: '是'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      },
      formatter: (val) => {
        if (val === 0) {
          return '否'
        }
        if (val === 1) {
          return '是'
        }

        return ' '
      }
    },
    {
      label: '合同生效状态',
      prop: 'status',
      baseSearch: false,
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
            {
              value: 0,
              label: '未生效'
            },
            {
              value: 1,
              label: '生效中'
            },
            {
              value: 2,
              label: '已过期'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      },
      formatter: (val) => {
        if (val === 0) {
          return '未生效'
        }
        if (val === 1) {
          return '生效中'
        }
        if (val === 2) {
          return '已过期'
        }

        return ' '
      }
    },
    {
      label: '创建人',
      prop: 'createName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
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

const getTableColumns = async () => {
  const columns = [
    {
      label: '反馈时间',
      prop: 'createTime'
    },
    {
      label: '甲方名称',
      prop: 'partyACompany'
    },
    {
      label: '反馈内容',
      prop: 'content'
    },
    {
      label: '相关附件',
      prop: 'fileId',
      type: 'slot'
    }
  ]

  return columns
}
export { getColumns, getTableColumns }
