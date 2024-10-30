<template>
    <BottomSheet :open-bottom-sheet="open && !$utils.isMockup()">
       <div class="px-4 pt-6">
           <HeadInChain 
               text="Crea tu estancia"
               title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
           />
           <div class="mt-10">
                <FormCreateStay />
           </div>
       </div>
     
   </BottomSheet>
</template>
<script setup>
import { toRefs } from 'vue'
import { navigateTo } from '@/utils/navigation'
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue';
import FormCreateStay from './Components/FormCreateStay.vue';

const props = defineProps({
   open:{
       type: Boolean,
       default: false
   }
})

const { open } = toRefs(props)

</script>