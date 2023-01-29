import { selectDictLabel, getDictMultiple, getParent } from '@/utils/tool'
import store from '@/store'

const getColumns = async () => {
  const option = [
    { dictValue: 0, dictLabel: '待发布 ' },
    { dictValue: 1, dictLabel: '进行中 ' },
    { dictValue: 2, dictLabel: '已发布 ' },
    { dictValue: 3, dictLabel: '已取消 ' }
  ]
  const columns = [
    {
      label: '合作项目名称',
      prop: 'projectName',
      baseSearch: true
    },
    {
      label: '合作单位名称',
      prop: 'partnerName',
      baseSearch: true,
      formatter(val) {
        return val || '-'
      }
    },
    {
      label: '整体完成进度',
      prop: 'progress',
      formatter(val) {
        let text = val ? `${val}%` : '0%'
        return text
      }
    },
    {
      label: '创建日期',
      prop: 'createTime',
      formFormat: {
        type: 'slot',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          slotName: 'createTime',
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '所有',
          required: false,
          showLabel: true,
          width: '100%',
          options: [
            { value: '0', label: '待发布 ' },
            { value: '1', label: '进行中 ' },
            { value: '2', label: '已发布 ' },
            { value: '3', label: '已取消 ' }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '/basic/system/dict/data/dictType/sys_cooperation_model',
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

export default getColumns
