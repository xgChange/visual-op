import { shallowMount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld'

describe('hello world', () => {
  it('test', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        myName: '123',
      },
    })
    const btn = wrapper.find('#my_btn')
    btn.trigger('click')
    expect(wrapper.vm.$data.count).toBe(2)
  })
})
