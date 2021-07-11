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