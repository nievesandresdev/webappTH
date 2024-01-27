<template>
    <div class="relative">
        <label v-if="textLabel" class="text-sm font-medium mb-2 block leading-4">{{ textLabel }}</label>
        <p v-if="textDescription" class="mb-2 text-sm htext-gray-500">{{ textDescription }}</p>

        <img v-if="iconLeft" class="w-6 h-6 absolute left-3 top-2" :src="iconLeft">
        <input
        :ref="id"
        :id="id"
        :type="type"
        :class="computeClasses"
        :placeholder="placeholderText"
        :value="modelValue"
        @input="validateInput"
        @blur="$emit('blur')"
        @keyup="keyupInput"
        autocomplete="nope"
        :disabled="disabled"
        >
        <p v-if="isError && showTextError || hasError && showTextError" class="mt-2 text-xs htext-alert-negative flex items-center">
            <img
                src="/assets/icons/1.TH.WARNING.svg"
                alt="icon alert red"
                class="inline w-4 h-4 mr-2"
            />
            {{ stringTextError }}
        </p>
        <img 
            v-if="iconRight" 
            @click="pressIconRight"
            class="w-8 h-8 absolute right-2 top-1.5" :src="iconRight"
        >
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue', 'handleError','keyupInput','pressIconRight'],
    data() {
        return {
            hasError: false,
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
            let classes = 'hinput-primary h-10 rounded-[6px] text-sm font-medium w-full px-3 py-2 block';

            if (this.hasError || this.isError) {
                classes += ' hborder-alert-negative htext-alert-negative placeholder-negative no-hover-input';
            } else {
                classes += ' hoverForm';
            }
            if(this.iconLeft){
                classes += ' pl-[44px]';
            }
            if(this.iconRight){
                classes += ' pr-[44px]';
            }

            Object.entries(this.customClasses).forEach(([key, value]) => {
                if (value) {
                    classes += ` ${key}`;
                }
            });

            return classes;
        }
    },
    watch: {
        hasError () {
            this.$emit('handleError',this.hasError)
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
            type: String,
            default: null,
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
        pressIconRight(){
            this.$emit('pressIconRight');
        },
        keyupInput(){
            this.$emit('keyupInput');
        },
        validateInput(event) {
            const inputValue = this.$refs[this.id].value;
            // console.log("inputValue", inputValue);
            if (inputValue) {
                if (this.type === 'email') {
                    this.validateEmail();
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

                this.$emit('update:modelValue', null);
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
    border-color: initial;
}

input::placeholder{
    font-size: 14px;
    color: var(--h-gray-500);
    font-weight: 500;
}


</style>
