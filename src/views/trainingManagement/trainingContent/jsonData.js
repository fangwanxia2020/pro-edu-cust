import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { training_type: type } = await getDictMultiple(['training_type'])
  const columns = [
    {
      prop: 'trainingContent',
      label: '培训内容'
    },
    {
      prop: 'trainingType',
      label: '培训分类',
      formatter: (val) => {
        return selectDictLabel(type, val) || '-'
      }
    },
    {
      prop: 'trainingTeacherNameList',
      label: '培训老师'
    },
    {
      prop: 'time',
      label: '培训时间',
      formatter(val, row) {
        return `${row.trainingStartTime.split(' ')[0]}~${row.trainingEndTime.split(' ')[0]}`
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
