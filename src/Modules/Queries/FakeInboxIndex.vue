<template>
    <SectionBar :title="$t('profile.inbox.title')" :fixed="false"/>
    <!-- pre-stay -->
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[5000]" />
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
import SectionBar from '@/components/SectionBar.vue';
import TextQuery from './Components/TextQueryRed.vue';
import IconsQuery from './Components/IconsQueryRed.vue'

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
    console.log('settings.value',settings.value)
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