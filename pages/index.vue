<template>
  <div class="inner-wrapper">
    <div class="container">
      <div class="logo">
        <img src="images/logo.svg" alt="logo" />
      </div>
    </div>
    <div class="home">
      <div class="container">
        <div class="home-wrapper">
          <h2 class="title">Здравствуйте, Константин Константинович!</h2>
          <a-row :gutter="[8, 16]">
            <a-col span="12">
              <div class="home-card">
                <h4>Занятий  пройдено</h4>
                <span class="home-card-blue">5 <small>/10</small></span>
              </div>
            </a-col>
            <a-col span="12"></a-col>
            <a-col span="12"></a-col>
            <a-col span="12"></a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
