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

h1,
h2 {
  font-family: 'Balsamiq Sans';
  font-style: normal;
  line-height: normal;
}

h1 {
  font-weight: 700;
  font-size: 48px;
}

h2 {
  font-weight: 400;
  font-size: 32px;
}

p {
  font-family: Segoe UI;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: justify;
}

a {
  text-decoration: none;
}

.card-block {
  padding: 28px;
  position: relative;
}
</style>