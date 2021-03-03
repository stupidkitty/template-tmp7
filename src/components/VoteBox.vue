<script>

import { LikesPercent } from '../js/helpers/Formatters'

export default {
  name: 'VoteBox',
  template: '#like-box-template',
  props: {
    videoId: Number,
    iLikes: {
      type: Number,
      default: 0
    },
    iDislikes: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      likes: 0,
      dislikes: 0,
      votedVideos: [],
      storage: localStorage
    }
  },
  mounted () {
    const votedVideos = this.getFromStorage('votedVideos')

    if (votedVideos !== null) {
      this.votedVideos = votedVideos
    }

    this.$on('voted', () => this.registerVote())
  },
  watch: {
    iLikes: {
      handler () {
        this.likes = this.iLikes
      },
      immediate: true
    },
    iDislikes: {
      handler () {
        this.dislikes = this.iDislikes
      },
      immediate: true
    }
  },
  computed: {
    likesPercent () {
      return LikesPercent(this.likes, this.dislikes)
    }
  },
  methods: {
    voteLike () {
      if (this.isVoted() || isNaN(Number(this.videoId))) {
        return
      }

      this.likes += 1

      fetch('/api/v1/video/' + this.videoId + '/like/', {
        method: 'PUT',
        cache: 'no-cache'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(() => {
          this.$emit('voted')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    voteDislike () {
      if (this.isVoted() || isNaN(Number(this.videoId))) {
        return
      }

      this.dislikes += 1

      fetch('/api/v1/video/' + this.videoId + '/dislike/', {
        method: 'PUT',
        cache: 'no-cache'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(() => {
          this.$emit('voted')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    isVoted () {
      return this.votedVideos.indexOf(this.videoId) !== -1
    },
    registerVote () {
      this.votedVideos.push(this.videoId)
      this.setToStorage('votedVideos', this.votedVideos)
    },

    getFromStorage (key) {
      return JSON.parse(this.storage.getItem(key))
    },

    setToStorage (key, obj) {
      return this.storage.setItem(key, JSON.stringify(obj))
    }
  }
}
</script>
