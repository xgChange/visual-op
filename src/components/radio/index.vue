<template>
  <div class="myRadio-container">
    <a-radio-group v-model="model" @change="onChange">
      <a-radio :value="item" v-for="(item, index) in value" :key="index">
        {{ item }}
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class MyRadio extends Vue {
  @Prop({ type: Array, default: () => [] }) value!: string[]
  @Prop({ type: String, default: '' }) typeName!: string

  private model = this.value[0]

  onChange(v: any) {
    this.$emit('radioChange', {
      typeName: this.typeName,
      data: v.target.value
    })
  }
}
</script>

<style lang="scss" scoped></style>
