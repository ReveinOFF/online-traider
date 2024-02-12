const convertMoney = (value) => {
  return parseInt(value)
    .toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(",", ".");
};

export default convertMoney;
