import { defineStore } from 'pinia';
import { ref } from 'vue'

export const usePreloaderStore = defineStore('preloader', () => {
  const activeRequests = ref(0);

  function requestStarted() {
    activeRequests.value++;
  }

  function requestFinished() {
    if (activeRequests.value > 0) {
      activeRequests.value--;
    }
  }

  return {
    activeRequests,
    requestStarted,
    requestFinished
  };
});
