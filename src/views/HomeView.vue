<template>
  <div>
    <AboutLayout />
    <CardsLayout :history="history"/>
    <InstructionLayout />
  </div>
</template>

<script>
import CardsLayout from '@/components/CardsLayout.vue';
import AboutLayout from '@/components/AboutLayout.vue';
import InstructionLayout from '@/components/InstructionLayout.vue';

export default {
  name: 'HomeView',
  components: {
    AboutLayout,
    InstructionLayout,
    CardsLayout
  },
  computed: {
    history: () => {
      if (localStorage.userHistory && localStorage.userHistory !== '') {
        return JSON.parse(localStorage.userHistory)
      } else {
        return [{
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
}
</script>

<style>
h1,
h2 {
  font-family: 'Balsamiq Sans';
  font-style: normal;
  line-height: normal;
}

h1 {
  font-weight: 700;
  font-size: 48px;
}

h2 {
  font-weight: 400;
  font-size: 32px;
}

p {
  font-family: Segoe UI;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

a {
  text-decoration: none;
}
</style>
