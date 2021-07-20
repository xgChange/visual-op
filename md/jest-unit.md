# jest记录的笔记

## expect.assertions(1)

确保下面的expect至少执行一次

```javascript
  test('测试异步', () => {
    expect.assertions(1)
    return fetch('/ss').then(r => {
      expect(r).toBe(1)
    })
  })
```

钩子函数

```javascript
// 其实一个describe就是一个块，里面独享这些钩子函数
// beforeAll 全局最开始
// beforeEach 每个test块执行之前
// afterEach 每个test块结束之后
// afterAll 全局结束
```

mock方法

```javascript
const fn = jest.fn() // 返回的是一个jest的mockConstructor, 可以通过fn.mock获取里面一些属性

fn.mockReturnValueOnce() // 模拟函数第一次返回值
fn.mockReturnValue('1').mockReturnValue('2') // 第一次、第二次返回
fn.instances // 当前的this指向
```

mock文件

```javascript
// 使用jest.mock('文件路径') 可以模拟文件，里面的函数可以代替，引入的函数
jest.mock('../src/http.js')
import { getData } from '../src/http'
const { handleData } = jest.requireActual('../src/http.js') // 里面的函数不使用mock，而使用真实的函数

test('测试模拟文件', () => {
    expect.assertions(1)
    return getData().then((r) => { // 此时他会去src/http同目录找 __mocks__文件夹下同名的文件，例如src/__mocks__/http.js
      expect(r).toEqual(1)
    })
})

test('测试真实函数', () => { // 这个是使用src/http下真实的handleData函数
    expect(handleData()).toEqual(21)
})
```

## 快照，snapeShot

文件类型的snapShot

```javascript
expect('').toMatchSnapshot()
```

行内的snapshot

```javascript
// 首先安装 prettier 格式化行内snapshot
expect('').toMatchInlineSnapshot()
```

