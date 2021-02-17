<script>
import CategoriesList from './CategoriesList.vue'
import VideoPreview from './VideoPreview.vue'
import { SecondsToTime, TimeAgo, CompactNumber, LikesPercent } from '../js/helpers/Formatters.js'

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
      return LikesPercent(this.video.likes, this.video.dislikes)
    }
  },
  methods: {
    onThumbClick (event, video) {
      this.$eventHub.$emit('thumb-click', event, video)
    }
  }
}
</script>
