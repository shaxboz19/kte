<template>
  <div class="pages-wrapper" v-if="getExercise && getProgram">
    <h2 class="title">{{ getExercise.exercise }}</h2>
    <div class="exercise">
      <ul>
        <li :class="{ active: !isFinish }">
          <span class="exercise-title"
            >Подход {{ approach }}/{{ getProgram.approach }}</span
          >
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
          <a-button class="light-red" @click="stop"> Завершить </a-button>
        </a-col>
        <a-col span="12">
          <a-button class="light-red" @click="notAble" :disabled="isFinish">
            Не смог сделать
          </a-button>
        </a-col>

        <a-col span="24">
          <a-button
            class="dark-red"
            @click="done"
            :disabled="!isFinish || restSeconds != 0"
            :class="{ disabled: !isFinish || restSeconds != 0 }"
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
      isTwoScreens: false
      
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
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "not_able",
        });
        const { exerciseId } = data.variables;
        const { title } = data.currentNode;
        this.isFinish = false;
        // clearInterval(this.timer);
        this.smartRouter(title, exerciseId);
        this.actionSeconds = 10;
        this.restSeconds = 10;
        this.approach = data.variables && data.variables.approachNumber;
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    async done() {
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "done",
        });
        const { exerciseId } = data.variables;
        this.$store.commit("home/setVariables", data.variables);
        const { title } = data.currentNode;
        if (this.approach < this.getProgram.approach) {
          this.approach++;
          localStorage.setItem("approach", this.approach);
          this.isFinish = false;
          this.actionSeconds = 10;
          this.timer = setInterval(() => {
            if (this.actionSeconds > 0) {
              this.actionSeconds--;
            } else {
              this.isFinish = true;
              clearInterval(this.timer);
              this.restSeconds = 10;
            }
          }, 1000);
        } else {
          this.isFinish = true;
          clearInterval(this.timer);
          localStorage.removeItem("approach");
          this.smartRouter(title, exerciseId);
        }
      } catch (error) {
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
        console.dir(this.audio);
        this.audio.play();
      } else if (val === 0) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    },
    getProgram(val) {
      if(val.right) {
        this.isTwoScreens = true;
      }
    }
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
</style>
