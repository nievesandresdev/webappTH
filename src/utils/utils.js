export const  slufy = (text) => {
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

export const formatPrice = (value, adjust = false) => {
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

export const capitalize = (text) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const camelCase = (text) => {
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

export const titleCase = (text) => {
    if (!text) return '' 
    return text.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
}

export const  capitalizeFirstLetter = (string) => {
    if (!string) return '' 
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const isMockup = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mockup = urlParams.get('mockup');
    return (mockup === 'true');
}

export const transformDuration = (value) => {
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

export const loadSubdomain = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const subdomain = urlParams.get('subdomain') || null
    if (subdomain) {
        localStorage.setItem('subdomain', subdomain)
    }
    return subdomain
}