import moment from 'moment';

export function checkAge(date: string) {
  const todayDate = moment();
  //   console.log('Date', date);
  //   console.log('todayDate : ', todayDate);
  const age = todayDate.diff(moment(date), 'years');
  //   console.log('Different Age : ', age);
  if (age < 18) {
    // console.log('age is < 18');
    return false;
  } else {
    // console.log('age is > 18');
    return true;
  }
}
