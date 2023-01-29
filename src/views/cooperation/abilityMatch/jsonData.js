import { selectDictLabel, getDictMultiple, getParent } from '@/utils/tool'
import store from '@/store'

const getColumns = async () => {
  const columns = [
    {
      label: '推荐时间',
      prop: 'createTime',
      width: 100
    },
    {
      label: '匹配度',
      width: 100,
      prop: 'matching',
      sortable: 'custom',
      // ifAsc 匹配度升序,false 为减序 true 为升序
      formatter(val) {
        console.log('val')
        console.log(val)
        return `${val}`
      }
    },
    {
      label: '我的供给',
      prop: 'supply',
      width: 200
    },
    {
      label: '我的能力',
      prop: 'ability',
      width: 200,
      baseSearch: true
      // formatter(val) {
      //   return val ? JSON.parse(val).resourcesContent : '-'
      // }
    },
    {
      label: '对方需求',
      prop: 'demand',
      width: 200,
      baseSearch: true
    },
    {
      label: '对方企业名称',
      prop: 'orgName',
      width: 150,
      baseSearch: true
    },
    {
      label: '联系人',
      prop: 'contactName',
      width: 80,
      baseSearch: true
    },
    {
      label: '联系电话',
      prop: 'contactPhone',
      width: 80,
      baseSearch: true
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
