interface Window {
  $subpage: Vue
}
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
