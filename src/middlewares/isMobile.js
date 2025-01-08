/* const isMobile = ({ to, from, next }) => {
    let innerWidth = window.innerWidth;
    console.log('test to',to)
    // Verificar si se debe saltar el chequeo para móviles
    // if (to.meta?.skipMobileCheck && innerWidth > 768) {
    //     return next();
    // }

    if (innerWidth > 768) {
        console.log('test en red')
        return next({
            name: 'ScreenNotAllowed'
        });
    }

    // return next();
}

export default isMobile; */

const isMobile = (to, from, next) => {
    const innerWidth = window.innerWidth;
  
    // Si el ancho de la ventana es mayor a 768, redirigir a 'ScreenNotAllowed'
    if (innerWidth > 768) {
      console.log('Redirigiendo a ScreenNotAllowed');
      next({
        name: 'ScreenNotAllowed',
      });
    } else {
      // Continuar con la navegación
      next();
    }
  };
  
  export default isMobile;
  
  