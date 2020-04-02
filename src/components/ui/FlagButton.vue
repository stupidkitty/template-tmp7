<template>
  <div class="flag-button" @click.prevent="openModal">
    <slot></slot>
  </div>
</template>

<script>
import FlagModal from '../modals/FlagModal.vue'

export default {
  name: 'FlagButton',
  props: {
    video: {
      type: Object,
      default: () => ({
        id: 0,
        title: '',
        url: ''
      })
    },
    modalOptions: {
      type: Object,
      default: () => ({
        width: '100%',
        maxWidth: 600,
        height: 'auto',
        adaptive: true,
        pivotY: 0.5,
        name: 'FlagModal'
      })
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    openModal () {
      this.$modal.show(FlagModal, {
        video: this.video
      }, this.modalOptions)
    }
  }
}
</script>
