// tailwind.config.js
module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Asegúrate de incluir cualquier archivo donde uses clases de Tailwind
  ],
  
  theme: {
    theme: {
        borderWidth: {
          DEFAULT: '1px',
        }
    },
    screens: {
        'xs': {'min': '150px', 'max': '300px'},
        // => @media (min-width: 150px and max-width: 300px) { ... }

        'sp': '300px',
        // => @media (min-width: 300px) { ... }

        'sm': '480px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        '3xl': '1920px',
        // => @media (min-width: 1920px) { ... }
    },
},
}
