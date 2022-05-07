<template>
  <div>
    <datePicker @close="popup = false" v-if="popup" />
    <!-- <Picker :options="years" v-model="currentYear" /> -->
    <!-- <Picker :options="years" v-model="currentYear" /> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      popup: true,
    };
  },
  methods: {},
};
</script>

<style >
</style>