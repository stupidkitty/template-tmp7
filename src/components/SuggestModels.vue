<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'SuggestModels',
  components: {
    Multiselect
  },
  props: {
    videoId: Number,
    videoModels: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      models: [],
      options: [],
      isAdded: false,
      lockInterface: false
    }
  },
  mounted () {
    this.videoModels.forEach((m) => {
      this.addTag(m)
    })

    this.$on('models-added', () => {
      this.isAdded = true
    })
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        id: Math.floor((Math.random() * 10000000))
      }

      this.options.push(tag)
      this.models.push(tag)
    },
    submitModels () {
      this.lockInterface = true

      let items = {
        video_id: this.videoId,
        models: this.models.map((c) => c.name)
      }

      return fetch('https://24fastload.com/suggest_models.php', {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then((response) => {
          this.$emit('models-added')
        })
    }
  }
}
</script>
