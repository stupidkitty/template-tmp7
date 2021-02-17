<script>
import CategoriesList from './CategoriesList.vue'
import VideoPreview from './VideoPreview.vue'
import { SecondsToTime, TimeAgo, CompactNumber } from '../js/helpers/Formatters.js'

export default {
  name: 'VideoThumb',
  components: {
    CategoriesList,
    VideoPreview
  },
  props: {
    video: Object
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$emit('thumb-created', this.video)
  },
  computed: {
    duration () {
      return SecondsToTime(this.video.duration)
    },
    views () {
      return CompactNumber(this.video.views, 1)
    },
    publishedAtHumanized () {
      return TimeAgo(this.video.publishedAt)
    },
    likesPercent () {
      if (this.video.dislikes === 1) {
        return 100
      }

      const likesPercent = (this.video.likes / (this.video.likes + this.video.dislikes)) * 100

      return Number.parseInt(likesPercent, 10)
    }
  },
  methods: {
    onThumbClick (event, video) {
      this.$eventHub.$emit('thumb-click', event, video)
    }
  }
}
</script>
