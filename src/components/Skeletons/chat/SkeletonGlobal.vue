<template>
    <div class="py-3 sp:py-6 px-2 xp:px-4 bg-[#fafafa] flex-grow sp:mx-[-16px]">
        <div 
            v-for="msg in chatMessages" 
            :key="msg" 
            class="min-w-[74px] sp:min-w-[111px] max-w-[168px] sp:max-w-[253px] mb-5 animate-pulse flex flex-col" 
            :class="{'ml-auto':msg.by == 'Guest','mr-auto':msg.by == 'Hoster'}"
        >
            <p 
                class="break-words lato text-sm font-medium leading-[12px] sp:leading-[16px] p-2.5 sp:p-4 bg-border-secondary htext-secondary rounded-[6px] sp:rounded-[10px]" 
                :class="{'bg-msg-guest':msg.by == 'Guest','bg-msg-hoster':msg.by !== 'Guest'}"
            >
                {{ msg.text }}
            </p>
            <p 
                class="lato text-xs font-medium leading-[16px] mt-1 bg-border-secondary htext-secondary rounded-[10px]"
                :class="{'ml-auto':msg.by == 'Guest','mr-auto':msg.by == 'Hoster'}"
            >
                {{ msg.date }} {{ msg.hour }}
            </p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const chatMessages = ([
    {
        text: "x",
        date: "14/08/23",
        hour: "14:56",
        by: "Hoster",
    },
    {
        text: "x",
        date: "14/08/23",
        hour: "14:55",
        by: "Guest",
    },
    {
        text: "x",
        date: "14/08/23",
        hour: "15:00",
        by: "Hoster",
    },
    {
        text: "x",
        date: "14/08/23",
        hour: "15:05",
        by: "Guest",
    },
    {
        text: "x",
        date: "14/08/23",
        hour: "15:00",
        by: "Hoster",
    },
    {
        text: "x",
        date: "14/08/23",
        hour: "15:05",
        by: "Guest",
    }
]);

</script>