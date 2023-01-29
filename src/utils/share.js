import { isEmptyObject } from '@/utils/tool'

export function getLastPath(route) {
  let index = 2
  const { params, path } = route
  if (isEmptyObject(params)) index = 1
  const pathList = path.split('/')
  const lastPath = pathList[pathList.length - index]
  return lastPath
}
