<template>
  <div :class="nightTheme ? 'bg-dark text-light' : null" class="d-flex flex-column mh-100">
    <HeaderLayout @swith-theme="switchTheme" />
    <router-view />
  </div>
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

.mh-100 {
  min-height: 100vh;
}
</style>