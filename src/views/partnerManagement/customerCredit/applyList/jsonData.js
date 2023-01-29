const getColumns = [
  {
    label: '被授信单位',
    prop: 'customerName',
    baseSearch: true
  },

  {
    label: '授信类型',
    prop: 'changeSource',
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
          {
            value: 1,
            label: '新建'
          },
          {
            value: 2,
            label: '客户申请'
          }
        ],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: '',
        interfaceParam: '{}',
        interfaceId: '',
        interfaceType: 'get',
        resList: 'data',
        tipFont: '',
        dictKey: '',
        props: {
          value: 'dictValue',
          label: 'dictLabel'
        },
        key: 1608804132002,
        model: 'changeSource',
        rules: []
      }
    },
    formatter(val, column) {
      if (val === 1) {
        return '新建'
      }
      if (val === 2) {
        return '客户申请'
      }
      return '-'
    }
  },
  {
    label: '申请类型', // 暂无
    prop: 'changeType',
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
            value: 1,
            label: '首次申请额度'
          },
          {
            value: 2,
            label: '申请提额'
          }
        ],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: '',
        interfaceParam: '{}',
        interfaceId: '',
        interfaceType: 'get',
        resList: 'data',
        tipFont: '',
        dictKey: '',
        props: {
          value: 'dictValue',
          label: 'dictLabel'
        },
        key: 1608804132002,
        model: 'changeType',
        rules: []
      }
    },
    formatter(val, column) {
      if (val === 1) {
        return '首次申请额度'
      }
      if (val === 2) {
        return '申请提额'
      }
      return '-'
    }
  },
  {
    label: '申请授信额度(元)', // 暂无
    prop: 'changeQuota'
  },
  {
    label: '审核状态',
    prop: 'auditStatus',
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
          {
            value: 0,
            label: '待审核'
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
        interfaceType: 'get',
        resList: 'data',
        tipFont: '',
        dictKey: '',
        props: {
          value: 'dictValue',
          label: 'dictLabel'
        },
        key: 1608804132002,
        model: 'auditStatus',
        rules: []
      }
    },
    formatter(val, column) {
      if (val === 0) {
        return '待审核'
      }
      if (val === 1) {
        return '审核通过'
      }
      if (val === 2) {
        return '审核不通过'
      }
      return '-'
    }
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '更新时间',
    prop: 'updateTime'
  },

  {
    label: '操作',
    prop: 'operation',
    type: 'operation',
    width: 200,
    fixed: 'right'
  }
]

export default getColumns
