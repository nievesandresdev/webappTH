

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

const saveHotelSlug = (subdomain) => {
    if(subdomain){
        // console.log('save slug',subdomain);
        localStorage.setItem('subdomain', subdomain)
    }
    return subdomain
}




const getUrlParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search)
    const dataParam = urlParams.get(param)
    return dataParam
}

  const $formatNameLodging = (valueType) => {
  
    const typeLodging = {
      hotel: "Hotel",
      hostal: "Hostal",
      pensión: "Pensión",
      ca: "Complejo de apartamentos",
      at: "Apartamento turístico",
      vft: "Vivienda con fines turísticos",
    }
    return typeLodging?.[valueType] ?? null;
  };
  


  function $throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
  }
  
  function $isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const $normalizeInput = (input, defaultValue = '') => {
    // 1) nulo o indefinido
    if (input == null) {
      return defaultValue;
    }
  
    // 2) string: trim y comprueba vacío
    if (typeof input === 'string') {
      const trimmed = input.trim();
      return trimmed === '' ? defaultValue : trimmed;
    }
  
    // 3) otros tipos (número, objeto, etc.)
    return input;
  };

module.exports = {
    slufy,
    formatPrice,
    capitalize,
    camelCase,
    titleCase,
    capitalizeFirstLetter,
    isMockup,
    transformDuration,
    saveHotelSlug,
    getUrlParam,
    $formatNameLodging,
    $throttle,
    $isElementVisible,
    $normalizeInput
}
