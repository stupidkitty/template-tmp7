<script>
export default {
  name: 'ModalControlBar',
  props: {
    sticky: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.sticky) {
      let overlay = this.$el.closest('.v--modal-overlay');

      if (null !== overlay) {
        overlay.addEventListener('scroll', () => {
          let ovRect = overlay.getBoundingClientRect();
          let elRect = this.$el.getBoundingClientRect();
          let offsetY = elRect.top - ovRect.top;

          if (overlay.scrollTop > offsetY) {
            this.$el.classList.add('-sticky');
          } else {
            this.$el.classList.remove('-sticky');
          }
        });
      }
    }
  }
}
</script>
