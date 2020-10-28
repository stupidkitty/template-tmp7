import '@/assets/scss/main.scss'

import AppOpt from '@/js/AppOpt.js'
import 'whatwg-fetch'
import Vue from 'vue'
// import ClipboardJS from 'clipboard'
// import VModal from 'vue-js-modal'
import VideoViewModal from '@/components/modals/VideoViewModal.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'
// import FlagButton from '@/components/ui/FlagButton.vue'
// import SuggestCategories from '@/components/SuggestCategories.vue'
// import SuggestModels from '@/components/SuggestModels.vue'
import Thumbs from '@/components/Thumbs.vue'
import VoteBox from '@/components/VoteBox.vue'
import VideoPreview from '@/components/VideoPreview.vue'
import Rotator from '@/js/Rotator.js'

// import tippy from 'tippy.js'
// import 'tippy.js/dist/tippy.css'
// import 'tippy.js/animations/scale.css'

Vue.config.productionTip = false
// Vue.use(VModal, { dynamic: true })

Vue.prototype.$eventHub = new Vue()

new Vue({
  components: {
    ScrollToTop,
    // FlagButton,
    // SuggestCategories,
    // SuggestModels,
    VoteBox,
    VideoPreview,
    VideoViewModal,
    Thumbs
  },
  created () {
    if (AppOpt.Rotator.enabled) {
      this.$eventHub.$on('category-click', (event, category) => {
        const data = window.btoa(JSON.stringify({ id: category.id }))

        Rotator.registerCategoryClick(data)
      })

      this.$eventHub.$on('thumb-click', (event, video) => {
        const data = window.btoa(JSON.stringify({ id: video.id, imageId: video.imageId }))

        Rotator.registerVideoClick(data)
      })
    }
  }
}).$mount('#app')

/**
 * Сбор статистики для ротатора
 */
if (AppOpt.Rotator.enabled) {
  Rotator.configure(AppOpt.Rotator)
  Rotator.run()
}

/**
 * Кнопка копирования урла страницы в просмотре видео
 */
/* let clipboard = new ClipboardJS('[data-action=copy-url]')
clipboard.on('success', function (e) {
  const tippyInstance = tippy(e.trigger, {
    content: 'Copied!',
    animation: 'scale',
    hideOnClick: false,
    trigger: 'manual',
    multiple: true
  })

  tippyInstance.show()

  setTimeout(() => {
    tippyInstance.hide()
    tippyInstance.destroy()
  }, 1000)
}) */

/**
 * Открытие блоков добавления категории и модели
 */
/* let toggeSuggestButton = document.querySelectorAll('.tag-list__add')

toggeSuggestButton.forEach(function (el) {
  el.addEventListener('click', function () {
    if (!this.hasAttribute('data-target')) {
      return
    }

    let selector = this.getAttribute('data-target')
    let container = document.querySelector(selector)

    if (container !== null) {
      container.classList.toggle('-show')
    }
  })
}) */

require('./js/ui-addititional.js')
