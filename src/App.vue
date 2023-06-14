<template>
    <router-view />
</template>

<script lang="ts">
// import { defineAsyncComponent } from 'vue'
export default {
    preFetch() {
        console.log('[App] running preFetch')
    },
}
</script>

<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue'

onBeforeMount(async () => {
    console.log('[App] onBeforeMount')
})

onMounted(async () => {
    console.log('[App] onMounted')
})
</script>
