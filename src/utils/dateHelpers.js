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

export {
    formatTimestampDate
};
