/**
 * 全局工具
 * @module utils/tool
 */
import Vue from 'vue'
import router from '@/router'
import { getDicts } from '@/api/system/dict/data'
import base from '@/utils/base'
import { type } from './validate'
/* 省市区数据 */
const area = require('./json/area.json')

/**
 * 根据字典值获取字典标签
 * @param {object[]} dicts 字典
 * @param {string|number} dictValue 传入的字典值
 * @returns {string} 字典名
 */
export function selectDictLabel(dicts, dictValue) {
  const dict = dicts.find((_dict) => Number(_dict.dictValue) === Number(dictValue))
  return dict ? dict.dictLabel : ''
}

export function getOptions(data, label, value) {
  return data.map((option) => ({
    ...option,
    label: option[label],
    value: option[value]
  }))
}
export function getDictOptions(data, label, value) {
  return data.map((option) => ({
    ...option,
    dictLabel: option[label],
    dictValue: option[value]
  }))
}
/**
 * 批量获取字典
 * @param {string[]} dictTypes 多个字典数据
 * @returns {Object[]} 按传入字典数据顺序返回的字典数组
 */
export async function getDictMultiple(dictTypes) {
  const dictTypesList = dictTypes.map((dictType) => getDicts(dictType))
  const resList = await Promise.all(dictTypesList)
  const dict = {}
  dictTypes.forEach((dictType, index) => {
    dict[dictType] = resList[index].data
  })
  return dict
}

/**
 * 以当前的路由为前缀获取路由路径
 * @param {string} path 给当前的路由添加的后缀路径
 * @returns {string} 拼接后的路由路径
 */
export function getPath(path) {
  const routePath = router.currentRoute.path
  return routePath + path
}

/**
 * 根据传入选项值翻译选项标签
 * @param {Object[]} options 选项
 * @param {number|string} value 传入值
 * @return {string} 选项对应的标签名
 */
export function getOptionLabel(options, value) {
  const option = options.find((item) => item.value === value)
  const { label } = type.obj(option) ? option : {}
  return label || ''
}

/**
 * 扁平化树形数据
 * @param {Object[]} treeData 传入的树形数据
 * @param {string} [childrenName] 子节点属性名
 * @returns {Object[]} 扁平化后的列表数据
 */
/**
 * 扁平化树形数据
 * @param {object[]} tree 传入的树形数据
 * @param {string} [childrenName] 子节点属性名
 * @returns {object[]} 扁平化树形数据
 */
export function getFlatTree(tree, childrenName = 'children') {
  const copyTree = JSON.parse(JSON.stringify(tree) || [])
  /**
   * 递归函数
   * @param {object[]} tree 传入的树形数据
   * @returns {object[]} 扁平化树形数据
   */
  const fn = (_tree) => {
    return _tree.reduce((flatTree, node) => {
      const children = Array.isArray(node[childrenName]) ? node[childrenName] : []
      const nodes = []
      if (children.length) {
        nodes.push(...fn(children))
      }
      delete node.children
      nodes.push(node)
      return flatTree.concat(nodes)
    }, [])
  }
  return fn(copyTree)
}

/**
 * 组装扁平化树形数据
 * @param {Object[]} data 数据源
 * @param {string} [id='id'] id 字段名
 * @param {string} [parentId='parentId'] 父节点字段名
 * @param {string} [children='children'] 子节点字段名
 * @param {number} [rootId=0] 根 id
 * @returns {Object[]} 组装后的树形数据
 */
export function getAssembleTree(
  data,
  id = 'id',
  parentId = 'parentId',
  children = 'children',
  rootId = 0
) {
  data = Array.isArray(data) ? data : []
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter((father) => {
    // 返回每一项的子级数组
    const branchArr = cloneData.filter((child) => father[id] === child[parentId])

    if (branchArr.length) {
      father[children] = branchArr
    }

    // 返回第一层
    return father[parentId] === rootId
  })

  return treeData && treeData.length ? treeData : data
}

/**
 * 格式化树形数据
 * @param {Object[]} treeData 传入的树形数据
 * @param {Object} option 配置项
 * @param {number} [option.level] 限制树形返回多少层子级
 * @param {string} [option.levelName] 原始树形节点的层级标识
 * @param {string} [option.idName] 原始树形节点唯一标识属性名
 * @param {string} [option.oLabel] 原始树形节点的标签属性名
 * @param {string} [option.oValue] 原始树形节点的值属性名
 * @param {string} [option.label] 定义返回树形节点的标签属性名
 * @param {string} [option.value] 定义返回树形节点的值属性名
 * @param {string} [option.childrenName] 定义返回树形节点的子节点属性名
 * @returns {Object[]} 格式化后的树形数据
 */
export function getTreeOptions(treeData, option) {
  const { level, levelName, idName, oLabel, oValue, label, value, childrenName } = {
    level: null,
    levelName: 'type',
    idName: 'originalId',
    oLabel: 'data',
    oValue: 'id',
    label: 'label',
    value: 'value',
    childrenName: 'children',
    ...option
  }

  const treeOptions = treeData.map((treeOption, index) => {
    const children = treeOption[childrenName]
    const treeOptionLevel = treeOption[levelName]
    if (treeOptionLevel === level || !children || !children.length) {
      delete treeOption[childrenName]
    } else if (type.arr(children) && children.length) {
      treeOption[childrenName] = getTreeOptions(children, option)
    }

    if (!treeOption[idName]) {
      // 如果没有唯一标识则定义一个唯一标识
      treeOption[idName] = `id_${Date.now()}${index}`
    } else {
      treeOption[idName] = treeOption[idName].toString()
    }

    treeOption[label] = treeOption[oLabel]
    treeOption[value] = treeOption[oValue]

    return treeOption
  })
  return treeOptions
}

/**
 * 发送请求，使用流下载文件，防止打开窗口
 * @param {string} url 文件源地址
 * @param {string} fileName 文件名
 * @returns {Promise}
 */
export async function downloadFile(url, fileName) {
  const { request } = Vue.prototype
  const res = await request({
    url,
    methods: 'get',
    responseType: 'blob'
  })
  if (!res) return
  const a = document.createElement('a')
  const blob = new Blob([res])
  const downloadUrl = URL.createObjectURL(blob)
  a.href = downloadUrl
  a.download = fileName
  a.click()
}

/**
 * 判断是否为空值
 * @param {*} value 传入值
 * @returns {boolean}
 */
export function isEmpty(value) {
  if (['', undefined, null].includes(value)) {
    return true
  }

  const { _type_ } = base

  if (_type_.str(value)) {
    return value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '') === ''
  }

  if (_type_.num(value)) {
    return Number.isNaN(value)
  }

  if (_type_.obj(value) || _type_.arr(value)) {
    return ['[]', '{}'].includes(JSON.stringify(value))
  }

  return false
}

// 获取树形结构id
export function getTreeId(arr) {
  const ids = []
  const forFn = (_arr) => {
    _arr.forEach((item) => {
      ids.push(item.id)
      if (item.children && item.children.length) {
        forFn(item.children)
      }
    })
  }
  forFn(arr)
  return ids
}

/**
 * 获取可见节点
 * @param {object[],function} nodes 菜单路由树形数据
 * @returns {object[]}
 */
export const getVisibleNodes = (nodes, filterFn) => {
  const _filterFn = filterFn
  const copyNodes = JSON.parse(JSON.stringify(nodes)) // 为了不改变原数据结构，深拷贝一份数据
  /**
   * 递归函数
   * @param {object[]} nodes 树形数据
   * @returns {object[]}
   */
  const fn = (_nodes) =>
    _nodes.filter((node) => {
      const children = Array.isArray(node.children) ? node.children : []
      if (children.length) {
        node.children = fn(children)
      }
      if (_filterFn) {
        let filterFlag = _filterFn(node)
        return !node.hidden && filterFlag
      }
      return !node.hidden
    })

  return fn(copyNodes)
}

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10)
    } else if (typeof time === 'string') {
      let regTime = /-/gm
      time = time.replace(new RegExp(regTime), '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return timeStr
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str === 'undefined' || str === 'null') {
    return ''
  }
  return str
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  let search = params
  search.beginTime = ''
  search.endTime = ''
  if (dateRange != null && dateRange !== '') {
    // eslint-disable-next-line prefer-destructuring
    search.beginTime = `${dateRange[0]} 00:00:00`
    // eslint-disable-next-line prefer-destructuring
    search.endTime = `${dateRange[1]} 23:59:59`
  }
  return search
}

/**
 * 检测路由路径
 * @param {RegExp} pathReg 路由路径正则
 * @returns {boolean} 检测后的结果
 */
export function testPath(pathReg) {
  const { path } = router.currentRoute
  return pathReg.test(path)
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/**
 * 根据ID获取所有父级的某个属性
 * @param {JSON} 	data 	省市区数据源（默认），可以是任何树状数据
 * @param {String} 	id 		省市区ID
 * @param {String} 	key 	要查找的属性，可以是任何属性
 * @param {String} 	idKey 	ID对应的key，默认是addrCodeId
 * @param {String} 	childKey 	子级的key名，默认是children
 *
 * 使用说明：
 * 1.引入   import { getParent } from '@/util/tool';
 * 2.使用	getParent(130185,"addrFullname")
 * 			返回 => ["河北省", "河北省石家庄市", "河北省石家庄市鹿泉市"]
 *
 */

export const getParent = function (data, id, key, idKey, childKey) {
  /* 判断是否有传数据源，如果没有则采用 area 省市区数据 */
  // eslint-disable-next-line prefer-rest-params
  if (!Array.isArray(arguments[0])) {
    childKey = idKey || 'children'
    idKey = key || 'addrCodeId'
    key = id
    id = data
    data = area
  }
  let newArray = []
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    /* 查找一级 */
    if (item[idKey] == id) {
      newArray.push(item[key])
      break
    }
    /* 查找子级 */
    if (item[childKey] && item[childKey].length > 0) {
      let arr = getParent(item[childKey], id, key, idKey, childKey)
      if (arr.length != 0) {
        let _arr = [item[key]]
        newArray = _arr.concat(arr)
        break
      }
    }
  }
  return newArray
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function objectFilter(so, l) {
  let no = {}

  l.forEach((k) => {
    no[k] = so[k]
  })

  return no
}

/**
 * crud 列表中的响应函数
 * @param {Object} res 响应数据
 * @returns 响应列表数据
 */
export function resFormatFun(res) {
  if (res.code !== 200) return ''
  const resData = res.data
  const data = base.type.obj(resData) ? resData : {}
  return {
    list: data.records,
    total: data.total
  }
}

/**
 * 判断是否是空对象
 * @param {Object} object 响应数据
 * @returns {Boolean}
 */
export function isEmptyObject(object) {
  return JSON.stringify(object) === '{}'
}
