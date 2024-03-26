const isMobile = ({ next, store }) => {
    let innerWidth = window.innerWidth;
    if (innerWidth > 768) {
        return next({
            name: 'ScreenNotAllowed'
        });
    }
    return next();
}

export default isMobile;