<template>
    <q-page padding>
        <div>
            <div>Profiles</div>
            <div v-if="!loaded">Loading profiles...</div>
            <div v-if="loaded">{{ profiles }}</div>
            <q-btn color="primary" v-if="loaded" @click="profileStore.reload">reload</q-btn>
        </div>

        <div>
            <div class="text-overline"> i18n = {{ $t("hello") }}; {{ $t("goodby") }} </div>
            <div class="text-overline"> dark = {{ $q.dark.isActive }} </div>
            <div class="variable text-overline"> layoutProp / layoutOlala = {{ layoutProp }} </div>
            <div class="variable text-overline"> olala = {{ olala }} </div>
            <div class="variable text-overline"> isOlala = {{ isOlala }} </div>
            <div class="variable text-overline"> quasar = {{ $q.version }} </div>
            <div class="variable text-overline"> mobile = {{ $q.platform.is.mobile }} </div>
            <div class="variable text-overline"> desktop = {{ $q.platform.is.desktop }} </div>
            <div class="variable text-overline"> nativeMobile = {{ $q.platform.is.nativeMobile }} </div>
            <div class="variable text-overline"> name = {{ $q.platform.is.name }} </div>
            <div class="variable text-overline"> platform = {{ $q.platform.is.platform }} </div>
            <div class="variable text-overline" v-if="$q.platform.is.desktop"> I'm only rendered on desktop! </div>
            <div class="variable text-overline" v-if="$q.platform.is.mobile"> I'm only rendered on mobile! </div>
            <q-list :dense="$q.screen.lt.md" class="text-overline">
                <q-item> <q-item-section>1</q-item-section> </q-item>
                <q-item v-ripple> <q-item-section>2</q-item-section> </q-item>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>31</q-item-label>
                        <q-item-label caption>32</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>

        <q-btn color="purple" label="Primary" size="xl" unelevated rounded>
            <q-tooltip class="bg-accent">Rebuild</q-tooltip>
            <q-badge color="orange" floating>22</q-badge>
        </q-btn>

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
            ]" />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </q-page>
</template>

<style lang="sass">
div.variable
  color: $indigo
</style>

<script lang="ts">
export default {
    async preFetch({ store, currentRoute, previousRoute, urlPath, publicPath }) {
        console.log(`[DemoPage] preFetch: store=${store}, `
            + `currentRoute=${currentRoute.fullPath}, `
            + `previousRoute=${previousRoute.fullPath}, `
            + `urlPath=${urlPath}, `
            + `publicPath=${publicPath}, `
        )
    }
}
</script>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { computed, inject, ref } from 'vue';
import { useQuasar, QSpinnerGears } from 'quasar'
import { useProfileStore } from 'stores/profiles'
import { storeToRefs } from 'pinia'

const layoutProp = inject('layoutProp')

const $q = useQuasar()
$q.loading.show({
    spinner: QSpinnerGears,
    message: 'hahaha',
})
setTimeout(() => { $q.loading.hide() }, 1500);

// ------------------
var profileStore = useProfileStore()
const { profiles, loaded } = storeToRefs(profileStore)
profileStore.$onAction(({ name, args, after, onError }) => {
    const startTime = Date.now()
    console.log(`[ProfileStore] Start "${name}" with params [${args.join(', ')}].`)
    after(result => {
        console.log(
            `[ProfileStore] Finished "${name}" after ${Date.now() - startTime}ms -> ${result}.`
        )
    })
    onError(error => {
        console.warn(
            `[ProfileStore] Failed "${name}" after ${Date.now() - startTime}ms -> ${error}.`
        )
    })
})

// ------------------
const todos = ref<Todo[]>([
    { id: 1, content: 'ct1' },
    { id: 2, content: 'ct2' },
]);
const meta = ref<Meta>({
    totalCount: 1200
});

// ------------------
const olala = '<script>alert("Hacked, hahaha :)")&lt;/script>'
const isOlala = computed(() => olala)

// ------------------
const name = ref<string>()
const age = ref<number>()
const accept = ref(false)

const onSubmit = () => {
    // const $q = useQuasar()
    if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
        })
    } else {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
        })
    }
}

const onReset = () => {
    name.value = undefined
    age.value = undefined
    accept.value = false
}
</script>
