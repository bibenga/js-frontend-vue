<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title :shrink="false">
          <router-link to="/" class="text-white" style="text-decoration: none;">
            <q-avatar>
              <img src="~assets/favicon-128x128.png">
            </q-avatar>
            Olala app
          </router-link>
        </q-toolbar-title>

        <q-tabs class="bg-primary text-white" v-if="!$q.platform.is.mobile">
          <q-inner-loading :showing="!profileStore.loaded" label="Retrive profiles data...">
            <q-spinner-pie size="50px" color="primary" />
          </q-inner-loading>

          <q-route-tab name="dashboard" icon="dashboard" to="/dashboard">
            <q-badge color="red" floating>2</q-badge>
            <q-tooltip class="bg-accent">Dashboard</q-tooltip>
          </q-route-tab>

          <q-route-tab v-for="profile in profileStore.profiles" v-bind="profile" :key="profile.id" :name="profile.name"
            :icon="profile?.icon || 'movie'" :to="'/profile/' + profile.id">
            <q-tooltip class="bg-accent">{{ profile.name }}</q-tooltip>
          </q-route-tab>
        </q-tabs>

        <q-btn stretch flat :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'" aria-label="DarkMode"
          @click="$q.dark.toggle">
          <q-tooltip class="bg-accent"> Dark or ligt mode </q-tooltip>
        </q-btn>

        <q-btn-dropdown auto-close stretch flat icon="account_circle">
          <template v-slot:label>
            <q-tooltip class="bg-accent"> {{ authStore.user?.name }} </q-tooltip>
          </template>
          <q-list>
            <q-item clickable>
              <q-tooltip class="bg-accent">Configure your profiles</q-tooltip>
              <q-item-section avatar>
                <q-avatar icon="smartphone" />
              </q-item-section>
              <q-item-section>Profiles</q-item-section>
              <q-item-section side>
                <q-icon name="info" color="amber" />
              </q-item-section>
            </q-item>
            <q-item clickable to="/settings">
              <q-tooltip class="bg-accent">Settings</q-tooltip>
              <q-item-section avatar>
                <q-avatar icon="settings" />
              </q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable @click="logoutWithConfirm">
              <q-tooltip class="bg-accent">Logout</q-tooltip>
              <q-item-section avatar>
                <q-avatar icon="logout" />
                <!-- <q-icon name="logout" /> -->
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-footer v-if="$q.platform.is.mobile" class=“fixed-bottom”>
      <q-toolbar>
        <!-- <q-toolbar-title>Footer</q-toolbar-title> -->
        <q-tabs class="bg-primary text-white" switch-indicator>
          <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" />
        </q-tabs>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-img class="absolute-top bg-primary" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <q-icon v-if="!(!!authStore.user?.avatar)" name="account_circle"
              style="width: 56px; height: 56px; font-size: 56px;" />
            <img v-else height="56" width="56" :src="authStore.user?.avatar">
          </q-avatar>
          <div class="text-weight-bold">{{ authStore.user?.name }}</div>
          <!-- <div>@obi_wan</div> -->
        </div>
      </q-img>

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-inner-loading :showing="!profileStore.loaded" label="Retrive profiles data...">
            <q-spinner-pie size="50px" color="primary" />
          </q-inner-loading>

          <q-item clickable to="/dashboard">
            <q-tooltip class="bg-accent">Dashboard</q-tooltip>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-for="profile in profileStore.profiles" v-bind="profile" :key="profile.id" :name="profile.id"
            :to="'/profile/' + profile.id">
            <q-tooltip class="bg-accent">{{ profile.name }}</q-tooltip>
            <q-item-section avatar>
              <q-icon :name="profile?.icon || 'movie'" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable>
            <q-tooltip class="bg-accent">Configure your profiles</q-tooltip>
            <q-item-section avatar>
              <q-icon name="smartphone" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Profiles</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable to="/settings">
            <q-tooltip class="bg-accent">Settings</q-tooltip>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="logoutWithConfirm">
            <q-tooltip class="bg-accent">Logout</q-tooltip>
            <q-item-section avatar>
              <q-avatar icon="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  preFetch({ store, currentRoute, previousRoute, urlPath, publicPath }) {
    const profileStore = useProfileStore()
    profileStore.load()
    console.log(`[MainLayout] preFetch: store=${store}, `
      + `currentRoute=${currentRoute?.fullPath}, `
      + `previousRoute=${previousRoute?.fullPath}, `
      + `urlPath=${urlPath}, `
      + `publicPath=${publicPath}, `
    )
  }
}
</script>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';
import { useQuasar } from 'quasar'
import { useProfileStore } from 'stores/profiles'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

watch(() => $q.dark.isActive, val => {
  console.log(val ? 'On dark mode' : 'On light mode')
})

const leftDrawerOpen = ref(false)

// todo: what is the correct flow for initialize store?
const authStore = useAuthStore()
authStore.init()

const profileStore = useProfileStore()
profileStore.load()

function logoutWithConfirm() {
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to logout?',
    cancel: true,
    persistent: true,
    focus: 'cancel'
  }).onOk(() => {
    console.log('>>>> OK')
    authStore.logout()
    router.push({ path: '/login' })
  }).onCancel(() => {
    console.log('>>>> Cancel')
  })
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

provide('layoutProp', 'olala')

</script>
