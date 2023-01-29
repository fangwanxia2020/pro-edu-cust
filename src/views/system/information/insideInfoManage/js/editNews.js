export default function getJsonData(obj = { type: 2, title: '99' }) {
  return {
    list: [
      {
        type: 'title',
        flag: 0,
        icon: 'icon-wenzishezhi-',
        name: obj.title,
        options: {
          width: '100%',
          defaultValue: '',
          interfaceId: 7315251743371
        },
        key: 7315251743371,
        model: 'title',
        rules: []
      },
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 14,
            list: [
              {
                type: 'input',
                icon: 'icon-input',
                name: ' 消息标题',
                flag: 0,
                options: {
                  clearable: false,
                  showText: false,
                  width: '100%',
                  defaultValue: '',
                  required: true,
                  dataType: 'string',
                  maxlength: '30',
                  minlength: '',
                  validator: '',
                  pattern: '',
                  patternTips: '',
                  placeholder: '',
                  disabled: false,
                  hide: obj.type == 2,
                  tipFont: '',
                  mouseTips: '',
                  borderRadius: 'no'
                },
                key: '1625472823000_28333',
                model: 'input_1625472823000_28333',
                rules: [
                  {
                    type: 'string',
                    message: '请输入字符串类型数据'
                  },
                  {
                    required: true,
                    message: ' 消息标题不能为空'
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
        key: 1625472759000,
        model: 'grid_1625472759000',
        rules: []
      },
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 14,
            list: [
              {
                type: 'slot',
                icon: 'icon-wenzishezhi-',
                name: '接收对象',
                flag: 1,
                options: {
                  width: '100%',
                  slotName: 'selectPerson',
                  defaultValue: '',
                  required: true,
                  hide: obj.type == 1,
                  validator: '',
                  hideLabel: false
                },
                key: '1625472846000_12140',
                model: 'slot_1625472846000_12140',
                rules: [
                  {
                    required: true,
                    message: '接收对象不能为空'
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
        key: 1625472788000,
        model: 'grid_1625472788000',
        rules: []
      },
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 18,
            list: [
              {
                type: 'slot',
                icon: 'icon-wenzishezhi-',
                name: '已选人员',
                flag: 1,
                options: {
                  width: '100%',
                  slotName: 'personnelSlot',
                  defaultValue: '',
                  required: true,
                  validator: '',
                  hide: obj.type == 1,
                  hideLabel: false
                },
                key: '1625473011000_55801',
                model: 'slot_1625473011000_55801',
                rules: [
                  {
                    required: true,
                    message: '已选人员不能为空'
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
        key: 1625473004000,
        model: 'grid_1625473004000',
        rules: []
      },
      {
        type: 'grid',
        icon: 'icon-grid-',
        name: '栅格布局',
        columns: [
          {
            span: 18,
            list: [
              {
                type: 'editor',
                icon: 'icon-fuwenbenkuang',
                name: '消息内容',
                flag: 1,
                options: {
                  defaultValue: '',
                  width: '',
                  hide: obj.type == 2
                },
                key: '1625473072000_46684',
                model: 'editor_1625473072000_46684',
                rules: [
                  {
                    required: true,
                    message: '消息内容不能为空'
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
        key: 1625472794000,
        model: 'grid_1625472794000',
        rules: []
      }
    ],
    config: {
      id: 'form_1625472749000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}
