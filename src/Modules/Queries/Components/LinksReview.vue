<template>
    <div class="hshadow md:shadow-none rounded-[6px] p-4 md:p-0 bg-white mb-4">
        <img 
            class="w-6 h-6 hidden md:inline-block invisible" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
        >
        <h1 class="text-[10px] sp:text-base md:text-[36px] font-medium md:font-semibold md:mt-6 leading-3 sp:leading-5 md:leading-[110%]" v-html="requestTexts?.title"></h1>
        <div class="description-container1 mt-2 md:mt-6" v-html="requestTexts?.text1"></div>
        <div class="buttons">
            <div v-if="requestTexts?.otas_enabled?.google && requestTexts?.buttonAnchor" class="mt-0 sp:mt-2 text-center">
                <GoOtaButton customClasess="max-w-[310px] md:font-semibold" ota="google" textButton="Continuar con Google"/>
            </div>
            <div v-if="requestTexts?.otas_enabled?.tripadvisor && requestTexts?.buttonAnchor" class="mt-2 sp:mt-4 md:mt-6 text-center">
                <GoOtaButton customClasess="max-w-[310px] md:font-semibold" ota="tripadvisor" textButton="Continuar con Tripadvisor" />
            </div>
            <div class="description-container2 mt-3 sp:mt-6 md:mt-8" v-html="requestTexts?.text2"></div>
            <!-- <p class=" text-sm md:text-[21px] md:leading-7">Si reservaste online, podrían solicitarte tu opinión pronto.</p>
            <p class="text-sm md:text-[21px] md:leading-7">Valoramos mucho que la compartieras.</p>
            <p class="mt-2 md:mt-6 text-sm md:text-[27px] font-semibold md:font-medium text-center md:leading-7">Agradecemos tu tiempo y <br>¡Gracias por habernos elegido!</p> -->
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import GoOtaButton from '@/components/GoOtaButton.vue'
import { useRequestSettingStore } from '@/stores/modules/requestSettings';


const requestSettingsStore = useRequestSettingStore();

const requestTexts = ref(null);

onBeforeMount(async ()=>{
    requestTexts.value = await requestSettingsStore.$getPostStayRequestData();
    // console.log('requestTexts.value',requestTexts.value)  
})

</script>
<style>
.description-container2 > strong,
.description-container1 > p,
.description-container2 > p{
    font-size: 14px;
}

.description-container2 > strong{
    font-weight: 500;
}

@media (min-width: 768px) {
    .description-container1 > p{
        font-size: 24px;
        line-height: 130%;
    }
    .description-container2 > p{
        font-size: 21px;
    }
    .description-container2 > strong{
        font-size: 27px;
        font-weight: 600;
    }
}

.description-container2 > .ql-align-center{
    text-align: center;
}

@media (max-width: 224px) {
    .description-container2 > strong,
    .description-container1 > p,
    .description-container2 > p{
        font-size: 8px;
        line-height: 130%;
    }
}
</style>