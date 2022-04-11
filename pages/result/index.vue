<template>
  <div class="pages-wrapper">
    <div class="result">
      <img src="/images/hand.svg" alt="hand" />
      <h2 class="title">Отлично!</h2>
      <p>Вы набрали 3 балла из 3. Следующее занятие: <b> Завтра в 9:00</b></p>
    </div>

    <div class="pages-action">
      <a-row :gutter="[8, 8]">
        <a-col span="24">
          <a-button class="dark-red"> Ok </a-button>
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