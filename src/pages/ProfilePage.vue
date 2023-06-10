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
      <div>
        store => {{ store.counter }} -
        <q-btn @click="store.increment()">+</q-btn>
        <q-btn @click="store.decrement()">-</q-btn>
      </div>
    </div>

    <q-timeline color="secondary" layout="comfortable">
      <q-timeline-entry heading tag="h6"> Today </q-timeline-entry>

      <q-timeline-entry icon="web" color="red">
        <template v-slot:title>
          <a class="profile-timeline-link" href="https://quasar.dev/style/typography/" target="_blank">quasar.dev</a>
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
import { defineComponent, ref, watch } from 'vue'
import { useTextPairStore } from 'stores/TextPair'
import { Profile } from 'components/models'
import { onBeforeRouteLeave, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router'

export default defineComponent({
  name: 'ProfilePage',

  props: {
    // always string, why do we recive a string?
    profileId: { type: String, required: true },
  },

  preFetch({ store, currentRoute, previousRoute, /*redirect,*/ urlPath, publicPath }) {
    // return store.dispatch('fetchItem', currentRoute.params.id)
    console.log(`[ProfilePage] preFetch: store=${store}, `
      + `currentRoute=${currentRoute?.fullPath}, `
      + `previousRoute=${previousRoute?.fullPath}, `
      + `urlPath=${urlPath}, `
      + `publicPath=${publicPath}, `
    )
  },

  setup(props) {
    console.log(`[ProfilePage.setup] ${props.profileId}`)
    // ------------------
    onBeforeRouteLeave((to, from) => {
      console.log(`[ProfilePage.setup.onBeforeRouteLeave] ${from.fullPath} -> ${to.fullPath}`)
    })
    onBeforeRouteUpdate((to, from) => {
      console.log(`[ProfilePage.setup.onBeforeRouteUpdate] ${from.fullPath} -> ${to.fullPath}`)
    })

    // ------------------
    const store = useTextPairStore();
    return {
      store,
    }
  },

  async beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    // react to route changes...
    console.log('[ProfilePage.beforeRouteUpdate]'
      + ` current {profileId=${this.profileId}}: `
      + ` ${from.fullPath} {profileId=${from.params.profileId}}`
      + ` -> ${to.fullPath} {profileId=${to.params.profileId}}`)
  },

  data() {
    console.log(`[ProfilePage] data: ${typeof this.profileId}:${this.profileId}`)
    const profile = ref<Profile>();
    return {
      loaded: false,
      // profileIdInt: Number(this.profileId),
      profile: profile,
      // store: null,
    }
  },

  created() {
    console.log('[ProfilePage] created')
    // this.$route.path.startsWith
    this.$watch(
      () => this.$route.params?.profileId,
      (newProfileId) => { this.fetchData(newProfileId) },
      { immediate: true }
    )
  },

  mounted() {
    console.log('[ProfilePage] mounted')
  },

  provide() {
    return {
      profile: this.profile
    }
  },

  methods: {
    fetchData(profileId: string | undefined) {
      console.log('[ProfilePage] fetchData', profileId)
      if (profileId === undefined) {
        return
      }

      this.loaded = false
      this.profile = undefined
      this.$q.notify({
        type: 'ongoing',
        message: `Loading profile ${profileId}`,
        timeout: 1000,
      })
      setTimeout(() => {
        // this.store = store
        this.loaded = true
        this.profile = {
          id: Number(profileId),
          name: 'Your was hacked!'
        }
        this.$q.notify({
          type: 'positive',
          message: `Profile ${profileId} loaded`,
          timeout: 1000,
        })
      }, 3000)
    }
  },
});
</script>
