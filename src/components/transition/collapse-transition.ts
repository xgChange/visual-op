/**
 * @description 手风琴特效组件
 */
const transitionStyle = 'all 0.3s ease'
const transition = {
  beforeEnter(el: HTMLElement) {
    el.style.height = '0'
    // el.style.overflow = 'hidden'
    el.style.transition = transitionStyle
  },
  enter(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`
    } else {
      el.style.height = '0'
    }
  },
  beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  leave(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      el.style.height = '0'
      el.style.overflow = 'hidden'
      el.style.transition = transitionStyle
    }
  }
}
export default {
  name: 'CollapseTransition',
  functional: true,
  render(h: Vue.CreateElement, { children }: Vue.RenderContext) {
    const propsOn = {
      on: transition
    }
    return h('transition', propsOn, children)
  }
}
