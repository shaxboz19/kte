<template>
  <div class="pages-wrapper" v-if="getExercise">
    <h2 class="title">{{ getExercise.exercise }}</h2>
    <div class="exercise">
      <ul>
        <li :class="{ active: !isFinish }">
          <span class="exercise-title">Подход 1</span>
          <span class="exercise-count">{{ actionSeconds }}</span>
          <span class="exercise-time">секунд</span>
        </li>

        <li :class="{ active: isFinish }">
          <span class="exercise-title">Отдых</span>
          <span class="exercise-count">{{ restSeconds }}</span>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isFinish: false,
      actionSeconds: 10,
      restSeconds: 10,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.actionSeconds > 0) {
        this.actionSeconds--;
      } else {
        this.isFinish = true;
        clearInterval(this.timer);
      }
    }, 1000);
  },
  methods: {},
  computed: {
    ...mapGetters("home", ["getVariables"]),
    getExercise() {
      return (
        this.getVariables &&
        this.getVariables.exercises.find((e) => {
          return e.exercise_id == this.$route.query.id;
        })
      );
    },
    getProgram() {
      return (
        this.getVariables &&
        this.getExercise &&
        this.getVariables.currentProgram[this.getExercise.exercise]
      );
    },
  },
  watch: {
    isFinish(val) {
      if (val) {
        this.timer = setInterval(() => {
          if (this.restSeconds > 0) {
            this.restSeconds--;
          } else {
            this.isFinish = false;
            clearInterval(this.timer);
            this.actionSeconds = 60;
          }
        }, 1000);
      } else {
        this.timer = setInterval(() => {
          if (this.actionSeconds > 0) {
            this.actionSeconds--;
          } else {
            this.isFinish = true;
            clearInterval(this.timer);
            this.restSeconds = 10;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style></style>
