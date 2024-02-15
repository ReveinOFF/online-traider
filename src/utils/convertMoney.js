const convertMoney = (value) => {
  if (!value) return 0;
  return Intl.NumberFormat().format(parseFloat(value)).replace(",", ".");
};

export default convertMoney;
