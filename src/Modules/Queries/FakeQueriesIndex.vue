<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[5000]" />
    <div class="queries-head hshadow p-3 sp:p-4 relative">
        <img 
            @click="goBack"
            class="absolute top-3.5 left-3.5 w-3 h-3" 
            src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
        >
        <h1 class="text-center text-xs font-medium">Feedback</h1>
    </div>
    <div class="queries-body h-[75vh] sp:h-[81vh] overflow-y-auto px-2 py-4">
        <!-- pre-stay -->
        <TextQuery 
            v-if="params.period == 'pre-stay'"
            :settings="settings"
            :data="{period:'pre-stay'}"
        />
        <!-- in-stay & post-stay -->
        <IconsQuery 
            v-if="params.period == 'in-stay'"
            :settings="settings"
            :data="{period:'in-stay'}"
        />
        <IconsQuery 
            v-if="params.period == 'post-stay'"
            :settings="settings"
            :data="{period:'post-stay'}"
        />
    </div>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import TextQuery from './Components/TextQuery.vue';
import IconsQuery from './Components/IconsQuery.vue'

import { useQuerySettingsStore } from '@/stores/modules/querySettings';

const querySettingsStore = useQuerySettingsStore();

onMounted(async ()=>{
    await getQuerySettings();
})

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})

const params = ref(props.paramsRouter);
const settings = ref([]);

async function getQuerySettings(){
    settings.value = await querySettingsStore.$getAll();
}

const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(null);

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);
</script>