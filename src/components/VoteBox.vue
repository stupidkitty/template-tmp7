<script>
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
  },
  watch: {
    iLikes: {
      handler: function () {
        this.likes = this.iLikes
      },
      immediate: true
    },
    iDislikes: {
      handler: function () {
        this.dislikes = this.iDislikes
      },
      immediate: true
    }
  },
  computed: {
    likesPercent () {
      const totalVotes = this.likes + this.dislikes

      if (totalVotes === 0) {
        return 0
      }

      return Math.round(this.likes / totalVotes * 100, -1)
    }
  },
  methods: {
    voteLike () {
      if (!this.setVoted()) {
        return
      }

      this.likes += 1

      fetch('/api/v1/video/' + this.videoId + '/like/', {
        method: 'PUT',
        cache: 'no-cache'
      })
    },
    voteDislike () {
      if (!this.setVoted()) {
        return
      }

      this.dislikes += 1

      fetch('/api/v1/video/' + this.videoId + '/dislike/', {
        method: 'PUT',
        cache: 'no-cache'
      })
    },
    isVoted () {
      return this.votedVideos.indexOf(this.videoId) !== -1
    },
    setVoted () {
      if (!this.isVoted()) {
        this.votedVideos.push(this.videoId)
        this.setToStorage('votedVideos', this.votedVideos)

        return true
      }

      return false
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
