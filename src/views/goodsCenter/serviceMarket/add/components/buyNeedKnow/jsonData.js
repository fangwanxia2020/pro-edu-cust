import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { goods_column_type: goodsColumnType } = await getDictMultiple(['goods_column_type'])
  const columns = [
    {
      label: '栏目名称',
      prop: 'columnName'
    },
    {
      label: '所在目录',
      prop: 'columnType',
      formatter(val) {
        return selectDictLabel(goodsColumnType, val) || '-'
      }
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
