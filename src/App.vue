<script lang="ts">
import Card from './components/Card.vue'
import SideBar from './components/SideBar.vue'
import Filters from './components/Filters.vue'
import Pager from './components/Pager.vue'
import { PropType } from 'vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import mockData from './mockData.json'

import { frameworks } from './types/frameworks'
import { ref, watchEffect, reactive, computed } from 'vue'



export default {
  name: 'App',
  components: {
    Card,
    SideBar,
    Filters,
    Pager,
    VPagination
  },
  setup() {
    const ITEMS_IN_PAGE = 12
    console.log(mockData.data)
    const data = ref<any>(mockData.data)

    const frameworks = [... new Set(mockData.data.map(i => i.framework))] //unique values
    const frameworks2 = ref(frameworks.map(i => ({ framework: i, checked: true })))

    const owners = ref([... new Set(mockData.data.map(i => i.owner))])
    const selectedOwner = ref(owners.value[0])
    const name = ref('')
    const stage = ref('')
    const page = ref(1)

    const updateFramework = (checked: boolean, index: number) => {
      frameworks2.value[index].checked = checked
    }

    const updateHandler = () => {
      console.log(123);
    }

    const filteredData = computed(() => data.value.filter((item: any, index: number) => {
      if (!item.name.toLowerCase().includes(name.value.toLowerCase())) return false;
      if (!item.stage.toLowerCase().includes(stage.value.toLowerCase())) return false;
      if (!frameworks2.value.find((x: frameworks) => x.framework === item.framework && x.checked)) return false;
      if (item.owner !== selectedOwner.value) return false;

      return true
    }))


    return {
      filteredData, frameworks: frameworks2.value, updateFramework, owners, selectedOwner, name, stage, updateHandler, page, ITEMS_IN_PAGE
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
            class="border-gray-400 border-b py-4"
          />
          <div
            class="grid grid-cols-4 justify-center justify-items-center align-middle gap-5 grid-flow-row"
          >
            <Card
              v-for="card in filteredData.slice((page - 1) * ITEMS_IN_PAGE, page * ITEMS_IN_PAGE)"
              :name="card.name"
              :creationDate="card.creationDate"
              :stage="card.stage"
              :owner="card.owner"
              :framework="card.framework"
            />
          </div>
          <div class="flex justify-center h-full align-bottom">
            <v-pagination
              v-model="page"
              :pages="Math.ceil(filteredData.length / ITEMS_IN_PAGE)"
              :range-size="1"
              active-color="#DCEDFF"
              @update:modelValue="updateHandler"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
