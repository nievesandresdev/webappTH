<template>
  <div
    v-if="subservices.length > 0"
    class="mt-[36] sp:mt-[48px]"
  >
    <h3 class="text-[9px] sp:text-[16px] lato font-bold leading-none">{{ $t('service.detail-page.options.title') }}</h3>
    <div class="mt-[9px] sp:mt-[10px] space-y-[14px] sp:space-y-[14px]">
      <CardList
        v-for="subservice in subservices"
        :key="subservice.id"
        :data="subservice"
        isSubservice
        @navigate="handleNavigate(subservice)"
      />
    </div>
  </div>

  <BottomSheetDetailSubservice /> 
</template>

<script setup>
import { inject, computed, ref, provide, watch, nextTick } from 'vue';
import CardList from './components/CardList.vue';
import BottomSheetDetailSubservice from './components/BottomSheetDetailSubservice.vue';

const serviceData = inject('serviceData');
const queryRouter = inject('queryRouter');

// DATA
const isOpenBottomSheet = ref(false);
const subserviceData = ref(null);

const subservices = computed(() => {
    let subservices = serviceData.value?.subservices ?? [];
    return subservices.map(service => ({
        ...service,
        isSubservice: true,
        image: {url: service?.image},
    }));
});

const handleNavigate = (subservice) => {
  isOpenBottomSheet.value = true;
  subserviceData.value = subservice;
}

watch(subservices, (valueCurrent, valueOld) => {
    nextTick(() => {
      let subserviceId = queryRouter?.subserviceId;
      if (subserviceId) {
        let subservice = subservices.value.find(subservice => subservice.id === parseInt(subserviceId));
        if (subservice) {
                handleNavigate(subservice);
            }
        }
    });
}, { immediate: true });

provide('isOpenBottomSheet', isOpenBottomSheet);
provide('subserviceData', subserviceData);
</script>