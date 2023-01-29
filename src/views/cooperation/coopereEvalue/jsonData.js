import { selectDictLabel, getDictMultiple } from '@/utils/tool'

const getColumns = async (unitList) => {
  const { sys_satisfy_level: sysSatisfyLevel } = await getDictMultiple(['sys_satisfy_level'])
  const columns = [
    {
      label: '负责事项名称',
      prop: 'missionName',
      baseSearch: true,
      formFormat: {
        type: 'input',
        options: {
          placeholder: '请输入负责事项名称'
        }
      }
    },
    {
      label: '负责实施单位',
      prop: 'requireCompletionUnit',
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
          placeholder: '请选择负责实施单位',
          required: false,
          showLabel: true,
          width: '100%',
          options: unitList,
          filterable: true,
          optionDataType: 1, // 1-静态数据 2-动态数据
          interfaceMethod: 'url',
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
      label: '要求落地完成时间',
      prop: 'requireCompletionTime',
      formatter(val) {
        return val ? val.split(' ')[0] : '-'
      }
    },
    {
      label: '满意度',
      prop: 'evaluateScore',
      formFormat: {
        type: 'select',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '请选择满意度',
          required: false,
          showLabel: true,
          width: '100%',
          options: [],
          filterable: false,
          optionDataType: 2, // 1-静态数据 2-动态数据
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
        model: 'cooperativeModel',
        rules: []
      },
      formatter(val) {
        return selectDictLabel(sysSatisfyLevel, val) || '-'
      }
    },
    {
      label: '合作评价',
      prop: 'content'
    },
    {
      label: '评价人',
      prop: 'evaluatePeopleName'
    },
    {
      label: '评价时间',
      prop: 'evaluateTime'
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 100,
      fixed: 'right'
    }
  ]
  return columns
}

export default getColumns
