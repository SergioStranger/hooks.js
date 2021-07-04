const app = new Vue({
    el: "#app",
    data: {
        page: 'index',
        url: null,
        films: null,
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
            if (this.url == null || this.url <= 0) {
                alert('В голове у тебя пусто!')
            } else if (typeof (this.url) != 'number') {
                this.url = parseInt(this.url.replace(/\D+/g, ""));
            }

            await fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + this.url, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': this.tokens.Kinopoisk.item
                    }
                })
                .then(res => res.json())
                .then(data => this.films = data['data']);

            this.saveHistory()
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
                            "title": this.films.nameRu,
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
                                "url": ""
                            },
                            "footer": {
                                "text": "hooks.js",
                                "icon_url": "https://media.discordapp.net/attachments/699872254187536464/793422443724800030/avka.jpg?width=683&height=683"
                            },
                            "fields": [{
                                    "name": ":book: Описание сюжета:",
                                    "value": this.films.description.substr(1, 1000) + "...",
                                    "inline": false
                                },
                                {
                                    "name": ":date: Год:",
                                    "value": this.films.year,
                                    "inline": true
                                },
                                {
                                    "name": "Длительность:",
                                    "value": this.films.filmLength + " ч",
                                    "inline": true
                                },
                                {
                                    "name": ":film_frames: Жанр:",
                                    "value": this.genres,
                                    "inline": true
                                },
                                {
                                    "name": ":link: Ссылка на просмотр",
                                    "value": this.films.webUrl,
                                    "inline": false
                                }
                            ]
                        }]
                    })
                })
                // .then(res => res.json())
                // .then(data => console.log(data));

            app.closeFilm();
        },
        closeFilm() {
            // Очистка полей
            this.message = null;
            this.films = null;
        },
        saveHistory() {
            let temp = {
                'name': this.films.nameRu, 
                'poster': this.films.posterUrl, 
                'description': this.films.description, 
                'webUrl': this.films.webUrl
            };

            this.historyItems.unshift(temp);
            localStorage.setItem('userHistory', JSON.stringify(this.historyItems));
        },
        removeHistory() {
            localStorage.removeItem('userHistory');
            location.reload();
        },
    }
});

console.log("%cДобро пожаловать в логи", "font-size: 64px; color: #212529; font-family: Impact;")
console.log("%chttps://github.com/SergioStrangeS", "font-size: 18px; color: #0d6efd; font-family: Verdana;")
