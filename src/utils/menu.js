export function foo(parent, children) {
  const keys = ['T', 'F']
  if (!children && parent instanceof Array) {
    children = parent
  }
  let arr = []
  children.forEach((item, idx) => {
    if (item.children instanceof Array) foo(item, item.children)
    if (keys.includes(item.menuType)) {
      const prop = item.menuType
      parent[prop] = parent[prop] || []
      parent[prop].push(item)
      arr.push(idx)
    }
  })
  if (arr.length > 0) {
    let num = 1
    arr.forEach((item, idx) => {
      parent.children.splice(arr.length - idx - num, 1)
    })
  }
  return parent
}

export function authShow(menuList, authList) {
  menuList.forEach((item) => {
    if (item.children instanceof Array) authShow(item.children, authList)
    if (authList.includes(item.id)) {
      item.authValue = true
    } else {
      item.authValue = false
    }
  })
  return menuList
}
export function test(list) {
  list.forEach((item) => {
    if (item.children instanceof Array && item.children.length > 0) {
      test(item.children)
    } else {
      if (item.F instanceof Array) {
        let bool = item.F.every((items) => {
          return items.authValue == true
        })
        if (bool) {
          item.FAuthValue = true
        } else {
          item.FAuthValue = false
        }
      }
      if (item.F instanceof Array) {
        let bool = item.T.every((Titems) => {
          return Titems.authValue == true
        })
        if (bool) {
          item.TAuthValue = true
        } else {
          item.TAuthValue = false
        }
      }
    }
    if (item.FAuthValue && item.TAuthValue) {
      item.allAutoValue = true
    } else {
      item.allAutoValue = false
    }
  })
  return list
}
