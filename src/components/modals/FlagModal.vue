<template>
  <div class="flag-modal">
    <header class="flag-modal__header">
      Flag or report this video
      <button @click="closeModal" class="close-modal">
        <svg viewBox="0 0 512 512" class="close-modal__icon">
          <g transform="matrix(0.52329441,0,0,0.52329441,-5.6076363,-5.7230303)">
            <path d="M 500,442.7 79.3,22.6 C 63.4,6.7 37.7,6.7 21.9,22.5 6.1,38.3 6.1,64 22,79.9 L 442.6,500 22,920.1 C 6,936 6.1,961.6 21.9,977.5 c 15.8,15.8 41.6,15.8 57.4,-0.1 L 500,557.3 920.7,977.4 c 16,15.9 41.6,15.9 57.4,0.1 15.8,-15.8 15.8,-41.5 -0.1,-57.4 L 557.4,500 978,79.9 C 994,64 993.9,38.4 978.1,22.5 962.3,6.7 936.5,6.7 920.7,22.6 Z" />
          </g>
        </svg>
      </button>
    </header>

    <section class="flag-modal__body">
      <ul class="error-list" v-if="hasErrors()">
        <li v-for="(error, index) in errors" :key="index" class="error-list__message text-red">
          {{ error }}
        </li>
      </ul>

      <ul class="reason-list">
        <li v-for="(reason, index) in reasonTypes" :key="index" class="reason-list__reason" @click="selectReason(reason)">
          <label class="reason-list__label">
            <input class="reason-list__radio" type="radio" name="flag_type" :value="reason.type"><span>{{ reason.label }}</span>
            </label>
        </li>
      </ul>

      <div class="flag-modal__row">
        <label class="flag-modal__label">Email</label>
        <input type="email" v-model="email" class="flag-modal__field" placeholder="Please leave your email" required>
      </div>

      <div class="flag-modal__row">
        <label class="flag-modal__label">Reason</label>
        <textarea v-model="reason" rows="5" class="flag-modal__field" placeholder="Your comment"></textarea>
      </div>
    </section>

    <footer class="flag-modal__footer">
      <button class="flag-modal__submit" @click="submitReport">Submit</button>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'FlagModal',
  components: {
  },
  props: {
    video: {
      type: Object,
      default: () => ({
        id: 0,
        title: '',
        url: ''
      })
    }
  },
  data () {
    return {
      reason: '',
      email: '',
      selectedReasonType: {},
      errors: [],
      reasonTypes: [
        { type: 'inappropriate', label: 'Inappropriate content' },
        { type: 'underage', label: 'Underage' },
        { type: 'broken', label: 'Broken content' },
        { type: 'privacy', label: 'Privacy\\Copyrighted content (Email required)' },
        { type: 'other', label: 'Other (Reason required)' }
      ]
    }
  },
  mounted () {
    this.$on('reported', function () {
      this.resetData()
      this.closeModal()
    })
  },
  methods: {
    closeModal () {
      this.$modal.hide('FlagModal')
    },
    submitReason () {
      this.clearErrors()
      this.submitReport()
    },
    isReasonTypeSelected () {
      return this.reasonTypes.indexOf(this.selectedReasonType) !== -1
    },
    isValidEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(String(email).toLowerCase())
    },
    selectReason (reasonType) {
      this.selectedReasonType = reasonType
    },
    hasErrors () {
      return this.errors.length > 0
    },
    clearErrors () {
      this.errors = []
    },
    resetData () {
      this.reason = ''
      this.errors = []
    },
    isValidForm () {
      this.clearErrors()

      if (!this.isReasonTypeSelected()) {
        this.errors.push('You should choice reason type')
      }

      if (this.selectedReasonType.type === 'privacy' && !this.isValidEmail(this.email)) {
        this.errors.push('Please enter your email')
      }

      if (this.selectedReasonType.type === 'other' && this.reason.trim() === '') {
        this.errors.push('Please provide the reason')
      }

      return !this.hasErrors()
    },
    submitReport () {
      if (!this.isValidForm()) {
        return
      }

      let report = {
        type: this.selectedReasonType.type,
        reason: this.reason,
        email: this.email,
        id: this.video.id,
        title: this.video.title,
        url: this.video.url
      }

      fetch('https://24support.cc/api/v1/abuse/', {
        cache: 'no-cache',
        method: 'post',
        body: JSON.stringify(report)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(response => response.json())
        .then((response) => {
          this.$emit('reported')
        })
        .catch((err) => {
          console.error(err)
          this.$emit('reported')
        })
    }
  }
}
</script>
