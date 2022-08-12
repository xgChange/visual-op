/**
 * @description subpage的utils方法
 */
export * from './interface'

const designFontsize = 75

export function pxToRem(px: number | string) {
  if (typeof px === 'string') {
    px = Number(px)
  }
  return px / (designFontsize / 2)
}
