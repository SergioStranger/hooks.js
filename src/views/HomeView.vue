<template>
  <div class="home">
    <AboutLayout />
    <CardsLayout />
    <InstructionLayout />
  </div>
</template>

<script>
import CardsLayout from '@/components/CardsLayout.vue';
import AboutLayout from '@/components/AboutLayout.vue';
import InstructionLayout from '@/components/InstructionLayout.vue';

export default {
  name: 'HomeView',
  components: {
    AboutLayout,
    InstructionLayout,
    CardsLayout
  }
}
</script>
