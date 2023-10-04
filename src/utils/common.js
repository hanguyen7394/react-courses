import moment from "moment/moment";

export const formatCurrency = (number, currency = 'đ') => {
  number = new Intl.NumberFormat().format(number);
  return number+currency;
}

export const formatDate = (date, format="DD/MM/YYYY") => {
  return moment(date).format(format);
}
