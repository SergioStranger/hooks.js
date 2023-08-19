<template>
  <div>
    <div class="container px-4 pt-5 my-3 text-center">
      <h1 class="display-4 fw-bold">Ошибка 404!</h1>
      <div class="overflow-hidden">
        <div class="container px-5">
          <img src="@/assets/gifs/rena.gif" class="img-fluid rounded" alt="error 404">
        </div>
      </div>
      <div class="col-lg-6 mx-auto mt-3">
        <figure class="text-justify">
          <blockquote class="blockquote">
            <p>
              Э-э-э, слушай, ты случайно не встречал Ояширо-Сама где-нибудь здесь? Я имею в виду, это все так странно, и,
              знаешь, я иногда думаю, что он может быть связан с этими событиями. Но, возможно, это всего лишь мои
              паранойи... Не обращай внимания.
            </p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Когда плачут цикады <cite title="Rena Ryuuguu">Рэна Рюгу</cite>
          </figcaption>
        </figure>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <router-link class="btn btn-success btn-lg px-4 me-sm-3" to="/"><i class="bi bi-house-fill"></i> На главную</router-link>
          <a class="btn btn-outline-secondary btn-lg px-4" @click="$router.go(-1)"><i class="bi bi-arrow-left"></i> Назад</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',

}
</script>