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

export function CompactNumber (value, fixed = 0) {
  if (value === null) { // terminate early
    return null
  }

  if (value === 0) {
    return '0'
  }

  fixed = (!fixed || fixed < 0) ? 0 : fixed // number of decimal places to show

  const b = (value).toPrecision(2).split('e') // get power

  const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3) // floor at decimals, ceiling at trillions
  const c = k < 1 ? value.toFixed(0 + fixed) : (value / Math.pow(10, k * 3)).toFixed(fixed) // divide by power
  const d = c < 0 ? c : Math.abs(c) // enforce -0 is 0
  // append power
  return d + ['', 'k', 'm', 'b', 't'][k]
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
