<template>
  <div class="pages-wrapper">
    <h2 class="title">Миофасциальный релизягодичной области</h2>
    <div class="exercise">
      <ul>
        <li>
          <span class="exercise-title">Подход 1</span>
          <span class="exercise-count">0</span>
          <span class="exercise-time">секунд</span>
        </li>

        <li class="active">
          <span class="exercise-title">Отдых</span>
          <span class="exercise-count">10</span>
          <span class="exercise-time">секунд</span>
        </li>
      </ul>
    </div>
    <div class="pages-action">
      <a-row :gutter="[8, 8]">
        <a-col span="12">
          <a-button class="light-red"> Завершить </a-button>
        </a-col>
        <a-col span="12">
          <a-button class="light-red"> Не смог сделать </a-button>
        </a-col>

        <a-col span="24">
          <a-button class="dark-red"> Готово </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>