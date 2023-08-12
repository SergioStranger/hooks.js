<template>
  <div class="py-3">
    <div class="container" id="instruction">
      <h2 class="pb-2 border-bottom">Что требуется для работы веб-приложения?</h2>

      <div class="row g-4 py-3 row-cols-1 row-cols-lg-3">
        <div class="col d-flex align-items-start">
          <div>
            <h2><i class="bi bi-film"></i> Шаг 1</h2>
            <p>
              Перейти в личный кабинет <a href="https://kinopoiskapiunofficial.tech">Kinopoisk Api Unofficial</a> и скопировать токен в настройки
            </p>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#config">
              Перейти в настройки
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div>
            <h2><i class="bi bi-discord"></i> Шаг 2</h2>
            <p>
              Зайти в приложение <a href="https://discord.com/channels/@me">Discord</a>,
              создать <a href="https://support.discord.com/hc/ru/articles/228383668">вебхук</a> и скопировать его в настройки
            </p>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#config">
              Перейти в настройки
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div>
            <h2><i class="bi bi-search"></i> Шаг 3</h2>
            <p>
              Скопировать с сайта Кинопоиск <code>url</code> <strong>фильма / сериала / мультфильма /
                аниме</strong> и вставить в <code>Поиск</code>
            </p>
            <a href="#" class="btn btn-primary" onclick="document.getElementById('search-input').focus()">
              Найти фильм
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>