import { selectDictLabel, getDictMultiple, getParent } from '@/utils/tool'
import store from '@/store'

const getColumns = async () => {
  // 0-草稿，1-待提交审核，2-待审核，3-审核通过，4-审核未通过
  const option = [
    { dictValue: 0, dictLabel: '草稿 ' },
    { dictValue: 1, dictLabel: '待提交审核 ' },
    { dictValue: 2, dictLabel: '待审核 ' },
    { dictValue: 3, dictLabel: '审核通过 ' },
    { dictValue: 4, dictLabel: '审核未通过 ' }
  ]
  const { business_type: businessType } = await getDictMultiple(['business_type'])
  const columns = [
    {
      label: '业务名称',
      prop: 'businessType',
      formatter(val) {
        return selectDictLabel(businessType, val) || '-'
      }
    },
    {
      label: '申请时间',
      prop: 'applyTime'
    },
    {
      label: '是否需要缴费',
      prop: 'progress',
      formatter(val) {
        let text = val == 0 ? '否' : '是'
        return text
      }
    },
    {
      label: '审核状态',
      prop: 'applyStatus',
      formatter(val) {
        return selectDictLabel(option, val) || '-'
      }
    },
    {
      label: '审核时间',
      prop: 'auditTime'
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

const getCompetenceColumns = async () => {
  // 0-待认证，1-认证中，2-认证通过，3-认证不通过
  const statusOption = [
    { dictValue: 0, dictLabel: '待认证 ' },
    { dictValue: 1, dictLabel: '认证中 ' },
    { dictValue: 2, dictLabel: '认证通过 ' },
    { dictValue: 3, dictLabel: '认证不通过 ' }
  ]
  const { sys_tag: sysType } = await getDictMultiple(['sys_tag'])
  const columns = [
    {
      label: '能力分类',
      prop: 'type',
      formatter(val) {
        // 1-企业资质,2-企业服务能力
        return val == 1 ? '企业资质' : val == 2 ? '企业服务能力' : '-'
      }
    },
    {
      label: '能力名称',
      prop: 'name'
    },
    {
      label: '目录',
      prop: 'catalogName'
    },

    {
      label: '发布状态',
      prop: 'publishStatus',
      formatter(val) {
        return val == 0 ? '未发布' : '已发布'
      }
    },
    {
      label: '平台认证',
      prop: 'certificationStatus',
      formatter(val) {
        return selectDictLabel(statusOption, val) || '-'
      }
    }
  ]
  return columns
}
const getLabelColumns = async () => {
  const { sys_tag: sysType } = await getDictMultiple(['sys_tag'])
  const columns = [
    {
      label: '标签分类',
      prop: 'type',
      formatter(val) {
        return selectDictLabel(sysType, val) || '-'
      }
    },
    {
      label: '标签名',
      prop: 'name'
    },
    {
      label: '标签值',
      prop: 'value'
    },

    {
      label: '描述说明',
      prop: 'note'
    }
  ]
  return columns
}

export { getColumns, getCompetenceColumns, getLabelColumns }
