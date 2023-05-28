import { defineStore } from 'pinia';
import { delay } from './utils'
import { api, axios } from '../boot/axios'
import { ref } from 'vue';
import { User } from 'components/models';

const AnonymousUser: User = {
  'id': 0,
  'name': 'Anonymous user',
  'authenticated': false
}

export const useAuthStore = defineStore('auth', () => {
  console.log('[auth.create]')

  const loaded = ref(false)
  const user = ref<User>()

  async function init() {
    console.log(`[auth.load] > loaded=${loaded.value}`)
    if (!loaded.value) {
      console.log('[auth.load] > fake timeout...')
      await delay(500)

      try {
        const response = await api.get('/user.json')
        console.log('[auth.load]', response)
        if (response.status == 200) {
          user.value = response.data
          loaded.value = true
          console.log('[auth.load] - authenticated user')
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.log(e.message)
        } else {
          console.log(e)
        }
      }
      if (!loaded.value) {
        user.value = AnonymousUser
        loaded.value = true
        console.log('[auth.load] - anonymous user')
      }
    }
    console.log('[auth.load] <', user?.value?.id, user?.value?.name)
  }

  async function login() {
    console.log('[auth.login] >', user)
    loaded.value = false
    await delay(1000)
    await init()
    console.log('[auth.login] <', user)
  }

  async function logout() {
    console.log('[auth.logout] >', user)
    user.value = AnonymousUser
    loaded.value = true
    console.log('[auth.logout] <', user)
  }

  return {
    loaded, user,
    init, login, logout,
  }
});
