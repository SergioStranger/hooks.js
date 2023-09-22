<template>
  <div>
    <div class="container p-5">
      <!-- Загрузка страницы -->
      <div v-if="isLoading">
        <h1>Loading...</h1>
      </div>


      <!-- Если страница заргужена -->
      <div class="row g-0 position-relative" v-else>
        <div class="col-lg-4 mb-md-0 p-md-4">
          <img :src="film.posterUrl" class="card-img-top">
        </div>
        <div class="col-lg-8 p-4 ps-md-0">
          <h4 class="mt-0">{{ film.nameRu }} ({{ film.year }})</h4>
          <p>{{ film.description }}</p>
          <div class="container">
            <div class="row">
              <div class="col-6 col-md-3">Год</div>
              <div class="col-6 col-md-3">Длительность</div>
              <div class="col-6 col-md-3">Жанр</div>
              <div class="col-6 col-md-3">Смотрим сейчас?</div>
            </div>
            <div class="row">
              <div class="col-6 col-md-3">{{ film.year }}</div>
              <div class="col-6 col-md-3">{{ film.filmLength }} мин</div>
              <div class="col-6 col-md-3">
                <span v-for="(genre, index) in film.genres" :key="index">
                  {{ genre.genre }}{{ index !== film.genres.length - 1 ? ', ' : '' }}
                </span>
              </div>
              <div class="col-3 col-md-2">
                <div class="form-check form-switch me-auto mb-2 mb-lg-0">
                  <input class="form-check-input" type="checkbox" checked v-model="isWatchNow">
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3" v-if="isWatchNow">
            <label class="form-label">Ссылка для совместного просмотра</label>
            <input type="text" class="form-control" v-model="togetherUrl">
          </div>
          <div class="row g-0 position-relative">
            <div class="col-md-12 mb-2 ps-md-0">
              <label for="DiscordMessage" class="form-label">Сообщение для
                отправки</label>
              <textarea class="form-control" id="DiscordMessage" rows="3" v-model="message"></textarea>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary m-1" @click.prevent="sendFilm()">Отправить
                в Discord</button>
              <button type="submit" class="btn btn-success m-1" data-bs-toggle="modal"
                data-bs-target="#WatchFilm">Смотреть
                онлайн</button>
              <button class="btn btn-outline-danger m-1" @click="saveToHistory('closed')">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- WatchFilm Modal -->
    <!-- <div class="modal fade" id="WatchFilm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="WatchFilmLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="WatchFilmLabel">Просмотр фильма</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click.prevent="closeFrame()"></button>
          </div>
          <div class="modal-body">
            <div class="ratio ratio-21x9">
              <iframe id="watchFrame" :src="filmLink" allowfullscreen></iframe>
            </div>

            <div class="alert alert-danger mb-0" role="alert">
              <h4 class="alert-heading">Внимание!</h4>
              <p>
                Конкретный сайт собирает информацию о фильмах / сериалах / мультфильмах / аниме
                из открытых источников и хранит их в кеше браузера.
                Любой видеоконтент предоставляется из сторонних источников, к которым разработчик сайта
                не имеет абсолютно никакого отношения.
              </p>
              <hr>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="agree">
                <label class="form-check-label h-3" for="agree">
                  Я согласен с предупреждением выше
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              @click.prevent="closeFrame()">Закрыть</button>
            <a :href="filmLink" target="_blank" class="btn btn-primary">Открыть в новой вкладке</a>
          </div>
        </div>
      </div>
    </div> -->
    <!-- / WatchFilm Modal -->
  </div>
</template>

<script>

export default {
  inject: ['notyf'],

  data() {
    return {
      film: null,
      isLoading: true,
      isWatchNow: false,
      togetherUrl: "",
      message: "",
      DiscordWebhook: JSON.parse(localStorage.DisTocken)
    }
  },
  computed: {
    genres: function () {
      let str = ''
      for (let genre in this.film.genres) {
        genre > 0 ? str += ', ' : false
        str += this.film.genres[genre]['genre']
      }
      return str.trimEnd()
    },
    countries: function () {
      let str = ''
      for (let country in this.film.countries) {
        country > 0 ? str += ', ' : false
        str += this.film.countries[country]['country']
      }

      return str.trimEnd()
    },
    filmLength: function () {
      let length = this.film.filmLength
      if (length > 60) {
        let hour = Math.floor(length / 60)
        let minuts = length % 60

        return hour + ' ч ' + minuts + ' мин'
      } else {
        return length + ' мин'
      }
    },
    ratingAgeLimits: function () {
      return this.film.ratingAgeLimits == null ? 'Приятного просмотра  |  ' : `Возрастное ограничение: ${parseInt(this.film.ratingAgeLimits.replace(/\D+/g, ''))}+  |  `
    },
    description: function () {
      return this.film.description.length > 1000 ? this.film.description.substr(0, 1000) + '...' : this.film.description
    },
    watchLink: function () {
      let links = `[:page_with_curl: ┋ Перейти на Кинопоиск](${this.film.webUrl})`
      if (this.isWatchNow && this.togetherUrl && this.togetherUrl.indexOf('https://') !== -1)
        return links + `[:eyes: ┋ Подключиться к совместному каналу для просмотра](${this.togetherUrl}) \n `
      return links
    },
  },
  async mounted() {
    try {
      let response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + this.$route.params.id, {
        method: 'GET',
        headers: {
          'X-API-KEY': JSON.parse(localStorage.KipTocken),
          'Content-Type': 'application/json',
        }
      })

      if (response.status == 200) {
        this.film = await response.json()
        this.isLoading = false
        this.notyf.success('Фильм успешно найден!')
      } else {
        switch (response.status) {
          case 400:
            this.notyf.error('Неправильный запрос')
            break
          case 401:
            this.notyf.error('Пустой или неправильный токен')
            break
          case 404:
            this.notyf.error('Фильм не найден')
            break
          case 429:
            this.notyf.error('Слишком много запросов. Общий лимит - 20 запросов в секунду')
            break
        }

        this.$router.push('/')
      }
    } catch (error) {
      this.notyf.error('Неизвестная ошибка!')
      console.log('%c' + error['message'], 'font-size: 14px; font-family: Verdana;')
      this.$router.push('/')
    }
  },
  methods: {
    async sendFilm() {
      try {
        let response = await fetch(this.DiscordWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "content": this.message,
            "embeds": [{
              "title": this.film.nameRu + ` (${this.film.year})`,
              "color": 3368703,
              "timestamp": null,
              "url": this.film.webUrl,
              "image": {
                "url": this.film.posterUrl
              },
              "thumbnail": {
                "url": this.film.posterUrl
              },
              "footer": {
                "text": this.ratingAgeLimits + `Длительность: ${this.filmLength}`,
                "icon_url": "https://lh6.ggpht.com/S6_A7lzx3EfpKSBKm1Kg0N5IlHGgeja5Lb_CpPzWTB87cIsmKd70cl5GlL961ST4L9A"
              },
              "fields": [{
                "name": "Слоган:",
                "value": this.film.slogan != null ? this.film.slogan : 'без слогана',
                "inline": true
              },
              {
                "name": ":film_frames: Жанр:",
                "value": this.genres,
                "inline": true
              },
              {
                "name": ":book: Описание сюжета:",
                "value": this.description,
                "inline": false
              },
              {
                "name": ":link: Ссылка на просмотр",
                "value": this.watchLink,
                "inline": false
              },
              {
                "name": ":map: Страна:",
                "value": this.countries,
                "inline": true
              },
              {
                "name": ":flag_ru: Рейтинг КП:",
                "value": this.film.ratingKinopoisk ? String(this.film.ratingKinopoisk) : 'нет данных',
                "inline": true
              },
              {
                "name": ":flag_us: Рейтинг IMDb:",
                "value": this.film.ratingImdb ? String(this.film.ratingImdb) : 'нет данных',
                "inline": true
              },
              ]
            }]
          })
        })

        switch (response.status) {
          case 204:
            this.notyf.success('Данные успешно отправленны!')
            this.saveToHistory('success')
            break
          case 401:
            this.notyf.error('Неверный токен Discord!')
            break
          case 400:
            this.notyf.error('Данные невозможно отправить!')
            break
          case 405:
            this.notyf.error('Не верно указан токен Discord!')
            break
          default:
            // let error = await response.json();
            this.notyf.error('Непонятная ошибка, подробнее в консоли')
            console.log('%cОшибка: ', 'font-size: 32px; color: #ed3d3d; font-family: Impact; text-shadow: 2px 4px 4px #000;')
            // console.log('%c' + error['message'], 'font-size: 14px; font-family: Verdana;')
            break
        }
      } catch (err) {
        this.notyf.error('Запрос не выполнен, подробнее в консоли')
        console.log('%cОшибка: ', 'font-size: 32px; color: #ed3d3d; font-family: Impact; text-shadow: 2px 4px 4px #000;')
        console.log('%c' + err['message'], 'font-size: 14px; font-family: Verdana;')
      }
    },
    saveToHistory(status) {
      let history = []
      let now = new Date()

      if (localStorage.userHistory && localStorage.userHistory !== '[]') {
        history = JSON.parse(localStorage.userHistory)
      }

      let item = {
        'name': `${this.film.nameRu} (${this.film.year})`,
        'poster': this.film.posterUrl,
        'description': this.film.description,
        'webUrl': this.film.webUrl,
        "status": status,
        "time": now.toLocaleString('ru-RU', { timeStyle: 'short', dateStyle: 'long' })
      }

      history.unshift(item)

      // Чистим дубликаты
      const res = history.reduce((o, i) => {
        if (!o.find(v => v.name == i.name)) {
          o.push(i);
        }
        return o;
      }, []);

      localStorage.userHistory = JSON.stringify(res)

      this.$router.push('/')
    }
  }
}
</script>