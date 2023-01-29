export default function followForm(editData = {}, flag = 0, option = []) {
  return {
    list: [
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 12,
            list: [
              {
                type: 'select',
                icon: 'icon-select',
                name: '跟进事项',
                flag: 0,
                options: {
                  multiple: false,
                  borderRadius: 'no',
                  defaultValue: null,
                  disabled: false,
                  clearable: false,
                  placeholder: '',
                  required: true,
                  showLabel: false,
                  width: '',
                  options: option,
                  filterable: false,
                  optionDataType: 2,
                  interfaceMethod: '/basic/system/dict/data/dictType/sys_follow_remind_type',
                  interfaceParam: {},
                  interfaceId: '',
                  resList: 'data',
                  interfaceType: 'get',
                  tipFont: '',
                  dictKey: '',
                  props: {
                    value: 'dictValue',
                    label: 'dictLabel'
                  }
                },
                key: '1659338973000_82469',
                model: 'type',
                rules: [
                  {
                    required: true,
                    message: '跟进事项不能为空'
                  }
                ]
              }
            ]
          },
          {
            span: 12,
            list: [
              {
                type: 'date',
                icon: 'icon-date',
                name: '跟进时间',
                flag: 0,
                options: {
                  borderRadius: 'no',
                  defaultValue: '',
                  readonly: false,
                  disabled: false,
                  editable: true,
                  clearable: true,
                  placeholder: '',
                  startPlaceholder: '',
                  endPlaceholder: '',
                  tipFont: '',
                  type: 'date',
                  format: 'yyyy-MM-dd',
                  timestamp: false,
                  required: true,
                  width: '',
                  interfaceId: 1659339153000
                },
                key: '1659338980000_82747',
                model: 'followTime',
                rules: [
                  {
                    required: true,
                    message: '跟进时间不能为空'
                  }
                ]
              }
            ]
          }
        ],
        options: {
          gutter: 0,
          justify: 'start',
          align: 'top'
        },
        key: 1659338949000,
        model: 'grid_1659338949000',
        rules: []
      },
      {
        type: 'textarea',
        icon: 'icon-diy-com-textarea',
        name: '跟进内容',
        flag: 0,
        options: {
          borderRadius: 'no',
          width: '100%',
          defaultValue: '',
          row: '5',
          required: true,
          disabled: false,
          pattern: '',
          minlength: '',
          patternTips: '',
          tipFont: '',
          maxlength: '140',
          placeholder: ''
        },
        key: 16593387000,
        model: 'note',
        rules: [
          {
            required: true,
            message: '跟进内容不能为空'
          }
        ]
      },
      {
        type: 'slot',
        icon: 'icon-wenzishezhi-',
        name: '提醒谁看',
        flag: 1,
        options: {
          width: '100%',
          slotName: 'choosePeople',
          defaultValue: '',
          required: true,
          validator: '',
          hideLabel: false
        },
        key: 1659338992000,
        model: 'remindIdList',
        rules: [
          // {
          //   required: true,
          //   message: '提醒人员不能为空'
          // }
        ]
      },
      {
        type: 'switch',
        icon: 'icon-switch',
        name: '创建下次任务',
        flag: 0,
        options: {
          borderRadius: 'no',
          defaultValue: false,
          required: false,
          tipFont: '',
          disabled: false
        },
        key: 1659339000000,
        model: 'nextTast',
        rules: []
      },
      {
        type: 'date',
        icon: 'icon-date',
        name: '跟进时间',
        flag: 0,
        options: {
          borderRadius: 'no',
          defaultValue: '',
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          placeholder: '',
          startPlaceholder: '',
          endPlaceholder: '',
          tipFont: '',
          type: 'date',
          format: 'yyyy-MM-dd',
          timestamp: false,
          required: true,
          width: '100%',
          interfaceId: 1659339153000,
          hide: !editData.nextTast
        },
        key: '1659338980000',
        model: 'remindTime',
        rules: [
          {
            required: true,
            message: '跟进时间不能为空'
          }
        ]
      },
      {
        type: 'textarea',
        icon: 'icon-diy-com-textarea',
        name: '跟进内容',
        flag: 0,
        options: {
          borderRadius: 'no',
          width: '100%',
          defaultValue: '',
          row: '5',
          required: true,
          disabled: false,
          pattern: '',
          minlength: '',
          patternTips: '',
          tipFont: '',
          maxlength: '140',
          placeholder: '',
          hide: !editData.nextTast
        },
        key: 1659338987000,
        model: 'nextNote',
        rules: [
          {
            required: true,
            message: '跟进内容不能为空'
          }
        ]
      },
      {
        type: 'slot',
        icon: 'icon-wenzishezhi-',
        name: '跟进人员',
        flag: 1,
        options: {
          width: '100%',
          slotName: 'choosePeople2',
          defaultValue: '',
          required: true,
          validator: '',
          hideLabel: false,
          interfaceId: 1659339278000,
          hide: !editData.nextTast
        },
        key: 1659339023000,
        model: 'follower',
        rules: [
          // {
          //   required: true,
          //   message: '跟进人员不能为空'
          // }
        ]
      },
      {
        type: 'select',
        icon: 'icon-select',
        name: '跟进提醒',
        flag: 0,
        options: {
          multiple: false,
          borderRadius: 'no',
          defaultValue: '',
          disabled: false,
          clearable: false,
          placeholder: '',
          required: true,
          showLabel: false,
          width: '',
          options: [
            {
              value: '0',
              label: '准时提醒'
            },
            {
              value: '1',
              label: '提前5分钟'
            },
            {
              value: '2',
              label: '提前10分钟'
            },
            {
              value: '3',
              label: '提前15分钟'
            }
          ],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: '',
          interfaceParam: '',
          interfaceId: '',
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          hide: !editData.nextTast
        },
        key: 1659339055000,
        model: 'remindTimeValue',
        rules: [
          {
            required: true,
            message: '跟进提醒不能为空'
          }
        ]
      },
      {
        type: 'checkbox',
        icon: 'icon-check-box',
        name: '提醒方式',
        flag: 0,
        options: {
          borderRadius: 'no',
          inline: true,
          defaultValue: 'undefined',
          showLabel: true,
          options: [
            {
              value: 1,
              label: '系统消息'
            },
            {
              value: 2,
              label: '短信通知'
            },
            {
              value: 3,
              label: '邮件通知'
            }
          ],
          required: true,
          width: '',
          optionDataType: 1,
          interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
          interfaceParam: '{"dictType":"sys_tenant_type"}',
          interfaceId: '',
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'dictValue',
            label: 'dictLabel'
          },
          disabled: false,
          hide: !editData.nextTast
        },
        key: 1659339074000,
        model: 'remindWayList'
        // rules: [
        //   {
        //     required: true,
        //     message: '提醒方式不能为空'
        //   }
        // ]
      }
    ],
    config: {
      id: 'form_1659338944000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}
