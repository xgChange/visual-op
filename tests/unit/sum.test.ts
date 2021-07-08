import { sums } from '../sum'
import fetch from 'node-fetch'

function errorFunc() {
  throw new Error('error')
}

test('adds 1 + 2 to equal 3', () => {
  expect(sums(1, 2)).toEqual({ name: '这是信息1', age: '18' })
})

test('测试空值情况', () => {
  const n = null
  expect(n).toBeNull()
})

test('error func', () => {
  expect(() => errorFunc()).toThrow()
})

test('async http', async () => {
  expect.assertions(1)
  try {
    const result1 = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const result2 = await result1.json()
    const result3 = await Promise.reject(result2.id)
    expect(result3).toBe(1)
  } catch (error) {
    expect(error).toBe(1)
  }
  // return fetch('https://jsonplaceholder.typicode.com/posts/1')
  //   .then((response) => response.json())
  //   .then((json) => Promise.reject(json))
  //   .catch((e) => {
  //     expect(e.id).toBe(1)
  //   })
})

describe('测试下describe', () => {
  test('test1', () => {
    expect(true).toBeTruthy()
  })

  test('test2', () => {
    expect(false).toBeFalsy()
  })
})
