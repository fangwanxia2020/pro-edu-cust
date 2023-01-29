import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumnsNeed = async () => {
  const { sys_cooperation_model: sysCooperationModel } = await getDictMultiple([
    'sys_cooperation_model'
  ])

  const columns = [
    {
      label: '推荐时间',
      prop: 'createTime'
    },
    {
      label: '匹配度',
      prop: 'matching'
    },
    {
      label: '我的需求',
      prop: 'demand'
      // formatter(val) {
      //   return selectDictLabel(sysCooperationModel, val) || '-'
      // }
    },
    {
      label: '对方供给',
      prop: 'supply'
    },
    {
      label: '对方能力',
      prop: 'ability'
    },
    {
      label: '对方企业名称',
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
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 150,
      fixed: 'right'
    }
  ]
  return columns
}

export default getColumnsNeed
