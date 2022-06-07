<template>
  <div>
    <datePicker @close="popup = false" v-if="popup" />
    <!-- <Picker :options="years" v-model="currentYear" /> -->
    <!-- <Picker :options="years" v-model="currentYear" /> -->
  </div>
</template>

<script>
export default {
  // test page
  components: {},
  data() {
    return {
      popup: true,
    };
  },
};
</script>

<style></style>
