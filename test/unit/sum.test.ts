import { sums } from '../sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sums(1, 2)).toEqual({ name: '这是信息1', age: '18' })
})

test('测试空值情况', () => {
  const n = null
  expect(n).toBeNaN()
})
