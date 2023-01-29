const getColumns = async () => {
  const columns = [
    {
      label: '企业等级',
      prop: 'levelName',
      baseSearch: true
    },
    {
      label: '垫付额度范围(元)',
      prop: 'minNum',
      formatter: (val, column) => {
        return `${column.overdraftMin} ~ ${column.overdraftMax}`
      }
    },
    {
      label: '创建人',
      prop: 'createName'
    },
    {
      label: '更新人',
      prop: 'updateName'
    },
    {
      label: '更新时间',
      prop: 'updateTime'
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
