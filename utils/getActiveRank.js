import { ranks } from '../constants';

const between = (victim, lower, upper) => {
  return victim >= lower && victim < upper;
};

export default function (daysCount) {
  if (daysCount === 0) return ranks[0].name;
  else if (daysCount >= 500) return ranks[-1].name;
  else {
    for (let i = 0; i < ranks.length; i++) {
      if (between(daysCount, ranks[i].days, ranks[i + 1].days))
        return ranks[i].name;
    }
  }
}
