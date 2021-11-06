<script lang="ts">
import { ref, PropType } from 'vue'
const images = {
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
}

interface Props {
    img: keyof typeof images
}

export default {
    props: {
        img: {
            required: true,
            type: String as PropType<keyof typeof images>,
        }
    },
    setup(props: Props) {
        const imgLogo = ref('imgLogo')
        imgLogo.value = images[props.img]
        return {
            imgLogo: imgLogo.value
        }
    }
}
</script>

<template>
    <div
        class="w-full h-52 rounded bg-gray-200 border-gray-300 border m-5 py-2 px-4 shadow-xl relative"
    >
        <div class="border-b border-gray-600 pb-1 flex justify-between items-center align-middle">
            <h4 class="text-left text-xl flex gap-1 w-full">
                <img class="w-8" :src="imgLogo" />
                <span class="flex items-end">Frontend</span>
            </h4>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 cursor-pointer"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
            </svg>
        </div>
        <ul class="py-4 flex flex-col text-sm">
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Name:</span>
                <span>Cart Service</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Created At:</span>
                <span>24/6/21 2:53 am</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Owner:</span>
                <span>John Doe</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Stage:</span>
                <span>CI</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Framework:</span>
                <span>Node</span>
            </li>
        </ul>
        <div class="text-right w-full absolute bottom-2 right-2">
            <button
                class="rounded-2xl text-white inset-y-full bg-indigo-800 border-gray-500 p-2"
            >Action</button>
        </div>
    </div>
</template>