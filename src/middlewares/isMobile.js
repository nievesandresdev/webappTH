/* const isMobile = ({ to, from, next }) => {
    let innerWidth = window.innerWidth;
    // Verificar si se debe saltar el chequeo para móviles
    // if (to.meta?.skipMobileCheck && innerWidth > 768) {
    //     return next();
    // }

    if (innerWidth > 768) {
        return next({
            name: 'ScreenNotAllowed'
        });
    }

    // return next();
}

export default isMobile; */

const isMobile = (to, from, next) => {
    const innerWidth = window.innerWidth;
    // Array con los nombres de las rutas que no deben redireccionarse
    const bypassRoutes = ['Inbox','DisabledEmail'];

    // Si la ruta actual está en bypassRoutes, continúa sin redireccionar
    if (bypassRoutes.includes(to.name)) {
      return next();
    }

  
    if (innerWidth > 768) {
      console.log('Redirigiendo a ScreenNotAllowed');
      next({
        name: 'ScreenNotAllowed',
      });
    } else {
      next();
    }
  };
  
  export default isMobile;
  
  