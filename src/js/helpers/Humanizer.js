import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

class Humanizer {
  seconds2time (seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return [
      h,
      m > 9 ? m : (h ? '0' + m : m || '0'),
      s > 9 ? s : '0' + s
    ].filter(a => a).join(':')
  }

  compactNumber (value) {
    let newValue = value

    if (value >= 1000) {
      const suffixes = ['', 'k', 'm', 'b', 't']
      const suffixNum = Math.floor(('' + value).length / 3)
      let shortValue = 0

      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision))

        const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '')

        if (dotLessShortValue.length <= 2) {
          break
        }
      }

      if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1)
      }

      newValue = shortValue + suffixes[suffixNum]
    }

    return newValue
  }

  timeAgo (publishedAt) {
    return timeAgo.format(new Date(publishedAt))
  }
}

const hm = new Humanizer()

export default hm
