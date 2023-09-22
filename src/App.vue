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

<style>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.view {
  min-height: calc(100vh - 57px);
}
</style>