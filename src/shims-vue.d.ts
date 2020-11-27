interface Window {
  $subpage: Vue
  $editor: Vue
}
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
