import { selectDictLabel, getDictMultiple } from '@/utils/tool'

const getColumns = async () => {
  const { sys_abilie_type: sysAbilieType } = await getDictMultiple(['sys_abilie_type'])
  const columns = [
    {
      label: '能力名称',
      prop: 'name'
    },
    {
      label: '分类',
      prop: 'type',
      formatter(val) {
        return selectDictLabel(sysAbilieType, val) || '-'
      }
    },
    {
      label: '发布状态',
      prop: 'publishStatus',
      formatter(val) {
        if (val == '0') return '未发布'
        if (val == '1') return '已发布'
        return '-'
      }
    },
    {
      label: '平台认证',
      prop: 'certificationStatus',
      formatter(val) {
        if (val == '0') return '待认证'
        if (val == '1') return '认证中'
        if (val == '2') return '认证通过'
        if (val == '3') return '认证不通过'
        return '-'
      }
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

export default getColumns
