<template>
  <div class="container">
    <h2 class="text-center mb-4">Настройки приложения</h2>

    <div class="input-group flex-nowrap mb-3">
      <span class="input-group-text" id="addon-wrapping"><i class="bi bi-film"></i></span>
      <input type="text" class="form-control" placeholder="Кинопоиск токен" aria-describedby="addon-wrapping"
        v-model="KipTocken">
      <button class="btn btn-secondary" :disabled="!this.KipTocken" type="submit" v-clipboard:copy="this.KipTocken"
        v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </div>

    <div class="input-group flex-nowrap mb-3">
      <span class="input-group-text" id="addon-wrapping"><i class="bi bi-discord"></i></span>
      <input type="text" class="form-control" placeholder="Discord вебхук" aria-describedby="addon-wrapping"
        v-model="DisTocken">
      <button class="btn btn-secondary" :disabled="!this.DisTocken" type="submit" v-clipboard:copy="this.DisTocken"
        v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </div>

    <router-link class="btn btn-success px-4" to="/">Сохранить</router-link>
  </div>
</template>

<script>
export default {
  inject: ['notyf'],
  data() {
    return {
      KipTocken: localStorage.KipTocken ? JSON.parse(localStorage.KipTocken) : "",
      DisTocken: localStorage.DisTocken ? JSON.parse(localStorage.DisTocken) : "",
    }
  },
  watch: {
    DisTocken(newTocken) {
      localStorage.DisTocken = JSON.stringify(newTocken)
    },
    KipTocken(newTocken) {
      localStorage.KipTocken = JSON.stringify(newTocken)
    }
  },
  methods: {
    clipboardSuccessHandler() {
      console.log(this.notyf.success('Токен скопирован!'))
    },

    clipboardErrorHandler() {
      console.log(this.notyf.error('Ошибка!'))
    }
  }
}
</script>