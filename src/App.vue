<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',

    preFetch() {
        console.log('[App] preFetch')
    },

    setup() {
        console.log('[App] setup')
    },

    created() {
        console.log('[App] created')
    },

    async beforeMount() {
        console.log('[App] beforeMount')
    },
});
</script>
