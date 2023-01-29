/**
 * 跳转新页面，挂载在 Vue.prototype.navigater，引用时直接用 this，可传多个相同键的参数
 * @param {string|import('vue-router').Location} arg1 路由路径或路由配置对象
 * @param {Object} query 参数
 * @example <caption>使用说明</caption>
 * // 1
 * this.navigater("/newPage")
 * // 2
 * this.navigater("/newPage", { id:123 })
 * // 3
 * this.navigater({ path:'/newPage', query: { id: 123 } })
 * // 4 => ?ids=123&ids=456
 * this.navigater({ path:'/newPage', query: { ids: [123, 456] } })
 */
const navigater_ = function (arg1, query) {
  const { type } = this
  const routerConfig = { path: '' }
  /**
   * 格式化请求参数
   * @param {Object} query 参数对象
   * @returns {string} 格式化请求参数字符串
   */
  // eslint-disable-next-line no-shadow
  const getFormatQueryStr = (query) => {
    const urlSearchParams = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (type.arr(value)) {
        value.forEach((v) => urlSearchParams.append(key, v || ''))
      } else {
        urlSearchParams.append(key, value || '')
      }
    })
    return urlSearchParams.toString()
  }
  if (type.str(arg1)) {
    routerConfig.path = arg1 || ''
  } else if (type.obj(arg1)) {
    const { path, query: query2, ...config } = arg1
    const formatParamsStr = type.obj(query2) ? getFormatQueryStr(query2) : ''
    Object.assign(routerConfig, {
      path: path || `?${formatParamsStr}`,
      ...config
    })
  }
  if (type.obj(query)) {
    routerConfig.path += `?${getFormatQueryStr(query)}`
  }
  this.$router.push(routerConfig)
}

// 返回上一页面
/*
使用说明
1.挂载在Vue.prototype.navigater,引用时直接用this';
2.goback()

案例
1.商户：活动管理->新增,修改页面返回
*/
const goback_ = function () {
  this.$router.go(-1)
}

/*
跳转新页面使用说明
1.挂载在Vue.prototype.newWindow,引用时直接用this';
2.newWindow("NewPageName") newWindow("NewPageName",{id:123}) newWindow({path:'/newPage',query:{id:123}})

*/
const newWindow_ = function (arg1, arg2) {
  let config = {}
  if (this.type.str(arg1)) {
    config.name = arg1
  } else if (this.type.obj(arg1)) {
    config = { ...config, ...arg1 }
  }
  if (this.type.obj(arg2)) {
    config.query = arg2
  }
  const { href } = this.$router.resolve(config)
  let baseUrl = window.location.href.split('#')[0] + href
  window.open(baseUrl, '_blank')
}

/*
 * @param {string|import('vue-router').Location} arg1 路由路径或路由配置对象
 * @param {Object} arg2 参数
 * @example <caption>使用说明</caption>
 * 返回页面使用说明
 * 1.挂载在Vue.prototype.goBackRouter,引用时直接用this';
 * 2.先判断是否有上一页，有则返回到上一页，没有则跳转到指定页面
 * 3.goBackRouter("/newPage") goBackRouter("/newPage",{id:123}) goBackRouter({path:'/newPage',query:{id:123}})
 */
const goBackRouter_ = function (arg1, arg2) {
  if (window.history.length <= 1) {
    // eslint-disable-next-line prefer-rest-params
    navigater_.apply(this, arguments)
    return false
  }
  this.$router.go(-1)
  return true
}

/**
 * 过滤时间显示
 */
// 20181105
const toTime = function (time) {
  if (time == null) {
    return
  }
  let index = time.indexOf(' ')
  time = time.substring(0, index).replace(/-/g, '')
  // eslint-disable-next-line consistent-return
  return time
}
// 2018-11-05
const toTime1 = function (time) {
  if (time == null) {
    return ''
  }
  let index = time.indexOf(' ')
  time = time.substring(0, index)
  return time
}

/**
 *转化树形数据
 */
const tree = function tree(data, id, pid) {
  let maps = {}
  let arr = []
  data.forEach((item) => {
    maps[item[id]] = item
  })
  data.forEach((item) => {
    let p = maps[item[pid]]
    if (p) {
      ;(p.children || (p.children = [])).push(item)
    } else {
      arr.push(item)
    }
  })
  return arr
}

/*
 *树删除指定ID的层
 */
const delTreeByID = function delTreeByID(data, id, keyID, keyChild) {
  let array = []
  for (let i in data) {
    let item = data[i]
    if (item[keyID] === id) {
      data.splice(i, 1)
      return
    }
    let list = item[keyChild]
    if (list) {
      // var _list = list.concat();
      delTreeByID(list, id, keyID, keyChild)
    }
  }
}

/*
 *树删除指定ID的下一层
 */
const delTreeNextByID = function delTreeNextByID(data, id, keyID, keyChild) {
  if (id == null) {
    return
  }
  // debugger
  let array = []
  for (let i in data) {
    let item = data[i]
    if (item[keyID] === id) {
      let arr = item[keyChild]
      if (arr != null && arr.length > 0) {
        arr.splice(0, arr.length)
      }
      return
    }
    let list = item[keyChild]
    if (list) {
      // var _list = list.concat();
      delTreeNextByID(list, id, keyID, keyChild)
    }
  }
}

/**
 * 数字字典
 */
/*
 * 若有第三个参数，则加多一个全部的选项
 */
let tyDictInfo = {}
const getDictInfos = function getDictInfos(dictGropCode, name) {
  let arr = tyDictInfo ? tyDictInfo[dictGropCode] : null
  if (arr && new Date().getTime() < arr[0] + 1000 * 60 * 60) {
    let list = arr[1].concat()
    if (arguments[2] !== undefined) {
      list.unshift({ dictName: '全部', dictCode: '-1' })
    }
    this[name] = list
  }
}

/*
 *用于二次封装table的查询
 *第二个参数为回调啦，不然html调的方法拿不到值且发起多次请求
 *第三个参数status传值时，有全部的选项
 */
let dictInfo = {} // 防止发起二次
const getDictInfoSearch = function getDictInfoSearch(dictGropCode, callback, status) {
  let arr = tyDictInfo ? tyDictInfo[dictGropCode] : null
  if (arr && new Date().getTime() < arr[0] + 1000 * 60 * 60) {
    let list = arr[1].concat()
    // eslint-disable-next-line prefer-rest-params
    if (arguments[1] !== undefined) {
      list.unshift({ dictName: '全部', dictCode: '-1' })
    }
    callback(list)
    return
  }
  if (dictInfo[dictGropCode] === 1) {
    return
  }
  dictInfo[dictGropCode] = 1
  getDictInfos(
    this,
    {
      dictGropCode
    },
    (res) => {
      delete dictInfo[dictGropCode]
      if (res.dictType === 2) {
        let list = res.dictList.concat()
        if (status !== undefined) {
          list.unshift({ dictName: '全部', dictCode: '-1' })
        }
        tyDictInfo[dictGropCode] = [new Date().getTime(), res.dictList]
        callback(list)
        // return list;
      }
    },
    1
  )
}

export default {
  navigater: navigater_,
  goback: goback_,
  goBackRouter: goBackRouter_,
  newWindow: newWindow_,
  toTime,
  toTime1,
  tree,
  getDictInfos,
  delTreeByID,
  delTreeNextByID,
  getDictInfoSearch
}
