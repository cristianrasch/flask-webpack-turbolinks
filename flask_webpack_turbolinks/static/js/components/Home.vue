<template>
  <p class="notice">{{ msg }}</p>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hi from a SFC!'
    }
  }
}
</script>

<style scoped>
p.notice {
  color: green;
}
</style>
