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
              <a-button class="light-red" @click="onChangeDate"
                >Перенести</a-button
              >
            </a-col>
            <a-col span="12">
              <a-button class="dark-red" @click="start"
                >Начать занятие</a-button
              >
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
              <nuxt-link
                :to="`/exercises/${item.exercise_id}`"
                tag="div"
                class="col-link"
              >
                <div class="employment-card">
                  <h4>{{ key }}</h4>
                  <span
                    >Подходы: {{ item.approach }} х 60 сек / Отдых:
                    {{ item.rest_sec }} сек</span
                  >
                </div>
              </nuxt-link>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <datePicker v-if="changeDate" @close="closeChangeDate" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "IndexPage",
  data() {
    return {
      changeDate: false,
    };
  },
  mounted() {},
  methods: {
    async onChangeDate() {
      try {
        this.changeDate = true;
      } catch ({ message }) {
        throw new Error(message);
      }
    },
    async start() {
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "start",
        });
        const { title } = data.currentNode;
        console.log(title);
        const key = data.variables && data.variables.exercise;
        const id =
          data.variables &&
          data.variables.currentProgram &&
          data.variables.currentProgram[key] &&
          data.variables.currentProgram[key].exercise_id;
        this.smartRouter(title, id);
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    closeChangeDate() {
      this.changeDate = false;
    },
  },
  computed: {
    ...mapGetters("home", ["getClient", "getVariables"]),
    ...mapState(["client"]),
  },
};
</script>
