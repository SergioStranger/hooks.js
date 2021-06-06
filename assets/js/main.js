const app = new Vue({
    el: "#app",
    data: {
        url: null,
        films: null,
        page: 'index',
        tokens: {
            Kinopoisk: localStorage.getItem('KinopoiskApi'),
            Discord: localStorage.getItem('DiscordHook')
        },
        forms: {
            showKinopoiskApi: false,
            showDiscord: false
        },
        nightTheme: true
    },
    methods: {
        getFilm() {
            if (this.url == null || this.url <= 0) {
                alert('В голове у тебя пусто!')
            } else if (typeof (this.url) != 'number') {
                this.url = parseInt(this.url.replace(/\D+/g, ""));
            }

            fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + this.url, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': this.tokens.Kinopoisk
                    }
                })
                .then(res => res.json())
                .then(data => this.films = data['data']);

        },
        sendFilm() {
            fetch(this.tokens.Discord, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": "Kuнoмaнuя NEWS",
                        "content": "Сообщение1",
                        "embeds": [{
                            "title": this.films.data.nameRu,
                            "color": 3368703,
                            "description": "",
                            "timestamp": null,
                            "url": "https://sergios.fun",
                            "author": {
                                "name": "Kuнoмaнuя NEWS",
                                "url": "https://sergios.fun"
                            },
                            "image": {
                                "url": "https://media.discordapp.net/attachments/699872254187536464/793422443724800030/avka.jpg?width=683&height=683"
                            },
                            "thumbnail": {
                                "url": this.films.data.posterUrl
                            },
                            "footer": {
                                "text": "hooks.js",
                                "icon_url": "https://media.discordapp.net/attachments/699872254187536464/793422443724800030/avka.jpg?width=683&height=683"
                            },
                            "fields": [{
                                    "name": ":book: Описание сюжета:",
                                    "value": "Краткое описание",
                                    "inline": false
                                },
                                {
                                    "name": ":date: Год:",
                                    "value": this.films.data.year,
                                    "inline": true
                                },
                                {
                                    "name": "Длительность:",
                                    "value": this.films.data.filmLength,
                                    "inline": true
                                },
                                {
                                    "name": ":film_frames: Жанр:",
                                    "value": 'this.films.data.genres',
                                    "inline": true
                                },
                                {
                                    "name": ":link: Ссылка на просмотр",
                                    "value": "Краткое описание",
                                    "inline": false
                                }
                            ]
                        }]
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data));
        },
        saveConfig() {
            localStorage.setItem('KinopoiskApi', this.tokens.Kinopoisk);
            localStorage.setItem('DiscordHook', this.tokens.Discord);
            this.page = 'index';
        }
    }
});

app.getFilm();