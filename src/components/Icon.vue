<template>
    <span class="inline-block " :class="class">
        <div class="custom-class" v-html="svg_content" />
    </span>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue';

const props = defineProps({
    class: {
        type: String,
        default: () => ({})
    },
    name: {
        type: String,
        default: '',
    },
    fullPath: {
        type: String,
        default: '',
    }
})

const { name, fullPath } = toRefs(props)

//DATA
const svg_content = ref('')

//FUNCTION
onMounted( async () => {
    const iconPath = fullPath.value || `/assets/icons/${name.value}.svg`
    const response = await fetch(iconPath)
    svg_content.value = await response.text()  
})

</script>

<style >
    .custom-class svg {
        width: 100%;
        height: 100%;
    }
</style>