const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // Optimización de Webpack para reducir el tamaño de los archivos
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        maxSize: 500000, // Fragmenta archivos grandes en chunks menores de 500KB
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 81,
    // allowedHosts: [
    //   '.ngrok.io', // Permite todas las subdominios de ngrok
    // ],
    // https: true, // Asegura que el servidor esté usando HTTPS
    // client: {
    //   webSocketURL: 'wss://localhost:81/ws', // Cambia `ws` a `wss`
    // },
    // disableHostCheck: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8000',
    //     changeOrigin: true
    //   }
    // }
  }
});
