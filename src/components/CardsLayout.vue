<template>
  <div class="container">
    <div class="row my-4 g-0 position-relative rounded bg-light bg-opacity-10 film-card" v-for="item in history"
      :key="item.id">
      <div class="col-xl-2 col-md-4 mb-md-0 p-md-4">
        <img class="w-100 rounded" :src="item.poster">
      </div>
      <div class="col-xl-10 col-md-8 p-4 ps-md-0">
        <div class="d-lg-flex justify-content-between">
          <h4 class="mt-0">{{ item.name }}</h4>

          <small>
            <!-- <span class="badge bg-success"><i class="bi bi-check"></i> Отправлено</span> -->
            <span class="badge bg-danger"><i class="bi bi-x"></i> Не отправлено</span>
            <i class="bi bi-alarm ps-3"></i> {{ item.time }}
          </small>
        </div>
        <p>{{ item.description }}</p>
        <div class="d-lg-flex justify-content-between">
          <div class="col input-group">
            <a class="btn btn-primary mb-2" :href="item.webUrl" target="_blank">На страницу фильма</a>
            <button class="btn btn-success mb-2" disabled>Повторить поиск</button>
          </div>
          <a class="btn btn-danger mb-2"><i class="bi bi-trash"></i> Удалить</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['history']
}
</script>

<style scoped>
.film-card {
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.film-card:hover {
  box-shadow: #0000005c 1px 1px 1em;
}
</style>