import moment from 'moment';

export default (startDate) => {
  const normalize = (time) => {
    time = time < 0 ? time : time;
    return new String(time).length < 2 ? '0' + time : time;
  };

  const relapseDate = moment(startDate);
  const daysCount = moment().diff(relapseDate, 'days');

  const now = moment();
  relapseDate.set('year', now.get('year'));
  relapseDate.set('month', now.get('month'));
  relapseDate.set('date', now.get('date'));

  const diff = now.diff(relapseDate, 'seconds');
  let distance;
  if (diff < 0) {
    distance = 86400 + diff;
  } else {
    distance = diff;
  }
  const hours = Math.floor(distance / (60 * 60));
  const minutes = Math.floor((distance - hours * 60 * 60) / 60);
  const seconds = Math.floor(distance - hours * 60 * 60 - minutes * 60);

  const timeElapsed = `${normalize(hours)}:${normalize(minutes)}:${normalize(
    seconds
  )}`;

  return {
    daysCount,
    timeElapsed,
    seconds: moment.duration(timeElapsed).asSeconds(),
  };
};
