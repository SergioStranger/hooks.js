<template>
  <div>
    <div class="container px-5">
      <!-- Загрузка страницы -->
      <div v-if="isLoading">
        <h1>Loading...</h1>
      </div>


      <!-- Если страница заргужена -->
      <div class="film-card d-flex flex-wrap" v-else>

        <div class="col-12 col-xl-4">
          <img :src="film.posterUrl" class="h-100 w-100">
        </div>

        <div class="card-block d-flex flex-column justify-content-between col-12 col-xl-8">
          <div class="card-block__text">
            <div class="row mb-4">
              <div class="col-10">
                <h2 class="m-0">{{ film.nameRu }}</h2>
                <small>{{ film.nameOriginal }}</small>
              </div>
              <div class="col-2 d-flex flex-wrap justify-content-center rate">
                <div class="badge bg-success px-4 py-2">{{ film.ratingKinopoisk }}</div>
                <div>{{ film.ratingKinopoiskVoteCount }} оценок</div>
              </div>
            </div>

            <div class="card-block__points mb-4">
              <table>
                <tr>
                  <td>Страна</td>
                  <td><span v-for="(country, index) in film.countries" :key="index">
                      {{ country.country }}{{ index !== film.countries.length - 1 ? ', ' : '' }}
                    </span></td>
                </tr>
                <tr>
                  <td>Жанр</td>
                  <td><span v-for="(genre, index) in film.genres" :key="index">
                      {{ genre.genre }}{{ index !== film.genres.length - 1 ? ', ' : '' }}
                    </span></td>
                </tr>
                <tr>
                  <td>Длительность</td>
                  <td>{{ film.filmLength }} мин</td>
                </tr>
                <tr>
                  <td>Слоган</td>
                  <td>{{ film.slogan ? film.slogan : '—' }}</td>
                </tr>
                <tr>
                  <td>Год</td>
                  <td>{{ film.year }}</td>
                </tr>
              </table>
            </div>

            <p class="description">{{ film.description }}</p>
          </div>

          <div class="d-grid d-lg-flex">
            <a class="btn btn-outline-primary px-3 me-lg-3 my-md-1 my-2" data-bs-toggle="modal"
              data-bs-target="#sendDiscord">Отправить в
              Discord</a>
            <a class="btn btn-outline-success px-3 my-md-1 my-2">Смотреть онлайн</a>
            <router-link class="btn btn-danger ms-lg-auto my-md-1 my-2" to="/">Отмена</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="sendDiscord" tabindex="-1" aria-labelledby="sendDiscordLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-dark">
            <div class="mb-3">
              <div class="row">
                <label for="together" class="form-label col-7">Совместный просмотр</label>
                <div class="form-check col-5">
                  <input class="form-check-input" type="checkbox" value="" id="onTogether" v-model="this.together.isWatchNow">
                  <label class="form-check-label" for="onTogether">
                    Включить совместный просмотр
                  </label>
                </div>
              </div>
              <input type="text" class="form-control" id="together" placeholder="https://hooks.nyako.ru" 
              :disabled="!this.together.isWatchNow"
              v-model="this.together.url">
            </div>
            <div class="mb-3">
              <div class="row">
                <label for="message" class="form-label col-7">Сообщение для Discord</label>
                <div class="form-check col-5">
                  <input class="form-check-input" type="checkbox" value="" id="onMessage" v-model="this.message.isMessage">
                  <label class="form-check-label" for="onMessage">
                    Включить дополнительное сообщение
                  </label>
                </div>
              </div>
              <textarea class="form-control" id="message" rows="3" 
              :disabled="!this.message.isMessage"
              v-model="this.message.text"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="sendFilm">Отправить</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  inject: ['notyf'],

  data() {
    return {
      film: null,
      isLoading: true,
      together: {
        isWatchNow: false,
        url: localStorage.watchTogether ? JSON.parse(localStorage.watchTogether) : ''
      },
      message: {
        isMessage: false,
        text: ''
      },
      DiscordWebhook: localStorage.DisTocken ? JSON.parse(localStorage.DisTocken) : null
    }
  },
  watch: {
    '$route.params.id'() {
      this.loadPage()
    },
    'together.url'(newUrl) {
      localStorage.watchTogether = JSON.stringify(newUrl)
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
      let links = `[:page_with_curl: ┋ Перейти на Кинопоиск](${this.film.webUrl})\n`
      if (this.together.isWatchNow && this.together.url && this.together.url.indexOf('https://') !== -1)
        return links + `[:eyes: ┋ Подключиться к совместному каналу для просмотра](${this.together.url}) \n `
      return links
    },
  },
  async created() {
    this.loadPage()
  },
  methods: {
    async loadPage() {
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
          this.saveToHistory('closed')
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
        this.notyf.error('Ошибка запроса')
        console.log('%c' + error['message'], 'font-size: 14px; font-family: Balsamiq Sans;')
        this.$router.push('/')
      }
    },
    async sendFilm() {
      try {
        let response = await fetch(this.DiscordWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "content": this.message.isMessage ? this.message.text : null,
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
            this.$router.push('/')
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
    }
  }
}
</script>

<style scoped>
.film-card {
  box-shadow: 0px 0px 42px 0px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
}

.film-card img {
  border-radius: 22px 0 0 22px;
  height: inherit;
}

.card-block {
  padding: 26px;
}

small {
  color: #575757;
  font-family: 'Balsamiq Sans';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.badge {
  font-family: 'Balsamiq Sans';
  height: 37px;
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  text-align: center;
}

.rate {
  font-style: normal;
  line-height: normal;
  text-align: center;
}

.card-block__points {
  font-family: 'Balsamiq Sans';
  font-size: 20px;
  line-height: normal;
}

td {
  padding-right: 15px;
}

.description {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn {
  font-family: 'Balsamiq Sans';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 12px;
}

.modal-header {
  border: 0;
  padding: 10px;
}

.modal-body {
  padding: 0 22px;
  font-family: 'Balsamiq sans';
}

.modal-footer {
  border: 0;
  padding: 0 0 20px 18px;
  display: block;
}
</style>