<template>
    <SectionBar title="Información personal" />
    <div class="px-3 mt-6">
        <!-- Contenedor para cambiar foto -->
        <div class="flex items-center gap-2 mb-4">
            <!-- Círculo para la imagen o el icono -->
            <div class="flex justify-center items-center p-2 border border-black rounded-full overflow-hidden"
                 style="width: 40px; height: 40px;">
                <img :src="form.avatar || '/assets/icons/WA.user.svg'" class="w-full h-full object-cover" alt="User Avatar">
            </div>
            <!-- Texto para cambiar foto -->
            <span class="underline text-[14px] font-bold lato cursor-pointer" @click="selectImage">Cambiar foto</span>
            <!-- Input file oculto -->
            <input type="file" ref="fileInput" class="hidden" @change="onFileSelected" accept="image/*">
        </div>

        <div class="flex flex-col w-full gap-4">
            <THInputText
                :textLabel="'Nombre*'"
                :placeholder="namePlaceholder"
                v-model="form.name"
                :isError="!form.name && nameTouched"
                @blur="handleNameBlur"
                :showTextError="false"
            />
            <THInputText
                :textLabel="'Apellidos'"
                :placeholder="'Introduce tu apellido'"
                v-model="form.lastname"
                :showTextError="false"
            />
            <THInputText
                :textLabel="'Correo electrónico*'"
                :placeholder="emailPlaceholder"
                v-model="form.email"
                :isError="(!form.email && emailTouched) || (emailTouched && !isEmailValid)"
                @blur="validateEmail"
                type="email"
                :showTextError="false"
            />
            <THInputText
                :textLabel="'Número de teléfono'"
                :placeholder="'Introduce tu nº de teléfono'"
                v-model="form.phone"
            />
            <THInputText
                :textLabel="'Contraseña*'"
                :placeholder="'Introduce tu contraseña'"
                v-model="form.password"
                type="password"
            />
        </div>
        <div class="flex justify-end mt-2 mb-2">
            <span class="underline lato text-sm font-bold" @click="openModalPassword">Cambiar contraseña</span>
        </div>
        <div class="flex w-full">
            <button
                @click="handleSubmit"
                :disabled="!isFormValid"
                :class="[ 
                    'w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border text-sm font-bold hshadow-button mt-4',
                    isFormValid ? 'bg-[#333333] text-white border-white' : 'bg-[#333333] bg-opacity-50 text-[#FAFAFA40] text-opacity-25 border-[rgba(255,255,255,0.25)] shadow-small'
                ]"
            >
                Guardar
            </button>
        </div>
    </div>

    <!-- Modal para cambiar contraseña -->
    <BottomModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" >
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
            <!-- Botón de Cambiar Contraseña con estado disabled según la condición -->
            <button
                @click="handleChangePassword"
                :disabled="!isModalFormValid"
                :class="[
                    'w-full lato flex justify-center items-center h-10  gap-2 rounded-[10px] border text-sm font-bold hshadow-button',
                    isModalFormValid ? 'bg-[#333333] text-white border-white' : 'bg-[#333333] bg-opacity-50 text-[#FAFAFA40] text-opacity-25 border-[rgba(255,255,255,0.25)] shadow-small'
                ]"
            >
                Cambiar contraseña
            </button>
        </div>
    </BottomModal>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import THInputText from '@/components/THInputText.vue';
import BottomModal from './Components/BottomModal.vue';

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

const stayData = ref({});
const guestData = ref({});
const chainData = ref({});

const form = reactive({
    id: null,
    name: '',
    lastname: '', // Campo para apellidos
    email: '',
    phone: '',
    password: '',
    avatar: null, // Campo para la imagen de avatar
});

const isModalOpen = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const currentPasswordError = ref(false); // Control de error para la contraseña actual

// Control de errores y mensajes de error
const nameTouched = ref(false);
const emailTouched = ref(false);

// Placeholders personalizados
const namePlaceholder = computed(() => (!form.name && nameTouched.value) ? 'Debes rellenar este campo' : 'Introduce tu nombre');
const emailPlaceholder = computed(() => (!form.email && emailTouched.value) ? 'Debes rellenar este campo' : 'Introduce tu correo electrónico');

// Validación del email
const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(form.email);
});

// Función para validar el email y gestionar el mensaje de error
const validateEmail = () => {
    emailTouched.value = true;
    emailErrorText.value = form.email
        ? 'Formato de correo inválido'
        : 'Este campo es requerido';
};

const handleNameBlur = () => {
    nameTouched.value = true;
};

// Función para abrir el input de archivo
const selectImage = () => {
    document.querySelector('input[type="file"]').click();
};

// Función para manejar la selección de archivo
const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.avatar = URL.createObjectURL(file); // Muestra la imagen seleccionada
    }
};

// Inicializar el formulario con datos del store
onMounted(() => {
    guestData.value = guestStore.getLocalGuest();
    stayData.value = stayStore.getLocalStay();
    chainData.value = chainStore.chainData;

    initForm(guestData.value);
});

const initForm = (data) => {
    form.id = data.id;
    form.name = data.name;
    form.lastname = data.lastname; // Inicializa apellidos desde los datos
    form.email = data.email;
    form.phone = data.phone;
    form.password = data.password;
    form.avatar = data.avatar; // Inicializa avatar desde los datos
};

// Computed para validar el formulario
const isFormValid = computed(() => {
    return (
        form.name &&
        form.email &&
        form.password &&
        isEmailValid.value &&
        form.avatar // Verifica que la imagen esté presente
    );
});

// Computed para validar el formulario del modal
const isModalFormValid = computed(() => {
    return currentPassword.value && newPassword.value && !currentPasswordError.value;
});

const openModalPassword = () => {
    isModalOpen.value = true;
};

const handleChangePassword = async () => {
    /* if (newPassword.value.length >= 8) {
        console.log("Contraseña cambiada exitosamente.");
    } else {
        console.log("La nueva contraseña debe tener al menos 8 caracteres.");
    } */

    const response = await guestStore.$updatePassword({
        id: form.id,
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
    });


    if(response.ok) {
        toastSuccess("Contraseña actualizada");
        isModalOpen.value = false;
    } else {
        currentPasswordError.value = true;
    }

};

const handleSubmit = () => {
    if (isFormValid.value) {
        console.log("Guardando datos...");
    }
};
</script>

<style scoped>
.shadow-small {
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
</style>
