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
        url: null,
        films: null,
        errors: null,
        rating: null,
        message: null,
        isWatchNow: false,
        tokens: {
            Kinopoisk: {
                item: localStorage.getItem('KinopoiskApi'),
                show: false
            },
            Discord: {
                item: localStorage.getItem('DiscordHook'),
                show: false
            },
            Together: localStorage.getItem('TogetherURL')
        },
        nightTheme: true,
    },
    computed: {
        genres: function() {
            let str = '';
            for (let genre in app.films.genres) {
                if (genre > 0) {
                    str += ", ";
                }
                str += app.films.genres[genre]['genre'];
            }
            return str.trimEnd()
        },
        countries: function() {
            let str = '';
            for (let country in app.films.countries) {
                if (country > 0) {
                    str += ", ";
                }
                str += app.films.countries[country]['country'];
            }
            return str.trimEnd()
        },
        slogan: function() {
            if (this.films.slogan == null) {
                return '-'
            } else {
                return this.films.slogan
            }
        },
        watchLink: function() {
            if (this.isWatchNow && this.tokens.Together) {
                if(this.tokens.Together.indexOf('https://') != -1) {
                    return `[:eyes: ┋ Подключиться к совместному каналу для просмотра](${this.tokens.Together}) \n [:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
                } else {
                    return `[:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
                }
            } else {
                return `[:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
            }
        },
        historyItems: function() {
            if (localStorage.getItem('userHistory')) {
                let result = localStorage.getItem('userHistory')
                return JSON.parse(result)
            } else {
                return [];
            }
        },
    },
    methods: {
        openPage(pageName) {
            this.page = pageName
        },
        saveConfig() {
            localStorage.setItem('KinopoiskApi', this.tokens.Kinopoisk.item);
            localStorage.setItem('DiscordHook', this.tokens.Discord.item);
            this.page = 'index';
        },
        async getFilm() {
            if (this.url == null || this.url == '') {
                notyf.error('Поле не должно оставаться пустым!')
            } else if (typeof (this.url) != 'number') {
                this.url = parseInt(this.url.replace(/\D+/g, ''))
            }

            if (typeof(this.url) == 'number') {
                await fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + this.url + "?append_to_response=RATING", {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'X-API-KEY': this.tokens.Kinopoisk.item
                        }
                    })
                    .then(res => res.json())
                    .then(data => films = data);

                if (films['data'] && films['rating']) {
                    this.films = films['data']
                    this.rating = films['rating']
                } else if (films['status'] == 401) {
                    notyf.error('Ошибка токена. Проверьте правильность ввода токена и повторите попытку')
                } else {
                    notyf.error('Страница не найдена')
                }
            }
        },
        async sendFilm() {
            await fetch(this.tokens.Discord.item, {
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
            .then(data => responce = data);

            switch(responce['status']) {
                case 204:
                    notyf.success('Данные успешно отправленны!')
                    // Вызываем функцию очистки полей
                    this.saveHistory('success');
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

            if(this.tokens.Together) {
                localStorage.setItem('TogetherURL', this.tokens.Together)
            }
        },
        saveHistory(status) {
            let now = new Date();
            let timestamp = now.toLocaleTimeString() + " " + now.toLocaleDateString();

            let temp = {
                'name': this.films.nameRu,
                'poster': this.films.posterUrl,
                'description': this.films.description,
                'webUrl': this.films.webUrl,
                'status': status,
                'time': timestamp
            };

            this.historyItems.unshift(temp);
            localStorage.setItem('userHistory', JSON.stringify(this.historyItems));

            // Очистка полей
            this.message = null;
            this.films = null;
        },
        removeHistoryItem(item) {
            this.historyItems.splice(item, 1);
            localStorage.setItem('userHistory', JSON.stringify(this.historyItems));
            location.reload();
        },
        cleanHistory() {
            localStorage.removeItem('userHistory');
            location.reload();
        },
        researchFilm(url) {
            this.url = url;
            this.getFilm();
        }
    }
});

console.log("%cДобро пожаловать в логи", "font-size: 64px; color: #212529; font-family: Impact;")
console.log("%chttps://github.com/SergioStrangeS", "font-size: 18px; color: #0d6efd; font-family: Verdana;")
