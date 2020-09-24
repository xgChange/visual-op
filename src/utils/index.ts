/**
 * @description 一些工具函数
 */

export function paramsToObj(str: string, reg = /([a-zA-Z0-9]+)=([a-zA-Z0-9]+)/g) {
  const paramsObj: {
    [index: string]: string
  } = {}

  str.replace(reg, (...arg) => {
    const [, $1, $2] = arg
    paramsObj[`${$1}`] = $2
    return ''
  })

  return paramsObj
}
