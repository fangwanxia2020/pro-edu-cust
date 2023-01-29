import {
  selectDictLabel,
  getDictMultiple,
} from '@/utils/tool'
import { getParent } from '@/utils/tool';
import store from '@/store';

const getColumns = async() => {
  const { sys_cooperation_model } = await getDictMultiple(['sys_cooperation_model'])
  const columns = [
    {
      label: "时间",
      prop: "createTime",
      baseSearch: true,
    },
    {
      label: "描述",
      prop: "note",
      
    },
    {
      label: "合作模式",
      prop: "cooperativeModel",
      baseSearch: true,
      // formFormat: {
      //   type: "select",
      //   icon: "icon-select",
      //   name: "下拉选择",
      //   options: {
      //     defaultValue: null,
      //     multiple: false,
      //     disabled: false,
      //     clearable: true,
      //     placeholder: "所有",
      //     required: false,
      //     showLabel: true,
      //     width: "100%",
      //     options: [
           
      //     ],
      //     filterable: false,
      //     optionDataType: 2,
      //     interfaceMethod: "/basic/system/dict/data/dictType/sys_cooperation_model",
      //     interfaceParam: "{}",
      //     interfaceId: "",
      //     "resList": "data",
      //     "interfaceType": "get",
      //     tipFont: "",
      //     dictKey: "",
      //     props: {
      //       "value": "dictValue",
      //       "label": "dictLabel"
      //     },
      //   },
      //   key: 1608804132002,
      //   model: "cooperativeModel",
      //   rules: [],
      // },
      formatter(val) {
        return selectDictLabel(sys_cooperation_model, val) || '-'
      }
    },
    {
      label: "专业名称",
      prop: "majorName",
      baseSearch: true,
    },
    {
      label: "企业名称",
      prop: "orgName",
      baseSearch: true,
    },
    {
      label: "联系人",
      prop: "contactName",
      baseSearch: true,
    },
    {
      label: "联系电话",
      prop: "contactPhone",
      baseSearch: true,
    },
    {
      label: "邮箱",
      prop: "email",
    },
    {
      label: "操作",
      prop: "operation",
      type: "operation",
      width: 200,
      fixed: "right",
    },
  ];
 
  return columns;
}

export { getColumns };