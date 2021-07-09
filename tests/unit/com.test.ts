import { mount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld'

describe('hello world', () => {
  const wrapper = mount(HelloWorld)

  it('test', () => {
    expect(wrapper.html()).toContain('<span>hello world </span>')
  })
})
