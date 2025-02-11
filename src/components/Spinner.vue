<template>
    <div 
        :class="classContainer"
    >
        <svg 
            :width="width" 
            :height="height"   
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid"
            xmlns="http://www.w3.org/2000/svg">

            <circle 
                cx="50" 
                cy="50" 
                r="30" 
                fill="none"
                :stroke="color"
                stroke-width="8"           
                stroke-linecap="round"     
                stroke-dasharray="47 141"  
                stroke-dashoffset="0"
            >
                <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;180 50 50;360 50 50"
                keyTimes="0;0.5;1"
                />
            </circle>
        </svg>
    </div>
</template>
<script setup>

defineProps({
    classContainer:{
        type:String,
        default:''
    },
    height:{
        type:String,
        default:'24px'
    },
    width:{
        type:String,
        default:'24px'
    },
    color:{
        type:String,
        default:'#000'
    }
})

</script>