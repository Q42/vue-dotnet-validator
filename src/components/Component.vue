<template>
  <div>
    <h2>Vue App</h2>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component';

export default class Counter extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}
</script>

<style lang="scss">
</style>
