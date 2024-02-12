const convertMoney = (value) => {
  return Intl.NumberFormat().format(parseFloat(value)).replace(",", ".");
};

export default convertMoney;
