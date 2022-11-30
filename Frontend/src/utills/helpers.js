export const cleanNumber = (number) => {
  if (String(number).includes(",")) {
    return String(number).split(",").join("");
  }
  return number;
};
export const formatNumber = (num) => {
  if (!num) return 0;
  const cleanNum = cleanNumber(num);
  const numb = Number(cleanNum);
  return String(numb.toFixed(0)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
