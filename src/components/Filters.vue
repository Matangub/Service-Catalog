<script lang="ts">
import DropdownSelect from './DropdownSelect.vue';
import { PropType } from 'vue'

import { frameworks } from '../types/frameworks'
import { filtersProps } from '../types/filtersProps'

export default {
    name: 'Filters',
    components: {
        DropdownSelect
    },
    props: {
        frameworks: {
            type: Object as PropType<frameworks[]>,
            required: true,
        },
        updateFramework: {
            type: Function as PropType<(checked: boolean, index: number) => void>,
            required: true,
        },
        owners: {
            type: Array as PropType<string[]>,
            required: true,
        },
        selectedOwner: {
            type: String as PropType<string>,
            required: true,
        },
        name: {
            type: String as PropType<string>,
            required: true,
        },
        stage: {
            type: String as PropType<string>,
            required: true,
        }
    },
    setup(props: any, context: any) {

        const updateOwner = (e: any) => {
            context.emit('update:selectedOwner', e.target.value);
        }

        const updateName = (e: any) => {
            context.emit('update:name', e.target.value);
        }

        const updateStage = (e: any) => {
            context.emit('update:stage', e.target.value);
        }

        return {
            updateOwner, updateName, updateStage
        }
    }
}
</script>

<template>
    <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
                class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
            >Name</label>
            <input
                :value="$props.name"
                @input="updateName($event)"
                class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Search"
            />
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
                class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
            >Owner / Team</label>
            <div class="relative">
                <select
                    :value="$props.selectedOwner"
                    @input="updateOwner($event)"
                    class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                >
                    <option v-for="owner in $props.owners">{{ owner }}</option>
                </select>
            </div>
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
                class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
            >Framework</label>
            <DropdownSelect
                :frameworks="$props.frameworks"
                :updateFramework="$props.updateFramework"
            />
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
                class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
            >Stage</label>
            <input
                :value="$props.stage"
                @input="updateStage($event)"
                class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="Search"
            />
        </div>
    </div>
</template>