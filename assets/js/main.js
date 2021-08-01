const app = new Vue({
    el: "#app",
    data: {
        page: 'index',
        url: null,
        films: null,
        rating: null,
        message: null,
        tokens: {
            Kinopoisk: {
                item: localStorage.getItem('KinopoiskApi'),
                show: false
            },
            Discord: {
                item: localStorage.getItem('DiscordHook'),
                show: false
            }
        },
        nightTheme: true,
    },
    computed: {
        genres: function() {
            let str = '';
            for (let genre in app.films.genres) {
                if(genre > 0) {
                    str+= ", ";
                }
                str += app.films.genres[genre]['genre'];
            }
            return str.trimEnd()
        },
        countries: function() {
            let str = '';
            for (let country in app.films.countries) {
                if(country > 0) {
                    str+= ", ";
                }
                str += app.films.countries[country]['country'];
            }
            return str.trimEnd()
        },
        slogan: function() {
            if(this.films.slogan == null) {
                return '-'
            } else {
                return this.films.slogan
            }
        },
        historyItems: function() {
            if(localStorage.getItem('userHistory')) {
                let result = localStorage.getItem('userHistory')
                return JSON.parse(result)
            } else {
                return [];
            }
        }
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
                alert('В голове у тебя пусто!')
            } else if (typeof (this.url) != 'number') {
                this.url = parseInt(this.url.replace(/\D+/g, ""));
            }

            if(typeof(this.url) == 'number') {
                await fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + this.url + "?append_to_response=RATING", {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': this.tokens.Kinopoisk.item
                    }
                })
                .then(res => res.json())
                .then(data => films = data);

                this.films = films['data'];
                this.rating = films['rating'];
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
                            "url": "https://sergios.fun",
                            "author": {
                                "name": "Kuнoмaнuя NEWS",
                                "url": "https://sergios.fun/hooks.js"
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
                            "fields": [
                                {
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
                                    "value": "[Подключиться к голосовому каналу для просмотра](https://discord.gg/pMzSMbnHtm)",
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
                // .then(res => res.json())
                // .then(data => console.log(data));
            
            // Вызываем функцию очистки полей
            this.closeFilm('success');
        },
        closeFilm(status) {
            // Сперва отправим статус в Историю
            this.saveHistory(status);
            
            // Очистка полей
            this.message = null;
            this.films = null;
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
