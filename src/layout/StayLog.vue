<template>
    <Dialog :open="false" class="relative">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[1000]" aria-hidden="true" />
  
      <!-- Full-screen container to center the panel -->
      <div 
        class="fixed left-0 lg:top-0 bottom-0 lg:right-0 flex w-screen items-center justify-center z-[1200]" 
        :class="openModal ? 'dialog-enter-active' : 'dialog-leave-active'"
    >
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full lg:max-w-[360px] bg-white rounded-t-[0.85rem] lg:rounded-b-[0.85rem]">
            <div class="relative">
                <h1 class="text-lg font-medium text-center leading-6 pt-4">
                    {{ $utils.capitalize($t('stay.stayLog.title')) }}
                </h1>
                <div class="absolute top-3 right-4">
                    <MiniLangDropdown v-model="form.language" />
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
                            v-model="form.checkDate"
                            :error="errorsKey.includes('checkDate')"
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
                            v-model="form.numberguests"
                            :top_dropdown="'top-0'"
                            :extra_dropdown="'dropdown-clasess'"
                            mandatory
                        />
                    </div>
                    <div class="mt-4 px-4">
                        <a class="text-sm font-bold underline cursor-pointer" @click.prevent="addGuestToList">
                            {{ $utils.capitalize($t('stay.stayLog.addGuest')) }}
                        </a>
                    </div>
                    <div 
                        v-for="(guest, index) in form.listGuest"
                        class="mt-4 px-4"
                    >
                        <THInputText
                            :id="'i'+(index+1)"
                            :textLabel="$t('stay.stayLog.guest')+' '+(index+1)"
                            :placeholder="$t('guest.guestLog.email.placeholder')"
                            :textError="$t('guest.guestLog.email.error')"
                            :type="'email'"
                            v-model="form.listGuest[index].email"
                            @handleError="emailError = $event"
                            :customClasses="{
                                'hborder-gray-400':!form.listGuest[index].email
                            }"
                        />
                        <div class="text-right mt-2">
                            <button 
                                @click="guestDelete(index)"
                                class="text-sm font-medium underline">{{$utils.capitalize($t('stay.stayLog.deleteGuest'))}}
                            </button>
                        </div>
                    </div>
                </div>
                <!-- end body -->
                <!-- footer -->
                <div class="flex justify-between p-4 border-t">
                    <a @click="backToGuestform" href="javascript:void(0)" class="text-sm font-medium my-auto underline hover:underline hover-htext-green-600">
                        {{ $utils.capitalize($t('stay.stayLog.backButton')) }}
                    </a>
                    <button 
                        class="hbtn-cta py-3 px-4 text-sm leading-4"
                        :class="{'cta-disabled':!valid || processingForm}"
                        @click="submit"
                        :disabled="!valid || processingForm"
                    >
                        {{ processingForm ? $t('stay.stayLog.processing')+'...' : $t('stay.stayLog.button') }}
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
    import { useStayStore } from '@/stores/modules/stay'
    import { useGuestStore } from '@/stores/modules/guest'
    

    const props = defineProps({
        openModal: {
            type:Boolean,
            default:false
        }
    })

    const emit = defineEmits(['closeModal','back']);
    //store
    const guestStore = useGuestStore()

    const stayStore = useStayStore()

    //data
    const form = reactive({
        numberguests:'1',
        checkDate:null,
        listGuest:[],
        language: localStorage.getItem('locale') || 'es',
        guestId: null,
    });
    const errorsKey = ref([]);
    const emailError = ref(false);
    const processingForm = ref(false);
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
    const guestDelete = (i) =>{
        form.listGuest.splice(i, 1);
    }

    const addGuestToList = () =>{
        console.log('addGuestToList')
        form.listGuest.push({email:null})
    }
    
    const backToGuestform = () => {
        emit('back');
    }

    const submit = async () => {
        let guest = await guestStore.loadLocalGuest()
        form.guestId = guest.id;
        processingForm.value = true
        await stayStore.createAndInviteGuest(form);
        processingForm.value = false
        emit('closeModal');
    }

    //COMPUTED
    const valid = computed(() => {
        return form.checkDate && !emailError.value
    })
  </script>

    <style scoped>
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .dialog-enter-active {
        animation: fadeIn 0.5s ease;
    }

    .dialog-leave-active {
        animation: fadeOut 0.5s ease;
    }
    </style>
