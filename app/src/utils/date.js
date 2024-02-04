const getDateAsStringAsDDMMYYYY = () => {
  const nowDate = new Date();

  const day = String(nowDate.getDate()).padStart(2, '0');
  const month = String(nowDate.getMonth() + 1).padStart(2, '0');
  const year = nowDate.getFullYear();

  return `${day}_${month}_${year}`;
};

const getHoursIn24WithMinutesAndSeconds = () => {
  const fecha = new Date();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');

  return `${horas}:${minutos}:${segundos}`;
};

module.exports = { getDateAsStringAsDDMMYYYY, getHoursIn24WithMinutesAndSeconds };
