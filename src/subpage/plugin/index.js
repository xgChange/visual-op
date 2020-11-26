import Vue from 'vue'
const req = require.context('@/subpage/components', true, /index\.ts/)
const requireAll = context => {
  return context.keys().map(context)
}

const AllComponents = requireAll(req)
// const IInput = AllComponents[2].IInput
const ComponentsKeys = AllComponents.reduce((cur, next) => {
  return cur.concat(Object.keys(next))
}, [])

// Vue.component('IInput', IInput)
AllComponents.forEach((item, index) => {
  Vue.component(ComponentsKeys[index], item)
})
console.dir(Vue)
