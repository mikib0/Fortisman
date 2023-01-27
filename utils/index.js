import moment from 'moment';
import { DATE_FORMAT } from '../constants';

export const formattedDate = (date) => {
  const mom = date ? moment(date) : moment()
  return mom.format(DATE_FORMAT);
}

export { default as getProgressCount } from './getProgressCount'


export { default as getActiveRank } from './getActiveRank'