<template>
  <div class="gy-4 container p-5">
    <div class="row g-0 position-relative rounded bg-light bg-opacity-10 film-card">
      <div class="col-xl-2 col-md-4 mb-md-0 p-md-4">
        <img class="w-100 rounded" :src="item.image">
      </div>
      <div class="col-xl-10 col-md-8 p-4 ps-md-0">
        <div class="d-lg-flex justify-content-between">
          <h4 class="mt-0">{{ item.name }} ({{ item.year }})</h4>

          <small>
            <!-- <span class="badge bg-success"><i class="bi bi-check"></i> Отправлено</span> -->
            <span class="badge bg-danger"><i class="bi bi-x"></i> Не отправлено</span>
            <i class="bi bi-alarm ps-3"></i> {{ item.time }}
          </small>
        </div>
        <p>{{ item.description }}</p>
        <div class="d-lg-flex justify-content-between">
          <div class="col input-group">
            <a class="btn btn-primary mb-2" :href="item.kplink">На страницу фильма</a>
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
  data() {
    return {
      item: {
        name: 'Когда плачут цикады',
        year: '2006',
        description: 'В том, что в тихом омуте черти водятся, юному Кэйити пришлось убедиться на своём собственном опыте. Переехав с родителями из города в живописную деревушку Хинамидзаву и подружившись в маленькой местной школе с очаровательными одноклассницами, он даже не подозревал, насколько обманчиво его представление об этом безмятежном крае и его обитателях. Но, как позднее выяснил Кэйити, за фасадом деревенской идиллии скрывается тёмная история зверских убийств и бесследных исчезновений, а под покровом благостной тиши действуют какие-то ужасные силы.',
        kplink: 'https://www.kinopoisk.ru/series/408659/',
        image: 'https://kinopoiskapiunofficial.tech/images/posters/kp/408659.jpg',
        time: '22:45 - 1 августа 2023 г.'
      }
    }
  }
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