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
            nightTheme: null,
            historyItems: [],
            agree: false
        },
        isDemo: false
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

        if(localStorage.userHistory) {
            this.localdata.historyItems = JSON.parse(localStorage.userHistory)
        }

        if(localStorage.agree) {
            this.localdata.agree = localStorage.agree
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
        },
        'localdata.agree': function(newItem) {
            localStorage.agree = newItem
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
            return this.films.slogan != null ? this.films.slogan : 'без слогана'
        },
        watchLink: function() {
            if (this.isWatchNow && this.localdata.Together){
                if(this.localdata.Together.indexOf('https://') != -1) 
                    return `[:eyes: ┋ Подключиться к совместному каналу для просмотра](${this.localdata.Together}) \n [:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
            }
            return `[:page_with_curl: ┋ Перейти на сайт для просмотра](${this.films.webUrl})`
        },
        filmLength: function() {
            let length = this.films.filmLength
            if(length > 60) {
                let hour = Math.floor(length / 60)
                let minuts = length % 60

                return hour + ' ч ' + minuts + ' мин'
            } else {
                return length + ' мин'
            }
        },
        ratingAgeLimits: function() {
            return this.films.ratingAgeLimits == null ? 'Приятного просмотра  |  ' : "Возрастное ограничение: " + parseInt(this.films.ratingAgeLimits.replace(/\D+/g, '')) + '+  |  '
        },
        description: function() {
            return this.films.description.length > 1000 ? this.films.description.substr(0, 1000) + "..." : this.films.description
        }
    },
    methods: {
        async getFilm() {
            if (this.url === '') {
                notyf.error('Поле не должно оставаться пустым!')
            } else if (typeof (this.url) != 'number') {
                this.url = parseInt(this.url.replace(/\D+/g, ''))
            }

            if (typeof(this.url) == 'number') {
                await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + this.url, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'X-API-KEY': this.localdata.Kinopoisk.item
                        }
                    })
                    .then(res => {
                        switch(res.status) {
                            case 200:
                                notyf.success('Запрос выполнен успешно')
                                break;
                            case 401:
                                notyf.error('Пустой или неправильный токен')
                                break;
                            case 404:
                                notyf.error('Фильм не найден')
                                break;
                            case 429:
                                notyf.error('Слишком много запросов. Общий лимит - 20 запросов в секунду')
                            default:
                                notyf.error('Не самый удачный запрос')
                                break;
                        }
                        return res.json()
                    })
                    .then(data => this.films = data)

                if(this.films.kinopoiskId) {
                    this.filmLink = 'https://www.sspoisk.ru/series/' + this.films.kinopoiskId
                } else {
                    this.films = null
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
                            "text": this.ratingAgeLimits + "Длительность: " + this.filmLength,
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
                                "name": ":flag_ru: Рейтинг Кинопоиск:",
                                "value": String(this.films.ratingKinopoisk),
                                "inline": true
                            },
                            {
                                "name": ":flag_us: Рейтинг IMDb:",
                                "value": String(this.films.ratingImdb),
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

            if(responce['status'] !== 204) {
                this.saveHistory('closed')
            }

            if(this.localdata.Together) {
                localStorage.setItem('TogetherURL', this.localdata.Together)
            }
        },
        saveHistory(status) {
            let now = new Date()
            let timestamp = now.toLocaleTimeString().concat(" " + now.toLocaleDateString())

            let item = {
                'name': this.films.nameRu + ' (' + this.films.year + ')',
                'poster': this.films.posterUrl,
                'description': this.films.description,
                'webUrl': this.films.webUrl,
                'status': status,
                'time': timestamp
            }

            this.localdata.historyItems.unshift(item)

            localStorage.userHistory = JSON.stringify(this.localdata.historyItems)

            // Очистка полей
            this.message = this.films = null
        },
        removeHistoryItem(item) {
            this.localdata.historyItems.splice(item, 1)
            localStorage.userHistory = JSON.stringify(this.localdata.historyItems)
        },
        cleanHistory() {
            if(confirm('Вся история фильмов будет очищенна, продолжить?')) {
                localStorage.removeItem('userHistory')
                location.reload()
            }
        },
        researchFilm(url) {
            this.url = url
            this.getFilm()
        },
        devTool() {
            if(confirm('Вся история фильмов будет очищенна и замененна на стандартный набор, продолжить?')) {
                localStorage.userHistory = JSON.stringify([{
                    "name": "Человек-паук: Нет пути домой",
                    "poster": "https://kinopoiskapiunofficial.tech/images/posters/kp/1309570.jpg",
                    "description": "Жизнь и репутация Питера Паркера оказываются под угрозой, поскольку Мистерио раскрыл всему миру тайну личности Человека-паука. Пытаясь исправить ситуацию, Питер обращается за помощью к Стивену Стрэнджу, но вскоре всё становится намного опаснее.",
                    "webUrl": "https://www.kinopoisk.ru/film/1309570/",
                    "status": "closed",
                    "time": "15:45:06 16.12.2021"
                }, {
                    "name": "Когда плачут цикады: Разгадки",
                    "poster": "https://kinopoiskapiunofficial.tech/images/posters/kp/408741.jpg",
                    "description": "Звуки цикад можно услышать поздним вечером, в деревне Хинамидзава, с населением в 2000 человек. В этой деревушке, Рика Фурудэ и ее друзья живут в относительной гармонии. Однако, под этой маской покоя скрывается тьма, которую Рика осознает слишком хорошо. Этим летом она стала свидетелем ужасных событий. Изо дня в день, Рика должна пытаться найти того, кто стоит за этими бессмысленными смертями, прежде чем злодей ударит снова. Однако, все попытки разгадать тайну, оканчиваются неудачей. Необычные убийства происходят со времен строительства плотины. Совпадение ли это или часть зловещего плана?",
                    "webUrl": "https://www.kinopoisk.ru/series/408741/",
                    "status": "closed",
                    "time": "15:26:20 16.12.2021"
                }, {
                    "name": "Когда плачут цикады",
                    "poster": "https://kinopoiskapiunofficial.tech/images/posters/kp/408659.jpg",
                    "description": "В том, что в тихом омуте черти водятся, юному Кэйити пришлось убедиться на своём собственном опыте. Переехав с родителями из города в живописную деревушку Хинамидзаву и подружившись в маленькой местной школе с очаровательными одноклассницами, он даже не подозревал, насколько обманчиво его представление об этом безмятежном крае и его обитателях. Но, как позднее выяснил Кэйити, за фасадом деревенской идиллии скрывается тёмная история зверских убийств и бесследных исчезновений, а под покровом благостной тиши действуют какие-то ужасные силы.",
                    "webUrl": "https://www.kinopoisk.ru/series/408659/",
                    "status": "success",
                    "time": "23:00:05 10.11.2021"
                }, {
                    "name": "Оцепеневшие от страха",
                    "poster": "https://kinopoiskapiunofficial.tech/images/posters/kp/1068448.jpg",
                    "description": "Леденящие душу жуткие события сотрясают пригородное местечко, где соседствуют три уютных домика. Неведомая и невидимая сила зверски убивает женщину на глазах мужа. Ночью у кровати его соседа появляется ужасный монстр. А мальчик из дома напротив, погибший под колесами автомобиля, возвращается с кладбища и садится за кухонный стол. Искать причину необъяснимых кошмаров берутся три специалиста по паранормальным явлениям и детектив из отдела по расследованию убийств.",
                    "webUrl": "https://www.kinopoisk.ru/film/1068448/",
                    "status": "success",
                    "time": "23:45:36 25.09.2021"
                }, {
                    "name": "Окулус",
                    "poster": "https://kinopoiskapiunofficial.tech/images/posters/kp/680499.jpg",
                    "description": "20-летний Тим выходит из лечебного учреждения, где провёл несколько лет, пытаясь вылечиться от детской травмы — отец убил мать, а после покончил с собой. Парня встречает старшая сестра Кайли, которая уверена, что на смерть родителей повлияло старое зеркало. Она уговаривает брата отправиться в отчий дом и там уничтожить зловещий предмет.",
                    "webUrl": "https://www.kinopoisk.ru/film/680499/",
                    "status": "success",
                    "time": "23:13:57 22.09.2021"
                }])
                location.reload()
            }
        },
        resetToDefault() {
            if(confirm('Настройки будут сброшены, продолжить?')) {
                localStorage.clear();
                localStorage.userHistory = JSON.stringify(this.localdata.historyItems)
                location.reload()
            }
        },
        closeFrame() {
            if(document.getElementById("watchFrame")) {
                let frame = document.getElementById("watchFrame");
                frame.src = frame.src;
            }
        }
    }
})

console.log("%cДобро пожаловать в логи", "font-size: 64px; color: #eee; font-family: Impact; text-shadow: 2px 4px 4px #000;")
console.log("%chttps://github.com/SergioStrangeS", "font-size: 18px; color: #0d6efd; font-family: Verdana;")