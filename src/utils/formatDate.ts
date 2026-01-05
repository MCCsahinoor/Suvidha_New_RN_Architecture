import moment from "moment";

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 because months are zero-indexed) and pad with leading zero if necessary
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

//moment(ele.lead_date).format('DD MMM YYYY')
export function ddmmyyyConverter(timestamp: any, formatDate: string) {
  return moment(timestamp).format(formatDate)
}

// (new Date(moment().subtract(1, 'months').format('YYYY-MM-DD'))).toISOString(),
export const getModifiedDateAsISOString = (dateFormat: string, duration: number) => {
  return (new Date(moment().subtract(duration, 'months').format(dateFormat))).toISOString();
};

//moment(String(range.startDate)).local().format('YYYY-MM-DD')
export const getDateRangeFormat = (dateFormat: string, timestamp: string) => {
  return moment(timestamp).local().format(dateFormat);
};

//moment(formData.paymntDate, 'Do MMMM YYYY').add(330, 'minutes').toISOString()
export const getDateinUTCFormat = (timestamp: string, formatDate?: string) => {
  if (formatDate && (formatDate ?? '') != '') {
    return moment(timestamp, formatDate).add(330, 'minutes').toISOString()
  } else {
    return moment(timestamp).add(330, 'minutes').toISOString()
  }
}
// moment(date)
export function momentConvert(date: any) {
  return moment(date)
}

// Get current date
export function getCurrentDate() {
  return moment();
}

export function getDefultDate(formatDate?: string) {
  return moment().format(formatDate);
}

export function isMoreThan90Day(start: any, end: any) {
  const startDate: any = new Date(start);
  const endDate: any = new Date(end);

  // Calculate the time difference in milliseconds
  const timeDifference = endDate - startDate;

  // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Check if the difference is greater than 90 days
  return dayDifference > 90;
};