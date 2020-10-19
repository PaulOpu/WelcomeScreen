import moment from 'moment';

/**
 * Change the timezone of the date coming from the API
 *
 * @param {date} date 
 * @public
 */
export function getDate(date){
  return moment.utc(date).tz("Europe/Vienna");
}
/**
 * Formation for showing the duration of the event HH:mm to HH:mm
 *
 * @param {start} date 
 * @param {end} date 
 * @public
 */
export function formatDuration(start,end) {
  const startDate = getDate(start);
  const endDate = getDate(end);
  const startTime = startDate.format("HH:mm");
  const endTime = endDate.format("HH:mm")
  return "".concat(startTime," to ",endTime);
}
/**
 * Show the time until the given date
 *
 * @param {date} date 
 * @public
 */
export function getTimetoStart(date){
  return getDate(date).fromNow();
}
/**
 * Indicate if the date is behind our time
 *
 * @param {date} date 
 * @public
 */
export function isLate(date){
  console.log(new moment(),new getDate(date))
  if(new moment() > new getDate(date)){
    return true;
  }else{
    return false;
  }
}