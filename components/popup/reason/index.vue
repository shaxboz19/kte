<template>
  <popup-layout Title="Укажите причину" @Close="Close">
    <template #body>
      <div class="pages-action" style="margin-bottom: 24px">
        <a-row :gutter="[8, 8]" v-if="isActive">
          <a-col span="24">
            <a-button class="light-blue" @click="onClick">
              Почувствовал боль
            </a-button>
          </a-col>
          <a-col span="24">
            <a-button class="light-blue" @click="onClick"> Устал </a-button>
          </a-col>
          <a-col span="24">
            <a-button class="light-blue" @click="onClick">
              Другая причина
            </a-button>
          </a-col>
        </a-row>
        <div class="reason-textarea" v-else >
          <textarea ref="textarea"></textarea>
        </div>
      </div>
    </template>
  </popup-layout>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    Close() {
      this.$emit("Close");
    },
    onClick() {
      this.isActive = false;
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      });
    },
  },
};
</script>

<style>
.reason-textarea textarea{
  border: none !important;
  outline: none !important;
  border: none !important;
  resize: none;
  box-shadow: unset !important;
  text-align: left;
  padding: 0;
  width: 100%;
}
</style>