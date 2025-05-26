<template>
  <div class="relative">
    <!-- Elemento principal al que se le agregará el badge -->
    <slot></slot>

    <!-- El badge (círculo) en la esquina -->
    <div
      v-if="showBadge"
      :class="[classes, responsiveSizeClasses]"
      :style="[{
            backgroundColor: bgColor ?? chainStore.$bgColor1,
            borderColor: borderColor ?? chainStore.$colorContrast1,
      }]"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    showBadge: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
    },
    bgColor: {
      type: String,
      default: null,
    },
    borderColor: {
      type: String,
      default: null,
    },
    classes: {
      type: String,
      default: 'absolute top-[-1px] right-[-2px] border-[1.2px] rounded-full',
    },
});

const badgeSize = computed(() => {
    switch (props.size) {
        case 'small':
          return { width: '7px', height: '7px' }
        case 'medium':
          return { width: '14px', height: '14px' }
        case 'large':
          return { width: '20px', height: '20px' }
        default:
          return { width: '7px', height: '7px' }
      }
      return;
});

// Clases responsivas basadas en el size
const responsiveSizeClasses = computed(() => {
    switch (props.size) {
        case 'small':
          return 'w-[7px] h-[7px] sp:w-[14px] sp:h-[14px]';
        case 'medium':
          return 'w-[14px] h-[14px] sp:w-[14px] sp:h-[14px]';
        case 'large':
          return 'w-[20px] h-[20px] sp:w-[20px] sp:h-[20px]';
        default:
          return 'w-[7px] h-[7px] sp:w-[7px] sp:h-[7px]';
    }
});

</script>