<template>
  <q-page padding>
    <h5 class="text-center">Dashboard</h5>

    <div>
      <q-option-group :options="profilesAsOptions" type="checkbox" inline v-model="selectedProfiles"
        @update:model-value="onSelectedProfilesChanged" />
    </div>

    <div class="row">
      <div class="col q-pa-sm">
        <q-card flat bordered style="height: 300px;">
          <q-card-section>
            <div class="text-h6">Times</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-scroll-area style="height: 200px;">
              <q-markup-table separator="horizontal">
                <thead>
                  <tr>
                    <th class="text-left">Profile</th>
                    <th class="text-right">Some text</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="profile in profileStore.profiles" :key="profile.id">
                    <tr v-if="selectedProfiles.includes(profile.id)">
                      <td class="text-left">{{ profile.name }}</td>
                      <td class="text-right">{{ profile.id }}</td>
                    </tr>
                  </template>
                </tbody>
              </q-markup-table>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>

      <div class="col q-pa-sm">
        <q-card flat bordered style="height: 300px;">
          <q-card-section>
            <div class="text-h6">Applications</div>
          </q-card-section>
          <q-scroll-area style="height: 200px;">
            <q-table :rows="tableItems" :columns="tableColumns" row-key="name" />
          </q-scroll-area>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col q-pa-sm">
        <q-card flat bordered style="height: 300px;">
          <q-card-section>
            <div class="text-h6">Messages</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            Messages
          </q-card-section>
        </q-card>
      </div>

      <div class="col q-pa-sm">
        <q-card flat bordered style="height: 300px;">
          <q-card-section>
            <div class="text-h6">Locations</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <apexchart height="200" type="pie" :options="chartData.options" :series="chartData.series"></apexchart>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
export default {
  preFetch() {
    console.log('running preFetch')
  }
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getCssVar } from 'quasar'
import { useProfileStore } from 'stores/profiles'
import { useApplicationStore } from 'stores/applications';
import { Application } from 'src/components/models';

const profileStore = useProfileStore()

const chartData = {
  options: {
    chart: {
      id: 'apex-donut'
    },
    colors: [
      getCssVar('secondary'),
      getCssVar('accent'),
      getCssVar('positive'),
      getCssVar('primary'),
      getCssVar('negative'),
      getCssVar('info')
    ],
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6
      }
    },
    labels: [
      'Asia',
      'Africa',
      'Europe',
      'North America',
      'South America',
      'Oceania'
    ]
  },
  series: [
    469457616,
    139367644,
    745173774,
    595783465,
    434254119,
    444917240
  ]
}

// profileStore.$onAction(({ name, args, after, onError }) => {
//   const startTime = Date.now()
//   console.log(`[ProfileStore] Start "${name}" with params [${args.join(', ')}].`)
//   after(result => {
//     console.log(
//       `[dashboard ProfileStore] Finished "${name}" after ${Date.now() - startTime}ms -> ${result}.`
//     )
//   })
//   onError(error => {
//     console.warn(
//       `[dashboard ProfileStore] Failed "${name}" after ${Date.now() - startTime}ms -> ${error}.`
//     )
//   })
// })
// // profileStore.load()
// profileStore.$subscribe((mutation, state) => {
//   console.log('[dashboard ProfileStore.$subscribe]', mutation, state)
//   // react to store changes
// })

const profilesAsOptions = computed(() => {
  return profileStore.profiles.map(p => ({
    value: p.id,
    label: p.name,
    disable: selectedProfiles.value.length <= 1 && selectedProfiles.value.includes(p.id)
  }))
})
const selectedProfiles = ref<number[]>([])
watch(
  () => profileStore.loaded,
  val => {
    console.log('profileStore.loaded - ', profileStore.loaded)
    if (val && selectedProfiles.value.length == 0) {
      selectedProfiles.value = profileStore.profiles.map(p => p.id)
    }
  },
  { immediate: true }
)
function onSelectedProfilesChanged(value: number[]) {
  console.log(value)
}

const tableColumns = [
  { name: 'name', align: 'left', label: 'Application', field: 'name' },
  { name: 'duration', align: 'left', label: 'Duration', field: 'duration' },
]
const tableItems = ref<Application[]>([])

const applicationStore = useApplicationStore()
applicationStore.list().then((items: Application[] | undefined) => {
  console.log(items)
  if (items != undefined) {
    tableItems.value = items
  }
})

</script>
