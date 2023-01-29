import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { sys_source: sysSource, sys_follow_remind_type: sysFollowRemindType } =
    await getDictMultiple(['sys_source', 'sys_follow_remind_type'])
  const columns = [
    // {
    //   label: '跟进时间',
    //   prop: 'followTime',
    //   type: 'dateTime',
    //   width: 180,
    //   baseSearch: true
    //   //   sortable: true,
    //   //   showOverflowTooltip: true,
    // },
    {
      label: '事项来源',
      prop: 'source',
      formatter(val) {
        return selectDictLabel(sysSource, val) || '-'
      }
    },
    {
      label: '跟进内容',
      prop: 'note'
    },
    {
      label: '跟进人',
      prop: 'follower',
      baseSearch: true
    },
    {
      label: '跟进事项',
      prop: 'type',
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
          interfaceMethod: '/basic/system/dict/data/dictType/sys_follow_remind_type',
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
          model: 'type',
          rules: []
        }
      },
      formatter(val) {
        return selectDictLabel(sysFollowRemindType, val) || '-'
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
      label: '查阅状态',
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
              value: '0',
              label: '未读'
            },
            {
              value: '1',
              label: '已读'
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
        return val === 0 ? '未读' : '已读'
      }
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation'
    }
  ]
  return columns
}

export default getColumns
