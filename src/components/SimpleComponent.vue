<template>
  {{ title }}
  <slot></slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<!-- <script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SimpleComponent',
  props: {
    title: {
      type: String,
      required: true
    },
  },
  setup() {
    return {};
  },
});
</script> -->
