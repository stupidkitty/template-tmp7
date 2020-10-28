<script>
export default {
  name: 'ModalControlBar',
  props: {
    sticky: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (this.sticky) {
      const overlay = this.$el.closest('.v--modal-overlay')

      if (overlay !== null) {
        overlay.addEventListener('scroll', () => {
          const ovRect = overlay.getBoundingClientRect()
          const elRect = this.$el.getBoundingClientRect()
          const offsetY = elRect.top - ovRect.top

          if (overlay.scrollTop > offsetY) {
            this.$el.classList.add('-sticky')
          } else {
            this.$el.classList.remove('-sticky')
          }
        })
      }
    }
  }
}
</script>
