export function getAddJson() {
  return {
    list: [
      {
        type: 'input',
        icon: 'icon-input',
        name: '栏目名称',
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
          interfaceId: 1666780967000
        },
        key: 1666769969000,
        model: 'columnName',
        rules: [
          {
            type: 'string',
            message: '请输入字符串类型数据'
          },
          {
            required: true,
            message: '栏目名称不能为空'
          }
        ]
      },
      // {
      //   type: 'select',
      //   icon: 'icon-select',
      //   name: '面向市场',
      //   flag: 0,
      //   options: {
      //     multiple: false,
      //     borderRadius: 'no',
      //     defaultValue: '',
      //     disabled: false,
      //     clearable: false,
      //     placeholder: '',
      //     required: true,
      //     showLabel: false,
      //     width: '',
      //     options: [
      //       {
      //         value: '选项1'
      //       },
      //       {
      //         value: '选项2'
      //       },
      //       {
      //         value: '选项3'
      //       }
      //     ],
      //     filterable: false,
      //     optionDataType: 2,
      //     interfaceMethod: '/goods/shopShelves/listNoPage',
      //     interfaceParam: '{"status":1}',
      //     interfaceId: 1668591387000,
      //     resList: 'data',
      //     interfaceType: 'post',
      //     tipFont: '',
      //     dictKey: '',
      //     props: {
      //       value: 'shopShelvesId',
      //       label: 'shelvesName'
      //     }
      //   },
      //   key: 1666780694000,
      //   model: 'shopShelvesId',
      //   rules: [
      //     {
      //       required: true,
      //       message: '面向市场不能为空'
      //     }
      //   ]
      // },
      {
        type: 'editor',
        icon: 'icon-fuwenbenkuang',
        name: '内容',
        flag: 1,
        options: {
          defaultValue: '',
          width: '',
          action: 'file/file/upload',
          actionParams: '',
          maxSize: 5,
          resFormat: '',
          required: true,
          interfaceId: 1668591325000
        },
        key: 1666769993000,
        model: 'columnNote',
        rules: [
          {
            required: true,
            message: '内容不能为空'
          }
        ]
      },
      {
        type: 'imgupload',
        icon: 'icon-tupian',
        name: '附件',
        flag: 0,
        options: {
          resFormat: 'data',
          borderRadius: 'no',
          maxSize: 5,
          isAvatar: false,
          canUploadFile: true,
          uploadFileText: '选择附件',
          defaultValue: [],
          listWidth: 100,
          listHeight: 100,
          width: '',
          disabled: false,
          length: 1,
          isDelete: true,
          required: false,
          tipFont: '',
          isShow: true,
          action: 'file/file/upload',
          actionParams: '',
          isOriginalData: true,
          fileNameKey: 'name',
          fileUrlNameKey: 'url',
          fileIdKey: 'fileId',
          fileIdsIsString: true,
          fileIdsToString: ',',
          isVideo: false
        },
        key: 1666770011000,
        model: 'fileInfoList',
        rules: []
      }
    ],
    config: {
      id: 'form_1606383079000',
      labelWidth: 100,
      labelPosition: 'right',
      size: 'medium',
      formName: '模板表单'
    }
  }
}
