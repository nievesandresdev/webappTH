import mitt from 'mitt';

// Crear una instancia de mitt
const emitter = mitt();

export function useEventBus() {
  // Exponer métodos de mitt a través del composable
  const emitEvent = (eventName, payload = null) => {
    emitter.emit(eventName, payload);
  };

  const onEvent = (eventName, callback) => {
    emitter.on(eventName, callback);
  };

  const offEvent = (eventName, callback) => {
    emitter.off(eventName, callback);
  };

  return {
    emitEvent,
    onEvent,
    offEvent
  };
}