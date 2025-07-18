<template>
    <div>
        <label v-if="textLabel" class="text-[9px] sp:text-sm font-bold mb-1 block lato leading-[12px] sp:leading-[16px]">{{ textLabel }}</label>
        <p v-if="textDescription" class="mb-2 text-sm htext-gray-500 lato">{{ textDescription }}</p>
        <div class="relative">
            <img v-if="iconLeft" class="w-[14px] sp:w-5 h-[15px] sp:h-5 absolute left-[5px] sp:left-2 top-[5px] sp:top-2.5" :src="iconLeft">
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
                @focus="onFocus"
                autocomplete="nope"
                :disabled="disabled"
                class="lato text-sm font-medium"
            >
            <img v-if="iconRight" class="w-[14px] sp:w-5 h-[14px] sp:h-5 absolute right-[6px] sp:right-2 top-[8px] sp:top-2.5" :src="iconRight">
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
                href="javascript:void(0)" class="text-sm font-bold lato leading-[16px] underline absolute right-2"
                :class="[
                    {'disabled-text': !modelValue || modelValue == '' || disabled},
                    `${topCustom}`
                ]"
                v-if="type === 'password'"
                @click="showPass = !showPass"
                :disabled="!modelValue || modelValue == '' || disabled"
            > {{ showPass ? $t('auth.log.input-hide-pass') :$t('auth.log.input-show-pass')}}</button>
        </div>
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
            stringTextError: '',
            isFocused: false,
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
            let paddingDefault = this.iconLeft ? 'p-[11px]' : 'px-3 py-2';
            let borderClasess = this.disabled ? 'hborder-disabled-2' : 'hborder-gray-400'; //hborder-disabled disabled-text
                borderClasess = this.isFocused && !this.disabled ? 'hborder-black-100' : borderClasess;
            let bgClasess = this.disabled ? 'bg-[#fafafa80]' : 'bg-white';
            let classes = `${bgClasess} border-[2px] ${borderClasess} h-4 sp:h-10 rounded-[6px] sp:rounded-[10px] text-sm font-medium w-full  lato ${paddingDefault}`;


            if (this.errorWhenOtherType || this.errorWhenTypeEmail || this.isError) {
                // console.log('test errorWhenOtherType', Boolean(this.errorWhenOtherType)); 
                classes += ' hborder-alert-negative htext-alert-negative placeholder-negative no-hover-input';
            }
            if(this.iconLeft){
                classes += ' pl-[26px] sp:pl-[34px]';
            }
            if(this.iconRight){
                classes += ' sp:pr-[34px] pr-[20px]';
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
    // cada vez que 'isError' cambie a false, 'hasError' también se ponga en false.
    watch: {
        isError(newVal) {
            if (!newVal) {
            this.hasError = false
            }
        }
    },
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
        topCustom: {
            type: String,
            default: 'top-3'
        }
    },
    created(){
        if (this.isError) {
            // console.log('test se metio')
            this.hasError = true;
        }
        if(this.textLabel && this.textError == "Campo requerido"){
            this.stringTextError = 'Introduce el '+ this.textLabel;
        }else{
            this.stringTextError = this.textError;
        }
    },
    methods: {
        onFocus(){
            this.isFocused = true;
            this.$emit('focus');
        },
        onBlur(){
            this.$emit('blur');
            this.isFocused = false;
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
input::placeholder{
    font-size: 14px;
    font-family: 'lato';
    font-weight: 500;
    color: #A0A0A0;
    line-height: 16px;
  }

@media (max-width: 224px) {
    input::placeholder{
        font-size: 10px;
        line-height: 10px;
    }
}

</style>
