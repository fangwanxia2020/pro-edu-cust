import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const getColumns = async () => {
  const { sys_source: sysSource } = await getDictMultiple(['sys_source'])
  const columns = [
    {
      label: '合作事项名称',
      prop: 'projectMissionName'
    },
    {
      label: '申请权限',
      prop: 'visitType',
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
          options: [],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '/basic/system/dict/data/dictType/sys_follow_remind_type',
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
          model: 'visitType',
          rules: []
        }
      },
      formatter(val) {
        return selectDictLabel(sysSource, val) || '-'
      }
    },
    {
      label: '协同任务',
      prop: 'projectMissionId',
      baseSearch: true
    },
    {
      label: '验证消息',
      prop: 'content',
      baseSearch: true
    },
    // {
    // label: "跟进事项",
    // prop: "type",
    // baseSearch: true,
    // formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //         defaultValue: null,
    //         multiple: false,
    //         disabled: false,
    //         clearable: true,
    //         placeholder: "请选择",
    //         required: false,
    //         showLabel: true,
    //         width: "100%",
    //         options: [],
    //         filterable: false,
    //         optionDataType: 2,
    //         interfaceMethod: "/basic/system/dict/data/dictType/sys_follow_remind_type",
    //         interfaceParam: "{}",
    //         interfaceId: "",
    //         "interfaceType": "get",
    //         "resList" : "data",
    //         tipFont: "",
    //         dictKey: "",
    //         props: {
    //             "value": "dictValue",
    //             "label": "dictLabel"
    //         },
    //         key: 1608804132002,
    //         model: "type",
    //         rules: [],

    //     }
    // },
    // formatter(val){
    //     return selectDictLabel(sys_follow_remind_type,val) || '-'
    // }
    // },
    // {
    //     label: "创建人",
    //     prop: "createName",
    // },
    // {
    //     label: "创建时间",
    //     prop: "createTime",
    // },
    {
      label: '查阅状态',
      prop: 'status',
      baseSearch: false,
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
              value: '0',
              label: '待审核'
            },
            {
              value: '1',
              label: '审核通过'
            },
            {
              value: '2',
              label: '审核不通过'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '{}',
          interfaceId: '',
          resList: 'data',
          interfaceType: '',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          key: 1608804132002,
          model: '',
          rules: []
        }
      }
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
