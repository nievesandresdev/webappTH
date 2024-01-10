<template>
    <Dialog :open="openModal" class="relative">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[1000]" aria-hidden="true" />
  
      <!-- Full-screen container to center the panel -->
      <div class="fixed left-0 lg:top-0 bottom-0 lg:right-0 flex w-screen items-center justify-center z-[1200] ">
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full lg:max-w-[360px] bg-white rounded-t-[0.85rem] lg:rounded-b-[0.85rem]">
            <div class="relative">
                <h1 class="text-lg font-medium text-center leading-6 pt-4">
                    {{ $utils.capitalize($t('stay.stayLog.title')) }}
                </h1>
                <div class="absolute top-3 right-4">
                    <MiniLangDropdown />
                </div>
            </div>

            <div class="">
                <!-- body -->
                <div class="body-xs pb-6 mt-4">
                    <div class="px-4">
                        <label class="text-sm mb-2 font-medium block">
                            {{ $utils.capitalize($t('stay.stayLog.checkDate.label')) }}
                        </label>
                        <THInputCalendar
                            :textLabel="$t('stay.stayLog.checkDate.placeholder')"
                            v-model="form.check_date"
                            :error="errorsKey.includes('check_date')"
                            :show_error_msg="false"
                            :minDate="null"
                            mandatory
                        />
                        <!-- :texterror="texterror_calendar" -->
                    </div>
                    <div class="mt-4 px-4">
                        <label class="text-sm mb-2 font-medium block">
                            {{ $utils.capitalize($t('stay.stayLog.howPeople')) }}
                        </label>
                        <THInputField
                            :textLabel="'Nº huéspedes'"
                            :options="options_n_guests"
                            v-model="form.number_guests"
                            :top_dropdown="'top-0'"
                            :extra_dropdown="'dropdown-clasess'"
                            mandatory
                        />
                    </div>
                    <div class="mt-4 px-4">
                        <a :href="'#i'+list_guest.length" class="text-sm font-bold underline" @click="()=> list_guest.push({email:null})">
                            {{ $utils.capitalize($t('stay.stayLog.addGuest')) }}
                        </a>
                    </div>
                    <div 
                        v-for="(guest, index) in list_guest"
                        class="mt-4 px-4"
                    >
                        <THInputText
                            :id="'i'+(index+1)"
                            :textLabel="$t('stay.stayLog.guest')+' '+(index+2)"
                            :placeholder="$t('stay.guestLog.email.placeholder')"
                            :textError="$t('stay.guestLog.email.error')"
                            :type="'email'"
                            v-model="list_guest[index].email"
                            @handleError="emailError = $event"
                            :customClasses="{
                                'hborder-gray-400':!list_guest[index].email
                            }"
                        />
                        <div class="text-right mt-2">
                            <button 
                                @click="guest_delete(index)"
                                class="text-sm font-medium underline">{{$utils.capitalize($t('stay.stayLog.deleteGuest'))}}
                            </button>
                        </div>
                    </div>
                </div>
                <!-- end body -->
                <!-- footer -->
                <div class="flex justify-between p-4 border-t">
                    <a @click="back_to_guestform" href="javascript:void(0)" class="text-sm font-medium my-auto underline hover:underline hover-htext-green-600">
                        {{ $utils.capitalize($t('stay.stayLog.backButton')) }}
                    </a>
                    <button 
                        class="hbtn-cta py-3 px-4 text-sm leading-4"
                        :class="{'cta-disabled':!valid}"
                        @click="submit"
                        :disabled="!valid"
                    >
                        {{ $utils.capitalize($t('stay.stayLog.button')) }}
                    </button>
                </div>
            </div>
        </DialogPanel>
      </div>
    </Dialog>
  </template>
  
  <script setup>
    import { onMounted, reactive, ref, computed } from 'vue';
    import THInputText from '@/components/THInputText.vue';
    import THInputField from '@/components/THInputField.vue';
    import MiniLangDropdown from '@/layout/Components/MiniLangDropdown.vue';
    import THInputCalendar from '@/components/THInputFieldCalendar.vue'
    import { Dialog } from '@headlessui/vue'

    const props = defineProps({
        openModal: {
            type:Boolean,
            default:false
        }
    })

    onMounted(()=>{
        console.log('staymodla',props.openModal)
    })

    //data
    const form = reactive({
        number_guests:'1',
        check_date:null,
        list_guest:[],
        language:'es'
    });
    const errorsKey = ref([]);
    const emailError = ref(false);
    const list_guest = ref([]);
    const options_n_guests = [
        {value:'1',label:'1',},
        {value:'2',label:'2',},
        {value:'3',label:'3',},
        {value:'4',label:'4',},
        {value:'5',label:'5',},
        {value:'6',label:'6',},
        {value:'7',label:'7',},
        {value:'8',label:'8',},
        {value:'9',label:'9',},
        {value:'10',label:'10',},
    ] 

    //functions
    const guest_delete = (i) =>{
        list_guest.value.splice(i, 1);
    }
    
    const back_to_guestform = () => {
        // Inertia.post(route('hoster.back_to_guestform'))
    }

    const submit = () => {
        if(valid.value){
            // let modal = $('#'+id);
            form.list_guest = list_guest.value;
            // form.post(route('hoster.check.stay',{hoster:hotel.slug}),{
            //     preserveScroll: true,
            //     onSuccess: (result) => {
            //         // modal.modal('hide')
            //     }
            // });
        }
    }

    //COMPUTED
    const valid = computed(() => {
        return form.check_date && !emailError.value
    })
  </script>

