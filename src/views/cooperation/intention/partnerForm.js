

export function partnerForm(flag = 0, isAccommodate = true) {
  let disabled = flag == 1 ? true : false;

  return {
    "list": [{
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "基本信息",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1657710879000,
      "model": "title_1657710879000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "企业名称",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": true,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1657710913000_56145",
          "model": "input_1657710913000_56145",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "企业名称不能为空"
          }]
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "编号",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1657710943000_12669",
          "model": "input_1657710943000_12669",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "联系地址",
          "flag": 0,
          "options": {
            "multiple": false,
            "borderRadius": "no",
            "defaultValue": "",
            "disabled": false,
            "clearable": false,
            "placeholder": "",
            "required": false,
            "showLabel": false,
            "width": "",
            "options": [{
              "value": "选项1"
            }, {
              "value": "选项2"
            }, {
              "value": "选项3"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1657711000000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1657710934000_17157",
          "model": "select_1657710934000_17157",
          "rules": []
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no",
            "interfaceId": 1657711007000
          },
          "key": "1657710922000_57055",
          "model": "input_1657710922000_57055",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1657710938000
      },
      "key": 1657710898000,
      "model": "grid_1657710898000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "邮编",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1657710987000_88549",
          "model": "input_1657710987000_88549",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }, {
          "type": "input",
          "icon": "icon-input",
          "name": "备注",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1657710979000_3982",
          "model": "input_1657710979000_3982",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "法人代表",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1657710978000_36170",
          "model": "input_1657710978000_36170",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "经营范围",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "maxlength": "",
            "minlength": "",
            "validator": "",
            "pattern": "",
            "patternTips": "",
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1657710976000_76362",
          "model": "input_1657710976000_76362",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1657710961000,
      "model": "grid_1657710961000",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "联系人",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1657711055000,
      "model": "title_1657711055000",
      "rules": []
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "contartPeople",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false
      },
      "key": 1657711067000,
      "model": "slot_1657711067000",
      "rules": []
    }],
    "config": {
      "id": "form_1657710860000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }


}