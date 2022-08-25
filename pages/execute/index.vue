<template>
  <div class="pages-wrapper" v-if="getExercise && getProgram">
    <h2 class="title">{{ getExercise.exercise }}</h2>
    <div class="exercise">
      <ul>
        <li :class="{ active: !isFinish }">
          <span class="exercise-title"
            >Подход {{ approach }}/{{ getProgram.approach }} <br />
            <b v-if="getProgram.right">({{ getVariables.side }})</b></span
          >
          <span class="exercise-count">{{ actionSeconds }}</span>
          <span class="exercise-time">{{
            getProgram.option === "сек" ? "секунд" : "повторений"
          }}</span>
        </li>

        <li :class="{ active: isFinish }">
          <span class="exercise-title">Отдых</span>
          <span class="exercise-count">{{ restSeconds }}</span>
          <span class="exercise-time">секунд</span>
        </li>
      </ul>
      <p class="text" v-if="getProgram && getProgram.comment">{{getProgram.comment}}</p>
    </div>
    <div class="pages-action">
      <a-row :gutter="[8, 8]">
        <a-col span="12">
          <a-button class="light-red" @click="stop"> Завершить </a-button>
        </a-col>
        <a-col span="12">
          <a-button class="light-red" @click="notAble" :disabled="isFinish">
            Не смог сделать
          </a-button>
        </a-col>

        <a-col span="24">
          <a-button class="dark-red" @click="toRelax" v-if="!isRelax">
            Отдых
          </a-button>
          <a-button
            class="dark-red"
            @click="done"
            :disabled="!isFinish || restSeconds != 0"
            :class="{ disabled: !isFinish || restSeconds != 0 }"
            v-else
          >
            Готово
          </a-button>
        </a-col>
      </a-row>
    </div>
    <!-- <audio ref="audio" preload="auto" controls src="/audio/2.wav"></audio> -->
    <PopupReason v-if="isPopup" @close="closePopup" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      isFinish: false,
      actionSeconds: 10,
      restSeconds: 10,
      timer: null,
      approach: localStorage.getItem("approach") || 1,
      isPopup: false,
      audio: new Audio("/audio/2.wav"),
      isTwoScreens: false,
      isLeft: true,
      isRelax: true,
    };
  },
  mounted() {
    setTimeout(() => {}, 1000);
    if (localStorage.getItem("approach") == "undefined") {
      localStorage.setItem("approach", 1);
      this.approach = 1;
    }
    setTimeout(() => {
      if (this.getProgram && this.getProgram.option === "сек") {
        if (
          this.getVariables.side &&
          this.getVariables.side == "Правая сторона"
        ) {
          this.actionSeconds = this.getProgram.right;
        } else {
          this.actionSeconds = this.getProgram.left;
        }
        this.timer = setInterval(() => {
          if (this.actionSeconds > 0) {
            this.actionSeconds--;
          } else {
            this.isFinish = true;
            clearInterval(this.timer);
          }
        }, 1000);
      } else {
        this.isRelax = false;
        if (
          this.getVariables.side &&
          this.getVariables.side == "Правая сторона"
        ) {
          this.actionSeconds = this.getProgram.right;
        } else {
          console.log(this.getProgram);
          this.actionSeconds = this.getProgram.left;
        }
      }
    }, 300);
    // this.approach = this.getVariables && this.getVariables.approachNumber;
    // localStorage.setItem("approach", this.approach);
  },
  methods: {
    async stop() {
      try {
        this.isPopup = true;
        clearInterval(this.timer);
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    async notAble() {
      if (this.getProgram.right) {
        this.isLeft = !this.isLeft;
      }
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "not_able",
        });
        const {
          exercise: { exercise_id },
        } = data.variables;
        this.$store.commit("home/setVariables", data.variables);
        const { title } = data.currentNode;
        this.isFinish = false;
        // clearInterval(this.timer);
        this.smartRouter(title, exercise_id);
        if (this.getProgram.option === "сек") {
          if (
            this.getVariables.side &&
            this.getVariables.side == "Правая сторона"
          ) {
            this.actionSeconds = this.getProgram.right;
          } else {
            this.actionSeconds = this.getProgram.left;
          }
        } else {
          this.isRelax = false;
          if (
            this.getVariables.side &&
            this.getVariables.side == "Правая сторона"
          ) {
            this.actionSeconds = this.getProgram.right;
          } else {
            this.actionSeconds = this.getProgram.left;
          }
        }
        this.approach = data.variables && data.variables.approachNumber;
        localStorage.setItem("approach", this.approach);
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    async done() {
      if (this.getProgram.right) {
        this.isLeft = !this.isLeft;
      }
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "done",
        });
        const { exercise } = data.variables;
        const { exercise_id } = exercise ? exercise : {};
        this.$store.commit("home/setVariables", data.variables);
        const { title } = data.currentNode;
        if (!this.getProgram) {
          this.smartRouter(title);
        }
        if (
          this.approach < this.getProgram.approach ||
          this.getVariables.approachNumber === 3
        ) {
          this.approach = this.getVariables.approachNumber;
          localStorage.setItem("approach", this.approach);
          this.isFinish = false;
          if (this.getProgram.option === "сек") {
            if (
              this.getVariables.side &&
              this.getVariables.side == "Правая сторона"
            ) {
              this.actionSeconds = this.getProgram.right;
            } else {
              this.actionSeconds = this.getProgram.left;
            }

            this.timer = setInterval(() => {
              if (this.actionSeconds > 0) {
                this.actionSeconds--;
              } else {
                this.isFinish = true;
                clearInterval(this.timer);
                this.restSeconds = this.getProgram && this.getProgram.rest_sec;
              }
            }, 1000);
          } else {
            this.isRelax = false;
            console.log(this.getVariables);
            if (
              this.getVariables.side &&
              this.getVariables.side == "Правая сторона"
            ) {
              this.actionSeconds = this.getProgram.right;
              console.log(this.actionSeconds, this.getProgram.right);
            } else {
              this.actionSeconds = this.getProgram.left;
            }
          }
        } else {
          this.isFinish = true;
          clearInterval(this.timer);
          localStorage.removeItem("approach");
          exercise_id
            ? this.smartRouter(title, exercise_id)
            : this.smartRouter(title);
        }
      } catch (error) {
        console.error(error);
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    closePopup() {
      this.isPopup = false;
      if (!this.isFinish) {
        this.timer = setInterval(() => {
          if (this.actionSeconds > 0) {
            this.actionSeconds--;
          } else {
            this.isFinish = true;
            clearInterval(this.timer);
          }
        }, 1000);
      } else {
        this.timer = setInterval(() => {
          if (this.restSeconds > 0) {
            this.restSeconds--;
          } else {
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    toRelax() {
      this.isRelax = true;
      this.isFinish = true;
      clearInterval(this.timer);
      this.restSeconds = this.getProgram && this.getProgram.rest_sec;
    },
  },
  computed: {
    ...mapGetters("home", ["getVariables"]),
    ...mapState(["client"]),
    getExercise() {
      return (
        this.getVariables &&
        this.getVariables.exercises.find((e) => {
          return e.exercise_id == this.$route.query.id;
        })
      );
    },
    getProgram() {
      return this.getVariables && this.getVariables.exercise;
    },
  },
  watch: {
    isFinish(val) {
      if (val) {
        this.timer = setInterval(() => {
          if (this.restSeconds > 0) {
            this.restSeconds--;
          } else {
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    restSeconds(val) {
      if (val < 6) {
        this.audio.play();
      } else if (val === 0) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    },
    actionSeconds(val) {
      if (val < 6) {
        this.getProgram.option === "сек" && this.audio.play();
      } else if (val === 0) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    },
    // getProgram(val) {
    //   if (val.right) {
    //     this.isTwoScreens = true;
    //   }
    // },
  },
};
</script>

<style>
button.disabled {
  background-color: #f5f5f5 !important;
  color: rgba(0, 0, 0, 0.25) !important;
}
.hidden {
  display: none;
}
.text {
  
  padding-top: 16px;
  font-size: 18px;
}
</style>
