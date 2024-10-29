<template>
    <div class="relative">
        <label v-if="textLabel" class="text-sm font-medium mb-2 block leading-4">{{ textLabel }}</label>
        <p v-if="textDescription" class="mb-2 text-sm htext-gray-500">{{ textDescription }}</p>

        <img v-if="iconLeft" class="w-5 h-5 absolute left-2 top-2.5" :src="iconLeft">
        <input
            :ref="id"
            :id="id"
            :type="showPass ? 'text' : type"
            :class="computeClasses"
            :placeholder="placeholderText"
            :value="modelValue"
            @input="validateInput"
            @blur="onBlur"
            @keyup="keyupInput"
            autocomplete="nope"
            :disabled="disabled"
        >
        <!-- this.errorWhenOtherType || this.errorWhenTypeEmail || this.isError -->
        <p 
            v-if="showTextError && (isError || errorWhenOtherType || errorWhenTypeEmail)" 
            class="lato text-xs font-bold leading-[16px] htext-alert-negative"
        >
            <!-- <img
                src="/assets/icons/1.TH.WARNING.svg"
                alt="icon alert red"
                class="inline w-4 h-4 mr-2"
            /> -->
            {{ textError }}
        </p>
        <button 
            href="javascript:void(0)" class="text-sm font-bold lato leading-[16px] underline absolute top-3 right-2"
            :class="{'disabled-text':!modelValue || modelValue == '' || disabled}"
            v-if="type === 'password'"
            @click="showPass = !showPass"
            :disabled="!modelValue || modelValue == '' || disabled"
        > {{ showPass ? 'Ocultar' :'Mostrar'}}</button>
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue', 'handleError','keyupInput','blur'],
    data() {
        return {
            hasError: false,
            showPass: false,
            showEmailError: false,
            stringTextError: ''
        };
    },
    computed: {
        placeholderText() {
            let placeholder;
            switch (this.id) {
                case 'emaillodging':
                    placeholder = (this.isError) ? 'Introduce email de contacto para continuar' : this.placeholder;
                break;

                case 'phonelodging':
                placeholder = (this.isError) ? 'Introduce número de contacto del hotel' : this.placeholder;
                break;

                default:
                    placeholder = this.placeholder;
                break;
            }
            return placeholder;
        },
        computeClasses() {
            let paddingDefault = this.iconLeft ? 'p-2' : 'px-3 py-2';
            let borderClasess = this.disabled ? 'border hborder-disabled disabled-text' : 'hborder-black-100 focus-hborder-black-100';
            let classes = `hinput-primary ${borderClasess} h-10 rounded-[10px] text-sm font-medium w-full block ${paddingDefault}`;


            if (this.errorWhenOtherType || this.errorWhenTypeEmail || this.isError) {
                classes += ' hborder-alert-negative htext-alert-negative placeholder-negative no-hover-input';
            }
            if(this.iconLeft){
                classes += ' pl-[33px]';
            }
            if(this.iconRight){
                classes += ' pr-[33px]';
            }

            Object.entries(this.customClasses).forEach(([key, value]) => {
                if (value) {
                    classes += ` ${key}`;
                }
            });

            return classes;
        },
        errorWhenTypeEmail(){
            return this.showEmailError && this.hasError && this.type === 'email';
        },
        errorWhenOtherType(){
            return this.hasError && this.type !== 'email';
        }
    },
    // watch: {
    //     hasError () {
            
    //     }
    // },
    props: {
        id: {
            type: String,
            default: '',
        },
        isError: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        textLabel: {
            type: String,
            default: null,
        },
        textDescription: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        customClasses: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            default: 'text',
        },
        modelValue: {
            default: ''
        },
        showTextError: {
            type: Boolean,
            default: true,
        },
        textError: {
            type: String,
            default: 'Campo requerido',
        },
        iconLeft: {
            type: String,
            default: null,
        },
        iconRight: {
            type: Boolean,
            default: false,
        },
    },
    created(){
        if (this.isError) {
            this.hasError = true;
        }
        if(this.textLabel && this.textError == "Campo requerido"){
            this.stringTextError = 'Introduce el '+ this.textLabel;
        }else{
            this.stringTextError = this.textError;
        }
    },
    methods: {
        onBlur(){
            this.$emit('blur');
            this.showEmailError = true;
        },
        keyupInput(){
            this.$emit('keyupInput');
        },
        validateInput(event) {
            this.showEmailError = false
            const inputValue = this.$refs[this.id].value;
            // console.log("inputValue", inputValue);
            if (inputValue) {
                if (this.type === 'email') {
                    this.validateEmail();
                    this.$emit('handleError',this.hasError);
                } else if (this.type === 'url') {
                this.validateURL();
                }
            }else{
                this.hasError = false;
            }
            this.$emit('update:modelValue', event.target.value);
        },
        validateEmail() {
            this.hasError = false;
            const inputValue = this.$refs[this.id].value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(inputValue)) {
                this.hasError = true;
                // this.$emit('update:modelValue', null);
            }
        },

        validateURL() {
            this.hasError = false;
            const inputValue = this.$refs[this.id].value;
            const urlRegex = /\/(\w+)\/(\w+)(\?{1}.*)?$/;

            if (!urlRegex.test(inputValue)) {
                this.hasError = true;
                this.$emit('update:modelValue', null);
            }
        },

    },
};
</script>

<style scoped>
[type='email']:focus,
[type='url']:focus {
    --tw-ring-inset: none;
    --tw-ring-color: none;
    /* border-color: initial; */
}
/* 
input::placeholder{
    font-size: 14px;
    color: var(--h-gray-500);
    font-weight: 500;
} */


</style>
