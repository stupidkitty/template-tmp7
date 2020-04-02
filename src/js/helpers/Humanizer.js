import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addLocale(ru);
const timeAgo = new TimeAgo('ru-RU');

class Humanizer
{
  seconds2time(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    return [
      h,
      m > 9 ? m : (h ? '0' + m : m || '0'),
      s > 9 ? s : '0' + s,
    ].filter(a => a).join(':');
  }

  compactNumber(value) {
    let newValue = value;

    if (value >= 1000) {
      let suffixes = ['', 'k', 'm', 'b', 't'];
      let suffixNum = Math.floor(('' + value).length / 3);
      let shortValue = '';

      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(precision));

        let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');

        if (dotLessShortValue.length <= 2) {
          break;
        }
      }

      if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
      }

      newValue = shortValue + suffixes[suffixNum];
    }

    return newValue;
  }

  timeAgo(publishedAt) {
    return timeAgo.format(new Date(publishedAt));
  }
}

const hm = new Humanizer();

export default hm;
