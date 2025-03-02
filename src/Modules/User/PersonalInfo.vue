<template>
    <SectionBar :title="$t('profile.page_personal_info.title')" />
    <div class="px-3 mt-[100px] h-auto full-height" ref="formContainer">
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
                :textLabel="`${$t('profile.page_personal_info.form.name.label')}*`"
                :placeholder="namePlaceholder"
                v-model="form.name"
                :isError="!form.name && nameTouched"
                @blur="handleNameBlur"
                :showTextError="false"
            />
            <THInputText
                :textLabel="`${$t('profile.page_personal_info.form.last_name.label')}`"
                :placeholder="$t('profile.page_personal_info.form.last_name.placeholder')"
                v-model="form.lastname"
                :showTextError="false"
            />
            <THInputText
                :textLabel="`${$t('profile.page_personal_info.form.email.label')}*`"
                :placeholder="emailPlaceholder"
                v-model="form.email"
                :isError="(!form.email && emailTouched) || (emailTouched && !isEmailValid)"
                @blur="validateEmail"
                type="email"
                :showTextError="false"
            />
            <THInputText
                :textLabel="`${$t('profile.page_personal_info.form.number_phone.label')}`"
                :placeholder="`${$t('profile.page_personal_info.form.number_phone.placeholder')}`"
                v-model="form.phone"
            />
            <THInputText
                :textLabel="`${$t('profile.page_personal_info.form.password.label')}`"
                :placeholder="`${$t('profile.page_personal_info.form.password.placeholder')}`"
                v-model="form.password"
                topCustom="top-3"
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
        <div class="flex w-full">
            <button
                @click="handleSubmit"
                :disabled="!isFormValid"
                :class="[
                    'w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border text-sm font-bold hshadow-button mt-4',
                    isFormValid
                        ? ' text-white border-white'
                        : ' bg-opacity-50 text-[#FAFAFA40] text-opacity-25 border-[rgba(255,255,255,0.25)] shadow-small',
                ]"
                :style="{backgroundColor: buttonBackground}"
            >
                {{ $t('profile.page_personal_info.btn_save') }}
            </button>
        </div>
    </div>

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
                topCustom="top-9"
            />
            <THInputText
                :textLabel="'Nueva contraseña'"
                :placeholder="'Introduce tu nueva contraseña'"
                v-model="newPassword"
                type="password"
                topCustom="top-9"
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
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

import SectionBar from '@/components/SectionBar.vue';
import THInputText from '@/components/THInputText.vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const formContainer = ref(null);

// Ajustar altura del contenedor al tamaño del viewport
const updateViewportHeight = () => {
    const vh = window.innerHeight * 0.01; // Calcula el tamaño real del viewport
    formContainer.value.style.setProperty('--vh', `${vh}px`);
};

onMounted(() => {
    const guestData = guestStore.getLocalGuest();
    initForm(guestData);

    // Establecer y actualizar altura dinámica
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateViewportHeight);
});

const lockScroll = () => {
  if (formContainer.value) {
    formContainer.value.style.overflow = 'hidden';
  }
};

const unlockScroll = () => {
  if (formContainer.value) {
    formContainer.value.style.overflow = '';
  }
};

const buttonBackground = computed(() => {
    const hex = chainStore.$bgColor0 || '#333333'; // Color por defecto si no hay valor en el store
    return isFormValid.value ? hex : convertHexToRGBA(hex, 0.5);
});

function convertHexToRGBA(hex, alpha = 1) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



// Ensuring scroll is unlocked when the component is destroyed
onBeforeUnmount(() => {
  unlockScroll();
});




// Resto de tu lógica del formulario...
const form = reactive({
    id: null,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    avatar: null,
});
const originalForm = reactive({
    id: null,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    avatar: null,
});

const isModalOpen = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const currentPasswordError = ref(false);
let selectedFile = ref(null);

const nameTouched = ref(false);
const emailTouched = ref(false);

const emailErrorText = ref('');

const namePlaceholder = computed(() =>
    !form.name && nameTouched.value ? 'Debes rellenar este campo' : 'Introduce tu nombre'
);
const emailPlaceholder = computed(() =>
    !form.email && emailTouched.value
        ? 'Debes rellenar este campo'
        : 'Introduce tu correo electrónico'
);

const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(form.email);
});


// Watch for changes in isModalOpen
watch(isModalOpen.value, (newValue) => {
  if (newValue) {
    lockScroll();
  } else {
    unlockScroll();
  }
});

const validateEmail = () => {
    emailTouched.value = true;
    emailErrorText.value = form.email
        ? 'Formato de correo inválido'
        : 'Este campo es requerido';
};

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
    form.name = data.name;
    form.lastname = data.lastname ?? '';
    form.email = data.email;
    form.phone = data.phone ?? '';
    form.password = '123456587';
    form.avatar = data.avatar;
    form.avatar_type = data.avatar_type;

    Object.assign(originalForm, {
        id: data.id,
        name: data.name,
        lastname: data.lastname ?? '',
        email: data.email,
        phone: data.phone ?? '',
        avatar: data.avatar,
    });
};

const isFormValid = computed(() => {
    const isUnchanged =
        form.name === originalForm.name &&
        form.lastname === originalForm.lastname &&
        form.email === originalForm.email &&
        form.phone === originalForm.phone &&
        form.avatar === originalForm.avatar;

    return (
        !isUnchanged && 
        form.name &&
        form.email && 
        isEmailValid.value 
    );
});

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
        toastSuccess(t('messageRequest.passwordUpdated'));
        isModalOpen.value = false;
        currentPassword.value = null;
        newPassword.value = null;
    } else {
        currentPasswordError.value = true;
    }
};

const handleSubmit = async () => {
    if (isFormValid.value) {
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('name', form.name);
        formData.append('lastname', form.lastname);
        formData.append('email', form.email);
        formData.append('phone', form.phone);

        if (selectedFile.value) {
            formData.append('avatar', selectedFile.value);
        }

        const response = await guestStore.$updateDataGuest(formData);

        if (response.ok) {
            toastSuccess(t('messageRequest.dataSave'));
            guestStore.$updateLocalGuestData(response.data);
            initForm(response.data);
        } else {
            console.error('Error al guardar los datos');
        }
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

watch([currentPassword, newPassword], () => {
    currentPasswordError.value = false;
});
</script>

<style scoped>
.full-height {
    height: 100%;
    overflow: hidden;
}
.shadow-small {
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12),
        0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
</style>
