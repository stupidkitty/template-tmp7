<script>
import VideoViewModal from '@/components/modals/VideoViewModal.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import VideoThumb from '@/components/VideoThumb.vue'
import VideoPreview from '@/components/VideoPreview.vue'

export default {
  name: 'Thumbs',
  components: {
    CategoriesList,
    VideoThumb,
    VideoPreview
  },
  props: {
    rotationStatistic: Boolean,
    videos: Array,
    categoryId: {
      type: Number,
      default: 0
    },
    openModal: {
      type: Boolean,
      default: false
    },
    modalOptions: {
      type: Object,
      default: () => ({
        width: '100%',
        maxWidth: 992,
        height: 'auto',
        adaptive: true,
        scrollable: true,
        pivotY: 0,
        name: 'videoViewModal'
      })
    }
  },
  data () {
    return {
      defaultLocationUrl: '',
      startedPreview: []
    }
  },
  created () {
    this.defaultLocationUrl = window.location.href

    // Attach onpopstate event handler
    /* window.addEventListener('popstate', (event) => {
      if (event.state.type && event.state.type === 'video') {
        this.openVideoModal(event.state.video);
      } else if (event.state.type && event.state.type === 'default') {
        console.log('default');
        this.$modal.hide('videoViewModal');
      }
    }); */
  },
  methods: {
    onThumbClick (event, video) {
      if (this.openModal === true) {
        this.openVideoModal(video)
      }

      this.$eventHub.$emit('thumb-click', event, video)

      /* let target = event.target.closest('a');

      if (null !== target && video) {
        window.history.pushState({type: 'video', video: video}, video.title, target.getAttribute('href'));
      } */
    },
    openVideoModal (video) {
      this.$modal.show(VideoViewModal, {
        videoId: video.id || 0
      }, this.modalOptions/* , {
          'opened': this.onModalOpened,
          'closed': this.onModalClosed
        } */)
    }
    /* onModalOpened (event) {
    },
    onModalClosed (event) {
      //window.history.pushState({type: 'default'}, this.categoryId, this.defaultLocationUrl);
    }, */
  }
}
</script>
