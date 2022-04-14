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
          <h2 class="title">
            Здравствуйте, {{ getVariables && getVariables.name }}!
          </h2>
          <a-row :gutter="[8, 16]">
            <a-col span="12">
              <div class="home-card">
                <h4>Занятий пройдено</h4>
                <span class="home-card-blue">5 <span>/10</span></span>
              </div>
            </a-col>
            <a-col span="12">
              <div class="home-card">
                <h4>Следующее занятие</h4>
                <span class="home-card-red">Сейчас</span>
              </div>
            </a-col>
            <a-col span="12">
              <a-button class="light-red">Перенести</a-button>
            </a-col>
            <a-col span="12">
              <a-button class="dark-red">Начать занятие</a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="employment">
      <div class="container">
        <div class="employment-wrapper">
          <h2 class="title">Упражнения в занятии</h2>
          <a-row
            :gutter="[0, 8]"
            v-if="getVariables && getVariables.currentProgram"
          >
            <a-col
              span="24"
              v-for="(item, key) in getVariables.currentProgram"
              :key="key"
            >
              <div class="employment-card">
                <h4>{{ key }}</h4>
                <span
                  >Подходы: {{ item.approach }} х 60 сек / Отдых:
                  {{ item.rest_sec }} сек</span
                >
              </div>
            </a-col>
            <a-col span="24">
              <div class="employment-card">
                <h4>Ракушка</h4>
                <span>Подходы: 2 х 12 / Отдых: 90 сек</span>
              </div>
            </a-col>
            <a-col span="24">
              <div class="employment-card">
                <h4>Боковая планка</h4>
                <span>Подходы: 3 х 60 сек / Отдых: 60 сек</span>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "IndexPage",
  data() {
    return {
      //
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      await this.$store.dispatch("home/getDetail");
    },
  },
  computed: {
    ...mapGetters("home", ["getClient", "getVariables"]),
  },
};
</script>
