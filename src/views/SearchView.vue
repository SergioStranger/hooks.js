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

            <div class="mb-3" v-if="isWatchNow">
              <label class="form-label">Ссылка для совместного просмотра</label>
              <input type="text" class="form-control" v-model="togetherUrl">
            </div>
          </div>

          <div class="d-grid d-lg-flex">
            <a class="btn btn-outline-primary px-3 me-lg-3 my-md-1 my-2" @click.prevent="sendFilm()">Отправить в
              Discord</a>
            <a class="btn btn-outline-success px-3 my-md-1 my-2">Смотреть онлайн</a>
            <a class="btn btn-danger ms-lg-auto my-md-1 my-2" @click="saveToHistory('closed')">Отмена</a>
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
</style>