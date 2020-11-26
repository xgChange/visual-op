const req = require.context('@/subpage/components', true, /index\.ts/)
const requireAll = (context: any) => {
  return context.keys().map(context)
}

const AllComponents = requireAll(req)
const ComponentsObj = AllComponents.reduce((cur: any, next: any) => {
  return Object.assign(cur, next)
}, {})

export default ComponentsObj
