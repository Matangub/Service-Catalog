<script lang="ts">
export default {
    name: 'DropdownSelect',
    setup() {

    }
}
</script>

<template>
    <div class="dropdown inline-block relative w-full">
        <button
            class="bg-white border-gray-300 border text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center w-full flex justify-between"
        >
            <span class="mr-1">Dropdown</span>
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
            class="dropdown-menu p-2 absolute hidden text-gray-700 border border-gray-300 bg-white shadow-lg pt-1 z-10 w-full"
        >
            <label class="inline-flex items-center">
                <input type="checkbox" class="form-checkbox text-indigo-600" checked />
                <span class="ml-2">Select All</span>
            </label>
            <div class="mx-4 my-2 flex-col flex">
                <label class="inline-flex items-center">
                    <input type="checkbox" class="form-checkbox" checked />
                    <span class="ml-2">Nodejs</span>
                </label>
                <label class="inline-flex items-center">
                    <input type="checkbox" class="form-checkbox" checked />
                    <span class="ml-2">Python</span>
                </label>
                <label class="inline-flex items-center">
                    <input type="checkbox" class="form-checkbox" checked />
                    <span class="ml-2">Go</span>
                </label>
            </div>
            <div class="flex flex-row-reverse w-full border-t border-gray-300 pt-2">
                <button
                    class="rounded-3xl text-white inset-y-full bg-indigo-800 border-gray-500 py-2 px-6"
                >Filter</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
    display: block;
}
</style>