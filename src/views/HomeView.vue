<template>
  <div>
    <AboutLayout />
    <CardsLayout :history="history" @remove="removeItem" v-if="history.length != 0"/>
    <InstructionLayout />
  </div>
</template>

<script>
import CardsLayout from '@/components/CardsLayout.vue';
import AboutLayout from '@/components/AboutLayout.vue';
import InstructionLayout from '@/components/InstructionLayout.vue';

export default {
  inject: ['notyf'],
  name: 'HomeView',
  components: {
    AboutLayout,
    InstructionLayout,
    CardsLayout
  },
  data() {
    return {
      history: localStorage.userHistory ? JSON.parse(localStorage.userHistory) : null
    }
  },
  mounted() {
    if (!this.history || this.history.length == 0) {
      this.insertHistory()
    }
  },
  methods: {
    removeItem(id) {
        this.history.splice(id, 1)
        localStorage.userHistory = JSON.stringify(this.history)
    },
    insertHistory() {
      this.history = [{
        "name": "Когда плачут цикады: Разгадки",
        "poster": "https://kinopoiskapiunofficial.tech/images/posters/kp/408741.jpg",
        "description": "Звуки цикад можно услышать поздним вечером, в деревне Хинамидзава, с населением в 2000 человек. В этой деревушке, Рика Фурудэ и ее друзья живут в относительной гармонии. Однако, под этой маской покоя скрывается тьма, которую Рика осознает слишком хорошо. Этим летом она стала свидетелем ужасных событий. Изо дня в день, Рика должна пытаться найти того, кто стоит за этими бессмысленными смертями, прежде чем злодей ударит снова. Однако, все попытки разгадать тайну, оканчиваются неудачей. Необычные убийства происходят со времен строительства плотины. Совпадение ли это или часть зловещего плана?",
        "webUrl": "https://www.kinopoisk.ru/series/408741/",
        "status": "closed",
        "time": "29 августа 2023 г. в 10:43"
      }]
    }
  }
}
</script>
