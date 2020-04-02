class Rotator {
  constructor () {
    this.options = {
      enabled: false,
      videosSelector: '[data-vt]',
      videosAttribute: 'data-vt',
      categoriesSelector: '[data-ct]',
      categoriesAttribute: 'data-ct'
    }

    this.stats = {
      categoriesClicked: [],
      videosViewed: [],
      videosClicked: []
    }
  }

  /**
   * Replace default configuration
   *
   * @param {*} options
   */
  configure (options = {}) {
    Object.assign(this.options, options)
  }

  /**
   * Run watch
   */
  run () {
    if (!this.options.enabled) {
      return
    }

    document.addEventListener('DOMContentLoaded', () => {
      const videosLinks = document.querySelectorAll(this.options.videosSelector)
      const categoriesLinks = document.querySelectorAll(this.options.categoriesSelector)

      videosLinks.forEach((el) => { this.handleVideoThumbs(el) })
      categoriesLinks.forEach((el) => { this.handleCategoriesLinks(el) })

      window.addEventListener('scroll', () => {
        if (videosLinks.length === this.stats.videosViewed.length) {
          return
        }

        videosLinks.forEach((el) => { this.registerVideoShow(el) })
      }, true)

      this.sendReport()
    })
  }

  /**
   * Send report when window closer or move to other page
   */
  sendReport () {
    window.addEventListener('beforeunload', () => {
      fetch('/api/v1/videos/rotator/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        body: JSON.stringify(this.stats)
      })
    })
  }

  /**
   * Регистрирует клик по категории.
   *
   * @param int id
   */
  registerCategoryClick (data) {
    console.log(data)
    if (this.stats.categoriesClicked.indexOf(data) === -1) {
      this.stats.categoriesClicked.push(data)
    }
  }

  /**
   * Регистрирует клик по видео.
   *
   * @param int categoryId
   * @param int videoId
   * @param int imageId
   */
  registerVideoClick (data) {
    if (this.stats.videosClicked.indexOf(data) === -1) {
      this.stats.videosClicked.push(data)
    }
  }

  /* const thumbsStats = {
    viewed: []
  } */

  /**
   * Thumb shonew in viewport sqaure
   *
   * @param {*} el
   */
  isInViewport (el) {
    // let clientWidth = window.innerWidth || document.documentElement.clientWidth
    let clientHeight = window.innerHeight || document.documentElement.clientHeight
    let bounding = el.getBoundingClientRect()
    let halfElementHeight = bounding.height / 2
    let minRegisterHeigth = (clientHeight - halfElementHeight)

    return (
      bounding.top <= minRegisterHeigth &&
      bounding.top >= -halfElementHeight
    )
  }

  /**
   * Регистрирует показ видео тумбы на экране
   * @param {*} el
   */
  registerVideoShow (el) {
    if (!this.isInViewport(el)) {
      return
    }

    let encodedVideo = el.getAttribute(this.options.videosAttribute)

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
