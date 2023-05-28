import { defineStore } from 'pinia';
import { Profile } from 'components/models';
import { delay } from './utils'
import { api } from '../boot/axios'
import { ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  const loaded = ref(false)
  const profiles = ref<Profile[]>([])
  const profile = ref<Profile>()

  async function load() {
    console.log(`[profile.load] > loaded=${loaded.value}`)
    // console.log(`[profile] > this.$api = ${this.$api}`)
    if (!loaded.value) {
      console.log('[profile.load] > fake timeout...')
      await delay(500)

      const response = await api.get('/profiles.json')
      console.log('[profile.load]', response)
      if (response.status == 200) {
        profiles.value = response.data
      }
      loaded.value = true
    }
    console.log('[profile.load] <')
  }

  async function reload() {
    console.log('[profile.reload] >')
    loaded.value = false
    // this.profiles = []
    await load()
    console.log('[profile.reload] <')
  }

  async function getProfile(profileId: number): Promise<Profile | undefined> {
    console.log(`[profile.getProfile] > profileId=${profileId}`)
    if (!loaded.value) {
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

  return {
    loaded, profiles, profile,
    load, reload,
    getProfile
  }
});
