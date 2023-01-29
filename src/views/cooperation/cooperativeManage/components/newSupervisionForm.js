import * as validate from '@/utils/validate'

export default {
  list: [
    {
      type: 'input',
      icon: 'icon-input',
      name: '课件名称',
      flag: 0,
      options: {
        clearable: false,
        showText: false,
        width: '100%',
        defaultValue: '',
        required: true,
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
      key: 1637595342000,
      model: 'objName',
      rules: [
        {
          required: true,
          message: '课件名称不能为空'
        }
      ]
    },
    {
      type: 'select',
      icon: 'icon-input',
      name: '课件类型',
      flag: 0,
      options: {
        clearable: false,
        showText: false,
        width: '100%',
        defaultValue: '',
        required: true,
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
        borderRadius: 'no',
        optionDataType: 2,
        interfaceType: 'post',
        interfaceMethod: '/user/api/user/schoolCoursewareType/getSchoolCoursewareTypeList',
        interfaceParam: {
          pageNo: 1,
          pageSize: 1000
        },
        resList: 'list',
        props: {
          value: 'schoolCoursewareTypeId',
          label: 'name'
        }
      },
      key: 1637595344000,
      model: 'schoolCoursewareTypeId',
      rules: [
        {
          required: true,
          message: '请选择课件类型'
        }
      ]
    },
    {
      type: 'slot',
      icon: 'icon-select',
      name: '关联课程',
      flag: 0,
      options: {
        slotName: 'course',
        borderRadius: 'no',
        defaultValue: '',
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: '',
        required: true,
        showLabel: false,
        width: '',
        filterable: false,
        options: [],
        optionDataType: 2,
        interfaceMethod: '/common/api/power/dict/getDictListByCondition',
        interfaceParam: {
          dictGroup: 'classroom_type'
        },
        resList: 'list',
        interfaceId: 1637595543000,
        interfaceType: 'post'
      },
      key: 1637595347000,
      model: 'courseId'
    },
    {
      type: 'slot',
      icon: 'icon-input',
      name: '关联课时',
      flag: 0,
      options: {
        slotName: 'classHour',
        clearable: false,
        showText: false,
        width: '100%',
        defaultValue: '',
        required: true,
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
        borderRadius: 'no',
        interfaceId: 1637595523000
      },
      key: 1637595350000,
      model: 'objId'
    },
    {
      type: 'slot',
      icon: 'icon-select',
      name: '课件时长',
      flag: 0,
      options: {
        slotName: 'coursewareTime',
        borderRadius: 'no',
        defaultValue: '',
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: '',
        required: true,
        showLabel: false,
        width: '',
        options: [
          {
            value: 1,
            label: '可用'
          },
          {
            value: 0,
            label: '不可用'
          }
        ],
        filterable: false,
        optionDataType: 1,
        tipFont: '',
        dictKey: '',
        props: {
          value: 'dictValue',
          label: 'dictLabel'
        }
      },
      key: 1637595353000,
      model: 'content'
    },
    {
      type: 'slot',
      icon: 'icon-input',
      name: '课件',
      flag: 0,
      options: {
        slotName: 'courseware',
        clearable: false,
        showText: false,
        width: '100%',
        defaultValue: [],
        dataType: 'array',
        patternTips: '',
        placeholder: '',
        disabled: false,
        hide: false,
        tipFont: '',
        mouseTips: '',
        borderRadius: 'no',
        interfaceId: 16375955481223000
      },
      key: 1637595351238000,
      model: 'files',
      rules: [
        {
          required: true,
          message: '请上传课件'
        }
      ]
    }
  ],
  config: {
    id: 'form_1637595294000',
    labelWidth: 100,
    labelPosition: 'right',
    size: 'medium',
    column: 'column',
    formName: '表单组件'
  }
}
