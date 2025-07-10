<template>
    <!-- <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" /> -->
      
  <HeaderProfile
    :title="$t('profile.personal_info.title')"
    :tabs="tabsMenu"
    :backUrl="`/${route.params.hotelSlug}/perfil`"
  >
    <template v-slot:iconRight>
      <PrimaryButton class="rounded-full p-2 shadow-guest">
        <IconCustomColor
          @click="isWhyModalOpen = true"
          name="WA.Question"
          :width="24"
          :height="24"
          :color="chainStore.customizationData?.colors[0].contrast_color" 
        />
      </PrimaryButton>
    </template>
  </HeaderProfile>

  
  <SlideTransition 
  ref="slideTransition" 
  :tabs="tabsMenu"  
  />
  <SubmitButton/>

  <ModalNative width="327px" top="18%" @closeModal="isWhyModalOpen = false" :openProp="isWhyModalOpen">
      <div class="p-6">
          <h2 class="lato text-lg font-bold leading-[20px]">{{ $t('checkin.form.why-data-title') }}</h2>
          <ul class="mt-6 pl-6">
              <li class="lato text-sm leading-[16px] list-disc">
                  {{ $t('checkin.form.why-data-p6') }}
              </li>
              <li class="lato text-sm leading-[16px] list-disc mt-3">
                  {{ $t('checkin.form.why-data-p4') }}
              </li>
              <li class="lato text-sm leading-[16px] list-disc mt-3">
                  {{ $t('checkin.form.why-data-p5') }}
              </li>
          </ul>
          <div class="mt-6">
              <PrimaryButton 
                  classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                  @click="isWhyModalOpen = false"
              >
                  {{ $t('checkin.form.why-data-continue') }}
              </PrimaryButton> 
          </div>
          <div class="mt-4 text-center">
              <button class="underline lato text-sm font-bold leading-[16px]" @click="goPolices">
                  {{ $t('checkin.form.see-policies') }}
              </button>
          </div>
      </div>
  </ModalNative>
</template>
    
<script setup>
  import { ref, onMounted, computed, watch, provide } from 'vue';
  import router from '@/router';
  
  import { useRoute } from "vue-router";
  const route = useRoute();
  
  import { useTabs } from '@/stores/modules/tabs';
  const tabs = useTabs();
  
  import { useHotelStore } from '@/stores/modules/hotel';
  const hotelStore = useHotelStore();
  import { useHistoryStore } from '@/stores/modules/history';
  const historyStore = useHistoryStore();
  import { useChainStore } from '@/stores/modules/chain';
  const chainStore = useChainStore();

  import { useMyDataStore } from '@/stores/modules/user/myData';
  const myDataStore = useMyDataStore();

  import SubmitButton from './Components/SubmitButton.vue';
  import SlideTransition from '@/components/Transition/SlideTransition.vue'
  import HeaderProfile from '@/layout/Components/HeaderProfile.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import IconCustomColor from '@/components/IconCustomColor.vue';
  import ModalNative from '@/components/ModalNative.vue'
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

  
  
  // DATA
    
  const isWhyModalOpen = ref(false);
  const slideTransition = ref(null);
  const testVar = ref('perro sucio');
  provide('testVar',testVar);
  const tabsMenu = computed(() => [
    {    
      title: 'Información',//t('hotel.information')
      exclude: false,
      iconDefault: '1.WA.INFOHUESPED',
      iconSelected: `1.WA.INFOHUESPED`,
      routeName: 'PersonalInfo',
      isActive: router.currentRoute.value.name === 'PersonalInfo',
      onClick: () => changeTab('PersonalInfo'),
    },
    {    
      title: 'Ubicación',
      exclude: false,
      iconDefault: 'WA.pin-point',
      iconSelected: `WA.pin-point`,
      routeName: 'UbicationData',
      isActive: router.currentRoute.value.name === 'UbicationData',
      onClick: () => changeTab('UbicationData'),
    },
    {
      title: 'Contacto',
      exclude: false,
      iconDefault: 'WA.SMS',
      iconSelected: `WA.SMS`,
      routeName: 'ContactData',
      isActive: router.currentRoute.value.name === 'ContactData',
      onClick: () => changeTab('ContactData'),
    }
  ]);

   
 
  function changeTab (name) {
    slideTransition.value.goView({name})
    // router.push({ name: r });
  }

  async function goPolices() { 
      // let routeQuery = { ...route.query, step: currentStep.value };
      // await historyStore.$saveExclusiveRoute(route.name, route.params, routeQuery);
      // router.push({name:'PrivacyPolicies', query:{ returnTo: 'true' }})
      router.push({name:'PrivacyPolicies'})
  }
</script>

<style scoped>
.mydata-layout {
  min-height: 100vh;
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-state {
  padding: 1rem;
}
</style>