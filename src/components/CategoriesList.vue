<script>

export default {
  name: 'CategoriesList',
  props: {
    rotationStatistic: Boolean,
    categories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onCategoryClick (event, category) {
      this.$eventHub.$emit('category-click', event, category)
    }
  }
}
</script>
