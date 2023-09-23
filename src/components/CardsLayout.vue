<template>
  <div class="container">
    <h1>История поиска</h1>
    <hr>
    <div class="row g-0 position-relative bg-light bg-opacity-10 film-card" v-for="item in history" :key="item.id">
      <div class="col-xl-2 col-lg-4">
        <img class="w-100" :src="item.poster">
      </div>
      <div class="col-xl-10 col-lg-8 card-block d-flex flex-column justify-content-between">
        <div>
          <div class="d-xl-flex justify-content-between">
            <h2>{{ item.name }}</h2>
            <small>
              <span class="badge bg-danger px-3 me-3" v-if="item.status === 'closed'"><i class="bi bi-x"></i> Не
                отправлено</span>
              <span class="badge bg-success px-3 me-3" v-if="item.status === 'success'"><i class="bi bi-check"></i>
                Отправлено</span>
              <i class="bi bi-clock"></i> {{ item.time }}
            </small>
          </div>
          <p class="description">{{ item.description }}</p>
        </div>
        <div class="d-grid d-lg-flex">
          <a class="btn btn-primary px-3 me-lg-3 my-md-1 my-2" :href="item.webUrl" target="_blank">На страницу фильма</a>
          <a class="btn btn-outline-success px-3 my-md-1 my-2">Повторить поиск</a>
          <a class="btn btn-danger ms-lg-auto my-md-1 my-2"><i class="bi bi-trash"></i> Удалить</a>
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
  border-radius: 20px;
  box-shadow: 0px 0px 42px 0px rgba(0, 0, 0, 0.25);
  margin: 57px 0 57px 0;
}

.film-card img {
  border-radius: 20px 0 0 20px;
}

hr {
  margin: 0;
}

.card-block {
  padding: 28px;
  position: relative;
}

small {
  font-family: 'Balsamiq Sans';
  font-size: 12px;
  font-weight: 400;
}

.description {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btns-group {
  position: absolute;
  bottom: 28px;
}

.btn {
  font-family: 'Balsamiq Sans';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 12px;
}

.badge {
  font-size: 12px;
}
</style>