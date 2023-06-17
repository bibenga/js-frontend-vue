<template>
    <q-page padding>
        <q-inner-loading :showing="!loaded" label="Retrive profile data...">
            <q-spinner-pie size="50px" color="primary" />
        </q-inner-loading>

        <div>Profile [{{ profileId }} | {{ $route.params.profileId }} | {{ profile }}]</div>
        <div>
            <div>loaded => {{ loaded }}</div>
            <div>data => {{ profile }}</div>
            <div>data => {{ profile?.name }}</div>
        </div>

        <q-timeline color="secondary" layout="comfortable">
            <q-timeline-entry heading tag="h6"> Today </q-timeline-entry>

            <q-timeline-entry icon="web" color="red">
                <template v-slot:title>
                    <a class="profile-timeline-link" href="https://quasar.dev/style/typography/"
                        target="_blank">quasar.dev</a>
                </template>
                <template v-slot:subtitle>
                    <span>10:21</span>
                    <q-tooltip class="bg-accent">100 minutes</q-tooltip>
                </template>
                <div> 100 minutes </div>
            </q-timeline-entry>

            <q-timeline-entry icon="apps">
                <template v-slot:title> App 1 </template>
                <template v-slot:subtitle> 09:21 </template>
                <div>100 minutes </div>
            </q-timeline-entry>

            <q-timeline-entry heading tag="h6"> Yesterday </q-timeline-entry>

            <q-timeline-entry icon="apps">
                <template v-slot:title> App 2 </template>
                <template v-slot:subtitle> 13:21 </template>
                <div>100 minutes </div>
            </q-timeline-entry>

            <q-timeline-entry heading tag="h6"> Older... </q-timeline-entry>

            <q-timeline-entry icon="web">
                <template v-slot:title>
                    <a class="profile-timeline-link" href="https://google.com" target="_blank">google.com</a>
                </template>
                <template v-slot:subtitle> 22 February 1986 </template>
                <!-- <div> 100 minutes </div> -->
            </q-timeline-entry>
            <q-timeline-entry title="Web 3" icon="web" side="left">
                <!-- <div> 100 minutes </div> -->
            </q-timeline-entry>
            <q-timeline-entry title="Web 4" subtitle="February 21, 1986" icon="web" side="left">
                <!-- <div> 100 minutes </div> -->
            </q-timeline-entry>

        </q-timeline>

    </q-page>
</template>


<style lang="scss">
.profile-timeline-link {
    text-decoration: none;
}

.body--light .profile-timeline-link {
    color: black;
}

.body--dark .profile-timeline-link {
    color: white;
}

.body--light .profile-timeline-link:visited {
    color: black;
}

.body--dark .profile-timeline-link:visited {
    color: white;
}
</style>

<script lang="ts">
export default {
    async preFetch({ store, currentRoute, previousRoute, urlPath, publicPath }) {
        // return store.dispatch('fetchItem', currentRoute.params.id)
        console.log(`[ProfilePage] preFetch: store=${store}, `
            + `currentRoute=${currentRoute?.fullPath}, `
            + `previousRoute=${previousRoute?.fullPath}, `
            + `urlPath=${urlPath}, `
            + `publicPath=${publicPath}, `
        )
    }
}
</script>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { Profile } from 'components/models'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const props = defineProps<{
    profileId: string
}>()

const $q = useQuasar()
// const router = useRouter()
const route = useRoute()

onBeforeRouteLeave((to, from) => {
    console.log(`[ProfilePage.onBeforeRouteLeave] ${from.fullPath} -> ${to.fullPath}`)
})
onBeforeRouteUpdate((to, from) => {
    console.log(`[ProfilePage.onBeforeRouteUpdate] ${from.fullPath} -> ${to.fullPath}`)
})

const loaded = ref(false)
const profile = ref<Profile>();
provide('profile', profile)

// const router = useRouter()
const fetchData = (profileId: string | undefined) => {
    console.log('[ProfilePage] fetchData', profileId, props.profileId)
    if (profileId === undefined) {
        return
    }

    loaded.value = false
    profile.value = undefined
    $q.notify({
        type: 'ongoing',
        message: `Loading profile ${profileId}`,
        timeout: 1000,
    })
    setTimeout(() => {
        // this.store = store
        loaded.value = true
        profile.value = {
            id: Number(profileId),
            name: 'Your was hacked!'
        }
        $q.notify({
            type: 'positive',
            message: `Profile ${profileId} loaded`,
            timeout: 1000,
        })
    }, 3000)
}
watch<string>(
    () => route.params?.profileId,
    (newProfileId) => { fetchData(newProfileId) },
    { immediate: true }
)

</script>
