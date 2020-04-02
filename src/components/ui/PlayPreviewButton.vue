<template>
  <div :class="cssClass" @click.prevent.stop="$emit('click')">
    <slot name="play" v-if="false === isPlayNow"></slot>
    <slot name="stop" v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'PlayPreviewButton',
  props: {
    isPlayNow: {
      type: Boolean,
      default: false
    },
    cssClass: {
      type: String,
      default: 'thumb-tap'
    }
  }
}
</script>
