<template>
    <div class="bg-white w-full fixed z-[1800] bottom-[73px] left-0 rounded-t-[10px] text-center">
        <span class="w-[64px] h-1 hbg-gray-200 inline-block rounded-full"></span>
        <div class="mt-2 px-4 relative">
            <img 
                class="w-6 h-6 absolute left-4 cursor-pointer" 
                src="/assets/icons/close.svg" 
                @click="close"
            >
            <h2 class="text-center text-sm font-medium">Inbox</h2>
        </div>

        <div class="mt-4">
            <button @click="goQueries" class="p-4 flex items-center w-full hover-gray-100">
                <img class="w-6 h-6" src="/assets/icons/1.TH.Consultas.svg" alt="Consultas icon">
                <p class="text-sm font-semibold mx-2">Consultas</p>
                <span class="hbg-warning text-xs font-semibold rounded-full px-1.5 py-0.5">2</span>
                <img src="/assets/icons/next.svg" class="w-6 h-6 ml-auto" alt="next icon">   
            </button>
            <div class="h-[1px] mx-4 hbg-gray-400 rounded-full"></div>
            <button @click="goChat" class="p-4 flex items-center w-full hover-gray-100">
                <img class="w-6 h-6" src="/assets/icons/Chatbubblelineoutline.svg" alt="Consultas icon">
                <p class="text-sm font-semibold mx-2">Chat</p>
                <span class="hbg-warning text-xs font-semibold rounded-full px-1.5 py-0.5">2</span>
                <img src="/assets/icons/next.svg" class="w-6 h-6 ml-auto" alt="next icon">   
            </button>
        </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits('close')

function close(){
    emit('close')
}

function goChat(){
    router.push({ name: 'WindowChatMobile' });
    emit('close')
}

function goQueries(){
    router.push({ name: 'QueriesIndex' });
    emit('close')
}
</script>

<style scoped>
</style>
  