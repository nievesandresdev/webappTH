const isMobile = ({ to, from, next }) => {
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

export default isMobile;