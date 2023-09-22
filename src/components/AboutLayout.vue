<template>
  <div class="container overflow-hidden">
    <div class="px-4 text-center border-bottom">
      <h1 class="display-4 fw-bold">Hooks.js</h1>
      <div class="col-lg-9 mx-auto">
        <p class="lead mb-3">
          Простое веб-приложение, для поиска информации о <strong>фильме / сериале / мультфильме /
            аниме</strong> и отправки контента с автоматизированным оформлением в Discord
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <a href="#instruction" class="btn btn-primary btn-md px-5 me-sm-3">Инструкция</a>
          <a href="#demo" class="btn btn-outline-success btn-md px-5">Демо</a>
        </div>
      </div>
      <div class="overflow-hidden" style="max-height: 50vh;">
        <div class="container px-5">
          <img src="../assets/images/image.png" class="img-fluid border rounded-4 shadow-lg"
            alt="Single page - light" loading="lazy">
          <!-- <img src="../assets/images/image-dark.png" class="img-fluid border rounded-3 shadow-lg mb-4"
            alt="Single page - dark" loading="lazy" width="700" height="500"> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.fw-bold {
  font-family: 'Balsamiq Sans', cursive;
  font-size: 64px;
  text-transform: uppercase;
}

.lead {
  font-family: Segoe UI;
  line-height: normal;
  font-weight: 400;
}

.btn {
  font-family: Balsamiq Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 12px;
}

.container {
  margin-bottom: 95px;
}
</style>