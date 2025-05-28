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
  },
  // chainWebpack: (config) => {
  //   // regla para svgs como componentes (solo en /src/assets/icons)
  //   config.module
  //     .rule('svg-component')
  //     .test(/\.svg$/)
  //     .include.add(/src\/assets\/icons/)
  //     .end()
  //     .use('babel-loader')
  //     .loader('babel-loader')
  //     .end()
  //     .use('@svgr/webpack')
  //     .loader('@svgr/webpack');
  
  //   // regla para imágenes svg normales (excluye la carpeta de componentes)
  //   config.module
  //     .rule('svg')
  //     .test(/\.svg$/)
  //     .exclude.add(/src\/assets\/icons/)
  //     .end()
  //     .use('file-loader')
  //     .loader('file-loader')
  //     .options({
  //       name: 'img/[name].[hash:8].[ext]',
  //     });
  // }
});
