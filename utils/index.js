import moment from 'moment';

// export const date = (dateString, withTime) => {
//   const date = dateString ? new Date(dateString) : new Date();
//   const config = {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   };

//   if (withTime)
//     Object.assign(config, { hour: 'numeric', minute: 'numeric', hour12: true });

//   const formattedDate = date.toLocaleDateString('en-US', config);
//   return formattedDate;
// };

export const getProgressCount = (startDate) => {
  const normalize = (time) => {
    time = time < 0 ? time : time;
    return new String(time).length < 2 ? '0' + time : time;
  };

  const relapseDate = moment(startDate);

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
    daysCount: moment(moment()).diff(relapseDate, 'days'),
    timeElapsed,
    seconds: moment.duration(timeElapsed).asSeconds(),
  };
};
