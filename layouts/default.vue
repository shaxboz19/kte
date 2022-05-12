<template>
  <div class="wrapper" v-if="!isError">
    <header class="header">
      <div class="container">
        <div class="header-wrapper">
          <button class="no-bg">Готово</button>
          <h3>КТЕ</h3>
          <i class="icon-refresh"></i>
        </div>
      </div>
    </header>
    <Nuxt />
  </div>
  <div v-else class="error-message">
    Что-то пошло не так попробуйте перезапустить
    <a href="https://t.me/Sms47Bot" target="_blank"> телеграм бота</a>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    if (this.$route.query.client) {
      this.$store.commit("setClient", this.$route.query.client);
      localStorage.setItem("client", this.$route.query.client);
    }
    this.getDetail();
    if (!localStorage.getItem("client")) {
      this.$store.commit("setError", true);
    }
  },
  methods: {
    async getDetail() {
      const { variables } = await this.$store.dispatch(
        "home/getDetail",
        this.client
      );

      if (!variables) {
        this.$store.commit("setError", true);
      }
    },
  },
  computed: {
    ...mapState(["client", "isError"]),
    ...mapState("home", ["getVariables"]),
  },
};
</script>

<style>
.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 1.5rem;
}
.error-message a {
  margin-left: 0.5rem;
}
</style>
