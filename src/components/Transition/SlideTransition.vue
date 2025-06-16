<template>
  <!-- Content container -->
  <div class="relative">
    <!-- Transition container -->
    <transition
      :name="transitionName"
      mode="out-in"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
      <!-- Router view with position absolute for proper overlay -->
      <router-view :key="$route.fullPath" class="transition-view" />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  }
});

const activeTab = ref(route.name);
const lastIndex = ref(props.tabs.findIndex(t => t.routeName === route.name));
const transitionName = ref('slide-left');

// Función para ir a la vista correspondiente
function goView(obj) {
  if (obj.name === activeTab.value) return;
  const newIndex = props.tabs.findIndex(t => t.routeName === obj.name);
  transitionName.value = newIndex > lastIndex.value ? 'slide-left' : 'slide-right';
  lastIndex.value = newIndex;
  activeTab.value = obj.name;
  router.push({ name: obj.name });
}

// Detecta el cambio de ruta
watch(() => route.name, (newName) => {
  if (newName && newName !== activeTab.value) {
    goView(newName);
  }
});

// Agregar la clase 'absolute' antes de entrar y quitarla después de entrar
function beforeEnter(el) {
  el.classList.add('absolute'); // Añadir la clase al empezar la transición
}

function afterEnter(el) {
  el.classList.remove('absolute'); // Eliminar la clase cuando la transición termine
}

function beforeLeave(el) {
  el.classList.add('absolute'); // Añadir la clase al salir de la transición
}

function afterLeave(el) {
  el.classList.remove('absolute'); // Eliminar la clase después de que termine la salida
}

defineExpose({
  goView
});
</script>

<style scoped>
/* Definimos la transición para el slide */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* Asegúrate de que la vista ocupe todo el espacio */
.transition-view {
  width: 100%;
  height: 100%;
}
</style>
