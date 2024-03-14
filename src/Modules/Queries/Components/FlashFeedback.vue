<template>
    <div class="hshadow rounded-[6px] p-4 mb-4">
        <p class="text-sm">{{ text }}</p>
    </div>
</template>
<script setup>
defineProps({
    text:{
        type:String,
        default:null
    }
})
</script>