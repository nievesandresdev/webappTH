
  const isDesktop = (to, from, next) => {
    let innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
        return next({
            name: 'Home',
        });
    }
    return next();
}

export default isDesktop;