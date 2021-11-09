<script lang="ts">
import { ref, PropType, computed } from 'vue'

import { frameworks } from '../types/frameworks'

export default {
    name: 'DropdownSelect',
    props: {
        frameworks: {
            type: Object as PropType<frameworks[]>,
            required: true,
        },
        updateFramework: {
            type: Function as PropType<(checked: boolean, index: number) => void>,
            required: true,
        }
    },
    setup(props: { frameworks: frameworks[], updateFramework: (checked: boolean, index: number) => void }) {
        const open = ref(false)
        const handleClick = (e: Event) => {
            e.stopPropagation()
            open.value = !open.value
        }
        const handleClickOutside = () => {
            open.value = false
        }

        const onChange = (e: Event, index: number) => {
            props.updateFramework((e.target as HTMLInputElement).checked, index)
        }

        const selectAll = (e: Event) => {
            props.frameworks.forEach((i, idx) => {
                props.updateFramework((e.target as HTMLInputElement).checked, idx)
            })
        }

        const isAllSelected = computed(() => props.frameworks.every(i => i.checked))

        return { open, handleClick, handleClickOutside, frameworks: props.frameworks, isAllSelected, onChange, selectAll }
    },
}
</script>

<template>
    <div class="dropdown inline-block relative w-full">
        <button
            @click="handleClick"
            class="bg-white border-gray-200 border text-gray-700 py-2 px-4 rounded items-center w-full flex justify-between"
        >
            <span v-if="$props.frameworks.every(i => !i.checked)" class="mr-1">Select framework</span>
            <span
                v-else
                class="mr-1 text-indigo-600"
            >{{ $props.frameworks.filter(i => i.checked).length }} selected</span>
            <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
            </svg>
        </button>
        <div
            v-if="open"
            v-click-outside="handleClickOutside"
            class="dropdown-menu p-4 absolute text-gray-700 border border-gray-300 bg-white shadow-lg pt-1 z-10 w-full"
        >
            <label
                class="inline-flex items-center mt-3 border-b border-gray-200 w-full pb-2 cursor-pointer"
            >
                <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-indigo-600 utline-none focus:outline-none focus:ring-white cursor-pointer"
                    v-model="isAllSelected"
                    @input="selectAll"
                />
                <span class="ml-2 text-gray-700">Select All</span>
            </label>
            <div class="mx-4 flex-col flex">
                <label
                    v-for="(item, index) in frameworks"
                    :key="index"
                    class="inline-flex items-center mt-3 cursor-pointer"
                >
                    <input
                        type="checkbox"
                        class="form-checkbox h-5 w-5 text-indigo-600 outline-none focus:outline-none focus:ring-white cursor-pointer"
                        v-model="item.checked"
                        @change="onChange($event, index)"
                    />
                    <span class="ml-2 text-gray-700">{{ item.framework }}</span>
                </label>
            </div>
        </div>
    </div>
</template>