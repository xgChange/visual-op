import HelloWorld from 'tests/components/HelloWorld'
import { mount } from '@vue/test-utils'

describe('hello world', () => {
  const wrapper = mount(HelloWorld)

  const vm = wrapper.vm
  it('test', () => {
    console.log(wrapper, 'sa')
  })
})
