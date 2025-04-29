<template>
    <PageTransitionGlobal module="mydata">
        <div class="px-4 pt-4" ref="formContainer">
            <!-- foto -->
            <div class="flex items-center gap-2 mb-4">
                <!-- Círculo para la foto-->
                <div
                    class="flex justify-center items-center border border-black rounded-full overflow-hidden"
                    style="width: 40px; height: 40px;"
                >
                    <img
                        :src="$formatImage({ url: form.avatar, type: form.avatar_type })"
                        class="object-cover"
                        :class="{ 'w-6 h-6': !form.avatar }"
                        alt="User Avatar"
                    />
                </div>
                <span
                    class="underline text-[14px] font-bold lato cursor-pointer"
                    @click="selectImage"
                    >{{ $t('profile.page_personal_info.change_photo') }}</span
                >
                <!-- Input file oculto -->
                <input
                    type="file"
                    ref="fileInput"
                    class="hidden"
                    @change="onFileSelected"
                    accept="image/*"
                />
            </div>

            <div class="flex flex-col w-full gap-4">
                <THInputText
                    :textLabel="`${$t('checkin.form.input-1-label')}*`"
                    :placeholder="$t('checkin.form.input-1-plchdr')"
                    v-model="form.name"
                    :isError="!form.name && nameTouched"
                    @blur="handleNameBlur"
                    :showTextError="true"
                    :textError="$t('checkin.form.input-1-error')"
                />
                <THInputText
                    :textLabel="`${$t('checkin.form.input-2-label')}`"
                    :placeholder="$t('checkin.form.input-2-plchdr')"
                    v-model="form.lastname"
                    :showTextError="false"
                />
                <THInputText
                    :textLabel="`${$t('checkin.form.input-3-label')}`"
                    :placeholder="$t('checkin.form.input-3-plchdr')"
                    v-model="form.secondLastname"
                    :isError="secondLastnameError"
                    :showTextError="false"
                />
                <!-- birthdate -->
                <div>
                    <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
                        {{$t('checkin.form.input-4-label')}} 
                    </label>
                    <THInputCalendar
                        :textLabel="$t('checkin.form.input-4-plchdr')"
                        v-model="form.birthdate"
                        :show_error_msg="false"
                        :minDate="null"
                        :is_range="false"
                        mandatory
                    />
                </div>
                <!-- nationality -->
                <div>
                    <label class="block mb-2 lato text-sm font-bold leading-[16px]">
                        {{$t('checkin.form.input-10-label')}} {{ form.nationality }}
                    </label>
                    <SearchCountryDropdown 
                        v-model="form.nationality"
                        :placeholder="$t('checkin.form.input-10-plchdr')"
                        @hasError="nationalityError = $event"
                    />
                </div>
                <!-- docType -->
                <div>
                    <label class="block mb-2 lato text-sm font-bold leading-[16px]">
                        {{$t('checkin.form.input-11-label')}}
                    </label>
                    <THInputField
                        icon_left="/assets/icons/WA.Passport.svg"
                        :textLabel="$t('checkin.form.input-11-plchdr')"
                        :options="docType_options"
                        v-model="form.docType"
                        :top_dropdown="'top-0'"
                        :extra_dropdown="'dropdown-clasess'"
                        :error="secondLastnameError"
                        mandatory
                    />
                    <p
                        v-if="secondLastnameError"
                        class="lato text-xs font-bold leading-[16px] htext-alert-negative"
                    >{{$t('checkin.form.input-11-error')}}</p>
                </div>
                <!-- docSupportNumber -->
                <div v-if="form.docType == 'DNI español' || form.docType == 'NIE'">
                    <THInputText
                        :customClasses="{'uppercase':form.docSupportNumber}"
                        :textLabel="`${$t('checkin.form.input-12-label')}`"
                        :placeholder="$t('checkin.form.input-12-plchdr')"
                        iconLeft="/assets/icons/WA.Passport.svg"
                        v-model="form.docSupportNumber"
                        :isError="docSupportNumberError"
                        :showTextError="false"
                    />
                    <p
                        v-if="docSupportNumberError"
                        class="lato text-xs font-bold leading-[16px] htext-alert-negative"
                    >{{$t('checkin.form.input-12-error')}}</p>
                </div>
                <!-- docNumber -->
                <div>
                    <!-- {{ String(docNumberError) }} -->
                    <THInputText
                        :textLabel="`${$t('checkin.form.input-13-label')}`"
                        :placeholder="$t('checkin.form.input-13-plchdr')"
                        :customClasses="{'uppercase':form.docNumber}"
                        iconLeft="/assets/icons/WA.Passport.svg"
                        v-model="form.docNumber"
                        :isError="docNumberError"
                        :showTextError="false"
                    />
                    <p
                        v-if="docNumberError"
                        class="lato text-xs font-bold leading-[16px] htext-alert-negative"
                    >{{$t('checkin.form.input-12-error')}}</p>
                </div>
                <!-- gender  -->
                <div>
                    <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
                        {{$t('checkin.form.input-5-label')}}
                    </label>
                    <THInputField
                        icon_left="/assets/icons/WA.sexo.svg"
                        :textLabel="$t('checkin.form.input-5-plchdr')"
                        :options="options_gender"
                        v-model="form.gender"
                        :top_dropdown="'top-0'"
                        :extra_dropdown="'dropdown-clasess'"
                        mandatory
                    />
                </div>
                <!-- <THInputText
                    :textLabel="`${$t('profile.page_personal_info.form.email.label')}*`"
                    :placeholder="emailPlaceholder"
                    v-model="form.email"
                    :isError="(!form.email && emailTouched) || (emailTouched && !isEmailValid)"
                    @blur="validateEmail"
                    type="email"
                    :showTextError="false"
                /> -->
                <!-- <div>
                    <BaseInputPhone 
                        :textLabel="`${$t('profile.page_personal_info.form.number_phone.label')}`"
                        v-model="form.phone" 
                        @handleError="phoneError = $event"
                    /> 
                </div> -->
                <THInputText
                    :textLabel="`${$t('profile.page_personal_info.form.password.label')}`"
                    :placeholder="`${$t('profile.page_personal_info.form.password.placeholder')}`"
                    v-model="form.password"
                    type="password"
                    :disabled="true"
                />
            </div>
            <div class="flex justify-end mt-2 mb-2">
                <span
                    class="underline lato text-sm font-bold"
                    @click="openModalPassword"
                    >{{ $t('profile.page_personal_info.change_password') }}</span
                >
            </div>
        </div>
    </PageTransitionGlobal>
    <SubmitButton
        :isFormValid="isFormValid"
        @handleSubmit="handleSubmit"
        :sending="sending"
    />
    
    <!-- Modal para cambiar contraseña -->
    <BottomModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
        <div class="flex flex-col w-full gap-4">
            <THInputText
                :textLabel="'Contraseña actual'"
                :placeholder="'Introduce tu contraseña actual'"
                v-model="currentPassword"
                :isError="currentPasswordError"
                :textError="'La contraseña actual introducida es incorrecta'"
                type="password"
            />
            <THInputText
                :textLabel="'Nueva contraseña'"
                :placeholder="'Introduce tu nueva contraseña'"
                v-model="newPassword"
                type="password"
            />
            <button
                @click="handleChangePassword"
                :disabled="!isModalFormValid"
                :class="[
                    'w-full lato flex justify-center items-center h-10 gap-2 rounded-[10px] border text-sm font-bold hshadow-button',
                    isModalFormValid
                        ? 'bg-[#333333] text-white border-white'
                        : 'bg-[#333333] bg-opacity-50 text-[#FAFAFA40] text-opacity-25 border-[rgba(255,255,255,0.25)] shadow-small',
                ]"
            >
                Cambiar contraseña
            </button>
        </div>
    </BottomModal>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount,watch } from 'vue';
import { formatAnyDate } from '@/utils/dateHelpers';
import { useI18n } from 'vue-i18n';
import { $normalizeInput } from '@/utils/utils';
const { t } = useI18n();

import SearchCountryDropdown from '@/components/Forms/SearchCountryDropdown.vue';
import THInputText from '@/components/THInputText.vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import BaseInputPhone from '@/components/Forms/BaseInputPhone.vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'
import THInputField from '@/components/THInputField.vue';
import SubmitButton from './Components/SubmitButton.vue';
//
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading, loading } = useLoadingSections();

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const formContainer = ref(null);
const phoneError = ref(false);




// Resto de tu lógica del formulario...
const form = reactive({
    id: guestStore.guestData?.id,
    name: '',
    lastname: '',
    secondLastname: '',
    birthdate: '',
    nationality: '',
    docType: '',
    docSupportNumber: '',
    docNumber: '',
    gender: '',
    password: '',
    avatar: null,
    updateFields: ['name','lastname','secondLastname','birthdate','nationality','docType','docSupportNumber','docNumber','gender']
});


const isModalOpen = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const currentPasswordError = ref(false);
const nameTouched = ref(false);
const nationalityError = ref(false);
let selectedFile = ref(null);
const originalData = ref(guestStore.guestData)
const sending = ref(false);

startLoading(SECTIONS.MYDATA.GLOBAL);

onMounted(async () => {
    const data = await guestStore.findById(guestStore.guestData.id)
    guestStore.$updateLocalGuestData(data);
    initForm(data);
    stopLoading(SECTIONS.MYDATA.GLOBAL);
});

// const emailErrorText = ref('');
// const emailPlaceholder = computed(() =>
//     !form.email && emailTouched.value
//         ? 'Debes rellenar este campo'
//         : 'Introduce tu correo electrónico'
// );



// Watch for changes in isModalOpen
watch(isModalOpen, (newValue) => {
    newPassword.value = '';
    currentPassword.value = '';
});

const handleNameBlur = () => {
    nameTouched.value = true;
};

const selectImage = () => {
    document.querySelector('input[type="file"]').click();
};

const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        form.avatar = URL.createObjectURL(file);
    }
};

const initForm = (data) => {
    form.id = data.id;
    form.name = data.name ?? '';
    form.lastname = data.lastname ?? '';
    form.secondLastname = data.second_lastname ?? '';
    form.password = '123456587';
    form.avatar = data.avatar ?? '';
    form.avatar_type = data.avatar_type;
    form.birthdate = data.birthdate;
    form.nationality = data.nationality;
    form.docType = data.doc_type ?? '';
    form.docSupportNumber = data.doc_support_number ?? '';
    form.docNumber = data.doc_num ?? '';
    form.gender = data.sex;
};

const isModalFormValid = computed(() => {
    return currentPassword.value && newPassword.value && !currentPasswordError.value;
});

const openModalPassword = () => {
    isModalOpen.value = true;
};

const handleChangePassword = async () => {
    const response = await guestStore.$updatePassword({
        id: form.id,
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
    });

    if (response.ok) {  
        toastSuccess(t('messageRequest.passwordUpdated'), 'bottom-toast-over-64');
        isModalOpen.value = false;
        currentPassword.value = null;
        newPassword.value = null;
    } else {
        currentPasswordError.value = true;
    }
};

const handleSubmit = async () => {
    
    if (isFormValid.value) {
        sending.value = true;
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('name', form.name);
        formData.append('lastname', form.lastname);
        formData.append('secondLastname', form.secondLastname);
        formData.append('birthdate', formatAnyDate(form.birthdate,'dd/MM/yyyy'));
        formData.append('nationality', form.nationality);
        formData.append('docType', form.docType);
        formData.append('docSupportNumber', form.docSupportNumber);
        formData.append('docNumber', form.docNumber);
        formData.append('gender', form.gender);
        formData.append('updateFields', form.updateFields);
        

        if (selectedFile.value) {
            formData.append('avatar', selectedFile.value);
        }
        
        const response = await guestStore.$updateDataGuest(formData);
        if (response.ok) {
            toastSuccess(t('messageRequest.dataSave'), 'bottom-toast-over-64');
            let res = guestStore.$updateLocalGuestData(response.data);
            originalData.value = res;
            initForm(response.data);
        } else {
            console.error('Error al guardar los datos');
        }
        sending.value = false;
    }
};

const $formatImage = (payload) => {
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    let { url, type, urlDefault } = payload;

    // Verifica si la URL es de tipo `blob:` (preview imagen)
    if (url && url.startsWith("blob:")) return url;

    if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg'; 

    if (urlDefault) return url;

    let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
    type = type ?? type_d;

    
    if(type == 'GOOGLE') {
        return url;
    }

    return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};

const options_gender = [
    {value:'Hombre',label:'Hombre'},
    {value:'Mujer',label:'Mujer'},
    {value:'Otro',label:'Otro'},
] 

const docType_options = [
    {value:'Pasaporte',label:'Pasaporte'},
    {value:'DNI español',label:'DNI español'},
    {value:'NIE',label:'NIE'},
] 

watch([currentPassword, newPassword], () => {
    currentPasswordError.value = false;
});

const docSupportNumberPattern = computed(() => {
    if(!form.docSupportNumber || form.docSupportNumber == '') return null;
  switch (form.docType) {
    case 'DNI español':
      return /^[A-Za-z]{3}\d{6}$/;  // 3 letras, 6 números
    // return /^[A-Za-z]\d{8}[A-Za-z]$/; //Una letra seguida de ocho cifras y otra letra final.
    case 'NIE':
      return /^[Ee]\d{8}$/;        // Letra 'E' + 8 números
    // return /^[A-Za-z]{3}\d{6}[A-Za-z]$/;//Tres letras seguidas de seis cifras y una letra final.
    case 'Pasaporte':
      return /^[A-Za-z0-9]{6,15}$/;
    default:
      return null; 
  }
});

const docNumberPattern = computed(() => {
  switch (form.docType) {
    case 'DNI español':
      // 8 dígitos seguidos de 1 letra (por ejemplo, 12345678Z)
      return /^\d{8}[A-Za-z]$/;
    case 'NIE':
      // 1 letra inicial (X, Y o Z), 7 dígitos y 1 letra final (por ejemplo, X1234567L)
      return /^[xXyYzZ]\d{7}[a-zA-Z]$/;
    case 'Pasaporte':
      // 6-15 caracteres alfanuméricos sin permitir signos de puntuación
      return /^[A-Za-z0-9]{6,15}$/;
    default:
      return null;
  }
});

const docNumberError = computed(() => {
    
    if(form.docNumber && form.docType){
        return !docNumberPattern.value?.test(form.docNumber);
    }
    return false;
});

const docSupportNumberError = computed(() => {
    if(form.docSupportNumber && form.docType){
        return !docSupportNumberPattern.value?.test(form.docSupportNumber);
    }
    return false;
});

const isFormValid = computed(() => {
    
    const isChanged =
        $normalizeInput(form.name) !== $normalizeInput(originalData.value.name) ||
        $normalizeInput(form.lastname) !== $normalizeInput(originalData.value.lastname) ||
        $normalizeInput(form.secondLastname) !== $normalizeInput(originalData.value.second_lastname) ||
        $normalizeInput(form.avatar) !== $normalizeInput(originalData.value.avatar) ||
        $normalizeInput(form.nationality) !== $normalizeInput(originalData.value.nationality) ||
        $normalizeInput(formatAnyDate(form.birthdate)) !== $normalizeInput(formatAnyDate(originalData.value.birthdate)) ||
        $normalizeInput(form.docType) !== $normalizeInput(originalData.value.doc_type) ||
        $normalizeInput(form.docSupportNumber) !== $normalizeInput(originalData.value.doc_support_number) ||
        $normalizeInput(form.docNumber) !== $normalizeInput(originalData.value.doc_num) ||
        $normalizeInput(form.gender) !== $normalizeInput(originalData.value.sex);
        
    return (
        isChanged && Boolean(form.name) && !nationalityError.value &&
        !docNumberError.value && !docSupportNumberError.value
    );
});
</script>

<style scoped>
/* .full-height {
    height: 100%;
    overflow: hidden;
} */
.shadow-small {
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12),
        0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
</style>
