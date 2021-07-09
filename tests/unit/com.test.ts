import { shallowMount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld'

describe('hello world', () => {
  it('test', async () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        myName: '123',
      },
    })
    const btn2 = wrapper.find('#my_btn')
    const span1 = wrapper.find('.span1')
    expect(span1.text()).toContain('1')
    await btn2.trigger('click')
    expect(span1.text()).toContain('2')
  })
})
