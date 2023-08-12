<template>
  <div class="py-3">
    <div class="container" id="instruction">
      <h2 class="pb-2 border-bottom">Что требуется для работы веб-приложения?</h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div class="col d-flex align-items-start">
          <div class="me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-film"
              viewBox="0 0 16 16">
              <path
                d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
            </svg>
          </div>
          <div>
            <h2>Шаг 1</h2>
            <p>
              Перейти в личный кабинет <a href="https://kinopoiskapiunofficial.tech">Kinopoisk Api
                Unofficial</a>, и скопировать токен в конфигуратор
              <code>Kinopoisk Api Unofficial</code>
            </p>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#config">
              Открыть конфигуратор
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div class="me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-discord"
              viewBox="0 0 16 16">
              <path
                d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
          </div>
          <div>
            <h2>Шаг 2</h2>
            <p>
              Зайти в чат-сервис <a href="https://discord.com/channels/@me">Discord</a>,
              создать webhook, и скопировать токен в конфигуратор
              <code>Discord Server Webhooks</code>
            </p>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#config">
              Открыть конфигуратор
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div class="me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-search"
              viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <div>
            <h2>Шаг 3</h2>
            <p>
              Скопировать <code>url</code> с сайта Кинопоиск у <em class="text-muted">фильма / сериала / мультфильма /
                аниме</em>, вставить в поиск,
              отформатировать текст и нажать на кнопку <code>Отправить</code>
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