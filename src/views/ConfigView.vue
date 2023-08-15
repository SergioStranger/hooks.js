<template>
  <div class="py-3">
    <div class="container">
      <FormLayout />
      <InstructionLayout />
    </div>
  </div>
</template>

<script>
import InstructionLayout from '@/components/InstructionLayout.vue';
import FormLayout from '@/components/FormLayout.vue';

export default {
  name: 'ConfigView',
  components: {
    InstructionLayout,
    FormLayout
  }
}
</script>
