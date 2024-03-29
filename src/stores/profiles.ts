import { defineStore } from 'pinia';
import { Profile } from 'components/models';
import { delay } from './utils'
import { computed, inject, ref } from 'vue';
import { AxiosInstance } from 'axios';

export const useProfileStore = defineStore('profile', () => {
    console.log('[profile.create] >')

    const $api = inject<AxiosInstance>('$api')
    console.log(`[profile.create] api=${$api}`)

    const state = ref<string>('')
    const profiles = ref<Profile[]>([])
    const profile = ref<Profile>()
    const loaded = computed<boolean>(() => state.value == 'LOADED')

    async function load() {
        console.log(`[profile.load] > loaded=${state.value}`)
        // console.log(`[profile] > this.$api = ${this.$api}`)
        if (state.value == '') {
            state.value = 'LOADING'

            console.log('[profile.load] > fake timeout...')
            await delay(500)

            const response = await $api.get('/profiles.json')
            console.log('[profile.load]', response.status)
            if (response.status == 200) {
                profiles.value = response.data
            }
            state.value = 'LOADED'
        }
        console.log('[profile.load] <')
    }

    async function reload() {
        console.log('[profile.reload] >')
        state.value = ''
        // this.profiles = []
        await load()
        console.log('[profile.reload] <')
    }

    async function getProfile(profileId: number): Promise<Profile | undefined> {
        console.log(`[profile.getProfile] > profileId=${profileId}`)
        if (state.value != 'LOADED') {
            await load()
        } else {
            await delay(500)
        }
        const found = profiles.value.find((profile) => {
            return profile.id === profileId
        });
        console.log('[profile.getProfile] <', found)
        return found
    }

    const reset = () => {
        state.value = ''
        profiles.value = []
        profile.value = undefined
    }

    return {
        state, loaded, profiles, profile,
        load, reload, reset,
        getProfile
    }
});
