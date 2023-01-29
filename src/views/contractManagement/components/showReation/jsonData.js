const getColumns = async () => {
  const columns = [
    {
      label: '反馈时间',
      prop: 'createTime'
    },
    {
      label: '甲方名称',
      prop: 'createName'
    },
    {
      label: '反馈内容',
      prop: 'content'
    },
    {
      label: '相关附件',
      prop: 'fileId'
    }
  ]

  return columns
}

export default getColumns
