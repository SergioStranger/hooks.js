<template>
  <FormLayout />
  <InstructionLayout />
</template>

<script>
import FormLayout from '@/components/FormLayout.vue';
import InstructionLayout from '@/components/InstructionLayout.vue';

export default {
  name: 'ConfigView',
  components: {
    InstructionLayout,
    FormLayout
  }
}
</script>
