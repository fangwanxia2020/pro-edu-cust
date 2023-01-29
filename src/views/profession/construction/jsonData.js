import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const {
    sys_cooperation_status: sysCooperationStatus,
    sys_cooperation_model: sysCooperationModel,
    sys_cooperation_releaseStatus: sysCooperationReleaseStatus
  } = await getDictMultiple([
    'sys_cooperation_status',
    'sys_cooperation_model',
    'sys_cooperation_releaseStatus'
  ])
  const columns = [
    {
      label: '创建时间',
      prop: 'createTime',
      width: '200px'
    },
    {
      label: '合作模式',
      prop: 'cooperationModel',
      baseSearch: true,
      width: '140px',
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
          options: [],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: '/basic/system/dict/data/dictType/sys_cooperation_model',
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
          model: 'cooperationModel',
          rules: []
        }
      },
      formatter(val) {
        return selectDictLabel(sysCooperationModel, val) || '-'
      }
    },
    {
      label: '专业名称',
      prop: 'themeName',
      baseSearch: true,
      width: '100px'
    },
    {
      type: 'slot',
      label: '发起方提供资源',
      prop: 'resourceDescriptionDto',
      width: '415px'
    },
    {
      type: 'slot',
      label: '合作方提供资源',
      prop: 'partnerSourceDto',
      width: '415px'
    },
    {
      label: '审核状态',
      prop: 'status',
      baseSearch: false,
      width: '100px',
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
          options: [],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: '/basic/system/dict/data/dictType/sys_cooperation_status',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          key: 1608804132002,
          model: 'status',
          rules: []
        }
      },
      formatter(val) {
        return selectDictLabel(sysCooperationStatus, val) || '-'
      }
    },
    {
      label: '发布状态',
      prop: 'releaseStatus',
      baseSearch: false,
      width: '100px',
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
          options: [],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: '/basic/system/dict/data/dictType/sys_cooperation_releaseStatus',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          key: 1608804132002,
          model: 'releaseStatus',
          rules: []
        }
      },
      formatter(val) {
        return selectDictLabel(sysCooperationReleaseStatus, val) || '-'
      }
    },
    {
      label: '操作',
      prop: 'operation',
      type: 'operation',
      width: '250px'
    }
  ]
  return columns
}

export default getColumns
