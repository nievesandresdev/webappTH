import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useTabs = defineStore('tabs', () => {
  const tabsHeader = ref([]);
  // const router = useRouter();

  // Inicializar tabs desde localStorage y asociar eventos dinámicamente
  const initializeTabs = (router) => {
    const storedTabs = localStorage.getItem('tabsHeader');
    if (storedTabs) {
      tabsHeader.value = JSON.parse(storedTabs).map((tab) => ({
        ...tab,
        onClick: () => router.push({ name: tab.routeName }), // Asocia el evento dinámico
      }));
    }
  };

  // Actualizar tabs en el estado y en localStorage
  const setTabsHeader = (tabs, router) => {
    tabsHeader.value = tabs.map((tab) => ({
      ...tab,
      onClick: () => router.push({ name: tab.routeName }), // Asocia el evento dinámico
    }));
    localStorage.setItem('tabsHeader', JSON.stringify(tabs));
  };

  return {
    tabsHeader,
    initializeTabs,
    setTabsHeader,
  };
});
