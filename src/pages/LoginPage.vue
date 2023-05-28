<template>
  <q-layout view="hHh Lpr lFf">
    <h1>Login</h1>

    <q-form @submit.prevent="doLogin" class="q-gutter-md">
      <q-input ref="usernameRef" clearable outlined v-model="username" label="Username *" :error="valid === false"
        error-message="Unvalid username or password" />
      <q-input ref="passwordRef" clearable outlined v-model="password" type="password" label="Password *"
        :error="valid === false" error-message="Unvalid username or password" />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QInput } from 'quasar'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'

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
  if (username.value == 'a' && password.value == 'a') {
    valid.value = true
    usernameRef.value.resetValidation()
    passwordRef.value.resetValidation()

    await authStore.login()

    router.push({ path: '/dashboard' })

  } else {
    valid.value = false
    // usernameRef.value.error = true
    // passwordRef.value.error = true
    password.value = ''
  }
}

</script>
