import { selectDictLabel, getDictMultiple, getParent } from '@/utils/tool'
import store from '@/store'

const getColumns = async () => {
  const columns = [
    {
      label: '收发',
      prop: 'transceiver',
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
          options: [],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: '/basic/system/dict/data/dictType/cooper_supplier_type',
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
        model: 'supplierType',
        rules: []
      }
      // formatter(val) {
      //   return selectDictLabel(cooper_supplier_type, val) || '-'
      // },
    },
    {
      label: '消息标题',
      prop: 'msgTitle',
      baseSearch: true
    },
    {
      label: '发信人',
      prop: 'sender'
      // formatter: (val) => {
      //   let arr = getParent(Number(val),"addrFullname")
      //   return arr[2]
      // },
    },
    {
      label: '标题',
      prop: 'title',
      baseSearch: false
    },
    {
      label: '发送时间',
      prop: 'sendTime',
      baseSearch: false
    },
    {
      label: '状态',
      prop: 'status'
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

export { getColumns }
