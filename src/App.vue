<template>
  <HeaderLayout @swith-theme="switchTheme" />
  <div :class="nightTheme ? 'bg-dark text-light' : ''">
    <AboutLayout />
    <InstructionLayout />
  </div>
</template>

<script>
import HeaderLayout from './components/HeaderLayout.vue';
import AboutLayout from './components/AboutLayout.vue';
import InstructionLayout from './components/InstructionLayout.vue';

export default {
  name: 'App',
  components: {
    HeaderLayout,
    AboutLayout,
    InstructionLayout
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

</style>
