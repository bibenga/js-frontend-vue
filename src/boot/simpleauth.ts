import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'stores/auth'
import { useProfileStore } from 'stores/profiles'

export default boot(async ({ router }) => {
  console.log('[simpleauth.init] >')

  const authStore = useAuthStore()
  const profileStore = useProfileStore()

  router.beforeEach(async (to, from, next) => {
    console.log(`[simpleauth.beforeEach] > ${from.fullPath} -> ${to.fullPath}`)
    if (to.path == '/login') {
      console.log('[simpleauth.beforeEach] always pass to login')
      next()
      return
    }
    await authStore.init()
    await profileStore.load()
    if (authStore.user?.authenticated) {
      console.log('[simpleauth.beforeEach] < pass')
      next()
      return
    }
    console.log('[simpleauth.beforeEach] < reject')
    next({ path: '/login', query: { next: to.fullPath } })
  })

  console.log('[simpleauth.init] <')
})
