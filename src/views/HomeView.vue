<template>
  <div class="home">
    <AboutLayout />
    <InstructionLayout />
  </div>
</template>

<script>
import AboutLayout from '../components/AboutLayout.vue';
import InstructionLayout from '../components/InstructionLayout.vue';

export default {
  name: 'HomeView',
  components: {
    AboutLayout,
    InstructionLayout
  }
}
</script>
