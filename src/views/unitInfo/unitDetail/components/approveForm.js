export function approveForm(flag = 0) {
  let disabled = flag == 1
  return {
    list: [
      {
        type: 'radio',
        icon: 'icon-radio-active',
        name: '审核结果',
        flag: 0,
        options: {
          borderRadius: 'no',
          inline: true,
          defaultValue: 0,
          showLabel: true,
          options: [
            {
              value: '3',
              label: '审核通过'
            },
            {
              value: '4',
              label: '审核不通过'
            }
          ],
          required: false,
          width: '',
          optionDataType: 1,
          interfaceMethod: '/system/SysDictData/getChildrenItemsByDictType',
          interfaceParam: '{"dictType":"sys_tenant_type"}',
          interfaceId: 1663569538000,
          resList: 'data.records',
          interfaceType: 'get',
          tipFont: '',
          dictKey: '',
          props: {
            value: 'value',
            label: 'label'
          },
          disabled: false
        },
        key: 1663569495000,
        model: 'applyStatus',

        rules: [
          {
            required: true,
            message: '审核结果不能为空'
          }
        ]
      },
      {
        type: 'textarea',
        icon: 'icon-diy-com-textarea',
        name: '审核意见',
        flag: 0,
        options: {
          borderRadius: 'no',
          width: '100%',
          defaultValue: '',
          row: '5',
          required: false,
          disabled: false,
          pattern: '',
          minlength: '',
          patternTips: '',
          tipFont: '',
          maxlength: '140',
          placeholder: '',
          interfaceId: 1663569522000
        },
        key: 1663569522000,
        model: 'reason',
        prop: {
          relation: [
            {
              templateServiceInterfaceId: null,
              attrKey: null
            }
          ]
        },
        rules: []
      }
    ],
    config: {
      id: 'form_1663569482000',
      labelWidth: 130,
      labelPosition: 'right',
      size: 'medium',
      column: 'column',
      formName: '表单组件'
    }
  }
}
