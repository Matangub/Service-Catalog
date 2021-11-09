<script lang="ts">
import Card from './components/Card.vue'
import SideBar from './components/SideBar.vue'
import Filters from './components/Filters.vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import mockData from './mockData.json'

import { frameworks } from './types/frameworks'
import { serverDataType } from './types/serverDataType'
import { ref, computed } from 'vue'



export default {
  name: 'App',
  components: {
    Card,
    SideBar,
    Filters,
    VPagination,
  },
  setup() {
    const OWNER_SELECT_TEXT = 'Select'
    let NUMBER_OF_COLS = 4
    let ITEMS_IN_PAGE = 12

    if (window.innerWidth <= 1366) {
      NUMBER_OF_COLS = 3
      ITEMS_IN_PAGE = 6
    }
    else if (window.innerWidth <= 920) {
      NUMBER_OF_COLS = 1
      ITEMS_IN_PAGE = 1
    }

    const data = ref<serverDataType[]>(mockData.data)
    const uniqFrameworks = [... new Set(mockData.data.map(i => i.framework))] //unique values

    const frameworks = ref(uniqFrameworks.map(i => ({ framework: i, checked: true })))
    const owners = ref([OWNER_SELECT_TEXT, ...new Set(mockData.data.map(i => i.owner)),])
    const selectedOwner = ref(OWNER_SELECT_TEXT)
    const name = ref('')
    const stage = ref('')
    const page = ref(1)

    const updateFramework = (checked: boolean, index: number) => {
      frameworks.value[index].checked = checked
    }

    const filteredData = computed(() => data.value.filter((item: serverDataType, index: number) => {
      if (!item.name.toLowerCase().includes(name.value.toLowerCase())) return false;
      if (!item.stage.toLowerCase().includes(stage.value.toLowerCase())) return false;
      if (!frameworks.value.find((x: frameworks) => x.framework === item.framework && x.checked)) return false;
      if (item.owner !== selectedOwner.value && selectedOwner.value !== OWNER_SELECT_TEXT) return false;

      return true
    }))

    return {
      filteredData,
      frameworks: frameworks.value,
      updateFramework,
      owners,
      selectedOwner,
      name,
      stage,
      page,
      ITEMS_IN_PAGE,
      NUMBER_OF_COLS
    }
  }
}
</script>

<template>
  <div class="flex h-screen bg-white font-roboto">
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-8">
          <h3 class="text-gray-700 text-xl font-medium text-left pb-4">Service Catalog</h3>
          <Filters
            :updateFramework="updateFramework"
            :frameworks="frameworks"
            :owners="owners"
            v-model:selectedOwner="selectedOwner"
            v-model:name="name"
            v-model:stage="stage"
            class="border-gray-200 border-b py-4"
          />
          <div
            :class="`grid grid-cols-${NUMBER_OF_COLS} justify-center justify-items-center align-middle gap-5 grid-flow-row`"
          >
            <Card
              v-for="card in filteredData.slice((page - 1) * ITEMS_IN_PAGE, page * ITEMS_IN_PAGE)"
              :key="card.id"
              :name="card.name"
              :creationDate="card.creationDate"
              :stage="card.stage"
              :owner="card.owner"
              :framework="card.framework"
            />
          </div>

          <div
            v-show="filteredData.length"
            :class="`absolute bottom-5 left-1/2 w-72 transform -translate-x-2/4 lg:transform-none flex justify-center`"
          >
            <v-pagination
              v-model="page"
              :pages="Math.ceil(filteredData.length / ITEMS_IN_PAGE)"
              :range-size="1"
              active-color="#DCD6FF"
            />
          </div>
        </div>
      </main>

      <div
        v-show="!filteredData.length"
        class="absolute top-1/2 left-1/2 transform translate-x-20 -translate-y-1/2 flex flex-col justify-center items-center"
      >
        <font-awesome-icon
          :icon="['fa', 'exclamation-circle']"
          class="text-red-500 my-4"
          size="3x"
        />
        <span>No Results Found</span>
      </div>
    </div>
  </div>
</template>
