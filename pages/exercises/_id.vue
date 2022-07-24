<template>
  <div class="employment-detail">
    <div class="employment-detail-video" v-if="getExercise">
      <iframe
        width="100%"
        height="100%"
        :src="'https://www.youtube.com/embed/' + getUrlId"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="container">
      <div class="employment-detail-wrapper">
        <div class="employment-detail-header" v-if="getExercise && getProgram">
          <h4>{{ getExercise.exercise }}</h4>
          <span
            >Подходы: {{ getProgram.approach }} х 60 сек / Отдых:
            {{ getProgram.rest_sec }} сек</span
          >
        </div>
        <div class="employment-detail-content" v-if="getExercise">
          <b>⚽ Вам потребуется: </b>
          <p>{{ getExercise.equipment }}</p>
          <b>👉 Исходное положение:</b>
          <p>{{ getExercise.position }}</p>
          <b>💪 Выполнение:</b> <b><i>Упрощенный вариант исполнения:</i></b>

          <ul>
            <li>
              {{ getExercise.execution }}
            </li>
            <!-- <li>2. То же в обратном направлении</li> -->
          </ul>
          <b><i>Продвинутый вариант исполнения:</i></b>
          <ul>
            <li>
              {{ getExercise.execution }}
            </li>
          </ul>
          <b>❗️Важно:</b>
          <ul>
            <li>
              {{ getExercise.attention }}
            </li>
          </ul>

          <b>❌ Не допускается:</b>
          <ul>
            <li>{{ getExercise.avoid }}</li>
          </ul>
        </div>
        <div class="employment-detail-footer">
          <a-row :gutter="[8, 8]">
            <a-col span="24">
              <a-button class="dark-red" @click="toStart">Приступить</a-button>
            </a-col>
            <a-col span="12">
              <a-button class="light-red" @click="stop">Завершить</a-button>
            </a-col>
            <a-col span="12">
              <a-button class="light-red" @click="skip">Пропустить</a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <PopupReason v-if="isPopup" @close="closePopup" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      isPopup: false,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   let player = Yandex.VH.Player("yandex-player", {
    //     contentId: "WdTHDBhWDKvdlQ/60645072bc4bb66f914ee907",
    //   });
    // }, 500);
  },
  methods: {
    async toStart() {
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "start",
        });
        this.$store.commit("home/setVariables", data.variables);
        const { title } = data.currentNode;
        this.smartRouter(title, this.$route.params.id);
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    async stop() {
      try {
        this.isPopup = true;
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    async skip() {
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "skip",
        });
        const { title } = data.currentNode;
        const { exerciseId } = data.variables;
        this.smartRouter(title, exerciseId);
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
    closePopup() {
      this.isPopup = false;
    },
  },
  computed: {
    ...mapGetters("home", ["getVariables"]),
    ...mapState(["client"]),
    getExercise() {
      return (
        this.getVariables &&
        this.getVariables.exercises.find((e) => {
          return e.exercise_id == this.$route.params.id;
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
    getUrlId() {
      return this.getExercise && this.getExercise.link.split("/").pop();
    },
  },
};
</script>

<style>
.employment-detail-footer {
  position: static;
  bottom: 0;
  background-color: #fff;
  padding-bottom: 8px;
}
.employment-detail-content {
  padding-bottom: 0;
}
</style>
