<template>
    <div class="h-screen flex w-screen">
        <div class="m-auto px-4 overflow-y-auto py-6">
            
            <h1 class="lato text-[20px] font-bold leading-[28px] text-center">{{ $t('checkin.autocomplete.title') }}</h1>
            <p class="mt-4 lato text-base font-medium text-[20px] leading-[20px]">
                {{ $t('checkin.autocomplete.description-1') }} <br><br>
                <span class="font-bold">{{ $t('checkin.autocomplete.description-2') }}</span><br>
                {{ $t('checkin.autocomplete.description-3') }}
            </p>
            <div class="mt-6">
                <div>
                    <h3 class="lato text-base font-bold leading-[16px] text-center">{{ $t('checkin.autocomplete.passport-title') }}</h3>
                    <img class="mt-1 w-[215px] mx-auto block" src="/assets/img/Pasaporte-img-1.svg" alt="">
                </div>
                <div class="mt-5">
                    <h3 class="lato text-base font-bold leading-[16px] text-center">{{ $t('checkin.autocomplete.dninie-title') }}</h3>
                    <img class="mt-4 w-[255px] mx-auto block" src="/assets/img/Pasaporte-img-2.svg" alt="">
                </div>
            </div>
            <div class="mt-8">
                <PrimaryButton 
                    classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                    @click="abrirFileInput"
                    :isLoading="isLoading"
                    :disabled="isLoading"
                >
                {{$t('checkin.autocomplete.scan-doc')}}
                </PrimaryButton> 
            </div>
            <div class="mt-6 text-center">
                <button class="lato underline text-sm font-bold leading-[16px]" @click="backToForm">{{$t('checkin.autocomplete.backtoform')}}</button>
            </div>

            <!-- Input oculto para tomar la foto (móvil) o subir archivo (desktop) -->
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                capture="environment"
                style="display: none"
                @change="onFileSelected"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, toRefs } from 'vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import utils from '@/utils/utils.js';
import { useHistoryStore } from '@/stores/modules/history';
const historyStore = useHistoryStore();
import { useCheckinStore } from '@/stores/modules/checkin';
const checkinStore = useCheckinStore();
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
import { useToast } from "vue-toastification";
const toast = useToast();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// Referencia al input oculto
const fileInput = ref(null);
const isLoading = ref(false);

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})
const { paramsRouter } = toRefs(props)

// Método para mostrar la "ventana" de cámara al usuario
function abrirFileInput() {
  if (isInAppBrowser()) {
    alert(t('checkin.autocomplete.browser-warning'));
    return;
  }else{
    alert('normal');
  }
//   if (fileInput.value) {
//     fileInput.value.click();
//   }
}

// Cuando el usuario toma la foto / selecciona archivo
async function onFileSelected(e) {
    isLoading.value = true;
    const file = e.target.files?.[0];
    if (!file) return;
    // En este punto ya tienes la imagen.
    // El siguiente paso será enviarla a tu backend 
    // para pasársela a Azure (lo harás en la fase posterior).

    console.log('Archivo seleccionado:', file);
    // Aquí podrías navegar a otra vista,
    // o mostrar un loader, etc.
    let data = await checkinStore.$sendPassportImage(file)
    console.log('test data',);
    if(data.mrzData){
        await checkinStore.$fillOutForm(data.mrzData)
        router.push({ name:'CompleteCheckin', params:{ id: paramsRouter.value.id }})
    }else{
        toast(t('checkin.autocomplete.error-scan'), {
            toastClassName: "warning-toast",
            bodyClassName: "warning-toast-body",
            position: "top-right",
            icon: false,
            closeButton: false,  
            hideProgressBar: true,
        });
    }
    isLoading.value = false;
}

const backToForm = () =>{
    let fromAnyPlace = Boolean(utils.getUrlParam('returnTo'))
    //si existe esta query retonarmos a la vista exclusiva guardada
    // console.log('test fromAnyPlace',fromAnyPlace)
    if(fromAnyPlace){
        // console.log('test se metio')
        historyStore.$goExclusiveRoute(router);
    }
}

function isInAppBrowser() {
  const ua = navigator.userAgent || "";

  // 1. Si es iOS: en un navegador "real" (Safari) se incluye "Safari",
  //    en un webview generalmente no aparece.
  const isIOS = /iP(hone|od|ad)/.test(ua);
  if (isIOS && !/Safari/.test(ua)) {
    return true;
  }

  // 2. Para Android, los webviews suelen incluir "wv" en el user agent.
  if (/Android/.test(ua) && /\bwv\b/.test(ua)) {
    return true;
  }

  // 3. Otros indicadores comunes de navegadores incrustados:
  if (/FBAN|FBAV|Instagram|GSA/.test(ua)) {
    return true;
  }

  return false;
}

</script>