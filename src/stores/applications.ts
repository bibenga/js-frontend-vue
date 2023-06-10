import { defineStore } from 'pinia';
import { Application } from 'components/models';
import { delay } from './utils'
import { inject } from 'vue';
import { AxiosInstance } from 'axios';

export const useApplicationStore = defineStore('application', () => {
  console.log('[application.create] >')

  const $api = inject<AxiosInstance>('$api')
  console.log(`[application.create] api=${$api}`)

  async function list(): Promise<Application[] | undefined> {
    console.log('[application.load]')

    console.log('[application.load] > fake timeout...')
    await delay(500)

    const response = await $api.get('/applications.json')
    console.log('[application.load]', response.status)
    if (response.status == 200) {
      const items = response.data.items
      console.log('[application.load] <', items)
      return items
    }
    console.log('[application.load] <')
  }

  return {
    list
  }
});
