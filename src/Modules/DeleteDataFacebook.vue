<template>
    <div>
      <h2>Eliminar Mis Datos</h2>
      <button @click="deleteData">Eliminar Mis Datos</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      async deleteData() {
        try {
          const response = await axios.delete('http://127.0.0.1:8000/api/guest/auth/facebook/delete/data', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
          console.log('response.data',response.data)
          this.message = response.data.message;
        } catch (error) {
          console.error('Error al eliminar los datos:', error);
          this.message = 'Hubo un error al intentar eliminar tus datos.';
        }
      }
    }
  };
  </script>
  