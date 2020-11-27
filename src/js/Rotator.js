import config from '../configs/rotator'

/**
 * Thumb show new in viewport square
 *
 * @param {*} el
 */
const isInViewport = (el) => {
  // let clientWidth = window.innerWidth || document.documentElement.clientWidth
  const clientHeight = window.innerHeight || document.documentElement.clientHeight
  const bounding = el.getBoundingClientRect()
  const halfElementHeight = bounding.height / 2
  const minRegisterHeight = (clientHeight - halfElementHeight)

  return (
    bounding.top <= minRegisterHeight &&
    bounding.top >= -halfElementHeight
  )
}

class Rotator {
  options = {
    enabled: false,
    videosSelector: '[data-vt]',
    videosAttribute: 'data-vt',
    categoriesSelector: '[data-ct]',
    categoriesAttribute: 'data-ct'
  }

  stats = {
    categoriesClicked: [],
    videosViewed: [],
    videosClicked: []
  }

  /**
   * Rotator constructor
   *
   * @param options
   */
  constructor (options = {}) {
    this.options = { ...this.options, ...options }
  }

  /**
   * Replace default configuration
   *
   * @param {*} options
   */
  configure (options = {}) {
    this.options = { ...this.options, ...options }
  }

  /**
   * Run watch
   */
  run () {
    if (!this.options.enabled) {
      return
    }

    const videosLinks = document.querySelectorAll(this.options.videosSelector)
    const categoriesLinks = document.querySelectorAll(this.options.categoriesSelector)

    videosLinks.forEach((el) => {
      this.handleVideoThumbs(el)
    })
    categoriesLinks.forEach((el) => {
      this.handleCategoriesLinks(el)
    })

    window.addEventListener('scroll', () => {
      if (videosLinks.length === this.stats.videosViewed.length) {
        return
      }

      videosLinks.forEach((el) => {
        this.registerVideoShow(el)
      })
    }, true)

    this.sendReport()
  }

  /**
   * Send report when window closer or move to other page
   */
  sendReport () {
    window.addEventListener('pagehide', () => {
      fetch(config.sendUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        keepalive: true,
        body: JSON.stringify(this.stats)
      })
    })
  }

  /**
   * Регистрирует клик по категории.
   *
   * @param data
   */
  registerCategoryClick (data) {
    if (this.stats.categoriesClicked.indexOf(data) === -1) {
      this.stats.categoriesClicked.push(data)
    }
  }

  /**
   * Регистрирует клик по видео.
   *
   * @param data
   */
  registerVideoClick (data) {
    if (this.stats.videosClicked.indexOf(data) === -1) {
      this.stats.videosClicked.push(data)
    }
  }

  /**
   * Регистрирует показ видео тумбы на экране
   * @param {*} el
   */
  registerVideoShow (el) {
    if (!isInViewport(el)) {
      return
    }

    const encodedVideo = el.getAttribute(this.options.videosAttribute)

    if (this.stats.videosViewed.indexOf(encodedVideo) === -1) {
      this.stats.videosViewed.push(encodedVideo)
    }
  }

  /**
   * Начальная обработка видео тумбы. Регистрация на экране и аттач листеров
   * @param {*} el
   */
  handleVideoThumbs (el) {
    this.registerVideoShow(el)

    el.addEventListener('click', () => {
      this.registerVideoClick(el.getAttribute(this.options.videosAttribute))
    })
  }

  /**
   * Начальная обработка тумбы\ссылки категории. Аттач листеров
   * @param {*} el
   */
  handleCategoriesLinks (el) {
    el.addEventListener('click', () => {
      this.registerCategoryClick(el.getAttribute(this.options.categoriesAttribute))
    })
  }
}

const rt = new Rotator()

export default rt
