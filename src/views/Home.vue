<template>
  <div>这是home{{ a() }}</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Home extends Vue {
  get a() {
    return () => {
      return 213
    }
  }
}
</script>

<style scoped lang="scss"></style>
