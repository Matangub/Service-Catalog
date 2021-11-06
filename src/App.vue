<script lang="ts">
import Card from './components/Card.vue'
import SideBar from './components/SideBar.vue'
import Filters from './components/Filters.vue'

import mockData from './mockData.json'

import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    Card,
    SideBar,
    Filters,
  },
  setup() {
    console.log(mockData.data)
    const data = ref<any>(mockData.data)

    return { data }
  }
}
</script>

<template>
  <div class="flex h-screen bg-white font-roboto">
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-8">
          <h3 class="text-gray-700 text-3xl font-medium text-center pb-4">Service Catalog</h3>
          <Filters class="border-gray-400 border-b pb-4" />
          <div
            class="grid grid-cols-4 justify-center justify-items-center align-middle gap-5 grid-flow-row"
          >
            <Card v-for="card in data" :img="card.framework" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
