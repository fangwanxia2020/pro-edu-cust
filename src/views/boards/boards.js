export default function getOption(seriesData = []) {
  const option = {
    xAxis: {
      type: 'category',
      data: ['场地', '设备', '原料', '专业人员', '就业岗位', '内容']
    },
    yAxis: {
      type: 'value',
      name: '招募中的专业数量'
    },
    series: [
      {
        data: seriesData,
        type: 'bar'
      }
    ]
  }
  return option
}
