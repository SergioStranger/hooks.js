<template>
    <nav class="navbar navbar-expand-lg border-bottom"
        :class="nightTheme ? 'navbar-dark bg-dark border-secondary' : 'navbar-light bg-light'">
        <div class="container">
            <a class="navbar-brand" href="#">HOOKS.js</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <div class="form-check form-switch me-auto mb-2 mb-lg-0">
                    <input class="form-check-input" type="checkbox" v-model="nightTheme">
                </div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Главная</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Конфигуратор</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Предыдущие версии
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" target="_blank"
                                    href="https://github.com/SergioStrangeS/hooks.ds">hooks.ds</a></li>
                            <li><a class="dropdown-item" target="_blank"
                                    href="https://github.com/SergioStrangeS/DiscordWebhooks">DiscordWebhooks</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Кинопоиск ID" aria-label="Search"
                        id="search-input">
                    <button class="btn btn-success" type="submit">Поиск</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            nightTheme: localStorage.nightTheme ? JSON.parse(localStorage.nightTheme) : false
        }
    },
    watch: {
        nightTheme(newTheme) {
            localStorage.nightTheme = JSON.stringify(newTheme)
            this.$emit('swith-theme', newTheme)
         }
    }
}
</script>