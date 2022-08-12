<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~nprogress/nprogress.css';

#app {
  width: 100%;
  height: 100%;
}
#nprogress .bar {
  background: $color-theme !important;
}
</style>
