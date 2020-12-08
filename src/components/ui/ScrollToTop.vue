<template>
  <div class="scroll-to-top" :class="{ '-show': isShow }" @click.prevent="scrollTop">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: {
    offset: {
      type: Number,
      default: 300
    },
    offsetOpacity: {
      type: Number,
      default: 1200
    },
    duration: {
      type: Number,
      default: 700
    }
  },
  data () {
    return {
      scrolling: false,
      lastScrollOffset: 0,
      isShow: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.detectScrolling)
  },
  destroyed () {
    window.removeEventListener('scroll', this.detectScrolling)
  },
  methods: {
    detectScrolling () {
      if (this.scrolling === false) {
        this.scrolling = true

        !window.requestAnimationFrame ? setTimeout(this.checkBackToTop, 250) : window.requestAnimationFrame(this.checkBackToTop)
      }

      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

      this.isShow = !!((scrollOffset < this.lastScrollOffset && scrollOffset >= this.offset))

      this.lastScrollOffset = scrollOffset <= 0 ? 0 : scrollOffset // For Mobile or negative scrolling
    },
    checkBackToTop () {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop

      if (this.isShow === true && scrollOffset <= this.offset) {
        this.isShow = false
      }

      this.scrolling = false
    },
    scrollTop () {
      if (!window.requestAnimationFrame) {
        window.scrollTo(0, 0)

        return
      }

      const start = window.pageYOffset || document.documentElement.scrollTop
      let currentTime = null

      const animateScroll = (timestamp) => {
        if (!currentTime) {
          currentTime = timestamp
        }

        const progress = timestamp - currentTime
        const val = Math.max(this.easeInOutQuad(progress, start, -start, this.duration), 0)

        window.scrollTo(0, val)

        if (progress < this.duration) {
          window.requestAnimationFrame(animateScroll)
        }
      }

      window.requestAnimationFrame(animateScroll)
    },
    easeInOutQuad (t, b, c, d) {
      t /= d / 2

      if (t < 1) {
        return c / 2 * t * t + b
      }

      t--

      return -c / 2 * (t * (t - 2) - 1) + b
    }
  }
}
</script>
