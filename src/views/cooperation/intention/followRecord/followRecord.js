import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { sys_cooperation_model: sysCooperationModel } = await getDictMultiple([
    'sys_cooperation_model'
  ])

  const columns = [
    {
      label: '时间',
      prop: 'createTime'
    },
    {
      label: '描述',
      prop: 'note'
    },
    {
      label: '合作模式',
      prop: 'cooperativeModel',
      formatter(val) {
        return selectDictLabel(sysCooperationModel, val) || '-'
      }
    },
    {
      label: '专业名称',
      prop: 'majorName'
    },
    {
      label: '企业名称',
      prop: 'orgName'
    },
    {
      label: '联系人',
      prop: 'contactName'
    },
    {
      label: '联系电话',
      prop: 'contactPhone'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 150,
      fixed: 'right'
    }
  ]
  return columns
}

export default getColumns
