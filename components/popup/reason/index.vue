<template>
  <popup-layout
    Title="Укажите причину"
    @close="close"
    :isAccess="!isActive"
    @access="access"
  >
    <template #body>
      <div class="pages-action" style="margin-bottom: 24px">
        <a-row :gutter="[8, 8]" v-if="isActive">
          <a-col span="24">
            <a-button class="light-blue" @click="onClick('Почувствовал боль')">
              Почувствовал боль
            </a-button>
          </a-col>
          <a-col span="24">
            <a-button class="light-blue" @click="onClick('Устал')">
              Устал
            </a-button>
          </a-col>
          <a-col span="24">
            <a-button class="light-blue" @click="onClickOther">
              Другая причина
            </a-button>
          </a-col>
        </a-row>
        <div class="reason-textarea" v-else>
          <textarea ref="textarea"></textarea>
        </div>
      </div>
    </template>
  </popup-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async onClick(reason) {
      try {
        await this.$axios.post(`/${this.client}/request`, {
          code: "stop",
          reason,
        });
        this.$emit("close");
      } catch ({ message }) {
        throw new Error(message);
      }
    },
    onClickOther() {
      this.isActive = false;
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    async access() {
      try {
        await this.$axios.post(`/${this.client}/request`, {
          code: "stop",
          reason: this.$refs.textarea.value,
        });
        this.$emit("close");
      } catch ({ message }) {
        throw new Error(message);
      }
    },
  },
  computed: {
    ...mapState(["client"]),
  },
};
</script>

<style>
.reason-textarea textarea {
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