<template>
    <div 
        class="close-icon__container" 
        :class="container_classes" 
        :style="{ padding: padding_container}"
    >
        <img 
            class="cursor-pointer close-icon__img" 
            :class="icon_clasess" 
            :src="src" 
            :alt="alt"
            :style="{ height: height_icon, width: width_icon}"
        >
    </div>
</template>
<script setup>
    //import libraries
    import { ref } from 'vue';

    const props = defineProps({
        icon_clasess: {
            type: Object,
            default: () => ({}),
        },
        container_classes: {
            type: Object,
            default: () => ({}),
        },
        height_icon: {
            type: String,
            default: () => '14.4px',
        },
        width_icon: {
            type: String,
            default: () => '14.4px',
        },
        padding_container: {
            type: String,
            default: () => '8px',
        },
        background_color: {
            type: String,
            default: () => 'gray',
        },
        src: {
            type: String,
            default: () => null,
        },
        alt:{
            type: String,
            default: () => null,
        }
    })
</script>
<style scoped>
  .close-icon__container {
    border-radius: 100px;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }

  .close-icon__container:hover {
    background-color: var(--background-color);
  }
</style>


