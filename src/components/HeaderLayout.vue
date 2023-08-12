<template>
    <nav class="navbar navbar-expand-lg border-bottom sticky-md-top"
        :class="nightTheme ? 'navbar-dark bg-dark border-secondary' : 'navbar-light bg-light'">
        <div class="container">
            <router-link to="/" class="navbar-brand">HOOKS.js</router-link>
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
                        <router-link to="/" class="nav-link">Главная</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/config" class="nav-link">Настройки</router-link>
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
                    <div class="input-group">
                        <input class="form-control" type="search" placeholder="Кинопоиск ID" aria-label="Search" id="search-input" v-model="KpID">
                        <button class="btn btn-success" type="submit"><i class="bi bi-search"></i> Поиск</button>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            nightTheme: localStorage.nightTheme ? JSON.parse(localStorage.nightTheme) : false,
            KpID: ''
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