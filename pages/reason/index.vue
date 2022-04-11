<template>
  <div class="pages-wrapper">
    <PopupReason v-if="isPopup" @Close="closePopup" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            isPopup: true
        }
    },
    methods: {
        closePopup() {
            this.isPopup = false
        },
        openPopup() {
            this.isPopup = true
        }
    }
};
</script>

<style>
</style>