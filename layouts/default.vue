<template>
  <div class="wrapper">
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
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.$store.commit('setClient', this.$route.query.id)
    this.getDetail();
  },
  methods: {
    async getDetail() {
      await this.$store.dispatch("home/getDetail", this.client);
    },
  },
  computed: {
    ...mapState(["client"]),
  },
};
</script>

<style></style>
