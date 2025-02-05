<template>
    <div class="cursor-pointer relative" ref="dropdown" id="dropdown-calendar-calendar">
        <buttom
            :disabled="disabled"
            @click="toggleshow"
            class="flex items-center hoverForm"
            :class="{
                'h-7 sp:h-10 rounded-[6px] sp:rounded-[10px] p-2 hborder-black-100':true,
                'hborder-alert-negative': error,
                'button-disabled':disabled && !error
            }"
        >
            <img :src="icon_left" :class="icon_left_class">
            <span
                class="flex-grow truncate"
                :class="{
                'lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px]':true,
                'htext-gray-500': !error && !modelValue,
                'htext-alert-negative': error,
                'htext-black-100': modelValue,
            }"
            >
            {{ labelSelect }}
            </span>
            <!-- muestra el icono para borrar la opcion en caso de que el campo no sea obligatorio -->
            <template v-if="modelValue && !mandatory">
                <img :src="icon_delete" :class="icon_delete_class" @click="deleteOption" class="cursor-pointer">
            </template>
            <template v-else>
                <img v-if="icon_right" :src="icon_right" :class="icon_right_class">
            </template>
        </buttom>
        <div v-show="showOptions" @click="toggleshow" class="fixed h-screen w-full bg-[#00000080] z-[2000] top-0 left-0"></div>
        <transition name="slide-fade">
            <div
                class="dropdown-calendar bg-white fixed z-[2500] left-0 top-10 hbg-white-100 px-4 pt-6"
                v-show="showOptions"
            >
                <div class="relative mb-6">
                    <img 
                        class="w-6 h-6 absolute left-0 top-[1px]" 
                        src="/assets/icons/WA.chevron.svg" 
                        alt="volver a formulario huesped"
                        @click="showOptions = false"
                    >
                    <h3 class="lato text-lg font-bold text-center leading-[18px] h-[28px]">{{ $t('stay.edit.calendar') }}</h3>
                </div>
                <DatePicker
                    :locale="$i18n.locale"
                    v-model="value"
                    expanded
                    :is-range="is_range"
                    :min-date="NoMinDate ? null : minDate"
                />
            </div>
        </transition>

        <template v-if="show_error_msg">
        <p v-if="error" class="mt-1 text-xs htext-alert-negative flex">
            <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.svg">
            {{ texterror }}
        </p>
        </template>
    </div>
</template>

<script>
import Moment from 'moment'
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
export default {
    components: {
        DatePicker,
    },
    data() {
        return {
            showOptions: false,
            hoverOption: false,
            selected: false,
            dropdown: null,
            dates_selected:this.modelValue,
            // w_screen:window.screen.width
        }
    },
    emits: ['update:modelValue'],
    props: {
        error:{
            type: Boolean,
            default: false,
        },
        disabled:{
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
        classLabel:{
            type: Object,
            default: null,
        },
        icon_left:{
            type: String,
            default: '/assets/icons/WA.calendar.svg',
        },
        icon_left_class:{
            type: String,
            default: 'w-[14px] sp:w-5 h-[14px] sp:h-5 mr-1.5 sp:mr-2',
        },
        icon_right:{
            type: String,
            default: null,
        },
        icon_right_class:{
            type: String,
            default: 'h-6 w-6',
        },
        icon_delete:{
            type: String,
            default: '/assets/icons/1.TH.CLOSE.svg',
        },
        icon_delete_class:{
            type: String,
            default: 'h-6 w-6',
        },
        mandatory:{
            type:Boolean,
            default:false
        },
        texterror:{
            type:String,
            default:'Campo obligatorio'
        },
        modelValue: {
            type: String,
        },
        minDate: {
            type: Date,
            default: () => new Date(),
        },
        NoMinDate:{
            type:Boolean,
            default:false
        },
        show_error_msg:{
            type:Boolean,
            default:true
        },
        is_range:{
            type:Boolean,
            default:true
        },
    },
    computed: {
        value: {
            get () {
                return this.modelValue
            },
            set (val) {
                if(this.is_range){
                    this.dates_selected = this.formatDate(val).label;
                    this.$emit('update:modelValue', this.formatDate(val))
                }else{
                    this.dates_selected = this.moment(val).format("DD/MM/YYYY")
                    this.$emit('update:modelValue', this.dates_selected)
                }
                this.showOptions = false;
            },
        },
        labelSelect (){
            return this.dates_selected || this.textLabel;
        },
    },
    created() {
        this.moment=Moment
    },
    mounted() {
        this.dropdown = this.$refs.dropdown;
        // Add the listener when the component is mounted
        window.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        // Remove the listener when the component is unmounted
        window.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        toggleshow(){
            if(!this.disabled){
                this.showOptions = !this.showOptions
            }
        },
        handleClickOutside(event) {
            if (this.dropdown && !this.dropdown.contains(event.target)) {
                this.showOptions = false;
            }
        },
        deleteOption (){
            this.$emit('update:modelValue', null)
        },
        formatDate (dates) {
            if (dates){
                var date_start = this.moment(dates.start).format("YYYY-MM-DD")
                var date_end = this.moment(dates.end).format("YYYY-MM-DD")
                var label = this.moment(dates.start).format("DD/MM/YYYY")+' - '+this.moment(dates.end).format("DD/MM/YYYY")

                return {
                    start:date_start,
                    end:date_end,
                    label,
                }
            }
        },
    },
}
</script>

<style lang="scss">
#dropdown-calendar-calendar{
    
    .vc-day.vc-selected .vc-day-content {
        background-color: var(--h-green-600);
    }
    .vc-light.vc-attr, .vc-light .vc-attr {
        --vc-highlight-outline-border: var(--h-green-300);
        --vc-highlight-solid-bg: var(--h-green-600);
        --vc-highlight-outline-bg: var(--h-green-600);
        --vc-highlight-light-content-color: var(--h-green-300);
        --vc-highlight-light-bg: var(--h-green-300);
        color: #333;
        font-weight: 500;
    }
    .vc-light {
    --vc-focus-ring: var(--h-green-600);
    
    }
    .vc-bordered {
        border-color: var(--h-gray-400) !important;
    }
    .vc-container {
        min-height: 100%;
    }
    .vc-week, .vc-weekdays {
        margin: 5px 0;
    }
    .vc-day-content.vc-disabled {
        color: #bfbfbf !important;
        background-color: #fafafa!important;
    }

}

.dropdown-calendar{
    box-shadow: 0px 3.5px 7px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    height: 313.972px;
}
@media (max-width:767px){
    .dropdown-calendar{
        border-radius: 10px 10px 0 0;
        height: 100vh;
    }
    #dropdown-calendar-calendar{
        .vc-bordered {
            border: none;
        }
    }
}
.button-disabled:hover,
.button-disabled {
    border: 1px solid var(--h-gray-400) !important;
    background-color: var(--h-gray-200) !important;
    cursor: default !important;
}

.slide-fade-enter-from, .slide-fade-leave-active {
    transform: translateY(100%);
    visibility: hidden;
}

.slide-fade-enter-to, .slide-fade-leave-from {
    transform: translateY(0);
    visibility: visible;
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: transform 0.3s ease, visibility 0.3s ease;
}


</style>
