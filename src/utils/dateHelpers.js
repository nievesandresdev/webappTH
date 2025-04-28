import { DateTime } from 'luxon';



const formatTimestampDate = (date, format = 'dd/MM/yyyy') => {
  if (!date) return "Fecha no disponible";

  const correctFormatDate = date.replace(" ", "T");
  const parsedDate = DateTime.fromISO(correctFormatDate);
  if (parsedDate.isValid) {
    return parsedDate.toFormat(format);
  } else {
    console.error("Fecha inválida proporcionada a Luxon:", date);
    return "Fecha inválida";
  }
};


const formatAnyDate = (input, format = 'dd/MM/yyyy') => {
  if (input == null) return 'Fecha no disponible'

  let dt

  if (input instanceof Date) {
    dt = DateTime.fromJSDate(input)
  } else if (typeof input === 'number') {
    dt = DateTime.fromMillis(input)
  } else if (typeof input === 'string') {
    // 1) Si coincide con tu formato día/mes/año:
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(input)) {
      dt = DateTime.fromFormat(input, 'dd/MM/yyyy')
    } else {
      // 2) Intentamos ISO
      const iso = input.includes('T') ? input : input.replace(' ', 'T')
      dt = DateTime.fromISO(iso)
      // 3) Si sigue inválido, probamos SQL o RFC
      if (!dt.isValid) {
        dt = DateTime.fromSQL(input)
        if (!dt.isValid) {
          dt = DateTime.fromRFC2822(input)
        }
      }
    }
  } else {
    console.error('Tipo de dato no soportado para fechas:', input)
    return 'Fecha inválida'
  }

  if (dt.isValid) {
    return dt.toFormat(format)
  } else {
    console.error('No se pudo parsear la fecha con Luxon:', input)
    return 'Fecha inválida'
  }
}





export {
    formatTimestampDate,
    formatAnyDate
};
