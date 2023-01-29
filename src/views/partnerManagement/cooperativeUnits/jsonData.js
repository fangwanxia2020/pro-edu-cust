import { selectDictLabel, getDictMultiple, getOptions } from '@/utils/tool'
import store from '@/store'
import { enterpriseTypeTemplateList } from '@/api/applyOcupancy/process'

const getColumns = async () => {
  // const { sys_customer_type: customerType } = await getDictMultiple(['sys_customer_type'])
  const res = await enterpriseTypeTemplateList({ type: 3 })
  const customerType = getOptions(res.data.records, 'name', 'enterpriseTypeTemplateId')
  const columns = [
    {
      label: '单位类型',
      prop: 'templateId',
      baseSearch: true,
      formFormat: {
        type: 'select',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '请选择',
          required: false,
          showLabel: true,
          width: '100%',
          options: customerType,
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '/basic/system/dict/data/dictType/sys_customer_type',
          interfaceParam: '{}',
          interfaceId: '',
          interfaceType: 'get',
          resList: 'data',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          key: 1608804132002,
          model: 'templateId',
          rules: []
        }
      },
      formatter(val, column) {
        return column.customerTypeName || '-'
      }
    },
    {
      label: '单位名称',
      prop: 'supplierName',
      baseSearch: true
    },
    {
      label: '联系地址',
      prop: 'detailAddress'
    },
    {
      label: '合作单位等级', // 暂无
      prop: 'partnerLevelId',
      formFormat: {
        type: 'select',
        icon: 'icon-select',
        name: '下拉选择',
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: '请选择',
          required: false,
          showLabel: true,
          width: '100%',
          options: customerType,
          filterable: false,
          optionDataType: 2,
          interfaceMethod: '/system/level/list',
          interfaceParam: '{}',
          interfaceId: '',
          interfaceType: 'get',
          resList: 'data.records',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'partnerLevelId',
            label: 'levelName'
          },
          key: 1608804132002,
          model: 'partnerLevelId',
          rules: []
        }
      },
      formatter(val, column) {
        return column.levelName || '-'
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
