<template>
  <div class="pages-wrapper" v-if="!loading">
    <div class="result">
      <img src="/images/hand.svg" alt="hand" />
      <h2 class="title">Отлично!</h2>
      <p>
        Вы набрали {{ getVariables && getVariables.totalScores }} балла из
        {{ getVariables && getVariables.targetScores }}. Следующее занятие:
        <b>{{ getVariables && getVariables.timeNextLesson }}</b>
      </p>
    </div>

    <div class="pages-action">
      <a-row :gutter="[8, 8]">
        <a-col span="24">
          <a-button class="dark-red" @click="done"> Ok </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters("home", ["getVariables"]),
    ...mapState(["client"]),
  },
  async mounted() {
    if (!this.getVariables) {
      this.loading = true;
      const data = await this.$store.dispatch("home/getDetail", this.client);
      console.log(this.getVariables);
    }
    this.loading = false;
  },
  methods: {
    async done() {
      try {
        const { data } = await this.$axios.post(`/${this.client}/request`, {
          code: "OK",
        });
        const { title } = data.currentNode;
        this.smartRouter(title);
      } catch (error) {
        const {
          data: { message },
        } = error.response;
        this.errorHandler(message);
      }
    },
  },
};
</script>

<style></style>
