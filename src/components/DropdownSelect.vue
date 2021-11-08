<script lang="ts">
import { ref, PropType } from 'vue'

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

        const onChange = (e: any, index: number) => {
            props.updateFramework(e.target.checked, index)
        }

        const selectAll = (e: any) => {
            props.frameworks.forEach((i, idx) => {
                props.updateFramework(e.target.checked, idx)
            })
        }

        const isAllSelected = props.frameworks.every(i => i.checked)

        return { open, handleClick, handleClickOutside, frameworks: props.frameworks, isAllSelected, onChange, selectAll }
    },
}
</script>

<template>
    <!-- {{ open }} -->
    <div class="dropdown inline-block relative w-full">
        <button
            @click="handleClick"
            class="bg-white border-gray-200 border text-gray-700 py-2 px-4 rounded items-center w-full flex justify-between"
        >
            <span class="mr-1">Select</span>
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
            class="dropdown-menu p-2 absolute text-gray-700 border border-gray-300 bg-white shadow-lg pt-1 z-10 w-full"
        >
            <label class="inline-flex items-center mt-3">
                <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-indigo-600"
                    v-model="isAllSelected"
                    @input="selectAll"
                />
                <span class="ml-2 text-gray-700">Select All</span>
            </label>
            <div class="mx-4 flex-col flex">
                <label v-for="(item, index) in frameworks" class="inline-flex items-center mt-3">
                    <input
                        type="checkbox"
                        class="form-checkbox h-5 w-5 text-indigo-600"
                        v-model="item.checked"
                        @change="onChange($event, index)"
                    />
                    <span class="ml-2 text-gray-700">{{ item.framework }}</span>
                </label>
            </div>
            <!-- <div class="flex flex-row-reverse w-full border-t border-gray-300 pt-2">
                <button
                    class="rounded-3xl text-white inset-y-full bg-indigo-800 border-gray-500 py-2 px-6"
                >Filter</button>
            </div>-->
        </div>
    </div>
</template>