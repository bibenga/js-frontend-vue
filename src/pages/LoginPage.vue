<template>
  <q-layout view="hHh Lpr lFf" class=" window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5>¡Entra y aprende español!</h5>
      </div>
      <div class="row">
        <q-form @submit.prevent="doLogin" class="q-gutter-md">
          <q-input ref="usernameRef" clearable outlined v-model="username" label="Username *" :error="valid === false"
            error-message="Unvalid username or password" />
          <q-input ref="passwordRef" clearable outlined v-model="password" type="password" label="Password *"
            :error="valid === false" error-message="Unvalid username or password" />
          <div>
            <q-btn label="Login" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar, QInput } from 'quasar'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const authStore = useAuthStore()
authStore.logout()

const usernameRef = ref<QInput>()
const passwordRef = ref<QInput>()
const username = ref<string>()
const password = ref<string>()
const valid = ref<boolean>()

async function doLogin() {
  console.log('[LoginPage] doLogin')
  $q.loading.show({
    // spinner: QSpinnerGears,
    // message: 'Verifying...',
  })
  try {
    if (username.value == 'a' && password.value == 'a') {
      valid.value = true
      if (usernameRef.value != undefined) {
        usernameRef.value.resetValidation()
      }
      if (passwordRef.value != undefined) {
        passwordRef.value.resetValidation()
      }
      await authStore.login()
      router.push({ path: '/dashboard' })
    } else {
      valid.value = false
      // usernameRef.value.error = true
      // passwordRef.value.error = true
      password.value = ''
    }
  } finally {
    $q.loading.hide()
  }
}

</script>
