import TimeAgoLib from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'

TimeAgoLib.addLocale(ru)
const ta = new TimeAgoLib('ru-RU')

export function TimeAgo (datetime) {
  const d = new Date(datetime)

  if (d instanceof Date && !isNaN(d)) {
    return ta.format(d)
  }

  return ''
}

export function SecondsToTime (seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return [
    h,
    m > 9 ? m : (h ? '0' + m : m || '0'),
    s > 9 ? s : '0' + s
  ].filter(a => a).join(':')
}

export function CompactNumber (value) {
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

export function LikesPercent (likes, dislikes) {
  const votesSum = likes + dislikes

  if (votesSum === 0) {
    return 100
  }

  const likesPercent = (likes / votesSum) * 100

  return Math.ceil(likesPercent)
}

export default {
  TimeAgo,
  SecondsToTime,
  CompactNumber,
  LikesPercent
}
