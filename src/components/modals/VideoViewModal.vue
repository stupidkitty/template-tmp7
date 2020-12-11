<script>
import Thumbs from '../Thumbs.vue'
import ModalControlBar from './ModalControlBar.vue'
import CategoriesList from '../CategoriesList.vue'
import VoteBox from '../VoteBox.vue'
import FlagButton from '../FlagForm/FlagButton.vue'
import FlagFormContainer from '../FlagForm/FlagFormContainer.vue'
import { SecondsToTime, TimeAgo, CompactNumber } from '../../js/helpers/Formatters.js'

export default {
  name: 'VideoViewModal',
  template: '#video-view-modal',
  components: {
    ModalControlBar,
    CategoriesList,
    Thumbs,
    VoteBox,
    FlagButton,
    FlagFormContainer
  },
  props: {
    videoId: {
      type: Number,
      validator: prop => typeof prop === 'number' || prop === null,
      default: 0
    }
  },
  data () {
    return {
      video: {},
      related: [],
      errors: [],
      videosHistory: []
    }
  },
  mounted () {
    this.$on('video-loaded', function (video) {
      this.video = video

      if (!this.historyContainsVideo(video)) {
        this.videosHistory.push(video)
      }

      this.loadRelated()
    })

    this.$on('related-loaded', function (videos) {
      this.related = videos
    })

    this.$on('history-back', function (video) {
      const index = this.videosHistory.indexOf(video)

      if (index <= 0) {
        this.$emit('close')
      } else {
        const previousVideo = this.videosHistory[index - 1]

        this.video = previousVideo
        this.loadRelated()
      }
    })

    this.loadVideo(this.videoId)
  },
  computed: {
    duration () {
      return SecondsToTime(this.video.duration)
    },
    views () {
      return CompactNumber(this.video.views)
    },
    publishedAtHumanized () {
      return TimeAgo(this.video.publishedAt)
    }
  },
  methods: {
    titleIsNotId () {
      return isNaN(this.video.title)
    },
    onRelatedClick (event, video) {
      this.loadVideo(video.id)

      const modalContainer = document.querySelector('.v--modal-overlay.scrollable')

      if (modalContainer !== null) {
        modalContainer.scrollTo(0, 0)
      }
    },
    historyContainsVideo (video) {
      return [] === this.videosHistory.filter(o => { return o.id === video.id })
    },
    loadVideo (newId) {
      const url = '/api/v1/video/' + newId + '/'

      fetch(url, {
        // cache: 'no-cache',
        method: 'GET'
        // credentials: 'same-origin', // include, *same-origin, omit
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(response => response.json())
        .then((response) => {
          const result = response.result
          const video = result.video

          /* if (errors.length > 0) {
            errors.forEach((el) => {
              this.errors.push(el);
            });

            return;
          } */

          this.$emit('video-loaded', video)
        })
        .catch(err => this.errors.push(err.message))
    },
    loadRelated () {
      const url = '/api/v1/video/' + this.video.id + '/related/'

      fetch(url, {
        method: 'GET'
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(response => response.json())
        .then((response) => {
          const result = response.result
          const videos = result.relatedVideos

          /* if (errors.length > 0) {
            errors.forEach((el) => {
              this.errors.push(el);
            });

            return;
          } */

          this.$emit('related-loaded', videos)
        })
        .catch(err => this.errors.push(err.message))
    }
  }
}
</script>

<style>

</style>
