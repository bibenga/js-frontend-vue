<template>
  <q-page padding>
    <h5 class="text-center">Dashboard</h5>

    <div>
      <q-option-group :options="profilesAsOptions" type="checkbox" inline v-model="selectedProfiles"
        @update:model-value="onSelectProfiles" />
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
            <!-- <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">Dessert (100g serving)</th>
                  <th class="text-right">Calories</th>
                  <th class="text-right">Fat (g)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">Frozen Yogurt</td>
                  <td class="text-right">159</td>
                  <td class="text-right">6</td>
                </tr>
                <tr>
                  <td class="text-left">Ice cream sandwich</td>
                  <td class="text-right">237</td>
                  <td class="text-right">9</td>
                </tr>
                <tr>
                  <td class="text-left">Ice cream sandwich</td>
                  <td class="text-right">237</td>
                  <td class="text-right">9</td>
                </tr>
                <tr>
                  <td class="text-left">Ice cream sandwich</td>
                  <td class="text-right">237</td>
                  <td class="text-right">9</td>
                </tr>
                <tr>
                  <td class="text-left">Ice cream sandwich</td>
                  <td class="text-right">237</td>
                  <td class="text-right">9</td>
                </tr>
              </tbody>
            </q-markup-table> -->
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar, getCssVar } from 'quasar'
import { useProfileStore } from 'stores/profiles'
import { useApplicationStore } from 'stores/applications';
import { Application } from 'src/components/models';

const $q = useQuasar()

const profileStore = useProfileStore()
profileStore.load().finally(() => {
  $q.notify({
    type: 'positive',
    message: 'Dashboard loaded'
  })
})


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

const profilesAsOptions = computed(() => {
  return profileStore.profiles.map(p => ({
    value: p.id,
    label: p.name,
    disable: selectedProfiles.value.length <= 1 && selectedProfiles.value.includes(p.id)
  }))
})
const selectedProfiles = ref<number[]>([])
profileStore.load().then(() => {
  selectedProfiles.value = profileStore.profiles.map(p => p.id)
})
function onSelectProfiles(value: number[]) {
  console.log(value)
}

const tableColumns = [
  // {
  //   name: 'name',
  //   required: true,
  //   label: 'Application',
  //   align: 'left',
  //   field: row => row.name,
  //   format: val => `${val}`,
  //   sortable: true
  // },
  { name: 'name', align: 'left', label: 'Application', field: 'name' },
  { name: 'duration', align: 'right', label: 'Duration', field: 'duration' },
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
