<template>
  <div :class="[cssClass, {'-video': display}]"
        @mouseenter="onPreviewMouseOver"
        @mouseleave="onPreviewMouseOut"
        @blur="onPreviewMouseOut">
    <div class="fake-progress" v-if="showProgress"><div class="fake-progress__bar"></div></div>
    <video :src="previewUrl"
            v-if="display"
            muted
            autoplay
            loop
            webkit-playsinline="true"
            playsinline="true"
            @loadstart="startLoadVideo"
            @canplay="endLoadVideo"
            @error="errorLoadVideo"
            @contextmenu.native.prevent.stop=""></video>
    <slot></slot>
    <play-preview-button :css-class="playButton.cssClass" :is-play-now="display" @click="togglePreviewPlay" v-if="playButton.enabled">
      <template v-slot:play>
        <img src="@/svg/thumb-preview-start.svg" width="16" height="16">
      </template>
      <template v-slot:stop>
        <img src="@/svg/thumb-preview-stop.svg" width="16" height="16">
      </template>
    </play-preview-button>
  </div>
</template>

<script>
import PlayPreviewButton from '@/components/ui/PlayPreviewButton.vue'

export default {
  name: 'VideoPreview',
  components: {
    PlayPreviewButton
  },
  props: {
    cssClass: {
      type: String,
      default: 'video-preview'
    },
    playButton: {
      type: Object,
      default: () => {
        return {
          enabled: true,
          cssClass: 'video-preview__play'
        }
      }
    },
    previewUrl: String
  },
  data () {
    return {
      showProgress: false,
      display: false,
      defferedPreviewPlayTimer: null
    }
  },
  watch: {
    display (newValue) {
      if (newValue === true) {
        this.$emit('preview-start')
      } else {
        this.$emit('preview-end')
      }
    },
    previewUrl () {
      this.showProgress = false
      this.display = false

      this.removeDefferedTimer()
    }
  },
  methods: {
    startLoadVideo () {
      this.showProgress = true
    },
    endLoadVideo () {
      this.showProgress = false
    },
    errorLoadVideo () {
      this.showProgress = false
      this.$emit('preview-error')
    },
    togglePreviewPlay () {
      this.display = !this.display

      this.removeDefferedTimer()
    },
    removeDefferedTimer () {
      if (this.defferedPreviewPlayTimer) {
        window.clearTimeout(this.defferedPreviewPlayTimer)
      }
    },
    playPreviewWithDelay () {
      this.defferedPreviewPlayTimer = setTimeout(() => {
        this.display = true
      }, 400)
    },
    stopPreview () {
      this.display = false
    },
    onPreviewMouseOver () {
      if (this.display === false) {
        this.playPreviewWithDelay()
      }
    },
    onPreviewMouseOut (event) {
      let e = event.toElement || event.relatedTarget

      this.removeDefferedTimer()

      if (e && e.nodeName !== 'VIDEO') {
        if (this.display === true) {
          this.display = false
        }
      }
    }
  }
}
</script>
