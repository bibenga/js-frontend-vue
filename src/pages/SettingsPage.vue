<template>
    <q-page padding>
        <div class="text-bold">Settings</div>
        <div>
            <q-btn label="++" @click="inc" /> <span>{{ count }}</span>
        </div>
        <div>{{ layoutProp }}</div>
        <div>
            <simple-component title="Simple component">HAHA</simple-component>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { useQuasar, QSpinnerGears } from 'quasar'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import SimpleComponent from 'components/SimpleComponent.vue';

const props = defineProps<{
    foo?: string
    bar?: number
}>()

// -----
const $q = useQuasar()
$q.loading.show({
    spinner: QSpinnerGears,
    message: 'hahaha',
})
var loadingTimerId = setTimeout(() => { $q.loading.hide() }, 2000);
console.log(`[SettingsPage.setup] - loadingTimerId=${loadingTimerId}`)
onUnmounted(() => {
    console.log('[SettingsPage.onUnmounted]')
    clearTimeout(loadingTimerId)
})

// -----
const count = ref<number>(0)
function inc() {
    count.value += 0.1
}

// -----
const layoutProp = inject<string>('layoutProp')

// -----
onMounted(() => {
    console.log('[SettingsPage.onMounted]')
})
onBeforeRouteUpdate((to, from) => {
    // occured when profileId changed
    console.log(`[SettingsPage.onBeforeRouteUpdate] ${from.fullPath} -> ${to.fullPath}`)
})
onBeforeRouteLeave((to, from) => {
    // occured when go to other page
    console.log(`[SettingsPage.onBeforeRouteLeave] ${from.fullPath} -> ${to.fullPath}`)
})

</script>
