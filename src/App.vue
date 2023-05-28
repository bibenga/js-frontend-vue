<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useTextPairStore } from 'stores/TextPair'

export default defineComponent({
  name: 'App',

  preFetch({ }) {
    console.log('[app] preFetch')
  },

  setup() {
    console.log('[app] setup')
  },

  created() {
    console.log('[App] created')
  },

  async beforeMount() {
    console.log('[App] beforeMount')
    // var store1 = useTextPairStore()
    // await store1.init()
    // console.log('[App] < mounted')
  },
});
</script>
