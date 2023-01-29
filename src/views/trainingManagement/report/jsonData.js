import { selectDictLabel, getDictMultiple, getParent } from '@/utils/tool'
import store from '@/store'

const getTrainColumns = async () => {
  const { training_type: trainingType } = await getDictMultiple(['training_type'])
  const columns = [
    {
      label: '培训内容',
      prop: 'trainingContent'
    },
    {
      label: '培训分类',
      prop: 'trainingType',
      formatter(val) {
        return selectDictLabel(trainingType, val) || '-'
      }
    },
    {
      label: '培训老师',
      prop: 'trainingTeacherNameList'
    },
    {
      label: '培训时间',
      prop: 'trainingStartTime',
      formatter(val, row) {
        return `${row.trainingStartTime.split(' ')[0]} ~ ${row.trainingEndTime.split(' ')[0]}`
      }
    }

    // {
    //   label: '操作',
    //   prop: 'operation',
    //   type: 'operation',
    //   width: 200,
    //   fixed: 'right'
    // }
  ]

  return columns
}
const getRewardColumns = async () => {
  const { awards_type: awardType } = await getDictMultiple(['awards_type'])
  const columns = [
    {
      label: '获得日期',
      prop: 'gainTime',
      width: 200,
      formatter(val, row) {
        return val.split(' ')[0] || '-'
      }
    },
    {
      label: '获得奖项',
      prop: 'awards',
      formatter(val, row) {
        return selectDictLabel(awardType, val) || '-'
      },
      width: 200
    },
    {
      label: '老师评价',
      prop: 'comment',
      formatter(val, row) {
        return val || '-'
      }
    }
  ]

  return columns
}

const getPunishColumns = async () => {
  const { punishment_type: punishType } = await getDictMultiple(['punishment_type'])
  const columns = [
    {
      label: '获得日期',
      prop: 'gainTime',
      width: 200,
      formatter(val, row) {
        return val.split(' ')[0] || '-'
      }
    },
    {
      label: '受到处罚',
      prop: 'punishment',
      formatter(val) {
        return selectDictLabel(punishType, val) || '-'
      },
      width: 200
    },
    {
      label: '老师评价',
      prop: 'comment',
      formatter(val, row) {
        return val || '-'
      }
    }
  ]

  return columns
}
const getRecordColumns = async () => {
  const { uc_examination_evaluate: evaluate } = await getDictMultiple(['uc_examination_evaluate'])
  const columns = [
    {
      label: '考试日期',
      prop: 'examinationTime',
      formatter(val, row) {
        return val.split(' ')[0] || '-'
      }
    },
    {
      label: '考试名称',
      prop: 'examinationName'
    },
    {
      label: '考试总分',
      prop: 'totalScore'
    },
    {
      label: '考试得分',
      prop: 'testScore'
    },
    {
      label: '考试评价',
      prop: 'examinationEvaluate',
      formatter(val) {
        return selectDictLabel(evaluate, val) || '-'
      }
    }
  ]

  return columns
}
export { getTrainColumns, getRewardColumns, getPunishColumns, getRecordColumns }
