<script lang="ts">
import { ref, PropType } from 'vue'
const images = {
    Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
    Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    Flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    Spring: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
}

interface Props {
    framework: string,
    name: string,
    creationDate: string,
    stage: string,
    owner: string,
}

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        creationDate: {
            type: String,
            required: true,
        },
        stage: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        framework: {
            required: true,
            type: String as PropType<string>,
        },
    },
    setup(props: Props) {
        const imgLogo = ref(images[props.framework as keyof typeof images])
        return {
            imgLogo: imgLogo.value
        }
    }
}
</script>

<template>
    <div
        class="w-full h-52 rounded bg-gray-50 border-gray-300 border my-2 mx- py-2 px-4 shadow-xl relative"
    >
        <div class="border-b border-gray-600 pb-1 flex justify-between items-center align-middle">
            <h4 class="text-left text-xl flex gap-1 w-full">
                <img class="w-8" :src="imgLogo" />
                <span class="flex items-end">{{ $props.name }}</span>
            </h4>
            <font-awesome-icon
                :icon="['fa', 'ellipsis-v']"
                class="h-4 w-4 cursor-pointer text-gray-500"
            />
        </div>
        <ul class="py-4 flex flex-col text-sm">
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Created At:</span>
                <span>{{ $props.creationDate }}</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Owner:</span>
                <span>{{ $props.owner }}</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Stage:</span>
                <span>{{ $props.stage }}</span>
            </li>
            <li class="flex">
                <span class="mr-5 font-medium min-w-max w-20">Framework:</span>
                <span>{{ $props.framework }}</span>
            </li>
        </ul>
        <div class="text-right w-full absolute bottom-2 right-2">
            <button
                class="rounded-3xl text-white inset-y-full bg-indigo-800 border-gray-500 py-2 px-4"
            >Action</button>
        </div>
    </div>
</template>