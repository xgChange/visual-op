<template>
  <div>
    这是home
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Home extends Vue {
  mounted() {
    console.log('dd')
  }
}
</script>

<style></style>
