import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EmitterMixins extends Vue {
  dispatch(comName: string, eventName: string, ...args: string[]) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent && (!name || name !== comName)) {
      parent = parent.$parent
      if (parent) {
        name = parent.$options.name
      }
    }

    if (parent) {
      parent.$emit.apply(parent, [eventName, args])
    }
  }
}
