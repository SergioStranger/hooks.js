const app = new Vue({
    el: "#app",
    data: {
        message: null,
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
                                "url": ""
                            },
                            "thumbnail": {
                                "url": this.films.posterUrl
                            },
                            "footer": {
                                "text": "hooks.js",
                                "icon_url": "https://media.discordapp.net/attachments/699872254187536464/793422443724800030/avka.jpg?width=683&height=683"
                            },
                            "fields": [{
                                    "name": ":book: Описание сюжета:",
                                    "value": this.films.description,
                                    "inline": false
                                },
                                {
                                    "name": ":date: Год:",
                                    "value": this.films.year,
                                    "inline": true
                                },
                                {
                                    "name": "Длительность:",
                                    "value": this.films.filmLength,
                                    "inline": true
                                },
                                {
                                    "name": ":film_frames: Жанр:",
                                    "value": 'this.films.data.genres',
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