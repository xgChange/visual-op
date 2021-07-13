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

