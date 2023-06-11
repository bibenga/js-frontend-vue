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
                        <q-no-ssr>
                            <AsyncApexChart v-if="chartData != undefined" height="200" :options="chartData.options"
                                :series="chartData.series">
                            </AsyncApexChart>
                            <!-- <apexchart v-if="chartData != undefined" height="200" :options="chartData.options"
                :series="chartData.series">
              </apexchart> -->
                        </q-no-ssr>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
// import { defineAsyncComponent } from 'vue'
export default {
    preFetch() {
        console.log('[Dashboard] running preFetch')
    },
    // components: {
    //   AsyncApexChart: defineAsyncComponent(() =>
    //     import('vue3-apexcharts')
    //   )
    // }
}
</script>

<script setup lang="ts">
import { ref, computed, inject, watch, defineAsyncComponent } from 'vue'
// import { getCssVar } from 'quasar'
import { useProfileStore } from 'stores/profiles'
import { useApplicationStore } from 'stores/applications';
import { Application } from 'src/components/models';
import { AxiosInstance } from 'axios';

const AsyncApexChart = defineAsyncComponent(() => import('vue3-apexcharts'));

const $api = inject<AxiosInstance>('$api')

const profileStore = useProfileStore()

const chartData = ref()
async function loadChartData() {
    const response = await $api.get('/chart.json')
    if (response.status == 200) {
        const data = response.data
        chartData.value = {
            options: {
                chart: {
                    id: 'apex-donut',
                    type: 'donut'
                },
                // colors: [
                //   getCssVar('secondary'),
                //   getCssVar('accent'),
                //   getCssVar('positive'),
                //   getCssVar('primary'),
                //   getCssVar('negative'),
                //   getCssVar('info')
                // ],
                markers: {
                    size: 4,
                    hover: {
                        sizeOffset: 6
                    }
                },
                legend: {
                    labels: {
                        // colors: undefined,
                        useSeriesColors: true
                    },
                },
                labels: data.labels
            },
            series: data.series
        }
        console.log('chart.json>', data)
    }
}
loadChartData()

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
    (val) => {
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
    { name: 'profile', label: 'Profile', field: 'profileId', align: 'left' },
    { name: 'name', label: 'Name', field: 'name', align: 'left' },
    { name: 'duration', label: 'Duration', field: 'duration', align: 'right' },
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
