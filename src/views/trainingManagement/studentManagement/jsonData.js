import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { sys_nation_type: snt, sys_sex_type: type } = await getDictMultiple([
    'sys_nation_type',
    'sys_sex_type'
  ])
  const columns = [
    {
      prop: 'studentNum',
      label: '学号'
    },
    {
      prop: 'studentName',
      label: '学生姓名'
    },
    {
      prop: 'sex',
      label: '性别',
      formatter: (val) => {
        if (val == null) {
          return '-'
        }
        return selectDictLabel(type, val)
      }
    },
    {
      prop: 'birthDate',
      label: '出生日期'
    },
    {
      prop: 'nation',
      label: '民族',
      formatter: (val) => {
        return selectDictLabel(snt, val) || '-'
      }
    },
    {
      prop: 'mobilePhone',
      label: '手机号码'
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
