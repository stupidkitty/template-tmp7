<template>
  <div class="flag-form">
    <div class="flag-form__body" v-if="reported === true">
      <div class="flag-form__reported-message">
        Ваша заявка отправлена и будет обработана в ближайшее время.
      </div>
    </div>
    <div class="flag-form__body" v-else>
      <ul class="flag-form-errors" v-if="hasErrors()">
        <li v-for="(error, index) in errors" :key="index" class="flag-form-errors__message">
          {{ error }}
        </li>
      </ul>

      <ul class="flag-reason-list">
        <li v-for="(reason, index) in reasonTypes" :key="index" class="flag-reason-list__reason" @click="selectReason(reason)">
          <label class="flag-reason-list__label">
            <input class="flag-reason-list__radio" type="radio" name="flag_type" :value="reason.type"><span>{{ reason.label }}</span>
          </label>
        </li>
      </ul>

      <div class="flag-form__row">
        <label class="flag-form__label" for="flagEmail">Email</label>
        <input type="email" v-model="email" id="flagEmail" class="flag-form__input" placeholder="Пожалуйста, оставьте свой email">
      </div>

      <div class="flag-form__row">
        <label class="flag-form__label" for="flagReason">Причина</label>
        <textarea v-model="reason" id="flagReason" rows="5" class="flag-form__textarea" placeholder="Ваш комментарий"></textarea>
      </div>
    </div>

    <footer class="flag-form__footer" v-if="reported === false">
      <button class="btn btn-primary flag-form__btn" @click="submitReport()" v-if="reported === false">Отправить</button>
      <button class="btn btn-primary flag-form__btn" @click="close()">Закрыть</button>
    </footer>
  </div>
</template>

<script>

import config from '../../configs/app'

export default {
  name: 'FlagForm',
  props: {
    videoId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      reason: '',
      email: '',
      selectedReasonType: {},
      errors: [],
      reported: false,
      reasonTypes: [
        {
          type: 'inappropriate',
          label: 'Нежелательный контент',
          comment: 'Сцены насилия, реальный инцест, акты дефекации и т.д.'
        },
        { type: 'underage', label: 'Несовешеннолетние актеры', comment: '' },
        { type: 'broken', label: 'Видео не проигрывается', comment: '' },
        { type: 'privacy', label: 'Правообладание\\копирайт (Требуется email)', comment: '' },
        { type: 'other', label: 'Другое (укажите причину)', comment: '' }
      ]
    }
  },
  mounted () {
    this.$on('reported', function () {
      this.reported = true
      this.resetData()

      setTimeout(() => {
        this.$emit('close')
        this.$root.$emit('flag-close')
      }, 3000)
    })
  },
  methods: {
    close () {
      this.$emit('close')
      this.$root.$emit('flag-close')
    },
    submitReason () {
      this.clearErrors()
      this.submitReport()
    },
    isReasonTypeSelected () {
      return this.reasonTypes.indexOf(this.selectedReasonType) !== -1
    },
    isValidEmail (email) {
      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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
        this.errors.push('Выберите один из вариантов для жалобы')
      }

      if (this.selectedReasonType.type === 'privacy' && !this.isValidEmail(this.email)) {
        this.errors.push('Укажите вашу электронную почту')
      }

      if (this.selectedReasonType.type === 'other' && this.reason.trim() === '') {
        this.errors.push('Укажите причину вашей жалобы')
      }

      return !this.hasErrors()
    },
    submitReport () {
      if (!this.isValidForm()) {
        return
      }

      const report = {
        type: this.selectedReasonType.type,
        reason: this.reason,
        email: this.email,
        id: this.videoId,
        title: document.title,
        url: document.location.href
      }

      this.$emit('reported')

      fetch(config.abuseUrl, {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(response => response.json())
        .then(() => {
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

<style lang="scss">

</style>
