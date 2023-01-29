import { selectDictLabel, getDictMultiple } from '@/utils/tool'

const getColumns = async () => {
  const { sys_apply_auth: sysApplyAuth, sys_audit_status: sysAuditStatus } = await getDictMultiple([
    'sys_apply_auth',
    'sys_audit_status'
  ])
  const columns = [
    {
      label: '时间',
      prop: 'createTime'
    },
    {
      label: '申请人手机',
      prop: 'projectParticipantPhone'
    },
    {
      label: '申请权限',
      prop: 'visitType',
      formatter(val) {
        return selectDictLabel(sysApplyAuth, val) || '-'
      }
    },
    {
      label: '协同任务',
      prop: 'projectMissionName'
    },
    {
      label: '验证信息',
      prop: 'content'
    },
    {
      label: '审核状态',
      prop: 'status',
      formatter(val) {
        return selectDictLabel(sysAuditStatus, val) || '-'
      }
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: 120,
      fixed: 'right'
    }
  ]
  return columns
}

export default getColumns
