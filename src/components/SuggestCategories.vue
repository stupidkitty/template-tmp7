<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'SuggestCategories',
  components: {
    Multiselect
  },
  props: {
    videoId: Number,
    videoCategories: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      categories: [],
      options: [],
      isAdded: false,
      lockInterface: false,
      isLoadedCategories: false
    }
  },
  mounted () {
    this.$on('categories-loaded', (categories) => {
      categories.forEach((c) => {
        let result = this.categories.find((el) => {
          return c.title === el.name
        })

        if (!result) {
          this.addOption(c.title)
        }
      })

      this.options = this.options.sort(this.sortByName)

      this.isLoadedCategories = true
    })

    this.videoCategories.forEach((m) => {
      this.addTag(m)
    })

    this.$on('categories-added', () => {
      this.isAdded = true
    })
  },
  methods: {
    open () {
      this.loadCategories()
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }

      this.options.push(tag)
      this.categories.push(tag)
    },
    addOption (newTag) {
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }

      this.options.push(tag)
    },
    addCategory (newTag) {
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }

      this.categories.push(tag)
    },
    loadCategories () {
      if (this.isLoadedCategories) {
        return
      }

      return fetch('/api/v1/videos/categories', {
      // return fetch('http://rs.lc/tt.php', {
        cache: 'no-cache'
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(response => response.json())
        .then((response) => {
          let categories = response.result.categories

          this.$emit('categories-loaded', categories)
        })
    },
    submitCategories () {
      this.lockInterface = true

      let items = {
        video_id: this.videoId,
        categories: this.categories.map((c) => c.name)
      }

      return fetch('https://24fastload.com/suggest_cats.php', {
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
          this.$emit('categories-added')
        })
    },
    sortByName (a, b) {
      if (a.name < b.name) {
        return -1
      }

      if (a.name > b.name) {
        return 1
      }

      return 0
    }
  }
}
</script>
