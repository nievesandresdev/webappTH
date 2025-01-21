const isDesktop = (to, from, next) => {
    let innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
        return next({
            name: 'Home', // Redirige a la página principal en dispositivos móviles
        });
    }
    return next(); // Permite continuar la navegación en dispositivos de escritorio
}

export default isDesktop;
