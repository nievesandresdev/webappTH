<template>
    <div 
        class="box-input-field"
        :class="{
            'h-10 rounded-[6px]':true,
            'hborder-gray-400': !error && !modelValue,
            'hborder-alert-negative': error || error_phone,
            'hborder-black-100': modelValue,
        }"
    >
    <div 
        class="box-input-field cursor-pointer relative flex h-full" 
    >
        <div
            class="box-input-field flex h-full items-center w-[150px] relative"
            :class="{
                'br-gray': !error && !modelValue,
                'br-negative': error || error_phone,
                'br-black': modelValue,
            }"
        >
            <img v-if="iconLeft" class="w-6 h-6 absolute left-3 top-2" :src="iconLeft">
            <input 
                type="text" 
                class="border-0 focus:border-0 w-full p-0 text-sm font-medium pl-3 rounded-[6px]"
                :class="{
                    'placeholder-negative': error || error_phone,
                    'pl-[44px]': iconLeft,
                    'pr-[44px]': iconRight,
                }"
                v-model="code"
                @keyup="search_codes"
                :placeholder="textLabel"
            >
            <img v-if="iconRight" class="w-6 h-6 absolute right-3 top-2" :src="iconRight">
            <div v-if="code" class="dropdown-code absolute left-0 z-50 w-full top-10 hbg-white-100 overflow-hidden">
                <p 
                    v-for="cde in search_list" :key="cde" 
                    class="cursor-pointer relative p-3 text-sm hover-gray-100"
                    @click="selectOption(cde.value)"
                >
                    {{cde.label}}
                </p>
            </div>
        </div>
       
        <input 
            type="number" 
            class="box-input-field border-0 focus:border-0 flex-grow p-0 text-sm font-medium pl-3 rounded-[6px]" 
            :placeholder="placeholder_input"
            :class="{
                'htext-gray-500': !error && !modelValue,
                'htext-alert-negative placeholder-negative': error,
                'htext-black-100': modelValue,
            }"
            v-model="phone"
        >
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showOptions: false,
            hoverOption: false,
            selected: false,
            phone:'',
            code:'',
            code_list:[],
            search_list:[],
            error_phone:false,
            initialLoad: false
        }
    },
    emits: ['update:modelValue','keyupInput'],
    props: {
        error:{
            type: Boolean,
            default: false,
        },
        textLabel: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: null,
        },
        placeholder_input:{
            type:String,
            default:''
        },
        iconLeft:{
            type:String,
            default:null
        },
        iconRight:{
            type:String,
            default:null
        },
    },
    watch:{
        
        'phone'(newVal, oldVal) {
            if (!this.initialLoad) {
                return;
            }
            let phone  = this.code+newVal;
            phone == 'null' ? phone = null : '';
            this.validPhone(phone)

            this.$emit('handlePhoneError',this.error_phone)
            this.$emit('keyupInput')
            this.$emit('update:modelValue', phone)
        },
        'code'(newVal, oldVal) {
            if (!this.initialLoad) {
                return;
            }
            let phone  = newVal+this.phone;
            phone == 'null' ? phone = null : '';
            this.validPhone(phone)

            this.$emit('handlePhoneError',this.error_phone)
            this.$emit('keyupInput')
            this.$emit('update:modelValue', phone)
        },
    },
    mounted(){
        // this.get_code_list()
        //
    },
    methods: {
        search_codes(){
            this.search_list = [];
            for(let ph of this.code_list) {
                if(this.search_list.length >= 5) break;
                if(
                    ph.label.toLowerCase().includes(this.code.toLowerCase()) ||
                    ph.country.es.toLowerCase().includes(this.code.toLowerCase()) ||
                    ph.country.en.toLowerCase().includes(this.code.toLowerCase()) ||
                    ph.country.fr.toLowerCase().includes(this.code.toLowerCase())
                ) {
                    this.search_list.push(ph);
                }
            }
        },
        get_code_list(){
            let phoneString = this.modelValue;
            phoneString = phoneString.replace(/\s+/g, '');
            // axios({
            //     url: '/api/phone-codes',
            //     method: 'GET',
            // }).then( res => {
            //     this.code_list = res.data

            //     this.code_list.map(item => {
            //         return item.value
            //     })
            //     .forEach(item => {
            //         if(phoneString && phoneString.startsWith(item)){
            //             this.code = item
            //             this.phone = phoneString.replace(this.code, '')
            //         }
            //     })
            // }).finally( res => {
            //     this.initialLoad = true
            // })
        },
        selectOption (value) {
            this.search_list = [];
            this.code = value;
        },
        validPhone(phone){
            const pattern = /^\+?\d{9,13}$/;

            if (phone && !pattern.test(phone)) {
                this.error_phone = true;
            } else {
                this.error_phone = false;
            }
        }
    },
}
</script>

<style scoped>

.box-input-field:hover{
    border-color:var(--h-green-600) !important;
    color:var(--h-green-600) !important;
}

.box-input-field:hover > input::placeholder{
    color:var(--h-green-600) !important;
}
.box-input-field:hover > .text-label{
    color:var(--h-green-600) !important;
}
.dropdown-code{
    box-shadow: 0px 3.5px 7px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 10px 10px;
}
input::placeholder{
    font-size: 14px;
    color: var(--h-gray-500);
    font-weight: 500;
}

.disabled:hover{
    background-color:#fff;
}
.br-black{
    border-right: 1px solid var(--h-black-100);
}
.br-gray{
    border-right: 1px solid var(--h-gray-400);
}
.br-negative{
    border-right: 1px solid var(--alert-negative);
}
</style>