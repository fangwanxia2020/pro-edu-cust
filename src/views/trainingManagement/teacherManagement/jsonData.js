import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { uc_education: edc, sys_sex_type: type } = await getDictMultiple([
    'uc_education',
    'sys_sex_type'
  ])
  const columns = [
    {
      prop: 'teacherName',
      label: '老师姓名'
    },
    {
      prop: 'sex',
      label: '性别',
      formatter(val) {
        if (val == null) {
          return '-'
        }
        return selectDictLabel(type, val) || '-'
      }
    },
    {
      prop: 'education',
      label: '学历',
      formatter: (val) => {
        if (val == null) {
          return '-'
        }
        return selectDictLabel(edc, val) || '-'
      }
    },
    {
      prop: 'mobilePhone',
      label: '手机'
    },
    { type: 'slot', prop: 'headTeacher', label: '设为班主任' },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation'
    }
  ]
  return columns
}

export default getColumns
