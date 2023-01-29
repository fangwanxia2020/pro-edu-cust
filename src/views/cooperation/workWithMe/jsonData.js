const getColumns = async function (arr) {
  console.log(arr, 'arrrlllll')
  const columns = [
    {
      label: '负责事项名称', // 字段名
      prop: 'missionName', // 字段key
      baseSearch: true
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
          placeholder: '所有',
          required: false,
          showLabel: true,
          width: '100%',
          options: arr,
          filterable: true,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '',
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
        model: 'activityStatus',
        rules: []
      }
    },
    {
      label: '要求落地完成时间',
      prop: 'requireCompletionTime',
      type: 'date'
    },
    // {
    //   label: '出发日期',
    //   prop: 'requireCompletionTime',
    //   type: 'date'
    // },
    {
      label: '负责人',
      prop: 'requireCompletionPeople'
    },
    {
      label: '目标描述',
      prop: 'missionNote'
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
