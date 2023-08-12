<template>
  <HeaderLayout @swith-theme="switchTheme" />
  <router-view class="view" :class="nightTheme ? 'bg-dark text-light' : ''" />
</template>

<script>
import HeaderLayout from './components/HeaderLayout.vue';

export default {
  name: 'App',
  components: {
    HeaderLayout
  },
  data() {
    return {
      nightTheme: localStorage.nightTheme ? JSON.parse(localStorage.nightTheme) : false
    }
  },
  methods: {
    switchTheme(newTheme) {
      this.nightTheme = newTheme
    }
  }
}
</script>

<style scoped>
  .view {
    min-height: calc(100vh - 57px);
  }
</style>