import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { sys_source: sysSource } = await getDictMultiple(['sys_source'])
  const columns = [
    {
      label: '联系人姓名',
      prop: 'nickName',
      baseSearch: true
    },
    {
      label: '手机号码',
      prop: 'phone',
      baseSearch: true
    },
    {
      label: '单位名称',
      prop: 'unit',
      baseSearch: false
    },
    {
      label: '状态',
      prop: 'status',
      formatter: (val) => {
        return val === 0 ? '已邀请，待确认' : '已完成'
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
