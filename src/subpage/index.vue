<template>
  <div class="subpage">
    这是subpage
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class SubPage extends Vue {
  //
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';
.subpage {
  font-size: rem(37.5);
}
</style>
