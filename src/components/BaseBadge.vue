<template>
  <div class="relative">
    <!-- Elemento principal al que se le agregará el badge -->
    <slot></slot>

    <!-- El badge (círculo) en la esquina -->
    <div
      v-if="showBadge"
      :class="classes"
      :style="[{
            backgroundColor: bgColor ?? chainStore.$bgColor1,
            borderColor: borderColor ?? chainStore.$colorContrast1,
      },badgeSize]"
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


</script>