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
      prop: 'customerTypeName',
      baseSearch: true
    },
    {
      label: '被授信单位',
      prop: 'customerName',
      baseSearch: true
    },
    {
      label: '授信类型',
      prop: 'creditsSource',
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
          options: [
            {
              value: 1,
              label: '新建'
            },
            {
              value: 2,
              label: '客户申请'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
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
          model: 'creditsSource',
          rules: []
        }
      },
      formatter(val, column) {
        if (val === 1) {
          return '新建'
        }
        if (val === 2) {
          return '客户申请'
        }
        return '-'
      }
    },
    {
      label: '合作单位授信额度(元)', // 暂无
      prop: 'creditQuota'
    },
    {
      label: '已用授信额度(元)', // 暂无
      prop: 'useQuota'
    },
    {
      label: '剩余授信额度(元)', // 暂无
      prop: 'surplusQuota'
    },
    {
      label: '审核状态',
      prop: 'auditStatus',
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
          options: [
            {
              value: 0,
              label: '待审核'
            },
            {
              value: 1,
              label: '审核通过'
            },
            {
              value: 2,
              label: '审核不通过'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
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
          model: 'auditStatus',
          rules: []
        }
      },
      formatter(val, column) {
        if (val === 0) {
          return '待审核'
        }
        if (val === 1) {
          return '审核通过'
        }
        if (val === 2) {
          return '审核不通过'
        }
        return '-'
      }
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '更新时间',
      prop: 'updateTime'
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

const recordColumns = [
  {
    label: '被授信单位',
    prop: 'customerName',
    width: '100'
  },
  {
    label: '授信类型',
    prop: 'changeSourceName',
    width: '100'
  },
  {
    label: '操作类型',
    prop: 'changeTypeName',
    width: '100'
  },
  {
    label: '操作内容',
    prop: 'opContent',
    width: '200'
  },
  {
    label: '我的授信额度 (元)',
    prop: 'beforeChangeQuota',
    width: '150'
  },
  {
    label: '已用授信额度 (元)',
    prop: 'beforeUseQuota',
    width: '150'
  },
  {
    label: '剩余授信额度 (元)',
    prop: 'beforeSurplusQuota',
    width: '150'
  },
  {
    label: '审核状态',
    prop: 'auditStatusName',
    width: '100'
  },
  {
    label: '审核人',
    prop: 'auditUserName',
    width: '100'
  },
  {
    label: '审核时间',
    prop: 'auditDate',
    width: '150'
  }
]
export { getColumns, recordColumns }
