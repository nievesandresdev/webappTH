const isMobile = ({ to, from, next }) => {
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

export default isMobile;