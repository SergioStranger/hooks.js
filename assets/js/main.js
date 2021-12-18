const notyf = new Notyf({
    duration: 5000,
    position: {
        x: 'center',
        y: 'top',
    },
    dismissible: true
})
const app = new Vue({
    el: "#app",
    data: {
        page: 'index',
        url: '',
        films: null,
        filmLink: null,
        errors: null,
        rating: null,
        message: null,
        isWatchNow: false,
        localdata: {
            Kinopoisk: {
                item: null,
                show: false
            },
            Discord: {
                item: null,
                show: false
            },
            Together: null,
            nightTheme: null
        }
    },
    mounted() {
        if(localStorage.KinopoiskToken) {
            this.localdata.Kinopoisk.item = localStorage.KinopoiskToken
        }

        if(localStorage.DiscordToken) {
            this.localdata.Discord.item = localStorage.DiscordToken
        }

        if(localStorage.TogetherUrl) {
            this.localdata.Together = localStorage.TogetherUrl
        }

        if(localStorage.nightTheme) {
            this.localdata.nightTheme = JSON.parse(localStorage.nightTheme)
        }
    },
    watch: {
        'localdata.Kinopoisk.item': function(newToken) {
            localStorage.KinopoiskToken = newToken
        },
        'localdata.Discord.item': function(newToken) {
            localStorage.DiscordToken = newToken
        },
        'localdata.Together': function(newToken) {
            localStorage.TogetherUrl = newToken
        },
        'localdata.nightTheme': function(newTheme) {
            localStorage.nightTheme = newTheme
        }
    },
    computed: {
        genres: function() {
            let str = ''
            for (genre in app.films.genres) {
                genre > 0 ? str += ", " : false
                str += app.films.genres[genre]['genre']
            }
            return str.trimEnd()
        },
        countries: function() {
            let str = ''
            for (country in app.films.countries) {
                country > 0 ? str += ", " : false
                str += app.films.countries[country]['country']
            }
            return str.trimEnd()
        },
        slogan: function() {
            return this.films.slogan != null ? this.films.slogan : '-'
        },
        watchLink: function() {
            if (this.isWatchNow && this.localdata.Together){
                if(this.localdata.Together.indexOf('https://') != -1) 
                    return `[:eyes: ┋ Подключиться к совместному каналу для просмотра](${this.localdata.Together}) \n [:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
            }
            return `[:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
        },
        historyItems: function() {
            return localStorage.getItem('userHistory') ? JSON.parse(localStorage.getItem('userHistory')) : []
        },
    },
    methods: {
        openPage(pageName) {
            this.page = pageName
        },
        async getFilm() {
            if (this.url === '') {
                notyf.error('Поле не должно оставаться пустым!')
            } else if (typeof (this.url) != 'number') {
                this.url = parseInt(this.url.replace(/\D+/g, ''))
            }

            if (typeof(this.url) == 'number') {
                await fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + this.url + "?append_to_response=RATING", {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'X-API-KEY': this.localdata.Kinopoisk.item
                        }
                    })
                    .then(res => res.json())
                    .then(data => films = data)
                if (films['data'] && films['rating']) {
                    this.films = films['data']
                    this.rating = films['rating']
                    this.filmLink = 'https://www.sspoisk.ru/series/' + this.url
                } else if (films['status'] == 401) {
                    notyf.error('Ошибка токена. Проверьте правильность ввода токена и повторите попытку')
                } else {
                    notyf.error('Страница не найдена')
                }
            }
        },
        async sendFilm() {
            await fetch(this.localdata.Discord.item, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": "Kuнoмaнuя NEWS",
                    "content": this.message,
                    "embeds": [{
                        "title": this.films.nameRu + " (" + this.films.year + ")",
                        "color": 3368703,
                        "description": "",
                        "timestamp": null,
                        "url": this.films.webUrl,
                        "author": {
                            "name": "Kuнoмaнuя NEWS",
                            "url": "https://sergios.fun/"
                        },
                        "image": {
                            "url": this.films.posterUrl
                        },
                        "thumbnail": {
                            "url": this.films.posterUrl
                        },
                        "footer": {
                            "text": "Возрастное ограничение: " + this.films.ratingAgeLimits + "+  |  Длительность: " + this.films.filmLength + " минут",
                            "icon_url": "https://lh6.ggpht.com/S6_A7lzx3EfpKSBKm1Kg0N5IlHGgeja5Lb_CpPzWTB87cIsmKd70cl5GlL961ST4L9A"
                        },
                        "fields": [{
                                "name": "Слоган:",
                                "value": this.slogan,
                                "inline": true
                            },
                            {
                                "name": ":film_frames: Жанр:",
                                "value": this.genres,
                                "inline": true
                            },
                            {
                                "name": ":book: Описание сюжета:",
                                "value": this.films.description.substr(0, 1000) + "...",
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
                                "name": ":flag_ru: Рейтинг Кинопоиск:",
                                "value": String(this.rating.rating),
                                "inline": true
                            },
                            {
                                "name": ":flag_us: Рейтинг IMDb:",
                                "value": String(this.rating.ratingImdb),
                                "inline": true
                            },
                        ]
                    }]
                })
            })
            .then(data => responce = data)

            switch(responce['status']) {
                case 204:
                    notyf.success('Данные успешно отправленны!')
                    // Вызываем функцию очистки полей
                    this.saveHistory('success')
                    break
                case 401:
                    notyf.error('Неверный токен Discord!')
                    break
                case 400:
                    notyf.error('Данные невозможно отправить! Обратитесь к разработчику сайта')
                    break
                case 405:
                    notyf.error('Не верно указан токен Discord!')
                    break
                default:
                    notyf.error('Призошла неизвестная ошибка! Обратитесь к разработчику сайта')
                    break
            }

            if(this.localdata.Together) {
                localStorage.setItem('TogetherURL', this.localdata.Together)
            }
        },
        saveHistory(status) {
            let now = new Date()
            let timestamp = now.toLocaleTimeString().concat(" " + now.toLocaleDateString())

            let temp = {
                'name': this.films.nameRu,
                'poster': this.films.posterUrl,
                'description': this.films.description,
                'webUrl': this.films.webUrl,
                'status': status,
                'time': timestamp
            }

            this.historyItems.unshift(temp)
            localStorage.setItem('userHistory', JSON.stringify(this.historyItems))

            this.openPage('index')

            // Очистка полей
            this.message = null
            this.films = null
        },
        removeHistoryItem(item) {
            this.historyItems.splice(item, 1)
            localStorage.setItem('userHistory', JSON.stringify(this.historyItems))
            location.reload()
        },
        cleanHistory() {
            localStorage.removeItem('userHistory')
            location.reload()
        },
        researchFilm(url) {
            this.url = url
            this.getFilm()
        }
    }
})

console.log("%cДобро пожаловать в логи", "font-size: 64px; color: #eee; font-family: Impact; text-shadow: 2px 4px 4px #000;")
console.log("%chttps://github.com/SergioStrangeS", "font-size: 18px; color: #0d6efd; font-family: Verdana;")
