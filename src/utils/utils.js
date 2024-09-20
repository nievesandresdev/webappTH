const  slufy = (text) => {
    /* eslint-disable */ 
    if (!text) return ''
    return text
    .toString()
    .normalize( 'NFD' )                   // split an accented letter in the base letter and the acent
    .replace( /[\u0300-\u036f]/g, '' )   // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
};

const formatPrice = (value, adjust = false) => {
    if (!value) return 0
    let price = Number(value)
    price = price < 0 ? price * -1 : price
    if (adjust) {
        price = price / 100
    } 
    price = price.toFixed(2)
    // price = Math.floor(price)
    return price
}

const capitalize = (text) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
}

const camelCase = (text) => {
    if (!text) return ''
    const words = text.split(' ')
    const camelCaseWords = words.map((word, index) => {
        if (index == 0) {
            return word.toLowerCase()
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
    })
    return camelCaseWords.join(' ')
}

const titleCase = (text) => {
    if (!text) return '' 
    return text.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
}

const  capitalizeFirstLetter = (string) => {
    if (!string) return '' 
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const isMockup = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mockup = urlParams.get('mockup');
    return (mockup === 'true');
}

const transformDuration = (value) => {
    if (value) null
    let hours = Math.floor(value / 60)
    let minutes = value % 60
    let text = ''
    if (hours == 0 && minutes > 0){
        text = `${minutes}MIN APROX`
    }
    if (hours > 0 && minutes == 0){
        text = `${hours}H APROX`
    }
    if(hours > 0 && minutes > 0) {
       text = `${hours}H Y ${minutes}MIN APROX`
    }
    let data = {
        hours,
        minutes,
        text,
    }
    return data
}

const loadSubdomain = () => {
    const ENV = process.env.VUE_APP_ENVIROMENT || 'locale'
    let subdomain = ENV === 'locale' ? extractSlugHotelToQuery() : extractSlugHoteltoHost()
    if(subdomain){
        localStorage.setItem('subdomain', subdomain)
    }
    return subdomain
}

const extractSlugHotelToQuery = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const subdomain = urlParams.get('subdomain') || null
    return subdomain
}

const extractSlugHoteltoHost = () => {
    const hostname = window.location.hostname; // Obtiene el hostname de la URL actual
    const partes = hostname.split('.'); // Divide el hostname en partes separadas por puntos
    const slugHotel = partes[0]; // El slug del hotel es la primera parte
    return slugHotel;
}

const getUrlParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search)
    const dataParam = urlParams.get(param)
    return dataParam
}

const formatTypeLodging = (valueType) => {
    const typeLodging = {
      hotel: "Hotel",
      hostal: "Hostal",
      pensión: "Pensión",
      ca: "Complejo de apartamentos",
      at: "Apartamento turístico",
      vft: "Vivienda con fines turísticos",
    }
    return typeLodging?.[valueType] ?? null;
  }

module.exports = {
    slufy,
    formatPrice,
    capitalize,
    camelCase,
    titleCase,
    capitalizeFirstLetter,
    isMockup,
    transformDuration,
    loadSubdomain,
    getUrlParam,
    formatTypeLodging,
}
