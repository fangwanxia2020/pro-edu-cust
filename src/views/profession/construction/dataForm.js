export function dataForm() {
  return {
    list: [
      {
        type: 'textarea',
        icon: 'icon-diy-com-textarea',
        name: '多行文本',
        flag: 0,
        options: {
          borderRadius: 'no',
          width: '100%',
          defaultValue: '',
          row: 5,
          required: false,
          disabled: false,
          pattern: '',
          minlength: '',
          patternTips: '',
          tipFont: '',
          maxlength: '140',
          placeholder: ''
        },
        key: 1663749212000,
        model: 'textarea_1663749212000',
        prop: {
          relation: [
            {
              templateServiceInterfaceId: null,
              attrKey: null
            }
          ]
        },
        rules: []
      },
      {
        type: 'slot',
        icon: 'icon-wenzishezhi-',
        name: '',
        flag: 1,
        options: {
          width: '80%',
          slotName: 'slotRemark',
          defaultValue: '',
          required: false,
          validator: '',
          hideLabel: false
        },
        key: 1663749208000,
        model: 'slot_1663749208000',
        prop: {
          relation: [
            {
              templateServiceInterfaceId: null,
              attrKey: null
            }
          ]
        },
        rules: []
      },
      {
        type: 'input',
        icon: 'icon-input',
        name: '单行文本',
        flag: 0,
        options: {
          clearable: false,
          showText: false,
          width: '100%',
          defaultValue: '',
          required: false,
          dataType: 'string',
          maxlength: '',
          minlength: '',
          validator: '',
          pattern: '',
          patternTips: '',
          placeholder: '',
          disabled: false,
          hide: false,
          tipFont: '',
          mouseTips: '',
          borderRadius: 'no'
        },
        key: 1663749209000,
        model: 'input_1663749209000',
        prop: {
          relation: [
            {
              templateServiceInterfaceId: null,
              attrKey: null
            }
          ]
        },
        rules: [
          {
            type: 'string',
            message: '请输入字符串类型数据'
          }
        ]
      }
    ],
    config: {
      id: 'form_1663748655000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}
