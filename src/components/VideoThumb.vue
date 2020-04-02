<script>
import CategoriesList from '@/components/CategoriesList.vue'
import VideoPreview from '@/components/VideoPreview.vue'
import Humanizer from '@/js/helpers/Humanizer.js'

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
  mounted() {
    this.$emit('thumb-created', this.video)
  },
  computed: {
    duration () {
      return Humanizer.seconds2time(this.video.duration)
    },
    views () {
      return Humanizer.compactNumber(this.video.views)
    },
    publishedAtHumanized () {
      return Humanizer.timeAgo(this.video.publishedAt)
    }
  },
  methods: {
    onThumbClick (event, video) {
      this.$eventHub.$emit('thumb-click', event, video)
    }
  }
}
</script>
