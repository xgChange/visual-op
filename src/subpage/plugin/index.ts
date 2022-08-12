import Vue from 'vue'
const req = require.context('@/subpage/components', true, /index\.ts/)
const requireAll = (context: any) => {
  return context.keys().map(context)
}

const AllComponents = requireAll(req)
const ComponentsObj = AllComponents.reduce((cur: any, next: any) => {
  return Object.assign(cur, next)
}, {})

for (const i in ComponentsObj) {
  Vue.component(i, ComponentsObj[i])
}

export const ComponentsKeys = AllComponents.reduce((cur: any, next: any) => {
  return cur.concat(Object.keys(next))
}, [])
