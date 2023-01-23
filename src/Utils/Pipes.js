export const toCUITformat = (cuit) => {
  cuit = cuit.toString();
  let cuitFormat = `${cuit.slice(0, 2)}-${cuit.slice(
    2,
    cuit.length - 1
  )}-${cuit.slice(cuit.length - 1, cuit.length)}`;
  return cuitFormat;
};

export const toMoneyFormat = (number) => {
  let prefix = "";
  if (number < 0) {
    prefix = "-";
    number = number * -1;
  }
  let t = number.toString();
  let regex = /(\d*.\d{0,2})/;
  return parseFloat(prefix + t.match(regex)[0]);
};
